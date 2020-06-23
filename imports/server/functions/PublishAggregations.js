class PublishAggregations {
    constructor(collection, pipeline, options) {
        this.collection = collection;
        this.pipeline = pipeline || {};
        this.options = options || {};

        this.stopped = false;
    }

    _getCollectionName() {
        return this.collection._name;
    }

    _publishCursor(sub) {
        this.sub = sub;

        this.sendInitialData();
        this.startChangeStream();

        return {
            stop: this.stopChangeStream.bind(this)
        }
    }

    sendInitialData() {

        console.log("sendInitialData",  this.collection._name, this.pipeline, this.options);

        const rawCollection = this.collection.rawCollection();

        console.log("rawCollection", rawCollection);

        try {
            const results = rawCollection.aggregate(this.pipeline, this.options);

            console.log("results", results);

            results.forEach((item) => {
                const id = item._id;
                delete item._id;

                this.sub.added(this.collection._name, id, item);
            });
        } catch (e) {
            throw e;
        }
    }

    startChangeStream() {
        const rawCollection = this.collection.rawCollection();

        const isChangeStreamSupported = rawCollection.watch || false;

        console.log("startChangeStream",rawCollection );

        if (isChangeStreamSupported) {
            const newPipeline = [
                {
                    $addFields: { "fullDocument.CHANGE_STREAMS_operationType": "$operationType" }
                },
                {
                    $replaceRoot: { newRoot: "$fullDocument" }
                },
                ...this.pipeline || []
            ]
            this.stream = rawCollection.watch(newPipeline || []);

            this.stream.on("change", doc => {
                const operationType = doc.CHANGE_STREAMS_operationType;
                let docId = doc._id;

                console.log("onChange", doc);

                if (typeof docId === "object") {
                    docId = docId.toHexString();
                }

                delete doc._id;
                delete doc.CHANGE_STREAMS_operationType;

                let isDocExist = false;

                try {
                    isDocExist =
                        this.sub._documents[this.collection._name][`-${docId}`] || false;
                } catch (e) {
                    isDocExist = false;
                }

                if (isDocExist) {
                    if (operationType === "replace") {
                        this.sub.changed(this.collection._name, docId, doc);
                    } else if (operationType === "delete") {
                        this.sub.removed(this.collection._name, docId, doc);
                    }
                } else {
                    if (operationType === "replace" || operationType === "insert") {
                        this.sub.added(this.collection._name, docId, doc);
                    }
                }
            });
        } else {
            throw new Error("Your app doesn't support change streams");
        }
    }

    stopChangeStream() {
        if (this.stream) {
            this.stream.stop();
        }
    }
}

module.exports = PublishAggregations;

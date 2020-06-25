/**
 * Accesses MongoDb change stream functionality to replace oplog method.
 *
 * @memberof Functions:Server
 * @function ChangeStreams
 * @locus Server
 *
 * @param {Object} collection - Meteor collection object
 * @param {Array} pipeline - array of change stream pipline commands
 * @param {Object} options - mongodb options
 *
 * @return {Object} - links up with Meteor mongo code
 *
 * @see based on work by {@link https://atmospherejs.com/kschingiz/publish-change-streams|kschingiz}
 */


class ChangeStreams {
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
        const rawCollection = this.collection.rawCollection();

        try {
            const results = rawCollection.aggregate(this.pipeline, this.options);

            results.forEach((item) => {
                const id = item._id;
                this.sub.added(this.collection._name, id, item);

            });
        } catch (e) {
            throw e;
        }
    }

    startChangeStream() {
        const rawCollection = this.collection.rawCollection();
        const isChangeStreamSupported = rawCollection.watch || false;

        if (isChangeStreamSupported) {
            const newPipeline = [
                ...this.pipeline || []
            ]

            this.stream = rawCollection.watch(newPipeline || []);

            this.stream.on("change", doc => {
                let docKey = doc.documentKey;
                let insert = doc.fullDocument ? doc.fullDocument : null;
                let change = doc.updateDescription ? doc.updateDescription : null;

                let testHasDocs = this.sub._documents.get(this.collection._name);

                if(testHasDocs.has(docKey._id)){
                    switch(doc.operationType){
                        case  "update":
                            let update = change && change.updatedFields ? change.updatedFields : null;
                            if(update){
                                this.sub.changed(this.collection._name, docKey._id, update);
                            }
                            break;

                        case  "delete":
                            let del = change && change.removedFields ? change.removedFields : null;
                            if(del){
                                this.sub.removed(this.collection._name, docKey._id, del);
                            }
                            break;

                        case  "replace":
                            if(insert){
                                this.sub.added(this.collection._name, docKey._id, insert);
                            }
                            break;
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

module.exports = ChangeStreams;

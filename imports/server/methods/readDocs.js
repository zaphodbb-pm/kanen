// import app main routines
import {Match} from 'meteor/check'
//import {timeAgo} from '/imports/both/functions/func-timeAgo'
import {myDocuments} from '/imports/server/functions/myDocuments'

Meteor.methods({

    /**
     * Meteor method to query server directly for documents from LogsSystem and map to a return object.
     *
     * @memberof Methods
     * @function navbarMessages
     * @isMethod true
     * @locus Server
     *
     * @returns {Object} Obj - transforms database data into a displayable message object
     * @returns {String} Obj:title - message event name
     * @returns {String} Obj:name - label
     * @returns {String} Obj:desc - more detailed description
     * @returns {String} Obj:timeAgo - relative time from now
     * @returns {String} Obj:icon - name of icon to show; ie "USER" or "GEARS"
     *
     */

    /*
    navbarMessages: function () {

        const query = LogsSystem.createQuery({

            $options: {
                sort: {timeStamp: -1},
                limit: 5,
            },

            timeStamp: 1,

            data: {
                event: 1,
                user: 1,
                app: 1,
                description: 1,
            }

        });

        let messages = query.fetch();

        //** map database fields into an array of displayable objects at the client
        let out = [];

        if (Array.isArray(messages) && messages.length > 0) {
            out = messages.map(function (item) {
                return {
                    title: item.data.event,
                    name: item.data.user ? item.data.user : (item.data.app ? item.data.app : "empty"),
                    desc: item.data.description,
                    timeAgo: item.timeStamp ? timeAgo(item.timeStamp) : "a while ago",
                    icon: item.data.user ? kanen.icons.USER : (item.data.app ? kanen.icons.GEARS : ""),
                }
            });
        }

        return out;
    },
*/

    /**
     * Meteor method to retrieve document from MongoDB.
     *
     * @memberof Methods
     * @function getCollData
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll - name of collection to query
     * @param {String} type - type of operation to perform: 'list', 'allFields', 'oneAllFields'
     * @param {Object} filter - standard MongoDB query object
     * @param {Object} options - standard MongoDB option add-on
     *
     * @returns {Array|Object} Obj - returns results of MongoDB read operation
     *
     */

    getCollData(coll, type, filter, options) {

        console.log("getCollData start", coll, type, filter, options);

        const self = this;
        let docs = [];
        let query = {};

        //* perform basic argument tests
        if (!(coll && Match.test(coll, String))) {
            return docs;
        }

        type = Match.test(type, String) ? type : "";
        filter = Match.test(filter, Object) ? filter : {};
        options = Match.test(options, Object) ? options : {limit: kanen.constants.LIMIT_MAX_SMALL};

        //* build grapher query object
        //let roles = kanen.schemaRoles[coll] ? kanen.schemaRoles[coll] : [];
        let roles = "all";
        let access = myDocuments(filter, self.userId, "author", roles);

        //* if access is blocked, return empty set
        if (!access) {
            return [];
        }

        let base = {
            $options: options,
            $filters: access,
        };

        switch (true) {

            case type === "list":
                //query = Object.assign(base, kanen.queries[coll].list);
                //docs = Mongo.Collection.get(coll).createQuery(query).fetch();

                docs = Mongo.Collection.get(coll).find( filter, options ).fetch();
                break;

            case type === "select":
                //query = Object.assign(base, kanen.queries[coll].select);
                //docs = Mongo.Collection.get(coll).createQuery(query).fetch();
                docs = Mongo.Collection.get(coll).find( filter, options ).fetch();
                break;

            case type === "allFields":
                //query = Object.assign(base, kanen.queries[coll].allFields);
                //docs = Mongo.Collection.get(coll).createQuery(query).fetch();
                docs = Mongo.Collection.get(coll).find( filter, options ).fetch();
                break;

            case type === "content":
                //query = Object.assign(base, kanen.queries[coll].content);
                //docs = Mongo.Collection.get(coll).createQuery(query).fetch();
                docs = Mongo.Collection.get(coll).find( filter, options ).fetch();
                break;

            case type === "oneAllFields":
                //query = Object.assign(base, kanen.queries[coll].allFields);
                //docs = Mongo.Collection.get(coll).createQuery(query).fetchOne();
                docs = Mongo.Collection.get(coll).findOne( filter, options );
                break;
        }

        return docs;
    },

    /**
     * Meteor method to retrieve document fragments from multiple collections.
     *
     * @memberof Methods
     * @function getCollDataCombo
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll - name of collection to query
     * @param {String} type - not used; placeholder to match main doc getter
     * @param {Object} filter - standard MongoDB query object
     * @param {Object} options - standard MongoDB option add-on
     *
     * @returns {Array|Object} Obj - returns results of MongoDB read operation
     *
     * @see {@link https://cult-of-coders.github.io/grapher|Grapher} for detailed documentation
     *
     */

    /*
    getCollDataCombo(coll, type, filter, options) {

        const self = this;
        let docs = [];
        let query = {};

        //* perform basic argument tests
        if (!(coll && Match.test(coll, String))) {
            return docs;
        }

        type = Match.test(type, String) ? type : "";
        filter = Match.test(filter, Object) ? filter : {};
        options = Match.test(options, Object) ? options : {limit: kanen.constants.LIMIT_MAX_SMALL};

        //* build grapher query object
        let roles = kanen.schemaRoles[coll] ? kanen.schemaRoles[coll] : [];
        let access = myDocuments(filter, self.userId, "author", roles);

        //* if access is blocked, return empty set
        if (!access) {
            return [];
        }

        let base = {
            $options: options,
            $filters: access,
        };

        //** deal with each unique combo situation
        switch (true) {

            //* in the marketplace, products need to ghet some onfo from the service provider company
            case coll === "marketplaceProducts":

                let list = {
                    name: 1,
                    company: 1,
                    location: 1,
                    fitnessType: 1,
                    condition: 1,
                    description: 1,
                    productType: 1,
                    productLevel: 1,
                    productExpires: 1,
                    price: 1,
                    photo: 1,
                    productActive: 1,

                    tenantId: 1,
                };

                query = Object.assign(base, list);
                docs = Products.createQuery(query).fetch();

                //** find all service providers' tenantId and create a unique array of service providers
                let sp = _.map(docs, (d) => d.tenantId);
                sp = _.unique(sp);

                //** get service provider logo and currency information and add info into product doc
                let fields = {
                    currency: 1,
                    logo: 1,
                    tenantId: 1
                };

                let srvProvs = ServiceProviders.find({tenantId: {$in: sp}}, {fields: fields}).fetch();

                docs.map((d) => {
                    let sp = _.findWhere(srvProvs, {tenantId: d.tenantId});
                    d.currency = sp.currency;
                    d.logo = sp.logo;
                });
                break;

            default:
                return [];
        }

        return docs;
    }

     */
});

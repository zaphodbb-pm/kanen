// import app main routines
import {Match} from 'meteor/check'
import {check} from 'meteor/check'
import {accessControl} from '/imports/server/setupACL'

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
     * For list search bar, gets count of total number of user documents.
     *
     * @memberof Methods
     * @function countDocs
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object} query
     * @return {Number}
     */

    countDocs: function (coll, query) {
        check(coll, String);
        check(query, Object);

        let out = 0;

        //if (Meteor.userId()) {                            // check if user is logged in
            let q = query || {};
            //let out = 0;


            switch (true) {
                case coll === 'users':
                    out = Meteor.users.find(q).count();
                    break;

                default:
                    //*** adjust certain mappings to real collection
                    //q = myDocuments(q, this.userId, kanen.schemaRoles[coll]);
                    out = Mongo.Collection.get(coll).find(q).count();
            }

            //return out;
        //}

        return out;
    },




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
        //* perform basic argument tests
        if (!(coll && Match.test(coll, String))) {
            return [];
        }

        //* rest of parameters
        type = Match.test(type, String) ? type : "";
        filter = Match.test(filter, Object) ? filter : {};
        options = Match.test(options, Object) ? options : {limit: kanen.constants.LIMIT_MAX_SMALL};

        //* initialize working variables
        const self = this;
        let docs = [];
        let query = {};
        let opts = {};
        let acl = null;


        //* build  query object

        //let roles = kanen.schemaRoles[coll] ? kanen.schemaRoles[coll] : [];
        let roles = "all";
        let access = myDocuments(filter, self.userId, "author", roles);

        //* if access is blocked, return empty set
        if (!access) {
            return [];
        }

        query = Object.assign( query, filter );

        acl = accessControl[coll];
        acl = acl ? acl[type] : null;

        if(acl){
            opts = Object.assign(options, {fields: acl});
            if(type === "schemaForm"){
                docs = Mongo.Collection.get(coll).findOne( query, opts );
            }else{
                docs = Mongo.Collection.get(coll).find( query, opts ).fetch();
            }
        }

        return docs;
    }
});

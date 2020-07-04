// import app main routines
import {Match} from 'meteor/check'
import {check} from 'meteor/check'
import {accessControl} from '/imports/server/setupACL'
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

        let q = query || {};
        let out = 0;

        if (Meteor.userId()) {                            // check if user is logged in
            let acl = accessControl[coll];

            if(acl){
                switch (true) {
                    case coll === 'users':
                        out = Meteor.users.find(q).count();
                        break;

                    default:
                        //*** adjust certain mappings to real collection
                        let access = myDocuments(q, Meteor.user(), acl.roles);

                        if(access){
                            q = Object.assign( query, access );
                            out = Mongo.Collection.get(acl.coll).find(q).count();
                        }
                }
            }
        }

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
     * @notes
     *  1. Adding a suffix of "_one" to projection uses "findOne" mongo method
     *
     */

    getCollData(coll, type, filter, options) {
        //* perform basic argument tests
        if (!(coll && Match.test(coll, String))) {
            return [];
        }

        //* check rest of parameters
        type = Match.test(type, String) ? type : "";
        filter = Match.test(filter, Object) ? filter : {};
        options = Match.test(options, Object) ? options : {limit: kanen.constants.LIMIT_MAX_SMALL};

        //* initialize working variables
        let docs = [];
        let query = {};
        let opts = {};

        //* get access control and roles information
        let acl = accessControl[coll];

        if(acl){
            let projection = type.replace("_one", "");
            projection = type.replace("_count", "");
            let fields = acl[projection] ? {fields: acl[projection] } : {};

            //* build query object
            let access = myDocuments(filter, Meteor.user(), acl.roles);

            //* if access is blocked, return empty set
            if (!access) {
                let out = [];
                if( type.includes("_one") ){ out = {}; }
                if( type.includes("_count") ){ out = 0; }

                return out;
            }

            query = Object.assign( query, access, filter );
            opts = Object.assign(options, fields);

            switch(true){
                case type.includes("_one"):
                    docs = Mongo.Collection.get(acl.coll).findOne( query, opts );
                    break;

                case type.includes("_count"):
                    docs = Mongo.Collection.get(acl.coll).find( query, opts ).count();
                    break;

                default:
                    docs = Mongo.Collection.get(acl.coll).find( query, opts ).fetch();
            }
        }

        return docs;
    }
});

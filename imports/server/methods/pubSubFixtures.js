import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {verifyRole} from "../functions/verifyRole";


Meteor.methods({

    /**
     * Special Pub Sub fixture to upload an initial array of documents.
     *
     * @memberof Methods
     * @function bulkLoadDocs
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Array} arr
     *
     * @return {Object} - status
     */


    bulkLoadDocs: function (coll, arr) {
        check(coll, String);
        check(arr, Array);

        if( verifyRole(Meteor.userId(), "roles.write") ){      // check if user is logged in or system wants to write to a log
            let len = arr.length;

            if(len > 0){
                Mongo.Collection.get(coll).remove({});      // flush existing records

                arr.forEach( (doc) => {
                    delete doc._id;
                    doc.tenantId = Meteor.user() && Meteor.user().tenantId ? Meteor.user().tenantId : "general";
                    doc.updatedAt = Date.now();

                    Mongo.Collection.get(coll).insert(doc);
                });

                return {status: 200,  len: len, text: `${len} documents have been added on ${coll} by bulkLoadDocs`};

            }else{
                return {status: 404,  len: len, text: `Warning: ${len} documents have been added on ${coll} by bulkLoadDocs`};
            }



        }else{
            return {status: 400, _id: "", text: "Invalid user"};
        }
    },

    /**
     * Special Pub Sub fixture to update an array of documents.
     *
     * @memberof Methods
     * @function updateRealTimeDoc
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Array} docs
     *
     * @return {Object} - status
     */


    updateRealTimeDoc: function (coll, docs) {
        check(coll, String);
        check(docs, Array);

        if( verifyRole(Meteor.userId(), "roles.write") ){      // check if user is logged in or system wants to write to a log
            let len = docs.length;

            docs.forEach( (doc) => {
                let update = {
                    tenantId: Meteor.user() && Meteor.user().tenantId ? Meteor.user().tenantId : "general",
                    updatedAt: Date.now(),
                    value: doc.value
                }

                Mongo.Collection.get(coll).update({name: doc.name}, {$set: update});
            });

            return {status: 200,  len: len, text: `${len} documents have been updated on ${coll} by updateRealTimeDoc`};

        }else{
            return {status: 400, _id: "", text: "Invalid user"};
        }
    }
});


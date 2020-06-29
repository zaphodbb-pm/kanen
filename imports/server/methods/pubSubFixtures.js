import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";

import {accessControl} from '/imports/server/setupACL'
import {verifyRole} from '/imports/server/functions/verifyRole'
import {ownsDocument} from '/imports/server/functions/ownsDocument'


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

        let acl = accessControl[coll];

        if( verifyRole(Meteor.user(), acl.roles) ) {
            let len = arr.length;

            if(len > 0){
                Mongo.Collection.get(acl.coll).remove({author: Meteor.user()._id});      // flush existing records

                arr.forEach( (doc) => {
                    delete doc._id;
                    doc.author = Meteor.user()._id;
                    doc.tenantId = Meteor.user() && Meteor.user().tenantId ? Meteor.user().tenantId : "general";
                    doc.updatedAt = Date.now();

                    Mongo.Collection.get(acl.coll).insert(doc);
                });

                return {status: 200,  len: len, text: `${len} documents have been added on ${coll} by bulkLoadDocs`};

            }else{
                return {status: 404,  len: len, text: `Warning:  NO documents have been added on ${coll} by bulkLoadDocs`};
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

        let acl = accessControl[coll];

        if( verifyRole(Meteor.user(), acl.roles) ) {
            let len = docs.length;

            docs.forEach( (doc) => {
                let update = {
                    tenantId: Meteor.user() && Meteor.user().tenantId ? Meteor.user().tenantId : "general",
                    updatedAt: Date.now(),
                    value: doc.value
                }

                Mongo.Collection.get(acl.coll).update({author: Meteor.user()._id, name: doc.name}, {$set: update});
            });

            return {status: 200,  len: len, text: `${len} documents have been updated on ${coll} by updateRealTimeDoc`};

        }else{
            return {status: 400, _id: "", text: "Invalid user"};
        }
    }
});

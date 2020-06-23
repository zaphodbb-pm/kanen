import {check} from "meteor/check";
import {verifyRole} from "../functions/verifyRole";
import {Meteor} from "meteor/meteor";

Meteor.methods({
    /**
     * Special Pub Sub fixtures.
     *
     * @memberof Methods
     * @function upsertDoc
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object} doc
     *
     * @return {Object}
     */


    upsertDoc: function (coll, doc) {
        check(coll, String);
        check(doc, Object);
        let id;

        if( verifyRole(Meteor.userId(), "roles.write") ){      // check if user is logged in or system wants to write to a log
            doc.tenantId = Meteor.user() && Meteor.user().tenantId ? Meteor.user().tenantId : "general";
            doc.updatedAt = Date.now();


            //* inject group name server side for security
            if( Meteor.user() && Meteor.user().profile && Meteor.user().profile.group ){
                doc["group"] = Meteor.user().profile.group;
            }else{
                doc["group"] = "";
            }

            id = Mongo.Collection.get(coll).upsert({name: doc.name}, doc);

            if(id){
                return {status: 200, _id: id, text: `${id} has been added on ${coll} by insertDoc`};
            }else{
                return {status: 500, _id: id, text: `insertDoc at Server did not get a returned id value.`};
            }

        }else{
            return {status: 400, _id: "", text: "Invalid user"};
        }
    },



    /**
     * Special Pub Sub fixture to upload an array of documents.
     *
     * @memberof Methods
     * @function bulkLoadDocs
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Array} arr
     *
     * @return {Object}
     */


    bulkLoadDocs: function (coll, arr) {
        check(coll, String);
        check(arr, Array);

        let len = arr.length;

        if( verifyRole(Meteor.userId(), "roles.write") ){      // check if user is logged in or system wants to write to a log

            arr.forEach( (doc) => {
                doc.tenantId = Meteor.user() && Meteor.user().tenantId ? Meteor.user().tenantId : "general";
                doc.updatedAt = Date.now();

                Mongo.Collection.get(coll).upsert({name: doc.name}, doc);
            });

            return {status: 200,  len: len, text: `${len} documents have been added on ${coll} by insertDoc`};

        }else{
            return {status: 400, _id: "", text: "Invalid user"};
        }
    }
});


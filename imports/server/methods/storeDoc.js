import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check'

import {objectify} from '/imports/server/functions/objectify'
import {ownsDocument} from '/imports/server/functions/ownsDocument'
import {verifyRole} from '/imports/server/functions/verifyRole'
import {myDocuments} from '/imports/server/functions/myDocuments'


Meteor.methods({
    /**
     * General insert document into collection.
     *
     * @memberof Methods
     * @function insertDoc
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object} doc
     *
     * @return {Object}
     */
    insertDoc: function (coll, doc) {
        check(coll, String);
        check(doc, Object);
        let id;

        if( verifyRole(Meteor.userId(), "roles.write") || coll.includes("logs") ){      // check if user is logged in or system wants to write to a log
            doc.tenantId = Meteor.user() && Meteor.user().tenantId ? Meteor.user().tenantId : "general";
            doc.updatedAt = Date.now();


            //* inject group name server side for security
            if( Meteor.user() && Meteor.user().profile && Meteor.user().profile.group ){
                doc["group"] = Meteor.user().profile.group;
            }else{
                doc["group"] = "";
            }

            id = Mongo.Collection.get(coll).insert(doc);

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
     * General document update into a collection.
     *
     * @memberof Methods
     * @function updateDoc
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {String} id
     * @param {Object} doc
     *
     * @return {Object}
     */
    updateDoc: function (coll, id, doc) {
        check(coll, String);
        check(id, String);
        check(doc, Object);

        if( verifyRole(Meteor.userId(), "roles.write") ) {
            doc.updatedAt = Date.now();

            //* inject group name server side for security
            doc["group"] = (Meteor.user().profile && Meteor.user().profile.group) ? Meteor.user().profile.group : "";

            Mongo.Collection.get(coll).update({_id: id}, {$set: doc});

            return {status: 200, _id: id, text:  `${id} has been updated on ${coll} by updateDoc`};
        }else{
            return {status: 400, _id: "", text: "Invalid user"};
        }
    },

    /**
     * General document remover from a collection.
     *
     * @memberof Methods
     * @function removeDoc
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {String} docId
     *
     * @return {Object}
     */
    removeDoc: function (coll, docId) {
        check(coll, String);
        check(docId, String);

        if( verifyRole(Meteor.userId(), "roles.write" ) ) {
            let doc = Mongo.Collection.get(coll).findOne({_id: docId});

            if(ownsDocument(Meteor.userId(), doc)){     // check if user is doc owner before delete
                Mongo.Collection.get(coll).remove(doc._id);
                return {status: 200, _id: docId, text:  `${docId} has been removed from ${coll} by removeDoc`};
            }
            return {status: 404, _id: docId, text:  `User does not have permission to remove document.`};
        }else{
            return {status: 400, _id: "", text: "Invalid user"};
        }
    },

    /**
     * General document update a document field item.
     *
     * @memberof Methods
     * @function inputterUpdateItem
     * @isMethod true
     * @locus Server
     *
     * @requires {objectify}_from_'/imports/functionsBoth/func-objectify'
     *
     * @param {String} coll
     * @param {String} docId
     * @param {String} field
     * @param {String} value
     *
     * @return {Object}
     */

    updateDocField: function (coll, docId, field, value) {
        check(coll, String);
        check(docId, String);
        check(field, String);
        check(value, Match.OneOf(String, Number, Boolean, Object, Array) );

        if( verifyRole(Meteor.userId(), "role.write") ) {
            let updatedAt = Date.now();
            let setter = Object.assign({updatedAt: updatedAt}, objectify(field, value));

            Mongo.Collection.get(coll).update({_id: docId}, {$set: setter });
            return {status: 200, _id: docId, text: `${docId} has been updated on ${coll} by updateDocField`};
        }else{
            return {status: 400, _id: "", text: "Invalid user"};
        }
    },

    /**
     * General document item as array updates.
     *
     * @memberof Methods
     * @function updateDocArray
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {String} operation
     * @param {String} docId
     * @param {String} field
     * @param {String} value
     *
     * @return {Object}
     *
     * @notes
     *      As per MongoDb documentation, operations types are:
     *          "addToSet"
     *          "pop" or "shift" (ie "shift is "pop" with -1)
     *          "push"
     *          "pull"
     *          "pullAll"
     */

    updateDocArray: function (coll, operation,  docId, field, value) {
        check(coll, String);
        check(operation, String);
        check(docId, String);
        check(field, String);
        check(value, Match.OneOf(String, Array) );

        if( verifyRole(Meteor.userId(), kanen.schemaRoles[coll].write) ) {                           // check if user is logged in
            let updatedAt = Date.now();
            let ops = null;

            switch(true){
                case operation === "addToSet":
                    if(Array.isArray(value) ){
                        ops = {
                            $addToSet: objectify(field, {$each: value} ),
                            $set: {updatedAt: updatedAt},
                        };
                    }
                    break;

                case (operation === "shift") || (operation === "pop"):
                    let remove = operation === "shift" ? -1 : 1;
                    ops = {
                        $pop: objectify(field, remove),
                        $set: {updatedAt: updatedAt},
                    };
                    break;

                case operation === "push":
                    if(Array.isArray(value) ){
                        ops = {
                            $push: objectify(field, {$each: value}),
                            $set: {updatedAt: updatedAt},
                        };
                    }else{
                        ops = {
                            $push: objectify(field, value),
                            $set: {updatedAt: updatedAt},
                        };
                    }
                    break;

                case operation === "pull":
                    if(Array.isArray(value) ){
                        ops = {
                            $pull: objectify(field, {$in: value}),
                            $set: {updatedAt: updatedAt},
                        };
                    }else{
                        ops = {
                            $pull: objectify(field, value),
                            $set: {updatedAt: updatedAt},
                        };
                    }
                    break;

                case operation === "pullAll":
                    if(Array.isArray(value) ){
                        ops = {
                            $pullAll: objectify(field, value),
                            $set: {updatedAt: updatedAt},
                        };
                    }else{
                        ops = {
                            $pull: objectify(field, value),
                            $set: {updatedAt: updatedAt},
                        };
                    }
                    break;
            }

            if(ops){
                let test = Mongo.Collection.get(coll).update({_id: docId}, ops);

                if(test){
                    return {
                        status: 200,
                        id: docId,
                        text: coll + " has been updated by InputterUpdateArray",
                        value: value
                    };
                }else{
                    return {
                        status: 404,
                        id: docId,
                        text: coll + " has no matching documents",
                        value: value
                    };
                }

            }else{
                return {
                    status: 400,
                    id: docId,
                    text: "Invalid value or field",
                    value: value
                }
            }
        }
    }

});

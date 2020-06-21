import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check'
import {flattenObject} from '/imports/functions/flattenObject'
import {myDocuments} from '/imports/server/functions/myDocuments'
import {verifyRole} from "/imports/server/functions/verifyRole"


Meteor.methods({

    /**
     * @summary Sends documents as JSON from a collection.
     *
     * @memberof Methods
     * @function exportJSON
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object} query
     * @return {{records: number, size: number, data: string}}
     */
    exportJSON: function(coll, query) {
        check(coll, String);
        check(query, Object);

        if(query){
            check(query, Object);
        }else{
            query = {};
        }

        if(Meteor.userId()){                            // check if user is logged in
            let docs = [];

            if( coll === 'users' ){
                docs = Meteor.users.find( query ).fetch();
            }else{
                docs = Mongo.Collection.get(coll).find( query ).fetch();
            }

            let jsonDocs = JSON.stringify( docs );
            return { records: docs.length, size: jsonDocs.length, data:jsonDocs };
        }
    },

    /**
     * @summary Imports documents as JSON from a browser.
     *
     * @memberof Methods
     * @function importJSON
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Array} doc
     * @return {string}
     */
    importJSON: function (coll, doc) {
        check(coll, String);
        check(doc, Array);

        if(Meteor.userId()){                            // check if user is logged in
            let exists = true;                          // default value to stop insertion


            doc.forEach( (el) => {
                exists = !!Mongo.Collection.get(coll).findOne( {_id: el._id} );

                if( !exists ){
                    if( coll === 'users' ){
                        Meteor.users.insert(el);
                    }else{
                        Mongo.Collection.get(coll).insert(el);
                    }
                }
            });

            return "Any new documents have been added to " +  coll + " by importJSON";
        }
    },

    /**
     * @summary Removes all documents from a collection.
     *
     * @memberof Methods
     * @function importBulkDataRemove
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @return {Object}
     */
    importBulkDataRemove: function (coll ) {
        check(coll, String);

        //* make sure only authorized people can flush out a collection
        if(Meteor.userId() && verifyRole(Meteor.userId(), "administrator") ){                            // check if user is logged in
            Mongo.Collection.get(coll).remove({});      // flush collection before loading new docs
            return {
                status: 200,
                message: "Removed all docs",
                coll: coll,
                method: "importBulkDataRemove"
            }
        }else{
            return {
                status: 500,
                message: "You are not authorized for this activity",
                coll: coll,
                method: "importBulkDataRemove"
            }
        }
    },


    /**
     * @summary Inserts all documents from a file into a collection.
     *
     * @memberof Methods
     * @function importBulkData
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object} doc
     * @return {string}
     */
    importBulkData: function (coll, doc) {
        check(coll, String);
        check(doc, Object);

        if(Meteor.userId() && verifyRole(Meteor.userId(), "administrator") ){                            // check if user is logged in
            let count = 0;

            if (Array.isArray(doc)) {
                count = doc.length;
                doc.forEach(function (item) {
                    Mongo.Collection.get(coll).insert(item);
                })
            } else {
                count = 1;
                Mongo.Collection.get(coll).insert(doc);
            }

            return {
                status: 200,
                message: "New documents have been added",
                coll: coll,
                count: count,
                method: "importBulkData"
            }

        }else{
            return {
                status: 500,
                message: "Insertion failed",
                coll: coll,
                count: 0,
                method: "importBulkData"
            }
        }
    },


    /**
     * @summary Sends documents as CSV from a collection.
     *
     * @memberof Methods
     * @function exportFile
     * @isMethod true
     * @locus Server
     *
     * @requires {flattenObject}_from_'/imports/functionsBoth/func-flattenObject'
     * @requires {myDocuments}_from_'/imports/server/functions/func-myDocuments'
     *
     * @param {String} coll
     * @param {Object} query
     * @param {Object} filter
     * @param {String} heading
     * @param {String} delimiter
     * @return {String}
     */
    exportFile: function(coll, query, filter, heading, delimiter){
        check(coll, String);
        check(query, Object);
        check(filter, Object);
        check(heading, String);
        check(delimiter, String);

        if( Meteor.userId() ){                          // check if user is logged in

            if(query){
                check(query, Object);
            }else{
                query = {};
            }

            if(filter){
                check(filter, Object);
            }else{
                filter = {};
            }

            heading = heading ? heading : false;
            delimiter = delimiter ? delimiter : ",";

            query = myDocuments( query, this.userId, ["author"] );

            let docs = Mongo.Collection.get(coll).find( query, filter ).fetch();
            let data = [];

            docs.forEach( (el) => {
                if( Object.keys(el.data).includes("ids") ){
                    data.push( flattenObject( Object.assign( el.data.ids,  el.data.text ) ) );
                }else{
                    data.push( flattenObject( el.data ) );
                }
            });

            return CSV.unparse( data, heading, delimiter );
        }
    },


    /**
     * @summary Exports documents as CSV from a collection.
     *
     * @memberof Methods
     * @function exportCSV
     * @isMethod true
     * @locus Server
     *
     * @requires {myDocuments}_from_'/imports/server/functions/func-myDocuments'
     *
     * @param {String} coll
     * @param {Object} query
     * @param {Object} filter
     * @param {String} heading
     * @param {String} delimiter
     * @return {String}
     */
    exportCSV: function(coll, query, filter, heading, delimiter){
        check(coll, String);
        check(query, Object);
        check(filter, Object);
        check(heading, String);
        check(delimiter, String);

        if( Meteor.userId() ){                          // check if user is logged in
            if(query){
                check(query, Object);
            }else{
                query = {};
            }

            if(filter){
                check(filter, Object);
            }else{
                filter = {};
            }

            query = myDocuments( query, this.userId, ["author"] );
            heading = heading ? heading : false;
            delimiter = delimiter ? delimiter : ",";
            let docs = Mongo.Collection.get(coll).find( query, filter ).fetch();

            let data = [];
            docs.forEach( (el, idx) => {
                data[idx] = el;
                data[idx]._id = el._id;
            })

            return CSV.unparse( data, heading, delimiter );
        }
    },

    /**
     * @summary Imports documents as CSV to a collection.
     *
     * @memberof Methods
     * @function importCSV
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object} doc
     * @return {string}
     */
    importCSV: function (coll, doc) {
        check(coll, String);
        check(doc, Object);

        if(Meteor.userId()){                            // check if user is logged in
            let exists = true;                          // default value to stop insertion
            let docs = Object.values(doc);

             docs.forEach( (el) => {
                 exists = !!Mongo.Collection.get(coll).findOne( {_id: el._id} );

                 if( !exists ){
                     Mongo.Collection.get(coll).insert(el);
                 }
             })

            return "Any new documents have been added to " +  coll + " by importCSV";

        }
    },

    /**
     * @summary Imports documents as CSV to a collection.
     *
     * @memberof Methods
     * @function importCSVInsert
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object} doc
     * @return {string}
     */
    importCSVInsert: function (coll, doc) {
        check(coll, String);
        check(doc, Object);

        if(Meteor.userId()){                            // check if user is logged in
            delete doc["_id"];
            doc.updatedAt = Date.now();
            let id = Mongo.Collection.get(coll).insert(doc);
            return id + " has been added to " + coll;
        }
    },

    /**
     * @summary Update a document as CSV to a collection.
     *
     * @memberof Methods
     * @function importCSVUpdate
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object} doc
     * @return {string}
     */
    importCSVUpdate: function (coll, doc) {
        check(coll, String);
        check(doc, Object);

        if( Meteor.userId() ) {                           // check if user is logged in
            let docId = doc["_id"];
            delete doc["_id"];
            doc.updatedAt = Date.now();
            Mongo.Collection.get(coll).update( {_id: docId}, doc );
            return docId + " has been updated on " + coll;
        }
    },

});

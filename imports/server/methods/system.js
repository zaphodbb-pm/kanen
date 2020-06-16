import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check'

Meteor.methods({

    /**
     * @summary Meteor method to query server directly tfor system wide information.
     *
     * @memberof Methods
     * @function getSysInfo
     * @isMethod true
     * @locus Server
     *
     * @returns {Object} - document
     */

    getSysInfo: function () {
        return SysConfig.findOne({});
    },

    /**
     * @summary General client side system config info from database.
     *
     * @memberof Methods
     * @function clientSysConfig
     * @isMethod true
     * @locus Server
     *
     * @returns {Object} - client config information
     */

    clientSysConfig() {
        let sysConfig = SysConfig.findOne({});
        let sysDebug = null;
        let showWidgets = false;

        if(sysConfig){
            sysDebug = sysConfig.debugLevel && (sysConfig.debugLevel !== "") ? sysConfig.debugLevel : null;
            showWidgets = !!sysConfig.showWidgets;
        }

        return {
            sysDebug: sysDebug,
            showWidgets: showWidgets,
        };
    },



    /**
     * @summary Meteor method to query server directly to get first document from a collection.
     *
     * @memberof Methods
     * @function getDocId
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll - collection to query
     * @param {String} field - user field to query on
     *
     * @returns {String} - document Id
     */

    getDocId: function (coll, field) {
        check(coll, String);
        check(field, String);

        let docs = null;
        if (Meteor.userId()) {              // check if user is logged in
            let fieldValue = Meteor.user() && Meteor.user()[field] ? Meteor.user()[field] : null;
            let query = {};
            query[field] = fieldValue;

            docs = Mongo.Collection.get(coll).findOne(query, {fields: {_id: 1}});
        }

        return docs ? docs : null;
    },






    /**
     * @summary Builds client side icon set from icon sets from line awesome files in public directory.
     *
     * @memberof Methods
     * @function lineAwesomeIcons
     * @isMethod true
     * @locus Server
     *
     * @param {String} from - folder containg .svg files
     * @param {String} to = folder to receive converted files
     *
     * @returns nothing
     *
     * @notes
     *  1. "from" folder contains .svg files  (typically line awesome files)
     *  2. "to" folder receives .svg files converted into javascript array
     *      compatible with Fontawesome 5 Icons.
     *
     */

    buildLineAwesomeIcons: function (from, to) {
        let fs = require('fs');

        //* get file list from "from" directory
        let rpath = fs.realpathSync("./");              // get full path to active meteor directory
        rpath = rpath.split(".meteor")[0];
        let fileDir = fs.readdirSync(rpath + from);

        //fileDir =fileDir.slice(0, 1);     // for dev only

        //* convert files and write to "to" directory
        fileDir.forEach( (fd) => {
            let name = fd;
            name = name.replace(".svg", "");
            let file = fs.readFileSync(rpath + from + "/" + fd, "utf8");

            if(file){
                let regex = new RegExp(/\<path(.*?)d="/);
                let out1 = file.split(regex);

                if(out1[1]){
                    let path = out1.slice(-1)[0].split('"');
                    let viewBox = out1[0].split('viewBox="');
                    viewBox = viewBox[1].replace('">', '').split(' ');

                    let out = JSON.stringify( {
                        prefix: "far",
                        iconName: name,
                        icon: [ parseInt(viewBox[2]), parseInt(viewBox[3]), [], "", path[0] ]
                    } );

                    fs.writeFileSync(rpath + to + "/" + name + ".json", out);
                }else{
                    console.log("no split", name, out1);
                }

            }else{
                console.log("no file", name, file);
            }
        });
    },


    /*
    /**
     * @summary Meteor method to query server directly for documents.
     *
     * @memberof Methods
     * @function directCollection
     * @isMethod true
     * @locus Server
     *
     * @param {Object} request
     * @returns {Array/Object}
     */

    /*
    directCollection: function (request) {
        check(request, Object);

        //* test if collection exists
        if( request && request.length === 0 ){
            let docs = {};
            docs = Mongo.Collection.get(request.coll).find( {}, {reactive: false} );
            return !!docs;
        }

        //* find one document in collection
        if( request && request.length === 1 ){

            let docs = {};
            let filter = Object.assign( request.filter, request.options  );
            docs = Mongo.Collection.get(request.coll).findOne( request.query, filter );

            if(docs && request.trim) {
                const id = docs._id;
                docs = docs[ request.trim ] ;
                docs._id = id;
            }

            return docs ? docs : null;
        }

        //* find "n" document in collection < limit set in publish method
        if( request && request.length > 1 ){
            let docs = [];
            let filter = Object.assign( request.filter, request.options, {limit: request.length} );
            docs = Mongo.Collection.get(request.coll).find( request.query, filter ).fetch();

            if(docs && request.trim) {


                docs.forEach( (doc, idx) => {
                    const id = doc._id;
                    docs[idx] = doc[ request.trim ];
                    docs[idx]._id = id;
                } );


                _.each( docs, function(el, idx){
                    const id = el._id;
                    docs[idx] = el[ request.trim ];
                    docs[idx]._id = id;
                });

            }

            return docs ? docs : null;
        }

        //* find all documents in collection
        if( request && request.length === -1 ){
            let docs = [];
            let filter = Object.assign(request.filter, request.options);
            docs = Mongo.Collection.get(request.coll).find( request.query, filter ).fetch();

            if(docs && request.trim) {
                docs.forEach( (doc, idx) => {
                    const id = doc._id;
                    docs[idx] = doc[ request.trim ];
                    docs[idx]._id = id;
                } );


                _.each( docs, function(el, idx){
                    const id = el._id;
                    docs[idx] = el[ request.trim ];
                    docs[idx]._id = id;
                });


            }

            return docs ? docs : null;
        }

    }

     */
});

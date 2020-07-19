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
        let confirmDelete = false;

        if(sysConfig){
            sysDebug = sysConfig.debugLevel && (sysConfig.debugLevel !== "") ? sysConfig.debugLevel : null;
            showWidgets = !!sysConfig.showWidgets;
            confirmDelete = !!sysConfig.confirmDelete;
        }

        return {
            confirmDelete: confirmDelete,
            sysDebug: sysDebug,
            showWidgets: showWidgets,
        };
    },


    /**
     * @summary Meteor method to bulk remove documents by admin users.
     *
     * @memberof Methods
     * @function removeDocuments
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll - collection to query
     * @param {Object} query - delete date range
     *
     * @returns {String} - document Id
     */

    removeDocuments: function (coll, query) {
        check(coll, String);
        check(query, Object);

        let number = 0;
        if (Meteor.user() && Meteor.user().admin) {              // check if admin user is logged in
            number = Mongo.Collection.get(coll).remove(query);

            return {status: 200, count: number, text: `${number} documents have been removed on ${coll} by removeDocuments`};
        }else{
            return {status: 400, count: 0, text: "Invalid user"};
        }
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
    }
});

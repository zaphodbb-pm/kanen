/**
 * @summary Collects form inputs and submits to database upsert.
 *
 * @memberof Components_Form
 * @function submitForm
 * @locus Client
 * @augments vue-formHolder
 *
 * @param {Array} doc - document to submit [ {field: value} ]
 * @param {String} coll - name of mongoDB collection to store document
 * @param {Boolean} clone - flag to create a clone of the current document
 * @param {Boolean} test - for testing only; does not submit form but does all the checks
 * @param {Boolean} self - parent's this object
 *
 *
 * @requires {methodReturn}_from_'/imports/client/functions/func-methodReturn'
 *
 * @returns nothing - submits doc object to collection
 *
 */


import {methodReturn} from '/imports/functions/func-methodReturn'
import {Session} from "meteor/session";


export async function submitForm(doc, coll, clone, test, self) {

    //** check if cloning original document, then remove original id field to allow Mongo to complete an insertion
    if (clone) {
        delete doc._id;
        doc.name = `${doc.name}-cloned`;
    }

    //** don't over-write original author in edit mode; create mode needs to add an author
    let me = Meteor.user();
    doc.author = doc.author ? doc.author : Meteor.userId();
    doc.authorName = doc.authorName ? doc.authorName : me.username;
    doc.authorFullName = doc.authorFullName ? doc.authorFullName : (me.profile && me.profile.name ? me.profile.name : "");

    let extras = Session.get("userExtras");
    doc.tenantId = doc.tenantId ? doc.tenantId : extras && extras.tenantId ? extras.tenantId : "general";

    //** provide a case insensitive form of the name for sorted listing
    doc.sortName = doc.name ? doc.name.toLowerCase() : doc.username ? doc.username.toLowerCase() : "undefined";

    let addr, HTTPresult;

    switch (true) {

        case test:                          //** for testing only
            console.log("submitForm-function", coll, doc._id, doc);
            break;

        case coll === "myProfile":
            Meteor.call('employeeUpdateItem', "profile", doc, function (err, res) {
                if (res) {
                    self.$emit("doc-submitted", true);
                }
                methodReturn(err, res);
            });
            break;

        case coll === "users":
            if (!doc._id) {
                Meteor.call('userMgmtInsert', doc, function (err, res) {
                    if (res) {
                        self.$emit("doc-submitted", true);
                    }
                    methodReturn(err, res);
                });
            } else {
                Meteor.call('userMgmtUpdate', doc._id, doc, function (err, res) {
                    if (res) {
                        self.$emit("doc-submitted", true);
                    }
                    methodReturn(err, res);
                });
            }
            break;

        case coll === "employees":
            if (!doc._id) {
                Meteor.call('employeeInsert', doc, function (err, res) {
                    if (res) {
                        self.$emit("doc-submitted", true);
                    }
                    methodReturn(err, res);
                });
            } else {
                Meteor.call('employeeUpdate', doc._id, doc, function (err, res) {
                    if (res) {
                        self.$emit("doc-submitted", true);
                    }
                    methodReturn(err, res);
                });
            }
            break;

        case coll === "merchants":
            addr = [
                doc.address, doc.city ? doc.city : "Ottawa",
                doc.province ? doc.province : "Ontario",
                doc.country ? doc.country : "Canada",
                doc.postCode
            ];

            HTTPresult = await HTTP.getPromise(buildRequestUrl(addr, "array"));

            doc = getGeoLocation(doc, HTTPresult);
            generalSubmit(coll, doc, self);
            break;

        case coll === "events" :
            addr = doc.location ? doc.location : "1 Main, Ottawa, Ontario, Canada";
            HTTPresult = await HTTP.getPromise(buildRequestUrl(addr, "string"));

            doc = getGeoLocation(doc, HTTPresult);
            generalSubmit(coll, doc, self);
            break;

        case coll === "products" :
            addr = doc.location ? doc.location : "1 Main, Ottawa, Ontario, Canada";
            HTTPresult = await HTTP.getPromise(buildRequestUrl(addr, "string"));

            doc = getGeoLocation(doc, HTTPresult);
            generalSubmit(coll, doc, self);
            break;

        default:
            generalSubmit(coll, doc, self);
    }
    return true;
}


function generalSubmit(coll, doc, self) {

    if (!doc._id) {
        Meteor.call('inputterInsert', coll, doc, function (err, res) {
            methodReturn(err, res, "submit inputterInsert");

            if (res) {
                self.$emit("doc-submitted", true);
            }
        });
    } else {
        Meteor.call('inputterUpdate', coll, doc._id, doc, function (err, res) {
            methodReturn(err, res, "submit inputterUpdate");

            if (res) {
                self.$emit("doc-submitted", true);
            }
        });
    }
}

function getGeoLocation(doc, info) {
    //** converts the result from google geocoder into an object that MongoDb can use and adds to field "geoLocation"
    let out = doc;

    if (info && info.statusCode === 200) {
        if (info && info.data && info.data.results[0] && info.data.results[0].geometry && info.data.results[0].geometry.location) {
            let latLng = info.data.results[0].geometry.location;

            if (latLng && typeof latLng === "object") {
                out.geoLocation = {
                    type: "Point",
                    coordinates: [latLng.lng, latLng.lat]
                };
            }
        }
    } else {
        console.warn("http-result-error", info);
    }

    return out;
}


function buildRequestUrl(address, type) {
    //** uses Google maps api to geocode an address string
    let key = Meteor.settings.public.google_maps_api_key;
    let baseUrl = Meteor.settings.public.google_maps_base_uri;
    let url = null;

    if (type === "array") {
        let addr = _.compact(address).join(", ").trim().replace(/\s+/g, "+");
        url = `${baseUrl}=${addr}&key=${key}`;
    }

    if (type === "string") {
        let addr = address.replace(/\s+/g, " ").trim().replace(/\s+/g, "+");
        url = `${baseUrl}=${addr}&key=${key}`;
    }

    return url;
}

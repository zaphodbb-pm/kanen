/**
 * Collects form inputs and submits to database upsert.
 *
 * @memberof Components:Form
 * @function submitForm
 * @locus Client
 * @augments formHolder
 *
 * @param {Array} doc - document to submit [ {field: value} ]
 * @param {String} coll - name of mongoDB collection to store document
 * @param {Boolean} clone - flag to create a clone of the current document
 * @param {Boolean} test - for testing only; does not submit form but does all the checks
 * @param {Boolean} dispatch - parent's dispatch function object
 *
 * @returns nothing - submits doc object to collection
 *
 */


import {methodReturn} from '/imports/functions/methodReturn'


export async function submitForm(doc, coll, clone, test, emit, extras) {
    //** check if cloning original document, then remove original id field to allow Mongo to complete an insertion
    if (clone) {
        delete doc._id;
        doc.name = `${doc.name}-cloned`;
    }

    //** don't over-write original author in edit mode; create mode needs to add an author
    let me = Meteor.user();
    doc.author = doc.author ? doc.author : (Meteor.userId() ? Meteor.userId() : "unknown");
    doc.authorName = doc.authorName ? doc.authorName : (me && me.username ? me.username : "username");
    doc.authorFullName = doc.authorFullName ? doc.authorFullName : (me && me.profile && me.profile.name ? me.profile.name : "");

    doc.tenantId = doc.tenantId ? doc.tenantId : extras && extras.tenantId ? extras.tenantId : "general";

    //** provide a case insensitive form of the name for sorted listing
    doc.sortName = doc.name ? doc.name.toLowerCase() : doc.username ? doc.username.toLowerCase() : "undefined";


    switch (true) {

        case test:                          //** for testing only
            console.log("submitForm-function", coll, doc._id, doc);

            emit("doc-submitted", true);
            break;

 /*       case coll === "myProfile":
            Meteor.call('employeeUpdateItem', "profile", doc, function (err, res) {
                if (res) {
                    emit("doc-submitted", true);
                }
                methodReturn(err, res);
            });
            break;
*/

        case coll === "users":
            if (!doc._id) {
                Meteor.call('userMgmtInsert', doc, function (err, res) {
                    if (res) {
                        emit("doc-submitted", true);
                    }
                    methodReturn(err, res);
                });
            } else {
                Meteor.call('userMgmtUpdate', doc._id, doc, function (err, res) {
                    if (res) {
                        emit("doc-submitted", true);
                    }
                    methodReturn(err, res);
                });
            }
            break;

        default:
            //** check if this document includes a reference to an address; get geo location if true
            if(doc.address){
                let HTTPresult = await HTTP.getPromise(buildRequestUrl(doc.address, "string"));
                doc = getGeoLocation(doc, HTTPresult);


                console.log("address", doc.address, HTTPresult, doc);
            }

            generalSubmit(coll, doc, emit);
    }
    return true;
}


function generalSubmit(coll, doc, emit) {

    if (!doc._id) {
        Meteor.call('insertDoc', coll, doc, function (err, res) {
            methodReturn(err, res, "submit insertDoc");

            if (res) {
                emit("doc-submitted", true);
            }
        });
    } else {
        Meteor.call('updateDoc', coll, doc._id, doc, function (err, res) {
            methodReturn(err, res, "submit updateDoc");

            if (res) {
                emit("doc-submitted", true);
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

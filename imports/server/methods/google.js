import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check'

Meteor.methods({


    /**
     * @summary Meteor method to get address details from Google Geocode REST endpoint.
     *
     * @memberof Methods
     * @function geoAddress
     * @isMethod true
     * @locus Server
     *
     * @param {String} address - address from Places selection
     *
     * @returns {Array} - Google Places predictions
     */

    geoAddress: function (address) {
        check(address, String);

        if (Meteor.user()) {              // check if user is logged in
            const key = Meteor.settings.google_maps_api_key;
            const baseUrl = Meteor.settings.google_maps_base_uri;
            const code = "/geocode/json?";

            if( key && baseUrl ){
                let url = `${baseUrl}${code}address=${address}&key=${key}`;

                let result = HTTP.call("GET", url);

                let geocode = result && result.data && result.data.results ? result.data.results[0] : null;

                if(geocode){
                    geocode = {
                        address: geocode.formatted_address,
                        geometry: geocode.geometry.location,
                        geoLocation: {
                            type: "Point",
                            coordinates: [geocode.geometry.location.lng, geocode.geometry.location.lat]
                        }
                    }
                }

                return {status: 200,  info: geocode, infoStatus: result.statusCode};

            }else{
                return {status: 404,  info: "Missing api key and maps uri"};
            }

        }else{
            return {status: 400,  info: "Invalid user"};
        }
    },

    /**
     * @summary Meteor method to get suggested addresses from Google Places REST endpoint.
     *
     * @memberof Methods
     * @function getPredictions
     * @isMethod true
     * @locus Server
     *
     * @param {String} address - cleaned address to use
     *
     * @returns {Array} - Google Places predictions
     */

    getPredictions: function (address) {
        check(address, String);

        if (Meteor.user()) {              // check if user is logged in
            const key = Meteor.settings.google_maps_api_key;
            const baseUrl = Meteor.settings.google_maps_base_uri;
            const places = "/place/autocomplete/json?";

            if( key && baseUrl ){
                let url = `${baseUrl}${places}input=${address}&key=${key}`;
                let result = HTTP.call("GET", url);
                let predictions = result && result.data && result.data.predictions ? result.data.predictions : null;

                return {status: 200,  info: predictions, infoStatus: result.statusCode};

            }else{
                return {status: 404,  info: "Missing api key and maps uri"};
            }

        }else{
            return {status: 400,  info: "Invalid user"};
        }
    }
});

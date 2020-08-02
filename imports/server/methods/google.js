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

                let data = result && result.data && result.data.results ? result.data.results[0] : null;
                let geocode = {};
                let addressComponents = {};

                //** convert google labels into our own needs
                let label = new Map();
                label.set("street_number", "number");
                label.set("route", "street");
                label.set("locality", "city");
                label.set("administrative_area_level_1", "region");
                label.set("administrative_area_level_2", "division");
                label.set("country", "country");
                label.set("postal_code", "postCode");

                //** build a "parts" field with the address components
                if(data.address_components && data.address_components.length > 0){
                    data.address_components.forEach( (ac) => {
                        let field =  ac.types[0] ? label.get(ac.types[0]) : null;

                        if(field){
                            addressComponents[field] = ac.long_name;
                        }
                    })
                }

                if(data){
                    let loc = data.geometry.location;
                    geocode = {
                        address: data.formatted_address,
                        parts: addressComponents,
                        geometry: loc,
                        geoLocation: {
                            type: "Point",
                            coordinates: [loc.lng, loc.lat]
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

/**
 * @summary System wide common language strings.
 *
 * @memberof Structure:Client
 * @function textCommon
 * @locus Client
 *
 * @returns {Object} text
 *
 */

export default{
    currencies: {
        en: [
            {_id: "usd", name: "US Dollars"},
            {_id: "cad", name: "CDN Dollars"},
            {_id: "euro", name: "Euro"},
            {_id: "mex", name: "Peso"},
        ]
    },

    //** calendar labels
    calendar:    {
        en: {
            duration:  [
                {_id: "m30", name: "30 Min"},
                {_id: "m45", name: "45 Min"},
                {_id: "m60", name: "60 Min"},
                {_id: "m75", name: "75 Min"},
                {_id: "m90", name: "90 Min"},
                {_id: "m120", name: "2 Hrs"},
                {_id: "m240", name: "4 Hrs"},
                {_id: "m480", name: "8 Hrs"},
            ],

            days: [
                {_id: "sun", name: "Sun", pos: 0},
                {_id: "mon", name: "Mon", pos: 1},
                {_id: "tue", name: "Tue", pos: 2},
                {_id: "wed", name: "Wed", pos: 3},
                {_id: "thu", name: "Thu", pos: 4},
                {_id: "fri", name: "Fri", pos: 5},
                {_id: "sat", name: "Sat", pos: 6},
            ],

            daysLong: [
                {_id: "sun", name: "Sunday", pos: 0},
                {_id: "mon", name: "Monday", pos: 1},
                {_id: "tue", name: "Tuesday", pos: 2},
                {_id: "wed", name: "Wednesday", pos: 3},
                {_id: "thu", name: "Thursday", pos: 4},
                {_id: "fri", name: "Friday", pos: 5},
                {_id: "sat", name: "Saturday", pos: 6},
            ],

            months: [
                {_id: "jan", name: "Jan"},
                {_id: "feb", name: "Feb"},
                {_id: "mar", name: "Mar"},
                {_id: "apr", name: "Apr"},
                {_id: "may", name: "May"},
                {_id: "jun", name: "Jun"},
                {_id: "jul", name: "Jul"},
                {_id: "aug", name: "Aug"},
                {_id: "sep", name: "Sep"},
                {_id: "oct", name: "Oct"},
                {_id: "nov", name: "Nov"},
                {_id: "dec", name: "Dec"},
            ]
        },
    },

    searchGeoLocations: {
        en: [
            {_id: "_id.none", name: "World Wide"},
            {_id: "_id.nearby", name: "Nearby"},
            {_id: "_id.citywide", name: "City Wide"},
            {_id: "_id.inregion", name: "In Region"}
        ]
    },

    searchRelativeDates: {
        en: [
            {_id: "_id.none", name: "All Times"},
            {_id: "_id.days1", name: "Today"},
            {_id: "_id.days7", name: "This Week"},
            {_id: "_id.days30", name: "This Month"},
            {_id: "_id.days90", name: "This Quarter"}
        ]
    },

    searchDayOfWeek: {
        en: [
            {_id: "_id.none", name: "All Days"},
            {_id: "_id.mon", name: "Mon"},
            {_id: "_id.tue", name: "Tue"},
            {_id: "_id.wed", name: "Wed"},
            {_id: "_id.thu", name: "Thu"},
            {_id: "_id.fri", name: "Fri"},
            {_id: "_id.sat", name: "Sat"},
            {_id: "_id.sun", name: "Sun"},
        ]
    }
}


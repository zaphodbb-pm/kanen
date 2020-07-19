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


export const fileReader = {
    file_too_long: "Can't load files larger than getImageSizeKB.  <br/>Size = ",
    file_wrong_type: "File type is not supported.  <br/>Type = ",
}

export default{
    userLangs: {
        en: [
            {_id: "all", name: "All Languages"},
            {_id: "en",  name: "English"},
            {_id: "fr",  name: "Francais"},
            {_id: "es",  name: "Espaniol"},
        ]
    },

    currencies: {
        en: [
            {_id: "usd", name: "US Dollars"},
            {_id: "cad", name: "CDN Dollars"},
            {_id: "euro", name: "Euro"},
            {_id: "mex", name: "Peso"},
        ]
    },

    confirmDelete: {
        en: {
            msg: "Deleting this record will remove it permanently.  Are you sure you want to delete it?",
            btn: "Remove"
        }
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
    }
}


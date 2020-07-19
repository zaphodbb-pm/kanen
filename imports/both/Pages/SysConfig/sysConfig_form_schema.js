/**
 * @summary Schema definition object for SysConfig collection.
 *
 * @memberof Pages:SysConfig
 * @function sysConfig_form_schema
 * @locus Anywhere
 * @augments sysConfig_page
 *
 * @returns {Array} - array of field configuration objects
 *
 * @example
 * Schema items
 *          name =          String: name of this document
 *          postMaster =    String: "from" part of system sent email
 *          escalate =      Array: strings of email addresses
 *          confirmDelete = Boolean: forces a confirmation step before deleting a record
 *
 *          logInterval =   Number: for real-time sensors, sets the polling rate
 *          maxLogRecords = Number: set maximum log records to retrieve for export to file
 *          maxUserRecords= Number: set maximum user campaign records to retrieve for export to file
 *          logsDays =      Number: set number of days to retain logs
 *          heartbeat =     Number: seconds timer to let server know that the site is still active
 *
 *          ordersSeq    =  Number:  sequential number for SweatCrew orders
 *          receiptsSeq  =  Number:  sequential number for SweatCrew receipts
 *
 *          logEventsOff =  Boolean: don't save log events
 *          debugLevel =    String: for debug purposes; one or more of "ohefmpstw"
 *          showWidgets =   Boolean: debugging widgets such as lat/lng info
 *
 */


export default [

    {
        // control and decoration for fields in a form
        field: "name",
        fieldType: "input",
        optional: false,

        tab: 0,
        attributes: {type: "text", maxlength: 64},
        params: {},
        defaultValue: "",
    },

    {
        field: "postMaster",
        fieldType: "input",
        optional: true,

        tab: 0,
        attributes: {type: "text", maxlength: 100},
        params: {},
        defaultValue: "",
    },

    {
        field: "escalate",
        fieldType: "input",
        optional: true,

        tab: 0,
        attributes: {type: "text", maxlength: 200},
        params: {},
        defaultValue: "",
    },

    {
        field: "confirmDelete",
        fieldType: "switch",
        tab: 0,
        params: {isCheck: true},
        optional: true,
        defaultValue: false,
    },

    {
        field: "logInterval",
        fieldType: "input",
        optional: true,

        tab: 0,
        attributes: {type: "number", min: 1000, max: 3600000, step: 1},
        params: {},
        defaultValue: 2000,
    },

    {
        field: "maxLogRecords",
        fieldType: "input",
        tab: 0,
        optional: true,

        attributes: {type: "number", step: 1},
        params: {},
        defaultValue: 100,
    },

    {
        field: "maxUserRecords",
        fieldType: "input",
        optional: true,

        tab: 0,
        attributes: {type: "number", step: 1},
        params: {},
        defaultValue: 100,
    },

    {
        field: "logsDays",
        fieldType: "input",
        tab: 0,
        attributes: {type: "number", step: 1},
        params: {},
        optional: true,
        defaultValue: 100,
    },

    {
        field: "heartbeat",
        fieldType: "input",
        tab: 0,
        attributes: {type: "number", min: 20, max: 60, step: 1},
        params: {},
        optional: true,
        defaultValue: 100,
    },

    {
        field: "ordersSeq",
        fieldType: "input",
        tab: 0,
        attributes: {type: "number", step: 1, readonly: true},
        params: {},
        optional: true,
        defaultValue: 1,
    },

    {
        field: "receiptsSeq",
        fieldType: "input",
        tab: 0,
        attributes: {type: "number", step: 1, readonly: true},
        params: {},
        optional: true,
        defaultValue: 1,
    },


    //** second tab - debug parameters
    {
        field: "logEventsOff",
        fieldType: "switch",
        tab: 1,
        params: {isCheck: true},
        optional: true,
        defaultValue: true,
    },

    {
        field: "debugLevel",
        fieldType: "input",
        tab: 1,
        attributes: {type: "text", maxlength: 24},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "showWidgets",
        fieldType: "switch",
        tab: 1,
        params: {isCheck: true},
        optional: true,
        defaultValue: false,
    },
];

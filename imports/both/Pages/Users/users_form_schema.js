/**
 * @summary Schema definition object for Users collection.
 *
 * @memberof Pages:Users
 * @function users_form_schema
 * @locus Anywhere
 * @augments users_page
 *
 * @returns {Array} - array of field configuration objects
 *
 * @example
 * Schema items
 *          username =      String: name of this user
 *          tenantId =      String: unique tenant name for this user
 *          role  =         Object: user roles for access to capabilities
 *          emailMain =     String: valid email
 *          pwdMain =       String: new password for user or username is default
 *
 *          active =        Boolean: make user info active
 *          groups =        String: user group
 *          groupMaster =   Boolean: can manage their own groups,
 *          apiKey =        String: long random alpha-numeric string
 *          admin =         Boolean: administrator access
 *
 */



export default [

    {
        field: "username",
        fieldType: "input",
        tab: 0,
        group: null,  //group: {section: 2, class: "is-one-quarter"},
        attributes: {type: "text", maxlength: 64},
        params: {},
        optional: false,
        defaultValue: "",
    },

    {
        field: "emailMain",
        fieldType: "input",
        tab: 0,
        attributes: {type: "email", maxlength: 100},
        params: {},
        optional: false,
        defaultValue: "",
    },

    {
        field: "pwdMain",
        fieldType: "input",
        tab: 0,
        group: null,

        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "role",
        fieldType: "select",
        tab: 0,
        attributes: {},
        css: "is-fullwidth",
        params: {type: "staticSelect"},
        optional: true,
        defaultValue: {_id: "basic", name: "Basic"},
    },

    {
        field: "hr1",
        fieldType: "hr",
        tab: 0,
        optional: true,
    },

    {
        field: "tenantId",
        fieldType: "input",
        tab: 0,
        group: null,

        attributes: {type: "text", maxlength: 128},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "active",
        fieldType: "switch",
        tab: 0,
        attributes: {},
        params: {isCheck: true},
        optional: true,
        defaultValue: false,
    },

    {
        field: "groups",
        fieldType: "input",
        tab: 0,
        attributes: {type: "text", maxlength: 100},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "groupMaster",
        fieldType: "switch",
        tab: 0,
        attributes: {},
        params: {isCheck: true},
        optional: true,
        defaultValue: false,
    },

    {
        field: "apiKey",
        fieldType: "apiKey",
        tab: 0,
        attributes: {},
        params: {length: 24},
        adjustLabel: true,
        optional: true,
        defaultValue: "",
    },

    {
        field: "admin",
        fieldType: "switch",
        tab: 0,
        attributes: {},
        params: {isCheck: true},
        optional: true,
        defaultValue: false,
    }
];

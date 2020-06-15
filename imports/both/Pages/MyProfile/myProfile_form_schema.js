/**
 * Schema definition object for User Profile.
 *
 * @memberof Pages:MyProfile
 * @function myProfile_form_schema
 * @locus Anywhere
 * @augments myProfile_form
 *
 * @returns {Object}
 *
 *
 * @example
 *  This form's object fields
 *          name =              String: first and last name of this customer (document)
 *          image =             String: data uri encoded small user image
 *
 *          phone =             String: phone of contact
 *          email =             String: email of contact
 *
 *          street =            String: address: street name
 *          city =              String: address: city
 *          province =          String: address: province / state
 *          country =           String: address: country
 *          postCode =          String: address: postal or zip code
 *
 */

export default [

    //** first tabbed set of fields
    {
        // control and decoration for fields in a form
        field: "name",
        fieldType: "input",
        tab: 0,
        group: null,  //group: {section: 2, class: "is-one-quarter"},

        attributes: {type: "text", maxlength: 64},
        params: {},
        optional: false,
        defaultValue: "",
    },

    {
        field: "image",
        fieldType: "fileInput",
        tab: 0,
        adjustLabel: true,
        attributes: {},
        params: {format: "image", type: [/image.*/]},
        optional: true,
        defaultValue: {name: "", src: ""},
    },

    {
        field: "hr1",
        fieldType: "hr",
        tab: 0,
        optional: true,
    },

    {
        field: "phone",
        fieldType: "input",
        tab: 0,
        group: {section: 0, class: "is-one-third"},
        attributes: {type: "tel", maxlength: 32},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "email",
        fieldType: "input",
        tab: 0,
        group: {section: 0, class: ""},
        attributes: {type: "email", maxlength: 100},
        params: {},
        optional: true,
        defaultValue: "",
    },


    //** second set of tabs
    {
        field: "address",
        fieldType: "input",
        tab: 1,
        group: {section: 3, class: "is-two-thirds"},
        attributes: {type: "text", maxlength: 100},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "city",
        fieldType: "input",
        tab: 1,
        group: {section: 3, class: ""},
        attributes: {type: "text", maxlength: 100},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "province",
        fieldType: "input",
        tab: 1,
        group: {section: 4, class: ""},
        attributes: {type: "text", maxlength: 50},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "country",
        fieldType: "input",
        tab: 1,
        group: {section: 4, class: ""},
        attributes: {type: "text", maxlength: 50},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "postCode",
        fieldType: "input",
        tab: 1,
        group: {section: 4, class: "is-one-quarter"},
        attributes: {type: "text", maxlength: 32},
        params: {},
        optional: true,
        defaultValue: "",
    }
];

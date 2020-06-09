/**
 * Configuration for Login components (optional).
 *
 * @memberof Pages:Login
 * @function login_config
 * @locus Client
 * @augments login
 *
 * @returns {Object}
 */

export default {

    form: [

        {
            field: "loginEmail",
            fieldType: "input",
            optional: true,
            tab: 0,

            attributes: {type: "email"},
            params: {},
            defaultValue: "",
        },

        {
            field: "loginPassword",
            fieldType: "input",
            optional: true,
            tab: 0,

            attributes: {type: "password"},
            params: {},
            defaultValue: "",
        },

        {
            field: "loginSwitch",
            fieldType: "switch",
            optional: true,

            tab: 0,
            attributes: {},
            params: {},
            defaultValue: false,
        }
    ]
};

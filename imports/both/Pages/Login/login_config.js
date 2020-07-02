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

export const pageConfig =  {

    form: [

        {
            field: "loginEmail",
            fieldType: "input",
            optional: true,
            tab: 0,

            attributes: {type: "email", autocomplete: "username"},
            params: {},
            defaultValue: "",
            value: "",              // force value; usual set by formHolder
        },

        {
            field: "loginPassword",
            fieldType: "input",
            optional: true,
            tab: 0,

            attributes: {type: "password", autocomplete: "current-password"},
            params: {},
            defaultValue: "",
            value: "",              // force value; usual set by formHolder
        }
    ],

    //** each login services also needs registration on the server:main.js -> function registerExternalLogin()
    services: [
        {
            icon:   "iconGoogle",
            title:  "Google",
            service: "loginWithGoogle"
        }

    ]
};

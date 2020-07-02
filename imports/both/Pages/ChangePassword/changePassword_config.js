/**
 * Configuration for ChangePassword components (optional).
 *
 * @memberof Pages:ChangePassword
 * @function changePassword_config
 * @locus Client
 * @augments changePassword
 *
 * @returns {Object}
 */

export const pageConfig =  {

    form: [

        {
            field: "oldPassword",
            fieldType: "input",
            optional: true,
            tab: 0,

            attributes: {type: "password", autocomplete: "current-password"},
            params: {},
            defaultValue: "",
            value: "",              // force value; usual set by formHolder
        },

        {
            field: "newPassword",
            fieldType: "input",
            optional: true,
            tab: 0,

            attributes: {type: "password", autocomplete: "current-password"},
            params: {},
            defaultValue: "",
            value: "",              // force value; usual set by formHolder
        }
    ]
};

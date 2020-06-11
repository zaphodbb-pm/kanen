/**
 * Labels for ChangePassword page.
 *
 * @memberof Pages:ChangePassword
 * @function changePassword_text
 * @locus Client
 * @augments changePassword
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "Change Password Form"},
    lead:   {en: "Start with your old password and then enter a new one."},
    body:   {en: ""},
};


export const page = {

    page: {
        en: {
            //* card general labels
            btnSend: "Change Password",

            //* card field specific labels
            labelTitle: "Change Password",
        }
    },

    form: {
        en: {
            oldPassword: {
                label: "Enter Old Password",
                helpText: "",
                tag: {
                    show: "Show Old Password",
                    hide: "Hide Old Password",
                }
            },

            newPassword: {
                label: "Enter New Password",
                helpText: "TBD check strength",
                tag: {
                    show: "Show New Password",
                    hide: "Hide New Password",
                }
            }
        }
    },

    errMsg: {
        en: {
            200: "Password changed",

            400: "Password fields may not be empty.",
            401: "You must be logged in to change your password.",
            403: "Incorrect Old Password",

            500: "System problem"
        }
    }
};

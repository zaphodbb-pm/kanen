/**
 * Labels for Login page.
 *
 * @memberof Pages:Login
 * @function login_text
 * @locus Client
 * @augments login
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "Login Form"},
    lead:   {en: "Direct login or account service."},
    body:   {en: "Please use your unique e-mail address to login or another account service that you are a member of."},
};


export const page = {

    page: {
        en: {
            //* card general labels
            btnSend: "Sign In",

            //* card field specific labels
            labelTitle: "Log In",
            labelDivider: "OR",
        }
    },

    form: {
        en: {
            loginEmail: {
                label: "Email",
                helpText: "Checks for valid email before saving.  This field is 'watched' by startPhone at right.",
            },

            loginPassword: {
                label: "Password",
                helpText: "TBD check strength",
                tag: {
                    show: "Show Password",
                    hide: "Hide Password",
                }
            }
        }
    }
};

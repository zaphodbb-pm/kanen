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
            btnReceive: "Receive Info",

            //* card field specific labels
            labelTitle: "Log In",
            labelEmail: "Email Address",
            labelPassword: "Enter Password",
            labelDivider: "OR",
            labelShowPassword: "Show Password"
        }
    },

    form: {
        en: {
            loginEmail: {
                label: "Email Input",
                helpText: "Checks for valid email before saving.  This field is 'watched' by startPhone at right.",
            },

            loginPassword: {
                label: "Password Input",
                helpText: "TBD check strength",
            },

            loginSwitch: {
                label: "",
                tag: "Show Password",
                helpText: "",
            }
        }
    }
};

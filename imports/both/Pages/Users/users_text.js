/**
 * @summary Labels for Users page.
 *
 * @memberof Pages:Users
 * @function users_text
 * @locus Client
 * @augments users
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "Users Management Page"},
    lead:   {en: ""},
    body:   {en: ""},
};


export const page = {

    form: {
        en: {
            labels: {
                hdr:        "User Information",
                txt:        "",
                clone:      true,
                cloneBtn:   "Clone Item",
                createBtn:  "Create New Doc",
                editBtn:    "Save Content Edit",
                backBtn:    "Back to List",
                previewBtn: "Preview",

                invalidInput:  {
                    prefix: "Can't submit: ",
                    suffix1: " item needs entered value.",
                    suffixn: " items need entered values."
                }
            },

            formTabs: [],

            //** Form field text ********************************************
            username: {
                label:      "Name",
                helpText: "Enter a first name and last name for this user.",
            },

            emailMain: {
                label:      "Email",
                helpText: "User unique email tag.",
            },

            pwdMain: {
                label: "Set Password",
                helpText: "",
            },

            role: {
                label: "Role",
                helpText: "User roles are defined by the payment system.",
                selects: [
                    {_id: "basic", name: "Basic"},
                    {_id: "standard", name: "Standard"},
                    {_id: "pro", name: "Pro"},
                    {_id: "siteAdmin", name: "Site Admin"},
                    {_id: "administrator", name: "Administrator"},
                ],
            },

            hr1: {
                label: "",
                tag: "Site Admin Only"
            },

            tenantId: {
                label: "Tenant",
                helpText: "Each user needs to be assigned to a unique tenant id.  " +
                    "This should be the one assigned to either a company or a merchant.",
            },

            active: {
                label: "User Active",
                tag: "Make Active",
                helpText: "",
            },

            groups: {
                label:      "Groups",
                helpText: "Add a list of groups that this user belongs to.  Delimit each group name by a comma ',' " +
                    "and do not use spaces in a group name but rather use and underscore '_'.  " +
                    "Note that a member of a group can not see the other group member's data unless a group master.",
            },

            groupMaster: {
                label: "Group Master",
                tag: "Make Group Master",
                helpText: "A user can be designated to be an a Group Master for all groups that a user is memeber of.  " +
                    "This can only be set by another administrator and is managed by the server to ensure security.",
            },

            apiKey: {
                label: "API Key",
                helpText: "Set the user's api key.",
            },

            admin: {
                label: "Administrator",
                tag: "Make Admin",
                helpText: "A user can be designated to be an administrator.  This can only be set by another administrator " +
                    "and is managed by the server to ensure security.",
            }
        }
    },

    list: {
        en: {

            labels: {
                hdr: "List of Users",
                addNew: "Add New"
            },

            username: {
                label: "Name",
            },

            emails: {
                label: "Email"
            },

            tenantId: {
                label: "Tenant"
            },

            role: {
                label: "Role"
            },

            _id: {
                label: "Del",
            }
        }
    },
};

/**
 * Labels for MyProfile page.
 *
 * @memberof Pages:MyProfile
 * @function myProfile_text
 * @locus Client
 * @augments myProfile
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "My Profile Page"},
    lead:   {en: ""},
    body:   {en: ""},
};


export const page = {
    page: {},

    form: {
        en: {

            labels: {
                hdr: "My Personal Information",
                clone: false,
                cloneBtn: "Clone Item",
                createBtn: "Create New Entry",
                editBtn: "Save Edit",
            },

            formTabs: ["Main", "My Address"],


            //** Parameters ********************************************
            name: {
                label: "First Name and Last Name",
                helpText: "",
            },

            image: {
                label: "Profile Image",
                helpText: "Add your unique profile image.",
            },

            hr1: {
                label: "",
                tag: "Contact Info"
            },

            phone: {
                label: "Phone",
                helpText: "",
            },

            email: {
                label: "Email",
                helpText: "Secondary email, when set, will receive any mail notifications.  Note that this email address must be unique and your own.  " +
                    "Sweatcrew will check to see if another user has the same email.  If so, your choice will be reset to your last known " +
                    "secondary value.  Otherwise it will be accepted and will be become active.",
            },

            //** second tab set of fields
            address: {
                label: "Address",
                helpText: "Street address for customer",
            },

            city: {
                label: "City",
                helpText: "",
            },

            province: {
                label: "Province",
                helpText: "",
            },

            country: {
                label: "Country",
                helpText: "",
            },

            postCode: {
                label: "Post",
                helpText: "",
            },
        }
    },
};

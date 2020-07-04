/**
 * Labels for Navbar items.
 *
 * @memberof Navbar
 * @function Navbar_text
 * @locus Client
 * @augments Navbar
 *
 * @returns {Object}
 */



export const navbar = {
    en: {
        userProfile: {
            toProfile: "Profile",
            signIn: "Sign In",
            logOut: "Log Out",
            changePassword: "Change Password",
            title: "user image"
        },

        userCredit: {
            credits: "Credits"

        },

        notifications: {
            read: "Read"
        }
    }
};

export const gdpr = {
    en: {
        elementId: "gdprAsk",

        title: "Cookies & Privacy Policy",

        msg: "This website stores cookies on your computer. These cookies are used to collect information about " +
            "how you interact with our website and allow us to remember you. We use this information in order to improve and " +
            "customize your browsing experience.  To find out more about the cookies we use, " +
            "see our <a href='/privacy-policy/' target='_blank'>Privacy Policy.</a>. <br/><br/>" +
            "If you decline, your information won’t be tracked when you visit this website. " +
            "A single cookie will be used in your browser to remember your preference not to be tracked. " +
            "Learn more about how to <a href='https://cookiesandyou.com/' target='_blank'>manage</a> your cookies ...",

        btnAccept: "Accept",

        btnDecline: "Decline",

        debug: true
    }
}

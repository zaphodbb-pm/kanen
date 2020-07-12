/**
 * Nav label for ChangePassword page.
 *
 * @memberof Pages:ChangePassword
 * @function changePassword_nav
 * @locus Anywhere
 * @augments changePassword
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 *
 */


export const nav = {en: "Change Password"};

export const link = "/changePassword";

export const icon = "iconChangePwd";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
let demoMode = Meteor.settings.public.demo_mode;

const normal = {
    read: ["basic", "standard", "pro", "siteAdmin"],
    write: ["basic", "standard", "pro", "siteAdmin"]
}

const demo = {
    read: ["basic", "standard", "pro", "siteAdmin"],
    write: ["siteAdmin"]
}

export const roles = demoMode ? demo : normal;

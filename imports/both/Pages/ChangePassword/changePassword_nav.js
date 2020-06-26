/**
 * Nav label for ChangePassword page.
 *
 * @memberof Pages:ChangePassword
 * @function changePassword_nav
 * @locus Client
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
export const roles = {
    read: ["basic", "standard", "pro", "siteAdmin"],
    write: ["basic", "standard", "pro", "siteAdmin"]
}

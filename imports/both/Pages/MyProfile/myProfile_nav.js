/**
 * Nav label for MyProfile page.
 *
 * @memberof Pages:MyProfile
 * @function myProfile_nav
 * @locus Client
 * @augments myProfile
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 */


export const nav = {en: "My Profile"};

export const link = "/my-profile";

export const icon = "iconMyProfile";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["basic", "standard", "pro", "siteAdmin"],
    write: ["basic", "standard", "pro", "siteAdmin"]
}

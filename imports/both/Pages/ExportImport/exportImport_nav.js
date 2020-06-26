/**
 * Nav label for ExportImport page.
 *
 * @memberof Pages:ExportImport
 * @function exportImport_nav
 * @locus Client
 * @augments exportImport
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 *
 */


export const nav = {en: "Export Import"};

export const link = "/exportImport";

export const icon = "iconExportImport";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["administrator"],
    write: ["administrator"]
}

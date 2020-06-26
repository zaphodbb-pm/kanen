/**
 * Extends the MongoDb projection objects for various read requests.
 *
 * @memberof Structure:Server
 * @function fieldAddons
 * @locus Server
 *
 * @returns {Object} - fieldAddons: extra fields to be added to a projection
 */

export const fieldAddons =  {
    updatedAt: 1,
    author: 1,
    authorName: 1,
    authorFullName: 1,
    group: 1,
    tenantId: 1,
}

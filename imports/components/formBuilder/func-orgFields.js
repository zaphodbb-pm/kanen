/**
 * @summary Prepares the form fields object for tabbed / grouped display.
 *
 * @memberof Components:Form
 * @function orgFields
 * @locus Client
 * @augments formHolder
 *
 * @param {Object} org - {hasTabs, tabLen, hasGroups}
 * @param {Array} fields - array of form fields object
 * @param {Object} val - field values from database
 * @param {String} role - user role that is allowed to view a field; default is all may view
 *
 * @returns {Array} - fields in an array of arrays of field objects
 *
 */



export function orgFields(org, fields, val, role) {
    let arr = [];
    let adjFields = [];

    fields.forEach(function (f) {

        //** check if this user role can see this field
        let showField = f.role && Array.isArray(f.role) ? f.role.includes(role) : true;

        if (showField) {
            let fld = f;
            fld.value = val && typeof val[fld.field] !== "undefined" ? val[fld.field] : fld.defaultValue;

            adjFields.push(fld);
        }
    });

    switch (true) {

        case !org.hasTabs && org.hasGroups:
            arr = findGroupedFields(adjFields);
            break;

        case org.hasTabs && !org.hasGroups && org.tabLen > 0:
            arr = buildEmptyArray(arr, org.tabLen);       // build two dimensional array for tabs

            //*** sort field array into tabs
            adjFields.forEach(function (fld) {
                if (fld.tab) {
                    arr[fld.tab].push(fld);
                } else {
                    arr[0].push(fld);
                }
            });
            break;

        case org.hasTabs && org.hasGroups && org.tabLen > 0:
            arr = buildEmptyArray(arr, org.tabLen);       // build two dimensional array for tabs

            //*** sort field array into tabs
            adjFields.forEach(function (fld) {
                if (fld.tab) {
                    arr[fld.tab].push(fld);
                } else {
                    arr[0].push(fld);
                }
            });

            //*** for each tab, find grouped fields
            let groups = [];

            arr.forEach(function (section) {
                groups.push(findGroupedFields(section));
            });

            arr = groups;
            break;

        default:
            arr = adjFields;
    }

    return arr;
}


function buildEmptyArray(arr, len) {
    for (let i = 0; i < len; i++) {
        arr.push([]);
    }

    return arr;
}


function findGroupedFields(fields) {
    let grouped = [];
    let groups = [];
    let grpNum = 0;

    fields.forEach(function (fld, idx) {
        if (typeof fld.group === 'object' && fld.group && typeof fld.group.section === 'number') {

            if ((grpNum !== fld.group.section && groups.length > 0)) {
                grouped.push(groups);
                groups = [];
            }

            groups.push(fld);

            grpNum = fld.group.section;

            if ((idx === fields.length - 1) && (groups.length > 0)) {
                grouped.push(groups);
            }

        } else {

            if (groups.length > 0) {
                grouped.push(groups);
                groups = [];
            }

            grouped.push([fld]);
        }
    });

    return grouped;
}

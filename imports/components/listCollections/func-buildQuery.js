/**
 * @summary  Build MongoDb query object.
 *
 * @memberof Components:List
 * @function buildQuery
 * @locus Client
 * @augments vue-listHolder
 *
 *
 * @param {String} str
 * @param {Array} fields
 * @return {Object} modified MongoDb query
 *
 */


//** common query building function
export function buildQuery(str, fields) {
    let compound = null;

    if (!str.includes(";") && !str.includes("+")) {
        let search = [];

        _.each(fields, function (el) {
            let s = {};
            s[el] = checkString(str);
            search.push(s);
        });

        if (str.includes("!")) {
            compound = {$nor: search};
        } else {
            compound = {$or: search};
        }
    }


    if (str.includes(";")) {
        compound = orSplit(str, fields);
    }


    if (!str.includes(";") && str.includes("+")) {
        compound = andSplit(str, fields);
    }


    return compound;
}


function checkString(str) {
    if (str.charAt(0) === "!") {
        return {$regex: ".*" + str.slice(1) + ".*", $options: "i"};
    } else {
        return {$regex: ".*" + str + ".*", $options: "i"};
    }
}


function orSplit(arr, fields) {
    let ors = arr.split(";");
    let orArray = [];

    _.each(ors, function (el) {
        let orTerm = [];

        if (el.includes("+")) {
            orArray.push(andSplit(el, fields));
        } else {
            _.each(fields, function (eli) {
                let item = {};

                if (el.length > 1) {                //need at least two characters to form a compound search
                    item[eli] = {$regex: ".*" + el + ".*", $options: "i"};
                    orTerm.push(item);
                }
            });

            if (orTerm.length > 0) {
                orArray.push({$or: orTerm});
            }
        }
    });

    return {$or: orArray};
}


function andSplit(arr, fields) {
    let ands = arr.split("+");
    let andArray = [];

    _.each(ands, function (el) {
        let andTerm = [];

        _.each(fields, function (eli) {
            let item = {};
            if (el.length > 1) {                //need at least two characters to form a compound search
                item[eli] = checkString(el);
                andTerm.push(item);
            }
        });

        if (andTerm.length > 0) {
            if (el.includes("!")) {
                andArray.push({$nor: andTerm});
            } else {
                andArray.push({$or: andTerm});
            }
        }
    });

    return {$and: andArray};
}

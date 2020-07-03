/**
 * @summary  Common routine to calculate MongoDB filters to streamline search.
 *
 * @memberof Components:List
 * @function buildFilter
 * @locus Client
 * @augments listHolder
 *
 * @param {Number} numItems - Integer: from rows/page selector to set number documents to fetch
 * @param {Number} start - Integer: the pointer to where to start getting numItems
 * @param {Number} queried - Integer: total number documents available to meet author / group criteria
 * @param {Object} sort - any MongoDb sort field parameters
 * @return {{start: number, end: number, filterSubscribe: {sort: {}, limit: number}, filterSearch: {sort: {}, skip: number, limit: number}}}
 *
 * @example
 *  Output =            Object:
 *      start =         Integer: calulated positin in document list
 *      end =           Integer: number documents to display
 *      filterSubscribe = Object: used to limit the subscription size
 *      filterSearch =  Object: MongoDb option object
 */


export function buildFilter(numItems, start, queried, sort) {

    let startNum = numItems * (start - 1) + 1;
    let end = startNum + numItems - 1;
    end = end < queried ? end : queried;                            // check for overflow at end
    startNum = startNum <= queried ? startNum : queried - numItems;  // show only remainder at highest pager number
    startNum = startNum < 1 ? 1 : startNum;                         // prevent underflow if user changes rows/page selection

    //** adjust for remainder of items at highest pager level
    let size = (queried - startNum > numItems) ? numItems : queried - startNum + 1;

    let fSub = {
        sort: sort ? sort : {},
        limit: size                                            // adjust the max number of docs equal to the page plus rows selection
    };

    let fSearch = {
        sort: sort ? sort : {},
        skip: startNum - 1,
        limit: size
    };

    return {start: startNum, end: end, filterSubscribe: fSub, filterSearch: fSearch}
}

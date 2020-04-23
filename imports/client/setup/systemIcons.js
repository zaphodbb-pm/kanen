/**
 * Gets svg icons ready for insertion into top level app context
 *
 * @memberof Setup:Client
 * @function systemIcons
 * @isTemplate true
 * @locus Client
 *
 * @returns {Object} out - holds the icon svg info
 *
 * @notes
 *      1. Import svg file from library and insert into returned object
 *
 * @example
 *      iconNotify = bell
 *      iconBeer = beer
 *      iconMark = bookmark
 */

let out = {};


import bell from 'svelte-awesome/icons/bell-o';
out.iconNotify = bell;

import beer from 'svelte-awesome/icons/beer';
out.iconBeer = beer;

import bookmark from 'svelte-awesome/icons/bookmark-o';
out.iconMark = bookmark;

import post from 'svelte-awesome/icons/clock-o';
out.iconPost = post;

import home from 'svelte-awesome/icons/home';
out.iconHome = home;

import learn from 'svelte-awesome/icons/graduation-cap';
out.iconLearn = learn;

export default out;

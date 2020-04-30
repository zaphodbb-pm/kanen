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

import logo from './icons/logo.js';
out.iconLogo = logo;

import cancel from './icons/times-circle'
out.iconCancel = cancel;

import bell from './icons/bell';
out.iconNotify = bell;

import beer from 'svelte-awesome/icons/beer';
out.iconBeer = beer;

import bookmark from 'svelte-awesome/icons/bookmark-o';
out.iconMark = bookmark;

import post from './icons/clipboard-list';
out.iconPost = post;

import home from 'svelte-awesome/icons/home';
out.iconHome = home;

import learn from 'svelte-awesome/icons/graduation-cap';
out.iconLearn = learn;

export default out;

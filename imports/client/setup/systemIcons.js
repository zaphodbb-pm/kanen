/**
 * Gets svg icons ready for insertion into top level app context
 *
 * @memberof Setup:Client
 * @function systemIcons
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

//* project logo
import logo from '/public/svg_to_js/seedling-solid.json';
out.iconLogo = logo;

//* page icons
import home from '/public/svg_to_js/home-solid.json';
out.iconHome = home;

import widget from '/public/svg_to_js/puzzle-piece-solid.json';
out.iconWidget = widget;

import learn from '/public/svg_to_js/graduation-cap-solid.json';
out.iconLearn = learn;

import content from '/public/svg_to_js/folder-open.json';
out.iconContent = content;

import addressCard from '/public/svg_to_js/address-card.json';
out.iconCard = addressCard;



//* navbar icons
import bell from '/public/svg_to_js/bell.json';
out.iconNotify = bell;

import bookmark from '/public/svg_to_js/bookmark.json';
out.iconMark = bookmark;

import post from '/public/svg_to_js/clipboard-list-solid.json';
out.iconPost = post;



//* component icons
import music from '/public/svg_to_js/music-solid.json';
out.iconMusic = music;

import film from '/public/svg_to_js/film-solid.json';
out.iconFilm = film;

import image from '/public/svg_to_js/image.json';
out.iconImage = image;

import fileAlt from '/public/svg_to_js/file-alt.json';
out.iconDoc = fileAlt;




import cancel from '/public/svg_to_js/times-circle.json';
out.iconCancel = cancel;

import boxOpen from '/public/svg_to_js/box-open-solid.json';
out.iconPayload = boxOpen;

import cog from '/public/svg_to_js/cog-solid.json';
out.iconConfig = cog;

import arrowCircleRight from '/public/svg_to_js/arrow-alt-circle-right.json';
out.iconMoreCircle = arrowCircleRight;

import more from '/public/svg_to_js/caret-right-solid.json';
out.iconMore = more;


//* other icons

import beer from '/public/svg_to_js/beer-solid.json';
out.iconBeer = beer;




export const mainIcons = out;

/*
//* project logo
import logo from './icons/logo.js';
out.iconLogo = logo;

import logo2 from './icons/logo2.js';
out.iconLogo2 = logo2;

import logo3 from './icons/logo3.js';
out.iconLogo3 = logo3;

//* page icons
import home from './icons/home';
out.iconHome = home;

import widget from './icons/puzzle-piece';
out.iconWidget = widget;

import learn from 'svelte-awesome/icons/graduation-cap';
out.iconLearn = learn;

import content from './icons/folder-open';
out.iconContent = content;

import addressCard from './icons/address-card';
out.iconCard = addressCard;



//* navbar icons
import bell from './icons/bell';
out.iconNotify = bell;

import bookmark from 'svelte-awesome/icons/bookmark-o';
out.iconMark = bookmark;

import post from './icons/clipboard-list';
out.iconPost = post;



//* component icons
import music from './icons/music'
out.iconMusic = music;

import film from './icons/film'
out.iconFilm = film;

import image from './icons/image'
out.iconImage = image;

import fileAlt from './icons/file-alt'
out.iconDoc = fileAlt;




import cancel from './icons/times-circle'
out.iconCancel = cancel;

import boxOpen from './icons/box-open';
out.iconPayload = boxOpen;

import cog from './icons/cog';
out.iconConfig = cog;

import arrowCircleRight from './icons/arrow-circle-right';
out.iconMoreCircle = arrowCircleRight;

import more from 'svelte-awesome/icons/caret-right';
out.iconMore = more;


//* other icons

import beer from 'svelte-awesome/icons/beer';
out.iconBeer = beer;

 */

//export const mainIcons = out;


/*
import home from 'svelte-awesome/icons/home';
out.iconHome = home;
 */

/**
 * @summary Gets svg icons ready for insertion into top level app context
 *
 * @memberof Setup:Client
 * @function systemIcons
 * @locus Client
 *
 * @returns {Object} out - holds the icon svg info in json format
 *
 * @notes
 *      1. Icon information is compatible with Font Awesome 5 format {prefix, iconName, icon: [path]}
 *
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

import icons from '/public/svg_to_js/icons-solid.json';
out.iconIcons = icons;

import palette from '/public/svg_to_js/palette-solid.json';
out.iconColours = palette;


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

/**
 * @summary Gets svg Icons ready for insertion into top level app context
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



//* page Icons
import home from '/public/svg_to_js/home-solid.json';
out.iconHome = home;

import widget from '/public/svg_to_js/puzzle-piece-solid.json';
out.iconWidget = widget;

import learn from '/public/svg_to_js/graduation-cap-solid.json';
out.iconLearn = learn;


import content from '/public/svg_to_js/book-open-solid.json';
out.iconContent = content;

import addressCard from '/public/svg_to_js/address-card.json';
out.iconCard = addressCard;

import icons from '/public/svg_to_js/icons-solid.json';
out.iconIcons = icons;

import palette from '/public/svg_to_js/palette-solid.json';
out.iconColours = palette;

import hammer from '/public/svg_to_js/hammer-solid.json';
out.iconTemplate = hammer;

import database from '/public/svg_to_js/database-solid.json';
out.iconListForm = database;



//* Navbar Icons
import bell from '/public/svg_to_js/bell.json';
out.iconNotify = bell;

import bookmark from '/public/svg_to_js/bookmark.json';
out.iconMark = bookmark;

import post from '/public/svg_to_js/clipboard-list-solid.json';
out.iconPost = post;

import rows from '/public/svg_to_js/list-ul-solid.json';
out.iconRows = rows;

import documentation from '/public/svg_to_js/laptop-code-solid.json';
out.iconDocumentation = documentation;





//* component Icons
import apiKey from '/public/svg_to_js/key-solid.json';
out.iconApiKey = apiKey;

import browse from '/public/svg_to_js/folder-open.json';
out.iconBrowse = browse;

import crop from '/public/svg_to_js/crop-alt-solid.json';
out.iconCrop = crop;

import cropSave from '/public/svg_to_js/file-upload-solid.json';
out.iconCropSave = cropSave;

import fileFile from '/public/svg_to_js/file-alt.json';
out.iconFileFile = fileFile;

import fileDelete from '/public/svg_to_js/minus-square-solid.json';
out.iconFileDelete = fileDelete;

import rowAdd from '/public/svg_to_js/plus-circle-solid.json';
out.iconRowAdd = rowAdd;


import music from '/public/svg_to_js/music-solid.json';
out.iconMusic = music;

import film from '/public/svg_to_js/film-solid.json';
out.iconFilm = film;

import image from '/public/svg_to_js/image.json';
out.iconImage = image;

import fileAlt from '/public/svg_to_js/file-alt.json';
out.iconDoc = fileAlt;


//* widget icons
import search from '/public/svg_to_js/search-solid.json';
out.iconSearch = search;

import helpInfo from '/public/svg_to_js/info-circle-solid.json';
out.iconHelp = helpInfo;

import filters from '/public/svg_to_js/filter-solid.json';
out.iconFilters = filters;

import del_icon from '/public/svg_to_js/trash-alt-solid.json';
out.iconDelete = del_icon;

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

import view from '/public/svg_to_js/eye.json';
out.iconView = view;

import status from '/public/svg_to_js/dot-circle-solid.json';
out.iconStatus = status;



//* other Icons
import beer from '/public/svg_to_js/beer-solid.json';
out.iconBeer = beer;




export const mainIcons = out;

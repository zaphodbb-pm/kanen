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

import widget from '/public/svg_to_js/shapes-solid.json';
out.iconWidget = widget;

import learn from '/public/svg_to_js/graduation-cap-solid.json';
out.iconLearn = learn;

import content from '/public/svg_to_js/puzzle-piece-solid.json';
out.iconContent = content;

import buildContent from '/public/svg_to_js/university-solid.json';
out.iconBuildContent = buildContent;

import cards from '/public/svg_to_js/box-open-solid.json';
out.iconCard = cards;

import myProfile from '/public/svg_to_js/address-card.json';
out.iconMyProfile = myProfile;

import icons from '/public/svg_to_js/icons-solid.json';
out.iconIcons = icons;

import palette from '/public/svg_to_js/palette-solid.json';
out.iconColours = palette;

import hammer from '/public/svg_to_js/hammer-solid.json';
out.iconTemplate = hammer;

import database from '/public/svg_to_js/database-solid.json';
out.iconListForm = database;

import users from '/public/svg_to_js/users-cog-solid.json';
out.iconUsers = users;

import sysLogs from '/public/svg_to_js/wave-square-solid.json';
out.iconSysLogs = sysLogs;

import exportImport from '/public/svg_to_js/cloud-download-alt-solid.json';
out.iconExportImport = exportImport;

import pubSub from '/public/svg_to_js/sync-alt-solid.json';
out.iconPubSub = pubSub;


//* Navbar Icons
import defaultUser from '/public/svg_to_js/user-circle-solid.json';
out.iconDefaultUser = defaultUser;

import signIn from '/public/svg_to_js/sign-in-alt-solid.json';
out.iconSignIn = signIn;

import changePwd from '/public/svg_to_js/exchange-alt-solid.json';
out.iconChangePwd = changePwd;

import coins from '/public/svg_to_js/coins-solid.json';
out.iconCredits = coins;


import bell from '/public/svg_to_js/bell.json';
out.iconNotify = bell;

import clock from '/public/svg_to_js/clock-solid.json';
out.iconClock = clock;

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

import showField from '/public/svg_to_js/eye.json';
out.iconShowText = showField;

import hideField from '/public/svg_to_js/eye-slash.json';
out.iconHideText = hideField;

import readTime from '/public/svg_to_js/glasses-solid.json';
out.iconReadTime = readTime;


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

import grip from '/public/svg_to_js/grip-lines-solid.json';
out.iconDrag = grip;

import edit from '/public/svg_to_js/pencil-alt-solid.json';
out.iconEdit = edit;

import editDone from '/public/svg_to_js/check-solid.json';
out.iconEditDone = editDone;

import cancel from '/public/svg_to_js/times-circle.json';
out.iconCancel = cancel;

import dolly from '/public/svg_to_js/dolly-flatbed-solid.json';
out.iconPayload = dolly;

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


import general from '/public/svg_to_js/creative-commons-share.json';
out.iconGeneral = general;

import controlContent from '/public/svg_to_js/pen-nib-solid.json';
out.iconControlContent = controlContent;

import components from '/public/svg_to_js/plug-solid.json';
out.iconComponents = components;

import adminOnly from '/public/svg_to_js/user-lock-solid.json';
out.iconAdminOnly = adminOnly;


//* message icons
import msgSuccess from '/public/svg_to_js/check-circle-solid.json';
out.iconMsgSuccess = msgSuccess;

import msgWarning from '/public/svg_to_js/exclamation-circle-solid.json';
out.iconMsgWarning = msgWarning;

import msgFail from '/public/svg_to_js/times-circle-solid.json';
out.iconMsgFail = msgFail;

import msgAdd from '/public/svg_to_js/plus-circle-solid.json';
out.iconMsgAdd = msgAdd;

import msgRemove from '/public/svg_to_js/minus-circle-solid.json';
out.iconMsgRemove = msgRemove;

import msgUncertain from '/public/svg_to_js/question-circle-solid.json';
out.iconMsgUncertain = msgUncertain;


//* brand icons
import google from '/public/svg_to_js/google.json';
out.iconGoogle = google;


//* other Icons
import beer from '/public/svg_to_js/beer-solid.json';
out.iconBeer = beer;

export const mainIcons = out;

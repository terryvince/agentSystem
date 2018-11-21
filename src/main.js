
import './main.scss';
import jQuery from 'jquery';
const $ = jQuery;
// const config = CONFIG;
//
// function title () {
//     document.title = `<h1>${config.appName}</h1>`;
// }
//
// title();
$(function () {
  $('header .icon-left').click(function () {
    history.back();
  });
});

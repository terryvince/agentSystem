
import './main.scss';
import $ from 'jquery';
window.$ = $;
window.jQuery = $;
// const config = CONFIG;
//
// function title () {
//     document.title = `<h1>${config.appName}</h1>`;
// }
//
// title();
$(function () {
  // 回退
  $('header .icon-left').click(function () {
    history.back();
  });

  // 菜单
  let $menuWrap = $('header .menu-wrap');
  let $menu = $menuWrap.find('.menu');
  $menu.hide();
  $menuWrap.click(function () {
    $menu.toggle().toggleClass('active');
  });
});

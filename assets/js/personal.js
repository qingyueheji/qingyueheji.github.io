'use strict';

$(function ($) {
    /************************************************
     Card Title Setting
     ************************************************/
    var navigation = $('.navigation li a.selected');
    var nav_span = navigation.children('span');
    var nav_icon = navigation.children('i');

    nav_span.clone().appendTo("#card-badge");
    $('#card-title').text(nav_icon.text().substring(3));
    $('#card-icon').attr('class', nav_icon.attr('class'));
    nav_span.removeClass('badge-primary').addClass('badge-danger');

    /************************************************
     Toggle Sidebar Nav
     ************************************************/
    var body = $('body');
    body.delegate('.toggle-sidebar', 'click', function () {
        $('.sidebar').toggleClass('collapsed');

        if (localStorage.getItem("asideMode") === 'collapsed') {
            localStorage.setItem("asideMode", 'expanded');
        } else {
            localStorage.setItem("asideMode", 'collapsed');
        }
        return false;
    });

    var p;
    body.delegate('.hide-sidebar', 'click', function () {
        if (p) {
            p.prependTo(".wrapper");
            p = null;
        } else {
            p = $(".sidebar").detach();
        }
    });

    $.fn.setAsideMode = function () {
        if (localStorage.getItem("asideMode") === null) {} else if (localStorage.getItem("asideMode") === 'collapsed') {
            $('.sidebar').addClass('collapsed');
        } else {
            $('.sidebar').removeClass('collapsed');
        }
    };
    if ($(window).width() > 992) {
        $.fn.setAsideMode();
    }
});
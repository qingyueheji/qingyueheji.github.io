'use strict';

$(function () {
    var options = {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: ''
    };

    var cropper = $('.imageBox').cropbox(options);

    $(document.body).on('change', '#upload-file', function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            options.imgSrc = e.target.result;
            cropper = $('.imageBox').cropbox(options);
        };
        reader.readAsDataURL(this.files[0]);
        getImg();
    });

    $(document.body).on("mouseup", '.imageBox', function (e) {
        getImg();
    });

    $(document.body).on("mousewheel DOMMouseScroll", '.imageBox', function (e) {
        getImg();
    });

    var getImg = function getImg() {
        var img_url = cropper.getDataURL();
        var cropped_html = $('.preview-img');
        cropped_html.html('');
        cropped_html.append('<img src="' + img_url + '" align="absmiddle">');
    };
});
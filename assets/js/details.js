"use strict";

$(function () {});
new Vue({
    el: 'body',
    methods: {},
    mounted: function mounted() {
        var me = this;
        editormd.markdownToHTML("editormd-view", {
            htmlDecode: "style,script,iframe", // you can filter tags decode
            emoji: true,
            taskList: true,
            tex: true, // 默认不解析
            flowChart: true, // 默认不解析
            sequenceDiagram: true // 默认不解析
        });
    }
});
'use strict';

new Vue({
    el: 'body',
    data: {
        demo: 34,
        modalIndex: 1050,
        form: {
            thumbnail: '',
            title: 'Python',
            category: '1.2',
            synopsis: 'Python',
            resource: true,
            article: false,
            links: []
        }
    },
    methods: {
        makeToast: function makeToast(message) {
            this.$bvToast.toast(message, {
                title: "提示消息",
                autoHideDelay: 3000,
                appendToast: false
            });
        },
        addResourceLink: function addResourceLink() {
            var link = this.form.links;
            try {
                if (link[link.length - 1].href === '') return this.makeToast("所有链接必须填写完整");
            } catch (e) {}
            link.push({ href: '', password: '' });
        },
        selectPicture: function selectPicture(elem) {
            var img = elem.currentTarget.style.backgroundImage;
            var img_url = img.substring(5, img.length - 2);
            this.$bvModal.hide('photoList');
            this.form['thumbnail'] = img_url;
        }
    },
    mounted: function mounted() {
        var me = this;

        //region 初始化富文本编辑器
        editormd("editormd", {
            codeFold: true,
            saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
            taskList: true,
            tocm: true, // Using [TOCM]
            tex: true, // 开启科学公式TeX语言支持，默认关闭
            flowChart: true, // 开启流程图支持，默认关闭
            sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
            dialogShowMask: true, // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
            dialogDraggable: false, // 设置弹出层对话框不可拖动，全局通用，默认为true
            imageUpload: true,
            imageUploadURL: 'uploadImages',
            path: 'assets/plugins/editor.md/lib/',
            onload: function onload() {
                this.fullscreen();
                this.resize("100%", $(document).height() - 15);
            },
            toolbarHandlers: {
                redirect: function redirect(cm, icon, cursor, selection) {
                    me.$bvModal.show('modal-redirect');
                },

                saving: function saving(cm, icon, cursor, selection) {
                    me.$bvModal.show('SaveDataModal');
                }
            }
        });
        //endregion

        //region 页面加载完成业务
        document.onreadystatechange = function () {
            if (document.readyState === "complete") {
                document.getElementsByClassName('loader-wrapper')[0].remove();
            }
        };
        //endregion
    }
});
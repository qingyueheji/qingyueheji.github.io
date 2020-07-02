'use strict';

new Vue({
    el: 'body',
    data: {
        menu_id: undefined,
        demo: 20,
        timeout: 0
    },
    methods: {
        // 添加菜单class(鼠标移入)
        enterAddClass: function enterAddClass(elem) {
            var target = elem.currentTarget;
            if (target.id) {
                this.menu_id = target.id;
                this.$refs['menu-content'].style.display = 'block';
                this.$refs[target.id].style.display = 'flex';
            }
            if (target.className.indexOf('nav-zibg') === -1) {
                target.className = "nav-zibg";
            }
        },

        // 移除菜单class(鼠标移除)
        leaveRemoveClass: function leaveRemoveClass(elem) {
            var target = elem.currentTarget;
            if (target.id) {
                this.$refs[target.id].style.display = 'none';
            }
            this.$refs['menu-content'].style.display = 'none';
            target.className = '';
        },

        // 子菜单展示(鼠标移入)
        enterMenuContent: function enterMenuContent(elem) {
            var target = elem.currentTarget;
            target.style.display = 'block';
            this.$refs[this.menu_id].style.display = 'flex';
            document.getElementById(this.menu_id).className = 'nav-zibg';
        },

        // 子菜单展示(鼠标移除)
        leaveMenuContent: function leaveMenuContent(elem) {
            elem.currentTarget.style.display = 'none';
            this.$refs[this.menu_id].style.display = 'none';
            document.getElementById(this.menu_id).className = '';
        },

        // 菜单导航滚动事件
        menuWrapScrollEvent: function menuWrapScrollEvent() {
            if (positionMenu) {
                var menuWrap = document.getElementsByClassName('menu-wrap')[0];
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop >= 195) {
                    menuWrap.style.position = 'fixed';
                    menuWrap.style.top = '44px';
                } else {
                    menuWrap.style.position = '';
                    menuWrap.style.top = '';
                }
            }
        }
    },
    beforeMount: function beforeMount() {
        document.onreadystatechange = function () {
            if (document.readyState === "complete") {
                document.getElementsByClassName('loader-wrapper')[0].remove();
            }
        };
    },
    mounted: function mounted() {
        // 监听菜单滚动事件
        window.addEventListener('scroll', this.menuWrapScrollEvent);
        try {
            editormd.markdownToHTML("editormd-view", {
                htmlDecode: "style,script,iframe", // you can filter tags decode
                emoji: true,
                taskList: true,
                tex: true, // 默认不解析
                flowChart: true, // 默认不解析
                sequenceDiagram: true // 默认不解析
            });
        } catch (e) {}
    }
});
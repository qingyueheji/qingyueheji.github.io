'use strict';

new Vue({
    el: 'body',
    data: {
        menu_id: undefined,
        demo: 20,
        timeout: 30
    },
    methods: {
        //region 添加菜单class(鼠标移入)
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

        //endregion

        //region 移除菜单class(鼠标移除)
        leaveRemoveClass: function leaveRemoveClass(elem) {
            var target = elem.currentTarget;
            if (target.id) {
                this.$refs[target.id].style.display = 'none';
            }
            this.$refs['menu-content'].style.display = 'none';
            target.className = '';
        },

        //endregion

        //region 子菜单展示(鼠标移入)
        enterMenuContent: function enterMenuContent(elem) {
            var target = elem.currentTarget;
            target.style.display = 'block';
            this.$refs[this.menu_id].style.display = 'flex';
            document.getElementById(this.menu_id).className = 'nav-zibg';
        },

        //endregion

        //region 子菜单展示(鼠标移除)
        leaveMenuContent: function leaveMenuContent(elem) {
            elem.currentTarget.style.display = 'none';
            this.$refs[this.menu_id].style.display = 'none';
            document.getElementById(this.menu_id).className = '';
        },

        //endregion

        //region 菜单导航滚动事件
        menuWrapScrollEvent: function menuWrapScrollEvent() {
            try {
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
            } catch (e) {}
        },

        //endregion

        //region 发送验证码
        sendEmail: function sendEmail(elem) {
            var me = this;
            // 验证先 if()。。。
            var target = elem.currentTarget;
            target.disabled = true;
            var timer = setInterval(function () {
                console.log(me.timeout);
                if (me.timeout < 0) {
                    target.disabled = false;
                    target.innerText = '\u53D1\u9001\u9A8C\u8BC1\u7801';
                    localStorage.clear();
                    me.timeout = 30;
                    clearInterval(timer);
                } else {
                    target.innerText = '\u91CD\u53D1(' + me.timeout + 's)';
                    localStorage.setItem('sendEmail', me.timeout);
                    me.timeout--;
                }
            }, 1000);
        },

        //endregion

        show_register_login: function show_register_login(is_status) {
            if (is_status) {
                this.$bvModal.hide('login');
                this.$bvModal.show('register');
            } else {
                this.$bvModal.hide('register');
                this.$bvModal.show('login');
            }
        }
    },
    created: function created() {
        var me = this;

        //region 登录注册表单数数据
        // is not login
        me.loginForm = {
            email: 'qingyueheji@qq.com',
            password: 'qingyueheji@qq.com',
            qrcode: 'wa74'
            // is not login
        };me.registerForm = {
            username: '今夕何夕',
            email: 'qingyueheji@qq.com',
            email_code: 'xxxx',
            password: 'qingyueheji@qq.com',
            ok_password: 'qingyueheji@qq.com',
            qrcode: 'wa74'
            //endregion

            //region 检测邮件发送剩余时间
        };var surplus_timer = localStorage.getItem('sendEmail');
        var timer = setInterval(function () {
            var SendEmail = me.$refs.SendEmail;
            if (SendEmail) {
                if (!surplus_timer || surplus_timer < 0) {
                    SendEmail.disabled = false;
                    SendEmail.innerText = '\u53D1\u9001\u9A8C\u8BC1\u7801';
                    localStorage.clear();
                    clearInterval(timer);
                } else {
                    SendEmail.innerText = '\u91CD\u53D1(' + surplus_timer + 's)';
                    localStorage.setItem('sendEmail', surplus_timer);
                    surplus_timer--;
                }
            } else {
                if (!surplus_timer || surplus_timer < 0) {
                    localStorage.clear();
                    clearInterval(timer);
                } else {
                    localStorage.setItem('sendEmail', surplus_timer);
                    surplus_timer--;
                }
            }
        }, 1000);
        //endregion
    },
    mounted: function mounted() {
        //region 页面加载完成业务
        document.onreadystatechange = function () {
            if (document.readyState === "complete") {
                document.body.style.overflowY = 'auto';
                document.getElementsByClassName('loader-wrapper')[0].remove();
            }
        };
        //endregion

        //region 监听菜单滚动事件
        window.addEventListener('scroll', this.menuWrapScrollEvent);
        //endregion

        //region 加载富文本编辑器
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
        //endregion

        //region 模态框显示隐藏滚动条设置
        this.$root.$on('bv::modal::show', function (bvEvent, modalId) {
            document.body.style.overflowY = 'hidden';
        });

        this.$root.$on('bv::modal::hidden', function (bvEvent, modalId) {
            document.body.style.overflowY = 'auto';
        });
        //endregion
    }
});
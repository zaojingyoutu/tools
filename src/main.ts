import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'

// 百度统计代码

// @ts-ignore
const _hmt: any[] = _hmt || [];

  (function() {
    const hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?5cb4fa061ea3314a61a3e68acdefd747';
    const s = document.getElementsByTagName('script')[0];
    // @ts-ignore
    s.parentNode.insertBefore(hm, s);
  })();
router.beforeEach((to, from, next) => {
  if (_hmt) {
    if (to.path) {
      _hmt.push(['_trackPageview', '/#' + to.fullPath])
    }
  }
  next()
})

createApp(App).use(router).use(Antd).mount('#app')

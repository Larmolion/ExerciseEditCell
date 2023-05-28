import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

// 本地SVG图标
import 'virtual:svg-icons-register';

// 样式
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/styles/index.scss';
import 'uno.css';

const app = createApp(App);
app.use(router).mount('#app');

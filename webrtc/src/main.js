import Vue from 'vue';
import './styles/index.scss';
import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});

const title = 'WebRTC';
document.title = title;

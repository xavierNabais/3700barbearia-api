import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App);

app.use(vue3GoogleLogin, {
    clientId: '285136176342-q9o6hi2ije3p3bbojp6e36cu9l2qe45m.apps.googleusercontent.com'
  })
app.use(router);
app.mount('#app');


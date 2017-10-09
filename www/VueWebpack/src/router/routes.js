import Search from '.././components/search.vue';
import Result from '.././components/result.vue';
import Suggest from '.././components/suggest.vue';
import Info from '.././components/info.vue';


export const routes = [
    { path: '/', component: Search },
    { path: '/result', component: Result },
    { path: '/suggest', component: Suggest },
    { path: '/info', component: Info },
];

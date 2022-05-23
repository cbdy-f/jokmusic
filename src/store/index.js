import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

import discovery from './module/discovery';
import mvs from './module/mvs';
import mv from './module/mv';
import playlist from './module/playlist';
import playlists from './module/playlists';
import result from './module/result';
import songs from './module/songs';

//对外暴露
export default new Vuex.Store({
    modules: {
        discovery,
        mvs,
        mv,
        playlist,
        playlists,
        result,
        songs
    }
})
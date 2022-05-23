//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//引入路由组件
// 导入对应的路由
import discovery from '@/views/discovery'
import playlists from '@/views/playlists'
import songs from '@/views/songs'
import mvs from '@/views/mvs'
import result from '@/views/result'
import playlist from '@/views/playlist'
import mv from '@/views/mv'

export default new VueRouter({
    //配置路由
    routes: [
        {
            path: '/',
            redirect: '/discovery'
        },
        {
            path: '/discovery',
            component: discovery
        },
        {
            // 推荐歌单
            path: '/playlists',
            component: playlists
        },
        {
            // 推荐歌单
            path: '/playlist',
            component: playlist
        },
        {
            // 最新音乐
            path: '/songs',
            component: songs
        },
        {
            // 最新音乐
            path: '/mvs',
            component: mvs
        },
        // mv详情
        {
            path: '/mv/:id',
            component: mv,
            name: 'MvDetail',
            props: true // 开启路由传参
        },
        // 搜索结果页
        {
            path: '/result',
            component: result
        }
    ]
})

Vue.config.productionTip = false


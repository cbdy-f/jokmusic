import axios from "axios";

export default {
    namespaced: true,
    state: {
        //轮播图
        banners: [],
        //推荐歌单
        list: [],
        //最新音乐
        songs: [],
        //推荐mv
        mvs: [],
    },
    mutations: {
        //获取轮播图数据
        getBanners(state) {
            axios({
                url: "https://autumnfish.cn/banner",
                method: "get",
            }).then((res) => {
                state.banners = res.data.banners;
            });
        },
        // 获取推荐歌单数据
        getRecommend(state) {
            axios({
                url: "https://autumnfish.cn/personalized",
                method: "get",
                params: {
                    //获取的数据量
                    limit: 10,
                },
            }).then((res) => {
                state.list = res.data.result;
            });
        },
        //获取最新音乐数据
        getNewSongs(state) {
            axios({
                url: "https://autumnfish.cn/personalized/newsong",
                method: "get",
            }).then((res) => {
                state.songs = res.data.result;
            });
        },
        //获取推荐mv数据
        getRecommendMvs(state) {
            axios({
                url: "https://autumnfish.cn/personalized/mv",
                method: "get",
            }).then((res) => {
                state.mvs = res.data.result;
            });
        }
    },
    actions: {
    },
}


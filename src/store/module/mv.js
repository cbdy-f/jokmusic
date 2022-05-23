import axios from "axios";

export default {
    namespaced: true,
    state: {
        // 总条数
        total: 20,
        // 页码
        page: 1,
        // 页容量
        limit: 10,
        // mv地址
        url: "",
        // 相关mv
        simiMvs: [],
        // mv的信息
        mvInfo: {},
        // 头像
        icon: "",
    },
    mutations: {
        getMvUrl(state) {
            axios({
                url: "https://autumnfish.cn/mv/url",
                method: "get",
                params: {
                    // 获取url中的 id
                    id: this.$route.query.q,
                },
            }).then((res) => {
                // console.log(res)
                state.url = res.data.data.url;
            });
        },
        getSimiMvs(state) {
            // 获取 相关的mv
            axios({
                url: "https://autumnfish.cn/simi/mv",
                method: "get",
                params: {
                    mvid: this.$route.query.q,
                },
            }).then((res) => {
                // console.log(res)
                // 保存相关MV
                state.simiMvs = res.data.mvs;
            });
        },
        getMvInfo(state) {
            axios({
                url: "https://autumnfish.cn/mv/detail",
                method: "get",
                params: {
                    mvid: this.$route.query.q,
                },
            }).then((res) => {
                // console.log(res)
                // mv的信息
                state.mvInfo = res.data.data;
            })
        },
        getSonger(state) {
            // 获取 歌手信息
            axios({
                url: "https://autumnfish.cn/artists",
                method: "get",
                params: {
                    id: state.mvInfo.artists[0].id,
                },
            }).then((res) => {
                // console.log(res);
                // 歌手的封面信息
                state.icon = res.data.artist.picUrl;
            });
        },
        getsb(state) {
            axios({
                url: "https://autumnfish.cn/comment/mv",
                method: "get",
                params: {
                    id: this.$route.query.q,
                    limit: 10,
                    offset: 0,
                },
            }).then((res) => {
                console.log(res);
            });
        }

    },
    actions: {},
    getters: {}
}
import axios from "axios";

export default {
    namespaced: true,
    state: {
        // 总条数
        total: 0,
        // 页码
        page: 1,
        //顶部的推荐歌单
        topList: {},
        //歌单列表
        list: [],
        //保存当前选择的数据
        tag: "全部",
    },
    mutations: {
        topData(state) {
            axios({
                url: " https://autumnfish.cn/top/playlist/highquality",
                method: "get",
                params: {
                    limit: 1,
                    cat: state.tag,
                },
            }).then((res) => {
                state.topList = res.data.playlists[0];
            });
        },
        listData(state) {
            axios({
                url: "https://autumnfish.cn/top/playlist",
                method: "get",
                params: {
                    limit: 10,
                    offset: (state.page - 1) * 10,
                    cat: state.tag,
                },
            }).then((res) => {
                // console.log(res);
                state.total = res.data.total;
                state.list = res.data.playlists;
            });
        },
        changeTag(state, newTag) {
            // 更改Tag的值
            state.tag = newTag
        },
        changePage(state, newPage) {
            // 更改page的值
            state.page = newPage
        }
    },
    actions: {},
    getters: {}
}
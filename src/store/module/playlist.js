import axios from "axios";

export default {
    namespaced: true,
    state: {
        activeIndex: "1",
        // 总条数
        total: 0,
        // 页码
        page: 1,
        // 歌单详情数据
        // tracks 歌曲列表
        playlist: {},
        // 热门评论
        hotComment: [],
        // 热门评论的个数
        hotCount: 0,
        // 普通评论
        comments: [],
    },
    mutations: {
        getPlaylist(state) {
            axios({
                url: "https://autumnfish.cn/playlist/detail",
                method: "get",
                params: {
                    id: this.$route.query.q,
                },
            }).then((res) => {
                // console.log(res)
                state.playlist = res.data.playlist;
            });
        },
        getComment(state) {
            axios({
                url: "https://autumnfish.cn/comment/hot",
                method: "get",
                params: {
                    id: this.$route.query.q,
                    // 传递类型
                    type: 2,
                },
            }).then((res) => {
                // console.log(res)
                state.hotComment = res.data.hotComments;
                // 保存个数
                state.hotCount = res.data.total;
            });
        },
        getNewcomment(state) {
            // 获取 最新评论
            axios({
                url: "https://autumnfish.cn/comment/playlist",
                method: "get",
                params: {
                    id: this.$route.query.q,
                    limit: 10,
                    offset: 0,
                },
            }).then((res) => {
                // console.log(res)
                // 总个数
                state.total = res.data.total;
                // 评论数据
                state.comments = res.data.comments;
            });
        }
    },
    actions: {},
    getters: {}
}
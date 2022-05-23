import axios from "axios";

export default {
    namespaced: true,
    state: {
        // 歌曲列表
        lists: [],
        // 分类
        tag: "0",
        // 当前展示的音乐信息
        currentList: [],
        queryInfo: {
            limit: 10,
            offset: 1,
        },
    },
    mutations: {
        // 获取列表数据
        getList(state) {
            // 获取 最新音乐数据
            axios({
                url: "https://autumnfish.cn/top/song",
                method: "get",
                params: {
                    // 传递 设置的数据
                    type: state.tag,
                    limit: 20,
                    offset: 1,
                },
            }).then((res) => {
                // console.log(res.data);
                state.lists = res.data.data;
                state.currentList = state.lists.slice(0, state.queryInfo.limit);
                // 处理时长 毫秒 转为 分秒
                for (let i = 0; i < state.lists.length; i++) {
                    // 获取 总毫秒数
                    let duration = state.lists[i].duration;
                    // 假定 	350750 毫秒
                    // 秒 350750/1000  350秒
                    // 分 350 /60
                    // 秒 350 % 60
                    let min = parseInt(duration / 1000 / 60);
                    if (min < 10) {
                        min = "0" + min;
                    }
                    let sec = parseInt((duration / 1000) % 60);
                    if (sec < 10) {
                        sec = "0" + sec;
                    }
                    // console.log(min + '|' + sec)
                    state.lists[i].duration = `${min}:${sec}`;
                }
            });
        },

        // 页容量发生变化
        sizeChange(state, newSize) {
            state.queryInfo.limit = newSize;
            let start = (state.queryInfo.offset - 1) * state.queryInfo.limit;
            let end =
                (state.queryInfo.offset - 1) * state.queryInfo.limit +
                state.queryInfo.limit;
            state.currentList = state.lists.slice(start, end);
        },
        currentPageChange(state, newPage) {
            state.queryInfo.offset = newPage;
            let start = (state.queryInfo.offset - 1) * state.queryInfo.limit;
            let end =
                (state.queryInfo.offset - 1) * state.queryInfo.limit +
                state.queryInfo.limit;
            state.currentList = state.lists.slice(start, end);
            // console.log("this.lists.splice(start, end): ", this.lists.slice(15, 30));
        },
    },
    actions: {},
    getters: {}
}
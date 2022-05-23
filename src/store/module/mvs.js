import axios from "axios";

export default {
    namespaced: true,
    state: {
        page: 1, // 当前页码值
        query: { // 查询参数
            area: '全部',
            type: '全部',
            order: '上升最快',
            limit: 12
        },
        mvsList: [], // 存储 MV 列表数据
        total: 0
    },
    mutations: {
        getList(state) {
            axios({
                url: "https://autumnfish.cn/mv/all",
                method: "get",
                params: {
                    area: state.area,
                    type: state.type,
                    order: state.order,
                    //数量
                    limit: state.limit,
                    //偏移值 分页(页码-1)*数量
                    offset: (state.page - 1) * state.limit,
                },
            }).then((res) => {
                state.list = res.data.data;
                //保存总条数
                if (res.data.count) {
                    state.total = res.data.count;
                }
            });
        },
        changeQuery(state, { name, data }) {
            // 更新query
            state.query[name] = data
        },
        changePage(state, newPage) {
            // 更改page的值
            state.page = newPage
        }
    },
    actions: {},
    getters: {}
}
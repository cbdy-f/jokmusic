<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '全部' }"
              @click="handleTabClick('area', '全部')"
              >全部</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '内地' }"
              @click="handleTabClick('area', '内地')"
              >内地</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '港台' }"
              @click="handleTabClick('area', '港台')"
              >港台</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '欧美' }"
              @click="handleTabClick('area', '欧美')"
              >欧美</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '日本' }"
              @click="handleTabClick('area', '日本')"
              >日本</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '韩国' }"
              @click="handleTabClick('area', '韩国')"
              >韩国</span
            >
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '全部' }"
              @click="handleTabClick('type', '全部')"
            >
              全部
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '官方版' }"
              @click="handleTabClick('type', '官方版')"
            >
              官方版
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '原声' }"
              @click="handleTabClick('type', '原声')"
            >
              原声
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '现场版' }"
              @click="handleTabClick('type', '现场版')"
            >
              现场版
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '网易出品' }"
              @click="handleTabClick('type', '网易出品')"
            >
              网易出品
            </span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '上升最快' }"
              @click="handleTabClick('order', '上升最快')"
            >
              上升最快
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '最热' }"
              @click="handleTabClick('order', '最热')"
            >
              最热
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '最新' }"
              @click="handleTabClick('order', '最新')"
            >
              最新
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap">
            <img :src="item.cover" alt="" />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ addwan(item.playCount) }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="5"
        :limit="limit"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "MVs",
  methods: {
    ...mapMutations("mvs", ["getList", "changeQuery", "changePage"]),
    handleTabClick(name, data) {
      // 处理过滤类型的切换
      const params = {
        name,
        data,
      };
      // 根据传过去的数据更新query
      this.changeQuery(params);
    },
    handleCurrentChange(newPage) {
      // 页码切换会触发此函数
      // 通知 mutation 更新页码值
      this.changePage(newPage);
    },
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    addwan(playCount) {
      if (playCount > 10000) {
        playCount = parseInt(playCount / 10000) + "万";
      }
      return playCount;
    },
  },
  watch: {
    query: {
      // 监听query变化
      deep: true, // 深度监听
      handler() {
        // 变化处理函数
        // 使用更新后的 query 重新MV数据
        this.getList(this);
        // 切换分类后页码重置回第一页
        this.changePage(1);
      },
    },
    page(newPage) {
      // 监听页码变化
      // 重新获取数据
      this.getList(this);
    },
  },
  created() {
    this.getList(this);
  },
  computed: {
    ...mapState("mvs", [
      "total",
      "page",
      "limit",
      "area",
      "type",
      "order",
      "list",
    ]),
  },
};
</script>

<style >
</style>

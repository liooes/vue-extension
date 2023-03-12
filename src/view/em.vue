<template>
  <div class="page-wrapper">
    <!-- header -->
    <el-header class="page-header">
      <div class="page-logo">
        <img src="../../public/logo.png" style="height: 80%;padding: 5px;" />
      </div>
    </el-header>
    <!-- 主体 -->
    <el-container class="page-body">
      <!-- 左侧导航 -->
      <el-aside class="page-aside" width="200px">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu" default-active="1"
          text-color="#fff" @select="handleSelect" >
          <el-menu-item index="1">
            <el-icon><icon-menu /></el-icon>
            <span>B2C工单</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>异常检测</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon>
              <document />
            </el-icon>
            <span>物流查询</span>
          </el-menu-item>
          <el-menu-item index="4" disabled>
            <el-icon>
              <document />
            </el-icon>
            <span>数据看板</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon>
              <setting />
            </el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main class="page-main">
        <component :is="compName"></component>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import b2c from './b2c.vue';
import setting from './setting.vue';
import anomalyDetection from './anomalyDetection.vue';

export default {
  data() {
    return {
      activeIndex: '1',
      compName: ''
    };
  },
  mounted() {
  this.compName = b2c
},
  methods: {
    handleSelect(index) { 
      switch (index) {
        case '1':
          this.compName = b2c
          break
          case '2':
          this.compName = anomalyDetection
          break
        case '3':
          // this.compName = setting
          break
        case '4':
          // this.compName = setting
          break
        case '5':
          this.compName = setting
          break
      }
    }
  }
}
</script>

<style scoped>

.page-wrapper {
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  padding: 0;
  background-color: #fff;
}

.page-logo {
  height: 50px;
  font-size: 24px;
  font-weight: bold;
  color: #404040;
  background-color: #f5f7fa;
}


.page-body {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.page-aside {
  border-right: 15px solid #e6ebf5; 
}

.el-menu {
  padding: 0;
  margin-right: 0px;
  height: 100%;
}


.page-main {
  flex: 1;
  background-color: #fff;
  padding: 24px;
  overflow: auto;
  padding-top: 0;
}
</style>

<template>
  <div class="page-wrapper" >
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
        <el-menu active-text-color="#ffd04b" background-color="#4C4F53" class="el-menu" default-active="1"
          text-color="#fff" @select="handleSelect">
          <el-menu-item index="1">
            <el-icon>
              <document />
            </el-icon>
            <span>B2C工单</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><Aim /></el-icon>
            <span>异常检测</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><Coffee /></el-icon>
            <span>物流查询</span>
          </el-menu-item>
          <el-menu-item index="4" disabled>
            <el-icon><Grid /></el-icon>
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

  margin: 0;
  padding:0;
}

.page-header {
  position: relative;
  width: 100%;
  height: 60px;
  background-color:#A9A9A9;
  --el-header-padding: 0px;
  background-image: url('../../public/mybg.png');
}

.page-aside {
  border-right: 15px solid #e6ebf5;
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
}

.page-main {
  background-color:white;
  position: absolute;
  left: 195px;
  top: 60px;
  margin: 0;
  right: 10px;
  bottom: 0;
  overflow-y: scroll;
}

.page-logo {
  height: 50px;
  margin-top: 5px;
  font-size: 24px;
  font-weight: bold;
}

.page-body {
  flex: 1;
  display: flex;
  flex-direction: row;
  background-color: #fff;

}

.el-menu {
  padding: 0;
  margin-right: 0px;
  height: 100%;
}
</style>

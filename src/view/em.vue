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
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu" default-active="2"
          text-color="#fff" @open="handleOpen" @close="handleClose">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon>
              <document />
            </el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main class="page-main">
        <!-- 工单查询 -->
        <div class="box-border">
          <el-row>
            <el-col>
              <h1 class="title-bg">工单查询</h1>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form :model="form" label-width="80px" :inline="true">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="项目">
                      <el-select v-model="form.project" placeholder="请选择项目">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                          :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="问题类别">
                      <el-select v-model="form.type" placeholder="请选择问题类别">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                          :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="问题类型">
                      <el-select v-model="form.problemType" placeholder="请选择问题类型">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                          :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="创建时间">
                      <el-date-picker v-model="form.createTime" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>

                  <el-col :span="6">
                    <el-form-item label="交互对象">
                      <el-select v-model="form.interaction" placeholder="请选择交互对象">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                          :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="回复状态">
                      <el-select v-model="form.replyStatus" placeholder="请选择回复状态">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                          :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="单号" :span="16">
                      <el-input v-model="form.number" placeholder="请输入单号" style="width: 530px;" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item class="btn">
                      <el-button type="primary">发送信息</el-button>
                      <el-button type="primary">修改类型</el-button>
                      <el-button type="primary">完结工单</el-button>
                      <el-button type="primary">重开工单</el-button>
                      <el-button type="primary">修改状态</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <div class="el-tabs-orders">
          <!-- 标签页 -->
          <el-tabs type="border-card">
            <el-tab-pane label="待处理">User</el-tab-pane>
            <el-tab-pane label="处理中">Config</el-tab-pane>
            <el-tab-pane label="判责中">Role</el-tab-pane>
            <el-tab-pane label="已完结">Task</el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeName: 'WorkOrderList',
      form: {
        name: '',
        group: ''
      },
      options: [
        {
          value: '1',
          label: '工单组一'
        },
        {
          value: '2',
          label: '工单组二'
        }
      ]
    };
  },
  methods: {
    onSelect(index) {
      this.activeIndex = index;
    }
  }
};
</script>

<style scoped>
.btn {
  float: right;
  margin-right: 20px;
}

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

.page-menu {
  padding: 0%;
  font-size: 14px;
  background-color: #e6ebf5;
}

.page-aside {
  border-right: 15px solid #e6ebf5;
  /* background-color: #ca2936;   */
}

.el-menu {
  padding: 0;
  margin-right: 0px;
  height: 100%;
}


.page-menu .el-menu-item {
  color: #666;
}

.page-menu .el-menu-item.is-active {
  color: #2d8cf0;
}

.page-main {
  flex: 1;
  background-color: #fff;
  padding: 24px;
  overflow: auto;
  padding-top: 0;
}

.page-tabs {
  font-size: 14px;
}

.work-order-query h2 {
  font-size: 18px;
  font-weight: bold;
  padding: 8px 0;
  margin-bottom: 12px;
  background-color: #fff;
  border-bottom: 1px solid #e6ebf5;
}

.box-border {
  border: 1px solid #ddd;
}

.el-tabs-orders {
  padding-top: 20px;
}

.title-bg {
  background-color: #ddd;
  padding: 10px;
  padding-left: 20px;
  margin-top: 0;
  color: #767676;
}
</style>

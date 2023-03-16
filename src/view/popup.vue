<template>
  <div class="main_app">
    <span>
      EM Assistant
    </span>
    <el-divider />
    <el-button type="primary" @click="newtab">开始使用</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'popup'
    }
  },
  methods: {
    newtab() { 
      chrome.tabs.create({ url: 'em.html' }); 
    }
  }
}

</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}
</style>

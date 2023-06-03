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
      // 获取当前时间
      let now = new Date();
      let expireDate = new Date(2023, 7, 31);
      // 计算当前时间的毫秒数与2023年8月31日的毫秒数之差
      let interval = expireDate.getTime() - now.getTime();
      // 如果差值大于0，说明还没有到期，输出剩余时间
      if (interval > 0) {
        let days = Math.floor(interval / (24 * 3600 * 1000));
        let leave1 = interval % (24 * 3600 * 1000);
        let hours = Math.floor(leave1 / (3600 * 1000));
        let leave2 = leave1 % (3600 * 1000);
        let minutes = Math.floor(leave2 / (60 * 1000));
        let leave3 = leave2 % (60 * 1000);
        let seconds = Math.round(leave3 / 1000);
        console.log('距离软件到期还有：' + days + '天' + hours + '小时' + minutes + '分' + seconds + '秒');
        chrome.tabs.create({ url: 'em.html' });
      } else {
        console.log('软件已到期，请联系管理员');
        chrome.tabs.create({ url: 'about.html' });
      }
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

<template>
  <div>
    <!-- 页面标题 -->
    <h1>剑网3 DPS计算器</h1>
    <!-- 检查服务器状态的按钮 -->
    <button @click="checkStatus">检查服务器状态</button>
    <!-- 创建计算任务的按钮 -->
    <button @click="createTask">创建计算任务</button>
    <!-- 服务器状态信息展示 -->
    <div v-if="serverStatus">
      <p>服务器状态: {{ serverStatus }}</p>
    </div>
    <!-- DPS数据展示 -->
    <div v-if="dpsData">
      <h2>DPS数据</h2>
      <p>平均DPS: {{ dpsData.avg }}</p>
      <p>最高DPS: {{ dpsData.max }}</p>
      <p>最低DPS: {{ dpsData.min }}</p>
      <!-- 更多数据展示 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 组件的数据对象
    return {
      serverStatus: null, // 服务器状态信息
      dpsData: null,      // DPS数据
      taskId: null,       // 任务ID
    };
  },
  methods: {
    // 检查服务器状态的方法
    checkStatus() {
      // 使用 fetch 发起 GET 请求，获取服务器状态
      fetch(`https://jx3calc.com:12897/status`, { mode: 'cors' })
        .then(response => response.json()) // 解析 JSON 响应体
        .then(data => {
          this.serverStatus = data; // 更新服务器状态信息
        })
        .catch(error => {
          console.error('Error checking server status:', error); // 捕获并打印错误
        });
    },
    // 创建计算任务的方法
    createTask() {
      // 构建请求体，这里需要根据实际情况填写属性数据
      const body = {
        // ...构建请求体
      };
      // 使用 fetch 发起 POST 请求，创建计算任务
      fetch(`https://jx3calc.com:12897/create`, {
        method: 'POST', // 设置请求方法为 POST
        headers: {
          'Content-Type': 'application/json', // 设置请求头，指明发送 JSON 数据
        },
        body: JSON.stringify(body), // 将请求体转换为 JSON 字符串
        mode: 'cors', // 设置跨域资源共享模式
      })
      .then(response => response.json()) // 解析 JSON 响应体
      .then(data => {
        this.taskId = data.data; // 获取任务ID
        setTimeout(this.queryDps, 995960, this.taskId); // 设置定时器，10秒后查询DPS
      })
      .catch(error => {
        console.error('Error creating task:', error); // 捕获并打印错误
      });
    },
    // 查询DPS数据的方法
    queryDps(taskId) {
      // 使用 fetch 发起 GET 请求，查询DPS数据
      fetch(`https://jx3calc.com:12897/query/${taskId}/dps`, { mode: 'cors' })
        .then(response => response.json()) // 解析 JSON 响应体
        .then(data => {
          this.dpsData = data; // 更新DPS数据
        })
        .catch(error => {
          console.error('Error querying DPS:', error); // 捕获并打印错误
        });
    },
  },
};
</script>

<style>
/* 组件的样式，可以根据需要添加 */
</style>

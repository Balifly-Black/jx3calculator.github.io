<template>
  <div>
    <!-- 输入框用于输入配装 ID -->
    <input v-model="id" type="number" placeholder="请输入配装 ID">
    <!-- 按钮点击时触发 fetchData 方法 -->
    <button @click="fetchData">获取配装方案</button>
    <!-- 显示请求结果 -->
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      id: ''
    };
  },
  methods: {
    async fetchData() {
      try {
        this.data = await this.fetchPzPlan(this.id);
      } catch (error) {
        console.error('Failed to fetch pz plan:', error);
        this.data = '请求失败';
      }
    },
    async fetchPzPlan(id) {
      const domain = 'cms.jx3box.com';
      const path = `/api/cms/app/pz/${id}`;

      const response = await fetch(`https://${domain}${path}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const 力道 = data["data"]["data"];
      return 力道;
    }
  }
};
</script>

<style scoped>
input {
  padding: 8px;
  margin-right: 10px;
}
</style>
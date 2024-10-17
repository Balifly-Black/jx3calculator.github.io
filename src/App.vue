<template>
  <div id="app">
    <!-- 使用导入的组件 -->
    <PzInputApi />
  </div>
</template>

<script>
// 导入 DpsCalculator 组件
import PzInputApi from './components/PzInputApi.vue';
export default {
  components: {
    PzInputApi,
  }
}
</script>

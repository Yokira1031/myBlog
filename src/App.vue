<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
// :deep(.el-popper-container-4801) {
:deep(.el-popper .is-light .el-popover) {
  min-width: 0px !important;
  background: red !important;
}

// }
</style>

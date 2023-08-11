<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>
      <RouterLink to="/cssColorPage">我的文章</RouterLink>
    </template>
    最近添加了……
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>
      <RouterLink to="/dailyRecord">日常记录贴</RouterLink>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>
      <RouterLink to="/ourWorld">我们的世界</RouterLink>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>
      <RouterLink to="/cssColorPage">css颜色对照</RouterLink>
    </template>
  </WelcomeItem>
</template>

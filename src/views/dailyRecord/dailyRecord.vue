<template>
  <div class="about">
    <div class="title">日常记录贴</div>
    <div class="record">
      <div class="record_title"></div>
      <div class="record_main">
          <div class="record_input">
              
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .title{

  }
  .about {
    // min-height: 100vh;
    height: 400px;
    overflow: auto;
    // margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-content: flex-start;
    .color_group{
      margin: 20px;
      .color_item {
        width: 70px;
        height: 30px;
        font-size: 1rem;
      }
    }
  }
}
</style>
<template>
  <div class="container">
    <div class="upper-layer">
      <img class="heartO" @click="incrementCountO" src="@/assets/heartO.png" alt="">
      <img class="heartI" v-if="isClicked" @click="incrementCountI" src="@/assets/heartI.png" alt="">
      <div class="count">{{ count }}</div>
    </div>
    <div class="lower-layer">
      <textarea class="message-board" rows="6" placeholder="请输入留言"></textarea>
      <button class="submit-button">确认留言</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
const count = ref(0);
const isClicked = ref(false);

const incrementCountO = () => {
  count.value++;
  isClicked.value = true;
}
const incrementCountI = () => {
  count.value++;
  isClicked.value = true;
}

</script>
<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .upper-layer {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .heartO,
    .heartI {
      width: 40px;
      height: 40px;
      // border: 1px solid;
      cursor: pointer;
    }

    .heartI {
      margin-left: -40px;
    }
  }

  .lower-layer {
    display: flex;
    flex-direction: column;

    .message-board {
      height: 300px;
      resize: none;
      margin-bottom: 10px;
    }

    .submit-button {
      align-self: flex-end;
      padding: 10px 20px;
    }
  }
}
</style>


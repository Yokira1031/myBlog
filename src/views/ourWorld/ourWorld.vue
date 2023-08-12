<template>
  <div class="container">
    <div class="upper_layer">
      <div>
        <img class="heartO" @click="incrementCountO" src="@/assets/heartO.png" alt="">
        <img class="heartI" v-if="isClicked" @click="incrementCountI" src="@/assets/heartI.png" alt="">
      </div>
      <div class="count">{{ count }}</div>
      <div></div>
    </div>
    <div class="lower_layer">
      <!-- 便签输入模块 -->
      <div :class="recordMainCSSChange">
        <!-- 输入 -->
        <div class="record_input">
          <el-input v-model="inputValue" type="textarea" :show-word-limit='false' placeholder="Please input"
            @blur="submit" />
        </div>
        <!-- <div class="input_mark">
          <div class="week">{{ markTip }}</div>
          <div class="date_time">{{ state.inputTime }}</div>
        </div> -->
        <!-- 确认按钮 -->
        <div class="record_button">
          <div class="btn" @click="sureToSave"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue';
import axios from 'axios';
const count = ref(0);
const isClicked = ref(false);
import dateTime from './time'
const recordMainCSSChange = reactive(['record_main', 'record_main_1'])
const inputValue = ref('')
// 一周每天的样式、数据
const state = reactive({
  tipCircleList: [
    {
      active: true,
      num: '1',
      text: '周一',
      newInpuTime: '',
      mark: '周一',
      bgColor: '#FFE4B5'
    },
    {
      active: true,
      num: '2',
      text: '周二',
      newInpuTime: '',
      mark: '周二',
      bgColor: '#DEB887'
    },
    {
      active: true,
      num: '3',
      text: '周三',
      newInpuTime: '',
      mark: '周三',
      bgColor: '#EEE8AA'
    },
    {
      active: true,
      num: '4',
      text: '周四',
      newInpuTime: '',
      mark: '周四',
      bgColor: '#F5DEB3'
    },
    {
      active: true,
      num: '5',
      text: '周五',
      newInpuTime: '',
      mark: '周五',
      bgColor: '#98FB98'
    },
    {
      active: true,
      num: '6',
      text: '周六',
      newInpuTime: '',
      mark: '周六',
      bgColor: '#F5DEB3'
    },
    {
      active: true,
      num: '7',
      text: '周日',
      newInpuTime: '',
      mark: '周日',
      bgColor: '#F5DEB3'
    }
  ],
  inputTime: ''
})
const incrementCountO = () => {
  count.value++;
  isClicked.value = true;
  saveCount()
  setTimeout(() => {
    saveCount()
  }, 1);
  setTimeout(() => {
    saveCount()
  }, 300);
  setTimeout(() => {
    saveCount()
  }, 1000);
  setTimeout(() => {
    saveCount()
  }, 2000);
  setTimeout(() => {
    saveCount()
  }, 3000);
}
const saveCount = () => {
  axios.get('http://39.105.171.50:3389/', {
    params: {
      id: '4546',
      nameContent: count.value,
      // nameContent: 0,
      date: dateTime.formattedDate
    }
  })
    .then(response => {
      console.log('数组数据已保存：', response.data);
    })
    .catch(error => {
      console.error('保存数组数据时出错：', error);
    });
}
const incrementCountI = () => {
  count.value++;
  isClicked.value = true;
}
// 字符串record_main_1jie'gu
const extractNumber = (str: string) => {
  const regex = /(\d+)$/;
  const match = str.match(regex);

  if (match) {
    const numberStr = match[1];
    const number = parseInt(numberStr);
    return number;
  }

  return null; // 若字符串中没有以数字结尾的字符，则返回 null 或其他你认为合适的值
}
// 便签确认提交
const submit = () => {
  // 绑定输入框的值赋值给数据组
  let num: any = extractNumber(recordMainCSSChange[1])
  state.tipCircleList[num - 1].text = inputValue.value
  // 改变输入时间
  state.inputTime = dateTime.formattedTime + '   ' + dateTime.formattedDate
  state.tipCircleList[num - 1].newInpuTime = state.inputTime
}
const sureToSave = () => {
  saveData()
}
// 保存数据
const saveData = () => {
  console.log(state.tipCircleList)
  // axios.post('http://39.105.171.50:3389/api/save', {
  axios.get('http://39.105.171.50:3389/', {
    params: {
      id: '003',
      nameContent: inputValue.value,
      date: dateTime.formattedDate
    }
  })
    .then(response => {
      console.log('数组数据已保存：', response.data);
    })
    .catch(error => {
      console.error('保存数组数据时出错：', error);
    });

}

// 获取数据
const getData = () => {
  // axios.get('http://39.105.171.50:3389/api/data')
  axios.get('http://39.105.171.50:3389/getData')
    .then(response => {
      console.log('hhh', state.tipCircleList)
      console.log('从服务器获取的数组数据：', response.data);
      console.log('hhh', state.tipCircleList)
      inputValue.value = response.data[response.data.length - 1].text
    })
    .catch(error => {
      console.error('获取数组数据时出错：', error);
    });
}
getData()
// 获取数据-计数
const getDataCount = () => {
  axios.get('http://39.105.171.50:3389/getDataCount')
    .then(response => {
      console.log('hhh', state.tipCircleList)
      console.log('从服务器获取的数组数据：', response.data);
      console.log('hhh', state.tipCircleList)
      count.value = response.data[response.data.length - 1].text
    })
    .catch(error => {
      console.error('获取数组数据时出错：', error);
    });
}
getDataCount()
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  // width: 800px;

  .upper_layer {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    width: 50%;
    justify-content: space-between;

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

    .count {
      margin-left: -40px;
    }
  }

  .lower_layer {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 40%;

    .record_main {
      // width: 100%;
      height: 90%;
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
      // background-color: #dcffc1;
      // border: solid 1px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 15px;

      .record_input {
        width: 100%;
        height: 100%;

        :deep(.el-textarea) {
          // padding: 20px;
          height: 100%;

          // border: solid 1px;
          .el-textarea__inner {
            height: 100%;
            // background-color: #dcffc1;
            // padding-top: 20px;
            // padding-left: 25px;
            box-shadow: none;
          }


        }
      }

      .input_mark {
        // color: red;
        opacity: 0.7;
        width: 30px;
        position: relative;
        font-size: 12px;
        right: 80px;
        top: 25px;
      }

      .record_button {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: end;
        // border: 1px solid;

        .btn {
          box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
          // background-color: #dcffc1;
          width: 60px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          border-radius: 20px;
        }
      }
    }

    .record_main_1 {
      .record_input {
        :deep(.el-textarea) {
          .el-textarea__inner {
            // background-color: #FFE4B5;
          }
        }
      }

      .record_button {
        .btn {
          // background-color: #FFE4B5;
        }
      }
    }

    .message_board {
      height: 300px;
      resize: none;
      margin-bottom: 10px;
    }

    .submit_button {
      align-self: flex-end;
      padding: 10px 20px;
    }
  }
}
</style>


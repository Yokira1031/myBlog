<template>
  <div>
    <input type="file" ref="fileInput" style="display: none" @change="selectImage" />
    <button @click="uploadImage">上传</button>
  </div>
  <!-- <input type="file" ref="fileInput" style="display: none" @change="handleFileUpload" />
  <button @click="openFileInput">上传文件</button> -->
  <div class="container">
    <div class="upper_layer">
      <div>
        <img class="heartO" @click="incrementCountO" src="@/assets/heartO.png" alt="">
        <img class="heartI" v-if="isClicked" @click="incrementCountI" src="@/assets/heartI.png" alt="">
      </div>
      <div class="count">{{ count }}</div>
      <div class="photo" @click="centerDialogVisible = true"></div>
    </div>
    <div class="lower_layer">
      <!-- 便签输入模块 -->
      <div :class="recordMainCSSChange">
        <!-- 输入 -->
        <div class="time_record">
          <span>{{ timeRecord }}</span>
        </div>
        <div class="record_input">
          <el-input v-model="inputValue" type="textarea" :show-word-limit='false' placeholder="Please input" />
        </div>
        <!-- 确认按钮 -->
        <div class="time_picker" v-if="timeTargetDisable">
          <el-time-picker class="time_picker" v-model="timeTarget" placeholder="Arbitrary time" />

        </div>
        <div class="time_picker" v-if="timeTargetDisableDb">
          <el-date-picker class="time_picker" v-model="timeTarget" type="datetime" placeholder="Select date and time" />
        </div>
        <div class="record_button">
          <div class="btn" @click="sureToSave" @dblclick="sureToSaveDb"></div>
          <div class="btn btn_date" @click="sureToSaveDb"></div>
        </div>
      </div>
    </div>
  </div>
  <!-- 相册对话框 -->
  <div class="dialog">
    <el-dialog v-model="centerDialogVisible" title="" width="80%" align-center>
      <el-carousel indicator-position="none">
        <el-carousel-item v-for="(item, index) in images" :key="index">
          <img :src="getImageUrl(item.url)" :alt="item.name" width="200" />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue';
import axios from 'axios';
import aes from './aes.js'
// import scheduleRequest from './timeSend.js'

// 对话框
const centerDialogVisible = ref(false)

// 图片上传相关

const fileInput = ref<HTMLInputElement>();
const openFileInput = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;

  // 处理上传的文件
  if (files) {
    // 在这里执行你的上传逻辑
    console.log(files);
  }
};
interface Image {
  _id: string;
  name: string;
  url: string;
}
// 保存选择的图片
const selectedImage = ref<File | null>(null);

// 保存所有图片
const images = ref<Image[]>([]);

// 选择图片时更新selectedImage
const selectImage = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    selectedImage.value = file;
    const formData = new FormData();
    formData.append('image', selectedImage.value);
    try {
      await axios.post('http://localhost:3389/upload', formData);
      selectedImage.value = null;
      await fetchImages();
    } catch (error) {
      console.error(error);
    }
  }
};

// 上传图片
const uploadImage = async () => {
  fileInput.value?.click();
};

// 获取所有图片
const fetchImages = async () => {
  try {
    const response = await axios.get('http://localhost:3389/images');
    images.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
const getImageUrl = (fileName: string) => {
  // const baseUrl = window.location.origin; // 获取当前页面的基本URL
  const baseUrl = 'http://localhost:3389/nodeServe/uploads'; // 获取当前页面的基本URL
  // return baseUrl + '/' + fileName;
  return fileName;
};
// 初始化获取图片
fetchImages();


// 删除图片
const deleteImage = async () => {
  let fileName = '1692504912258-heartO.png'
  axios.get('http://localhost:3389/delete', {
    params: {
      fileName: fileName
    }
  })
    .then(response => {
      console.log('数组数据已删除：', response.data);
    })
    .catch(error => {
      console.error('删除数据时出错：', error);
    });

};
deleteImage()
const test = 'test123';
const key = 'zynlyy9229'
const result = aes.encryptAES(test, key)
console.log('testaess', result, aes.decryptAES(result, key))
const count = ref(0);
const isClicked = ref(false);
import dateTime from './time'
const recordMainCSSChange = reactive(['record_main', 'record_main_1'])
const inputValue = ref('')
// 一周每天的样式、数据
const state = reactive({
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
  axios.get('http://localhost:3389/', {
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
// 定时时间
let timeTarget = ref('')
let timeTargetDisable = ref(false)
let timeTargetDisableDb = ref(false)

// 单击确认发送数据
const sureToSave = () => {
  timeTargetDisable.value = !timeTargetDisable.value
  timeTargetDisableDb.value = false
  // 定时发送
  if (!timeTargetDisable.value) {
    saveData()
  }
}
// 双击确认发送数据
const sureToSaveDb = () => {
  timeTargetDisableDb.value = !timeTargetDisableDb.value
  timeTargetDisable.value = false
  if (!timeTargetDisableDb.value) {
    saveData()
  }
}
// 定时发送功能
function sendRequest() {
  // 在这里编写发送请求的代码
  saveData()
  console.log('发送请求');
}
// 时间戳
let timeRecord = ref('22:46:24')
const scheduleRequest = (targetTime: any) => {
  const currentTime = new Date().getTime();
  timeRecord.value = formatTime(targetTime)
  const timeDelay = targetTime.getTime() - currentTime;
  if (timeDelay > 0) {
    setTimeout(function () {
      sendRequest();
    }, timeDelay);
  } else {
    console.log('指定时间已过');
  }
}
//时间格式 
function formatTime(date: any) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return hours + ':' + minutes + ':' + seconds;
}
// 保存发送数据
const saveData = () => {
  // 加密传输
  let textSend = aes.encryptAES(inputValue.value, key)
  axios.get('http://localhost:3389/', {
    params: {
      id: '003',
      nameContent: textSend,
      date: timeTarget.value
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

  axios.get('http://localhost:3389/getData')
    .then(response => {
      console.log('从服务器获取的数组数据：', response.data);
      let dataGet = response.data[response.data.length - 1].text
      // 解密赋值
      inputValue.value = aes.decryptAES(dataGet, key)
      const targetTime1 = new Date(response.data[response.data.length - 1].date);
      timeRecord.value = formatTime(targetTime1)
      console.log('时间时间1111:', response.data[response.data.length - 1].date, timeRecord.value)
    })
    .catch(error => {
      console.error('获取数组数据时出错：', error);
    });
}
// 默认获取数据
getData()

// 获取数据-计数
const getDataCount = () => {
  axios.get('http://localhost:3389/getDataCount')
    .then(response => {
      console.log('从服务器获取的数组数据：', response.data);
      count.value = response.data[response.data.length - 1].text
    })
    .catch(error => {
      console.error('获取数组数据时出错：', error);
    });
}
// 默认获取计数
getDataCount()


</script>
<style lang="scss" scoped>
.container {
  // float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  // width: 800px;
  z-index: 9;

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

    .photo {
      width: 10px;
      height: 10px;
      border-radius: 5px;
      border: 1px solid;
      margin-right: 10px;
      cursor: pointer;
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

      .time_record {
        display: flex;
        justify-content: right;
        // padding-right: 30px;
        opacity: 0.7;
        font-size: 13px;
      }

      .time_picker {
        display: flex;
        justify-content: center;
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

        .btn_date {
          height: 15px;
          width: 15px;
          margin-bottom: 7px;
          // background-color: rgb(248, 219, 184);
          margin-left: 10px;
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

.carousel {
  // position: relative;
  float: left;
  z-index: 99;
  width: 400px;
}

:deep(.el-overlay) {
  .el-overlay-dialog {
    .el-dialog {
      background: none !important;

      .el-carousel__item {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

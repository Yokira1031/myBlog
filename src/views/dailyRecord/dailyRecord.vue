E1FFFF<template>
  <div class="record">
    <div class="title">
      <!-- <span>日常记录贴</span> -->
    </div>
    <div class="record_wrapper">
      <!-- 每一天栏 -->
      <div class="record_title">
        <div class="tipCircle"
          v-for="(item, index) in tipCircleList"
          :key="index"
          :style="item.active === true ? 'background-color: ' + item.bgColor + ';' : ''"
          @click="showDailyRecord(item.num)"
        ></div>
      </div>
      <!-- 便签输入模块 -->
      <div :class="recordMainCSSChange">
          <!-- 输入 -->
          <div class="record_input">
            <el-input
              v-model="textarea2"
              type="textarea"
              :show-word-limit='false'
              placeholder="Please input"
            />
          </div>
          <!-- 确认按钮 -->
          <div class="record_button">
            <div class="btn" @click="submit"></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive} from 'vue'
const textarea2 = ref('')
// 一周每天的样式、数据
const tipCircleList = reactive([
  {
    active: true,
    num: '1',
    text: '111',
    bgColor: '#E1FFFF'
  },
  {
    active: true,
    num: '2',
    text: '222',
    bgColor: '#AFEEEE'
  },
  {
    active: false,
    num: '3',
    text: '333',
    bgColor: '#00FFFF'
  },
  {
    active: true,
    num: '4',
    text: '444',
    bgColor: '#008B8B'
  },
  {
    active: true,
    num: '5',
    text: '555',
    bgColor: '#008080'
  },
  {
    active: true,
    num: '6',
    text: '666',
    bgColor: '#008B8B'
  },
  {
    active: true,
    num: '7',
    text: '777',
    bgColor: '#F5DEB3'
  }

])

// 点击每一天改变样式
const recordMainCSSChange = reactive(['record_main', 'record_main_1'])

// 点击每一天的颜色圆圈
const showDailyRecord = (num) => {
  // 改变样式
  recordMainCSSChange[1] = 'record_main_' + num.toString()
  // 改变数据
  textarea2.value = tipCircleList[num - 1].text
  console.log('showw')
}

// 字符串record_main_1jie'gu
const extractNumber = (str) => {
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
  let num = extractNumber(recordMainCSSChange[1])
  textarea2.value = tipCircleList[num - 1].text
}


</script>

<style lang="scss" scoped>
  .record {
    // min-height: 100vh;
    height: 400px;
    overflow: auto;
    // margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-content: flex-start;
    .title {
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2C3C4D;
      line-height: 33px;
      letter-spacing: 3px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .record_wrapper{
      width: 90%;
      height: 300px;
      margin-top: 20px;
      // border: solid 1px;
      .record_title{
        height: 20%;
        // border: solid 1px;
        display: flex;
        align-items: center;
        .tipCircle{
          width: 20px;
          height: 20px;
          border-radius: 10px;
          margin-right: 5px;
          cursor: pointer;
          border: 0.1px solid #bed2db;
          // box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
        }
      }
      .record_main{
        width: 90%;
        height: 90%;
        box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
        // background-color: #dcffc1;
        // border: solid 1px;
        display: flex;
        justify-content: space-between;
        .record_input{
          width: 80%;
          height: 100%;
          :deep(.el-textarea){
            padding: 20px;
            height: 100%;
            // border: solid 1px;
            .el-textarea__inner{
              height: 100%;
              background-color: #dcffc1;
              box-shadow: none;
            }

            
          }
        }

        .record_button{
          width: 20%;
          height: 100%;
          display: flex;
          align-items: center;
          .btn{
            box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
            background-color: #dcffc1;
            width: 40px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
            border-radius: 20px;
          }
        }
      }
      .record_main_1{
        .record_input{
          :deep(.el-textarea){
            .el-textarea__inner{
              background-color: #E1FFFF;
            }
          }
        }
        .record_button{
          .btn{
            background-color: #E1FFFF;
          }
        }
      }
      .record_main_2{
        .record_input{
          :deep(.el-textarea){
            .el-textarea__inner{
              background-color: #AFEEEE;
            }
          }
        }
        .record_button{
          .btn{
            background-color: #AFEEEE;
          }
        }
      }
      .record_main_3{
        .record_input{
          :deep(.el-textarea){
            .el-textarea__inner{
              background-color: #00FFFF;
            }
          }
        }
        .record_button{
          .btn{
            background-color: #00FFFF;
          }
        }
      }
      .record_main_4{
        .record_input{
          :deep(.el-textarea){
            .el-textarea__inner{
              background-color: #008B8B;
            }
          }
        }
        .record_button{
          .btn{
            background-color: #008B8B;
          }
        }
      }
      .record_main_5{
        .record_input{
          :deep(.el-textarea){
            .el-textarea__inner{
              background-color: #008080;
            }
          }
        }
        .record_button{
          .btn{
            background-color: #008080;
          }
        }
      }
      .record_main_6{
        .record_input{
          :deep(.el-textarea){
            .el-textarea__inner{
              background-color: #008B8B;
            }
          }
        }
        .record_button{
          .btn{
            background-color: #008B8B;
          }
        }
      }
      .record_main_7{
        .record_input{
          :deep(.el-textarea){
            .el-textarea__inner{
              background-color: #F5DEB3;
            }
          }
        }
        .record_button{
          .btn{
            background-color: #F5DEB3;
          }
        }
      }
    }
  }
@media (min-width: 1024px) {
  .about {
    // min-height: 100vh;
    height: 400px;
    overflow: auto;
    // margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-content: flex-start;
    .record{
      height: 300px;
    }
  }
}
</style>
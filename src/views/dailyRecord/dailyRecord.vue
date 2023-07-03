 <template>
  <div class="record">
    <div class="title">
      <!-- <span>日常记录贴</span> -->
    </div>
    <div class="record_wrapper">
      <!-- 每一天栏 -->
      <div class="record_title">
        <div class="tipCircle"
          v-for="(item, index) in state.tipCircleList"
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
              @blur="submit"
            />
          </div>
          <div class="input_mark">{{markTip}}</div>
          <!-- 确认按钮 -->
          <div class="record_button">
            <div class="btn" @click="sureToSave"></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, toRef } from 'vue'
import axios from 'axios';

const textarea2 = ref('')
// 一周每天的样式、数据
const state = reactive({
  tipCircleList: [
    {
      active: true,
      num: '1',
      text: '周一',
      mark: '周一',
      bgColor: '#FFE4B5'
    },
    {
      active: true,
      num: '2',
      text: '周二',
      mark: '周二',
      bgColor: '#DEB887'
    },
    {
      active: true,
      num: '3',
      text: '周三',
      mark: '周三',
      bgColor: '#EEE8AA'
    },
    {
      active: true,
      num: '4',
      text: '周四',
      mark: '周四',
      bgColor: '#F5DEB3'
    },
    {
      active: true,
      num: '5',
      text: '周五',
      mark: '周五',
      bgColor: '#98FB98'
    },
    {
      active: true,
      num: '6',
      text: '周六',
      mark: '周六',
      bgColor: '#F5DEB3'
    },
    {
      active: true,
      num: '7',
      text: '周日',
      mark: '周日',
      bgColor: '#F5DEB3'
    }
  ]
})
// 点击每一天改变样式
const recordMainCSSChange = reactive(['record_main', 'record_main_1'])
const markTip = ref('周一')
// 点击每一天的颜色圆圈
const showDailyRecord = (num) => {
  // 改变样式
  recordMainCSSChange[1] = 'record_main_' + num.toString()
  switch(num) {
    case '1':
    markTip.value = '周一';
    break;
    case '2':
    markTip.value = '周二';
    break;
    case '3':
    markTip.value = '周三';
    break;
    case '4':
    markTip.value = '周四';
    break;
    case '5':
    markTip.value = '周五';
    break;
    case '6':
    markTip.value = '周六';
    break;
    case '7':
    markTip.value = '周七';
    break;
    default:
    break;
  }
  console.log
  // 改变数据
  textarea2.value = state.tipCircleList[num - 1].text
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
  state.tipCircleList[num - 1].text = textarea2.value
}
const sureToSave = () => {
  saveData()
}
// 保存数组数据
const saveData = () => {
  console.log(state.tipCircleList)
  axios.post('http://39.105.171.50:3389/api/save', {
    array: state.tipCircleList
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
  axios.get('http://39.105.171.50:3389/api/data')
    .then(response => {
      console.log('hhh', state.tipCircleList)
      console.log('从服务器获取的数组数据：', response.data);
      state.tipCircleList = response.data.array
      textarea2.value = state.tipCircleList[0].text
      console.log('hhh', state.tipCircleList)
    })
    .catch(error => {
      console.error('获取数组数据时出错：', error);
  });
}
getData()

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
              padding-top: 20px;
              padding-left: 25px;
              box-shadow: none;
            }

            
          }
        }
        .input_mark{
          // color: red;
          opacity: 0.7;
          width: 30px;
          position: relative;
          font-size: 12px;
          right: 80px;
          top: 25px;
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
              background-color: #FFE4B5;
            }
          }
        }
        .record_button{
          .btn{
            background-color: #FFE4B5;
          }
        }
      }
      .record_main_2{
        .record_input{
          :deep(.el-textarea){
            .el-textarea__inner{
              background-color: #DEB887;
            }
          }
        }
        .record_button{
          .btn{
            background-color: #DEB887;
          }
        }
      }
      .record_main_3{
        .record_input{
          :deep(.el-textarea){
            .el-textarea__inner{
              background-color: #EEE8AA;
            }
          }
        }
        .record_button{
          .btn{
            background-color: #EEE8AA;
          }
        }
      }
      .record_main_4{
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
      .record_main_5{
        .record_input{
          :deep(.el-textarea){
            .el-textarea__inner{
              background-color: #98FB98;
            }
          }
        }
        .record_button{
          .btn{
            background-color: #98FB98;
          }
        }
      }
      .record_main_6{
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
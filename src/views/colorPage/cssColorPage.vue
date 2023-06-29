<template>
  <div class="about">
    <div class="title">颜色对照页</div>
    <div class="color_group" v-for="(item, index) in colorList" :key="index" >
    {{item.colorName}}
      <div class="color_item" v-for="(itemC, indexC) in item.colorList" :key="indexC" 
       :style="'background-color:'+ itemC.colorText">
       {{itemC.colorText}}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import colorObj from './strData'
  const colorList = [
    {
      colorName: '红色系',
      colorList: [
        {
          colorText: '#DC143C'
        },
        {
          colorText: '#EEE8AA	'
        },
        {
          colorText: '#FFF8DC	'
        },
        {
          colorText: '#DEB887'
        },
        {
          colorText: '#FF0000'
        },
        {
          colorText: '#A52A2A'
        },
        {
          colorText: '#B22222'
        },
        {
          colorText: '#8B0000'
        },
    
        {
          colorText: '#FFC0CB'
        },
        {
          colorText: '#FFF0F5'
        },
        {
          colorText: '#FF69B4'
        },
        {
          colorText: '#FF1493'
        },
        {
          colorText: '#FF1493'
        },
        {
          colorText: '#FE00FF'
        },
      ]
    },
    {
      colorName: '紫色系',
      colorList: [
        {
          colorText: '#DA70D6'
        },
        {
          colorText: '#D8BFD8	'
        },
        {
          colorText: '#D8BFD8	'
        },
        {
          colorText: '#EE82EE'
        },
        {
          colorText: '#FF00FF'
        },
        {
          colorText: '#FF00FF'
        },
        {
          colorText: '#8B008B'
        },
        {
          colorText: '#800080'
        },
    
        {
          colorText: '#BA55D3'
        },
        {
          colorText: '#9932CC'
        },
        {
          colorText: '#4B0082'
        },
        {
          colorText: '#8A2BE2'
        },
        {
          colorText: '#9370DB'
        },
        {
          colorText: '#7B68EE'
        },
        {
          colorText: '#6A5ACD'
        },
        {
          colorText: '#483D8B'
        },
         
      ]
    },
    {
      colorName: '蓝色系',
      colorList: colorObj.strBlue
    },
    {
      colorName: '绿色系',
      colorList: colorObj.strGreen
    },
    {
      colorName: '黄色系',
      colorList: colorObj.strYellow
    },
    {
      colorName: '灰色系',
      colorList: colorObj.strGray
    },

  ]

  


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
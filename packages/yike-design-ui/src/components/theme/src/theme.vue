<template>
  <div class="yk-theme" v-show="control">
    <yk-icon
      name="yike-taiyang"
      v-show="nowSkin == 'light'"
      class="son"
      @click="onChange('dark')"
    />
    <yk-icon
      name="yike-yueliang"
      v-show="nowSkin == 'dark'"
      class="moon"
      @click="onChange('light')"
    />
  </div>
</template>

<script lang="ts" setup>
import { menusModel } from './util'
import { ref, onMounted } from 'vue'
import { ThemeProps } from './theme'
import '../style'

import { YkIcon } from '../../../index'

const props = withDefaults(defineProps<ThemeProps>(), {
  skin: 'auto',
  control: true,
})

const nowSkin = ref()
let obj = ref({})

//本地存储主题
const setLocalTheme = (theme: string) => {
  //本次存储
  localStorage.setItem('YKTHEME', theme)
}
//获取本地主题
const getLocalTheme = () => {
  //获取存储数据
  if (localStorage.getItem('YKTHEME') != null) {
    nowSkin.value = localStorage.getItem('YKTHEME')
  }
}

//主题切换
const theme = (obj: object): void => {
  for (let key in obj) {
    document
      .getElementsByTagName('body')[0]
      .style.setProperty(`--${key}`, obj[key])
  }
}
//切换主题
const onChange = (e: string) => {
  nowSkin.value = e
  if (e == 'light') {
    obj.value = menusModel.themeLight
  } else if (e == 'dark') {
    obj.value = menusModel.themeDark
  }
  setLocalTheme(e)
  theme(obj.value)
}

//监听系统主题变化
const onThemeListen = () => {
  let match = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (match) {
    // console.log("iis");
    obj.value = menusModel.themeDark
    nowSkin.value = 'dark'
  } else {
    // console.log("nno");
    obj.value = menusModel.themeLight
    nowSkin.value = 'light'
  }
  theme(obj.value)
  // console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)
  if (window.matchMedia) {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        let status = e.matches ? true : false
        if (status) {
          // console.log("is");
          obj.value = menusModel.themeDark
          nowSkin.value = 'dark'
        } else {
          // console.log("no");
          obj.value = menusModel.themeLight
          nowSkin.value = 'light'
        }
        theme(obj.value)
      })
  }
}

//各类执行
const change = () => {
  if (props.skin == 'auto' && props.control) {
    getLocalTheme()
    onChange(nowSkin.value)
    onThemeListen()
  } else if (props.skin == 'auto' && !props.control) {
    onThemeListen()
  } else if (props.skin != 'auto' && props.control) {
    onThemeListen()
    nowSkin.value = props.skin
    getLocalTheme()
    onChange(nowSkin.value)
  } else if (props.skin != 'auto' && !props.control) {
    nowSkin.value = props.skin
    onChange(nowSkin.value)
  }
}

onMounted(() => {
  change()
})
</script>

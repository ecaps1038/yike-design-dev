<template>
  <yk-skeleton
    width="100%"
    height="15px"
    animated
    title
    :row="3"
    avatar
  ></yk-skeleton>
  <yk-skeleton
    style="margin-top: 30px"
    width="100%"
    height="15px"
    animated
    title
    :row="4"
    avatar
    :avatar-style="{
      shape: 'square',
      size: 'xl',
      imgUrl: 'https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png',
    }"
  ></yk-skeleton>
</template>

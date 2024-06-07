<template>
  <yk-time-picker
    :default-value="'23:11:06'"
    :style="{ marginBottom: '20px' }"
  ></yk-time-picker>
  <yk-time-picker
    :default-value="['23:11:06', '12:12:10']"
    type="time-range"
  ></yk-time-picker>
</template>

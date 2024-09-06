<template>
  <yk-time-picker
    :disabled-hours="() => [1, 2, 4, 14]"
    :disabled-minutes="() => [1, 2, 3, 4, 14, 15, 16, 20, 50]"
    :disabled-seconds="() => [1, 2, 3, 4, 5, 6, 7, 10, 14, 60]"
  ></yk-time-picker>
</template>

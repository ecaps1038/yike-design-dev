<template>
  <yk-breadcrumb separator=">">
    <yk-breadcrumb-item>Home</yk-breadcrumb-item>
    <yk-breadcrumb-item>Button</yk-breadcrumb-item>
    <yk-breadcrumb-item>Rate</yk-breadcrumb-item>
  </yk-breadcrumb>
  <!-- <yk-breadcrumb separator-icon="yk-xiexian">
    <yk-breadcrumb-item>Home</yk-breadcrumb-item>
    <yk-breadcrumb-item>Button</yk-breadcrumb-item>
    <yk-breadcrumb-item>Rate</yk-breadcrumb-item>
  </yk-breadcrumb> -->
  <yk-breadcrumb>
    <template #separator>
      <IconRightOutline />
    </template>
    <yk-breadcrumb-item>Home</yk-breadcrumb-item>
    <yk-breadcrumb-item>Button</yk-breadcrumb-item>
    <yk-breadcrumb-item>Rate</yk-breadcrumb-item>
  </yk-breadcrumb>
</template>

<template>
  <yk-space style="width: 100%; height: 100%">
    <yk-timeline>
      <yk-timeline-item
        title="第一个步骤"
        time="2023-07-27"
        dot-color="rgba(var(--gray), 0.48)"
      ></yk-timeline-item>
      <yk-timeline-item title="第二个步骤" time="2023-07-27">
        <template #dot>
          <IconTickOutline
            :style="{
              fontSize: '12px',
              padding: '2px',
              boxSizing: 'border-box',
              borderRadius: '50%',
              backgroundColor: 'rgb(var(--scolor))',
            }"
          />
        </template>
      </yk-timeline-item>
      <yk-timeline-item title="这里是第三个步骤" time="2023-07-27">
        <template #dot>
          <IconTickOutline
            :style="{
              fontSize: '12px',
              padding: '2px',
              boxSizing: 'border-box',
              borderRadius: '50%',
              backgroundColor: 'rgb(var(--ecolor))',
            }"
          />
        </template>
      </yk-timeline-item>
      <yk-timeline-item
        title="第四个步骤还在进行中…"
        time="2023-07-27"
      ></yk-timeline-item>
    </yk-timeline>
  </yk-space>
</template>

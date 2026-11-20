import type { Component } from 'vue';

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

export type StepItem = {
  title: string;
  description?: string;
  icon?: Component;
  status?: StepStatus;
};

export type StepsProps = {
  items?: StepItem[];
  /** 当前步骤索引 */
  current?: number;
  /** 当前步骤的状态 */
  status?: 'process' | 'error';
  direction?: 'horizontal' | 'vertical';
  size?: 's' | 'm' | 'l';
  clickable?: boolean;
};

export type ResolvedStep = StepItem & { status: StepStatus };

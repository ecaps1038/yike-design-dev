import { usePropsConfig } from '../utils';

const NextProps = usePropsConfig('disabled', 'size');

type NextEmits = {
  (e: 'next'): void;
};

export { NextEmits };
export { NextProps };

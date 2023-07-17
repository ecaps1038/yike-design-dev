import type { Size } from '../../../../utils/constant';

type NextProps = {
  disabled: boolean;
  size: Size;
};

type NextEmits = {
  (e: 'click'): void;
};

const defaultNextProps: NextProps = {
  disabled: false,
  size: 'l',
};

export { defaultNextProps };
export type { NextProps, NextEmits };

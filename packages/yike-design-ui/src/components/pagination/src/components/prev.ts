import type { Size } from '../../../../utils/constant';

type PrevProps = {
  disabled: boolean;
  size: Size;
};

type PrevEmits = {
  (e: 'click'): void;
};

const defaultPrevProps: PrevProps = {
  disabled: false,
  size: 'l',
};

export { defaultPrevProps };
export type { PrevProps, PrevEmits };

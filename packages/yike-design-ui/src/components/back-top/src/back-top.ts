export type animationType = 'fade' | 'move';
export type typeType = 'primary' | 'secondary';

export type BackTopProps = {
  animation?: animationType;
  type?: typeType;
  right?: string;
  bottom?: string;
  visibilityHeight?: string;
  target?: string | HTMLElement;
  icon?: string;
};

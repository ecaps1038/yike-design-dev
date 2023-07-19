type animationType = 'fade' | 'move';
type themeType = 'primary' | 'secondary';
type scrollBehaviorType = 'smooth' | 'instant' | 'auto';

export type BackTopProps = {
  animation?: animationType;
  theme?: themeType;
  right?: string | number;
  bottom?: string | number;
  visibleHeight?: string | number;
  target?: string | HTMLElement;
  icon?: string;
  behavior?: scrollBehaviorType;
};

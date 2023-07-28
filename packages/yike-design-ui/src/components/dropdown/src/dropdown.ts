export type DropdownProps = {
  label?: string;
  type?: 'primary' | 'secondary' | 'outline';
  size?: 's' | 'm' | 'l' | 'xl';
  trigger?: 'hover' | 'click' | 'contextmenu';
  position?: 'bottom' | 'bl' | 'br' | 'top' | 'tl' | 'tr';
  disabled?: boolean;
};

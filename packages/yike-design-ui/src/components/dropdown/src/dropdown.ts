export type DropdownProps = {
  label?: string;
  type?: 'primary' | 'secondary' | 'outline';
  icon?: string | boolean;
  size?: 's' | 'm' | 'l' | 'xl';
  trigger?: 'hover' | 'click' | 'contextmenu';
  position?: 'bottom' | 'bl' | 'br' | 'top' | 'tl' | 'tr';
  disabled?: boolean;
};

export type DropdownItemProps = {
  value?: string | number | object;
  icon?: string;
  disabled?: boolean;
};

export type ButtonProps = {
  type?: 'primary' | 'secondary' | 'outline';
  shape?: string;
  status?: 'danger' | 'warning' | 'success' | 'primary';
  size?: 's' | 'm' | 'l' | 'xl';
  long?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

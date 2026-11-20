export type ResultStatus = 'success' | 'error' | 'warning' | 'info';

export type ResultProps = {
  status?: ResultStatus;
  title?: string;
  subtitle?: string;
};

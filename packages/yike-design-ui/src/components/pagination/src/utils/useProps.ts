import { PaginationProps } from '../pagination';

type PaginationPropsType = typeof PaginationProps;

type PaginationPropsKeys = keyof PaginationPropsType;
type ExtractProps<T extends PaginationPropsKeys[]> = {
  [K in T[number]]: PaginationPropsType[K];
};

export const usePropsConfig = <T extends PaginationPropsKeys[]>(...keys: T) => {
  const newProps: any = {};
  keys.forEach((key) => {
    newProps[key] = PaginationProps[key];
  });
  return newProps as ExtractProps<T>;
};

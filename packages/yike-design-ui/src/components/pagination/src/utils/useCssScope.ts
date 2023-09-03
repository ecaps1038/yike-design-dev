import { inject } from 'vue';
import { PAGINATION_CSS_NAMESPACE } from '../pagination';
import { createCssScope } from '../../../utils';

export const useCssScope = (blockSuffix?: string) => {
  const namespace = inject(PAGINATION_CSS_NAMESPACE, 'pagination');
  const cssScope = createCssScope(
    blockSuffix ? `${namespace}-${blockSuffix}` : namespace,
  );

  return cssScope;
};

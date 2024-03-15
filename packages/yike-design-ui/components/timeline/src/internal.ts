import { InjectionKey } from 'vue';
import { TimelinePlacement } from '../../utils';

export const timelineContextKey: InjectionKey<{
  horizontal: boolean;
  placement: TimelinePlacement;
}> = Symbol('scrollbarContext');

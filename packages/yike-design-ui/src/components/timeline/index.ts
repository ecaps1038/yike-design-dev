import Timeline from './src/timeline.vue';
import TimelineItem from './src/timeline-item.vue';
import { withInstall } from '../utils/index';

export const YkTimeline = withInstall(Timeline);
export const YkTimelineItem = withInstall(TimelineItem);
export default { YkTimeline, YkTimelineItem };

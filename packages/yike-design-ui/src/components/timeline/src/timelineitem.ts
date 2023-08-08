import { TimelineType } from '../../utils/constant';
export type TimelineItemProps = {
  time?: string;
  title?: string;
  content?: string;
  lineType?: TimelineType;
  dotColor?: string;
  pending?: boolean;
};

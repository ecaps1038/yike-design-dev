import { TimelinePlacement, TimelineType } from '../../utils';
export type TimelineProps = {
  horizontal?: boolean;
  placement?: TimelinePlacement;
  reverse?: boolean;
};

export type TimelineItemProps = {
  time?: string;
  title?: string;
  content?: string;
  lineType?: TimelineType;
  dotColor?: string;
  pending?: boolean;
};

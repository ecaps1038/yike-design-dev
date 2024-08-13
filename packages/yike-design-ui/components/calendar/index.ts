import Calendar from './src/calendar.vue';
import CalendarMin from './src/calendar-min.vue';
import { withInstall } from '../utils';

export const YkCalendar = withInstall(Calendar);
export const YkCalendarMin = withInstall(CalendarMin);
export default YkCalendar;
export * from './src/calendar';

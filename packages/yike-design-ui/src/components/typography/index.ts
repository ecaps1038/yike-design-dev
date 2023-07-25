import Paragraph from './src/paragraph.vue';
import Text from './src/text.vue';
import Title from './src/title.vue';
import { withInstall } from '../../utils/index';

export const YkParagraph = withInstall(Paragraph);
export const YkText = withInstall(Text);
export const YkTitle = withInstall(Title);

export * from './src/typography';

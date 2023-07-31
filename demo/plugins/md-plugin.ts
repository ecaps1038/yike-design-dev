import MarkdownIt from 'markdown-it';

export const mdCustomH3: MarkdownIt.PluginSimple = (md) => {
  md.core.ruler.push('replace_h3', (state) => {
    const tokens = state.tokens;
    const tokensToRemove = [];
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'heading_open') {
        // 获取标题级别，如 h1, h2, h3 等
        const headingLevel = tokens[i].tag.replace('h', '');

        // 获取标题内容
        const headingContent = tokens[i + 1].content;

        // 生成自定义组件形式的字符串
        const customComponent = `<yk-title :level="${headingLevel}" id="${headingContent}">${headingContent}</yk-title>`;

        // 替换标题 Token 为自定义组件字符串
        tokens[i].type = 'html_inline';
        tokens[i].tag = '';
        tokens[i].content = customComponent;

        // 收集需要移除的 Token 的索引
        tokensToRemove.push(i + 1, i + 2);
      }
    }

    // 移除收集到的 Token
    for (let i = tokensToRemove.length - 1; i >= 0; i--) {
      tokens.splice(tokensToRemove[i], 1);
    }
  });
};

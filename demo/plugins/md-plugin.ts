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
        const customComponent = `<yk-title :level="${headingLevel}" id="${headingContent.replace(
          /\s/,
          '',
        )}">${headingContent}</yk-title>`;

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

export const mdCustomLinkCls: MarkdownIt.PluginSimple = (md) => {
  const className = 'yk-doc-link';

  const defaultLinkOpenRule =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  // 重写 link_open 规则
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // 获取当前链接 token
    const token = tokens[idx];

    // 获取现有的类名
    const existingClasses = token.attrGet('class');

    // 将用户指定的类名和现有类名合并
    const classes = existingClasses
      ? `${existingClasses} ${className}`
      : className;

    // 更新链接 token 的类名属性
    token.attrSet('class', classes);
    token.attrSet('target', '_blank');

    // 调用默认的 link_open 规则渲染链接
    return defaultLinkOpenRule(tokens, idx, options, env, self);
  };
};

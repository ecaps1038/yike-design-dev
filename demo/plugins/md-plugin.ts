import MarkdownIt from 'markdown-it';

export function mdCustomH3(md: MarkdownIt) {
  md.renderer.rules.heading_open = (tokens, idx) => {
    const title = tokens[idx + 1].content;
    const level = tokens[idx].tag.at(-1);

    // prettier-ignore
    return `<yk-title 
      :level="${level}" 
      id="${title.replace(' ', '')}" 
    >`;
  };

  md.renderer.rules.heading_close = () => {
    return `</yk-title>`;
  };
}

export function mdCustomLinkCls(md: MarkdownIt) {
  const className = 'yk-doc-link';

  // 重写 link_open 规则
  md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
    const token = tokens[idx];
    const existingClasses = token.attrGet('class') || '';
    const classes = `${existingClasses} ${className}`.trim();

    token.attrSet('class', classes);
    token.attrSet('target', '_blank');

    return self.renderToken(tokens, idx, options);
  };
}

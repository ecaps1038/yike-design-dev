import { BlockProps } from './typography'

export function wrapperDecorations(
  { mark, underline, delete: del, strong }: BlockProps,
  content,
) {
  let currentContent = content
  function wrap(decorateNeeded: boolean | undefined, Tag: string) {
    if (!decorateNeeded) return
    currentContent = `<${Tag}>${currentContent}</${Tag}>`
  }
  wrap(mark, 'mark')
  wrap(underline, 'underline')
  wrap(del, 'del')
  wrap(strong, 'strong')
  return currentContent
}

export function wrapperTitles(level: number, content: string) {
  return `<h${level}>${content}</h${level}>`
}

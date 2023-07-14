export type animationType = 'fade' | 'move'

export type BackTopProps = {
  animation?: animationType
  right?: string
  bottom?: string
  visibilityHeight?: string
  target?: string | HTMLElement
  icon?: string
}

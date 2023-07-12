type TType = 'warning' | 'error' | 'success'
type TMessageFn = (arg: TOptionObj | string) => void
interface TMessage extends TMessageFn {
  success: TMessageFn
  warning: TMessageFn
  info: TMessageFn
  error: TMessageFn
  closeAll: TOnClose
}
type TOptionObj = {
  message: string
  type?: TType
  duration?: number
  onClose?: TOnClose
}
type TOption = string | TOptionObj

type TClose = () => boolean
type TOnClose = () => void

export type { TMessage, TType, TOnClose, TOption, TMessageFn }

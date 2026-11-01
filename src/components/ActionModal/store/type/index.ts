export type ActionModalProps = {
  success: boolean
  isOpen: boolean
  descText: string
  infoText?: string
  closeButton?: boolean
  link?: {
    text: string
    direct: string
    replace?: boolean
  }
  onConfirm?: () => void
}

export type ModalStore = {
  modalActions: ActionModalProps
  openModalActions: (props: Omit<ActionModalProps, "isOpen">) => void
  closeModalActions: () => void
}

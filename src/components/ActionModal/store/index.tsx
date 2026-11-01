// modalStore.ts
import { create } from "zustand"
import { ModalStore } from "./type"

export const useActionModal = create<ModalStore>((set) => ({
  modalActions: {
    success: true,
    isOpen: false,
    descText: "",
    infoText: "",
    closeButton: false,
    link: {
      text: "",
      direct: "",
      replace: false,
    },
    onConfirm: undefined,
  },
  openModalActions: (props) =>
    set({
      modalActions: {
        ...props,
        isOpen: true,
      },
    }),
  closeModalActions: () =>
    set((state) => ({
      modalActions: {
        ...state.modalActions,
        isOpen: false,
      },
    })),
}))

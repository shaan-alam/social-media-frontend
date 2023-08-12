export interface ModalProps {
  children: JSX.Element[] | JSX.Element;
  modalTitle?: string;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

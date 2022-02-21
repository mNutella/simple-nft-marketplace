import { useState } from "react";

export default function useModal(open = false) {
  const [isOpen, setOpen] = useState(open);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return { isOpenModal: isOpen, openModal, closeModal }
}

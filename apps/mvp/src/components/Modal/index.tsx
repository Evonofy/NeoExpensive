import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

export type ModalHandles = {
  handleOpenModal(): void;
  handleCloseModal(): void;
  onClose(callback: () => void): void;
  visible: boolean;
};

type ModalProps = {
  visible: boolean;
};

const Modal: React.ForwardRefRenderFunction<ModalHandles, ModalProps> = ({ visible: isVisible, ...rest }, ref) => {
  const [visible, setVisible] = useState(isVisible);

  const onClose = useCallback((callback?: () => void) => callback, []);

  const handleOpenModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    onClose();
    setVisible(false);
  }, [onClose]);

  useImperativeHandle(ref, () => {
    return {
      handleOpenModal,
      handleCloseModal,
      visible,
      onClose,
    };
  });

  if (!visible) {
    return null;
  }

  return (
    <div>
      <p>modal</p>

      <button onClick={handleCloseModal}>close modal</button>
    </div>
  );
};

export default forwardRef(Modal);

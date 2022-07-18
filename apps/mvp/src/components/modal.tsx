import React, { forwardRef, ReactNode, useCallback, useImperativeHandle, useState } from 'react';

export type ModalHandles = {
  handleOpenModal(): void;
  handleCloseModal(): void;
  onClose(callback: () => void): void;
  visible: boolean;
};

type ModalProps = {
  visible: boolean;
  children: ReactNode;
};

const Modal: React.ForwardRefRenderFunction<ModalHandles, ModalProps> = (
  { children, visible: isVisible, ...rest },
  ref
) => {
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
      <div>{children}</div>

      <button onClick={handleCloseModal}>close modal</button>
    </div>
  );
};

export default forwardRef(Modal);

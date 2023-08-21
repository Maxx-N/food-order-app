import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const Modal = ({ children, onCloseModal }) => {
  return createPortal(
    <>
      <div className={styles.backdrop} onClick={onCloseModal}></div>
      <div className={styles.modal}>{children}</div>
    </>,
    document.getElementById('portalRoot')
  );
};

export default Modal;

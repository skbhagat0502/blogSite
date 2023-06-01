import React from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import styles from "../css/Overlay.module.css";

function Overlay({
  handleOverlayToggle,
  handleLogout,
  handleDelete,
  message,
  handleEdit,
}) {
  const handleYesClick = () => {
    if (message === "logout") {
      handleLogout(); // Invoke the handleLogout function
    } else if (message === "delete") {
      handleDelete(); // Invoke the handleDelete function
    } else if (message === "update") {
      handleEdit();
    }
    handleOverlayToggle(); // Close the overlay
  };

  return (
    <Modal>
      <div className={styles.modal}>
        <h2>Are You Sure?</h2>
        <p>Do you want to {message}</p>
        <Button onClick={handleOverlayToggle} className={styles.lg}>
          No
        </Button>
        <Button onClick={handleYesClick} className={styles.dark}>
          Yes
        </Button>
      </div>
    </Modal>
  );
}

export default Overlay;

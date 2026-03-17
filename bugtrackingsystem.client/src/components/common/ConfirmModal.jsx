import React from 'react';

const ConfirmModal = ({
    isOpen,
    title = "Confirm Action",
    message = "Are you sure you want to submit?",
    onConfirm,
    onCancel
}) => {
    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>{title}</h2>
                <p>{message}</p>

                <div style={buttonContainer}>
                    <button onClick={onCancel} style={cancelBtn}>
                        Cancel
                    </button>
                    <button onClick={onConfirm} style={confirmBtn}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ConfirmModal;

//style for the modal
const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
};
const modalStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center"
};

const buttonContainer = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px"
};

const cancelBtn = {
    padding: "8px 12px",
    backgroundColor: "#ccc",
    border: "none",
    cursor: "pointer"
};

const confirmBtn = {
    padding: "8px 12px",
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    cursor: "pointer"
};
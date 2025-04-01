import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ show, onClose, task, onSave }) => {
  const [description, setDescription] = useState(task?.description || "");

  // Update the description when the task prop changes
  useEffect(() => {
    if (task) {
      setDescription(task.description || "");
    }
  }, [task]);

  if (!show) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (description.trim()) {
      onSave(task.id, description);
      setDescription("");
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={handleSave}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={onClose}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;

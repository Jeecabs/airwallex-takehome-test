import React, { useState } from "react";
import { requestInvite } from "../lib/api";
import { Modal } from "./Modal";
import { InviteForm } from "./InviteForm";
import { SuccessModal } from "./SuccessModal";

const Home: React.FC = () => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleInviteRequest = async (name: string, email: string) => {
    setIsLoading(true);
    const result = await requestInvite({ name, email });

    if (result.success) {
      setMessage(result.message);
      setShowInviteForm(false);
    } else {
      setMessage(undefined);
      setErrorMessage(result.message);
    }
    setIsLoading(false);
  };

  const handleToggleForm = () => {
    setShowInviteForm(!showInviteForm);
  };

  const closeModal = () => {
    setMessage(undefined);
  };

  return (
    <div className="home-container">
      <h1 className={"heading"}>Broccoli & Co.</h1>
      <p className={"text"}>A better way to enjoy every day.</p>
      <button
        className={"request-invite"}
        onClick={handleToggleForm}
        aria-haspopup="dialog"
        aria-expanded={showInviteForm}
      >
        Request Invite
      </button>

      {showInviteForm && (
        <Modal
          onClose={handleToggleForm}
          aria-labelledby="invite-modal-heading"
          aria-describedby="invite-modal-desc"
        >
          <InviteForm
            onSubmit={handleInviteRequest}
            errorMessage={errorMessage}
            isLoading={isLoading}
          />
        </Modal>
      )}
      {message && <SuccessModal message={message} onClose={closeModal} />}
    </div>
  );
};

export default Home;

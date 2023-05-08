import React, { useState } from "react";
import classNames from "classnames";
import { useFormValidation } from "../@hooks/useFormValidation";

interface InviteFormProps {
  onSubmit: (name: string, email: string) => void;
  errorMessage?: string;
  isLoading: boolean;
}

export function isValidEmail(email: string): boolean {
  // Source: https://stackoverflow.com/a/46181/5870912
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

export const InviteForm: React.FC<InviteFormProps> = ({
  onSubmit, errorMessage, isLoading,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const { errorMessages, validateForm } = useFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm(name, email, confirmEmail)) {
      onSubmit(name, email);
    }
  };

  return (
    <div className="column-flex-box">
      <h1 id="invite-modal-heading">Request an invite</h1>
      <p id="invite-modal-desc">{"Be the first to know when we launch."}</p>
      <form onSubmit={handleSubmit} className={"form-container"}>
        <label htmlFor="full-name" className="label">
          Full name
        </label>
        <input
          id="full-name"
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={classNames("form-input", "full-name")} />
        {errorMessages.name && (
          <div className={"error-message"}>{errorMessages.name}</div>
        )}
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classNames("form-input", "email")} />
        {errorMessages.email && (
          <div className={"error-message"}>{errorMessages.email}</div>
        )}
        <label htmlFor="confirm-email" className="label">
          Confirm email
        </label>
        <input
          id="confirm-email"
          type="email"
          placeholder="Confirm email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          className={classNames("form-input", "confirm-email")} />
        {errorMessages.confirmEmail && (
          <div className={"error-message"}>{errorMessages.confirmEmail}</div>
        )}
        {errorMessage && <div className={"error-message"}>{errorMessage}</div>}

        <button type="submit" className={"submit-button"} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

import { useState } from "react";
import { isValidEmail } from "@/components/InviteForm";

export function useFormValidation() {
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    confirmEmail: "",
  });

  const validateForm = (name: string, email: string, confirmEmail: string) => {
    let valid = true;
    const newErrorMessages = {
      name: "",
      email: "",
      confirmEmail: "",
    };

    if (name.length < 3) {
      newErrorMessages.name = "Full name must be at least 3 characters long.";
      valid = false;
    }

    if (!isValidEmail(email)) {
      newErrorMessages.email = "Email is not valid.";
      valid = false;
    }

    if (email !== confirmEmail) {
      newErrorMessages.confirmEmail = "Emails do not match.";
      valid = false;
    }

    setErrorMessages(newErrorMessages);

    return valid;
  };

  return { errorMessages, validateForm };
}

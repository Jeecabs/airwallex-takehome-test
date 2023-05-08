import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SuccessModal } from "./SuccessModal";
import "@testing-library/jest-dom/extend-expect";

describe("SuccessModal component", () => {
  it("renders correctly with provided message and responds to onClose event", () => {
    const message = "Your action has been completed successfully.";
    const onClose = jest.fn();

    const { getByText, getByRole } = render(
      <SuccessModal message={message} onClose={onClose} />
    );

    // Check if the success message is displayed
    expect(getByText(message)).toBeInTheDocument();

    // Check if the 'Success!' header is displayed
    expect(getByText("Success!")).toBeInTheDocument();

    // Check if the Close button is displayed and responds to the click event
    const closeButton = getByRole("button", { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal component", () => {
  test("renders the Modal component and closes with Escape key", () => {
    const onClose = jest.fn();
    render(
      <Modal onClose={onClose}>
        <p>Test content</p>
      </Modal>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  test("closes the modal when clicking outside the content", () => {
    const onClose = jest.fn();
    render(
      <Modal onClose={onClose}>
        <p>Test content</p>
      </Modal>
    );

    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalled();
  });
});

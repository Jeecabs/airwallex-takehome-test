import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InviteForm } from "./InviteForm";
import { server } from "@/mock/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe("InviteForm component", () => {
  test("renders the InviteForm component and validates the form", async () => {
    const onSubmit = jest.fn();
    render(<InviteForm onSubmit={onSubmit} isLoading={false} />);

    const fullNameInput = screen.getByPlaceholderText("Full name");
    const emailInput = screen.getByPlaceholderText("Email");
    const confirmEmailInput = screen.getByPlaceholderText("Confirm email");
    const submitButton = screen.getByText("Send");

    userEvent.type(fullNameInput, "Jo");
    userEvent.type(emailInput, "john.doe@example");
    userEvent.type(confirmEmailInput, "john.doe@example.com");
    fireEvent.click(submitButton);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(
      await screen.findByText("Full name must be at least 3 characters long.")
    ).toBeInTheDocument();
    expect(await screen.findByText("Email is not valid.")).toBeInTheDocument();
  });
});

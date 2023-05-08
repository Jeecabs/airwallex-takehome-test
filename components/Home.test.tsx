import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Home from "./Home";
import { server } from "@/mock/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Home component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Home component", () => {
    render(<Home />);
    expect(screen.getByText("Broccoli & Co.")).toBeInTheDocument();
    expect(
      screen.getByText("A better way to enjoy every day.")
    ).toBeInTheDocument();
    expect(screen.getByText("Request Invite")).toBeInTheDocument();
  });

  test("toggles the invite form modal", () => {
    render(<Home />);
    const requestInviteButton = screen.getByText("Request Invite");

    fireEvent.click(requestInviteButton);
    expect(screen.getByText("Request an invite")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("Request an invite")).not.toBeInTheDocument();
  });
});


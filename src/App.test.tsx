import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

jest.mock("./api");

global.URL.createObjectURL = jest.fn();

test("renders site name", async () => {
  render(<App />);
  await waitFor(async () =>
    expect(screen.getByText(/Some Photographs/i)).toBeInTheDocument()
  );
});

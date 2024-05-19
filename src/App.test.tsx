import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Dashboard } from "./Screens/dashboard/Dashboard";


describe("App", () => {
  it("renders Dashboard", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
  });

  it("renders the Dashboard component with the correct props", () => {
    const { getByText } = render(<App />);
    expect(getByText("Todos")).toBeInTheDocument();
    expect(getByText("Completed")).toBeInTheDocument();
  });
});
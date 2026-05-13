import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import api from "../services/api";
import ProtectedRoute from "./ProtectedRoute";

vi.mock("../services/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Navigate: ({ to }) => <div>Redirected to {to}</div>,
  };
});

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("shows a loading state while verifying authentication", () => {
    api.get.mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Private Area</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText("Checking authentication...")).toBeInTheDocument();
  });

  it("renders children when the token is valid", async () => {
    api.get.mockResolvedValue({ data: { user: { id: 1 } } });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Private Area</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Private Area")).toBeInTheDocument();
    });
  });

  it("redirects to login when verification fails", async () => {
    api.get.mockRejectedValue(new Error("Invalid token"));
    localStorage.setItem("token", "expired-token");

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Private Area</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Redirected to /login")).toBeInTheDocument();
    });
    expect(localStorage.getItem("token")).toBeNull();
  });
});

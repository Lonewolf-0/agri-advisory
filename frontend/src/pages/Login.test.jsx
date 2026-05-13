import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import api from "../services/api";
import Login from "./Login";

vi.mock("../services/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("Login", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("submits credentials, stores the token, and navigates to the dashboard", async () => {
    api.post.mockResolvedValue({ data: { token: "token-123" } });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "farmer@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "secret123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
    });

    expect(api.post).toHaveBeenCalledWith("/auth/login", {
      email: "farmer@example.com",
      password: "secret123",
    });
    expect(localStorage.getItem("token")).toBe("token-123");
  });

  it("redirects to the dashboard when a token already exists", async () => {
    localStorage.setItem("token", "stored-token");

    renderLogin();

    await waitFor(() => {
      expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
    });
  });
});
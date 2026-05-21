import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
const toastMock = vi.fn();
vi.mock("../components/ToastProvider", () => ({
  useToast: () => ({ toast: toastMock }),
}));

import AdvisoryPage from "./AdvisoryPage";

vi.mock("../services/api", () => ({
  default: { get: vi.fn() },
}));

import api from "../services/api";

describe("AdvisoryPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.URL.createObjectURL = () => "blob:url";
  });

  it("alerts when lat/lon missing", async () => {
    toastMock.mockClear();

    render(<AdvisoryPage />);

    fireEvent.click(screen.getByText("Generate Advisory"));

    expect(toastMock).toHaveBeenCalledWith("Please select a farm location", {
      type: "error",
    });
  });

  it("fetches and displays advisory for provided lat/lon", async () => {
    api.get.mockResolvedValue({
      data: {
        forecast: [
          {
            date: "2026-05-14",
            weather: {
              temperature: 30,
              humidity: 60,
              windSpeed: 3,
              rainProbability: 10,
            },
            advisory: ["Normal activity"],
          },
        ],
      },
    });

    render(<AdvisoryPage lat="18" lon="73" />);

    fireEvent.click(screen.getByText("Generate Advisory"));

    await waitFor(() => screen.getByText("Temperature: 30 °C"));

    expect(screen.getByText("Normal activity")).toBeInTheDocument();
    expect(screen.getByText("Export PDF")).toBeInTheDocument();
    expect(screen.getByText("Export CSV")).toBeInTheDocument();
  });
});

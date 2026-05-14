import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdvisoryPage from "./AdvisoryPage";

vi.mock("../services/api", () => ({
  default: { get: vi.fn() },
}));

import api from "../services/api";

describe("AdvisoryPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.URL.createObjectURL = () => "blob:url";
  });

  it("alerts when lat/lon missing", async () => {
    window.alert = vi.fn();

    render(<AdvisoryPage />);

    fireEvent.click(screen.getByText("Generate Advisory"));

    expect(window.alert).toHaveBeenCalledWith("Please select a farm location");
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

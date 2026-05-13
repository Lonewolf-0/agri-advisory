import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import api from "../services/api";
import Dashboard from "./Dashboard";

vi.mock("../services/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

vi.mock("../components/Navbar", () => ({
  default: () => <div>Navbar</div>,
}));

vi.mock("../components/CropSelector", () => ({
  default: () => <div>Crop Selector</div>,
}));

vi.mock("../components/LocationList", () => ({
  default: ({ onSelectLocation }) => (
    <button
      onClick={() => onSelectLocation({ latitude: 12.34, longitude: 56.78 })}
    >
      Select Saved Location
    </button>
  ),
}));

vi.mock("../components/WeatherMap", () => ({
  default: ({ setLat, setLon }) => (
    <button
      onClick={() => {
        setLat(18.52);
        setLon(73.86);
      }}
    >
      Pick Map Location
    </button>
  ),
}));

vi.mock("./AdvisoryPage", () => ({
  default: ({ lat, lon }) => (
    <div>
      Advisory Page {lat}:{lon}
    </div>
  ),
}));

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("saves the selected farm location and refreshes the saved list", async () => {
    api.post.mockResolvedValue({ data: { id: 1 } });
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<Dashboard />);

    fireEvent.click(screen.getByRole("button", { name: "Pick Map Location" }));
    fireEvent.click(screen.getByRole("button", { name: "Save Farm Location" }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/farm/location", {
        latitude: 18.52,
        longitude: 73.86,
      });
    });

    expect(alertSpy).toHaveBeenCalledWith("Farm location saved");
    alertSpy.mockRestore();
  });

  it("prompts the user when trying to save without a location", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<Dashboard />);

    fireEvent.click(screen.getByRole("button", { name: "Save Farm Location" }));

    expect(alertSpy).toHaveBeenCalledWith(
      "Please select a location on the map",
    );
    expect(api.post).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });

  it("loads the clicked saved location into the advisory view", () => {
    render(<Dashboard />);

    fireEvent.click(
      screen.getByRole("button", { name: "Select Saved Location" }),
    );

    expect(screen.getByText("Latitude: 12.34")).toBeInTheDocument();
    expect(screen.getByText("Longitude: 56.78")).toBeInTheDocument();
    expect(screen.getByText("Advisory Page 12.34:56.78")).toBeInTheDocument();
  });
});

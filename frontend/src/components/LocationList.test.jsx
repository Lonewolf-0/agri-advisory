import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LocationList from "./LocationList";

vi.mock("../services/api", () => ({
  default: { get: vi.fn() },
}));

import api from "../services/api";

describe("LocationList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders saved locations and calls onSelectLocation on click", async () => {
    const fakeLocs = [
      { id: 1, district: "Pune", state: "MH", latitude: 18, longitude: 73 },
    ];
    api.get.mockResolvedValue({ data: fakeLocs });

    const onSelect = vi.fn();

    render(<LocationList onSelectLocation={onSelect} reloadTrigger={0} />);

    await waitFor(() => screen.getByText(/Pune,\s*MH/));

    fireEvent.click(screen.getByText(/Pune,\s*MH/));

    expect(onSelect).toHaveBeenCalledWith(fakeLocs[0]);
  });
});

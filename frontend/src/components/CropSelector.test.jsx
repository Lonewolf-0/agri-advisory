import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CropSelector from "./CropSelector";

vi.mock("../services/api", () => ({
  default: { get: vi.fn(), post: vi.fn() },
}));

import api from "../services/api";

describe("CropSelector", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads crop list and renders options", async () => {
    api.get.mockResolvedValue({ data: [{ id: "1", name: "Wheat" }] });

    render(<CropSelector />);

    await waitFor(() => screen.getByText("Wheat"));

    expect(screen.getByText("Select Crop")).toBeInTheDocument();
    expect(screen.getByText("Wheat")).toBeInTheDocument();
  });

  it("posts selection when a crop is chosen", async () => {
    api.get.mockResolvedValue({ data: [{ id: "1", name: "Wheat" }] });
    api.post.mockResolvedValue({});

    render(<CropSelector />);

    await waitFor(() => screen.getByText("Wheat"));

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

    await waitFor(() =>
      expect(api.post).toHaveBeenCalledWith("/farm/select-crop", {
        cropId: "1",
      }),
    );
  });
});

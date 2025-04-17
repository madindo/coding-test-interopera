import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/index";

// Mock global fetch
global.fetch = jest.fn();

const mockUsers = {
  salesReps: [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Sales Lead",
      region: "East",
      skills: ["Negotiation", "CRM"],
      clients: [
        {
          name: "Acme Corp",
          industry: "Tech",
          contact: "alice@acme.com",
        },
      ],
      deals: [
        {
          client: "Acme Corp",
          value: 100000,
          status: "Closed Won",
        },
      ],
    },
  ],
};

describe("Home Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders fetched sales reps", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<Home />);

    // Wait for the name to appear after fetch
    await waitFor(() => {
      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    });

    expect(screen.getByText("Sales Lead")).toBeInTheDocument();
    expect(screen.getAllByText(/Acme Corp/i)).toHaveLength(2);
  });
});

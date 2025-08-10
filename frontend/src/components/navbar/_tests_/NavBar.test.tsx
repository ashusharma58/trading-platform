import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../NavBar";
import type { useAuth as useAuthType } from "../../../hooks/useAuth";

// Mock the hook
vi.mock("../../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../../../hooks/useAuth";
const mockedUseAuth = useAuth as unknown as vi.MockedFunction<typeof useAuthType>;

describe("NavBar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (ui: React.ReactNode) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it("renders login link when user is logged out", () => {
    mockedUseAuth.mockReturnValue({
      token: null,
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: false,
    });

    renderWithRouter(<NavBar />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it("renders logout button when user is logged in", () => {
    mockedUseAuth.mockReturnValue({
      token: "fake-token",
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: true,
    });

    renderWithRouter(<NavBar />);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it("calls logout when logout button is clicked", () => {
    const mockLogout = vi.fn();

    mockedUseAuth.mockReturnValue({
      token: "fake-token",
      login: vi.fn(),
      logout: mockLogout,
      isAuthenticated: true,
    });

    renderWithRouter(<NavBar />);
    fireEvent.click(screen.getByText(/logout/i));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});

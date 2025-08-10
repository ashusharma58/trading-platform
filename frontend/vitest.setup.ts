import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock ResizeObserver globally
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal("ResizeObserver", ResizeObserver);

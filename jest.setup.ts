// import "@testing-library/jest-dom/extend-expect";

import "@testing-library/jest-dom";

import "intersection-observer";

import { jest } from "@jest/globals";

// Mock the 'next' module
jest.mock("next", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
  })),
}));

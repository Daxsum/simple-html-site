import "@testing-library/jest-dom";

// Mock timers
jest.useFakeTimers();

// Add missing browser APIs
const mockSetImmediate = jest.fn((cb) => cb());
mockSetImmediate.__promisify__ = jest.fn();
global.setImmediate = mockSetImmediate as typeof global.setImmediate;

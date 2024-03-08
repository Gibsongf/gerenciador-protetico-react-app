import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { mockServiceData, testDentist } from "./utilsTest";

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
    vi.clearAllMocks(); // Reset mocks after each test
});

vi.mock("../components/ApiHooks", () => {
    return {
        useTodosApi: vi.fn((e) => {
            if (e) {
                return mockServiceData[e];
            }
        }),
        useDetailsApi: vi.fn((e, id) => {
            if (e) {
                if (e === "local" && id) {
                    const indx = Number(id.split("-")[1]);
                    return { data: mockServiceData[e][indx] };
                }
                return mockServiceData[e];
            }
        }),
    };
});
vi.mock("../Api", () => {
    return {
        APIPostNewData: vi.fn(() => {
            return {
                errors: "",
            };
        }),
        APIPutData: vi.fn(() => {
            return {
                errors: "",
                dentista: testDentist,
            };
        }),
        APIGetServiceBy: vi.fn(() => {
            return testDentist;
        }),
    };
});

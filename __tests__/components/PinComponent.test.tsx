import React from "react";
import { render, waitFor } from "@testing-library/react-native";

import PinComponent from "../../src/components/PinComponent";

jest.useFakeTimers();

describe("<PinComponent />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with mocked props", async () => {
    const testLatitude = 30.076674;
    const testLongitude = -135.198906;
    const connectors = [
      {
        type: "Type 2",
        status: "unavailable",
      },
    ];
    const mockedProps = {
      _id: "651d66beb1077d127bfc1baa",
      title: "Yang Ball",
      latitude: testLatitude,
      longitude: testLongitude,
      connectors: connectors,
    };
    const { getByText, queryAllByTestId } = render(<PinComponent {...mockedProps} />);
    await waitFor(() => {
      expect(getByText("Yang Ball")).toBeTruthy();
      expect(getByText("Get Directions")).toBeTruthy();
      const connectorRows = queryAllByTestId("connectors-row");
      expect(connectorRows.length).toBe(connectors.length);
    });
  });

  it("renders connector statuses correctly", async () => {
    const mockProps = {
      latitude: 0,
      longitude: 0,
      connectors: [
        { type: "Type1", status: "available" },
        { type: "Type2", status: "unavailable" },
      ],
    };
    const { getByText } = render(<PinComponent {...mockProps} />);
    await waitFor(() => {
      expect(getByText("available")).toBeTruthy();
      expect(getByText("unavailable")).toBeTruthy();
    });
  });
});

import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import CustomMarker from "../../src/components/CustomMarker";

jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  const MockMarker = (props) => {
    return <View {...props}>{props.children}</View>;
  };

  return {
    __esModule: true,
    Marker: MockMarker,
  };
});

describe("<CustomMarker />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockOnSelect = jest.fn();
  const mockProps = {
    latitude: 40.7128,
    longitude: -74.006,
    connectors: [
      { type: "Type1", status: "available" },
      { type: "Type2", status: "unavailable" },
    ],
    onSelect: mockOnSelect,
  };

  it("renders correctly", () => {
    const { getByText, getByTestId } = render(<CustomMarker {...mockProps} />);
    expect(getByTestId("custom-marker-test-id")).toBeTruthy();
    expect(getByText("1/2")).toBeTruthy();
  });

  it("calls onSelect when pressed", () => {
    const { getByTestId } = render(<CustomMarker {...mockProps} />);
    const marker = getByTestId("custom-marker-test-id");
    fireEvent.press(marker);
    expect(mockOnSelect).toHaveBeenCalled();
  });
});

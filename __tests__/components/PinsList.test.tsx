import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import PinsList from "../../src/components/PinsList";

jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    BottomSheetFlatList: ({ data, renderItem }) => (
      <View testID="bottom-sheet-flat-list">
        {data.map((item, index) => (
          <View key={index + item.title}>{renderItem({ item, index })}</View>
        ))}
      </View>
    ),
  };
});

describe("<PinsList />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockOnPinSelect = jest.fn();
  const mockList = [
    {
      _id: "651d66beb1077d127bfc1baa",
      title: "Yang Ball",
      latitude: 30.076674,
      longitude: -135.198906,
      connectors: [
        {
          type: "Type 2",
          status: "unavailable",
        },
      ],
    },
    {
      _id: "651d66be2ae8f213bc627123",
      title: "Jaime Mathis",
      latitude: -7.918222,
      longitude: 103.510368,
      connectors: [
        {
          type: "Type 2",
          status: "available",
        },
        {
          type: "Type 2",
          status: "unavailable",
        },
      ],
    },
    {
      _id: "651d66be105807360df39c54",
      title: "Kara Duran",
      latitude: -1.67174,
      longitude: 60.798798,
      connectors: [
        {
          type: "Type 3",
          status: "available",
        },
        {
          type: "J1772",
          status: "available",
        },
      ],
    },
    {
      _id: "651d66bea2928f8ecd03e278",
      title: "Rosario Tillman",
      latitude: 12.738675,
      longitude: 173.373323,
      connectors: [
        {
          type: "Type 3",
          status: "available",
        },
      ],
    },
  ];

  it("renders the list of pins correctly", () => {
    const { getByText } = render(<PinsList list={mockList} onPinSelect={() => {}} />);
    mockList.forEach(async (item) => {
      const pinTitle = getByText(item.title);
      await waitFor(() => {
        expect(pinTitle).toBeTruthy();
      });
    });
  });

  it("calls onPinSelect when a pin is pressed", async () => {
    const { getByText } = render(<PinsList list={mockList} onPinSelect={mockOnPinSelect} />);
    const pinTitle = getByText("Yang Ball");
    fireEvent.press(pinTitle);
    await waitFor(() => {
      expect(mockOnPinSelect).toHaveBeenCalledWith(mockList[0]);
    });
  });
});

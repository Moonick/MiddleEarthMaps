import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FindMeButton from "../../src/components/FindMeButton";

describe("<FindMeButton /> Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockOnFindMePress = jest.fn();

  it("renders correctly", () => {
    const { getByTestId } = render(<FindMeButton animatedPosition={{ value: 0 }} onFindMePress={mockOnFindMePress} />);
    const findMeButton = getByTestId("button-wrapper-test-id");
    expect(findMeButton).toBeDefined();
  });

  it("calls onFindMePress when the button is pressed", () => {
    const { getByTestId } = render(<FindMeButton animatedPosition={{ value: 0 }} onFindMePress={mockOnFindMePress} />);
    const findMeButton = getByTestId("button-test-id");

    fireEvent.press(findMeButton);
    expect(mockOnFindMePress).toHaveBeenCalled();
  });

  it("applies the correct animated style based on animatedPosition", () => {
    const { getByTestId } = render(
      <FindMeButton animatedPosition={{ value: 300 }} onFindMePress={mockOnFindMePress} />,
    );
    const findMeButton = getByTestId("button-wrapper-test-id");
    const expectedTranslateY = -492;
    const styleTransform = findMeButton.props.style.transform;
    const translateY = styleTransform[0].translateY;
    expect(translateY).toBe(expectedTranslateY);
  });
});

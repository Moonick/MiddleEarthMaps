import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";

import PinHeader from "../../src/components/PinHeader";

describe("<PinHeader />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("has 2 children", () => {
    const tree = renderer
      .create(
        <PinHeader title="Hello" availableConnectors={0} connectors={2} pinAddress="Bostan, MA" addressErrorMsg="" />,
      )
      .toJSON();
    expect(tree.length).toBe(2);
  });

  it("renders correctly with mocked props", () => {
    const { getByText } = render(
      <PinHeader title="Hello" availableConnectors={0} connectors={2} pinAddress="Bostan, MA" addressErrorMsg="" />,
    );
    expect(getByText("Hello")).toBeTruthy();
    expect(getByText("Bostan, MA")).toBeTruthy();
    expect(getByText("0")).toBeTruthy();
  });
});

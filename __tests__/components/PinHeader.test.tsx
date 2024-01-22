import React from 'react';
import renderer from 'react-test-renderer';

import PinHeader from '../../src/components/PinHeader';

describe('<PinHeader />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<PinHeader />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});

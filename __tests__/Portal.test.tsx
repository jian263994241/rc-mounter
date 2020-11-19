import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Portal } from '../src';

describe('Portal', () => {
  it('default props', () => {
    function A() {
      return (
        <Portal>
          <div>123123</div>
        </Portal>
      );
    }

    const { debug } = render(<A />);

    debug();
  });

  it('disabled props', () => {
    function A() {
      return (
        <Portal disabled>
          <div>123123</div>
        </Portal>
      );
    }

    const { debug } = render(<A />);

    debug();
  });
});

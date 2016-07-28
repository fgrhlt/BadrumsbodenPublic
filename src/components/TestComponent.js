'use strict';

import React from 'react';

require('styles//Test.sass');

class TestComponent extends React.Component {
  render() {
    return (
      <div className="test-component">
        Please edit src/components///TestComponent.js to update this component!
        Hej hej det är simpa
      </div>
    );
  }
}

TestComponent.displayName = 'TestComponent';

// Uncomment properties you need
// TestComponent.propTypes = {};
// TestComponent.defaultProps = {};

export default TestComponent;

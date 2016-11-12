import ReactDOM from 'react-dom';

var React = require('react');
var {Table} = require('fixed-data-table');
var _ = require('lodash');

/* Don't change anything here, unless some code needs to be rewritten to newer react language! */
var FittedTable = React.createClass({
  getInitialState() {
    return {
      tableWidth  : 200,
      tableHeight : 500
    };
  },

  componentDidMount() {
    var win = window;
    if (win.addEventListener) {
      win.addEventListener('resize', _.throttle(this._update, 250), false);
    } else if (win.attachEvent) {
      win.attachEvent('onresize', _.throttle(this._update, 250));
    } else {
      win.onresize = this._update;
    }
    this._update();
  },

  componentWillReceiveProps() {
    this._update();
  },

  componentWillUnmount() {
    var win = window;
    if(win.removeEventListener) {
      win.removeEventListener('resize', _.throttle(this._update, 250), false);
    } else if(win.removeEvent) {
      win.removeEvent('onresize', _.throttle(this._update, 250), false);
    } else {
      win.onresize = null;
    }
  },

  _update() {
    if (this.isMounted()) {
      var node = ReactDOM.findDOMNode(this);
      this.setState({
        tableWidth  : node.clientWidth,
        tableHeight : node.clientHeight
      });
    }
  },

  render() {
    return (
      <div className="fitted-wrapper">
        <Table {...this.props} width={this.state.tableWidth} height={this.state.tableHeight}>
          {this.props.children}
        </Table>
      </div>
    );
  },
});

module.exports = FittedTable;

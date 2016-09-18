
var PublishableKeyField = React.createClass({
  handleChange: function (event) {
    this.props.onChange(event);
  },
  render: function () {
    var valid = (this.props.value || "").match(/pk_test.*/);

    return <div className={valid ? "ok" : "err"}>
      <label for="publishableKey">Publishable Key</label>
      <input type="text" id="publishableKey" onChange={this.handleChange} value={this.props.value} />
    </div>;
  },
});

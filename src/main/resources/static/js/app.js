var Account = React.createClass({
  getInitialState: function(){
    return {display: true};
  },
  handleDelete() {
    var self = this;
    $.ajax({
      url: self.props.account._links.self.href,
      type: 'DELETE',
      success: function(result) {
        self.setState({display: false});
      },
      error: function(xhr, ajaxOptions, thrownError) {
        toastr.error(xhr.responseJSON.message);
      }
    });
  },
  render: function() {
    if(this.state.display==false) return null;
    else return (
      <tr>
        <td>{this.props.account.accountId}</td>
        <td>{this.props.account.accountLogin}</td>
        <td>{this.props.account.accountPassword}</td>
        <td>{this.props.account.accountCreationdate}</td>
        <td>
            <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>);
  }
});
var AccountTable = React.createClass({
  render: function() {
    var rows = [];
    this.props.accounts.forEach(function(account_arg) {
      rows.push(<Account account={account_arg}></Account>);
    });
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>accountId</th><th>accountLogin</th><th>accountPassword</th><th>accountCreationdate</th><th>Delete</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>);
  }
});
var ACCOUNTS = [
  {accountLogin: "user", accountPassword: "user", accountCreationdate: null}
];

var App = React.createClass({

  loadAccountsFromServer: function () {
    var self = this;
    $.ajax({
      url: "http://localhost:8080/api/accounts"
    }).then(function (data) {
      self.setState({accounts: data._embedded.accounts});
    });
  },

  getInitialState: function () {
    return {accounts: []};
  },

  componentDidMount: function () {
    this.loadAccountsFromServer();
  },

  render() {
    return ( <AccountTable accounts={this.state.accounts}/> );
  }
});
ReactDOM.render(
  <App />,
  document.getElementById('react')
);

// Table Data
var TableData = React.createClass({
  render: function() {
    return (
      <p> {this.props.data} < /p>
    );
  }
});

// Table Element
var TableTitle = React.createClass({
  render: function() {
    return (
      <div>
        <h2> {this.props.title}</h2>
      </div>
    );
  }
});

var SearchMatch = React.createClass({
  render: function() {
    return (
      <div>
        <p> Match: {this.props.match}</p>
      </div>
    );
  }
});

// Table
var Table = React.createClass({

  render: function() {

    // We need to get each row and store it in an array
    var rowsTitle = [];
    var search = [];
    var searchterm = this.props.searchTerm; // need this or it doesnt work
    var key = '';
    this.props.data.forEach(function(row) {
      if (row.title.toLowerCase().indexOf(searchterm.toLowerCase()) === -1 &&
          row.tags.toLowerCase().indexOf(searchterm.toLowerCase()) === -1
         )
        return;

      // need to grab the correct match
      if (row.title.toLowerCase().indexOf(searchterm.toLowerCase()) === -1) {
        var m = row.tags.toLowerCase().split(' ');
        for (var i in m)
         if (m[i].indexOf(searchterm.toLowerCase()) !== -1)
            key = m[i];
      } else {
        key = row.title.toLowerCase();
      }



      rowsTitle.push( <TableTitle title = {row.title} />);
      if (searchterm != '')
        rowsTitle.push( <SearchMatch match ={key} />);
      rowsTitle.push( <TableData data = {row.content} />);


    });

    // Then render all. Render using childs. Send them prop.title and prop.data
    return (
      <div>
        {rowsTitle}
      </div>
    );
  }
  });

// Search
var Search = React.createClass({

filterList: function(event) {
  this.props.userInput(event.target.value);
},

render: function() {
  return (
    <input type="text" placeholder="Start Typing" value = {this.props.searchTerm} onChange = {this.filterList} autoFocus>
    </input>
  );
}
});

// App
var App = React.createClass({

  getInitialState: function() {
    return {
      filterText: '',
      filterText2: ''
    };
  },

  handleUserInput: function(filter) {
    this.setState({
      filterText: filter
    });
  },

  render: function() {

    return (
      <div>
          <Search searchTerm = {this.state.filterText} userInput = {this.handleUserInput} />
          <Table searchTerm = {this.state.filterText} data = {this.props.data} />
      </div>
    );
}
});

// JSON
var DATA = [{
  "title": "Binding",
  "tags": "Binding Hiding Miding Sliding SAVE",
  "content": "This is the binding content area where information about binding is shown"
}, {
  "title": "Constant",
  "tags": "Math bath slather calf save",
  "content": "This is the Constant content area where information about Constant is shown"
}, {
  "title": "Numbers",
  "tags": "Happy birthday sir and maam",
  "content": "This is the Numbers content area where information about Numbers is shown"
}];

var Tvg = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.tvg.tvgLegalname}</td>
        <td>{this.props.tvg.tvgCountry}</td>
        <td>{this.props.tvg.tvgCity}</td>
      </tr>
    );
  }
});
var TvgTable = React.createClass({
  render: function() {
    var rows = [];
    var i = 0;
    var countries = 0;
    var cities = 0;
    this.props.tvgs.forEach(function(tvg) {
      rows.push(<Tvg tvg={tvg} />);
      i++;
    });
    return (
      <button type="button" className="btn btn-link" data-placement="buttom">
        {i}
      </button>
    );
  }
});
var TvgApp = React.createClass({
  loadTvgsFromServer: function () {
    var self = this;
    $.ajax({
      url: "http://localhost:8080/api/tvgs"
    }).then(function (data) {
      self.setState({tvgs: data._embedded.tvgs});
    });
  },

  getInitialState: function () {
    return {tvgs: []};
  },

  componentDidMount: function () {
    this.loadTvgsFromServer();
  },

  render() {
    return ( <TvgTable tvgs={this.state.tvgs}/> );
  }
});
class SearchModal extends React.Component {
  render() {
    return (
      <div className="search modal fade" id="searchModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <App data = {DATA} />
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm fixed-top">
        <a className="navbar-brand" href="#">
          <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="LOGO" />
        </a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#" data-toggle="modal" data-target="#searchModal"><i className="material-icons">search</i></a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#"><i className="material-icons">perm_identity</i></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><i className="material-icons">sort</i></a>
          </li>
        </ul>
      </nav>
    );
  }
}
class LeftFirstSection extends React.Component {
  render() {
    return (
      <div className="Aligner-item">
        <h1>MOTORIST</h1>
      </div>
    );
  }
}
class RightFirstSection extends React.Component {
  render() {
    return (
      <div className="jumbotron rightfirstsection Aligner">
        <h1 className="Aligner-item">TVG</h1>
        <ul className="nav flex-column statisticsnumbers">
          <li className="nav-item">
            <TvgApp />
          </li>
          <li className="nav-item">
            <button type="button" className="btn btn-link" data-placement="buttom">
              XX
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="btn btn-link" data-placement="buttom">
              XX
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
class FirstSection extends React.Component {
  render() {
    return (
      <section className="firstsection row">
        <div className="col leftfirstsection Aligner">
          <div className="linetop"></div>
          <div className="linebottom"></div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#"><i className="ion-social-instagram"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><i className="ion-social-facebook"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><i className="ion-social-snapchat"></i></a>
            </li>
          </ul>
          <LeftFirstSection />
          <p className="contactinfo">{this.props.contactinfo}</p>
        </div>
        <div className="col">
          <RightFirstSection />
        </div>
        <SearchModal />
      </section>
    );
  }
}
class SecondSection extends React.Component {
  render() {
    return (
      <section className="secondsection row">
        <div className="col">Left Side</div>
        <div className="col">Right Side</div>
      </section>
    );
  }
}
class ThirdSection extends React.Component {
  render() {
    return (
      <section className="thirdsection row">
        <div className="col">Left Side</div>
        <div className="col">Right Side</div>
      </section>
    );
  }
}
class Footer extends React.Component {
  render() {
    return (
      <section className="footer row">
        <div className="col">Left Side</div>
        <div className="col">Right Side</div>
      </section>
    );
  }
}
class ContainerFluid extends React.Component{
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <FirstSection contactinfo={["(212) 6 54 52 84 92 | Marjane 1, 2", <sup>ème</sup>,  " tranche n°51, Meknès Maroc."]} />
        <SecondSection />
        <ThirdSection />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(
  <ContainerFluid />,
  document.getElementById('react')
);

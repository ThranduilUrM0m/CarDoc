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
    "title": "Centers",
    "tags": "Binding Hiding Miding Sliding SAVE",
    "content": "This is the binding content area where information about binding is shown"
  }, {
    "title": "Vehicles",
    "tags": "Math bath slather calf save",
    "content": "This is the Constant content area where information about Constant is shown"
  }, {
    "title": "",
    "tags": "Happy birthday sir and maam",
    "content": "This is the Numbers content area where information about Numbers is shown"
}];

var Motorist = React.createClass({
  getInitialState: function () {
    return {
      motoristAccount: [],
      motoristPicture: [],
      motoristVehicles: [],
      motoristBookings: [],
      motoristControls: 0
    };
  },
  loadDataFromServer: function () {
    fetch(_.values(this.props.motoristCarousel._links.vehicle), {
      headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then((response) => response.json()) 
    .then((responseData) => {
      this.setState({motoristVehicles: _.size(responseData._embedded.vehicles)});
    });

    fetch(_.values(this.props.motoristCarousel._links.account), {
      headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then((response) => response.json()) 
    .then((responseData) => {
      this.setState({motoristAccount: responseData});
      
      fetch(_.values(responseData._links.booking), {
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        credentials: 'same-origin'
      })
      .then((response) => response.json()) 
      .then((responseDataB) => {
        this.setState({motoristBookings: _.size(_.where(responseDataB._embedded.bookings, {bookingIsCanceled: false}))});
        for (var i = 0; i < responseDataB._embedded.bookings.length; i++) {
          var current = responseDataB._embedded.bookings[i];
          
          fetch(_.values(responseDataB._embedded.bookings[i]._links.control), {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            credentials: 'same-origin'
          })
          .then((response) => response.json()) 
          .then((responseDataC) => {
            if(responseDataC.controlConfirmed == true){
              this.setState({motoristControls: this.state.motoristControls + 1});
            }
          });

        }
      });

      fetch(_.values(responseData._links.picture), {
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        credentials: 'same-origin'
      })
      .then((response) => response.json()) 
      .then((responseDataP) => {
        var max = null;
        var min = null;
        for (var i = 0; i < responseDataP._embedded.pictures.length; i++) {
          var current = responseDataP._embedded.pictures[i];
          if (max === null || current.insertDate > max.insertDate) {
            max = current;
          }
          if (min === null || current.insertDate < min.insertDate) {
            min = current;
          }
        }
        this.setState({motoristPicture: max});
      });
    });

  },
  componentDidMount: function () {
    this.loadDataFromServer();
  },

  render: function() {
    var active = this.props.active === true ? 'active' : '' ;
    var picture = 'def.png'
    if(this.state.tvgPicture != '' && this.state.tvgPicture != null)
      picture = this.state.tvgPicture.pictureName+'.'+this.state.tvgPicture.pictureExtension;
    return (
      <div className={"carousel-item "+active}>
        <div className="card">
          <div className="card-body">
            <img className="img-thumbnail rounded-circle" src={'../media/'+picture} alt="Card image cap"/>
            <h4 className="card-title text-center">{this.props.motoristCarousel.ipersonLastname+' '+this.props.motoristCarousel.ipersonFirstname}</h4>
            <p className="card-text text-center">{this.props.motoristCarousel.ipersonCity}</p>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="text-center"><span>{this.state.motoristVehicles}</span><br/><span>Vehicles</span></td>
                  <td className="text-center"><span>{this.state.motoristBookings}</span><br/><span>Bookings</span></td>
                  <td className="text-center"><span>{this.state.motoristControls}</span><br/><span>Controls</span></td>
                </tr>
              </tbody>
            </table>
            <div className="lastdivider dropdown-divider"></div>
            <ul className="nav socialmediamotorist justify-content-center">
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fa fa-snapchat-square" aria-hidden="true"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});
var MotoristCarousel = React.createClass({
  render: function() {
    var rows = [];
    var active = true;
    this.props.motoristsCarousels.forEach(function(motoristCarousel) {
      rows.push(<Motorist motoristCarousel={motoristCarousel} active={active} />);
      if(active == true){
        active = false
      }
    });
    return (
      <div className="carousel-inner">
        {rows}
      </div>
    );
  }
});
var MotoristCarouselApp = React.createClass({

  loadMotoristsFromServer: function () {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   credentials: 'same-origin' };
    fetch('/api/motorists', myInit)
    .then((response) => response.json()) 
    .then((responseData) => { 
      this.setState({motoristsCarousels: responseData._embedded.motorists});
    });
  },

  getInitialState: function () {
    return {motoristsCarousels: []};
  },

  componentDidMount: function () {
    this.loadMotoristsFromServer();
  },

  render() {
    return ( <MotoristCarousel motoristsCarousels={this.state.motoristsCarousels}/> );
  }
});

var Tvg = React.createClass({
  getInitialState: function () {
    return {
      tvgAccount: [],
      tvgPicture: [],
      tvgEmployees: [],
      tvgBookings: [],
      tvgControls: []
    };
  },
  loadDataFromServer: function () {
    fetch(_.values(this.props.tvgCarousel._links.account), {
      headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then((response) => response.json()) 
    .then((responseData) => {
      fetch(_.values(responseData._links.booking), {
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        credentials: 'same-origin'
      })
      .then((responseS) => responseS.json()) 
      .then((responseDataS) => { 
        this.setState({tvgBookings: _.size(responseDataS._embedded.bookings)});
      });
    });

    fetch(_.values(this.props.tvgCarousel._links.control), {
      headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then((response) => response.json()) 
    .then((responseData) => {
      this.setState({tvgControls: _.size(responseData._embedded.controls)});
    });

    fetch(_.values(this.props.tvgCarousel._links.employee), {
      headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then((response) => response.json()) 
    .then((responseData) => {
      this.setState({tvgEmployees: _.size(responseData._embedded.employees)});
    });

    fetch(_.values(this.props.tvgCarousel._links.account), {
      headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then((response) => response.json()) 
    .then((responseData) => {
      this.setState({tvgAccount: responseData});
      fetch(_.values(responseData._links.picture), {
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        credentials: 'same-origin'
      })
      .then((responseP) => response.json()) 
      .then((responseDataP) => {
        var max = null;
        var min = null;
        for (var i = 0; i < responseDataP._embedded.pictures.length; i++) {
          var current = responseDataP._embedded.pictures[i];
          if (max === null || current.insertDate > max.insertDate) {
            max = current;
          }
          if (min === null || current.insertDate < min.insertDate) {
            min = current;
          }
        }
        this.setState({tvgPicture: max});
      });
    });

  },
  componentDidMount: function () {
    this.loadDataFromServer();
  },

  render: function() {
    var active = this.props.active === true ? 'active' : '' ;
    var picture = 'def.png'
    if(this.state.tvgPicture != '' && this.state.tvgPicture != null)
      picture = this.state.tvgPicture.pictureName+'.'+this.state.tvgPicture.pictureExtension;
    return (
      <div className={"carousel-item "+active}>
        <div className="card">
          <div className="card-body">
            <img className="img-thumbnail rounded-circle" src={'../media/'+picture} alt="Card image cap"/>
            <h4 className="card-title text-center">{this.props.tvgCarousel.tvgLegalname}</h4>
            <p className="card-text text-center">{this.props.tvgCarousel.tvgLegaladresse}</p>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="text-center"><span>{this.state.tvgEmployees}</span><br/><span>Employees</span></td>
                  <td className="text-center"><span>{this.state.tvgBookings}</span><br/><span>Bookings</span></td>
                  <td className="text-center"><span>{this.state.tvgControls}</span><br/><span>Controls</span></td>
                </tr>
              </tbody>
            </table>
            <div className="lastdivider dropdown-divider"></div>
            <ul className="nav socialmediatvg justify-content-center">
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fa fa-snapchat-square" aria-hidden="true"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});
var TvgCarousel = React.createClass({
  render: function() {
    var rows = [];
    var active = true;
    this.props.tvgsCarousels.forEach(function(tvgCarousel) {
      rows.push(<Tvg tvgCarousel={tvgCarousel} active={active} />);
      if(active == true){
        active = false
      }
    });
    return (
      <div className="carousel-inner">
        {rows}
      </div>
    );
  }
});
var TvgCarouselApp = React.createClass({

  loadTvgsFromServer: function () {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   credentials: 'same-origin' };
    fetch('/api/tvgs', myInit)
    .then((response) => response.json()) 
    .then((responseData) => {
      this.setState({tvgsCarousels: responseData._embedded.tvgs});
    });

  },

  getInitialState: function () {
    return {tvgsCarousels: []};
  },

  componentDidMount: function () {
    this.loadTvgsFromServer();
  },

  render() {
    return ( <TvgCarousel tvgsCarousels={this.state.tvgsCarousels}/> );
  }
});

var TvgTable = React.createClass({
  render: function() {
    var tvgCounter = _.size(this.props.tvgs);
    var countriesCounter = _.size(_.countBy(this.props.tvgs, function(tvg) { return tvg.tvgCountry; }));
    var citiesCounter = _.size(_.countBy(this.props.tvgs, function(tvg) { return tvg.tvgCity; }));
    return (
      <ul className="nav flex-column statisticsnumbers">
        <li className="nav-item">
          <button type="button" className="btn btn-link" data-placement="buttom">
            {tvgCounter}
          </button>
        </li>
        <li className="nav-item">
          <button type="button" className="btn btn-link" data-placement="buttom">
            {countriesCounter}
          </button>
        </li>
        <li className="nav-item">
          <button type="button" className="btn btn-link" data-placement="buttom">
            {citiesCounter}
          </button>
        </li>
      </ul>
    );
  }
});
var TvgApp = React.createClass({
  loadTvgsFromServer: function () {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   credentials: 'same-origin' };
    fetch('/api/tvgs', myInit)
    .then((response) => response.json()) 
    .then((responseData) => {
      this.setState({tvgs: responseData._embedded.tvgs});
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
class ContactUsModalLauncher extends React.Component {
  render() {
    return (
      <button type="button" data-toggle="modal" data-target="#contactusModal" className="btn btn-secondary contactusmodallauncher"><i className="ion-chatboxes"></i></button>
    );
  }
}
class ContactUsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'signupas'};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    return (
      <div className="contactus modal fade" id="contactusModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body row">
              <div className="col">
                <div className="container">
                  <div className="card container">
                    <div className="card-body">
                      <h4 className="card-title">Stay Connected<i className="ion-email"></i></h4>
                      <p className="card-text">Suggestions and Complaints are Welcome</p>
                      <form>
                        <div className="form-group">
                          <input type="email" className="form-control" id="exampleInputEmailContact1" aria-describedby="loginHelp" placeholder="Login"/>
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" id="exampleInputNameContact1" placeholder="Your Name"/>
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" id="exampleInputPhoneContact1" placeholder="Your Phone"/>
                        </div>
                        <div className="form-group">
                          <textarea className="form-control" id="exampleFormControlMessageContact1" placeholder="Message" rows="5"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary"><i className="ion-paper-airplane"></i></button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      username: '',
      passwordnew: '',
      password: '',
      signupas: '',
      formErrors: {login: '', passwordnew: '', signupas: ''},
      formErrorsL: {username: '', password: ''},
      repeatedLogin: [],
      loginValid: false,
      usernameValid: false,
      passwordnewValid: false,
      passwordValid: false,
      signupasValid: false,
      formValid: false,
      formLValid: false
    };
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let loginValid = this.state.loginValid;
    let passwordnewValid = this.state.passwordnewValid;
    let signupasValid = this.state.signupasValid;

    switch(fieldName) {
      case 'login':
        loginValid = value.length >= 6 && value != this.state.passwordnew && this.state.repeatedLogin === undefined;
        if(this.state.repeatedLogin != undefined){
          fieldValidationErrors.login = 'Login already exists';
        }
        else {
          fieldValidationErrors.login = loginValid ? '' : ' is invalid';
        }
        break;
      case 'passwordnew':
        passwordnewValid = value.length >= 6 && value != this.state.login;
        fieldValidationErrors.passwordnew = passwordnewValid ? '' : ' is too short';
        break;
      case 'signupas':
        signupasValid = value === 'motorist' || value === 'tvg';
        fieldValidationErrors.signupas = signupasValid ? '' : ' is invalid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    loginValid: loginValid,
                    passwordnewValid: passwordnewValid,
                    signupasValid: signupasValid
                  }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.loginValid && this.state.passwordnewValid && this.state.signupasValid});
  }
  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   credentials: 'same-origin' };
    fetch('/api/accounts', myInit)
    .then((response) => response.json()) 
    .then((responseData) => {
      this.setState({repeatedLogin: _.findWhere(responseData._embedded.accounts, {accountLogin: value})});
      this.setState({[name]: value}, () => { this.validateField(name, value) });
    });
  }
  validateFieldL(fieldName, value) {
    let fieldLValidationErrors = this.state.formErrorsL;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'username':
        usernameValid = value.length >= 6;
        fieldLValidationErrors.username = usernameValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldLValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrorsL: fieldLValidationErrors,
                    usernameValid: usernameValid,
                    passwordValid: passwordValid
                  }, this.validateFormL);
  }
  validateFormL() {
    this.setState({formLValid: this.state.usernameValid && this.state.passwordValid});
  }
  handleUserInputL(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => { this.validateFieldL(name, value) });
  }
  errorClass(error) {
   return(error.length === 0 ? '' : 'has-error');
  }
  render() {
    return (
      <div className="login modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body row">
              <div className="col">
                <div className="container">
                  <div className="card container">
                    <div className="card-body">
                      <h4 className="card-title">Login to your profile<i className="ion-log-in"></i></h4>
                      <p className="card-text">Enter username and password to log in</p>
                      <form name="f" action="/index" method="post">

                        <div className={`form-group ${this.errorClass(this.state.formErrorsL.username)}`}>
                          <input value={this.state.username} onChange={(event) => this.handleUserInputL(event)} type="text" className="form-control" id="exampleInputLogin2" aria-describedby="usernameHelp" placeholder="Login" name="username" required/>
                          <div className="invalid-feedback">
                            Please provide a valid login.
                          </div>
                          <small id="usernameHelp" className="form-text text-muted"></small>
                        </div>

                        <div className={`form-group ${this.errorClass(this.state.formErrorsL.password)}`}>
                          <input value={this.state.password} onChange={(event) => this.handleUserInputL(event)} type="password" className="form-control" id="exampleInputPassword2" aria-describedby="passwordHelp" placeholder="Password" name="password" required/>
                          <div className="invalid-feedback">
                            A password has to have more than 6 characters.
                          </div>
                          <small id="passwordHelp" className="form-text text-muted"></small>
                        </div>

                        <div className="form-check">
                          <label className="form-check-label">
                            <input type="checkbox" className="switch_checkbox"/>
                            <span className="switch"></span>
                            <span className="toggle"></span>
                            <span className="label">Remember Me</span>
                          </label>
                        </div>

                        <button type="submit" className="btn btn-outline-primary" disabled={!this.state.formLValid}>Login</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="container">
                  <div className="card container">
                    <div className="card-body">
                      <h4 className="card-title">Join the community<i className="ion-compose"></i></h4>
                      <p className="card-text">fill in the form below to get instant access</p>
                      <form action="signup" method="post">

                        <div className={`form-group has-tooltip ${this.errorClass(this.state.formErrors.login)}`}>
                          <span className={`tooltip tooltip-${this.state.formErrors.login}`}><span>{this.state.formErrors.login}</span></span>
                          <input value={this.state.login} onChange={(event) => this.handleUserInput(event)} type="text" className="form-control" id="exampleInputLogin1" aria-describedby="loginHelp" placeholder="Login" name="login" required/>
                          <div className="invalid-feedback">
                            Please provide a valid login.
                          </div>
                          <small id="loginHelp" className="form-text text-muted">Must contain more than 6 characters long.</small>
                        </div>

                        <div className={`form-group ${this.errorClass(this.state.formErrors.passwordnew)}`}>
                          <input value={this.state.passwordnew} onChange={(event) => this.handleUserInput(event)} type="passwordnew" className="form-control" id="exampleInputpasswordnew1" aria-describedby="passwordnewHelp" placeholder="Password" name="passwordnew" required/>
                          <div className="invalid-feedback">
                            A password has to have more than 6 characters.
                          </div>
                          <small id="passwordnewHelp" className="form-text text-muted">Must be 6-20 characters long.</small>
                        </div>

                        <div className={`form-group ${this.errorClass(this.state.formErrors.signupas)}`}>
                          <select value={this.state.signupas} onChange={(event) => this.handleUserInput(event)} className="form-control" id="exampleFormControlSelect1" aria-describedby="signupasHelp" name="signupas" required>
                            <option value="default">Sign up as</option>
                            <option value="motorist">Motorist</option>
                            <option value="tvg">Tvg</option>
                          </select>
                          <div className="invalid-feedback">
                            Please choose your type of account.
                          </div>
                          <small id="signupasHelp" className="form-text text-muted"></small>
                        </div>

                        <button type="submit" className="btn btn-outline-primary" disabled={!this.state.formValid}>Register</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    );
  }
}
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
class MotoristPSModal extends React.Component {
  render() {
    return (
      <div className="motoristps modal fade" id="motoristPSModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body row">
              <div className="col">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="card-face active Aligner">
                      <h1 className="card-title">STORIES</h1>
                    </div>
                    <div className="card-face">
                      <h4 className="card-title">FACE 2</h4>
                      <p className="card-text">Content</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="card-face active Aligner">
                      <h1 className="card-title">PLAN</h1>
                    </div>
                    <div className="card-face">
                      <div className="row example-centered">
                        <div className="col-12">
                          <ul className="timeline timeline-centered">
                              <li className="timeline-item">
                                  <div className="timeline-info">
                                    <button className="btn">
                                       Register
                                    </button>
                                    <span className="badge badge-pill badge-light">1</span>
                                  </div>
                                  <div className="timeline-marker"></div>
                                  <div className="timeline-content">
                                      <h3 className="timeline-title">Registration</h3>
                                      <p>First step is to join the community, describing every imposrtant aspect of your car,
                                      with information which would help provide suggestions of the nearest centers to your location and fastest to access and get things done quickly.</p>
                                  </div>
                              </li>
                              <li className="timeline-item">
                                  <div className="timeline-info">
                                    <button className="btn">
                                      Profile
                                    </button>
                                    <span className="badge badge-pill badge-light">2</span>
                                  </div>
                                  <div className="timeline-marker"></div>
                                  <div className="timeline-content">
                                      <h3 className="timeline-title">Building</h3>
                                      <p>Build your profile, including crucial information, location, car specs and registration,
                                      and have your messagerie and history apps initialized for you.</p>
                                  </div>
                              </li>
                              <li className="timeline-item period">
                                  <div className="timeline-info"></div>
                                  <div className="timeline-marker"></div>
                                  <div className="timeline-content">
                                      <h2 className="timeline-title">Get things Done</h2>
                                  </div>
                              </li>
                              <li className="timeline-item">
                                  <div className="timeline-info">
                                    <button className="btn">
                                      <span className="badge badge-pill badge-light">3</span> Centers
                                    </button>
                                  </div>
                                  <div className="timeline-marker"></div>
                                  <div className="timeline-content">
                                      <h3 className="timeline-title">Control</h3>
                                      <p>Choose the perfect center for your car and book from your home or work place, and follow the process before, as you are at the chosen center, and after your booking date.
                                      get your results and drive safely and without stress. </p>
                                  </div>
                              </li>
                              <li className="timeline-item">
                                  <div className="timeline-info">
                                    <button className="btn">
                                      Evolve
                                    </button>
                                    <span className="badge badge-pill badge-light">4</span>
                                  </div>
                                  <div className="timeline-marker"></div>
                                  <div className="timeline-content">
                                      <h3 className="timeline-title">Rejoice</h3>
                                      <p>Use data accumulated from your controls to follow on the safety of your car, and keep track of your results  .</p>
                                  </div>
                              </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class TvgPSModal extends React.Component {
  render() {
    return (
      <div className="tvgps modal fade" id="tvgPSModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body row">
              <div className="col">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="card-face active Aligner">
                      <h1 className="card-title">PLAN</h1>
                    </div>
                    <div className="card-face">
                      <div className="row example-centered">
                        <div className="col-12">
                            <ul className="timeline timeline-centered">
                                <li className="timeline-item">
                                    <div className="timeline-info">
                                      <span className="badge badge-pill badge-light">1</span>
                                      <button className="btn">
                                        Register
                                      </button>
                                    </div>
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <h3 className="timeline-title">Registration</h3>
                                        <p>First step is to join the community, describing every important aspect of your center to that community,
                                        with information which would lead car owners towards your profile, and eventually book at your center.</p>
                                    </div>
                                </li>
                                <li className="timeline-item">
                                    <div className="timeline-info">
                                      <span className="badge badge-pill badge-light">2</span>
                                      <button className="btn">
                                        Profile
                                      </button>
                                    </div>
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <h3 className="timeline-title">Building</h3>
                                        <p>Build your profile, including crucial information, location, opening periods and availability,
                                        and have your messagerie and statistics apps initialized for you.</p>
                                    </div>
                                </li>
                                <li className="timeline-item period">
                                    <div className="timeline-info"></div>
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <h2 className="timeline-title">Start Working</h2>
                                    </div>
                                </li>
                                <li className="timeline-item">
                                    <div className="timeline-info">
                                      <span className="badge badge-pill badge-light">3</span>
                                      <button className="btn">
                                        Calendar
                                      </button>
                                    </div>
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <h3 className="timeline-title">Control</h3>
                                        <p>Start the validation process by picking up pending processes from your real time calendar, which will be
                                        automatically filled with car owners bookings from all arround, process their cars and fill in results. </p>
                                    </div>
                                </li>
                                <li className="timeline-item">
                                    <div className="timeline-info">
                                      <span className="badge badge-pill badge-light">4</span>
                                      <button className="btn">
                                        Evolve
                                      </button>
                                    </div>
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <h3 className="timeline-title">Rejoice</h3>
                                        <p>Use data accumulated from your daily work and projected in easy to understand graphs and tables,
                                        advance and reach more people with the help of our time managing app.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="card-face active Aligner">
                      <h1 className="card-title">STORIES</h1>
                    </div>
                    <div className="card-face">
                      <h4 className="card-title">FACE 2</h4>
                      <p className="card-text">Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  scrollBackground: 'nav-bg', logo: '../media/LogoCarCare.png', id: 'navbar-brand-logocarcare' };
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentWillMount() {
    let scrollTop = window.pageYOffset,
        backgroundValue = (scrollTop != 0) ? "nav-bg-shadow" : "nav-bg",
        logoValue = (scrollTop != 0) ? "../media/CarCare.png" : "../media/LogoCarCare.png",
        idValue = (scrollTop != 0) ? "navbar-brand-carcare" : "navbar-brand-logocarcare";
    this.setState({
      scrollBackground: backgroundValue
    });
    this.setState({
      logo: logoValue
    });
    this.setState({
      id: idValue
    });
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(event) {
    let scrollTop = window.pageYOffset,
        backgroundValue = (scrollTop != 0) ? "nav-bg-shadow" : "nav-bg",
        logoValue = (scrollTop != 0) ? "../media/CarCare.png" : "../media/LogoCarCare.png",
        idValue = (scrollTop != 0) ? "navbar-brand-carcare" : "navbar-brand-logocarcare";
    this.setState({
      scrollBackground: backgroundValue
    });
    this.setState({
      logo: logoValue
    });
    this.setState({
      id: idValue
    });
  }
  render() {
    return (
      <nav id={this.state.scrollBackground} className="navbar navbar-expand-sm fixed-top">
        <a className="navbar-brand" id={this.state.id} href="#">
          <img src={this.state.logo} alt="LOGO" />
        </a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#" data-toggle="modal" data-target="#loginModal"><i className="material-icons">perm_identity</i></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" data-toggle="modal" data-target="#searchModal"><i className="material-icons">search</i></a>
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
        <div data-toggle="modal" data-target="#motoristPSModal" className="carbg"></div>
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
        <TvgApp />
      </div>
    );
  }
}
class FirstSection extends React.Component {
  render() {
    return (
      <section className="firstsection row">
        <a href="#" className="col leftfirstsection Aligner">
          <div className="linetop"></div>
          <div className="linebottom"></div>
          <ul className="nav nav-social flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><i className="fa fa-snapchat-square" aria-hidden="true"></i></a>
            </li>
          </ul>
          <LeftFirstSection />
          <ContactUsModalLauncher />
          <p className="contactinfo">{this.props.contactinfo}</p>
        </a>
        <a href="#" data-toggle="modal" data-target="#tvgPSModal" className="col">
          <RightFirstSection />
        </a>
        <SearchModal />
        <LoginModal />
        <ContactUsModal />
        <MotoristPSModal />
        <TvgPSModal />
      </section>
    );
  }
}
class SecondSection extends React.Component {
  render() {
    return (
      <section className="secondsection row">
        <div className="leftsecondsection col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <TvgCarouselApp />
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="ion-arrow-left-b" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="ion-arrow-right-b" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="rightsecondsection col row">
          <div className="col Aligner">
            <h3 className="display-4">TVG</h3>
            <blockquote className="blockquote jumbotron">
              <p className="font-weight-bold">
                from all around you, garages are taking the next step towards a better future.
                Expanding their reach, refining efficiency in time consuming.
                Our service offers garages the opportunity to focus only on the work, by managing the casual repetetive tasks.
                Providing numbers and pointing at crucial data, producing a better vision to take the right decision, at the right time.
              </p>
              <hr className="my-4"/>
              <footer className="blockquote-footer">It’s all about time now</footer>
            </blockquote>
          </div>
          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <img src="../media/experte.png" alt="Card image cap"/>
          </div>
        </div>
      </section>
    );
  }
}
class ThirdSection extends React.Component {
  render() {
    return (
      <section className="thirdsection row">
        <div className="leftthirdsection col row">
          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <img src="../media/McCarthys_Cars_Woman_Key.png" alt="Card image cap"/>
          </div>
          <div className="col Aligner">
            <h3 className="display-4">MOTORIST</h3>
            <blockquote className="blockquote jumbotron">
              <p className="font-weight-bold">
                be the master of your own time, when it comes to your car, you don’t have to plan a whole day just to see a specialist. with our service we help you book and control your safety and the safety of your passengers, our service gives you multiple choices between centers according to your criteria and location, for a better experience.
                it is most important for us that you do not waste time in the process of controling rather than garantee results and document them.
                your experience is most important to us.
              </p>
              <hr className="my-4"/>
              <footer className="blockquote-footer">Be the master of your time</footer>
            </blockquote>
          </div>
        </div>
        <div className="rightthirdsection col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <div id="carouselExampleControls2" className="carousel slide" data-ride="carousel">
            <MotoristCarouselApp />
            <a className="carousel-control-prev" href="#carouselExampleControls2" role="button" data-slide="prev">
              <span className="ion-arrow-left-b" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls2" role="button" data-slide="next">
              <span className="ion-arrow-right-b" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>
    );
  }
}
class Footer extends React.Component {
  render() {
    let year = (new Date()).getFullYear();
    return (
      <section className="footer">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="container">
                <h5 className="text-uppercase">About Us</h5>
                <p>Baby got ass like a trunk
                Took her from her man, he a punk
                She got a body like Baywatch
                I met her at the Playhouse
                Ten bottles, bought ten more
                Told her move her ass to the tempo
                Is you really with the shit, though?</p>
              </div>
            </div>
            <div className="col">
              <div className="container">
                <h5 className="text-uppercase">In the News</h5>
                <p>@amberweinberg You know what’s *not* fun on a Friday? <br/> Accompanying your migraine with throwing up through your nose.</p>
              </div>
            </div>
            <div className="col">
              <div className="container">
                <ul className="nav socialmediamotorist justify-content-center">
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa fa-snapchat-square" aria-hidden="true"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="container">
                <h5 className="text-uppercase">Get in Touch</h5>
                <p>{this.props.contactinfo}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <ul className="nav justify-content-center">
                <li className="nav-item">
                  <a className="nav-link">© {year} By TheOPDude, Inc. All rights reserved</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Disclaimer</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Privacy Policy</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Sitemap</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
        <Footer contactinfo={["TheOPDude Inc.",<br/>,"Marjane 1, 2",<sup>ème</sup>," tranche n°51",<br/>,"Meknès Maroc, 50000."]} />
      </div>
    );
  }
}

ReactDOM.render(
  <ContainerFluid />,
  document.getElementById('react')
);

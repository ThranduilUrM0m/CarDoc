
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
            <a className="nav-link" href="#" data-toggle="modal" data-target="#searchModal"><i className="material-icons">search</i></a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#" data-toggle="modal" data-target="#loginModal"></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><i className="material-icons">sort</i></a>
          </li>
        </ul>
      </nav>
    );
  }
}
class RegisterMotoristPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render(){
    return(
      <div className="container">
        <div className="wizard">
            <div className="wizard-inner">
                <div className="connecting-line-motorist"></div>
                <ul className="nav nav-tabs" role="tablist">

                    <li role="presentation" className="active">
                        <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" title="Personal Information">
                            <span className="round-tab">
                                <i className="ion-person"></i>
                            </span>
                        </a>
                    </li>

                    <li role="presentation" className="disabled">
                        <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" title="Vehicle">
                            <span className="round-tab">
                                <i className="ion-model-s"></i>
                            </span>
                        </a>
                    </li>

                    <li role="presentation" className="disabled">
                        <a href="#complete" data-toggle="tab" aria-controls="complete" role="tab" title="Complete">
                            <span className="round-tab">
                                <i className="ion-ios-camera"></i>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>

            <form role="form">
                <div className="tab-content">

                    <div className="tab-pane active" role="tabpanel" id="step1">
                        <h3>Step 1</h3>
                        <p>This is step 1</p>
                        <ul className="list-inline pull-right">
                            <li><button type="button" className="btn btn-primary next-step">Save and continue</button></li>
                        </ul>
                    </div>

                    <div className="tab-pane" role="tabpanel" id="step2">
                        <h3>Step 2</h3>
                        <p>This is step 2</p>
                        <ul className="list-inline pull-right">
                            <li><button type="button" className="btn btn-default prev-step">Previous</button></li>
                            <li><button type="button" className="btn btn-primary next-step">Save and continue</button></li>
                        </ul>
                    </div>

                    <div className="tab-pane" role="tabpanel" id="complete">
                        <h3>Complete</h3>
                        <p>You have successfully completed all steps.</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </form>
        </div>
      </div>
    );
  }
}
var Country = React.createClass({
  render: function() {
    return (
      <option value={this.props.countryProp.code}>{this.props.countryProp.name}</option>
    );
  }
});
var City = React.createClass({
  render: function() {
    return (
      <option value={this.props.cityProp.name}>{this.props.cityProp.name}</option>
    );
  }
});
class RegisterTvgPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      cities: [],
      citiesWanted: [],
      tvgLegalname: '',
      tvgLegaladresse: '',
      tvgCreationdate: '',
      tvgCity: '',
      tvgCountry: '',
      tvgRegion: '',
      tvgEmail: '',
      tvgPhone: '',
      tvgDaystartA: '',
      tvgDaystartB: '',
      tvgDayendA: '',
      tvgDayendB: '',
      formErrors: {
        tvgLegalname: '',
        tvgLegaladresse: '',
        tvgCreationdate: '',
        tvgCity: '',
        tvgCountry: '',
        tvgRegion: '',
        tvgEmail: '',
        tvgPhone: '',
        tvgDaystartA: '',
        tvgDaystartB: '',
        tvgDayendA: '',
        tvgDayendB: ''
      },
      tvgLegalnameValid: false,
      tvgLegaladresseValid: false,
      tvgCreationdateValid: false,
      tvgCityValid: false,
      tvgCountryValid: false,
      tvgRegionValid: false,
      tvgEmailValid: false,
      tvgPhoneValid: false,
      tvgDaystartAValid: false,
      tvgDaystartBValid: false,
      tvgDayendAValid: false,
      tvgDayendBValid: false,
      formValid: false
    };
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let tvgLegalnameValid = this.state.tvgLegalnameValid;
    let tvgLegaladresseValid = this.state.tvgLegaladresseValid;
    let tvgCreationdateValid = this.state.tvgCreationdateValid;
    let tvgCityValid = this.state.tvgCityValid;
    let tvgCountryValid = this.state.tvgCountryValid;
    let tvgRegionValid = this.state.tvgRegionValid;
    let tvgEmailValid = this.state.tvgEmailValid;
    let tvgPhoneValid = this.state.tvgPhoneValid;
    let tvgDaystartAValid = this.state.tvgDaystartAValid;
    let tvgDaystartBValid = this.state.tvgDaystartBValid;
    let tvgDayendAValid = this.state.tvgDayendAValid;
    let tvgDayendBValid = this.state.tvgDayendBValid;

    switch(fieldName) {
      case 'tvgLegalname':
        tvgLegalnameValid = value.length >= 0;
        fieldValidationErrors.tvgLegalname = tvgLegalnameValid ? '' : ' is invalid';
        break;
      case 'tvgLegaladresse':
        tvgLegaladresseValid = value.length >= 0;
        fieldValidationErrors.tvgLegaladresse = tvgLegaladresseValid ? '' : ' is invalid';
        break;
      case 'tvgCreationdate':
        tvgCreationdateValid = value.length >= 0;
        fieldValidationErrors.tvgCreationdate = tvgCreationdateValid ? '' : ' is invalid';
        break;
      case 'tvgCity':
        tvgCityValid = value.length >= 0;
        fieldValidationErrors.tvgCity = tvgCityValid ? '' : ' is invalid';
        break;
      case 'tvgCountry':
        tvgCountryValid = value.length >= 0;
        fieldValidationErrors.tvgCountry = tvgCountryValid ? '' : ' is invalid';
        break;
      case 'tvgRegion':
        tvgRegionValid = value.length >= 0;
        fieldValidationErrors.tvgRegion = tvgRegionValid ? '' : ' is invalid';
        break;
      case 'tvgEmail':
        tvgEmailValid = value.length >= 0;
        fieldValidationErrors.tvgEmail = tvgEmailValid ? '' : ' is invalid';
        break;
      case 'tvgPhone':
        tvgPhoneValid = value.length >= 0;
        fieldValidationErrors.tvgPhone = tvgPhoneValid ? '' : ' is invalid';
        break;
      case 'tvgDaystartA':
        tvgDaystartAValid = value.length >= 0;
        fieldValidationErrors.tvgDaystartA = tvgDaystartAValid ? '' : ' is invalid';
        break;
      case 'tvgDaystartB':
        tvgDaystartBValid = value.length >= 0;
        fieldValidationErrors.tvgDaystartB = tvgDaystartBValid ? '' : ' is invalid';
        break;
      case 'tvgDayendA':
        tvgDayendAValid = value.length >= 0;
        fieldValidationErrors.tvgDayendA = tvgDayendAValid ? '' : ' is invalid';
        break;
      case 'tvgDayendB':
        tvgDayendBValid = value.length >= 0;
        fieldValidationErrors.tvgDayendB = tvgDayendBValid ? '' : ' is invalid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    tvgLegalnameValid: tvgLegalnameValid,
                    tvgLegaladresseValid: tvgLegaladresseValid,
                    tvgCreationdateValid: tvgCreationdateValid,
                    tvgCityValid: tvgCityValid,
                    tvgCountryValid: tvgCountryValid,
                    tvgRegionValid: tvgRegionValid,
                    tvgEmailValid: tvgEmailValid,
                    tvgPhoneValid: tvgPhoneValid,
                    tvgDaystartAValid: tvgDaystartAValid,
                    tvgDaystartBValid: tvgDaystartBValid,
                    tvgDayendAValid: tvgDayendAValid,
                    tvgDayendBValid: tvgDayendBValid
                  }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.tvgLegalnameValid &&
      this.state.tvgLegaladresseValid &&
      this.state.tvgCreationdateValid &&
      this.state.tvgCityValid &&
      this.state.tvgCountryValid &&
      this.state.tvgRegionValid &&
      this.state.tvgEmailValid &&
      this.state.tvgPhoneValid &&
      this.state.tvgDaystartAValid &&
      this.state.tvgDaystartBValid &&
      this.state.tvgDayendAValid &&
      this.state.tvgDayendBValid});
  }
  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => { this.validateField(name, value) });
    if(name == 'tvgCountry'){
      var self = this;
      var countrySelected = '';
      $.ajax({
        url: "../js/json/COUNTRIES.json"
      }).then(function (data) {
        countrySelected = _.first(_.where(data, {code: value})).code;
        self.loadCitiesFromJSON(countrySelected);
      });
    }
  }
  errorClass(error) {
   return(error.length === 0 ? '' : 'has-error');
  }
  loadCountriesFromJSON() {
    var self = this;
    $.ajax({
      url: "../js/json/COUNTRIES.json"
    }).then(function (data) {
      self.setState({countries: data});
    });
  }
  loadCitiesFromJSON(countryID) {
    var self = this;
    var rowsC = [];
    $.ajax({
      url: "../js/json/CITIES.json"
    }).then(function (data) {
      self.setState({cities: _.sortBy(_.where(data, {country: countryID}), 'name')});
      self.state.cities.forEach(function(city) {
        rowsC.push(<City cityProp={city} />);
      });
      self.setState({citiesWanted: rowsC});
    });
  }
  componentWillMount(){
    this.loadCitiesFromJSON("AF");
  }
  componentDidMount() {
    this.loadCountriesFromJSON();
  }
  render(){
    var rows = [];
    this.state.countries.forEach(function(country) {
      rows.push(<Country countryProp={country} />);
    });
    return(
      <div className="container">
        <div className="wizard">
          <div className="container">
          <div className="wizard-inner">
            <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="disabled" id="step1"></li>
              <li role="presentation" className="disabled" id="step2"></li>
              <li role="presentation" className="disabled" id="step3"></li>
              <li role="presentation" className="disabled" id="step4"></li>
              <li role="presentation" className="disabled" id="step5"></li>
              <li role="presentation" className="disabled" id="step6"></li>
              <li role="presentation" className="disabled" id="step7"></li>
              <li role="presentation" className="disabled" id="step8"></li>
              <li role="presentation" className="disabled" id="step9"></li>
              <li role="presentation" className="disabled" id="step10"></li>
              <li role="presentation" className="disabled" id="step11"></li>
              <li role="presentation" className="disabled" id="step12"></li>
            </ul>
            <div className="connecting-line-motorist"></div>
          </div>
          <div className="container">
            <h4 className="card-title">Joining the community<i className="ion-compose"></i></h4>
            <p className="card-text">fill in the form below to get finish Registring</p>
          </div>
          <form role="form">
            <div className="tab-content">
              <div className="tab-pane active" role="tabpanel">
                <div className="container row">
                  <div className="col">

                    <div className={`form-group input-group ${this.errorClass(this.state.formErrors.tvgLegalname)}`}>
                      <div className="input-group-addon"><i className="ion-ios-home-outline"></i></div>
                      <input value={this.state.tvgLegalname} onChange={(event) => this.handleUserInput(event)} type="text" className="form-control" id="exampleInputtvgLegalname" aria-describedby="tvgLegalnameHelp" placeholder="Legal Name" name="tvgLegalname" required/>
                      <div className="invalid-feedback">
                        Please provide a valid Legal Name.
                      </div>
                      <small id="tvgLegalnameHelp" className="form-text text-muted"></small>
                    </div>

                    <div className={`form-group input-group ${this.errorClass(this.state.formErrors.tvgLegaladresse)}`}>
                      <div className="input-group-addon"><i className="ion-location"></i></div>
                      <input value={this.state.tvgLegaladresse} onChange={(event) => this.handleUserInput(event)} type="text" className="form-control" id="exampleInputtvgLegaladresse" aria-describedby="tvgLegaladresseHelp" placeholder="Legal Adresse" name="tvgLegaladresse" required/>
                      <div className="invalid-feedback">
                        Please provide a valid Legal Adresse.
                      </div>
                      <small id="tvgLegaladresseHelp" className="form-text text-muted"></small>
                    </div>

                    <div className={`form-group input-group ${this.errorClass(this.state.formErrors.tvgCreationdate)}`}>
                      <div className="input-group-addon"><i className="ion-android-calendar"></i></div>
                      <input value={this.state.tvgCreationdate} onChange={(event) => this.handleUserInput(event)} type="date" className="form-control" id="exampleInputtvgCreationdate" aria-describedby="tvgCreationdateHelp" placeholder="Creation Date" name="tvgCreationdate" required/>
                      <div className="invalid-feedback">
                        Please Choose a Creation Date.
                      </div>
                      <small id="tvgCreationdateHelp" className="form-text text-muted"></small>
                    </div>

                    <div className={`form-group input-group ${this.errorClass(this.state.formErrors.tvgCountry)}`}>
                      <div className="input-group-addon"><i className="ion-flag"></i></div>
                      <select value={this.props.tvgCountry} onChange={(event) => this.handleUserInput(event)} className="form-control custom-select" id="exampleInputtvgCountry" aria-describedby="tvgCountryHelp" name="tvgCountry" required>
                        {rows}
                      </select>
                      <div className="invalid-feedback">
                        Please Choose a Country.
                      </div>
                      <small id="tvgCountryHelp" className="form-text text-muted"></small>
                    </div>

                    <div className={`form-group input-group ${this.errorClass(this.state.formErrors.tvgRegion)}`}>
                      <div className="input-group-addon"><i className="ion-map"></i></div>
                      <input value={this.state.tvgRegion} onChange={(event) => this.handleUserInput(event)} type="text" className="form-control" id="exampleInputtvgRegion" aria-describedby="tvgRegionHelp" placeholder="Region" name="tvgRegion" required/>
                      <div className="invalid-feedback">
                        Please provide a valid Region.
                      </div>
                      <small id="tvgRegionHelp" className="form-text text-muted"></small>
                    </div>

                    <div className={`form-group input-group ${this.errorClass(this.state.formErrors.tvgCity)}`}>
                      <div className="input-group-addon"><i className="ion-ios-location"></i></div>
                      <select value={this.props.tvgCity} onChange={(event) => this.handleUserInput(event)} className="form-control custom-select" id="exampleInputtvgCity" aria-describedby="tvgCityHelp" name="tvgCity" required>
                        {this.state.citiesWanted}
                      </select>
                      <div className="invalid-feedback">
                        Please Choose a City.
                      </div>
                      <small id="tvgCityHelp" className="form-text text-muted"></small>
                    </div>
                  </div>
                  <div className="col">
                    <div className={`form-group input-group ${this.errorClass(this.state.formErrors.tvgEmail)}`}>
                      <div className="input-group-addon"><i className="ion-at"></i></div>
                      <input value={this.state.tvgEmail} onChange={(event) => this.handleUserInput(event)} type="text" className="form-control" id="exampleInputtvgEmail" aria-describedby="tvgEmailHelp" placeholder="Email" name="tvgEmail" required/>
                      <div className="invalid-feedback">
                        Please provide a valid Email.
                      </div>
                      <small id="tvgEmailHelp" className="form-text text-muted"></small>
                    </div>

                    <div className={`form-group input-group ${this.errorClass(this.state.formErrors.tvgPhone)}`}>
                      <div className="input-group-addon"><i className="ion-iphone"></i></div>
                      <input value={this.state.tvgPhone} onChange={(event) => this.handleUserInput(event)} type="text" className="form-control" id="exampleInputtvgPhone" aria-describedby="tvgPhoneHelp" placeholder="Phone" name="tvgPhone" required/>
                      <div className="invalid-feedback">
                        Please provide a valid Phone.
                      </div>
                      <small id="tvgPhoneHelp" className="form-text text-muted"></small>
                    </div>

                    <div className={`form-group input-group ${this.errorClass(this.state.formErrors.tvgDaystartA)}`}>
                      <div className="input-group-addon"><i className="ion-ios-clock-outline"></i></div>
                      <input value={this.state.tvgDaystartA} onChange={(event) => this.handleUserInput(event)} type="time" className="form-control" id="exampleInputtvgDaystartA" aria-describedby="tvgDaystartAHelp" placeholder="Morning Open" name="tvgDaystartA" required/>
                      <div className="invalid-feedback">
                        Please Choose an Opening Hour.
                      </div>
                      <small id="tvgDaystartAHelp" className="form-text text-muted"></small>
                    </div>

                    <div className={`form-group input-group ${this.errorClass(this.state.formErrors.tvgDayendA)}`}>
                      <div className="input-group-addon"><i className="ion-ios-clock-outline"></i></div>
                      <input value={this.state.tvgDayendA} onChange={(event) => this.handleUserInput(event)} type="time" className="form-control" id="exampleInputtvgDayendA" aria-describedby="tvgDayendAHelp" placeholder="Morning Close" name="tvgDayendA" required/>
                      <div className="invalid-feedback">
                        Please provide a valid Legal Name.
                      </div>
                      <small id="tvgDayendAHelp" className="form-text text-muted"></small>
                    </div>

                    <div className={`form-group input-group ${this.errorClass(this.state.formErrors.tvgDaystartB)}`}>
                      <div className="input-group-addon"><i className="ion-ios-clock"></i></div>
                      <input value={this.state.tvgDaystartB} onChange={(event) => this.handleUserInput(event)} type="time" className="form-control" id="exampleInputtvgDaystartB" aria-describedby="tvgDaystartBHelp" placeholder="Afternoon Open" name="tvgDaystartB" required/>
                      <div className="invalid-feedback">
                        Please provide a valid Legal Name.
                      </div>
                      <small id="tvgDaystartBHelp" className="form-text text-muted"></small>
                    </div>

                    <div className={`form-group input-group ${this.errorClass(this.state.formErrors.tvgDayendB)}`}>
                      <div className="input-group-addon"><i className="ion-ios-clock"></i></div>
                      <input value={this.state.tvgDayendB} onChange={(event) => this.handleUserInput(event)} type="time" className="form-control" id="exampleInputtvgDayendB" aria-describedby="tvgDayendBHelp" placeholder="Evening Close" name="tvgDayendB" required/>
                      <div className="invalid-feedback">
                        Please provide a valid Legal Name.
                      </div>
                      <small id="tvgDayendBHelp" className="form-text text-muted"></small>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary"><i className="ion-paper-airplane"></i></button>
              </div>
              <div className="clearfix"></div>
            </div>
          </form>
          </div>
        </div>
      </div>
    );
  }
}
class FirstSection extends React.Component {
  render() {
    return (
      <section className="firstsection row">
        <a href="#" className="col disabled register-firstsection Aligner">
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
          <ContactUsModalLauncher />
          <RegisterTvgPanel />
        </a>
        <SearchModal />
        <ContactUsModal />
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
class RegisterContainerFluid extends React.Component{
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <FirstSection contactinfo={["(212) 6 54 52 84 92 | Marjane 1, 2", <sup>ème</sup>,  " tranche n°51, Meknès Maroc."]} />
        <Footer contactinfo={["TheOPDude Inc.",<br/>,"Marjane 1, 2",<sup>ème</sup>," tranche n°51",<br/>,"Meknès Maroc, 50000."]} />
      </div>
    );
  }
}
ReactDOM.render(
  <RegisterContainerFluid />,
  document.getElementById('reactregister')
);

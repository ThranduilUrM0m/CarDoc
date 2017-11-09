const {Component} = React; // import {Component} from 'react';

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

class ContactUsModalLauncher extends Component {
  render() {
    return (
      <button type="button" data-toggle="modal" data-target="#contactusModal" className="btn btn-secondary contactusmodallauncher"><i className="ion-chatboxes"></i></button>
    );
  }
}
class ContactUsModal extends Component {
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
class SearchModal extends Component {
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
class MotoristPSModal extends Component {
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
class TvgPSModal extends Component {
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
class Header extends Component {
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
        <a className="navbar-brand" id={this.state.id} href="/">
          <img src={this.state.logo} alt="LOGO" />
        </a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#" data-toggle="modal" data-target="#loginModal"></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" data-toggle="modal" data-target="#searchModal"><i className="material-icons">search</i></a>
          </li>
        </ul>
      </nav>
    );
  }
}
class SuccessPanel extends Component {
  render() {
    return (
      <div className="success">
        <div className="container">
          <div className="card">
            <div className="container">
              <figure className="chart" data-percent="75">
                <svg width="200" height="200">
                  <circle className="outer" cx="95" cy="95" r="85" transform="rotate(-10, 95, 95)"/>
                </svg>
                <div className="check"></div>
              </figure>
              <div className="container container-text">
                <h4>Registration Successful</h4>
                <h6>Thank You for your trust</h6>
                <p>A confirmation message was sent to your Email</p>
                <p>Please Click the link in that message to validate your account</p>
                <form action="emailvalidation" method="post">
                  <button type="submit" className="btn btn-primary">Re-Send Confirmation</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class PleaseCheck extends Component {
  render() {
    return (
      <div className="success">
        <div className="container">
          <div className="card">
            <div className="container">
              <figure className="chart" data-percent="75">
                <svg width="200" height="200">
                  <circle className="outer" cx="95" cy="95" r="85" transform="rotate(-10, 95, 95)"/>
                </svg>
                <div className="check"></div>
              </figure>
              <div className="container container-text">
                <h4>Registration Pending</h4>
                <h6>Please Check your Email</h6>
                <p>A confirmation message was sent to your Email</p>
                <p>Please Click the link in that message to validate your account</p>
                <form action="emailvalidation" method="post">
                  <button type="submit" className="btn btn-primary">Re-Send Confirmation</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class EmailValidated extends Component {
  render() {
    return (
      <div className="success">
        <div className="container">
          <div className="card">
            <div className="container">
              <figure className="chart" data-percent="75">
                <svg width="200" height="200">
                  <circle className="outer" cx="95" cy="95" r="85" transform="rotate(-10, 95, 95)"/>
                </svg>
                <div className="check"></div>
              </figure>
              <div className="container container-text">
                <h4>Email Validated</h4>
                <h6>Thank You for your trust</h6>
                <p>You can now use your profile safely</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class FirstSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SuccessPanelChoice: null,
      accountLogged: []
    };
  }
  getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
  }
  componentWillMount(){
    if(this.getUrlParameter('incoming') != undefined){
      if(this.getUrlParameter('incoming') == 'activate'){
        this.setState({SuccessPanelChoice: <PleaseCheck />});
      }else{
        const value = this.getUrlParameter('incoming').split('_');
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        myHeaders.append("x-my-custom-header", "INDEED");
        var myInit = { method: 'GET',
                        headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        credentials: 'same-origin' };
        fetch('/api/accounts', myInit)
        .then((response) => response.json()) 
        .then((responseData) => {
          var account = _.findWhere(responseData._embedded.accounts, {accountLogin: value[0]});
          if(account != undefined){
            if(account.token == value[0]+"_"+value[1]){
              this.setState({SuccessPanelChoice: <EmailValidated />});
              
              var putHeaders = new Headers();
              putHeaders.append("Content-Type", "application/json");
              putHeaders.append("Accept", "application/json");
              putHeaders.append("x-my-custom-header", "INDEED");
              var myInit = { method: 'GET',
                              headers: putHeaders,
                              mode: 'cors',
                              cache: 'default',
                              credentials: 'same-origin' };
              fetch('/validateEmail?accountLogin='+account.accountLogin, myInit)
              .then((responseA) => responseA.json());
    
            }
          }
        });
      }
    }else{
      this.setState({SuccessPanelChoice: <SuccessPanel />});
    }
  }
  render() {
    return (
      <section className="firstsection row">
        <a href="#" className="col disabled success-firstsection Aligner">
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
          {this.state.SuccessPanelChoice}
          <ContactUsModalLauncher />
        </a>
        <SearchModal />
        <ContactUsModal />
      </section>
    );
  }
}
class Footer extends Component {
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
class SuccessContainerFluid extends Component{
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
  <SuccessContainerFluid />,
  document.getElementById('reactsuccess')
);

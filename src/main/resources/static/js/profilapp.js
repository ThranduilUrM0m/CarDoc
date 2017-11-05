const {Component} = React;

class ContactUsModalLauncher extends Component {
  render() {
    return (
      <button type="button" data-toggle="modal" data-target="#contactusModal" className="btn btn-secondary"><i className="ion-chatboxes"></i></button>
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
class VehicleModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="vehicle modal fade" id="vehicleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                      <h4 className="card-title">Your Vehicles<i className="ion-model-s"></i></h4>
                      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                          <div className="carousel-item active">

                          </div>
                          <div className="carousel-item">

                          </div>
                          <div className="carousel-item">

                          </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="sr-only">Next</span>
                        </a>
                      </div>
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
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {  scrollBackground: 'nav-bg', logo: '../media/CarCareBlack.png', id: 'navbar-brand-carcare' };
  }
  render() {
    return (
      <nav id={this.state.scrollBackground} className="navbar navbar-profil navbar-expand-sm">
        <a className="navbar-brand" id={this.state.id} href="#">
          <img src={this.state.logo} alt="LOGO" />
        </a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#" data-toggle="modal" data-target="#searchModal"><i className="material-icons">search</i></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><i className="material-icons">sort</i></a>
          </li>
        </ul>
      </nav>
    );
  }
}
class TvgContentTop extends Component {
  render() {
    return (
      <div className="row"></div>
    );
  }
}
class TvgContentBottom extends Component {
  render(){
    return(
      <div className="row"></div>
    );
  }
}
class MotoristContentTop extends Component {
  render() {
    return (
      <div className="row"></div>
    );
  }
}
class VehicleModalLauncher extends Component {
  updateState() {
    $('.carousel-item:first-of-type').addClass( "active" );
  }
  render() {
    return (
      <div onLoad={this.updateState} className={"carousel-item clash-card barbarian"}>
        <div className={"clash-card__image clash-card__image--barbarian"}>
          <img src={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian.png"} alt="barbarian" />
        </div>
        <div className={"clash-card__level clash-card__level--barbarian"}>{this.props.vehicle.vehicleBrand}</div>
        <div className="clash-card__unit-name">{this.props.vehicle.vehicleRegistration}</div>
      </div>
    );
  }
}
class MotoristContentBottom extends Component {
  constructor(props){
    super(props);
    this.state = {
      rows: []
    };
  }
  componentDidMount(){
    var self = this;
    self.props.account.motorist.vehicle.forEach(function(vehicle) {
      self.setState(prevState => ({
        rows: [...prevState.rows, <VehicleModalLauncher vehicle={vehicle} />]
      }));
    });
  }
  render(){
    return(
      <div className="row">
        <div className="col-9">

          <div id="carouselExampleControls" data-ride="carousel" className="carousel slide vehiclesCarousel">
            <div className="wrapper carousel-inner">
              
              {this.state.rows}

            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="card__image" id="card-2">
              <div className="image-overlay"></div>
              <img src="http://www.fubiz.net/wp-content/uploads/2014/11/Lotta-Nieminen_Google_07-640x553.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class ProfilContent extends Component {  
  constructor(props){
    super(props);
    this.state = {
      ContentTOP: '',
      ContentBOTTOM: ''
    };
  }
  loadAccountFromServer(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var myInit = { method: 'POST',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   credentials: 'same-origin' };
    fetch('/auth', myInit)
    .then((response) => response.json()) 
    .then((responseData) => {
      if(this.props.account === 'tvg'){
        this.setState({
          ContentTOP: <TvgContentTop account={responseData} />,
          ContentBOTTOM: <TvgContentBottom account={responseData} />
        });
      }else{
        this.setState({
          ContentTOP: <MotoristContentTop account={responseData} />,
          ContentBOTTOM: <MotoristContentBottom account={responseData} />
        });
      }
    });
  }
  componentDidMount() {
    this.loadAccountFromServer();
  }
  render() {
    return (
      <div className="profil-content">
        {this.state.ContentTOP}
        {this.state.ContentBOTTOM}
      </div>
    );
  }
}
class FirstSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      accountType: ''
    };
  }
  componentDidMount(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var myInit = { method: 'POST',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   credentials: 'same-origin' };
    fetch('/auth', myInit)
    .then((response) => response.json()) 
    .then((responseData) => { 
      this.setState({
        accountType: responseData.token.split("|")[0]
      });
    });
  }
  render() {
    return (
      <section className="firstsection row">
        <a href="#" className="col disabled profil-firstsection">
          <ul className="nav nav-social flex-column">
            <li className="nav-item">
              <button type="button" className="btn btn-secondary"><i className="fa fa-instagram" aria-hidden="true"></i></button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-secondary"><i className="fa fa-facebook-square" aria-hidden="true"></i></button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-secondary"><i className="fa fa-snapchat-square" aria-hidden="true"></i></button>
            </li>
            <li className="nav-item">
              <ContactUsModalLauncher />
            </li>
          </ul>
          <ProfilContent account={this.state.accountType} />
        </a>
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
class ContainerFluid extends Component{
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
  <ContainerFluid />,
  document.getElementById('react')
);

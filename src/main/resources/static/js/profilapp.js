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
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      scrollBackground: 'nav-bg', 
      logo: '../media/CarCareBlack.png', 
      id: 'navbar-brand-carcare',
      account: '',
      motoristUsername: '',
      motoristFullName: '',
      motoristPicture: []
    };
  }
  loadAccountFromServer(){
    var self = this;
    var myHeaders = new Headers();
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   credentials: 'same-origin' };
    fetch('/auth', myInit)
    .then((response) => response.json()) 
    .then((responseData) => {
      if(responseData.activated != false){
        var max = null;
        self.setState({account: responseData});
        self.setState({motoristUsername: responseData.accountLogin});
        self.setState({motoristFullName: (responseData.motorist.ipersonLastname).toUpperCase()+" "+responseData.motorist.ipersonFirstname});
        responseData.picture.forEach(function(picture) {
          if (max === null || picture.insertDate > max.insertDate) {
            max = picture;
          }
        });
        self.setState({motoristPicture: max});
      }else{
        $('.sessionVariables').submit();
      }
    });
  }
  componentDidMount(){
    this.loadAccountFromServer();
  }
  handleClick(event){
    console.log('Clicked');
  }
  render() {
    var picture = 'http://www.pgconnects.com/sanfrancisco/wp-content/uploads/sites/5/2015/04/generic-profile-grey-380x380.jpg'
    if(this.state.motoristPicture != '' && this.state.motoristPicture != null)
      picture = '../media/'+this.state.motoristPicture.pictureName+'.'+this.state.motoristPicture.pictureExtension;
    return (
      <header role="banner">
        
        <nav id={this.state.scrollBackground} className="navbar navbar-profil navbar-expand-sm">
          <a className="navbar-brand" id={this.state.id} href="#">
            <img src={this.state.logo} alt="LOGO" />
          </a>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#" data-toggle="modal" data-target="#searchModal"><i className="material-icons">search</i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <button type="button" className="drawer-toggle drawer-hamburger">
                  <span className="sr-only">toggle navigation</span>
                  <span className="drawer-hamburger-icon"></span>
                </button>
              </a>
            </li>
          </ul>
        </nav>

        <nav className="drawer-nav" role="navigation">
          <ul className="drawer-menu">
            <li><a className="drawer-brand disabled" href="#"><span>{this.state.motoristUsername}</span></a></li>
            <li><a className="drawer-menu-item disabled" href="#"><div style={{backgroundImage: "url(" + picture + ")"}} id="profil-picture" onClick={(event) => this.handleClick(event)}></div></a></li>
            <li><a className="drawer-menu-item disabled" href="#"><span>{this.state.motoristFullName}</span></a></li>
          </ul>
          <ul className="drawer-menu">
            <li className="active"><a className="drawer-menu-item" href="#"><span><i className="ion-ios-home"></i><i>Profil</i></span></a><div className="bar"></div></li>
            <li><a className="drawer-menu-item" href="#"><span><i className="ion-ios-bookmarks"></i><i>Reservation</i></span></a><div className="bar"></div></li>
            <li><a className="drawer-menu-item" href="#"><span><i className="ion-person"></i><i>About</i></span></a><div className="bar"></div></li>
            <li><a className="drawer-menu-item" href="#"><span><i className="ion-stats-bars"></i><i>Statistics</i></span></a><div className="bar"></div></li>
            <li><a className="drawer-menu-item" href="/logout"><span><i className="ion-log-out"></i><i>Logout</i></span></a><div className="bar"></div></li>
          </ul>
        </nav>

      </header>
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
  constructor(props) {
    super(props);
    this.state = {
      motoristUsername: '',
      motoristFullName: '',
      motoristCountry: '',
      motoristCity: ''
    };
  }
  componentDidMount(){
    var self = this;
    self.setState({motoristUsername: self.props.account.accountLogin});
    self.setState({motoristFullName: (self.props.account.motorist.ipersonLastname).toUpperCase()+" "+self.props.account.motorist.ipersonFirstname});
    
    var myHeaders = new Headers();
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   credentials: 'same-origin' };
    fetch('../js/json/COUNTRIES.json', myInit)
    .then((response) => response.json()) 
    .then((responseData) => {
      self.setState({motoristCountry: _.findWhere(responseData, {code: self.props.account.motorist.ipersonCountry}).name});
    });

    self.setState({motoristCity: self.props.account.motorist.ipersonCity});
  }
  render() {
    return (
      <div className="row">
        <div className="col-9">
          <div className="accountInfoContainer">
            <h2>{this.state.motoristFullName}</h2>
            <h5>{this.state.motoristUsername}</h5>
          </div>
        </div>
        <div className="col-3">
          <div className="accountLocationContainer">
            <h1>{this.state.motoristCountry}</h1>
            <h4>{this.state.motoristCity}</h4>
          </div>
        </div>
      </div>
    );
  }
}
class VehicleModalLauncher extends Component {
  updateState() {
    $('.carousel-item:first-of-type').addClass( "active" );
  }
  render() {
    return (
      <div onLoad={this.updateState} data-toggle="modal" data-target="#vehicleModal" data-vehicleid={this.props.vehicle.vehicleId} data-vehiclebrand={this.props.vehicle.vehicleBrand} data-vehicletype={this.props.vehicle.vehicleType} data-vehiclefirstcirculation={this.props.vehicle.vehicleFirstCirculation} data-vehicleregistration={this.props.vehicle.vehicleRegistration} className={"carousel-item clash-card barbarian"}>
        <div className={"clash-card__image clash-card__image--barbarian"}>
          <img src={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian.png"} alt="barbarian" />
        </div>
        <div className={"clash-card__level clash-card__level--barbarian"}>{this.props.vehicle.vehicleBrand}</div>
        <div className="clash-card__unit-name">{this.props.vehicle.vehicleRegistration}</div>
      </div>
    );
  }
}
class VehicleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleId: '',
      vehicleBrand: '',
  	  vehicleType: '',
  	  vehicleFirstCirculation: '',
      vehicleRegistration : '',
      formErrors: {
  	    vehicleBrand: '',
  	    vehicleType: '',
  	    vehicleFirstCirculation: '',
  	    vehicleRegistration : ''
      },
      vehicleBrandValid: false,
  	  vehicleTypeValid: false,
  	  vehicleFirstCirculationValid: false,
  	  vehicleRegistrationValid: false,
      formValid: false
    }
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let vehicleBrandValid = this.state.vehicleBrandValid;
  	let vehicleTypeValid = this.state.vehicleTypeValid;
  	let vehicleFirstCirculationValid = this.state.vehicleFirstCirculationValid;
  	let vehicleRegistrationValid = this.state.vehicleRegistrationValid;

    switch(fieldName) {
      case 'vehicleBrand':
        vehicleBrandValid = value.length >= 1;
        fieldValidationErrors.vehicleBrand = vehicleBrandValid ? '' : ' is invalid';
        break;
      case 'vehicleType':
        vehicleTypeValid = value === 'Car (Light vehicles)' || value === 'Gas-powered vehicles' || value === 'Collection vehicles' || value === 'Utilities' || value === 'Electric vehicles' || value === 'Specific vehicles';
        fieldValidationErrors.vehicleType = vehicleTypeValid ? '' : ' is invalid';
        break;
      case 'vehicleFirstCirculation':
        vehicleFirstCirculationValid = moment(value, 'YYYY-MM-DD', true).isValid();
        fieldValidationErrors.vehicleFirstCirculation = vehicleFirstCirculationValid ? '' : ' is invalid';
        break;
      case 'vehicleRegistration':
        vehicleRegistrationValid = value.length >= 1;
        fieldValidationErrors.vehicleRegistration = vehicleRegistrationValid ? '' : ' is invalid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                  vehicleBrandValid: vehicleBrandValid,
                  vehicleTypeValid: vehicleTypeValid,
                  vehicleFirstCirculationValid: vehicleFirstCirculationValid,
                  vehicleRegistrationValid: vehicleRegistrationValid
                  }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.vehicleBrandValid &&
                              this.state.vehicleTypeValid &&
                              this.state.vehicleFirstCirculationValid &&
                              this.state.vehicleRegistrationValid});
  }
  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => { this.validateField(name, value) });
  }
  handleSubmit (form, e) {
    const name = e.target.name;
    const value = e.target.value;
    switch(name) {
      case 'addVehicleButton':
        // empty all states
        this.setState({
          vehicleBrand: '',
          vehicleType: '',
          vehicleFirstCirculation: '',
          vehicleRegistration : '',
          formErrors: {
            vehicleBrand: '',
            vehicleType: '',
            vehicleFirstCirculation: '',
            vehicleRegistration : ''
          },
          vehicleBrandValid: false,
          vehicleTypeValid: false,
          vehicleFirstCirculationValid: false,
          vehicleRegistrationValid: false,
          formValid: false
        });
        // handle alert overlay
        this.handleOverlay(vehicleForm, 'Adding');
        // remove all overlays
        $('.overlayDisable').remove();
        // enable inputs
        $(form).find('input, select').prop('disabled', false);
        // switch buttons
        this.handleButtonDisplayed('.modal-footer', 'SubmitAddVehicle');
        // take off delete button
        $('.modal-footer').find('button#deleteButton')
          .css({
            display: "none"
          });
        break;
      case 'SubmitAddVehicleButton':
        $(form)
          .attr('action', "/vehicleAdd")
            .submit();
        break;
      case 'updateVehicleButton':
        var input = $("<input/>")
          .attr("type", "hidden")
          .attr("name", "dataId")
          .val(this.state.vehicleId);
        $(form)
          .attr('action', "/vehicleUpdate")
          .append($(input))
            .submit();
        break;
      case 'deleteVehicleButton':
        var input = $("<input/>")
          .attr("type", "hidden")
          .attr("name", "dataId")
          .val(this.state.vehicleId);
        $(form)
          .attr('action', "/vehicleDelete")
          .append($(input))
            .submit();
        break;
      default:
        break;
    }
  }
  errorClass(error) {
   return(error.length === 0 ? '' : 'has-error');
  }
  handleBlur(e){
    const name = e.target.name;
    if(name == 'vehicleFirstCirculation'){
      e.target.type = 'text';
    }
  }
  handleFocus(e){
    const name = e.target.name;
    if(name == 'vehicleFirstCirculation'){
      e.target.type = 'date';
    }
  }
  handleOverlay(form, Choice) {
    var $alertOverlay = $('<div class="alert alert-success alertOverlay">You\'re Now '+Choice+'</div>');
      // style the alert overlay
      $alertOverlay
        .css({
          position: "absolute"
          , top: 0
          , width: $(form).outerWidth()
          , height: $(form).outerHeight()
          , display: "flex"
          , justifyContent: "center"
          , alignItems: "center"
          , fontSize: "5rem"
          , display: "none"
        });
      $(form)
        .css({
          position: "relative"
        })
        .append($alertOverlay);
      $alertOverlay
        .fadeIn('fast', function(){
          var el = $(this);
          setTimeout(function(){
            el.fadeOut('fast',
            function(){
              $(this).remove();
            });
          }, 400);
        })
  }
  handleInputsOverlay(form){
    var reactThis = this;
    $.each($(form).serializeArray(), function(_, field) {
      var $self = $('input[name='+field.name+'], select[name='+field.name+']'),
      // create an overlay
      $overlay = $('<div class="overlayDisable"></div>'),
      // get its parent label element
      $label = $self.prev(),
      // get its parent element
      $parent = $self.parent();
      
      //disable the element
      $self.prop('disabled', true);

      // style the parent
      $parent.css( "position", "relative" );
      
      // style the overlay
      $overlay
        .css({
          // position the overlay in the same real estate as the original parent element 
          position: "absolute"
          , top: $label.outerHeight()
          , width: $self.outerWidth()
          , height: $self.outerHeight()
          , zIndex: 10000
          // IE needs a color in order for the layer to respond to mouse events
          , backgroundColor: "#fff"
          // set the opacity to 0, so the element is transparent
          , opacity: 0
        })
        .dblclick(() => {
          // enable all inputs
          $(form).find('input, select').prop('disabled', false);

          // focus on the particular input
          $self.focus();
          
          //handle alert overlay
          reactThis.handleOverlay(vehicleForm, 'Updating');
          
          // remove all overlays
          $('.overlayDisable').remove();

          // change buttons
          reactThis.handleButtonDisplayed('.modal-footer', 'updateVehicle');

          // take off delete button
          $('.modal-footer').find('button#deleteButton')
            .css({
              display: "none"
            });
        });
      // insert the overlay
      $overlay.insertAfter($self);
    });
  }
  handleButtonDisplayed(buttonsContainer, buttonDisplayed) {
    //handle submit buttons
    $(buttonsContainer).find('button:not(#deleteButton)')
      .css({
        display: "none"
      });
    $(buttonsContainer).find('button#'+buttonDisplayed+'')
      .css({
        display: "initial"
      });
  }
  componentDidMount() {
    var self = this;
    $('#vehicleModal').on('shown.bs.modal', (event) => {
      self.handleButtonDisplayed('.modal-footer', 'addVehicle');
      $('.modal-footer').find('button#deleteButton')
        .css({
          display: "initial"
        });
        self.handleInputsOverlay(vehicleForm);

      var button = $(event.relatedTarget) // Button that triggered the modal
      var vehicleIdIn = button.data('vehicleid') // Extract info from data-* attributes
      var vehicleBrandIn = button.data('vehiclebrand') // Extract info from data-* attributes
      var vehicleTypeIn = button.data('vehicletype') // Extract info from data-* attributes
      var vehicleFirstCirculationIn = button.data('vehiclefirstcirculation') // Extract info from data-* attributes
      var vehicleRegistrationIn = button.data('vehicleregistration') // Extract info from data-* attributes
      
      self.setState({
        vehicleId: vehicleIdIn,
        vehicleBrand: vehicleBrandIn,
        vehicleType: vehicleTypeIn,
        vehicleFirstCirculation: moment(new Date(vehicleFirstCirculationIn)).format('YYYY-MM-DD'),
        vehicleRegistration : vehicleRegistrationIn,
        formErrors: {
          vehicleBrand: '',
          vehicleType: '',
          vehicleFirstCirculation: '',
          vehicleRegistration : ''
        },
        vehicleBrandValid: true,
        vehicleTypeValid: true,
        vehicleFirstCirculationValid: true,
        vehicleRegistrationValid: true,
        formValid: true
      });

    });
  }
  render() {
    return (
      <div className="vehicle modal fade" id="vehicleModal" tabindex="-1" role="dialog" aria-labelledby="vehicleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="vehicleModalLabel">Vehicle {this.state.vehicleBrand}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form id="vehicleForm" action="" method="post">

                <div className={`form-group ${this.errorClass(this.state.formErrors.vehicleBrand)}`}>
                  <label for="vehicleBrand" className="col-form-label">Brand:</label>
                  <input value={this.state.vehicleBrand} onChange={(event) => this.handleUserInput(event)} type="text" className="form-control" id="vehicleBrand" aria-describedby="vehicleBrandHelp" name="vehicleBrand" required/>
                  <div className="bar"></div>
                  <div className="invalid-feedback">
                    Please provide a valid Brand.
                  </div>
                  <small id="vehicleBrandHelp" className="form-text text-muted"></small>
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.vehicleType)}`}>
                  <label for="vehicleType" className="col-form-label">Type:</label>
                  <select value={this.state.vehicleType} onChange={(event) => this.handleUserInput(event)} className="form-control custom-select" id="vehicleType" aria-describedby="vehicleTypeHelp" name="vehicleType" required>
                    <option value=""></option>
                    <option value="Car (Light vehicles)">Car (Light vehicles)</option>
                    <option value="Gas-powered vehicles">Gas-powered vehicles</option>
                    <option value="Collection vehicles">Collection vehicles</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Electric vehicles">Electric vehicles</option>
                    <option value="Specific vehicles">Specific vehicles</option>
                  </select>
                  <div className="bar"></div>
                  <div className="invalid-feedback">
                    Please provide a valid Vehicle Type.
                  </div>
                  <small id="vehicleTypeHelp" className="form-text text-muted"></small>
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.vehicleFirstCirculation)}`}>
                  <label for="vehicleFirstCirculation" className="col-form-label">First Circulation:</label>
                  <input value={this.state.vehicleFirstCirculation} onChange={(event) => this.handleUserInput(event)} type="text" onBlur={(event) => this.handleBlur(event)} onFocus={(event) => this.handleFocus(event)} className="form-control" id="vehicleFirstCirculation" aria-describedby="vehicleFirstCirculationHelp" name="vehicleFirstCirculation" required/>
                  <div className="bar"></div>
                  <div className="invalid-feedback">
                    Please provide a valid Date.
                  </div>
                  <small id="vehicleFirstCirculationHelp" className="form-text text-muted"></small>
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.vehicleRegistration)}`}>
                  <label for="vehicleRegistration" className="col-form-label">Registration:</label>
                  <input value={this.state.vehicleRegistration} onChange={(event) => this.handleUserInput(event)} type="text" className="form-control" id="vehicleRegistration" aria-describedby="vehicleRegistrationHelp" name="vehicleRegistration" required/>
                  <div className="bar"></div>
                  <div className="invalid-feedback">
                    Please provide a valid Registration.
                  </div>
                  <small id="vehicleRegistrationHelp" className="form-text text-muted"></small>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={(event) => this.handleSubmit(vehicleForm, event)} name="deleteVehicleButton" className="btn btn-outline-danger" id="deleteButton" >Delete</button>
              <button type="button" onClick={(event) => this.handleSubmit(vehicleForm, event)} name="updateVehicleButton" className="btn btn-primary" id="updateVehicle" disabled={!this.state.formValid}>Update Vehicle</button>
              <button type="button" onClick={(event) => this.handleSubmit(vehicleForm, event)} name="SubmitAddVehicleButton" className="btn btn-primary" id="SubmitAddVehicle" disabled={!this.state.formValid}>Add Vehicle</button>
              <button type="button" onClick={(event) => this.handleSubmit(vehicleForm, event)} name="addVehicleButton" className="btn btn-outline-primary" id="addVehicle" >Add A Vehicle</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class MotoristContentBottom extends Component {
  constructor(props){
    super(props);
    this.state = {
      motoristPicture: [],
      rows: []
    };
  }
  componentDidMount(){
    var self = this;
    var max = null;
    var min = null;

    self.props.account.motorist.vehicle.forEach(function(vehicle) {
      self.setState(prevState => ({
        rows: [...prevState.rows, <VehicleModalLauncher vehicle={vehicle} />]
      }));
    });

    self.props.account.picture.forEach(function(picture) {
      if (max === null || picture.insertDate > max.insertDate) {
        max = picture;
      }
    });
    
    self.setState({motoristPicture: max});
  }
  render(){
    var picture = 'http://www.fubiz.net/wp-content/uploads/2014/11/Lotta-Nieminen_Google_07-640x553.jpg'
    if(this.state.motoristPicture != '' && this.state.motoristPicture != null)
      picture = '../media/'+this.state.motoristPicture.pictureName+'.'+this.state.motoristPicture.pictureExtension;
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
              <img src={picture} alt="" />
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
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   credentials: 'same-origin' };
    fetch('/auth', myInit)
    .then((response) => response.json()) 
    .then((responseData) => {
      if(responseData.activated != false){
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
      }else{
        $('.sessionVariables').submit();
      }
    });
  }
  componentDidMount() {
    this.loadAccountFromServer();
  }
  render() {
    return (
      <div className="profil-content">
        <form className="sessionVariables" action="/authRedirection" method="post"></form>
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
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   credentials: 'same-origin' };
    fetch('/auth', myInit)
    .then((response) => response.json()) 
    .then((responseData) => {
      if(responseData.activated != false){
        this.setState({
          accountType: responseData.token.split("|")[0]
        });
      }else{
        $('.sessionVariables').submit();
      }
    });
  }
  render() {
    return (
      <section className="firstsection row">
        <form className="sessionVariables" action="/authRedirection" method="post"></form>
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
        <VehicleModal />
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
        <main role="main">
          <FirstSection contactinfo={["(212) 6 54 52 84 92 | Marjane 1, 2", <sup>ème</sup>,  " tranche n°51, Meknès Maroc."]} />
          <Footer contactinfo={["TheOPDude Inc.",<br/>,"Marjane 1, 2",<sup>ème</sup>," tranche n°51",<br/>,"Meknès Maroc, 50000."]} />
        </main>
      </div>
    );
  }
}

ReactDOM.render(
  <ContainerFluid />,
  document.getElementById('react')
);

const { Component } = React;
const { BrowserRouter, Switch, Route, Link } = ReactRouterDOM;

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
                      <form data-ajax="false" id="contactusForm">
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
    $('#realDrawer li *').click(() => {
      $('.drawer').drawer('close');
    });
  }
  render() {
    var picture = 'http://www.fubiz.net/wp-content/uploads/2014/11/Lotta-Nieminen_Google_07-640x553.jpg'
    if(this.state.motoristPicture != '' && this.state.motoristPicture != null)
      picture = '../media/pictures/'+this.state.motoristPicture.pictureName+'.'+this.state.motoristPicture.pictureExtension;
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
            <li><a className="drawer-menu-item disabled" href="#"><div style={{backgroundImage: "url(" + picture + ")"}} id="profil-picture" data-toggle="modal" data-target="#pictureModal"></div></a></li>
            <li><a className="drawer-menu-item disabled" href="#"><span>{this.state.motoristFullName}</span></a></li>
          </ul>
          <ul id="realDrawer" className="drawer-menu">
            <li className="active">
              <a className="drawer-menu-item" href="#">
                <Link to={'/'}>
                  <span>
                    <i className="ion-ios-home"></i>
                    <i>Profil</i>
                  </span>
                </Link>
              </a>
              <div className="bar"></div>
            </li>
            <li>
              <a className="drawer-menu-item" href="#">
                <Link to={'/reservation'}>
                  <span>
                    <i className="ion-ios-bookmarks"></i>
                    <i>Reservation</i>
                  </span>
                </Link>
              </a>
              <div className="bar"></div>
            </li>
            <li>
              <a className="drawer-menu-item" href="#">
                <Link to={'/about'}>
                  <span>
                    <i className="ion-person"></i>
                    <i>About</i>
                  </span>
                </Link>
              </a>
              <div className="bar"></div>
            </li>
            <li>
              <a className="drawer-menu-item" href="#">
                <Link to={'/statistics'}>
                  <span>
                    <i className="ion-stats-bars"></i>
                    <i>Statistics</i>
                  </span>
                </Link>
              </a>
              <div className="bar"></div>
            </li>
            <li>
              <a className="drawer-menu-item" href="/logout">
                <span>
                  <i className="ion-log-out"></i>
                  <i>Logout</i>
                </span>
              </a>
              <div className="bar"></div>
            </li>
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
    var $alertOverlay = $('<div className="alert alert-success alertOverlay">You\'re Now '+Choice+'</div>');
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
      $overlay = $('<div className="overlayDisable"></div>'),
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
              <form data-ajax="false" id="vehicleForm" action="" method="post">

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
class PictureModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: []
    }
  }
  loadPicturesFromServer(){
    var myHeaders = new Headers();
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   credentials: 'same-origin' };
    fetch('/auth', myInit)
    .then((response) => response.json()) 
    .then((responseData) => {
      this.setState({
        pictures: responseData.picture
      });
      // how many milliseconds is a long press?
      var longpress = 3000;
      // holds the start time
      var start;
      // Cache vars
      var $gallery = $('.gallery'),
      $lightbox = $('.lightbox'),
      $figure = $('figure'),
      $close = $('.close');
      // Toggle lightbox
      function toggleLightbox(url) {
        if ($lightbox.is('.open')) {
          $lightbox
            .removeClass('open')
            .fadeOut(200);
        } else {
          $figure.css('background-image', 'url(' + url + ')');
          $lightbox
            .addClass('open')
            .fadeIn(200);
        }
      }
      // Close 
      $lightbox.on('click', toggleLightbox);
      var pics = _.sortBy(responseData.picture, 'insertDate').reverse();
      pics.forEach(function(picture) {
        var picturePath = '../media/pictures/'+picture.pictureName+'.'+picture.pictureExtension;
        var item = $('<li className="item" data-picture="'+picture.pictureId+'" data-full="'+picturePath+'"><img src="'+picturePath+'" /></li>');
        var afterIt = $('<i className="fa fa-search-plus" aria-hidden="true"></i>');
        var beforeIt = $('<i className="fa fa-trash" aria-hidden="true"></i>');
        afterIt
          .css({
            position: "absolute",
            top: "0.8rem",
            left: "1rem",
            fontSize: "2rem",
            color: "gray"
          })
          .hover(() => {
            afterIt.css({
              textShadow: "3px 6px 3px #272634",
              color: "white"
            });
          },() => {
            afterIt.css({
              textShadow: "none",
              color: "gray"
            });
          })
          .click(() => {
            var full = item.attr('data-full');
            toggleLightbox(full);
          });
        beforeIt
          .css({
            position: "absolute",
            top: "0.8rem",
            right: "1rem",
            fontSize: "2rem",
            color: "gray"
          })
          .hover(() => {
            beforeIt.css({
              textShadow: "3px 6px 3px #272634",
              color: "white"
            });
          },() => {
            beforeIt.css({
              textShadow: "none",
              color: "gray"
            });
          })
          .click(() => {
            var pictureId = item.attr('data-picture'),
            formData = new FormData(),
            myHeaders = new Headers(),
            myInit = {  method: 'POST',
                        body: formData,
                        headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        credentials: 'same-origin' 
                      };
            formData.append("pictureId", pictureId);
            // u got the id now just change its insertdate
            fetch('/deleteFile', myInit)
            .then((responseS) => {
              document.location.reload(true);
            });
          });
        item
          .click(() => {
            var pictureId = item.attr('data-picture'),
                formData = new FormData(),
                myHeaders = new Headers(),
                myInit = {  method: 'POST',
                            body: formData,
                            headers: myHeaders,
                            mode: 'cors',
                            cache: 'default',
                            credentials: 'same-origin' 
                          };

            formData.append("pictureId", pictureId);
            // u got the id now just change its insertdate
            fetch('/selectFile', myInit)
            .then((responseS) => {
              document.location.reload(true);
            });
          });
        item.append(afterIt);
        item.append(beforeIt);
        $gallery.append(item);
      });
    });
  }
  componentDidMount(){
    this.loadPicturesFromServer();
    
    // Upload Option
    function ekUpload(){
      function Init() {    
        var fileSelect    = document.getElementById('file-upload'),
            fileDrag      = document.getElementById('file-drag'),
            submitButton  = document.getElementById('submit-button');
        fileSelect.addEventListener('change', fileSelectHandler, false);
        // Is XHR2 available?
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {
          // File Drop
          fileDrag.addEventListener('dragover', fileDragHover, false);
          fileDrag.addEventListener('dragleave', fileDragHover, false);
          fileDrag.addEventListener('drop', fileSelectHandler, false);
        }
      }
    
      function fileDragHover(e) {
        var fileDrag = document.getElementById('file-drag');
        e.stopPropagation();
        e.preventDefault();
        fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
      }
    
      function fileSelectHandler(e) {
        // Fetch FileList object
        var files = e.target.files || e.dataTransfer.files;
        // Cancel event and hover styling
        fileDragHover(e);
        // Process all File objects
        for (var i = 0, f; f = files[i]; i++) {
          parseFile(f);
          uploadFile(f);
        }
      }
    
      // Output
      function output(msg) {
        // Response
        var m = document.getElementById('messages');
        m.innerHTML = msg;
      }
    
      function parseFile(file) {
        output(
          '<strong>' + encodeURI(file.name) + '</strong>'
        );
        var imageName = file.name;
        var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
        if (isGood) {
          document.getElementById('start').classList.add("hidden");
          document.getElementById('response').classList.remove("hidden");
          document.getElementById('notimage').classList.add("hidden");
          document.getElementById('file-image').classList.remove("hidden");
          document.getElementById('file-image').src = URL.createObjectURL(file);
        }
        else {
          document.getElementById('file-image').classList.add("hidden");
          document.getElementById('notimage').classList.remove("hidden");
          document.getElementById('start').classList.remove("hidden");
          document.getElementById('response').classList.add("hidden");
          document.getElementById("file-upload-form").reset();
        }
      }
    
      function setProgressMaxValue(e) {
        var pBar = document.getElementById('file-progress');
        if (e.lengthComputable) {
          pBar.max = e.total;
        }
      }
    
      function updateFileProgress(e) {
        var pBar = document.getElementById('file-progress');
        if (e.lengthComputable) {
          pBar.value = e.loaded;
        }
      }
    
      function uploadFile(file) {
        var fileInput = document.getElementById('class-roster-file'),
            pBar = document.getElementById('file-progress'),
            fileSizeLimit = 1024,
            formData = new FormData(); // In MB
        formData.append("uploadfile", file);
        if (file.size <= fileSizeLimit * 1024 * 1024){
          // Progress bar
          pBar.style.display = 'inline';
          $.ajax({
            xhr: function() {
              var xhr = new window.XMLHttpRequest();
              xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
              xhr.upload.addEventListener('progress', updateFileProgress, false);
              return xhr;
            },
            url: "/uploadFile",
            type: "POST",
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            success: function () {
              // Handle upload success
              document.location.reload(true);
            },
            error: function () {
              // Handle upload error
              $("#upload-file-message").text("File not uploaded (perhaps it's too much big)");
            }
          });
        }
      }
    
      // Check for the various File API support.
      if (window.File && window.FileList && window.FileReader) {
        Init();
      } else {
        document.getElementById('file-drag').style.display = 'none';
      }
    }
    ekUpload();
  
  }
  render() {
    return (
      <div className="picture modal fade" id="pictureModal" tabindex="-1" role="dialog" aria-labelledby="pictureModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="vehicleModalLabel">Update Picture</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <ul className="gallery"></ul>
                    <div className="lightbox" >
                      <figure></figure>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <form action="/uploadFile" method="POST" className="uploader" id="file-upload-form">
                      <input id="file-upload" type="file" name="fileUpload" accept="image/*"/>
                      <label for="file-upload" id="file-drag">
                        <img id="file-image" src="#" alt="Preview" className="hidden"/>
                        <div id="start">
                          <i className="fa fa-download" aria-hidden="true"></i>
                          <div>Select a file or drag here</div>
                          <div id="notimage" className="hidden">Please select an image</div>
                          <span id="file-upload-btn" className="btn btn-primary"><span className="js-fileName">Choose a file</span></span>
                        </div>
                        <div id="response" className="hidden">
                          <div id="messages" className="upload-file-message"></div>
                          <progress className="progress" id="file-progress" value="0">
                            <span>0</span>%
                          </progress>
                        </div>
                      </label>
                    </form>
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
/** Multistep **/
class MultiStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreviousBtn: false,
      showNextBtn: true,
      compState: 0,
      navState: this.getNavStates(0, this.props.steps.length)
    };
    this.hidden = {
      display: 'none'
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  getNavStates(indx, length) {
    let styles = [];
    for (let i=0; i<length; i++) {
      if(i < indx) {
        styles.push('done')
      }
      else if(i === indx) {
        styles.push('doing')
      }
      else {
        styles.push('todo')
      }
    }
    return { current: indx, styles: styles }
  }

  checkNavState(currentStep){
    if(currentStep > 0 && currentStep < this.props.steps.length - 1){
      this.setState({
        showPreviousBtn: true,
        showNextBtn: true
      })
    }
    else if(currentStep === 0) {
      this.setState({
        showPreviousBtn: false,
        showNextBtn: true
      })
    }
    else {
      this.setState({
        showPreviousBtn: true,
        showNextBtn: false
      })
    }
  }

  setNavState(next) {
    this.setState({navState: this.getNavStates(next, this.props.steps.length)})
    if (next < this.props.steps.length) {
      this.setState({compState: next})
    }
    this.checkNavState(next);
  }

  handleKeyDown(evt) {
    if (evt.which === 13) {
      this.next()
    }
  }

  handleOnClick(evt) {
    if (evt.currentTarget.value === (this.props.steps.length - 1) &&
      this.state.compState === (this.props.steps.length - 1)) {
      this.setNavState(this.props.steps.length)
    }
    else {
      this.setNavState(evt.currentTarget.value)
    }
  }

  next() {
    this.setNavState(this.state.compState + 1)
  }

  previous() {
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1)
    }
  }

  getClassName(className, i){
    return className + "-" + this.state.navState.styles[i];
  }

  renderSteps() {
    return this.props.steps.map((s, i)=> (
      <li className={this.getClassName("progtrckr", i)} onClick={this.handleOnClick} key={i} value={i}>
        <em>{i+1}</em>
        <span>{this.props.steps[i].name}</span>
      </li>
    ));
  }

  render() {
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="bookingModalLabel">Book a Control</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body" onKeyDown={this.handleKeyDown}>
          <ol className="progtrckr">
            {this.renderSteps()}
          </ol>
          {this.props.steps[this.state.compState].component}
        </div>
        <div className="modal-footer" style={this.props.showNavigation ? {} : this.hidden}>
          <button style={this.state.showPreviousBtn ? {} : this.hidden}
                  className="multistep__btn--prev btn btn-info"
                  onClick={this.previous}>Previous</button>
          <button style={this.state.showNextBtn ? {} : this.hidden}
                  className="multistep__btn--next btn btn-success"
                  onClick={this.next}>Next</button>
        </div>
      </div>
    );
  }
}
/** Multistep **/
const store = { 
  vehicle: '', 
  vehicles: [],
  centre: '',
  centres: [],
  date: '' 
}
class VehicleChoice extends Component {
  constructor(props){
    super(props);
    this.state = {
      store
    };
  }
  handleVehicleChanged(event) {
    // store updated
    var vehicle = $(event.target).find('span.cell--text--title');
    store.vehicle = vehicle.data('vehicle');
    this.setState(store);

    // animation du box
    if($(event.target).hasClass('cell')){
      if($(event.target).hasClass('cell--selected')){
        $(event.target).removeClass('cell--selected');
      }else{
        $('.cell').removeClass('cell--selected');
        $(event.target).toggleClass('cell--selected');
      }
    }else{
      if($(event.target).closest('.cell').hasClass('cell--selected')){
        $(event.target).closest('.cell').removeClass('cell--selected');
      }else{
        $('.cell').removeClass('cell--selected');
        $(event.target).closest('.cell').toggleClass('cell--selected');
      }
    }
  }
  render(){
    return(
      <div onClick={(event) => this.handleVehicleChanged(event)} className="cell" ng-repeat="c in color.colors">
        <p className="cell--text">
          <span className="cell--text--title" data-vehicle={this.props.vehicle.vehicleId}>{this.props.vehicle.vehicleBrand}</span>
          <br/>{this.props.vehicle.vehicleType}
        </p>
      </div>
    );
  }
}
class TvgChoice extends Component {
  constructor(props){
    super(props);
    this.state = {
      store
    };
  }
  handleCenterChanged(event) {
    // store updated
    var centre = $(event.target).find('span.cell--text--title');
    store.centre = centre.data('tvg');
    this.setState(store);
    console.log('mok');
    // animation du box
    if($(event.target).hasClass('cell')){
      if($(event.target).hasClass('cell--selected')){
        $(event.target).removeClass('cell--selected');
      }else{
        $('.cell').removeClass('cell--selected');
        $(event.target).toggleClass('cell--selected');
      }
    }else{
      if($(event.target).closest('.cell').hasClass('cell--selected')){
        $(event.target).closest('.cell').removeClass('cell--selected');
      }else{
        $('.cell').removeClass('cell--selected');
        $(event.target).closest('.cell').toggleClass('cell--selected');
      }
    }
  }
  render(){
    return(
      <div onClick={(event) => this.handleCenterChanged(event)} className="cell" ng-repeat="c in color.colors">
        <p className="cell--text">
          <span className="cell--text--title" data-tvg={this.props.tvg.tvgId}><b>{this.props.tvg.tvgLegalname}</b></span>
          <br/>{this.props.tvg.tvgCity}
        </p>
      </div>
    );
  }
}
class CentresByRegionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {store};
  }
  loadCentersFromServer(){
    var self = this;
    var myHeaders = new Headers();
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   credentials: 'same-origin' };
    fetch('/api/tvgs', myInit)
    .then((response) => response.json()) 
    .then((responseData) => {
      store.centres = [];
      self.setState(store);
      var region = $('#centresByRegionModal').data('region');
      var centersFoundByRegion = _.where(responseData._embedded.tvgs, {tvgRegion: region});
      centersFoundByRegion.forEach(function(tvg) {
        store.centres.push(<TvgChoice tvg={tvg} />);
        self.setState(store);
      });
    });
  }
  componentDidMount() {
    var self = this;
    $('#centresByRegionModal').on('shown.bs.modal', function () {
      self.loadCentersFromServer();
    });
  }
  render() {
    var centers = 'Nothing To Show Here :('
    if(this.state.store.centres != '' && this.state.store.centres != null)
      centers = this.state.store.centres;
    return (
      <div className="centresByRegion modal fade" id="centresByRegionModal" data-region="inada" tabindex="-1" role="dialog" aria-labelledby="centresByRegionModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="centresByRegionModalLabel"></h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="grid-cell">
                {centers}
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
class StepOne extends Component {
  constructor(props){
    super(props);
    this.state = {
      store
    };
  }
  loadVehiclesFromServer(){
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
      store.vehicles = [];
      self.setState(store);
      responseData.motorist.vehicle.forEach(function(vehicle) {
        store.vehicles.push(<VehicleChoice vehicle={vehicle} />);
        self.setState(store);
      });
    });
  }
  componentDidMount() {
    this.loadVehiclesFromServer();
  }
  render() {
    return (
      <div className="grid-cell">
        {this.state.store.vehicles}
      </div>
    );
  }
}
class StepTwo extends Component {
  constructor(props){
    super(props);
    this.state = {
      store
    };
  }
  componentDidMount(){
    var rsr = Raphael('map', '40%', '40%');
    rsr.setViewBox(0, 0, '1912', '1939' );
    var regions = [];
    
    // Tanger-Tétouan-Al Hoceïma
    var TangerTetouanAlhouceima = rsr.path("M1365.1,47.3l-8.2,28.8l-6.7,22.9l-11.8,32.6 l-7.7,19.8l9.8,2.8l8.2-2.1h6.2l8.2,6.2l12.1,0.8l7.2,0.3l-1.8,10.5l0.5,8l0.5,7.7l7.2,5.1l4.9-6.9l22.9,17.7l0.3,9.5l12.1,4.6 l7.8-3.7l7.8-4l-1.7-14.9l2.2-14.4h19.5l18-6.7l4.4,14.9l32.4,6.4l12.3-4.1l8.2-12.3l3.3,7.4l11,0.8l7.2-11.8l12.6,0.3l13.1-8.7 l-1-19.8l-1-19.3l-11.3-11l-38,15.1l-19.3-1l-38.8-12.6l-16.9-17.5l-12.1-13.4l-13.9-16.7l-4.6-5.9l-2.1-13.4l2.8-6.2l5.1-8.5 l-5.4,1.5l-4.1-3.1l-15.1,1l-9,10.5l-11-1.8l-7.2,8.5L1365.1,47.3z")
    TangerTetouanAlhouceima.attr({class:'tooltipTop', fill: '#FF0000','stroke-width': '0','stroke-opacity': '1','data-toggle':'tooltip','data-placement':'top','title':'Tooltip on top'}).data({'id': 'TangerTetouanAlhouceima', 'region': 'Tanger-Tetouan-Al Hoceima'});
    regions.push(TangerTetouanAlhouceima);
    
    // L'Oriental
    var Oriental = rsr.path("M1584.9,125.6l10.6-13.1l4.4-0.7l25.4,12.3 l18.9,0.7l7.3-5.1l4.4-8h7.3l8.7-21.8l6.5,19.6l-0.7,10.9l9.5,13.6l9.2-0.5l-8.7-13.4l15.4,12.3l9.8,4.1h9.8l9.8-11.3l13.9,4.6 l10.8,3.6l-0.5,7.7l15.9,12.8l10.3-2.6l-1,8.2l7.2,4.1l1.5,6.2l16.9,6.2l-10.3,15.9l8.7,14.4l7.2,1.5l-9.2,14.4l7.7,9.2l-1.5,11.3 l7.7,22.1l-4.1,26.7l3.1,10.8l-4.1,9.2l9.2,15.9l2.1,17.5l-5.1,16.9l8.2,17.5l11.8,12.3l2.6,11.8l-6.2,7.2l10.3,19.5l11.8-0.5 l35.9,27.7l-15.4,25.2l-2.1,11.8l9.2,16.9l-10.3,9.8l-30.8-9.2l-36.5,3.1l-21.1-6.2l-9.2,5.6l-0.5,7.7l-13.9-3.6l-2.6,9.8 l-14.4-15.4l-11.8,1.5l-8.7,7.7l-16.9-3.1l-14.9,10.3l8.2,5.1l-5.6,10.3l5.6,10.8l-12.3,8.7l-33.4,6.2l-5.1-6.7l18.5-9.8l-8.2-4.1 l-8.7-17.5l0.5-15.9l9.2-9.2l-24.6,8.2l-15.9-10.3l-13.9,12.3l2.6-11.8l-15.4-2.1l0.5-10.3l-3.6-11.3l-16.4-12.3l4.6-6.2l-10.4-8.2 l3.3-2.9v-5.8l8.4-8l4-12.3l15.3-18.5l2.5-6.9l13.8-13.1l14.5,5.4l15.6-0.7l14.9-6.5l16,1.1l0.7-6.2l14.9-1.5l-20.7-30.1l-12.7-8.7 l-12-0.4l-1.5-6.9l8.4-4.4l17.8-20l-1.8-5.8l-32.7-3.6l-5.1-6.5l-11.6-6.2l-31.2,35.2l-2.2,5.1l10.9,3.3l-12.3,13.8l-5.4-13.8 l-7.6,11.6l-4.7-7.3l-10.2-1.1l2.2-15.3l14.5-9.4l-4.4-7.6l9.1-7.6l6.9-16.7l1.5-24l-9.4-8.7l-2.5-7.6l9.1-0.7l-1.5-17.1l10.9-2.9 l0.4-19.6l9.4-0.7l5.1-13.8l1.1-13.4l-23.8-4.1L1584.9,125.6z")
    Oriental.attr({class:'tooltipTop', fill: '#FFCC00','stroke-width': '0','stroke-opacity': '1','data-toggle':'tooltip','data-placement':'top','title':'Tooltip on top'}).data({'id': 'Oriental', 'region': 'Oriental'});
    regions.push(Oriental);
    
    // Fès-Meknès
    var FesMeknes = rsr.path("M1587,164.6l-13.1,8.7l-12.6-0.3l-7.2,11.8 l-11-0.8l-3.3-7.4l-8.2,12.3l-12.3,4.1l-32.4-6.4l-4.4-14.9l-18,6.7H1445l-2.2,14.4l1.7,14.9l-15.7,7.7l-3.1,8.5l-22.6,6.2 L1418,247l-3.1,11.8l-12.8,8.2l-12.3-0.5l-3.1-2.6l2.1-7.7l-12.8-6.2l-11.3,13.4l11.8,12.3l13.4,7.2l-12.3,14.4l10.8,7.7l-9.2,16.4 v6.7l3.6,7.7l-10.3,8.2l13.4,9.2l14.4,3.1l10.3,7.2l-3.1,9.8l12.8,16.4l12.8-3.1l-5.1,10.3l1.5,10.3l8.2,10.8l6.2-7.8l9.4,4 l6.5-18.5l9.8,1.1l7.3-5.8l12.3,10.2l0.4,7.6l-3.3,10.9l18.9,3.6l10.9-5.4l14.9,16l8.7,13.4l5.8,10.9l12,0.4l7.3-10.5l1.5,8.7 l3.3-1.1l3.3-2.9v-5.8l8.4-8l4-12.3l15.3-18.5l2.5-6.9l13.8-13.1l14.5,5.4l5.4,1.1l4.7-2.2l5.4,0.4l14.9-6.5l16,1.1l0.7-6.2 l14.9-1.5l-20.7-30.1l-12.7-8.7l-12-0.4l-1.5-6.9l3.3-2.9l5.1-1.5l17.8-20l-1.8-5.8l-32.7-3.6l-5.1-6.5l-5.4-2.9l-6.2-3.3l-16,20 l-9.4,10.5l-5.8,4.7l-2.2,5.1l10.9,3.3l-12.3,13.8l-5.4-13.8l-7.6,11.6l-4.7-7.3l-10.2-1.1l2.2-15.3l14.5-9.4l-4.4-7.6l9.1-7.6 l6.9-16.7l1.5-24l-9.4-8.7l-2.5-7.6l9.1-0.7l-1.5-17.1l10.9-2.9l0.4-19.6l9.4-0.7l5.1-13.8l1.1-13.4L1587,164.6z")
    FesMeknes.attr({class:'tooltipTop', fill: '#9832FF','stroke-width': '0','stroke-opacity': '1','data-toggle':'tooltip','data-placement':'top','title':'Tooltip on top'}).data({'id': 'FesMeknes', 'region': 'Fès-Meknès'});
    regions.push(FesMeknes);
    
    // Rabat-Salé-Kénitra
    var RabatSaleKenitra = rsr.path("M1330.7,151.3l-14.4,36.2l-9.8,19l-19.5,35.4 l-13.4,23.1l-4.6,8.2l-2.1,3.6l-18.5,13.4l-15.4,10.3l1.5,2.6l9.2,1.5l5.6,27.2l11.3-4.1l3.1,5.1l12.3,2.6l-6.7,8.2l4.1,6.2 l-4.6,10.3v14.4l18.5,3.1l13.4,9.8l17.5-13.9l-8.7-6.7l6.7-11.3l2.1-11.3l19,5.1l-5.1,13.4l9.2-2.1l6.7,8.7l14.4-4.6l15.4,2.1 l-5.6-22.6l10.3-8.2l-3.6-7.7v-6.7l9.2-16.4l-10.8-7.7l12.3-14.4l-13.4-7.2l-11.8-12.3l11.3-13.4l12.8,6.2l-2.1,7.7l3.1,2.6 l12.3,0.5l12.8-8.2l3.1-11.8l-14.9-16.9l22.6-6.2l3.1-8.5l-12.1-4.6l-0.3-9.5l-22.9-17.7l-4.9,6.9l-7.2-5.1l-1-15.7l1.8-10.5 l-19.3-1l-8.2-6.2h-6.2l-8.2,2.1L1330.7,151.3z")
    RabatSaleKenitra.attr({class:'tooltipTop', fill: '#00FFFF','stroke-width': '0','stroke-opacity': '1','data-toggle':'tooltip','data-placement':'top','title':'Tooltip on top'}).data({'id': 'RabatSaleKenitra', 'region': 'Rabat-Salé-Kénitra'});
    regions.push(RabatSaleKenitra);
    
    // Béni Mellal-Khénifra
    var BenimellalKhenifra = rsr.path("M1269.1,374.4l-8.2,2.1l-3.6,29.3h-6.7 l-8.7,34.4l5.6,9.2l0.5,13.4l-6.2,21.6l-6.2,5.6l2.6,18l-2.6,15.9l8.7,11.3l-3.1,9.8l8.2,5.6l-5.6,10.8l-13.9,3.1l-9.2-6.7 l-11.3,13.9l8.7,2.6l6.7,11.8h9.8l-6.7,18.5l5.6,9.8l9.2-6.7l4.1,8.7l28.8-3.1l0.5-20.5l13.4,4.1l12.3-7.2l6.2,1.5l12.3-11.8 l27.2-7.7l15.9-18.5l7.7,1l6.7-11.3l-3.6-8.2l-6.7-1.5l5.6-14.4l13.9-0.5l5.6-13.9l11.3-2.1l12.8,4.6l-6.6-8.3l3.8-8.6l-10.6-2.7 l4.7-11.4l11.3-0.7l-0.5-12.3l7.7,3.6l6.2-13.9l-2.1-22.6l6.7-11.8l-8.2-10.8l-1.5-10.3l5.1-10.3l-12.8,3.1l-12.8-16.4l3.1-9.8 l-10.3-7.2l-14.4-3.1l-13.4-9.2l5.6,22.6l-15.4-2.1l-14.4,4.6l-6.7-8.7l-9.2,2.1l5.1-13.4l-19-5.1l-2.1,11.3l-6.7,11.3l8.7,6.7 l-17.5,13.9l-13.4-9.8L1269.1,374.4z")
    BenimellalKhenifra.attr({class:'tooltipTop', fill: '#EB0000','stroke-width': '0','stroke-opacity': '1','data-toggle':'tooltip','data-placement':'top','title':'Tooltip on top'}).data({'id': 'BenimellalKhenifra', 'region': 'Béni Mellal-Khénifra'});
    regions.push(BenimellalKhenifra);
    
    // Casablanca-Settat
    var CasablancaSettat = rsr.path("M1233.2,300.5l-10.1,0.1l-10.9,12.3l-7.6,5.4 l-13.8,9.1l-12.7-2.5l-47.9,27.6l-17.1,1.1l-18.2,19.2l-11.6-7.3l-8.7,12l-4,14.9l-12.7,12.3l-10.5,10.5l-8.4,5.8l-10.5,9.8 l8.7,11.3v3.3l-5.8,1.5l-1.1,5.4l13.8,12.3l24.7-4.7l8.4,9.4l-1.5,9.1l5.4,10.2h5.8l12.7-2.5l2.5-9.4l8.7-1.5l24.7-17.4l-8.4-12 l6.9-5.4l1.1-10.2l3.3-9.4l8,12.7l5.1,12l17.8,3.3l6.2,15.6l2.5,4.4l7.6,7.6l23.2-5.4l2.9,9.8l15.6,8l8.4,1.3l6.2-5.6l6.2-21.6 l-0.5-13.4l-5.6-9.2l8.7-34.4h6.7l3.6-29.3l0,0l8.2-2.1V360l4.6-10.3l-4.1-6.2l6.7-8.2l-12.3-2.6l-3.1-5.1l-11.3,4.1l-5.6-27.2 l-9.2-1.5L1233.2,300.5z")
    CasablancaSettat.attr({class:'tooltipTop', fill: '#0000E1','stroke-width': '0','stroke-opacity': '1','data-toggle':'tooltip','data-placement':'top','title':'Tooltip on top'}).data({'id': 'CasablancaSettat', 'region': 'Casablanca-Settat'});
    regions.push(CasablancaSettat);
    
    // Marrakech-Safi
    var MarrakechSafi = rsr.path("M1028.4,430.9l-12.3,17.8l-13.8,4.4l7.3,11.6 l-10.9,17.4l7.3,5.1l-5.1,8.7l3.6,6.5l-8,8.7l-3.6,12.3l-37,37.8l1.5,15.3l-26.1,23.2l10.9,8.7l-7.3,24.7l0.7,26.1l5.1,5.8l2.9,16 l11.6-1.5l4.4-9.4l5.8-5.1l7.3,10.2l17.4-9.4l8,15.3l4.4-2.2l0.7-5.1l3.6,2.2l18.2,2.9l2.9-10.9l16.7-13.1l7.3,10.2l-2.2,13.1 l11.6-8l24,1.5l8.7,4.4l22.5-13.8l16,9.4l4.4-3.6l5.1-15.3l18.2-16l7.3,1.5l16.7-10.9l12.3-0.7l4.4-6.5h8l14.5-5.8l-2.2-11.6 l7.2,1.8l6.7-18.5h-9.8l-6.7-11.8l-8.7-2.6l11.3-13.9l9.2,6.7l13.9-3.1l5.6-10.8l-8.2-5.6l3.1-9.8l-8.7-11.3l2.6-15.9l-2.6-18 l-8.4-1.3l-15.6-8l-2.9-9.8l-23.2,5.4l-7.6-7.6l-2.5-4.4l-6.2-15.6l-17.8-3.3l-5.1-12l-8-12.7l-3.3,9.4l-1.1,10.2l-6.9,5.4l8.4,12 l-24.7,17.4l-8.7,1.5l-2.5,9.4l-12.7,2.5h-5.8l-5.4-10.2l1.5-9.1l-8.4-9.4l-24.7,4.7l-13.8-12.3l1.1-5.4l5.8-1.5v-3.3L1028.4,430.9 z")
    MarrakechSafi.attr({class:'tooltipTop', fill: '#00DF39','stroke-width': '0','stroke-opacity': '1','data-toggle':'tooltip','data-placement':'top','title':'Tooltip on top'}).data({'id': 'MarrakechSafi', 'region': 'Marrakesh-Safi'});
    regions.push(MarrakechSafi);
    
    // Drâa-Tafilalet
    var DraaTafilalet = rsr.path("M1437.5,418l-6.7,11.8l2.1,22.6l-6.2,13.9 l-7.7-3.6l0.5,12.3l-11.3,0.7l-4.7,11.4l10.6,2.7l-3.8,8.6l6.6,8.3l-12.8-4.6l-11.3,2.1l-5.6,13.9l-13.9,0.5l-5.6,14.4l6.7,1.5 l3.6,8.2l-6.7,11.3l-7.7-1l-15.9,18.5l-27.2,7.7l-12.3,11.8l-6.2-1.5l-12.3,7.2l-13.4-4.1l-0.5,20.5l-28.8,3.1l-4.1-8.7l-9.2,6.7 l-5.6-9.8l-7.2-1.8l2.2,11.6l-14.5,5.8h-8l-4.4,6.5l-12.3,0.7l-16.7,10.9l-5.8,8l-0.5,6l9.3,0.5l-5.1,4.7l-0.4,19.2l13.4-0.4 l-5.1,2.5l-8.5,14l15.4,0.2l-0.5,9.4l11.1,14.3l-9.3,1.1l-2.9,6.2l-11.3,2.4l1.5,10.7l0.9,1.8l4.4-3.8l7.3,14.5l-7.6,9.3l16.9-0.2 l4,5.3l3.4,0.7l5.1-2.5l10,8.9l0.2-3.4l-3.4-10.2l5.1-3.8l5.4-9.8l4-10.3l16.2,14.2l13.3-7.8l4.7,4.2l0.7-16.5l5.6,4.9l16.2-8.9 l2.4,11.8l10.2,0.7l7.6,9.3l-10.7,10l-0.2,6.5l8.9,6.9l-0.7,3.6l-5.8,6.7l4,5.8l8.2-4.4l8.4,2.4l-14.2,15.6l5.6,10.2l-7.4,9.4 l7.6,6.9l-2.7,20.2l1.3,2l18.3,2l6.7,6l17.8,0.5l26.5-5.3l1.6-6.2l7.8,0.5l-3.3,8.7l12.3-1.5l-1.3,8.5l9.1,0.5l1.5-7.3l0.2-4.2 l10.3-21.8l12.9-10.9l6.5-11.1l9.8-3.4l1.5-9.4l15.3-8.4l8.7-11.3l79-53.7l46.5-10.3l0.2-9.3l26.9-33l5.8-13.1l-5.4,1.6l-6.4-3.4 l-2-9.3l-6.5,4.4l-2.7-7.4l-8.9,2.5l5.6-13.8l-3.6-15.1l11.6-2.4l-2.9-12.2l4.7-5.6l7.3,5.8l20.5-13.3l4.7-8.5h28.9l0.2-9.1 l-12.8,2.2l-5.1-6.7l18.5-9.8l-8.2-4.1l-8.7-17.5l0.5-15.9l9.2-9.2l-24.6,8.2l-15.9-10.3l-13.9,12.3l2.6-11.8l-15.4-2.1l0.5-10.3 l-3.6-11.3l-16.4-12.3l4.6-6.2l-10.4-8.2l-3.3,1.1l-1.5-8.7l-7.3,10.5l-12-0.4l-5.8-10.9l-8.7-13.4l-14.9-16l-10.9,5.4l-18.9-3.6 l3.3-10.9l-0.4-7.6l-12.3-10.2l-7.3,5.8l-9.8-1.1l-6.5,18.5l-9.4-4L1437.5,418z")
    DraaTafilalet.attr({class:'tooltipTop', fill: '#FF6600','stroke-width': '0','stroke-opacity': '1','data-toggle':'tooltip','data-placement':'top','title':'Tooltip on top'}).data({'id': 'DraaTafilalet', 'region': 'Drâa-Tafilalet'});
    regions.push(DraaTafilalet);
    
    // Souss-Massa
    var SoussMassa = rsr.path("M1167.1,638.2l-5.8,8l-0.5,6l9.3,0.5 l-5.1,4.7l-0.4,19.2l13.4-0.4l-5.1,2.5l-8.5,14l15.4,0.2l-0.5,9.4l11.1,14.3l-9.3,1.1l-2.9,6.2l-11.3,2.4l1.5,10.7l0.9,1.8l4.4-3.8 l7.3,14.5l-7.6,9.3l16.9-0.2l4,5.3l3.4,0.7l5.1-2.5l10,8.9l0.2-3.4l-3.4-10.2l5.1-3.8l5.4-9.8l4-10.3l16.2,14.2l13.3-7.8l4.7,4.2 l0.7-16.5l5.6,4.9l16.2-8.9l2.4,11.8l10.2,0.7l7.6,9.3l-10.7,10l-0.2,6.5l8.9,6.9l-0.7,3.6l-5.8,6.7l4,5.8l8.2-4.4l8.4,2.4 l-14.2,15.6l5.6,10.2l-7.4,9.4l7.6,6.9l-2.7,20.2l-13.6,1.3l-7.4,7.3l-18.5-1.3l-32.3-5.8l-27.1,12.7l-18.9,3.4l-37.2,22.9 l-72.1,55.4l-20.3,11.1l-1.8,48.5l-27.4-35.8l-0.7-10.7l-12.5-4.2v-10.5l-7.3,2.4l-4-8.2l6.7-14l-10.7,1.5l2.2-8l-5.8-4l-0.5-8.2 l12-4l-0.4-7.1l5.1-0.9v-10l-5.8-6.2l-0.9-9.1l-1.5-6.4l-10.2-13.1l-12.5-1.3l-5.8,10.9l-4.4-6l-3.1,6.7l-5.1-10.2l-10.7,9.6 l-6.5-7.8l-13.1,7.4l-7.4-5.1l-1.5-17.1l-9.3,8.4l-5.1-16.2l20.9-19.2l19.6-35.9l9.6-38.1l-0.5-4.5l-18.7-21.2l-9.4-5.4l3.1-7.6 l2.5-8.2l4-9.6l-1.8-14.5l5.1,5.8l2.9,16l11.6-1.5l4.4-9.4l5.8-5.1l7.3,10.2l17.4-9.4l8,15.3l4.4-2.2l0.7-5.1l21.8,5.1l2.9-10.9 l16.7-13.1l7.3,10.2l-2.2,13.1l11.6-8l24,1.5l8.7,4.4l22.5-13.8l16,9.4l4.4-3.6l5.1-15.3l18.2-16L1167.1,638.2z")
    SoussMassa.attr({class:'tooltipTop', fill: '#808000','stroke-width': '0','stroke-opacity': '1','data-toggle':'tooltip','data-placement':'top','title':'Tooltip on top'}).data({'id': 'SoussMassa', 'region': 'Souss-Massa'});
    regions.push(SoussMassa);
    
    // Guelmim-Oued Noun
    var GoulmimOuedNoun = rsr.path("M906.2,823.8l5.1,16.2l9.3-8.4l1.5,17.1 l7.4,5.1l13.1-7.4l6.5,7.8l10.7-9.6l5.1,10.2l3.1-6.7l4.4,6l5.8-10.9l12.5,1.3l10.2,13.1l1.5,6.4l0.9,9.1l5.8,6.2v10l-5.1,0.9 l0.4,7.1l-12,4l0.5,8.2l5.8,4l-2.2,8l10.7-1.5l-6.7,14l4,8.2l7.3-2.4V950l12.5,4.2l0.7,10.7l27.4,35.8l-4.1,171.3l-12.8-2.1 l-17.5-7.7l-34.4-55.5l-7.2-2.1l-7.2,7.7l-15.4,0.5l-22.6-7.2l-16.4-27.7l-19,4.6l-9.8-6.7l-10.8-14.4l-2.6-1.5l-14.9-2.6 l-15.4,4.4l-6.7-3.9l-55.5-1.3l-10.5,6.4l-18.2-9.8l-23.6-1l-11.3-29.5l-9.8-10.5L703,995l36.2-11.6l8-15.9l18.7-19.3l13.4-5.6 l6.4-12.1l32.6-12.3l8.5-3.9l24.9-15.1l17.5-25.2l16.2-6.7l1.3-9.5l7.4-5.9l5.1-7.7L906.2,823.8z")
    GoulmimOuedNoun.attr({class:'tooltipTop', fill: '#C83737','stroke-width': '0','stroke-opacity': '1','data-toggle':'tooltip','data-placement':'top','title':'Tooltip on top'}).data({'id': 'GoulmimOuedNoun', 'region': 'Guelmim-Oued Noun'});
    regions.push(GoulmimOuedNoun);
    
    // Laâyoune-Sakia El Hamra
    var LaayouneSakiaElhamra = rsr.path("M1048.3,1171.9l-5.6,122.2l-377.9-17.5 l-10.3,192.1l-22.6-7.2l-39,9.2l-45.2-16.4h-32.9l-22.6-6.2l-26.7,14.4l-60.6-20.5l-10.3,6.2l-12.3-3.1l-5.1,7.7l-8.7-7.2 l-15.9,10.3l-6.7-7.7l-4.1-12.8l-6.7-6.2l-9.8,3.6l-7.2-8.7l0.5-15.4l7.7-15.4l3.6-15.4l-6.2-14.4l6.7-9.8l-1-7.2l7.7-16.9 l9.8-10.3l3.6-16.9l4.6-4.6l0.5-12.8l11.3-8.2l9.8-17.2l-2.1-16.4l5.9-12.6l11.3-4.9l6.4,2.8l14.4-10.8l2.1-9.2l12.6,2.3l35.4-17.2 l11.8-10.3l9.8-7.2l10.8-25.2l10.3-16.2l1.3-14.6l17.7-15.4l13.1-49l14.6-4.1l15.4-27.2l63.2-7.7l10.8-2.6l30.8-8l30.8-11l3.9,17.2 l9.8,10.5l11.3,29.5l23.6,1l18.2,9.8l10.5-6.4l55.5,1.3l6.7,3.9l15.4-4.4l14.9,2.6l2.6,1.5l10.8,14.4l9.8,6.7l19-4.6l16.4,27.7 l22.6,7.2l15.4-0.5l7.2-7.7l7.2,2.1l34.4,55.5l17.5,7.7L1048.3,1171.9z")
    LaayouneSakiaElhamra.attr({class:'tooltipTop', fill: '#008000','stroke-width': '0','stroke-opacity': '1','data-toggle':'tooltip','data-placement':'top','title':'Tooltip on top'}).data({'id': 'LaayouneSakiaElhamra', 'region': 'Laâyoune-Sakia El Hamra'});
    regions.push(LaayouneSakiaElhamra);
    
    // Dakhla-Oued Ed-Dahab
    var DakhlaOuedEddahab = rsr.path("M654.5,1468.7l-8,130.3l-18.9,1.5 l-24.7,13.8l-23.2,2.2l-25.4,17.4l-32.7,13.8l-16,33.4l7.3,28.3l2.9,152.5l-471.3-31.2l-8,29.8L27,1875l0.7,24.7l-4.4-0.7l-4.4-5.1 l2.2-4.4l-1.5-11.6l2.2-8l8-15.3l4.4-27.6l2.9-12.3l7.3-22.5l-3.8-11.8l7.4-3.1l-2.3-7.7l6.7-7.7l12.6-31.6l7.7-4.1l3.3-9.2 l10.3-7.7l6.9,5.1l10-1.3l9.2-12.6l3.1-15.4l10-3.6l1.5-26.7l8.5-6.7l-1.8-6.4l3.9-6.4l13.6-1.3l6.7-12.1l-8.2-9.5l9.5-11.3 l9.8-15.4l14.6-13.4l-3.1-10l18.7-18l8-9l7.4-12.6l-2.1-7.2l-8.2,2.6l-15.9,24.4l-8.7,3.6v-5.9l8.7-10.5l6.7-11.8l10.8-10.5 l26.7-4.4l0.3-10l21.6-19l12.8-3.6l0.5-7.7l17.5-15.9l17.2-6.2l4.4-11l11.3-5.6l7.2,8.7l9.8-3.6l6.7,6.2l4.1,12.8l6.7,7.7 l15.9-10.3l8.7,7.2l5.1-7.7l12.3,3.1l10.3-6.2l60.6,20.5l26.7-14.4l22.6,6.2h32.9l45.2,16.4l39-9.2L654.5,1468.7z")
    DakhlaOuedEddahab.attr({class:'tooltipTop', fill: '#FF00FF','stroke-width': '0','stroke-opacity': '1','data-toggle':'tooltip','data-placement':'top','title':'Tooltip on top'}).data({'id': 'DakhlaOuedEddahab', 'region': 'Dakhla-Oued Ed-Dahab'});
    regions.push(DakhlaOuedEddahab);
    
    var rsrGroups = [regions];
    
    for (var i = 0; i < regions.length; i++) {
      regions[i].node.style.opacity = 0.4;
      // Showing off
      regions[i].mouseover(function(e){
        this.node.style.opacity = 0.8;
        this.node.style.cursor = 'pointer';
        this.node.childNodes[0].innerHTML = this.data('region');
      });
      regions[i].mouseout(function(e){
        if(this.node.style.opacity != 1){
          this.node.style.opacity = 0.4;
        }
      });
      // Clicking
      regions[i].click(function(e){
        this.node.style.opacity = 1;
        var region = this.data('region');
        $('#centresByRegionModal').data('region', region);
        $('#centresByRegionModal').modal('show');
      });
    }
  }
  render() {
    return (
      <div className="container">
        <div id="map" className="container"></div>
      </div>
    );
  }
}
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: []
    }
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
      this.setState({
        account: responseData
      });
    });
  }
  componentDidMount() {
    this.loadAccountFromServer();
  }
  render() {
    const steps = [
      {name: 'Vehicle', component: <StepOne/>},
      {name: 'Centre', component: <StepTwo/>}
    ];
    return (
      <div className="booking modal fade" id="bookingModal" tabindex="-1" role="dialog" aria-labelledby="bookingModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <MultiStep showNavigation={true} initialStep={1} steps={steps}/>
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
      picture = '../media/pictures/'+this.state.motoristPicture.pictureName+'.'+this.state.motoristPicture.pictureExtension;
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
            <div className="card__image" id="card-2" style={{backgroundImage: "url(" + picture + ")"}}>
              <div className="image-overlay"></div>
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
        <form data-ajax="false" className="sessionVariables" action="/authRedirection" method="post"></form>
        {this.state.ContentTOP}
        {this.state.ContentBOTTOM}
      </div>
    );
  }
}
class ReservationContent extends Component {  
  constructor(props){
    super(props);
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
        console.log('Ready To Work Sir !');
      }else{
        $('.sessionVariables').submit();
      }
    });
  }
  componentDidMount() {
    this.loadAccountFromServer();

    var lamps__one = new TimelineMax();
    var light__one = $('polygon.light__one');
    lamps__one.pause();
    lamps__one.from(light__one, 0.5, {
      opacity: 0,
    })
    .to(light__one, 2.5, {
      opacity: 1
    });

    var lamps__two = new TimelineMax();
    var light__two = $('polygon.light__two');
    lamps__two.pause();
    lamps__two.from(light__two, 0.5, {
      opacity: 0,
    })
    .to(light__two, 2.5, {
      opacity: 1
    });

    var lamps__three = new TimelineMax();
    var light__three = $('polygon.light__three');
    lamps__three.pause();
    lamps__three.from(light__three, 0.5, {
      opacity: 0,
    })
    .to(light__three, 2.5, {
      opacity: 1
    });

    $(".card__one").hover(
      function() {
        lamps__one.play();
      }, function() {
        lamps__one.reverse(-3);
      }
    );
    $(".card__two").hover(
      function() {
        lamps__two.play();
      }, function() {
        lamps__two.reverse(-3);
      }
    );
    $(".card__three").hover(
      function() {
        lamps__three.play();
      }, function() {
        lamps__three.reverse(-3);
      }
    );
  }
  render() {
    var svgString__one = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 612 792" style="enable-background:new 0 0 612 792;" xml:space="preserve">		<rect class="st0-lamp" x="306" width="4" height="100"/>	<lineargradient class="light__one" gradientunits="userSpaceOnUse" id="SVGID_1_" x1="203.9277" x2="203.9277" y1="569.7373" y2="203.0005">		<stop  offset="0" style="stop-color:#F4E6AB;stop-opacity:0"></stop>		<stop  offset="1" style="stop-color:#F4E6AB"></stop>	</lineargradient>	<polygon class="st2-lamp light__one" points="512.3,506.8 354.4,140.1 308.4,140.1 262.1,140.1 104.4,506.6 "/>	<g>		<polygon class="st1-lamp" points="354.2,137.5 308.8,137.5 263.3,137.5 253.1,161.5 308.8,161.5 364.4,161.5 	"/>		<path class="st0-lamp" d="M367.4,163.5H250.1l11.9-28h93.6L367.4,163.5z M256.1,159.5h105.3l-8.5-20h-88.3L256.1,159.5z"/>	</g>	<g>		<polygon class="st1-lamp" points="317.9,102 308.8,102 299.6,102 292.2,137 308.8,137 325.3,137 	"/>		<path class="st0-lamp" d="M327.8,139h-38l8.2-39h21.6L327.8,139z M294.7,135h28.2l-6.5-31h-15.1L294.7,135z"/>	</g>	<path class="st3-lamp" d="M353.3,155.7c-0.6,0-1.1-0.3-1.4-0.9l-3.7-8.7h-21c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h23l4.5,10.5c0.3,0.8,0,1.6-0.8,2		C353.7,155.6,353.5,155.7,353.3,155.7z"/>	<path class="st3-lamp" d="M315.4,125.5c-0.7,0-1.3-0.5-1.5-1.2l-3.2-15c-0.2-0.8,0.3-1.6,1.2-1.8c0.8-0.2,1.6,0.3,1.8,1.2l3.2,15		c0.2,0.8-0.3,1.6-1.2,1.8C315.6,125.5,315.5,125.5,315.4,125.5z"/></svg>';
    var svgString__two = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 612 792" style="enable-background:new 0 0 612 792;" xml:space="preserve">		<rect class="st0-lamp" x="306" width="4" height="100"/>	<lineargradient class="light__two" gradientunits="userSpaceOnUse" id="SVGID_1_" x1="203.9277" x2="203.9277" y1="569.7373" y2="203.0005">		<stop  offset="0" style="stop-color:#F4E6AB;stop-opacity:0"></stop>		<stop  offset="1" style="stop-color:#F4E6AB"></stop>	</lineargradient>	<polygon class="st2-lamp light__two" points="512.3,506.8 354.4,140.1 308.4,140.1 262.1,140.1 104.4,506.6 "/>	<g>		<polygon class="st1-lamp" points="354.2,137.5 308.8,137.5 263.3,137.5 253.1,161.5 308.8,161.5 364.4,161.5 	"/>		<path class="st0-lamp" d="M367.4,163.5H250.1l11.9-28h93.6L367.4,163.5z M256.1,159.5h105.3l-8.5-20h-88.3L256.1,159.5z"/>	</g>	<g>		<polygon class="st1-lamp" points="317.9,102 308.8,102 299.6,102 292.2,137 308.8,137 325.3,137 	"/>		<path class="st0-lamp" d="M327.8,139h-38l8.2-39h21.6L327.8,139z M294.7,135h28.2l-6.5-31h-15.1L294.7,135z"/>	</g>	<path class="st3-lamp" d="M353.3,155.7c-0.6,0-1.1-0.3-1.4-0.9l-3.7-8.7h-21c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h23l4.5,10.5c0.3,0.8,0,1.6-0.8,2		C353.7,155.6,353.5,155.7,353.3,155.7z"/>	<path class="st3-lamp" d="M315.4,125.5c-0.7,0-1.3-0.5-1.5-1.2l-3.2-15c-0.2-0.8,0.3-1.6,1.2-1.8c0.8-0.2,1.6,0.3,1.8,1.2l3.2,15		c0.2,0.8-0.3,1.6-1.2,1.8C315.6,125.5,315.5,125.5,315.4,125.5z"/></svg>';
    var svgString__three = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 612 792" style="enable-background:new 0 0 612 792;" xml:space="preserve">		<rect class="st0-lamp" x="306" width="4" height="100"/>	<lineargradient class="light__three" gradientunits="userSpaceOnUse" id="SVGID_1_" x1="203.9277" x2="203.9277" y1="569.7373" y2="203.0005">		<stop  offset="0" style="stop-color:#F4E6AB;stop-opacity:0"></stop>		<stop  offset="1" style="stop-color:#F4E6AB"></stop>	</lineargradient>	<polygon class="st2-lamp light__three" points="512.3,506.8 354.4,140.1 308.4,140.1 262.1,140.1 104.4,506.6 "/>	<g>		<polygon class="st1-lamp" points="354.2,137.5 308.8,137.5 263.3,137.5 253.1,161.5 308.8,161.5 364.4,161.5 	"/>		<path class="st0-lamp" d="M367.4,163.5H250.1l11.9-28h93.6L367.4,163.5z M256.1,159.5h105.3l-8.5-20h-88.3L256.1,159.5z"/>	</g>	<g>		<polygon class="st1-lamp" points="317.9,102 308.8,102 299.6,102 292.2,137 308.8,137 325.3,137 	"/>		<path class="st0-lamp" d="M327.8,139h-38l8.2-39h21.6L327.8,139z M294.7,135h28.2l-6.5-31h-15.1L294.7,135z"/>	</g>	<path class="st3-lamp" d="M353.3,155.7c-0.6,0-1.1-0.3-1.4-0.9l-3.7-8.7h-21c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h23l4.5,10.5c0.3,0.8,0,1.6-0.8,2		C353.7,155.6,353.5,155.7,353.3,155.7z"/>	<path class="st3-lamp" d="M315.4,125.5c-0.7,0-1.3-0.5-1.5-1.2l-3.2-15c-0.2-0.8,0.3-1.6,1.2-1.8c0.8-0.2,1.6,0.3,1.8,1.2l3.2,15		c0.2,0.8-0.3,1.6-1.2,1.8C315.6,125.5,315.5,125.5,315.4,125.5z"/></svg>';
    return (
      <div className="reservation-content row">
        <form data-ajax="false" className="sessionVariables" action="/authRedirection" method="post"></form>
        <div className="col">
          <div data-toggle="modal" data-target="#bookingModal" className="card card__one">
            <div className="lamp">
              <div dangerouslySetInnerHTML={{ __html: svgString__one }} className="lamp lamp--left">
              </div>
            </div>
            <div className="calendar">
              <svg version="1.1" width="100%" height="50%" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 5000 6000" style={{enableBackground: 'new 0 0 5000 6000'}} xmlSpace="preserve">
                <g id="Layer_2"></g>
                <g id="Layer_1">
                  <path className="st0" d="M3735.3,2974.2H1083c-146,0-265.5-119.5-265.5-265.5V531.9c0-236.8,193.7-430.5,430.5-430.5h2322.2c236.8,0,430.5,193.7,430.5,430.5v2176.8C4000.8,2854.8,3881.3,2974.2,3735.3,2974.2z"/>
                  <path className="st1" d="M4000.8,848.1H817.5V531.9c0-236.8,193.7-430.5,430.5-430.5h2322.2c236.8,0,430.5,193.7,430.5,430.5V848.1z"/>
                  <path className="st2" d="M1335.5,318.6L1335.5,318.6c-35.6,0-64.8-29.1-64.8-64.8V101.4h129.5v152.5 C1400.3,289.5,1371.2,318.6,1335.5,318.6z"/>
                  <path className="st2" d="M2101.8,318.6L2101.8,318.6c-35.6,0-64.8-29.1-64.8-64.8V101.4h129.5v152.5 C2166.6,289.5,2137.4,318.6,2101.8,318.6z"/>
                  <path className="st2" d="M2818.5,318.6L2818.5,318.6c-35.6,0-64.8-29.1-64.8-64.8V101.4h129.5v152.5 C2883.3,289.5,2854.1,318.6,2818.5,318.6z"/>
                  <path className="st2" d="M3540.3,318.6L3540.3,318.6c-35.6,0-64.8-29.1-64.8-64.8c0,0,0-141.3,0-152.5c0-10.2,129.5,1.4,129.5,1.4  v151.1C3605,289.5,3575.9,318.6,3540.3,318.6z"/>
                  <path className="st3" d="M2076.3,296.8L2076.3,296.8c-35.6,0-64.8-29.1-64.8-64.8V65.1c0-35.6,29.1-64.8,64.8-64.8h0 c35.6,0,64.8,29.1,64.8,64.8v166.9C2141,267.7,2111.9,296.8,2076.3,296.8z"/>
                  <path className="st3" d="M2796.6,296.8L2796.6,296.8c-35.6,0-64.8-29.1-64.8-64.8V65.1c0-35.6,29.1-64.8,64.8-64.8h0 c35.6,0,64.8,29.1,64.8,64.8v166.9C2861.3,267.7,2832.2,296.8,2796.6,296.8z"/>
                  <path className="st3" d="M3516.9,296.8L3516.9,296.8c-35.6,0-64.8-29.1-64.8-64.8V65.1c0-35.6,29.1-64.8,64.8-64.8h0 c35.6,0,64.8,29.1,64.8,64.8v166.9C3581.6,267.7,3552.5,296.8,3516.9,296.8z"/>
                  <path className="st4" d="M3732.2,2174.4l-753,791.7c0,0,28.5-139.4,28.7-227c0.1-55.6-11.2-104.2-15.1-184.1 c-10.7-224.1,119.1-281.2,180.3-314.4c94-50.9,248.1-13.2,341-19.3C3553.5,2218.9,3703,2212.3,3732.2,2174.4z"/>
                  <path className="st5" d="M3981.7,2124.6l-1002.4,841.6c0,0,49.8-160,59.7-262.6c6.2-65.2-2.3-123.3,1.7-217.3  c11.4-263.8,175.5-315.8,253.7-347.7c119.9-48.9,303.3,12.8,417,16.3C3759.4,2156.3,3941.9,2165.7,3981.7,2124.6z"/>
                  <rect x="1146" y="1265.9" className="st3" width="424.6" height="275.3"/>
                  <rect x="1146" y="1755.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="1821.8" y="1755.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="2497.5" y="1755.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="3160.2" y="1755.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="1146" y="2245.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="1821.8" y="2245.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="2497.5" y="2245.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="1821.8" y="1265.9" className="st3" width="424.6" height="275.3"/>
                  <rect x="2497.5" y="1265.9" className="st3" width="424.6" height="275.3"/>
                  <rect x="3173.2" y="1265.9" className="st3" width="424.6" height="275.3"/>
                  <path className="st3" d="M1309.8,296.8L1309.8,296.8c-35.6,0-64.8-29.1-64.8-64.8V65.1c0-35.6,29.1-64.8,64.8-64.8h0 c35.6,0,64.8,29.1,64.8,64.8v166.9C1374.6,267.7,1345.5,296.8,1309.8,296.8z"/>
                </g>
                <g id="Layer_5">
                  <g>
                    <g>
                      <path className="st1" d="M2025.3,1452.1c-1.6,2.1-1,6.9,3.4,6.2l3.5-8L2025.3,1452.1z"/>
                      <path className="st1" d="M2052.9,1469.2c2.7-1.7,5.6-4.1,7.7-7c2-2.9,3.1-6.4,1.9-10.4c-3,3.6-4.7,4.5-6.4,5.6 c-1.7,1.1-3.6,2.5-6.7,6.9c-4.3,0.6-7.2-3.3-6.2-6.2c-0.8,1-2.5,0.3-4.2,0.2c-1.8-0.2-3.6,0-4.9,2.5c5.2,6.5,11.9,7.5,19.7,2.9  C2055.1,1465.8,2053.4,1467.7,2052.9,1469.2z"/>
                      <path className="st1" d="M2382,1682.4l-0.6-2.7C2381.3,1680.6,2381.6,1681.5,2382,1682.4z"/>
                      <path className="st1" d="M2449.4,1915.6c-0.3-1.9-1.1-2.6-1.9-2.7C2448.1,1914.6,2448.7,1916,2449.4,1915.6z"/>
                      <path className="st1" d="M2439.6,1956.8c0.3-0.9,0.5-1.6,0.7-2.4C2439.5,1955.3,2439,1956.2,2439.6,1956.8z"/>
                      <path className="st1" d="M2382,1682.4c0,0,0.4,1.7,0.8,3.4c0.3,1.7,0.7,3.5,0.7,3.5C2385.9,1688.2,2383.4,1685.3,2382,1682.4z"/>
                      <path className="st1" d="M2113.1,1459.5c-1.5,0.1-2.9,0.5-4.2,1.2c1.3-0.1,2.5-0.1,3.7-0.1  C2112.8,1460.3,2112.9,1459.9,2113.1,1459.5z"/>
                      <path className="st1" d="M2306.8,1604.8l-1.5-1.3c-1.1,0.3-2.2,0.8-3.5,1.4c0,0,1.2,0,2.5,0 C2305.6,1604.8,2306.8,1604.8,2306.8,1604.8z"/>
                      <path className="st1" d="M2240.5,1556c1.4,1.2,5.7-4.3,7.9-6.4c-2.4,1.8-4.3,2.2-6,1.8C2241.7,1552.5,2241.1,1554,2240.5,1556z"/>
                      <path className="st1" d="M2125,1491.5c0,0-0.6,0.1-1.3,0.1c-0.6,0.1-1.3,0.2-1.3,0.2C2123.2,1491.7,2124.2,1491.7,2125,1491.5z"/>
                      <path className="st1" d="M2346.4,1648.3c-0.7,0.8-1.2,1.6-1.4,2.2C2345.7,1649.9,2346.1,1649.1,2346.4,1648.3z"/>
                      <path className="st1" d="M1982.9,1499.8c0,0.5,0.1,0.8,0.1,1.2C1983.5,1500.3,1983.6,1499.8,1982.9,1499.8z"/>
                      <path className="st1" d="M2084.7,1528.5l-1.4,0.4c-0.1,1.3-0.2,2.6-0.1,3.9L2084.7,1528.5z"/>
                      <path className="st1" d="M2419.9,2028.9c0.1-0.1,0.1-0.2,0.2-0.3C2419.8,2026.6,2419.7,2027.7,2419.9,2028.9z"/>
                      <path className="st1" d="M1877.9,2262.8c3.1,4-0.5,5.1-3.7,6.4c-3.2,1.3-5.9,2.8-0.9,7.7c-0.2-1.5,3.1-3.3,5.4-5.8 C1881,2268.8,1882.2,2266,1877.9,2262.8z"/>
                      <path className="st1" d="M2115.2,1460.9c1.2,0.2,2.4,0.4,3.6,0.8C2117.2,1461,2116.1,1460.8,2115.2,1460.9z"/>
                      <path className="st1" d="M1873.2,2276.9L1873.2,2276.9l1,1C1873.9,2277.5,1873.6,2277.3,1873.2,2276.9z"/>
                      <path className="st1" d="M2352.8,2182.8c1.2,0.5,2.3,0.5,3.4,0.5C2355.6,2182.9,2354.7,2182.7,2352.8,2182.8z"/>
                      <path className="st1" d="M2421.2,2074.9l-1.9,2.7C2420.3,2076.6,2420.8,2075.7,2421.2,2074.9z"/>
                      <path className="st1" d="M2315.1,2236.8c-1.7,0.7-2.7,0.3-3.9,2.4c0.4,0.1,0.7,0.2,1.1,0.2  C2312.3,2238.2,2312.9,2237.1,2315.1,2236.8z"/>
                      <path className="st1" d="M2257.7,2272.5c0.5,0.3,1.1,0.5,1.7,0.8c0.6-0.4,1.2-0.8,1.8-1.2L2257.7,2272.5z"/>
                      <path className="st1" d="M1756.9,1545.2c2.2,1.3,3.9,3,5.4,4.8C1759.5,1545.7,1769.7,1540.5,1756.9,1545.2z"/>
                      <path className="st1" d="M2112.3,1463.3c0.8-1.6,1.7-2.3,2.9-2.4c-0.9-0.1-1.7-0.2-2.6-0.2  C2112.1,1461.6,2111.9,1462.6,2112.3,1463.3z"/>
                      <path className="st1" d="M2347.5,2280.8c0,0-2.7,1.9-5.4,3.7c-1.4,0.9-2.7,1.9-3.8,2.5c-1.1,0.7-1.8,1.1-1.8,1.1 C2340,2286.5,2343.9,2283.7,2347.5,2280.8z"/>
                      <path className="st1" d="M1491.5,1984.7l-1.6-2.6C1490.1,1983.2,1490.5,1984.2,1491.5,1984.7z"/>
                      <path className="st1" d="M2304.2,2310.4c-3.3-1-6.1-1.1-8.8-0.7c-0.2,0.7-0.6,1.4-0.5,2.3L2304.2,2310.4z"/>
                      <path className="st1" d="M1762.3,1550.1C1762.3,1550,1762.3,1550,1762.3,1550.1C1762.3,1550,1762.3,1550,1762.3,1550.1z"/>
                      <path className="st1" d="M1835.6,1512.8c-11.5,2.4-3.4,9.9-4.7,15.6c-12.8,5.6-7.7-5.1-13.4-8.6c-1,0.5-1.9,1.2-2.8,1.8c-0.9,0.7-1.7,1.5-2.5,2.3c-1.6,1.6-3.1,3.3-4.5,4.9c-2.9,3.2-5.5,5.9-8.6,6.6c-0.9-1.3-2.2-1.5-1.3-3.7c-1.7,2.3-4.2,4-7.1,5.4c-2.9,1.4-6.1,2.5-9.4,3.6c-1.6,0.6-3.3,1.2-4.9,1.8c-1.6,0.7-3.2,1.5-4.6,2.4c-2.9,1.8-5.5,4-7.3,6.9c-1-0.5-1.6-1.1-2-1.7c3.1,3.8,4.8,8.1,5.6,11.3c-2.4,0.9-4.1,3-5.8,4.2c-1.6,1.3-3.1,1.8-5-0.7c3-0.9,2.4-3.3,3.2-5.5c0,0-1,1.1-2.1,2.1c-1,1.1-2.1,2.1-2.1,2.1c-7.5-6.4,5.9-5.3,3.8-11.2c-2.3,1.5-4.5,3.4-6.8,5.3c-2.2,1.9-4.5,3.8-6.7,5.7c-2.2,1.8-4.3,3.4-6.5,4.7c-2.1,1.3-4.2,2.1-6.3,2.3c-2.4-3.5,1.7-6,4.8-7.9c3.1-1.8,5.3-3.2-1.2-4.7c0,0,3.2-0.4,6.5-0.8c3.2-0.4,6.5-0.7,6.5-0.7c-13.7-9,7.6-1.8-5.7-12c-8.4,1.9-12.4,4.6-16.4,7.4c-4,2.8-7.9,5.6-16.1,7.9c-1.5,5.8,4,5.8,2.5,11.6c-4.5,4.3-8.2,5.9-11.6,6c-1.7,0-3.3-0.3-4.9-0.8c-1.5-0.5-3-1.1-4.4-1.8c-5.7-2.6-10.7-5.2-15.8,3.9c-0.7,3.5-0.1,7.8-1,11.4c-0.9,3.6-3.3,6.3-10,7.1c0,0-0.3-2.6-0.6-5.2c-0.3-2.6-0.6-5.2-0.6-5.2c-7.3,3.8-7.5,7.9-8.1,11.5c-0.3,1.8-0.7,3.5-2.1,4.9c-0.7,0.7-1.7,1.4-3,2c-1.3,0.6-3,1.2-5.2,1.7c0.2-2.4,2.4-4.8,4.3-6.5c1.9-1.7,3.4-2.8,2-2.6c-6.7-0.2-7.6,2.1-7.7,4.9c-0.1,2.8,0.6,6.2-2.9,8.5l-6.2-5.9c-3.4,2.8-6.7,5.8-9.9,9.2c-1.6,1.7-3.2,3.3-4.8,5.1c-1.6,1.8-3.1,3.6-4.7,5.4c-1.6,1.8-3.1,3.6-4.7,5.5c-1.6,1.8-3.1,3.7-4.7,5.5c-3.1,3.7-6.3,7.3-9.6,10.8c-0.9-2.6-0.1-6.8-5.2-5.6c-7.7,9.8-17.2,18.7-27.1,27.4c-9.9,8.7-20.1,17.2-29.4,25.6c0,0,0.1,2.9,0.2,5.9c0,1.4,0.1,2.9,0.2,4c0.1,1.1,0.1,1.8,0.1,1.8c-1.3,1.7-5,1.4-4.8-1.3c-7.6,6.3,3.5,3,3.3,8.3c-2.5,4.7-7.3,3.6-7.3-0.4c-2.1,8.6-5.2,20.4-9.3,31.5c-4.2,11.1-8.9,21.8-15.8,28.4c0,0-0.2-1-0.4-2c-0.2-1-0.3-2-0.3-2c-2,2.9-2.4,5.6-2.1,8.2c0.3,2.5,1.2,4.9,2.1,7.2c0.4,1.1,0.9,2.2,1.2,3.3c0.3,1.1,0.6,2.2,0.6,3.3c0,2.2-0.9,4.4-3.4,6.9l-0.5-2.6c-3.1,6.6-5,13.9-6.9,21.1c-1.5,7.3-3,14.6-4.1,21.7c-0.3,1.8-0.6,3.5-0.9,5.3c-0.2,0.9-0.3,1.7-0.5,2.6c-0.1,0.9-0.3,1.7-0.4,2.6c-0.6,3.4-1.3,6.8-2.1,10c-0.4,1.6-0.9,3.2-1.3,4.8c-0.4,1.6-0.9,3.1-1.4,4.6c-1,3-2.4,5.9-3.8,8.7c2.6,1.2,3.5,3.5,3.8,6.5c0.1,1.5,0,3.1-0.1,4.8c-0.1,0.8-0.2,1.7-0.3,2.6c-0.1,0.9-0.1,1.7-0.2,2.6c-0.5,6.9-0.5,13.6,6.9,14.1c-1.5,4.2-2.8,7.1-4,9.4c-1.2,2.3-2.2,4.1-3.1,6.1c-0.9,2-1.6,4.2-2.3,7.5c-0.3,1.6-0.7,3.5-1,5.7c-0.3,2.2-0.4,4.8-0.6,7.8c0.2,3.2,2.8,5.2,5.7,7.2c3,2.1,6.3,4.2,7.7,7.8l-7.4,1.7c0,0,2.5,2.2,4.9,4.4c1.2,1.1,2.5,2.1,3.5,2.9c1,0.8,1.6,1.3,1.6,1.3s-1.9,1.9-3.8,3.7c-1.9,1.9-3.8,3.8-3.8,3.8s0.9,1.7,1.8,3.3c0.9,1.7,1.8,3.3,1.8,3.3c-0.4-2.9,1.9-6.8,4-6.9c0.7,1.3,1.3,2.6,1.8,4.1c0.5,1.4,0.8,2.9,1,4.5c0.4,3.1,0.4,6.3,0.1,9.2c-0.6,5.9-2.3,10.8-4.1,11.5c0,0,0.9,1.5,2.2,3.7c1.3,2.2,3.3,5.1,5.1,8c1.9,2.9,3.8,5.7,5.2,7.9c1.5,2.1,2.5,3.5,2.5,3.5c-3.1,0.6-5.8-3.2-8.7-5.9c1.5,1.4,2.5,2.4,3.2,3.3c0.7,0.9,1,1.6,1.1,2.1c0.2,1.1-0.7,1.8-1.6,2.4c-1.8,1.2-3.6,2.4,2.1,7.2c0.9-2.3,4.5-0.8,6.1-1.2c-0.5,2-0.4,4.3,0,6.8c0.4,2.5,1.2,5.2,2.3,8c1,2.8,2.4,5.5,3.9,8.2c1.5,2.6,3.1,5.2,4.8,7.4l-5.6,0.5c0.9,2.3,2,4.6,3.2,6.9c1.2,2.3,2.4,4.6,3.8,6.8c1.3,2.3,2.7,4.5,4.2,6.8c1.5,2.2,3,4.5,4.5,6.7c1.5,2.3,3.1,4.5,4.8,6.7c1.6,2.2,3.2,4.5,4.8,6.7c3.2,4.5,6.6,8.9,9.7,13.6c-2.5-8,6.1-11.5,10.4-6.8l-5.1,6.7c6.5,0.5-1.4-7.2,8.5-3.8c4,7.1-4.1,9.8-9.1,7.5l8.2,6.5c-1.6,1.9-4,0.8-6.8,2.1c3.2,0.2,4.3,4.9,5.9,9.5c0.8,2.3,1.8,4.6,3.2,6.3c1.4,1.7,3.3,2.7,6,2.4l-1.5,2c7.1,8.7,13.2,14.3,18.9,19.5c2.9,2.5,5.8,4.9,8.7,7.5c0.7,0.6,1.5,1.3,2.2,2c0.8,0.7,1.5,1.3,2.3,2c1.6,1.4,3.2,2.8,4.9,4.4c2.5-2.4,4.8-2.1,7.4-1.2c2.6,0.9,5.6,2.2,9.5,1.9c2.1,2.6,4,5.5,6.1,8.3c2.1,2.8,4.3,5.8,6.6,8.8c0.6,0.7,1.2,1.5,1.8,2.2c0.6,0.7,1.2,1.4,1.9,2.1c1.3,1.4,2.6,2.8,3.9,4.1c1.4,1.4,2.8,2.7,4.2,3.9c1.5,1.3,3.1,2.4,4.7,3.6c11,3.8,6.1-2.8,12.5-3.2c-3.1,5.7,10.2,14.1,0.9,13.2c8.1,5.1,13.4,8,19.4,10.9c3,1.5,6.3,2.8,10.2,4.3c2,0.7,4.1,1.6,6.5,2.4c2.4,0.8,5,1.6,7.9,2.6c-1-3.5-2.9-5.9-0.5-7c4.2,1.2,7.1,7.1,5.1,9.5l-1.3,0c3.5,0.6,6.8,1.7,10,3.2c1.6,0.8,3.2,1.6,4.7,2.6c1.5,0.9,3.1,1.9,4.6,3c3,2.1,5.9,4.6,8.9,7c2.9,2.4,5.8,5,8.7,7.5c11.6,9.9,23.4,18.9,35.8,16.5l-1.3,0.2c0,0,1.4,0.1,3.6,0.2c2.2,0.1,5,0.4,7.9,0.5c5.7,0.2,11.4,0.5,11.4,0.5c4.5,2.2,2.8,2.8,0.5,3.7c-2.2,0.8-4.9,1.9-2,5c6.5-0.6,11.9,0,16.7,1c4.8,1,9,2.7,13.1,4.4c4.1,1.6,8.1,3.3,12.3,4.5c4.2,1.2,8.7,1.8,13.8,1.3c2.4,5.5,7,8.9,12.6,11.3c2.8,1.2,6,2,9.2,2.7c3.3,0.7,6.7,1.3,10.2,1.7c3.5,0.4,7,0.8,10.5,1.3c3.5,0.5,6.9,0.9,10.2,1.6c6.5,1.4,12.5,3.3,17,7.1l-0.4-4.5c5.9-3.3,5.8,3.5,9.5,5.1c0-3.5-5-4.8-1.4-6.6c22.2,0.9,44.4,5.2,67,10c22.5,4.8,45.4,9.9,68,12.5c8.3,0.8,10.7-4.8,13.7-9.3c3-4.5,6.3-7.7,16.7-2.5l-5.9,8.2c16.8-4.8,33.9-5.1,51.3-6c4.3-0.3,8.7-0.5,13-0.9c4.3-0.4,8.7-0.9,12.9-1.6c4.3-0.7,8.5-1.6,12.7-2.7c4.2-1.2,8.3-2.6,12.3-4.3c-1.7,2.2-1.3,4.6-4.6,5.1c2,1.2,4.7,1.5,7.6,1.2c2.9-0.3,5.9-1.2,8.7-2.4c1.4-0.6,2.7-1.3,3.8-2c1.2-0.7,2.2-1.5,3-2.3c1.7-1.5,2.6-3,2.4-4.2c5.3-0.7,2.2,4,6,5.6c2,0.5,4-0.1,6-1.2c2-1,3.9-2.4,5.7-3.8c3.6-2.6,6.8-5.1,9.6-2.8c0.9,0.7-1.4,2.5-2.6,3.3c1-1.1,2.8-2,4.9-2.8c2.1-0.9,4.5-1.6,6.6-2.6c4.1-1.9,6.9-3.8,3.6-6.1c6.8-0.6,12.3-4,17.6-6.9c1.3-0.7,2.6-1.5,3.8-2.3c1.3-0.7,2.5-1.4,3.8-2c2.5-1.2,5.2-2,8-2.4c0.6-2.5,2.3-4.2,4.4-5.6c2.1-1.3,4.6-2.3,6.9-3.4c4.6-2.2,8.5-4.4,6.5-9.5c2.6,5,8.7,3.6,14.6-0.1c2.9-2,5.7-4.6,8-7.2c2.3-2.6,3.9-5.5,4.7-7.8c-0.1,4.4,7.8-1.8,8.3,3.8c3.7-3.1,6.7-6.6,8.3-9.6c1.6-3,1.4-5.7-1.1-7.2c2.7-0.2,5-0.9,7-1.9c2-1,3.8-2.3,5.2-3.9c1.4-1.5,2.7-3.3,3.8-5c1.1-1.8,2.1-3.6,3-5.4c1.8-3.6,3.5-6.9,5.9-9c2.4-2.2,5.5-3.3,10.4-2.4c6.7-12.6,12.6-24.6,18.1-36.3c5.4-11.7,10.5-23,15.3-34c4.6,3.1,1.5,9.1-1.6,14.8c-3.1,5.7-6.1,11.2-1,13.9c4.4-11.1,6.1-20.8,8.1-30c1-4.6,2.3-9,3.9-13.6c1.6-4.5,3.9-9.1,6.9-13.9c3.8-4.7,3,5.1,3.7,7.7c0.8-2.8,1.6-5.6,2.5-8.3c0.9-2.7,1.9-5.3,3-7.9c2.1-5.2,4.2-10.2,6.3-15.2c2-5,3.9-10,5.4-15c1.4-5.1,2.3-10.2,2.5-15.5c1,0.4,1.3,2.8,1.4,5.1c1-3.9,4.5-8.4-0.5-9.5l0.1,4.1c-2.3,0.9-4,0.2-5.3-1.5c-1.4-1.7-2.5-4.3-3.4-7.1c-1.8-5.6-3-11.7-4.8-12.6c6.1,5.2,8.2,0.8,10.8-3.1c2.5-3.9,5.4-7.3,12.8,0.3c-0.2-2.8-1.7-6.6-5.1-6.9c1.9-3.5,4.1-4.3,6.9,0.5c0.4-7.4-1.1-10.1-2.2-12.5c-1.1-2.4-2-4.6-0.6-10.9c2.4,0.5,2.8,3.3,5.3,5.2c-1.7-3.7-3.3-7.4-4.1-11.4c-0.8-4-0.8-8.4,1.2-13.6c1.3,0.9,3.5,0,2.9,3.2c0.7-4.6,0.4-9.1-0.2-13.4c-0.3-2.1-0.6-4.3-1-6.4c-0.4-2.1-0.8-4.2-1.2-6.3c-0.4-2.1-0.8-4.2-1-6.3c-0.3-2.1-0.4-4.2-0.5-6.4c-0.1-4.4,0.4-8.9,1.9-13.9c10.3,6.7,3.9-6.7,13.1-7.3c0,0-0.5-2.8-1.1-5.6c-0.6-2.8-1.2-5.6-1.2-5.6l-4.6,4.3c0.2-4.8-1.4-9.4-2.6-13.7c-1.3-4.4-2.3-8.5-0.8-12.6l3.9,7.1c0,0-0.5-4.5-1-9c-0.2-2.2-0.6-4.5-0.8-6.2c-0.2-1.7-0.4-2.8-0.4-2.8s-0.8,2.6-1.5,5.1c-0.4,1.3-0.8,2.6-1.1,3.5c-0.3,1-0.5,1.6-0.5,1.6c-1.2-2.4-2.6-3.5-3.9-4c-1.3-0.5-2.5-0.4-3.5-0.5c-2-0.1-3.1-0.5-2.1-6.8c0.5,1.2,0.5-1.1,0.9-4.4c0.5-3.3,1.2-7.6,3.8-10.2c0,0,0,0,0,0c-1.6-2.2-3.3-4.5-4.4-7c-1.1-2.6-1.6-5.4-0.8-9c2.7-2.1,10.3,0.4,12.1-1c-2-1-3.3-2.8-4.3-5.1c-1-2.3-1.7-5.1-2.3-7.9c-0.7-2.8-1.3-5.6-2.5-8c-1.2-2.4-2.7-4.4-5-5.5c2.2,1.6,7,0.9,7.9,0.1l-6.8-2.8c1.3-4.7,2.1-5.5,6-5.5c-0.7-6.7-3.4-5.1-5.6-3.9c-2.2,1.2-4.1,2-3.1-6.2c0.7,1.1,1.5,0.3,3,2.7c-0.2-8-3-15.3-5.6-22.3c-2.9-7-5.4-13.8-6.1-21.1c3.8-3.4,5.3-0.5,6.5,2.4c1.3,2.9,2.2,5.8,5.4,2.3c-1.9-5-4.3-9.9-6.9-14.8c-2.8-4.8-5.7-9.6-8.5-14.3c-3-4.7-5.7-9.4-8.3-14.1c-1.3-2.3-2.5-4.7-3.5-7.1c-1-2.4-1.9-4.8-2.7-7.2c0,0,0.2,1,0.3,1.9c0.2,1,0.3,1.9,0.3,1.9c-6.5,1.3-6.6-2.7-6.2-8c0.2-2.6,0.5-5.6,0-8.3c-0.5-2.7-1.6-5.2-4.1-6.8c2,1.8,8-0.2,6.4-0.2c-4.3-13.6-16-24.3-30.6-39.8l4.2,0.4c-0.5-2.1-1.3-4.4-2.4-6.8c-1.1-2.3-2.5-4.7-4-7c-1.5-2.3-2.9-4.7-4.3-7c-1.4-2.2-2.7-4.4-3.7-6.4c-4.3-0.2-6.8-4.6-8.9,0.8c0-1-0.1-2.1-0.2-3c-0.1-1-0.3-1.9-0.4-2.8c-0.4-1.8-0.9-3.6-1.5-5.2c-0.6-1.6-1.3-3.2-2.1-4.7c-0.4-0.7-0.8-1.5-1.3-2.2c-0.5-0.7-1-1.3-1.5-2c-4.1-5.2-9.2-9.3-14.5-13c-2.7-1.9-5.3-3.7-7.8-5.6c-2.6-1.8-5-3.8-7.2-5.9c-1.1-1.1-2.1-2.2-3.1-3.4c-1-1.2-1.9-2.4-2.7-3.8c-1.6-2.7-2.8-5.7-3.6-9.3c2.1,2,7,2.8,5.4,1.2c0,0-1.1-0.8-2.6-1.9c-0.8-0.6-1.7-1.3-2.7-2c-1-0.7-2.1-1.4-3.2-2.2c-4.3-3-8.6-5.9-8.6-5.9c-2.7,5.3-0.3,4.4-0.2,10.6c-4.2,0.7-10.1-1.3-13.8-4.5c9.3,3.2,6.1-6.9,5.1-11.9c-0.6,1.8-2.9,2.3-3.8,3.9c-0.3-3.7-1.1-5.1-2.1-5.3c-1-0.2-2.3,0.8-3.7,1.7c-2.8,1.9-6.3,3.9-9.6-3.3l2.5-1.8c-1.3-0.6-2.6-1-4-1.4c-1.4-0.4-2.8-0.7-4.2-1.1c-2.8-0.8-5.3-1.8-7.4-3.9c2.1-6.7,6.4,1.1,10-3c-1.7-1.2-3.8-1.8-6.1-2.2c-1.1-0.2-2.3-0.3-3.5-0.4c-1.2-0.1-2.3-0.2-3.5-0.3c-4.5-0.5-8.4-1.6-9.5-6.4c3.9,0.5,7.9,3.5,11.9,4c-1-5.5-2-8-3.3-9.7c-1.3-1.7-2.8-2.6-5-4.8l0.4,0.5c0,0-2.4-2.7-4.9-5.4c-1.2-1.4-2.5-2.7-3.4-3.7c-0.9-1-1.6-1.7-1.6-1.7s0.5,0.9,0.9,1.9c0.5,0.9,0.9,1.9,0.9,1.9c-4.5,2.1-8,2.7-11,2.3c-2.9-0.4-5.3-1.6-7.8-3.1c-2.4-1.5-4.9-3.1-7.8-4.2c-1.5-0.6-3.1-1-4.8-1.2c-1.8-0.2-3.7-0.2-5.9,0.2c4.2-0.7,6.6-1.2,8-1.8c1.3-0.6,1.6-1.2,1.4-2c-0.3-1.5-2.1-3.5,0.2-6.4c-2.1-3.6-5.8-8.3-3.4-9.3c-4.4,1-6.3-1.4-8.7-3.6c-2.4-2.2-5.3-4.2-11.5-2.5c0.3-1.2-1.2-2.1-2.4-3.2c-1.2-1.1-1.9-2.6,0.1-4.9c-8.8-2.1,0.1,4.7-2,7c-7.8,0.8-13.7-4.8-20.9-10.1c-1.8-1.3-3.6-2.7-5.5-3.9c-1.9-1.2-4-2.2-6.1-3.1c-2.2-0.9-4.4-1.5-6.8-1.8c-2.4-0.3-5-0.2-7.8,0.3c-4.3-0.3-7.8-0.2-11,0.3c-3.2,0.5-5.9,1.3-8.6,2c-2.7,0.8-5.3,1.5-8.3,2c-2.9,0.6-6.2,1-10,0.9c-1.9-2.6-0.3-4.4,1.8-5.5c2.1-1.2,4.7-1.7,4.7-1.7c-6.9-5.8-13.2-6.7-21.4-6c2-1.6,0.9-3.8-0.8-7c-6.3-0.8-6.1,7.6-13.3,2.3c1.9-2.3,4.6-6.1,8.2-8c-7.8,0.4-16,3.5-23.8,4.2c-1.3-4.5,5.7-5.4,8.9-7.6c-2.2,0-4.8,0.1-7.4,0.1c-2.6,0.1-5.3,0.3-7.9,0.7c-5.1,0.8-9.4,2.2-11.2,5.4c0,0,1.3,0.7,2.6,1.5c1.3,0.8,2.5,1.6,2.5,1.6c-3.1-0.2-0.8-5.9,1.7-6.7c8.2-4,10.2,3.9,10.2,6.4l-5.6,0.7c0.8,3.7,2.5,5.6,4.9,6.5c2.3,0.9,5.2,0.8,8.4,0.2c6.4-1.1,13.8-3.3,19-1.7c0,0-1.7,2.2-3.4,4.5c-1.7,2.3-3.3,4.5-3.3,4.5s3.2-1.5,6.3-2.9c1.6-0.7,3.2-1.4,4.4-1.9c1.2-0.5,2-0.9,2-0.9c1.7,3.2,1.7,9.1-3.7,9.3c3.1,3.4,4.9,3,6.6,2.5c1.7-0.4,3.3-0.8,5.7,2.8c0.5,1.1,0,1.4-0.7,1.6l8-0.8c-2,1.7-0.9,7.3-4.8,4.6c2.8,2.4,5.5,3.4,8.2,3.9c2.7,0.5,5.2,0.4,7.5,0.3c4.6-0.3,8.2-0.7,9.3,3.9l-1.2,0.2c9.2,1.5,10.3-0.1,11-2.5c0.4-1.2,0.7-2.6,1.9-4c1.2-1.3,3.4-2.6,7.5-3.4c0,0,0.5,5.2,1,10.4c0.5,5.2,0.8,10.3,0.8,10.3l4.6-6.3c1.7,1,4.9,3,3.1,5.5c8.5-1.9,0.2-3.5,5.9-6.3c1.4,2.5,3.7,4.2,6.2,5.5c2.5,1.4,5.3,2.5,7.8,3.6c5,2.1,8.9,4.7,7.1,10.5c5.5-3.6-5.8-8,4.7-7c-1.7,6.4,1.1,7.2,4.9,7.5c3.8,0.4,8.6,0.5,10.8,5.1c-5.5,4.6-10.6-2.3-6.3,6.9c2.5-1.9,4.5-2.2,6.3-1.5c1.8,0.6,3.3,2.2,4.7,4.1c2.8,3.7,5.2,8.4,8.6,9.4c2.5-3.7,6.2-2.5,10.8,0.2c2.3,1.3,4.7,3.1,7.2,4.8c2.6,1.7,5.3,3.2,8.1,4.3c-1.2,1,2.6,5.3,7.5,10.4c4.8,5.3,10.7,11.3,13.7,16.1l-1.2,1c3.7-2.8,7.4-2.1,11.2-0.2c3.7,2,7.4,5.2,11.1,7.2c-3.9,3.8-6.4,4.4-11.3,3.4l5.7,5c3.3-0.9,6-0.4,10.4,2.2l-6,3.6c1.9,1.7,4.1,3,6.5,4.3c2.3,1.3,4.8,2.6,7.2,4c4.9,2.8,9.4,6.7,12.3,12.9c2.6-1.9,4-6.8,6.4-10.3c2.3-3.5,5.7-5.7,12.1-1.8c-2.2,2.7-6.1,7-9.7,5.2c1.2,0.6,5,1.3,5.5,4.1l-8-0.4c2.1,6.2,5.7-0.9,8.5,3.2c-3.7,3.2-0.2,5-3.6,7c-1.2-0.6-1.3-4.5-3.9-4.6c1.5,2.3,2.7,5.2,3.4,7.9c0.7,2.8,0.8,5.5,0.1,7.5c1.8-2.1,5-4.2,8-1.6c3.4,3.8,2.8,5.4,1.6,6.8c-1.2,1.4-3,2.6-2.2,5.7c4.2-0.2,5.3,7,11.2,2.8c1.8,2.4-0.7,4.9-1.6,7c1.4,0.6,3.1,2.1,4.8,3.8c1.7,1.8,3.5,3.8,5.2,5.5c3.3,3.5,6.3,5.5,7.9,0.9l-0.3-1.4c0.3,0.1,0.4,0.4,0.7,0.5c0,0,0,0,0,0l0,0c2,1.3,3.7,2.8,5.3,4.4c1.5,1.7,2.8,3.5,4,5.4c1.2,1.9,2.3,3.9,3.2,6c1,2,1.8,4.2,2.6,6.4c1.6,4.3,3.2,8.6,4.7,12.8c0.8,2.1,1.7,4.1,2.8,6c0.5,1,1.1,1.9,1.7,2.8c0.6,0.9,1.2,1.8,1.8,2.7l-2.2,1.1c3.5,4,6.5,8.9,9.3,13.5c1.4,2.3,2.9,4.5,4.5,6.4c1.6,1.9,3.2,3.6,5.2,4.8c1.2,2.9-1.4,8.4-4.6,8.2c2.4,3.3,4.1,4.9,5.5,7.2c0.6,1.2,1.2,2.5,1.5,4.3c0.3,1.8,0.6,4,0.6,7c-1.6-1.5-2.6-2-3.2-2.1c-0.6-0.1-0.8,0.3-0.9,0.5c-0.2,0.4,0.1,0.3-1.5-4.9c0.4,2.6,0.5,4.7,0.6,6.5c0,1.9,0.1,3.5,0.4,5.1c0.3,1.6,0.9,3.1,2,4.7c1.1,1.6,2.8,3.4,5.1,5.5c-3.5-0.8-4.8,1.6-4.9,4.6c-0.1,3.1,1.2,6.8,2.7,8.9c0,0,0.6-2,1.2-4c0.6-2,1.1-4,1.1-4c2.5,4.9,3.1,9.6,3.8,14.4l-8.6-0.4c-0.6,2.8-0.6,5.3-0.2,7.7c0.3,2.4,1,4.6,1.9,6.8c0.9,2.1,2.1,4.2,3.4,6.2c1.2,2,2.5,4,3.8,5.9c1.3,1.9,2.5,3.9,3.4,5.8c1,1.9,1.7,3.9,2,5.9c0.3,2,0.3,4-0.2,6.1c-0.3,1-0.7,2.1-1.2,3.2c-0.6,1.1-1.3,2.2-2.2,3.3c3.2,2.3,3.8-0.6,4.6-3.6c0.7-3,1.4-6.1,5.1-4.2c0.1,1.2,0,2.4-0.3,3.7c-0.3,1.2-0.7,2.5-1.1,3.7c-0.9,2.5-2.2,4.9-3.5,7.1c-2.5,4.4-5.2,7.8-5,9.3c-1.6,6.6,1.7,9.2,5.1,12c1.7,1.4,3.4,2.8,4.6,4.8c0.6,1,1,2.1,1.3,3.4c0.3,1.3,0.3,2.8-0.1,4.5c2.8-1.9,10.6-4.1,13.8,6.3c-0.2,2.5-1,4.4-2.2,6c-1.2,1.5-2.8,2.5-4.4,3.1c-3.2,1.1-6.6,0.1-7.8-2.8c-0.3-2.3,0.6-3.4,1.6-3.3c-1.2-3-2.6-7-5.6-3.1l3,1.1c-0.7,1.2-1.2,2.9-1.6,4.7c-0.4,1.8-0.8,3.8-1.2,5.5c-0.9,3.4-2,5.9-4.4,4.4c2.9,7,4.8,3,6.3-2.3c-2,6.1-2.2,10.7-2.1,15.5c0.1,4.7,0.1,9.6-1.6,15.7c1.7-1.9,5.2-3.5,5.1-1.5c-0.6,2.3-0.9,4.1-1.1,5.6c-0.2,1.5-0.2,2.6-0.1,3.5c0.2,1.8,1,2.7,1.9,3.4c1.9,1.4,4.5,2.2,4.5,8.6c-5.2,6.6-10.3-3.6-8,9.2c-3.9,7.2-7.9,0.6-9.9-2.6c0.5,1.5,0.9,2.9,1,4.3c0.1,1.4,0,2.7-0.2,4c-0.5,2.5-1.5,4.9-2.7,7c-1.2,2.2-2.6,4.1-3.9,5.9c-1.3,1.8-2.3,3.4-2.9,4.9l-1.3-6.1c0.8,3.6,0.3,6.4-0.3,9.3l6.3-2.2c-0.8,1.6-1.3,3.1-2,4.2c-0.7,1-1.4,1.6-2.6,1.3c1.5,2.1,4,1.9,6.7,2.2c2.6,0.3,5.3,1,7.1,5c-2,2-1.8,5.7-2.4,8.8c-0.6,3.1-1.6,5.8-5.6,5.7c3-6.8,1-6.9-1.5-6.7c-1.3,0.1-2.7,0.2-3.7-0.5c-1-0.7-1.5-2.1-1.2-5.2c0.5,2.5-0.3,5.3-2.1,8.4c-1,0.3-1.4-0.8-1.7-1.9c-9.9,11.6,7.1,8.2,3.1,22.1c-3.7-2.9-8.8,0.9-8.7,3.3c1.8-5.4,7.8-0.6,9.4,5.5c-3,3.9-3.1,6.5-2.8,8.7c0.3,2.2,1.2,4,0.2,6.2l3.3-4.8c3.5,3.2,1.5,7.5,0.6,14.2c-3.3-0.6-0.2-6.5-2.4-4.7c0.6,1.2,0.9,2.3,0.8,3.3c0,1-0.4,2-0.9,2.9c-1,1.8-2.8,3.5-4.7,5.1c-3.7,3.4-8,6.7-7.6,12.4c-4.5,3.1-7.7-2.8-11.1,0.1c0.3,6.2-2.4,8.3-5.1,10.4c-0.7,0.5-1.4,1-2,1.6c-0.7,0.6-1.3,1.2-1.9,2c-1.2,1.5-2,3.6-2.3,6.7c6.7-0.3,5.8-1.6,7.1,8.5c0,0,0.1-0.3,0.2-0.8c0.1-0.5,0.3-1.3,0.6-2.2c0.5-1.8,1.1-4.2,1.7-6.6c0.6-2.4,1.3-4.8,1.6-6.6c0.4-1.8,0.7-3,0.7-3s0.2,0.9,0.4,2.3c0.2,1.4,0.6,3.3,0.8,5.1c0.5,3.8,1,7.5,1,7.5c1.3-2.6,2-5.8,2.4-8.7c0.4-2.9,0.9-5.5,2.1-6.9c1.9,7.4,0.8,6.3,6.4,5.8c-2.9,0.9-4.4,2.4-5.3,4.3c-0.9,1.8-1.2,4-1.4,6.2c-0.2,2.3-0.4,4.6-1.1,6.7c-0.7,2.2-2.1,4-4.5,5.4l-12.7-7.2c-3.1,2.2-4.9,4.9-6.2,7.9c-1.3,2.9-2.1,6.2-2.8,9.6c-0.8,3.4-1.6,7-3,10.5c-1.5,3.5-3.6,7-6.8,10.2c0,0,1.4-0.8,2.7-1.7c1.3-0.9,2.7-1.7,2.7-1.7c1.7,2.6,0.4,5.1-1.7,7.6c-2.1,2.5-4.7,5.2-5.5,8.2c-3.6-3.3-7.2-1.5-11.1-1.3c1.5,1-0.4,3.6-2.1,6.7c-1.7,3.1-2.9,7,0.3,10.7c0,0-2.5,0.5-5.1,1c-2.5,0.5-5,0.9-5,0.9c-0.7,0.6-1.3,1.2-1.9,1.8c-0.6,0.6-1,1.2-1.5,1.8c-0.8,1.2-1.4,2.4-1.8,3.7c-0.8,2.6-0.9,5.3-1,8c-0.3,5.4-0.5,11-6.3,15.3c-0.2-3.4-2.2-4.6-3.4-6.1c-1.3-1.5-2-3.3,0-7.9c-3.3,3.1-6.9,5.2-4.7,7.8c-1-0.1-1.8,0.7-2.6,1.9c-0.8,1.2-1.5,2.8-2.3,4.5c-0.8,1.7-1.7,3.3-2.8,4.5c-1.1,1.2-2.4,1.8-3.9,1.6c-0.2,2.9,2.5,7.3-1.9,10.2c-1.1-0.4-1.4-1.9-1.4-1.9c1.5,1.9-4.7,7.5,2.2,9.1c-2.6-0.4-5.1-0.4-7.4,0.1c-2.4,0.4-4.6,1.1-6.8,2c-4.3,2-8.5,4.6-12.5,7.4c-2.1,1.4-4.2,2.6-6.2,3.8c-2.1,1.2-4.1,2.3-6.2,3c-2.1,0.7-4.2,1.2-6.3,1.3c-1,0-2.1,0-3.1-0.2c-1-0.2-2.1-0.5-3.1-1c-2.1,1.3-4.4,2.8-6.8,4.2c-1.2,0.7-2.4,1.4-3.6,2c-1.2,0.6-2.5,1.3-3.7,1.9c-4.9,2.6-9.9,4.5-14.3,6.2c0.1-1.6-0.7-2.3,1.1-2.4c-3.3-0.1-5.3,0.7-6.5,2.1c-1.2,1.4-1.8,3.3-2.4,5.3c-0.6,1.9-1.3,3.9-2.9,5.3c-1.5,1.4-4,2.1-7.9,1.7c-9.1-5.9,6.7-5.9,1.4-7.8c-1.4-3.8-3.2-5.3-5.1-5.5c-1-0.1-2,0.1-3.1,0.5c-1.1,0.4-2.3,0.9-3.5,1.5c-2.5,1.2-5.2,2.6-8,3.3c-2.8,0.6-5.7,0.4-8.5-1.5l2.2-1.3c-2.1-1-4.1-1-6.3-0.4c-2.2,0.6-4.5,1.8-6.9,3.1c-1.2,0.7-2.5,1.4-3.8,2.1c-1.3,0.7-2.7,1.3-4,1.9c-2.8,1.1-5.7,2-8.9,2c0,0,0.5-1.5-0.1-2.4c-3.9,4.4-9.8,7.7-16.4,10c-6.6,2.4-13.7,3.8-19.8,5.2c3.7-6.4,5.5-3.5,3-9.8c-5.4,1.1,1.9,10.2-9.1,12.2c-3.6-3.3-11.6-6.3-12.6-13.1c0,0,2.6-0.1,5.1-0.2c1.3,0,2.6-0.1,3.5-0.2c1-0.1,1.6-0.1,1.6-0.1c-2.7-4.3-6-4.3-9.3-3.3c-3.3,1-6.7,2.9-9.4,2.1l0.7-3.8c-3.9,0.3-6.9,1.1-9.4,2.1c-2.5,1-4.6,2.3-6.7,3.5c-4.2,2.4-8.6,4.6-17.1,3.9l1.7,3c-9.8,9.3-7.6-5.7-17.2,1l-2.3-9.9c-3.1,1-8.6,3-14.8,4.9c-6.1,1.8-12.9,3.6-18.5,4c6.9-6.6,20-9.3,28.1-13.2c-3-0.2-8.1-0.3-13,0.1c-4.8,0.4-9.3,1.5-11.1,3.7c2.5-0.7,5.8-2.9,8.1-1.2c-4,3.5-8.5,6.1-13.6,7.5c-5.1,1.4-10.7,1.8-16.7,1.1c2.1-9.3-5.7-11.2-14.7-13.1c-4.5-0.9-9.4-1.8-13.6-3.4c-4.2-1.6-7.6-4-9.1-8c-2.7,0.5-5.4,0.7-8.1,0.6c-2.7,0-5.3-0.3-7.9-0.7c-2.6-0.4-5.2-1-7.8-1.7c-2.6-0.7-5.2-1.5-7.8-2.4c-5.2-1.7-10.4-3.8-15.9-5.6c-2.7-0.9-5.5-1.8-8.3-2.6c-2.8-0.8-5.7-1.5-8.7-2.1c1.2,4.1,1.5,6,1,6.9c-0.5,0.9-1.6,0.7-2.9,0.4c-2.7-0.5-6.2-1.2-7.3,6.3c-5.9-0.4-8-1.2-8.2-2.3c0,0-3.6-3.3-7.3-6.6c-1.8-1.6-3.6-3.3-4.9-4.6c-1.3-1.3-2.2-2.1-2.2-2.1c-2.7-5.4,6.1-1.7,6.5-5.1c-11.6-4.6-3.2-7.6-9.9-13.7c0,5.7-6.3,6.1-12.4,2.1l7.4,9.6c-9.5,1.2-12.2-2.9-14.7-7.1c-2.6-4.2-5.1-8.3-14.5-7.5l6.7-2.6c-4.6-0.2-12.3-2.9-20.2-4.8c-2-0.5-4-0.8-6-1.2c-2-0.3-4-0.5-5.9-0.5c-3.9,0-7.6,0.7-10.8,2.6c-0.8-2.2-1-6.9,3-6.3c-4.6-2.6-10-4.2-15.5-5.8c-2.8-0.8-5.6-1.4-8.5-2.1c-2.8-0.7-5.7-1.4-8.4-2.1c-5.6-1.3-10.9-3.1-15.6-5.2c-4.6-2.2-8.5-5-11.1-8.7l3.3-2.4c-4-1-9.4,2.4-11.8-3.3c1-1.2,3.3-2.3,1.8-3.4c-1.2,0-4.3,0.1-7.5-0.6c-3.2-0.6-6.4-1.9-8-4.2l6-1c-1.8-1.9-3.7-3.4-5.5-4.8c-1.8-1.3-3.7-2.4-5.7-3.3c-1.9-0.9-3.9-1.5-5.9-2.1c-2-0.6-4-1.1-6-1.5c-8.1-1.6-16.4-2.6-24.1-7.1c3.4-4.2,2.6-9.6,0.4-14.6c-1.1-2.5-2.5-5.1-3.9-7.3c-1.4-2.3-2.9-4.3-4-6l1.2-0.9c-2-2.1-4-4-6-5.8c-1-0.9-2.1-1.7-3.1-2.5c-0.5-0.4-1.1-0.8-1.6-1.2c-0.5-0.4-1-0.8-1.5-1.2c-2.1-1.6-4.2-3-6.4-4.3c-1.1-0.7-2.2-1.3-3.3-2c-1.1-0.7-2.2-1.3-3.2-2c-4.3-2.7-8.9-5.1-13.2-8c-2.2-1.4-4.4-2.9-6.6-4.5c-2.2-1.6-4.3-3.4-6.4-5.2c0.1-2.3-0.2-4.6-0.8-6.9c-0.6-2.4-1.4-4.8-2.5-7.3c-0.6-1.2-1.2-2.5-1.8-3.7c-0.7-1.2-1.4-2.5-2.1-3.8c-1.4-2.6-3-5.3-4.6-7.9c-6.3-10.8-13.4-22.4-15.4-33.5c-0.2,3.8-7.7,3.5-10.5,0.5c-0.2-2.8-3.4-5.2-5.5-7.3c-2.1-2.2-2.9-4.1,1.7-5.8l0.6,1.7c1.8-1.9,2.7-3.9,3-5.8c0.4-2,0.1-4-0.4-5.9c-0.6-2-1.4-4-2.4-5.9c-0.9-2-1.8-3.9-2.5-5.8l-12.6,3.6c2.3-6.8,2.1-13.3,0.3-19.5c-0.8-3.1-1.9-6.2-3.2-9.3c-0.6-1.5-1.3-3-2-4.5c-0.6-1.5-1.3-3-2-4.5c-1.3-3-2.7-5.8-3.8-8.7c-1-2.8-1.9-5.5-2.4-8.1c-0.2-1.3-0.4-2.5-0.4-3.8c0-1.2,0.1-2.4,0.4-3.5c0.5-2.3,1.6-4.3,3.4-6.1c-1-1.1-1.9-2.3-2.7-3.6c-0.7-1.3-1.3-2.6-1.9-4c-1.2-2.7-2.5-5.4-4.5-7.7l7-0.7c0-3.5,0.1-6.6,0.1-9.5c0-1.4,0-2.8-0.1-4.2c0-1.4,0-2.8,0-4.2c-0.1-2.8-0.3-5.7-0.6-9c-0.2-3.3-0.5-6.9-1.1-11.2l5.1,3.4c0-1.2-0.3-2.3-0.8-3.3c-0.5-1-1.3-1.9-2.2-2.8c-1.8-1.7-4.4-3.3-6.9-4.8c-2.5-1.6-5.1-3.1-7.1-4.9c-2-1.8-3.1-3.8-3.1-6.1c0,0,2.6-0.5,5.3-1.1c2.6-0.5,5.3-1,5.3-1c0.1-2.1,0.3-4.3,0.8-6.4c0.5-2.1,1-4.2,1.6-6.3l0.9-3.1c0.3-1,0.6-2.1,1-3.1c0.7-2,1.4-4.1,2-6.1c0.3-1,0.6-2,0.8-3.1l0.4-1.5l0.4-1.5c0.5-2,0.9-4.1,1.1-6.2c0.1-1,0.2-2.1,0.2-3.2c0-0.5,0-1.1,0-1.6c0-0.5,0-1.1,0-1.6c-0.1-2.2-0.4-4.4-1-6.7c1.4,0.7,4.2,1.9,3.9,4.6c0.6-1.9,1.8-4.5,3-7.5c1.4-2.9,2.8-6,3.7-9c0.8-3,1.4-5.7,0.8-7.9c-0.6-2.2-2.4-3.8-6-4.4c2.2,0.8,3.7,0.2,4.8-1.3c0.5-0.8,0.9-1.7,1.2-2.9c0.4-1.1,0.6-2.4,0.8-3.8c0.2-1.4,0.3-2.9,0.4-4.5c0.1-1.6,0.2-3.2,0.3-4.8c0.2-3.2,0.1-6.4,0.3-8.9l5.5,4.3c-2.2-5.4-3.7-8.5-4.4-11.7c-0.5-3.1-0.3-6.2,1.5-11.8c2.2-1.9,5.9,0.8,2.6,2.9c3.8-2.9,3.3-5.2,2.9-7.7c-0.4-2.5-0.5-5.3,4-8.9l1.5,5.8c1.3-1.8,2.2-3.3,2.7-4.5c0.5-1.2,0.7-2.2,0.7-3.2c-0.1-2-1-3.9-1.6-7.5c0.6-3.2,3.6-6.5,7.1-8.7c3.6-2.1,7.7-3,10.6-1.6c-1.1-1.7-1.8-4.3-1.6-6.9c0.2-2.6,1.2-5.2,3.7-6.7c2.3,1,2,3.4,1.9,4.6c3.4-2.1,5.7-4.5,7.4-7.1c1.8-2.5,2.9-5.1,4.1-7.6c1.1-2.5,2.3-4.7,3.9-6.6c0.8-0.9,1.7-1.8,2.8-2.4c1.1-0.6,2.4-1.1,4-1.5c1.7,1.5,3,1.8,4.1,1.7c-4.5,4.1-8.4,7.9-11.3,10.5c-2.8,2.7-4.4,4.2-4.3,3.6c2.3,2.2,5.3,1.7,7.9,2.1c2.6,0.4,4.6,1.8,5.3,7.6c0.4-2.2,0.8-4.9,1.4-7.7c0.6-2.8,1.3-5.9,2.3-8.8c1-2.9,2.2-5.7,3.8-8c1.6-2.3,3.5-4.1,5.7-5.1c0.7,0.2,1.5,0.3,2.4,0.8l-0.3,1.2c2-1,3.2-2.7,3.9-4.7c3-1.2,4.9-1.8,7.2-3.6c2.1,1.7,4.7,0.5,7.2-1.5c2.6-1.9,5.2-4.6,7.2-5.9c-4.5-5.3,1.4-8.2-6.9-9.2c0.9-0.1-0.3,1.2-2.7,3.5c-0.5,0.6-1.1,1.2-1.2,1.9c0-0.2-0.1-0.5-0.1-0.7c-2.5,2.1-5.6,4.9-9.3,8c0.8-5.1,2.1-10.2,8.9-10.4c-0.7-5.1-1.2-10.5-1.1-13.2c11.4,3.5,25,0.5,29.8,4.6c5.1-5.8,12.3-10.9,18.4-16.6c3.1-2.8,5.9-5.8,8.1-9c2.2-3.2,3.8-6.8,4.5-10.8c3.1-3.5,6.2,1,8.6,2.1c-1.6,2.3-4.4,3.5-4.7,5.8c1.5-1.7,3.7-3.4,6-5.1c2.3-1.7,4.9-3.2,7.2-5c4.6-3.4,8.2-6.9,7.3-11.5c5.9-0.4,5.3,2.2,4.9,3.9c-0.4,1.7-0.6,2.5,6-1.2l-0.8,3.4c4.1,0.2,7.7-0.2,11-1.1c3.2-0.9,6.2-2.3,8.9-4c2.7-1.7,5.3-3.7,7.8-5.9c2.5-2.2,5-4.4,7.5-6.7c2.5-2.2,5.2-4.5,7.9-6.5c1.4-1,2.8-2,4.3-2.8c1.5-0.8,3-1.6,4.7-2.2c6.5-2.6,14-3.8,23.2-1.3c-2.5-0.5-3.8-0.7-4.6-2.1c4.9-0.2,9.7-0.8,14.4-1.6c4.8-0.8,9.5-1.7,14.2-2.9c2.4-0.6,4.7-1.2,7.1-1.8c2.4-0.6,4.7-1.2,7.1-1.8l7.1-1.9l3.6-1l3.6-0.9c4.8-1.2,9.6-2.3,14.3-3.3c4.8-1,9.6-1.7,14.5-2.2c2.4-0.2,4.8-0.5,7.3-0.6c2.4-0.1,4.9-0.1,7.3,0c4.9,0.2,9.7,0.7,14.6,1.8c11,1.4,11.4-4.5,17.5-9.6l3.1,7.2l10.4-9.6c7.7-4,15,0.1,22.7,3.3c7.7,3.2,15.9,5.9,25.6-0.8l-2.9-4.8c7.3,0.5,22.9-4.4,22,1.5c0.7-1,2.1-5.3,5.1-2.9l0.4,3.9l17.6-7.6c14,2.1-1.4,15.5,18.9,15.3c7.5-1.8,21-12.3,18-14.8c-3.1-0.1-7.9-2.1-8.3-6l6.8-2.3c0.7-11.5,5.6-23.5-11.8-30.8l-11.6,7.6l-4.1-5.4l10-0.8c-5.9-5-9.3-0.2-13.2,3.2c-1.1-2.9-2.9-4.9-5.3-5.9l-11.1,11.6c-1.7-4.4,4.8-9.2-3.2-11.2c-5.2,5.4,5.8,9.8-3.1,13.6c-6-4.9-4.6-9.3-11-4.4c-1.1-2.9,0.2-4.9,2.8-6.3c-5.8,3.9-15.7,2.5-18.4,8.8c-6.4-6-20.1,3.1-20.3-7.8c-1.7,2.7-9.9,9.4-15.4,10.3c4.5-6.9-0.7-6.7-6.8-6.5c-6.1,0.3-13.2,0.5-12.6-6.5c-3.2,6.2-9.8,8.1-17.2,9.6c-3.7,0.7-7.6,1.4-11.4,2.3c-3.8,1-7.4,2.3-10.5,4.3c0.6-1,1.8-3.1,3.1-2.6c-7.6,0-10.2-3.2-15.4-4.7c0.4,9.7-10.9,13.7-16.1,20.5c-5.3-3.9-4.4-6.9-2.7-10c1.7-3.1,4.3-6.3,2.1-10.5c0.8,3.8-2.8,6.3-6.2,8.8c-3.3,2.4-6.4,4.6-4.2,7.5c-8-4.4-6.5-1.7-11.5-8.9c1,12-6.2,3.3-10.5,11.7c-5.6-1.9-6.9-4.5-8-6c-0.6-0.7-1.1-1.1-2.1-1c-1,0.1-2.6,0.8-5.2,2.4c-3-1.2-2.3-3.4-0.8-5.3c0.7-1,1.7-1.8,2.4-2.5C1835,1513.2,1835.6,1512.8,1835.6,1512.8zM1599.7,1648.3c0,0-0.1-0.1-0.1-0.1c1.6-1.7,3-3.2,3.9-4C1602.7,1644.9,1601.6,1646.2,1599.7,1648.3zM1583.2,1664.1c2.2-1.8,4.6-4.2,7.3-6.8c2.2,1.2,3.3,3.6,1.6,5c-0.1-1-1.4-0.8-3.1-0.3C1587.3,1662.7,1585.1,1663.6,1583.2,1664.1zM1649.1,1669.6c-1.9,2.8-3.5,2.4-4.8,1.6c1.1-1,2.3-2.4,3.9-4.2c-0.1-0.3-0.1-0.6-0.2-0.9C1648.5,1667.3,1649,1668.5,1649.1,1669.6z"/>
                      <path className="st1" d="M1648.1,1658.8c0.3-0.4,0.3-0.8,0.8-1.2c-0.9-0.1-1.7-0.1-2.5,0c0.1,0.8,0.3,1.7,0.4,2.4  C1647.2,1659.6,1647.7,1659.2,1648.1,1658.8z"/>
                      <path className="st1" d="M2381.3,1679.2l0.1,0.5c0-0.5,0.1-0.9,0.3-1.3C2381.6,1678.8,2381.4,1678.9,2381.3,1679.2z"/>
                      <polygon className="st1" points="1482.2,1959.8 1483.9,1959.5 1482,1957.7"/>
                      <path className="st1" d="M2319.2,1573.6c0.2-0.6,0.3-1.4-0.1-2.4C2318.9,1571.6,2319,1572.5,2319.2,1573.6z"/>
                      <path className="st1" d="M2277.9,1539.5l-4.9-6.3C2275,1536.2,2276.6,1538.1,2277.9,1539.5z"/>
                      <path className="st1" d="M2244.9,1514.5c-1.1,0.8-1.6,1.5-2.2,2.2c0,0,0,0,0,0.1L2244.9,1514.5z"/>
                      <path className="st1" d="M2466,2087.3c-0.2,0.5-0.2,1.1-0.2,1.6C2465.7,2093,2466.1,2090.4,2466,2087.3z"/>
                      <path className="st1" d="M2474.5,1891.7c1.4,2,2.8,3.9,3.7,6C2478.5,1894.2,2478.4,1891.5,2474.5,1891.7z"/>
                      <path className="st1" d="M2348.7,2280c0,0,0,0-0.1-0.1c-0.4,0.3-0.7,0.6-1.1,0.9L2348.7,2280z"/>
                      <path className="st1" d="M2478.5,1906.8c1.2-3.5,0.9-6.4-0.3-9C2478,1900.6,2477.3,1904,2478.5,1906.8z"/>
                      <path className="st1" d="M2076.6,1451.8l-2-0.6c0,0.5-0.2,0.8-0.4,1.1L2076.6,1451.8z"/>
                      <path className="st1" d="M2074.3,1452.3l-2.3,0.5C2073,1452.9,2073.8,1453,2074.3,1452.3z"/>
                      <path className="st1" d="M2067.1,1453.9c0,0,1.2-0.3,2.4-0.6c0.6-0.1,1.2-0.3,1.7-0.4c0.5-0.1,0.8-0.2,0.8-0.2 C2070.3,1452.5,2068.4,1452,2067.1,1453.9z"/>
                      <path className="st1" d="M2129.9,1466.4l1.3-2.3C2130.7,1464.5,2130.3,1465.3,2129.9,1466.4z"/>
                      <path className="st1" d="M2146.2,1470.4c-3.6-1.7-8.1-8-13.9-8.1l-1,1.8c1.8-1.5,4.3,0.9,7,3.2  C2140.9,1469.6,2143.7,1471.9,2146.2,1470.4z"/>
                      <path className="st1" d="M2197.7,1524c0,0-2.8-1.9-5.5-3.7c-1.4-1-2.8-1.8-3.8-2.5c-1.1-0.7-1.8-1.1-1.8-1.1c1,3.4,2.3,7.8-3.4,6.1 c2.9,3.5,4.3,4.8,5,4.9c0.7,0.2,0.8-0.9,0.9-2.1C2189.4,1523.1,2190.1,1519.8,2197.7,1524z"/>
                      <path className="st1" d="M2231.6,1546.5c-6.6-2.5-1.9,3.4-3,4.5C2233.6,1551.1,2234.9,1551.2,2231.6,1546.5z"/>
                      <path className="st1" d="M2418.7,1762.5l-6.1,1.7C2415.4,1768.8,2414.9,1763.3,2418.7,1762.5z"/>
                      <polygon className="st1" points="2467.3,1807.5 2469.7,1801.1 2463.4,1800"/>
                      <polygon className="st1" points="2430.5,1849.8 2429.2,1847.7 2432.9,1856"/>
                      <path className="st1" d="M2265.9,2261.9l4.9,6.3c1.3-1.4,1-4.2,0-5.9c-0.5-0.9-1.2-1.5-2.1-1.7  C2267.8,2260.4,2266.9,2260.8,2265.9,2261.9z"/>
                      <path className="st1" d="M2064.1,2299.2c-2.2-4-8.1-6.7-12-3.1C2056.9,2296.9,2061.6,2300.1,2064.1,2299.2z"/>
                      <polygon className="st1" points="1557.7,1998.8 1561.5,2001.7 1556.9,1995.3 			"/>
                    </g>
                  </g>
                </g>
                <g id="Layer_4"></g>
              </svg>
            </div>
            <div className="card-block">
              <h4 className="card-title">Book</h4>
            </div>
            <div className="card-block">
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card__two">
            <div className="lamp">
              <div dangerouslySetInnerHTML={{ __html: svgString__two }} className="lamp lamp--left">
              </div>
            </div>
            <div className="calendar">
              <svg version="1.1" width="100%" height="50%" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 5000 6000" style={{enableBackground: 'new 0 0 5000 6000'}} xmlSpace="preserve">
                <g id="Layer_2"></g>
                <g id="Layer_1">
                  <path className="st0" d="M3735.3,2974.2H1083c-146,0-265.5-119.5-265.5-265.5V531.9c0-236.8,193.7-430.5,430.5-430.5h2322.2c236.8,0,430.5,193.7,430.5,430.5v2176.8C4000.8,2854.8,3881.3,2974.2,3735.3,2974.2z"/>
                  <path className="st1" d="M4000.8,848.1H817.5V531.9c0-236.8,193.7-430.5,430.5-430.5h2322.2c236.8,0,430.5,193.7,430.5,430.5V848.1z"/>
                  <path className="st2" d="M1335.5,318.6L1335.5,318.6c-35.6,0-64.8-29.1-64.8-64.8V101.4h129.5v152.5 C1400.3,289.5,1371.2,318.6,1335.5,318.6z"/>
                  <path className="st2" d="M2101.8,318.6L2101.8,318.6c-35.6,0-64.8-29.1-64.8-64.8V101.4h129.5v152.5 C2166.6,289.5,2137.4,318.6,2101.8,318.6z"/>
                  <path className="st2" d="M2818.5,318.6L2818.5,318.6c-35.6,0-64.8-29.1-64.8-64.8V101.4h129.5v152.5 C2883.3,289.5,2854.1,318.6,2818.5,318.6z"/>
                  <path className="st2" d="M3540.3,318.6L3540.3,318.6c-35.6,0-64.8-29.1-64.8-64.8c0,0,0-141.3,0-152.5c0-10.2,129.5,1.4,129.5,1.4  v151.1C3605,289.5,3575.9,318.6,3540.3,318.6z"/>
                  <path className="st3" d="M2076.3,296.8L2076.3,296.8c-35.6,0-64.8-29.1-64.8-64.8V65.1c0-35.6,29.1-64.8,64.8-64.8h0 c35.6,0,64.8,29.1,64.8,64.8v166.9C2141,267.7,2111.9,296.8,2076.3,296.8z"/>
                  <path className="st3" d="M2796.6,296.8L2796.6,296.8c-35.6,0-64.8-29.1-64.8-64.8V65.1c0-35.6,29.1-64.8,64.8-64.8h0 c35.6,0,64.8,29.1,64.8,64.8v166.9C2861.3,267.7,2832.2,296.8,2796.6,296.8z"/>
                  <path className="st3" d="M3516.9,296.8L3516.9,296.8c-35.6,0-64.8-29.1-64.8-64.8V65.1c0-35.6,29.1-64.8,64.8-64.8h0 c35.6,0,64.8,29.1,64.8,64.8v166.9C3581.6,267.7,3552.5,296.8,3516.9,296.8z"/>
                  <path className="st4" d="M3732.2,2174.4l-753,791.7c0,0,28.5-139.4,28.7-227c0.1-55.6-11.2-104.2-15.1-184.1 c-10.7-224.1,119.1-281.2,180.3-314.4c94-50.9,248.1-13.2,341-19.3C3553.5,2218.9,3703,2212.3,3732.2,2174.4z"/>
                  <path className="st5" d="M3981.7,2124.6l-1002.4,841.6c0,0,49.8-160,59.7-262.6c6.2-65.2-2.3-123.3,1.7-217.3  c11.4-263.8,175.5-315.8,253.7-347.7c119.9-48.9,303.3,12.8,417,16.3C3759.4,2156.3,3941.9,2165.7,3981.7,2124.6z"/>
                  <rect x="1146" y="1265.9" className="st3" width="424.6" height="275.3"/>
                  <rect x="1146" y="1755.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="1821.8" y="1755.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="2497.5" y="1755.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="3160.2" y="1755.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="1146" y="2245.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="1821.8" y="2245.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="2497.5" y="2245.8" className="st3" width="424.6" height="275.3"/>
                  <rect x="1821.8" y="1265.9" className="st3" width="424.6" height="275.3"/>
                  <rect x="2497.5" y="1265.9" className="st3" width="424.6" height="275.3"/>
                  <rect x="3173.2" y="1265.9" className="st3" width="424.6" height="275.3"/>
                  <path className="st3" d="M1309.8,296.8L1309.8,296.8c-35.6,0-64.8-29.1-64.8-64.8V65.1c0-35.6,29.1-64.8,64.8-64.8h0 c35.6,0,64.8,29.1,64.8,64.8v166.9C1374.6,267.7,1345.5,296.8,1309.8,296.8z"/>
                </g>
                <g id="Layer_5">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="1%" y="25%" height="20%" viewBox="0 0 32.001 32.001" style={{enableBackground:'new 0 0 32.001 32.001'}} xmlSpace="preserve">
                    <g>
                      <g id="search_1_">
                        <path style={{fill:'#010002'}} d="M20,0c-6.627,0-12,5.373-12,12c0,2.026,0.507,3.933,1.395,5.608L1.052,25.95l0.007,0.006    c-0.652,0.641-1.058,1.529-1.058,2.516c0,1.949,1.58,3.529,3.529,3.529c0.985,0,1.874-0.406,2.515-1.059L6.043,30.94l8.341-8.34    C16.059,23.491,17.969,24,20,24c6.627,0,12-5.373,12-12S26.628,0,20,0z M4.796,29.692c-0.322,0.334-0.768,0.543-1.266,0.543    c-0.975,0-1.765-0.789-1.765-1.764c0-0.498,0.21-0.943,0.543-1.266l-0.009-0.008l8.066-8.066c0.705,0.951,1.545,1.791,2.494,2.498    L4.796,29.692z M20,22.001c-5.522,0-10-4.479-10-10c0-5.522,4.478-10,10-10c5.521,0,10,4.478,10,10    C30,17.522,25.521,22.001,20,22.001z"/>
                        <path style={{fill:'#010002'}} d="M20,5c-3.867,0-7,3.134-7,7c0,0.276,0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5c0-3.313,2.686-6,6-6    c0.275,0,0.5-0.224,0.5-0.5S20.275,5,20,5z"/>
                      </g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                  </svg>
                </g>
                <g id="Layer_4"></g>
              </svg>
            </div>
            <div className="card-block">
              <h4 className="card-title">Consult</h4>
            </div>
            <div className="card-block">
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card__three">
            <div className="lamp">
              <div dangerouslySetInnerHTML={{ __html: svgString__three }} className="lamp lamp--left">
              </div>
            </div>
            <div className="card-block">
              <h4 className="card-title">Simulation</h4>
            </div>
            <div className="card-block">
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class FirstSectionHome extends Component {
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
        if(responseData.motorist == undefined){
          this.setState({
            accountType: 'tvg'
          });
        }else{
          this.setState({
            accountType: 'motorist'
          });
        }
      }else{
        $('.sessionVariables').submit();
      }
    });
  }
  render() {
    return (
      <section className="firstsection row">
        <form data-ajax="false" className="sessionVariables" action="/authRedirection" method="post"></form>
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
        <PictureModal />
      </section>
    );
  }
}
class FirstSectionReservation extends Component {
  constructor(props){
    super(props);
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
        console.log('account active');
      }else{
        $('.sessionVariables').submit();
      }
    });
  }
  render() {
    return (
      <section className="firstsection row">
        <form data-ajax="false" className="sessionVariables" action="/authRedirection" method="post"></form>
        <a href="#" className="col disabled reservation-firstsection">
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
          <ReservationContent />
        </a>
        <ContactUsModal />
        <VehicleModal />
        <PictureModal />
        <BookingModal />
        <CentresByRegionModal />
      </section>
    );
  }
}
class FirstSectionAbout extends Component {
  constructor(props){
    super(props);
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
        console.log('account active');
      }else{
        $('.sessionVariables').submit();
      }
    });
  }
  render() {
    return (
      <section className="firstsection row">
        <form data-ajax="false" className="sessionVariables" action="/authRedirection" method="post"></form>
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
          <h3>About</h3>
        </a>
        <ContactUsModal />
        <VehicleModal />
        <PictureModal />
      </section>
    );
  }
}
class FirstSectionStatistics extends Component {
  constructor(props){
    super(props);
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
        console.log('account active');
      }else{
        $('.sessionVariables').submit();
      }
    });
  }
  render() {
    return (
      <section className="firstsection row">
        <form data-ajax="false" className="sessionVariables" action="/authRedirection" method="post"></form>
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
          <h3>Statistics</h3>
        </a>
        <ContactUsModal />
        <VehicleModal />
        <PictureModal />
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

class Home extends Component {
  render() {
    return (
      <main role="main">
        <FirstSectionHome contactinfo={["(212) 6 54 52 84 92 | Marjane 1, 2", <sup>ème</sup>,  " tranche n°51, Meknès Maroc."]} />
        <Footer contactinfo={["TheOPDude Inc.",<br/>,"Marjane 1, 2",<sup>ème</sup>," tranche n°51",<br/>,"Meknès Maroc, 50000."]} />
      </main>
    );
  }
}
class Reservation extends Component {
  render() {
    return (
      <main role="main">
        <FirstSectionReservation contactinfo={["(212) 6 54 52 84 92 | Marjane 1, 2", <sup>ème</sup>,  " tranche n°51, Meknès Maroc."]} />
        <Footer contactinfo={["TheOPDude Inc.",<br/>,"Marjane 1, 2",<sup>ème</sup>," tranche n°51",<br/>,"Meknès Maroc, 50000."]} />
      </main>
    );
  }
}
class About extends Component {
  render() {
    return (
      <main role="main">
        <FirstSectionAbout contactinfo={["(212) 6 54 52 84 92 | Marjane 1, 2", <sup>ème</sup>,  " tranche n°51, Meknès Maroc."]} />
        <Footer contactinfo={["TheOPDude Inc.",<br/>,"Marjane 1, 2",<sup>ème</sup>," tranche n°51",<br/>,"Meknès Maroc, 50000."]} />
      </main>
    );
  }
}
class Statistics extends Component {
  render() {
    return (
      <main role="main">
        <FirstSectionStatistics contactinfo={["(212) 6 54 52 84 92 | Marjane 1, 2", <sup>ème</sup>,  " tranche n°51, Meknès Maroc."]} />
        <Footer contactinfo={["TheOPDude Inc.",<br/>,"Marjane 1, 2",<sup>ème</sup>," tranche n°51",<br/>,"Meknès Maroc, 50000."]} />
      </main>
    );
  }
}

class App extends Component {
  componentDidMount(){
    $('.drawer').drawer();
    $('.tooltipTop').tooltip({'placement': 'top'});
  }
  render() {
    return (
      <BrowserRouter basename='/profil'>
        <div className="container-fluid">
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/reservation' component={Reservation} />
            <Route exact path='/about' component={About} />
            <Route exact path='/statistics' component={Statistics} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react')
);

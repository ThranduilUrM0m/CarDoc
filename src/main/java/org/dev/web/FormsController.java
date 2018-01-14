package org.dev.web;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.dev.entities.Account;
import org.dev.entities.Booking;
import org.dev.entities.Motorist;
import org.dev.entities.Picture;
import org.dev.entities.Tvg;
import org.dev.entities.Vehicle;
import org.dev.mail.MailSender;
import org.dev.metier.AccountMetier;
import org.dev.metier.BookingMetier;
import org.dev.metier.MotoristMetier;
import org.dev.metier.PictureMetier;
import org.dev.metier.TVGMetier;
import org.dev.metier.VehicleMetier;
import org.hibernate.validator.constraints.Email;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FormsController {
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-M-dd");
	SimpleDateFormat sdfTime = new SimpleDateFormat("yyyy-M-dd hh:mm");
	@Autowired 
	private HttpSession httpSession;
    @Autowired
    private TVGMetier iTVGMetier;
    @Autowired
    private MotoristMetier iMotoristMetier;
    @Autowired
    private AccountMetier iAccountMetier;
    @Autowired
    private VehicleMetier iVehicleMetier;
    @Autowired
    private PictureMetier iPictureMetier;
    @Autowired
    private BookingMetier iBookingMetier;
    
    @Autowired
    private Environment env;
    /**
     * POST /uploadFile -> receive and locally save a file.
     * 
     * @param uploadfile The uploaded file as Multipart file parameter in the 
     * HTTP request. The RequestParam name must be the same of the attribute 
     * "name" in the input tag with type file.
     * 
     * @return An http OK status in case of success, an http 4xx status in case 
     * of errors.
     */
    @Value("${upload.dir}")
    private String uploadDir;
    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> uploadFile(@RequestParam("uploadfile") MultipartFile uploadfile) {
      try {
        // Get the filename and build the local file path
        String filename = uploadfile.getOriginalFilename();
        String directory = uploadDir;
        String filepath = Paths.get(directory, filename).toString();
        
        // Save the file locally
        BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
        stream.write(uploadfile.getBytes());
        stream.close();
        
        // Save the file Info in Database
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	Account accountLogged = iAccountMetier.getAccountByUsername(auth.getName());
    	Picture pictureInCreation = iPictureMetier.createPicture(filename.split("\\.")[0], filename.split("\\.")[1], new java.sql.Date(Calendar.getInstance().getTime().getTime()), accountLogged);
        return new ResponseEntity<>(HttpStatus.OK);
      }
      catch (Exception e) {
        System.err.println(e.getMessage());
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
    } // method uploadFile
    
    @RequestMapping(value = "/selectFile", method = RequestMethod.POST)
    @ResponseBody
    public void selectFile(@RequestParam("pictureId") String pictureId) {
      try {
        // Save the file Info in Database
    	Picture pictureSelected = iPictureMetier.getPicture(Long.valueOf(pictureId).longValue());
    	pictureSelected.setInsertDate(new java.sql.Date(Calendar.getInstance().getTime().getTime()));
    	iPictureMetier.updatePicture(pictureSelected);
      }
      catch (Exception e) {
        System.err.println(e.getMessage());
      }
    }
    
    @RequestMapping(value = "/deleteFile", method = RequestMethod.POST)
    @ResponseBody
    public void deleteFile(@RequestParam("pictureId") String pictureId) {
      try {
        // get the file Info in Database
    	Picture pictureSelected = iPictureMetier.getPicture(Long.valueOf(pictureId).longValue());
    	
    	// Get the filename and build the local file path
        String filename = pictureSelected.getPictureName()+"."+pictureSelected.getPictureExtension();
        String directory = uploadDir;
        String filepath = Paths.get(directory, filename).toString();

    	// Delete
    	File file = new File(filepath);
    	boolean result = Files.deleteIfExists(file.toPath());
    	
    	// delete from database
    	iPictureMetier.deletePicture(pictureSelected);
      }
      catch (Exception e) {
        System.err.println(e.getMessage());
      }
    }
        
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(Model model, String error, String logout) {
        if (error != null)
            model.addAttribute("error", "Your username and password is invalid.");
        if (logout != null)
            model.addAttribute("message", "You have been logged out successfully.");
        return "login";
    }
    
    @RequestMapping(value = "/validateEmail", method = RequestMethod.GET)
	public void validateEmail(@RequestParam("accountLogin") String accountLogin) {
        try{
        	SecurityContextHolder.clearContext();
        	Account accountValidated = iAccountMetier.getAccountByUsername(accountLogin);
        	accountValidated.setActivated(true);
        	iAccountMetier.updateAccount(accountValidated);
        }
        catch (Exception ex) {
            System.err.println(ex.getMessage());
        }
	}
    
    @RequestMapping(value = "/authRedirection", method = RequestMethod.POST)
    public void redirect(HttpServletResponse response) throws IOException {
    	SecurityContextHolder.clearContext();
		response.sendRedirect("/success?incoming=activate");
    }
    
    @RequestMapping(value = "/auth", method = RequestMethod.GET)
    public Account getLogged() throws IOException{
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	Account accountLogged = iAccountMetier.getAccountByUsername(auth.getName());
    	return accountLogged;
    }
    
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
    public void saveAccount(Model model, 	@RequestParam(name = "login", required = true) String login, 
    										@RequestParam(name = "passwordnew", required = true) String passwordnew, 
    										@RequestParam(name = "signupas", required = true) String signupas,
    										HttpServletResponse response) throws Exception {
        try {
        	if(login.equals(passwordnew) || login.length() < 6 || passwordnew.length() < 6 || (!signupas.toLowerCase().equals("motorist") && !signupas.toLowerCase().equals("tvg")))
        		response.sendRedirect("/?error=invalidForm");
        	else {
        		Account accountInConsult = iAccountMetier.getAccountByUsername(login);
        		if(accountInConsult != null) {
        			response.sendRedirect("/?error=repeatedLogin");
        		}else {
        			httpSession.setAttribute("login", login);
                	httpSession.setAttribute("password", passwordnew);
                	httpSession.setAttribute("signupas", signupas);
                	response.sendRedirect("/register");
        		}
        	}
        } catch (Exception e) {
        	model.addAttribute("error", e);
        	response.sendRedirect("/?errorcatched=" + e.getMessage());
        }
    }
	
	@RequestMapping(value = "/sessionLP", method = RequestMethod.GET)
	public String sessionLP() {
		try {
			JSONObject obj = new JSONObject();
			obj.put("login", httpSession.getAttribute("login"));
			obj.put("password", httpSession.getAttribute("password"));
			obj.put("signupas", httpSession.getAttribute("signupas"));
			return obj.toString();
		} catch (Exception e) {
			return e.getMessage();
		}
	}
    
	@Autowired @Qualifier("zakariaeboutaleb@gmail.com")
	public MailSender mailSender;
	
	@RequestMapping(value = "/emailvalidation", method = RequestMethod.POST)
	public void emailValidation(Account account, String email) {
        try{
        	String body = "Dear " + account.getAccountLogin()
            + ", thank you for placing your trust in us, "
            + "Please refer to the link below to activate your account "
            + "localhost:8080/success?incoming="+account.getToken();
        	mailSender.sendMail("zakariaeboutaleb@gmail.com", email, "Validation email", body);
			httpSession.removeAttribute("login");
			httpSession.removeAttribute("password");
			httpSession.removeAttribute("signupas");
        }
        catch (Exception ex) {
            System.err.println(ex.getMessage());
        }
	}

	protected String error ;
	public boolean isValidDateStr(String date) {
		Date testDate = null;
		Boolean testDateB = false;
		try{
		    testDate = sdf.parse(date);
		    try {
		    	testDateB = sdf.format(testDate).equals(date);
				return true;
		    } catch(Exception e) {
		    	error = e.getMessage();
			    return false;
		    }
		} catch (Exception e){
			error = e.getMessage();
		    return false;
		}
	}
	
	@RequestMapping(value = "/signuptvg", method = RequestMethod.POST)
	public void saveTvg(Model model, 	@RequestParam(name = "login", required = true) String login, 
										@RequestParam(name = "password", required = true) String password, 
										@RequestParam(name = "signupas", required = true) String signupas,
										@RequestParam(name = "tvgLegalname", required = true) String tvgLegalname,
										@RequestParam(name = "tvgLegaladresse", required = true) String tvgLegaladresse,
										@RequestParam(name = "tvgCreationdate", required = true) String tvgCreationdate,
										@RequestParam(name = "tvgCity", required = true) String tvgCity,
										@RequestParam(name = "tvgCountry", required = true) String tvgCountry,
										@RequestParam(name = "tvgRegion", required = true) String tvgRegion,
										@RequestParam(name = "tvgEmail", required = true) @Email(message="Please provide a valid email address") @Pattern(regexp=".+@.+\\..+", message="Please provide a valid email address") String tvgEmail,
										@RequestParam(name = "tvgPhone", required = true) @Pattern(regexp="^([0|\\+[0-9]{1,5})?([0-9]{10})$", message="Please provide a valid phone number") String tvgPhone,
										@RequestParam(name = "tvgDaystartA", required = true) @Pattern(regexp="^0[0-9]|1[0-9]|2[0-3]:[0-5][0-9]$", message="Please provide a valid time") String tvgDaystartA,
										@RequestParam(name = "tvgDaystartB", required = true) @Pattern(regexp="^0[0-9]|1[0-9]|2[0-3]:[0-5][0-9]$", message="Please provide a valid time") String tvgDaystartB,
										@RequestParam(name = "tvgDayendA", required = true) @Pattern(regexp="^0[0-9]|1[0-9]|2[0-3]:[0-5][0-9]$", message="Please provide a valid time") String tvgDayendA,
										@RequestParam(name = "tvgDayendB", required = true) @Pattern(regexp="^0[0-9]|1[0-9]|2[0-3]:[0-5][0-9]$", message="Please provide a valid time") String tvgDayendB,
										HttpServletResponse response) throws IOException {
		try {
        	if(login.equals(password) || login.length() < 6 || password.length() < 6 || (!signupas.toLowerCase().equals("motorist") && !signupas.toLowerCase().equals("tvg")))
        		response.sendRedirect("/?error=invalidLogin");
        	else {
        		if(!isValidDateStr(tvgCreationdate))
        			response.sendRedirect("/register?error="+error);
        		else {
        			Motorist motoristInConsult = iMotoristMetier.getMotoristByIpersonEmail(tvgEmail);
					Tvg tvgInConsult = iTVGMetier.consulteTVGByEmail(tvgEmail);
					if(motoristInConsult != null || tvgInConsult != null) {
	        			response.sendRedirect("/?error=repeatedEmail");
	        		}else {
	        			Tvg tvgInCreation = iTVGMetier.createTVG(tvgLegalname, tvgLegaladresse, sdf.parse(tvgCreationdate), tvgCity, tvgCountry, tvgRegion, tvgEmail, tvgPhone, tvgDaystartA, tvgDaystartB, tvgDayendA, tvgDayendB, true, null, null, new Account(login, password, new java.sql.Date(Calendar.getInstance().getTime().getTime()), false, null, null, null, null, null, null, "ROLE_TVG"));
	        			model.addAttribute("TVG", tvgInCreation);
	        			emailValidation(tvgInCreation.getAccount(), tvgEmail);
	                	response.sendRedirect("/success?emailValidation=" + tvgEmail);
	        		}
        		}
        	}
        } catch (Exception e) {
        	model.addAttribute("error", e);
        	response.sendRedirect("/register?error=" + e.getMessage());
        }
	}
	
	@RequestMapping(value = "/signupmotorist", method = RequestMethod.POST)
	public void saveMotorist(Model model,@RequestParam(name = "login", required = true) String login, 
										 @RequestParam(name = "password", required = true) String password, 
										 @RequestParam(name = "signupas", required = true) String signupas,
										 @RequestParam(name = "ipersonLastname", required = true) String ipersonLastname,
										 @RequestParam(name = "ipersonFirstname", required = true) String ipersonFirstname,
										 @RequestParam(name = "ipersonBirthday", required = true) String ipersonBirthday,
										 @RequestParam(name = "ipersonCountry", required = true) String ipersonCountry,
										 @RequestParam(name = "ipersonCity", required = true) String ipersonCity,
										 @RequestParam(name = "ipersonNationalcardid", required = true) @Size(min = 7) String ipersonNationalcardid,
										 @RequestParam(name = "ipersonEmail", required = true) @Email(message="Please provide a valid email address") @Pattern(regexp=".+@.+\\..+", message="Please provide a valid email address") String ipersonEmail,
										 @RequestParam(name = "ipersonPhone", required = true) @Pattern(regexp="^([0|\\+[0-9]{1,5})?([0-9]{10})$", message="Please provide a valid phone number") String ipersonPhone,
										 @RequestParam(name = "vehicleBrand", required = true) String vehicleBrand,
										 @RequestParam(name = "vehicleType", required = true)  String vehicleType,
										 @RequestParam(name = "vehicleFirstCirculation", required = true) String vehicleFirstCirculation,
										 @RequestParam(name = "vehicleRegistration", required = true) String vehicleRegistration,
										 HttpServletResponse response) throws IOException {
		if(login.equals(password) || login.length() < 6 || password.length() < 6 || (!signupas.toLowerCase().equals("motorist") && !signupas.toLowerCase().equals("tvg")))
    		response.sendRedirect("/?error=invalidLogin");
    	else {
    		if(!isValidDateStr(ipersonBirthday))
    			response.sendRedirect("/register?error="+error+":"+ipersonBirthday);
    		else {
    			if(!isValidDateStr(vehicleFirstCirculation))
    				response.sendRedirect("/register?error="+error+":"+vehicleFirstCirculation);
    			else {
    				if((!vehicleType.toLowerCase().equals("car (light vehicles)") && !vehicleType.toLowerCase().equals("gas-powered vehicles") && !vehicleType.toLowerCase().equals("collection vehicles") && !vehicleType.toLowerCase().equals("utilities") && !vehicleType.toLowerCase().equals("electric vehicles") && !vehicleType.toLowerCase().equals("specific vehicles")))
    					response.sendRedirect("/profil?error=Vehicle_Type_Error");
    				else {
    					Motorist motoristInConsult = iMotoristMetier.getMotoristByIpersonEmail(ipersonEmail);
    					Tvg tvgInConsult = iTVGMetier.consulteTVGByEmail(ipersonEmail);
    					if(motoristInConsult != null || tvgInConsult != null) {
    	        			response.sendRedirect("/?error=repeatedEmail");
    	        		}else {
    	        			try {
            					Motorist motoristInCreation = iMotoristMetier.createMotorist(ipersonLastname, ipersonFirstname, (sdf.parse(ipersonBirthday)), ipersonCountry, ipersonCity, ipersonNationalcardid, ipersonEmail, ipersonPhone, "MO_"+login, new Account(login, password, new java.sql.Date(Calendar.getInstance().getTime().getTime()), false, null, null, null, null, null, null, "ROLE_MOTORIST"), vehicleBrand, vehicleType, (sdf.parse(vehicleFirstCirculation)), vehicleRegistration);
                    			emailValidation(motoristInCreation.getAccount(), ipersonEmail);
                            	response.sendRedirect("/success?emailValidation=" + ipersonEmail);
            				} catch (ParseException e) {
            					response.sendRedirect("/register?Parseerror=" + e);
        					}
    	        		}
    				}
    			}
    		}
    	}
	}

	public boolean isBetween(int fromIncoming, int toIncoming, Date dateIncoming) {
		int from = fromIncoming;
	    int to = toIncoming;
	    Calendar c = Calendar.getInstance();
	    c.setTime(dateIncoming);
	    int t = c.get(Calendar.HOUR_OF_DAY) * 100 + c.get(Calendar.MINUTE);
	    return to > from && t >= from && t <= to || to < from && (t >= from || t <= to);
	}
	
	@RequestMapping(value = "/addBooking", method = RequestMethod.POST)
	public void saveBooking(Model model, 
							@RequestParam(name = "bookingDate", required = true) String bookingDate,
							@RequestParam(name = "vehicleId", required = true) String vehicleId,
							@RequestParam(name = "tvgId", required = true) String tvgId,
							HttpServletResponse response) throws IOException, NumberFormatException, ParseException {
		if(!isValidDateStr(bookingDate))
			response.sendRedirect("/profil?error="+error+":"+bookingDate);
		else {
			if(iBookingMetier.getBookingByBookingDate(sdfTime.parse(bookingDate)) == null) {
				try {
					Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			    	Account accountLogged = iAccountMetier.getAccountByUsername(auth.getName());
			    	long vId = Long.valueOf(vehicleId).longValue();
			    	long tId = Long.valueOf(tvgId).longValue();
			    	
			    	int DaystartA = Integer.parseInt(iTVGMetier.getTvg(tId).getTvgDaystartA().split(":")[0]+iTVGMetier.getTvg(tId).getTvgDaystartA().split(":")[1]);
			    	int DayendA = Integer.parseInt(iTVGMetier.getTvg(tId).getTvgDayendA().split(":")[0]+iTVGMetier.getTvg(tId).getTvgDayendA().split(":")[1]);
			    	int DaystartB = Integer.parseInt(iTVGMetier.getTvg(tId).getTvgDaystartB().split(":")[0]+iTVGMetier.getTvg(tId).getTvgDaystartB().split(":")[1]);
			    	int DayendB = Integer.parseInt(iTVGMetier.getTvg(tId).getTvgDayendB().split(":")[0]+iTVGMetier.getTvg(tId).getTvgDayendB().split(":")[1]);
			    	
			    	if(isBetween(DaystartA, DayendA, sdfTime.parse(bookingDate)) || isBetween(DaystartB, DayendB, sdfTime.parse(bookingDate))) {
			    		iBookingMetier.createBooking((sdfTime.parse(bookingDate)), new java.sql.Date(Calendar.getInstance().getTime().getTime()), false, accountLogged, iVehicleMetier.getVehicle(vId), null, null, iTVGMetier.getTvg(tId));
		            	response.sendRedirect("/profil");
			    	} else {
			    		System.err.println(isBetween(DaystartA, DayendA, sdfTime.parse(bookingDate))+" FUCK A");
			    		System.err.println(isBetween(DaystartB, DayendB, sdfTime.parse(bookingDate))+" FUCK B");
			    		response.sendRedirect("/profil?Timeerror=booking_out_of_boundaries:"+bookingDate);
			    	}
				} catch (ParseException e) {
					response.sendRedirect("/profil?Parseerror=" + e);
				}
			}else {
				response.sendRedirect("/profil?error=booking_crushing:"+bookingDate);
			}
		}
	}
	
	@RequestMapping(value = "/deleteBooking", method = RequestMethod.POST)
	public void deleteBooking(Model model, 
							@RequestParam(name = "bookingDate", required = true) String bookingDate,
							HttpServletResponse response) throws IOException {
		if(!isValidDateStr(bookingDate))
			response.sendRedirect("/profil?error="+error+":"+bookingDate);
		else {
			try {
				Date bDate = sdfTime.parse(bookingDate);
				iBookingMetier.deleteBooking(bDate);
				response.sendRedirect("/profil");
			} catch (Exception e) {
				response.sendRedirect("/profil?Parseerror=" + e);
			}
		}
	}
	
	@RequestMapping(value = "/vehicleAdd", method = RequestMethod.POST)
	public void saveVehicle(Model model, 
							@RequestParam(name = "vehicleBrand", required = true) String vehicleBrand,
							@RequestParam(name = "vehicleType", required = true)  String vehicleType,
							@RequestParam(name = "vehicleFirstCirculation", required = true) String vehicleFirstCirculation,
							@RequestParam(name = "vehicleRegistration", required = true) String vehicleRegistration,
							HttpServletResponse response) throws IOException {
		if(!isValidDateStr(vehicleFirstCirculation))
			response.sendRedirect("/profil?error="+error+":"+vehicleFirstCirculation);
		else {
			if((!vehicleType.toLowerCase().equals("car (light vehicles)") && !vehicleType.toLowerCase().equals("gas-powered vehicles") && !vehicleType.toLowerCase().equals("collection vehicles") && !vehicleType.toLowerCase().equals("utilities") && !vehicleType.toLowerCase().equals("electric vehicles") && !vehicleType.toLowerCase().equals("specific vehicles")))
				response.sendRedirect("/profil?error=Vehicle_Type_Error");
			else {
				try {
					Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			    	Account accountLogged = iAccountMetier.getAccountByUsername(auth.getName());
					Vehicle vehicleInCreation = iVehicleMetier.createVehicle(vehicleBrand, vehicleType, (sdf.parse(vehicleFirstCirculation)), vehicleRegistration, accountLogged.getMotorist());
	            	response.sendRedirect("/profil");
				} catch (ParseException e) {
					response.sendRedirect("/profil?Parseerror=" + e);
				}
			}
		}
	}
	
	@RequestMapping(value = "/vehicleUpdate", method = RequestMethod.POST)
	public void updateVehicle(	Model model, 
								@RequestParam(name = "dataId", required = true) String vehicleId,
								@RequestParam(name = "vehicleBrand", required = true) String vehicleBrand,
								@RequestParam(name = "vehicleType", required = true)  String vehicleType,
								@RequestParam(name = "vehicleFirstCirculation", required = true) String vehicleFirstCirculation,
								@RequestParam(name = "vehicleRegistration", required = true) String vehicleRegistration,
								HttpServletResponse response) throws IOException {
		if(!isValidDateStr(vehicleFirstCirculation))
			response.sendRedirect("/profil?error="+error+":"+vehicleFirstCirculation);
		else {
			if((!vehicleType.toLowerCase().equals("car (light vehicles)") && !vehicleType.toLowerCase().equals("gas-powered vehicles") && !vehicleType.toLowerCase().equals("collection vehicles") && !vehicleType.toLowerCase().equals("utilities") && !vehicleType.toLowerCase().equals("electric vehicles") && !vehicleType.toLowerCase().equals("specific vehicles")))
				response.sendRedirect("/profil?error=Vehicle_Type_Error");
			else {
				try {
					Vehicle vehicleUpdating = iVehicleMetier.getVehicle(Long.valueOf(vehicleId).longValue());
					
					vehicleUpdating.setVehicleBrand(vehicleBrand);
					vehicleUpdating.setVehicleType(vehicleType);
					vehicleUpdating.setVehicleFirstCirculation((sdf.parse(vehicleFirstCirculation)));
					vehicleUpdating.setVehicleRegistration(vehicleRegistration);
					
		        	iVehicleMetier.updateVehicle(vehicleUpdating);
		        	
					response.sendRedirect("/profil");
				} catch (ParseException e) {
					response.sendRedirect("/profil?Parseerror=" + e);
				}
			}
		}
	}
	
	@RequestMapping(value = "/vehicleDelete", method = RequestMethod.POST)
	public void deleteVehicle(	Model model, 
								@RequestParam(name = "dataId", required = true) String vehicleId,
								HttpServletResponse response) throws IOException {
		try {
        	iVehicleMetier.deleteVehicle(Long.valueOf(vehicleId).longValue());
			response.sendRedirect("/profil");
		} catch (Exception e) {
			response.sendRedirect("/profil?Parseerror=" + e);
		}
	}

}

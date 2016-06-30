package giraffe.miausicbox.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.Event;
import giraffe.miausicbox.repositories.BandRepository;
import giraffe.miausicbox.repositories.EventRepository;
import giraffe.miausicbox.repositories.UserRepository;
import giraffe.miausicbox.user.User;
import giraffe.miausicbox.user.UserComponent;

@RestController
public class EventController {
	
	private static final Path FILES_FOLDER = Paths.get(System.getProperty("user.dir"), "files");

	/**
	 * REPOSITORIES related to EVENT_CONTROLLER
	 */
	
	@Autowired
	private EventRepository eventRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BandRepository bandRepository;
	
	/**
	 * USER SESSION
	 */
	
	@Autowired
	private UserComponent userComponent;
	
	/**
	 * VIEWS related to EVENT_CONTROLLER
	 */
	
	interface EventListView extends Event.Basic, Event.Bands {}
	
	interface EventView extends Event.Basic, Event.Followers, Event.Bands, Band.Members{}
	
	/**
	 * GET RequestMethods related to EVENT_CONTROLLER
	 */
	
	@JsonView(EventView.class)
	@RequestMapping("/event/{id}")
	public ResponseEntity<?> getEventById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(eventRepository.findOne(id), HttpStatus.OK);
	}
	
	@JsonView(EventListView.class)
	@RequestMapping("/events")
	public ResponseEntity<?> getAllEvents() throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(eventRepository.findAll(), HttpStatus.OK);
	}
	
	@JsonView(EventListView.class)
	@RequestMapping("/events/name:{name}")
	public ResponseEntity<?> getEventsByName(@PathVariable String name) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(eventRepository.findEventByName(name), HttpStatus.OK);
	}
	
	@JsonView(EventListView.class)
	@RequestMapping("/events/bandName:{name}")
	public ResponseEntity<?> getEventsByBandName(@PathVariable String name) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		List<Band> band = bandRepository.findBandByGroupName(name);
		return new ResponseEntity<>(eventRepository.findEventByBandsIn(band), HttpStatus.OK);
	}
	
	@JsonView(EventListView.class)
	@RequestMapping("/events/userId:{id}")
	public ResponseEntity<?> getEventsByUserId(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.getOne(id);
		List<Event> events = eventRepository.findEventByCreator(user);
		return new ResponseEntity<>(Utils.removeDuplicated(events), HttpStatus.OK);
	}
	
	@JsonView(EventListView.class)
	@RequestMapping("/principal/{id}/events")
	public ResponseEntity<?> getAllEventsById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.getOne(id);
		List<Event> events = eventRepository.findEventByCreator(user);
		events.addAll(eventRepository.findEventByFollowers(user));
		return new ResponseEntity<>(Utils.removeDuplicated(events), HttpStatus.OK);
	}
	
	/**
	 * POST RequestMethods related to EVENT_CONTROLLER
	 */
	
	@JsonView(EventView.class)
	@RequestMapping(value = "/newEvent/{id}", method = RequestMethod.POST)
	public ResponseEntity<?> createNewEvent(@PathVariable long id ,@RequestBody Event event) {
		ResponseEntity<Event> response;
		//Get the user
		User user = userRepository.findOne(id);
		Event newEvent;
		//Create the event
		List<Event> allevents = eventRepository.findAll();
		System.out.println("Hola");
		if (allevents.contains(event)) {
			response = new ResponseEntity<Event>(event, HttpStatus.CONFLICT);
		} else {
			event.setCreator(user);
			event.setBands(new ArrayList<Band>());
			event.setFollowers(new ArrayList<User>());
			newEvent = eventRepository.save(event);
			System.out.println("Evento añadido");
			response = new ResponseEntity<Event>(newEvent, HttpStatus.OK);
		}
		return response;
	}
	
	@JsonView(EventView.class)
	@RequestMapping(value = "/editCityEvent/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> editCity(@PathVariable long id ,@RequestBody String city) {
		
		Event event = eventRepository.findOne(id);
		event.setDirection(city);
		event = eventRepository.save(event);

		return new ResponseEntity<Event>(event, HttpStatus.OK);
	}
	
	@JsonView(EventView.class)
	@RequestMapping(value = "/editDateEvent/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> editDate(@PathVariable long id ,@RequestBody String date) {
		
		Event event = eventRepository.findOne(id);
		event.setString(date);
		event = eventRepository.save(event);

		return new ResponseEntity<Event>(event, HttpStatus.OK);
	}
	
	@JsonView(EventView.class)
	@RequestMapping(value="/event/{id}/newBand/{name}", method = RequestMethod.POST)
	public ResponseEntity<?> addNewBand (@PathVariable long id, @PathVariable String name){
		Event event = eventRepository.findOne(id);
		List<Band> bands = bandRepository.findBandByGroupName(name);
	
		if (!event.getBands().contains(bands)){
			event.getBands().addAll(bands);
			event = eventRepository.save(event);
		}
		return new ResponseEntity<Event> (event, HttpStatus.OK);
	}
	
	@JsonView(EventView.class)
	@RequestMapping(value = "/event/{id}/setimage", method = RequestMethod.POST)
	public ResponseEntity<?> editImage(@PathVariable long id, @RequestBody MultipartFile file) throws IllegalStateException, IOException{
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		if (file.isEmpty()) {
			return new ResponseEntity<String>("ERROR - File is empty", HttpStatus.CONFLICT);
		}
		Event newEvent;
		Event event = eventRepository.findOne(id);
		if(event == null){
			return new ResponseEntity<String>("ERROR - User doesn't exists", HttpStatus.CONFLICT);
		}
		if(!event.getCreator().equals(userComponent.getLoggedUser())){
			return new ResponseEntity<String>("ERROR - User logged is not creator", HttpStatus.CONFLICT);
		}
		String filename = "event-" + event.getId() + ".jpg";
		File uploadedFile = new File(FILES_FOLDER.toFile(), filename);
		//uploadedFile.delete();
		Files.deleteIfExists(uploadedFile.toPath());
		file.transferTo(uploadedFile);
		event.setImage(filename);
		newEvent = eventRepository.save(event);
		return new ResponseEntity<Event>(newEvent, HttpStatus.OK);
	}
	
}

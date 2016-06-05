package giraffe.miausicbox.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.Event;
import giraffe.miausicbox.repositories.BandRepository;
import giraffe.miausicbox.repositories.EventRepository;
import giraffe.miausicbox.repositories.UserRepository;
import giraffe.miausicbox.user.User;

@RestController
public class EventController {

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
	 * VIEWS related to EVENT_CONTROLLER
	 */
	
	interface EventListView extends Event.Basic, Event.Bands {}
	
	interface EventView extends Event.Basic, Event.Followers, Event.Bands, Band.Members {}
	
	/**
	 * GET RequestMethods related to EVENT_CONTROLLER
	 */
	
	@JsonView(EventView.class)
	@RequestMapping("/event/{id}")
	public Event getEventById(@PathVariable long id) throws Exception {
		return eventRepository.findOne(id);
	}
	
	@JsonView(EventListView.class)
	@RequestMapping("/events")
	public List<Event> getAllEvents() throws Exception {
		return eventRepository.findAll();
	}
	
	@JsonView(EventListView.class)
	@RequestMapping("/events/name:{name}")
	public List<Event> getEventsByName(@PathVariable String name) throws Exception {
		return eventRepository.findEventByName(name);
	}
	
	@JsonView(EventListView.class)
	@RequestMapping("/events/bandName:{name}")
	public List<Event> getEventsByBandName(@PathVariable String name) throws Exception {
		List<Band> band = bandRepository.findBandByGroupName(name);
		return eventRepository.findEventByBandsIn(band);
	}
	
	@JsonView(EventListView.class)
	@RequestMapping("/events/userId:{id}")
	public List<Event> getEventsByUserId(@PathVariable long id) throws Exception {
		User user = userRepository.getOne(id);
		List<Event> events = eventRepository.findEventByCreator(user);
		events.addAll(eventRepository.findEventByFollowers(user));
		return Utils.removeDuplicated(events);
	}
	
	@JsonView(EventListView.class)
	@RequestMapping("/principal/{id}/events")
	public List<Event> getAllEventsById(@PathVariable long id) throws Exception {
		User user = userRepository.getOne(id);
		List<Event> events = eventRepository.findEventByCreator(user);
		events.addAll(eventRepository.findEventByFollowers(user));
		return Utils.removeDuplicated(events);
	}
	
	/**
	 * POST RequestMethods related to EVENT_CONTROLLER
	 */
	
	@RequestMapping(value = "/event/new", method = RequestMethod.POST)
	public ResponseEntity<Event> createNewEvent(@RequestBody Event event) {
		ResponseEntity<Event> response;
		Event newevent;
		List<Event> allevents = eventRepository.findAll();
		if (allevents.contains(event)) {
			response = new ResponseEntity<Event>(event, HttpStatus.CONFLICT);
		} else {
			newevent = eventRepository.save(event);
			response = new ResponseEntity<Event>(newevent, HttpStatus.OK);
		}
		return response;
	}
	
}

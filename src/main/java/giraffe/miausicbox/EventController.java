package giraffe.miausicbox;

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

import giraffe.miausicbox.model.Event;
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
	private UserRepository userRepository;
	
	/**
	 * VIEWS related to EVENT_CONTROLLER
	 */
	
	interface EventListView extends Event.Basic {}
	
	/**
	 * GET RequestMethods related to EVENT_CONTROLLER
	 */
	
	@JsonView(EventListView.class)
	@RequestMapping("/event/{id}")
	public Event getEventById(@PathVariable long id) throws Exception {
		return eventRepository.findOne(id);
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

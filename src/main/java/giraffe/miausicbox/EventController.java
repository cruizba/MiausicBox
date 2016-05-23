package giraffe.miausicbox;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Event;
import giraffe.miausicbox.model.User;
import giraffe.miausicbox.repositories.EventRepository;
import giraffe.miausicbox.repositories.UserRepository;

@RestController
public class EventController {

	@Autowired
	private EventRepository eventRepository;
	private UserRepository userRepository;
	
	interface EventListView extends Event.Basic {}
	
	@JsonView(EventListView.class)
	@RequestMapping("/principal/{id}/events")
	public List<Event> getEventsById(@PathVariable long id) throws Exception {
		User user = userRepository.getOne(id);
		List<Event> events = eventRepository.findAll();
		for(Event e : events) {
			if ( !Objects.equals(e.getCreator(), user) || !e.getFollowers().contains(user) ) {
				events.remove(e);
			}
		}
		return events;
	}
	
}

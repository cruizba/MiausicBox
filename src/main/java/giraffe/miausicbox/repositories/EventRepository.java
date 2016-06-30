package giraffe.miausicbox.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.Event;
import giraffe.miausicbox.user.User;

public interface EventRepository extends JpaRepository<Event, Long> {

	public List<Event> findEventByBands(Band band);
	
	public List<Event> findEventByCreator(User creator);
	
	public List<Event> findEventByFollowers(User user);
	
	public List<Event> findEventByName(String name);
	
	public List<Event> findEventByBandsIn(List<Band> bands);
	
}

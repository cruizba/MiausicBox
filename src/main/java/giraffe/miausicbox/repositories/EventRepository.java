package giraffe.miausicbox.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Event;
import giraffe.miausicbox.user.User;

public interface EventRepository extends JpaRepository<Event, Long> {

	public List<Event> findEventByCreator(User creator);
	
	public List<Event> findEventByFollowers(User user);
	
}

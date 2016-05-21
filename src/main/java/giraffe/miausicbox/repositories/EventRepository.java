package giraffe.miausicbox.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}

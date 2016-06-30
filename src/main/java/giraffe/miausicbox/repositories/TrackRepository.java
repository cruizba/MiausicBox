package giraffe.miausicbox.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Track;

public interface TrackRepository  extends JpaRepository<Track, Long> {

	public Track findByNameAndBand(String name, String band);
	
}

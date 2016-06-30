package giraffe.miausicbox.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.Novelty;
import giraffe.miausicbox.user.User;

public interface NoveltyRepository extends JpaRepository<Novelty, Long> {

	public List<Novelty> findNoveltyByUser(User user);
	
	public List<Novelty> findNoveltyByUserIn(List<User> user);
	
	public List<Novelty> findNoveltyByBand(Band band);
	
	public List<Novelty> findNoveltyByBandIn(List<Band> band);
	
	
	
}

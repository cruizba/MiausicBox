package giraffe.miausicbox.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.User;

public interface BandRepository extends JpaRepository<Band, Long> {

	public List<Band> findBandsByMembers(User user);
	
	public List<Band> findBandByMembersIn(List<User> user);
	
	public List<Band> findBandByGroupName (String groupName);
	
}

package giraffe.miausicbox.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Follow;
import giraffe.miausicbox.user.User;

public interface FollowRepository extends JpaRepository<Follow, Long> {

	public List<Follow> findUserByEmisor(User emisor);
	
	public List<Follow> findUserByReceptor(User receptor);
	
	public Follow findUserByEmisorAndReceptor(User emisor, User receptor);

	
}

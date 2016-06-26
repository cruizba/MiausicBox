package giraffe.miausicbox.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.user.User;

public interface UserRepository extends JpaRepository<User, Long> {

	public List<User> findUserByUserName(String username);
	
	public List<User> findUserByCompleteName(String completename);
	
	public List<User> findUserByEmail(String email);
	
	public User findOneByUserName(String username);
	
}

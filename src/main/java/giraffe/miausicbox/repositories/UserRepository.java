package giraffe.miausicbox.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
}

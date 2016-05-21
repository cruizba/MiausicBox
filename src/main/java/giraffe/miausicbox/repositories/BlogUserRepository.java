package giraffe.miausicbox.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.BlogUser;

public interface BlogUserRepository  extends JpaRepository<BlogUser, Long> {

}

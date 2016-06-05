package giraffe.miausicbox.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.BlogUser;
import giraffe.miausicbox.user.User;

public interface BlogUserRepository  extends JpaRepository<BlogUser, Long> {

	public List<BlogUser> findBlogUserByAuthor(User author);
	
	public List<BlogUser> findBlogUserByAuthorIn(List<User> author);
	
}

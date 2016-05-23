package giraffe.miausicbox;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.BlogBand;
import giraffe.miausicbox.model.BlogUser;
import giraffe.miausicbox.model.Follow;
import giraffe.miausicbox.model.User;
import giraffe.miausicbox.repositories.BandRepository;
import giraffe.miausicbox.repositories.BlogBandRepository;
import giraffe.miausicbox.repositories.BlogUserRepository;
import giraffe.miausicbox.repositories.FollowRepository;
import giraffe.miausicbox.repositories.UserRepository;

@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BandRepository bandRepository;
	
	@Autowired
	private FollowRepository followRepository;
	
	@Autowired
	private BlogUserRepository blogUserRepository;
	
	@Autowired
	private BlogBandRepository blogBandRepository;
	
	interface UserListView extends User.BasicAtt {}
	interface BlogUserListView extends BlogUser.BasicAtt {}
	interface BlogBandListView extends BlogBand.BasicAtt {}
	interface FollowListView extends Follow.BasicAtt {}
	
	@JsonView(UserListView.class)
	@RequestMapping("/artists")
	public List<User> getAllUsers() throws Exception {
		return userRepository.findAll();
	}
	
	@JsonView(UserListView.class)
	@RequestMapping("/artist/{id}")
	public User getUserById(@PathVariable long id) throws Exception {
		return userRepository.findOne(id);
	}
	
	@JsonView(FollowListView.class)
	@RequestMapping("/artist/{id}/follows")
	public List<Follow> getUserFollowsById(@PathVariable long id) throws Exception {
		List<Follow> follows = followRepository.findAll();
		for (Follow f : follows) {
			if (f.getEmisor().getId() != id || f.getReceptor().getId() != id) {
				follows.remove(f);
			}
		}
		return follows;
	}

	@JsonView(BlogUserListView.class)
	@RequestMapping("/artist/{id}/myblogs")
	public List<BlogUser> getMyBlogsById(@PathVariable long id) throws Exception {
		User user = userRepository.findOne(id);
		return blogUserRepository.findBlogUserByAuthor(user);
	}
	
	@JsonView(BlogUserListView.class)
	@RequestMapping("/artist/{id}/alluserblogs")
	public List<BlogUser> getAllUserBlogsById(@PathVariable long id) throws Exception {
		User user = userRepository.findOne(id);
		List<BlogUser> blogs = new ArrayList<>();
		blogs.addAll(blogUserRepository.findBlogUserByAuthor(user));
		List<Follow> follows = followRepository.findAll();
		List<User> friends = new ArrayList<>();
		for (Follow f : follows) {
			if (Objects.equals(f.getEmisor(), user)) {
				friends.add(f.getEmisor());
			}
		}
		blogs.addAll(blogUserRepository.findBlogUserByAuthorIn(friends));
		return blogs;
	}
	
	@JsonView(BlogBandListView.class)
	@RequestMapping("/artist/{id}/allbandblogs")
	public List<BlogBand> getAllBandBlogsById(@PathVariable long id) throws Exception {
		User user = userRepository.findOne(id);
		List<Band> allbands = bandRepository.findAll();
		List<Band> bands = new ArrayList<>();
		for (Band b : allbands) {
			System.out.println("ey!");
			if (b.getFollowers().contains(user) || Objects.equals(b.getAdministrador(), user)) {
				bands.add(b);
			}
		}
		return blogBandRepository.findBlogBandByAuthorIn(bands);
	}
	
}

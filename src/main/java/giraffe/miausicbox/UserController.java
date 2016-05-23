package giraffe.miausicbox;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.BlogBand;
import giraffe.miausicbox.model.BlogUser;
import giraffe.miausicbox.model.Follow;
import giraffe.miausicbox.model.Message;
import giraffe.miausicbox.model.Novelty;
import giraffe.miausicbox.model.User;
import giraffe.miausicbox.repositories.BandRepository;
import giraffe.miausicbox.repositories.BlogBandRepository;
import giraffe.miausicbox.repositories.BlogUserRepository;
import giraffe.miausicbox.repositories.FollowRepository;
import giraffe.miausicbox.repositories.MessageRepository;
import giraffe.miausicbox.repositories.NoveltyRepository;
import giraffe.miausicbox.repositories.UserRepository;

@RestController
public class UserController {

	/**
	 * REPOSITORIES related to USER_CONTROLLER
	 */

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
	
	@Autowired
	private NoveltyRepository noveltyRepository;
	
	@Autowired
	private MessageRepository messageRepository;
	
	/**
	 * VIEWS related to USER_CONTROLLER
	 */
	
	interface UsersListView extends User.Basic, User.InstGenres {}
	interface UserListView extends User.Basic, User.Info, User.WebLinks, User.InstGenres {}
	interface FollowListView extends Follow.Basic {}
	interface BlogUserListView extends BlogUser.Basic {}
	interface BlogBandListView extends BlogBand.Basic {}
	interface MessageListView extends Message.Basic, User.Basic {}
	interface NoveltyListView extends Novelty.Basic {}
	
	/**
	 * GET RequestMethods related to USER_CONTROLLER
	 */
	
	@JsonView(UsersListView.class)
	@RequestMapping(value = "/artists", method = RequestMethod.GET)
	public List<User> getAllUsers() throws Exception {
		return userRepository.findAll();
	}

	@JsonView(UserListView.class)
	@RequestMapping(value = "/artist/{id}", method = RequestMethod.GET)
	public User getUserById(@PathVariable long id) throws Exception {
		return userRepository.findOne(id);
	}
	
	@JsonView(FollowListView.class)
	@RequestMapping(value = "/artist/{id}/follows", method = RequestMethod.GET)
	public List<Follow> getUserFollowsById(@PathVariable long id) throws Exception {
		User user = userRepository.findOne(id);
		List<Follow> allfollows = followRepository.findUserByEmisor(user);
		allfollows.addAll(followRepository.findUserByReceptor(user));
		return allfollows;
	}

	@JsonView(BlogUserListView.class)
	@RequestMapping(value = "/artist/{id}/myblogs", method = RequestMethod.GET)
	public List<BlogUser> getMyBlogsById(@PathVariable long id) throws Exception {
		User user = userRepository.findOne(id);
		return blogUserRepository.findBlogUserByAuthor(user);
	}

	@JsonView(BlogUserListView.class)
	@RequestMapping(value = "/artist/{id}/allusersblogs", method = RequestMethod.GET)
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
		return Utils.removeDuplicated(blogs);
	}

	@JsonView(BlogBandListView.class)
	@RequestMapping(value = "/artist/{id}/allbandsblogs", method = RequestMethod.GET)
	public List<BlogBand> getAllBandBlogsById(@PathVariable long id) throws Exception {
		User user = userRepository.findOne(id);
		List<BlogBand> blogs = new ArrayList<>();
		List<Band> allbands = bandRepository.findAll();
		List<Band> bands = new ArrayList<>();
		for (Band b : allbands) {
			if (b.getFollowers().contains(user) || Objects.equals(b.getAdministrador(), user)) {
				bands.add(b);
			}
		}
		blogs.addAll(blogBandRepository.findBlogBandByAuthorIn(bands));
		return Utils.removeDuplicated(blogs);
	}
	
	@JsonView(NoveltyListView.class)
	@RequestMapping(value = "/artist/{id}/novelties", method = RequestMethod.GET)
	public List<Novelty> getUserNoveltiesById(@PathVariable long id) throws Exception {
		User user = userRepository.findOne(id);
		List<Novelty> novelties = noveltyRepository.findNoveltyByUser(user);
		List<Band> bands = user.getBands();
		novelties.addAll(noveltyRepository.findNoveltyByBandIn(bands));
		return novelties;
	}
	
	@JsonView(MessageListView.class)
	@RequestMapping(value = "/artist/{id}/messages", method = RequestMethod.GET)
	public List<Message> getUserMessagesById(@PathVariable long id) throws Exception {
		User user = userRepository.findOne(id);
		List<Message> messages = messageRepository.findMessageByDestiny(user);
		messages.addAll(messageRepository.findMessageBySender(user));
		return messages;
	}
	
	/**
	 * POST RequestMethods related to USER_CONTROLLER
	 */
	
	@RequestMapping(value = "/artist/new", method = RequestMethod.POST)
	public ResponseEntity<User> createNewUser(@RequestBody User user) {
		ResponseEntity<User> response;
		User newuser;
		List<User> allusers = userRepository.findAll();
		if (allusers.contains(user)) {
			response = new ResponseEntity<User>(user, HttpStatus.CONFLICT);
		} else {
			newuser = userRepository.save(user);
			response = new ResponseEntity<User>(newuser, HttpStatus.OK);
		}
		return response;
	}
	
	@RequestMapping(value = "/artist/{em}/follows/{re}", method = RequestMethod.POST)
	public ResponseEntity<Follow> createNewFollow(@PathVariable long em, @PathVariable long re) {
		ResponseEntity<Follow> response;
		Follow newfollow;
		List<Follow> allfollows = followRepository.findAll();
		User emisor = userRepository.findOne(em);
		User receptor = userRepository.findOne(re);
		Follow follow = new Follow(emisor, receptor);
		if (emisor == null || receptor == null ||allfollows.contains(follow)) {
			response = new ResponseEntity<Follow>(follow, HttpStatus.CONFLICT);
		} else {
			newfollow = followRepository.save(follow);
			response = new ResponseEntity<Follow>(newfollow, HttpStatus.OK);
		}
		return response;
	}

}

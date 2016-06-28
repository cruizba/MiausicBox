package giraffe.miausicbox.controller;

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
import giraffe.miausicbox.model.Event;
import giraffe.miausicbox.model.Follow;
import giraffe.miausicbox.model.Genre;
import giraffe.miausicbox.model.Instrument;
import giraffe.miausicbox.model.Message;
import giraffe.miausicbox.model.Novelty;
import giraffe.miausicbox.repositories.BandRepository;
import giraffe.miausicbox.repositories.BlogBandRepository;
import giraffe.miausicbox.repositories.BlogUserRepository;
import giraffe.miausicbox.repositories.EventRepository;
import giraffe.miausicbox.repositories.FollowRepository;
import giraffe.miausicbox.repositories.GenreRepository;
import giraffe.miausicbox.repositories.InstrumentRepository;
import giraffe.miausicbox.repositories.MessageRepository;
import giraffe.miausicbox.repositories.NoveltyRepository;
import giraffe.miausicbox.repositories.UserRepository;
import giraffe.miausicbox.user.User;
import giraffe.miausicbox.user.UserComponent;

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
	private EventRepository eventRepository;
	@Autowired
	private MessageRepository messageRepository;
	@Autowired
	private GenreRepository genreRepository;
	@Autowired
	private InstrumentRepository instrRepository;
	
	/**
	 * USER SESSION
	 */
	
	@Autowired
	private UserComponent userComponent;
	
	/**
	 * VIEWS related to USER_CONTROLLER
	 */
	
	interface UsersListView extends User.Basic, User.InstGenres, User.Bands {}
	interface UserView extends User.Basic, User.Info, User.WebLinks, User.InstGenres, User.Bands, User.Events {}
	interface FollowListView extends Follow.Basic {}
	interface FollowView extends Follow.Basic {}
	interface BlogUserListView extends BlogUser.Basic {}
	interface BlogBandListView extends BlogBand.Basic {}
	interface NoveltyListView extends Novelty.Basic {}
	interface EventListView extends Event.Basic, Event.Bands {}
	interface MessageListView extends Message.Basic {}
	interface BandListView extends Band.Basic {}
	
	/**
	 * GET RequestMethods related to USER_CONTROLLER
	 */
	
	@JsonView(UsersListView.class)
	@RequestMapping(value = "/artists", method = RequestMethod.GET)
	public ResponseEntity<?> getAllUsers() throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
	}

	@JsonView(UserView.class)
	@RequestMapping(value = "/artist/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getUserById(@PathVariable long id) throws Exception {
		if(userComponent.isLoggedUser()){
			return new ResponseEntity<>(userRepository.findOne(id), HttpStatus.OK);
		}
		else{
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
	}
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/artists/name:{name}", method = RequestMethod.GET)
	public ResponseEntity<?> getUsersByName(@PathVariable String name) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		List<User> users = userRepository.findUserByUserName(name);
		users.addAll(userRepository.findUserByCompleteName(name));
		users.addAll(userRepository.findUserByEmail(name));
		return new ResponseEntity<>(Utils.removeDuplicated(users), HttpStatus.OK);
	}
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/artist/{id}/following", method = RequestMethod.GET)
	public ResponseEntity<?> getUserFollowsById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		List<Follow> allfollows = followRepository.findUserByEmisor(user);
		List<User> result = new ArrayList<User>();
		for(Follow fol: allfollows){
			result.add(fol.getReceptor());
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/artist/{id}/followers", method = RequestMethod.GET)
	public ResponseEntity<?> getUserFollowersById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		List<Follow> allfollows = followRepository.findUserByReceptor(user);
		List<User> result = new ArrayList<User>();
		for(Follow fol: allfollows){
			result.add(fol.getEmisor());
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/artist/{id}/numfollowing", method = RequestMethod.GET)
	public ResponseEntity<?> getNumFollowsById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		List<Follow> allfollows = followRepository.findUserByEmisor(user);
		int result = allfollows.size();
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/artist/{id}/numfollowers", method = RequestMethod.GET)
	public ResponseEntity<?> getNumFollowerssById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		List<Follow> allfollows = followRepository.findUserByReceptor(user);
		int result = allfollows.size();
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/artist/{id}/isFollowedBy/{id2}", method = RequestMethod.GET)
	public ResponseEntity<?> isUserFollowedBy(@PathVariable long id, @PathVariable long id2) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		boolean result;
		User receptor = userRepository.findOne(id);
		User emisor = userRepository.findOne(id2);
	    Follow follow = followRepository.findUserByEmisorAndReceptor(emisor, receptor);
	    result = (follow != null);
	    return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@JsonView(BlogUserListView.class)
	@RequestMapping(value = "/artist/{id}/myblogs", method = RequestMethod.GET)
	public ResponseEntity<?> getMyBlogsById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		return new ResponseEntity<>(blogUserRepository.findBlogUserByAuthor(user), HttpStatus.OK);
	}

	@JsonView(BlogUserListView.class)
	@RequestMapping(value = "/artist/{id}/allusersblogs", method = RequestMethod.GET)
	public ResponseEntity<?> getAllUserBlogsById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		List<BlogUser> blogs = new ArrayList<>();
		blogs.addAll(blogUserRepository.findBlogUserByAuthor(user));
		List<Follow> follows = followRepository.findAll();
		List<User> friends = new ArrayList<>();
		for (Follow f : follows) {
			if (Objects.equals(f.getEmisor(), user)) {
				friends.add(f.getReceptor());
			}
		}
		blogs.addAll(blogUserRepository.findBlogUserByAuthorIn(friends));
		System.out.println("Friends: ");
		System.out.println(friends);
		System.out.println("Blogs: ");
		System.out.println(blogs);
		return new ResponseEntity<>(Utils.removeDuplicated(blogs), HttpStatus.OK);
	}

	@JsonView(BlogBandListView.class)
	@RequestMapping(value = "/artist/{id}/allbandsblogs", method = RequestMethod.GET)
	public ResponseEntity<?> getAllBandBlogsById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
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
		return new ResponseEntity<>(Utils.removeDuplicated(blogs), HttpStatus.OK);
	}
	
	@JsonView(NoveltyListView.class)
	@RequestMapping(value = "/artist/{id}/novelties", method = RequestMethod.GET)
	public ResponseEntity<?> getUserNoveltiesById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		List<Novelty> novelties = noveltyRepository.findNoveltyByUser(user);
		List<Band> bands = user.getBands();
		novelties.addAll(noveltyRepository.findNoveltyByBandIn(bands));
		return new ResponseEntity<>(Utils.removeDuplicated(novelties), HttpStatus.OK);
	}
	
	@JsonView(EventListView.class)
	@RequestMapping(value = "/artist/{id}/events", method = RequestMethod.GET)
	public ResponseEntity<?> getUserEventsById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		List<Event> events = eventRepository.findEventByCreator(user);
		events.addAll(eventRepository.findEventByFollowers(user));
		return new ResponseEntity<>(Utils.removeDuplicated(events), HttpStatus.OK);
	}
	
	@JsonView(MessageListView.class)
	@RequestMapping(value = "/artist/{id}/receivedMessages", method = RequestMethod.GET)
	public ResponseEntity<?> getUserReceivedMessagesById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		List<Message> messages = messageRepository.findMessageByDestiny(user);
		return new ResponseEntity<>(messages, HttpStatus.OK);
	}
	
	@JsonView(MessageListView.class)
	@RequestMapping(value = "/artist/{id}/sendedMessages", method = RequestMethod.GET)
	public ResponseEntity<?> getUserSendedMessagesById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		List<Message> messages = messageRepository.findMessageBySender(user);
		return new ResponseEntity<>(messages, HttpStatus.OK);
	}
	
	@JsonView(MessageListView.class)
	@RequestMapping(value = "/artist/{id}/numNoRead", method = RequestMethod.GET)
	public ResponseEntity<?> getUserNonReadMessagesById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		List<Message> messages = messageRepository.findMessageByDestinyAndReadd(user, false);
		int nonread = messages.size();
		return new ResponseEntity<>(nonread, HttpStatus.OK);
	}
	
	@JsonView(MessageListView.class)
	@RequestMapping(value = "/artist/{id}/read/clemt", method = RequestMethod.GET)
	public ResponseEntity<?> setMessagesById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		List<Message> messages = messageRepository.findMessageBySender(user);
		int nonread = 0;
		for (Message m : messages) {
			if (!m.getReadd()) {
				nonread++;
			}
		}
		return new ResponseEntity<>(nonread, HttpStatus.OK);
	}
	
	@JsonView(BandListView.class)

	@RequestMapping(value = "/artist/{id}/bands", method = RequestMethod.GET)
	public ResponseEntity<?> getUserBandsById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}

		User user = userRepository.findOne(id);
		return new ResponseEntity<>(bandRepository.findBandsByMembers(user), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getAllGenres", method = RequestMethod.GET)
	public ResponseEntity<?> getAllGenres() throws Exception{
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		List<Genre> allGenres = genreRepository.findAll();
		return new ResponseEntity<List<Genre>>(allGenres, HttpStatus.OK);		
	}
	
	@RequestMapping(value = "/getAllInstr", method = RequestMethod.GET)
	public ResponseEntity<?> getAllInstr() throws Exception{
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		List<Instrument> instruments = instrRepository.findAll();
		return new ResponseEntity<List<Instrument>>(instruments, HttpStatus.OK);
	}
	
	/**
	 * POST RequestMethods related to USER_CONTROLLER
	 */
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/artist/new", method = RequestMethod.POST)
	public ResponseEntity<?> createNewUser(@RequestBody User user) {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
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
	
	@JsonView(FollowView.class)
	@RequestMapping(value = "/artist/{em}/follows/{re}", method = RequestMethod.POST)
	public ResponseEntity<?> createNewFollow(@PathVariable long em, @PathVariable long re) {
		ResponseEntity<?> response;
		Follow newfollow;
		User emisor = userRepository.findOne(em);
		User receptor = userRepository.findOne(re);
		Follow follow = followRepository.findUserByEmisorAndReceptor(emisor, receptor);
		if(follow != null){
			response = new ResponseEntity<String>("CONFLICT, USER FOLLOWED", HttpStatus.CONFLICT);
		}
		else{
			Follow newFollow = new Follow(emisor, receptor);
			Follow folAdded = followRepository.save(newFollow);
			response = new ResponseEntity<Follow>(folAdded, HttpStatus.OK);
		}
		return response;
	}
	
	@RequestMapping(value = "/artist/{em}/unfollow/{re}", method = RequestMethod.POST)
	public ResponseEntity<?> removeFollow(@PathVariable long em, @PathVariable long re) {
		ResponseEntity<?> response;
		User emisor = userRepository.findOne(em);
		User receptor = userRepository.findOne(re);
		Follow follow = followRepository.findUserByEmisorAndReceptor(emisor, receptor);
		if(follow == null){
			response = new ResponseEntity<String>("CONFLICT, USER NOT FOLLOWED", HttpStatus.CONFLICT);
		}
		else{
			followRepository.delete(follow);;
			response = new ResponseEntity<String>("DELETED", HttpStatus.OK);
		}
		return response;
	}
	
	/**
	 * PUT RequestMethods related to USER_CONTROLLER
	 */
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/editCity/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> editCity(@PathVariable long id ,@RequestBody String city) {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		if(user == null){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		user.setCity(city);
		user = userRepository.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/addGenre/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> addGenre(@PathVariable long id, @RequestBody Genre genre){
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		List<Genre> genres = user.getGenres();
		if(genres.contains(genre)){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		user.getGenres().add(genre);
		user = userRepository.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/deleteGenre/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> deleteGenre(@PathVariable long id, @RequestBody Genre genre){
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		List<Genre> genres = user.getGenres();
		if(!genres.contains(genre)){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		user.getGenres().remove(genre);
		user = userRepository.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/addInstr/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> addInstr(@PathVariable long id, @RequestBody String inst){
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		Instrument instrumentAux = instrRepository.findOne(inst);
		List<Instrument> instList = user.getInstruments();
		if(instList.contains(instrumentAux)){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		user.getInstruments().add(instrumentAux);
		user = userRepository.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/deleteInstr/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> deleteInstr(@PathVariable long id, @RequestBody String inst){
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		User user = userRepository.findOne(id);
		Instrument instrumentAux = instrRepository.findOne(inst);
		List<Instrument> instList = user.getInstruments();
		if(!instList.contains(instrumentAux)){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		user.getInstruments().remove(instrumentAux);
		user = userRepository.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/editYoutubeLink/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> editYoutubeLink(@PathVariable long id, @RequestBody String link){
		User user = userRepository.findOne(id);
		if(user == null){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		user.setYoutube(link);
		user = userRepository.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/editTwitterLink/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> editTwitterLink(@PathVariable long id, @RequestBody String link){
		User user = userRepository.findOne(id);
		if(user == null){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		user.setTwitter(link);
		user = userRepository.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@JsonView(UserView.class)
	@RequestMapping(value = "/editFacebookLink/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> editFacebookLink(@PathVariable long id, @RequestBody String link){
		User user = userRepository.findOne(id);
		if(user == null){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		user.setFacebook(link);
		user = userRepository.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	
	
	
}

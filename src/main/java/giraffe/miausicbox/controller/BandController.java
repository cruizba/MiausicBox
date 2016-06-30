package giraffe.miausicbox.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.BlogBand;
import giraffe.miausicbox.model.Event;
import giraffe.miausicbox.model.Novelty;
import giraffe.miausicbox.model.Track;
import giraffe.miausicbox.user.User;
import giraffe.miausicbox.user.UserComponent;
import giraffe.miausicbox.repositories.BandRepository;
import giraffe.miausicbox.repositories.BlogBandRepository;
import giraffe.miausicbox.repositories.EventRepository;
import giraffe.miausicbox.repositories.NoveltyRepository;
import giraffe.miausicbox.repositories.TrackRepository;
import giraffe.miausicbox.repositories.UserRepository;

@RestController
public class BandController {
	
	private static final Path FILES_FOLDER = Paths.get(System.getProperty("user.dir"), "files");

	/**
	 * REPOSITORIES related to BAND_CONTROLLER
	 */
	
	@Autowired
	private BandRepository bandRepository;
	@Autowired
	private EventRepository eventRepository;
	@Autowired
	private BlogBandRepository blogBandRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TrackRepository trackRepository;
	@Autowired
	private NoveltyRepository noveltyRepository;
	
	/**
	 * USER SESSION
	 */
	
	@Autowired
	private UserComponent userComponent;
	
	/**
	 * VIEWS related to BAND_CONTROLLER
	 */
	
	interface BandListView extends Band.Basic, Band.Members, Band.Genres {}
	interface BandView extends Band.Basic, Band.WebLinks, Band.Genres, Band.Tracks, Band.Members, Band.Admin, Band.Followers {}
	interface EventView extends Event.Basic, Event.Bands {}
	interface BlogBandListView extends BlogBand.Basic {}
	interface UsersListView extends User.Basic {}
	
	/**
	 * GET RequestMethods related to BAND_CONTROLLER
	 */
	
	@JsonView(BandView.class)
	@RequestMapping(value="/band/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getBandById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(bandRepository.findOne(id), HttpStatus.OK);
	}
	
	@JsonView(EventView.class)
	@RequestMapping(value="/band/{id}/events", method = RequestMethod.GET)
	public ResponseEntity<?> getEventByBandById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		Band band = bandRepository.getOne(id);
		System.out.println("Banda: " + band.getGroupName());
		return new ResponseEntity<>(eventRepository.findEventByBands(band), HttpStatus.OK);
	}
	
	@JsonView(BandListView.class)
	@RequestMapping(value="/bands/name:{name}", method = RequestMethod.GET)
	public ResponseEntity<?> getBandByGroupName(@PathVariable String name) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(bandRepository.findBandByGroupName(name), HttpStatus.OK);
	}
	
	@JsonView(UsersListView.class)
	@RequestMapping(value="/bands/{id}/members", method = RequestMethod.GET)
	public List<User> getBandByGroupName(@PathVariable long id) throws Exception {
		Band band = bandRepository.getOne(id);
		return band.getMembers();
	}
	
	@JsonView(BandListView.class)
	@RequestMapping(value="/bands", method = RequestMethod.GET)
	public ResponseEntity<?> getAllBands( ) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(bandRepository.findAll(), HttpStatus.OK);
	}
	
	@JsonView(BlogBandListView.class)
	@RequestMapping(value = "/band/{id}/bandblog", method = RequestMethod.GET)
	public ResponseEntity<?> getBlogsByBand(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		Band band = bandRepository.findOne(id);
		return new ResponseEntity<>(blogBandRepository.findBlogBandByAuthor(band), HttpStatus.OK);
	}
	
	@JsonView(BandView.class)
	@RequestMapping(value = "/getNumFollowsBand/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getNumFollows(@PathVariable long id){
		Band band = bandRepository.findOne(id);
		if(band == null){
			return new ResponseEntity<String>("Band Not Found", HttpStatus.BAD_REQUEST);
		}
		int numFollows = band.getFollowers().size();
		return new ResponseEntity<Integer>(numFollows, HttpStatus.OK);
	}
	
	@JsonView(BandView.class)
	@RequestMapping(value = "/band/{ba}/isFollowedBy/{id}")
	public ResponseEntity<?> getNumFollows(@PathVariable long ba, @PathVariable long id){
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		Band band = bandRepository.findOne(ba);
		User user = userRepository.findOne(id);
		if(user == null || band == null){
			return new ResponseEntity<String>("Band OR User Not Found", HttpStatus.BAD_REQUEST);
		}
		boolean follows = band.getFollowers().contains(user);
		return new ResponseEntity<Boolean>(follows, HttpStatus.OK);
	}
	
	/**
	 * POST RequestMethods related to BAND_CONTROLLER
	 */
	
	@JsonView(BandView.class)
	@RequestMapping(value = "/band/{ba}/tofollow/{us}", method = RequestMethod.POST)
	public ResponseEntity<?> followBand(@PathVariable long ba, @PathVariable long us) throws Exception {
		User user = userRepository.findOne(us);
		if(!userComponent.isLoggedUser() || !userComponent.getLoggedUser().equals(user)){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		Band band = bandRepository.findOne(ba);
		List<User> list = band.getFollowers();
		boolean follows = list.contains(user);
		if (follows) {
			band.getFollowers().remove(user);
		} else {
			band.getFollowers().add(user);
		}
		System.out.println(band.getFollowers());
		bandRepository.save(band);
		return new ResponseEntity<>(!follows, HttpStatus.OK);
	}
	
	@JsonView(BandView.class)
	@RequestMapping(value = "/band/new", method = RequestMethod.POST)
	public ResponseEntity<?> createNewBand(@RequestBody Band band) {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		ResponseEntity<Band> response;
		Band newband;
		List<Band> allbands = bandRepository.findAll();
		if (allbands.contains(band)) {
			response = new ResponseEntity<Band>(band, HttpStatus.CONFLICT);
		} else {
			newband = bandRepository.save(band);
			response = new ResponseEntity<Band>(newband, HttpStatus.OK);
		}
		return response;
	}

	@JsonView(BandView.class)
	@RequestMapping(value="/newBand/{id}", method = RequestMethod.POST)
	public ResponseEntity<?> createNewBand (@PathVariable long id, @RequestBody Band band){
		User user= userRepository.findOne(id);
		if(!userComponent.isLoggedUser() || !userComponent.getLoggedUser().equals(user)){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		ResponseEntity<Band> response;
		
		band.setAdministrador(user);
		band.getMembers().add(user);
		Band newBand = bandRepository.save(band);
		response = new ResponseEntity <Band> (newBand, HttpStatus.OK);
		
		return response;
	}

	@JsonView(BandView.class)
	@RequestMapping(value = "/band/{id}/newtrack", method = RequestMethod.POST)
	public ResponseEntity<?> addNewTrack(@PathVariable long id, @RequestBody Track track) {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		ResponseEntity<Band> response;
		Band band = bandRepository.findOne(id);
		Track newtrack;
		Band newBand;
		List<Track> alltracks = trackRepository.findAll();
		if (band.getTracks().contains(track)) {
			response = new ResponseEntity<Band>(band, HttpStatus.CONFLICT);
		} else {
			if (alltracks.contains(track)) {
				newtrack = trackRepository.findByNameAndBand(track.getName(), track.getBand());
			} else {
				newtrack = trackRepository.save(track);
			}
			band.getTracks().add(newtrack);
			newBand = bandRepository.save(band);
			response = new ResponseEntity<Band>(newBand, HttpStatus.OK);
		}

		return response;
	}

	@JsonView(BandView.class)
	@RequestMapping(value = "/band/{id}/newmember/{userName}", method = RequestMethod.POST)
	public ResponseEntity<?> addNewMember(@PathVariable long id, @PathVariable String userName, @RequestBody String date) {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		ResponseEntity<Band> response;
		Band band = bandRepository.findOne(id);
		if(band == null) {
			return new ResponseEntity<String>("ERROR - Band doesn't exists", HttpStatus.CONFLICT);
		}
		User user = userRepository.findOneByUserName(userName);
		if(user == null) {
			return new ResponseEntity<String>("ERROR - User doesn't exists", HttpStatus.CONFLICT);
		}
		Band newBand;
		Novelty novelty;
		if (band.getMembers().contains(user) ||
				!user.isArtist() ||
				!band.getAdministrador().equals(userComponent.getLoggedUser())) {
			response = new ResponseEntity<Band>(band, HttpStatus.CONFLICT);
		} else {
			band.getMembers().add(user);
			novelty = new Novelty(user, band, date, true);
			newBand = bandRepository.save(band);
			noveltyRepository.save(novelty);
			response = new ResponseEntity<Band>(newBand, HttpStatus.OK);
		}
		return response;
	}
	
	/**
	 * DELETE RequestMethods related to BAND_CONTROLLER
	 */
	
	@JsonView(BandView.class)
	@RequestMapping(value = "/band/{bandId}/removetrack/{trackId}", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeTrack(@PathVariable long bandId, @PathVariable long trackId) {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		System.out.println("Saludos");
		ResponseEntity<Band> response;
		Band newBand;
		Band band = bandRepository.findOne(bandId);
		if (band == null) {
			System.out.println("No existe la banda " + bandId);
			return new ResponseEntity<String>("ERROR - Band doesn't exists", HttpStatus.CONFLICT);
		}
		if (!band.getMembers().contains(userComponent.getLoggedUser())){
			System.out.println("No es miembro");
			return new ResponseEntity<String>("ERROR - User logged is not member", HttpStatus.UNAUTHORIZED);
		}
		Track track = trackRepository.findOne(trackId);
		if (track == null) {
			System.out.println("No existe el track " + trackId);
			return new ResponseEntity<String>("ERROR - Track doesn't exists", HttpStatus.CONFLICT);
		}
		if (!band.getTracks().contains(track)) {
			System.out.println("La banda no tiene el track");
			return new ResponseEntity<String>("ERROR - Band doesn't have that track", HttpStatus.CONFLICT);
		}
		System.out.println("Exito! :D");
		//trackRepository.delete(trackId);
		band.getTracks().remove(track);
		newBand = bandRepository.save(band);
		response = new ResponseEntity<Band>(newBand, HttpStatus.OK);
		return response;
	}
	
	@JsonView(BandView.class)
	@RequestMapping(value = "/band/{bandId}/removemember/{memberId}", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeMember(@PathVariable long bandId, @PathVariable long memberId) {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		System.out.println("Saludos");
		ResponseEntity<Band> response;
		Band newBand;
		Band band = bandRepository.findOne(bandId);
		if (band == null) {
			System.out.println("No existe la banda " + bandId);
			return new ResponseEntity<String>("ERROR - Band doesn't exists", HttpStatus.CONFLICT);
		}
		User user = userRepository.findOne(memberId);
		if (user == null) {
			System.out.println("No existe el user " + memberId);
			return new ResponseEntity<String>("ERROR - User doesn't exists", HttpStatus.CONFLICT);
		}
		if (!band.getAdministrador().equals(userComponent.getLoggedUser())){
			System.out.println("No es administador");
			if (!userComponent.getLoggedUser().equals(user)){
				System.out.println("Ni el user a eliminar ...");
				return new ResponseEntity<String>("ERROR - User logged is not admin", HttpStatus.UNAUTHORIZED);
			}
			System.out.println("Pero sí el user que quiere eliminar jaja");
		}
		if (!band.getMembers().contains(user)) {
			System.out.println("La banda no tiene el user");
			return new ResponseEntity<String>("ERROR - Band doesn't have that member", HttpStatus.CONFLICT);
		}
		System.out.println("Exito! :D");
		if (band.getAdministrador().equals(user)){
			band.setAdministrador(null);
		}
		band.getMembers().remove(user);
		if (band.getMembers().size() > 0) {
			band.setAdministrador(band.getMembers().get(0));
		}
		newBand = bandRepository.save(band);
		response = new ResponseEntity<Band>(newBand, HttpStatus.OK);
		return response;
	}
	
	@JsonView(BandView.class)
	@RequestMapping(value = "/band/{bandId}/remove", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeBand(@PathVariable long bandId) {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		ResponseEntity<String> response;
		Band band = bandRepository.findOne(bandId);
		if (band == null) {
			return new ResponseEntity<String>("ERROR - Band doesn't exists", HttpStatus.CONFLICT);
		}
		if (!band.getAdministrador().equals(userComponent.getLoggedUser())){
			return new ResponseEntity<String>("ERROR - User logged is not admin", HttpStatus.UNAUTHORIZED);
		}
		List<Novelty> novelties = noveltyRepository.findNoveltyByBand(band);
		for (Novelty n : novelties) {
			noveltyRepository.delete(n);
		}
		List<BlogBand> blogs = blogBandRepository.findBlogBandByAuthor(band);
		for (BlogBand b : blogs) {
			blogBandRepository.delete(b);
		}
		List<Event> events = eventRepository.findEventByBands(band);
		for (Event e : events) {
			e.getBands().remove(band);
			eventRepository.save(e);
		}
		bandRepository.delete(band);
		response = new ResponseEntity<String>("OK", HttpStatus.OK);
		return response;
	}
	
	@JsonView(BandView.class)
	@RequestMapping(value = "/band/{id}/setimage", method = RequestMethod.POST)
	public ResponseEntity<?> editImage(@PathVariable long id, @RequestBody MultipartFile file) throws IllegalStateException, IOException{
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		if (file.isEmpty()) {
			return new ResponseEntity<String>("ERROR - File is empty", HttpStatus.CONFLICT);
		}
		Band newBand;
		Band band = bandRepository.findOne(id);
		if(band == null){
			return new ResponseEntity<String>("ERROR - User doesn't exists", HttpStatus.CONFLICT);
		}
		if(!band.getAdministrador().equals(userComponent.getLoggedUser())){
			return new ResponseEntity<String>("ERROR - User logged is not administrator", HttpStatus.CONFLICT);
		}
		String filename = "band-" + band.getId() + ".jpg";
		File uploadedFile = new File(FILES_FOLDER.toFile(), filename);
		//uploadedFile.delete();
		Files.deleteIfExists(uploadedFile.toPath());
		file.transferTo(uploadedFile);
		band.setImage(filename);
		newBand = bandRepository.save(band);
		return new ResponseEntity<Band>(newBand, HttpStatus.OK);
	}
	
}

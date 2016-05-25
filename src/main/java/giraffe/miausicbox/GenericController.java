package giraffe.miausicbox;

import java.util.ArrayList;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import giraffe.miausicbox.model.Genre;
import giraffe.miausicbox.model.Instrument;
import giraffe.miausicbox.model.Message;
import giraffe.miausicbox.model.Novelty;
import giraffe.miausicbox.model.User;
import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.BlogBand;
import giraffe.miausicbox.model.BlogUser;
import giraffe.miausicbox.model.Event;
import giraffe.miausicbox.model.Follow;
import giraffe.miausicbox.model.Track;
import giraffe.miausicbox.repositories.BandRepository;
import giraffe.miausicbox.repositories.BlogBandRepository;
import giraffe.miausicbox.repositories.BlogUserRepository;
import giraffe.miausicbox.repositories.EventRepository;
import giraffe.miausicbox.repositories.FollowRepository;
import giraffe.miausicbox.repositories.GenreRepository;
import giraffe.miausicbox.repositories.InstrumentRepository;
import giraffe.miausicbox.repositories.MessageRepository;
import giraffe.miausicbox.repositories.NoveltyRepository;
import giraffe.miausicbox.repositories.TrackRepository;
import giraffe.miausicbox.repositories.UserRepository;

@RestController
public class GenericController {

	@Autowired
	private InstrumentRepository instrumentRepository;
	
	@Autowired
	private GenreRepository genreRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BandRepository bandRepository;
	
	@Autowired
	private BlogBandRepository blogBandRepository;
	
	@Autowired
	private BlogUserRepository blogUserRepository;
	
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private EventRepository eventRepository;
	
	@Autowired
	private NoveltyRepository noveltyRepository;
	
	@Autowired
	private TrackRepository trackRepository;
	
	@Autowired
	private FollowRepository followRepository;
	
	interface GenericListView extends User.Basic, User.InstGenres, Genre.Basic, Instrument.Basic {}
	
	@PostConstruct
	public void init() {

		// Instruments
		Instrument ins0 = new Instrument("Voz", "../img/instrumentoVozN.png", "../img/instrumentoVozB.png");
		Instrument ins1 = new Instrument("Guitarra", "../img/instrumentoGuitarN.png", "../img/instrumentoGuitarB.png");
		Instrument ins2 = new Instrument("Bajo", "../img/instrumentoBajoN.png", "../img/instrumentoBajoB.png");
		Instrument ins3 = new Instrument("Bateria", "../img/instrumentoBajoN.png", "../img/instrumentoBajoB.png");
		Instrument ins4 = new Instrument("Violin", "../img/instrumentoViolinN.png", "../img/instrumentoViolinB.png");
		Instrument ins5 = new Instrument("Trompeta", "../img/instrumentoTrompetaN.png", "../img/instrumentoTrompetaB.png");
		Instrument ins6 = new Instrument("Piano", "../img/instrumentoPianoN.png", "../img/instrumentoPianoB.png");
		Instrument ins7 = new Instrument("Otros", "../img/instrumentoOtroN.png",  "../img/instrumentoOtroB.png");
		
		// Genres
		Genre gen0 = new Genre("Rock");
		Genre gen1 = new Genre("Pop");
		Genre gen2 = new Genre("Jazz");
		Genre gen3 = new Genre("Rap");
		Genre gen4 = new Genre("Reggae");
		Genre gen5 = new Genre("Metal");
		Genre gen6 = new Genre("Hard Rock");
		Genre gen7 = new Genre("Punk");
		Genre gen8 = new Genre("Indie");
		Genre gen9 = new Genre("Grunge");
		Genre gen10 = new Genre("Otros");
		
		// Users
		User us0 = new User("ice6294","1234","Luis Leon Gamez","luigi6294@gmail.com","Soy guay",true
				,"Alcorcon","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		User us1 = new User("carolus","1234","Carlos Ruiz Ballesteros","crbthedevil@gmail.com","Soy guay jaja",true
				,"Loranca","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		
		User us2 = new User("sor","a","Soraya Rama","sori@gmail.com","Soy guay jeje",false
				,"Orcasitas","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		
		User us3 = new User("thais","1234","Thais Mendez","thais@gmail.com","Soy guay jiji",false
				,"Madrid","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		
		us0.getGenres().add(gen0);
		us0.getGenres().add(gen1);
		us1.getGenres().add(gen3);
		
		us0.getInstruments().add(ins1);
		us1.getInstruments().add(ins0);
		
		// Tracks
		Track tr0 = new Track("Hotel California", "The Eagles", "");
		Track tr1 = new Track("Sultans Of Swing", "Dire Straits", "");
		Track tr2 = new Track("School", "Supertramp", "");
		Track tr3 = new Track("Black", "Pearl Jam", "");
		
		// Band
		Band ban0 = new Band(us0,"Tool","10000","LA","web","","",""
				,new ArrayList<User>(),new ArrayList<User>()
				,new ArrayList<Genre>(),new ArrayList<Track>());
		
		Band ban1 = new Band(us1,"Pink Floyd","Animals","GB","web","","",""
				,new ArrayList<User>(),new ArrayList<User>()
				,new ArrayList<Genre>(),new ArrayList<Track>());
		
		ban0.getMembers().add(us0);
		ban0.getMembers().add(us1);
		ban1.getMembers().add(us1);
		us0.getBands().add(ban0);
		us1.getBands().add(ban0);
		us1.getBands().add(ban1);
		ban0.getTracks().add(tr0);
		ban0.getTracks().add(tr1);
		ban0.getTracks().add(tr2);
		ban1.getTracks().add(tr3);
		
		ban0.getGenres().add(gen0);
		ban0.getGenres().add(gen1);
		ban1.getGenres().add(gen6);
		
		// BlogUser
		BlogUser bu0 = new BlogUser("Hola","img","Muchas cosas guays","April 13, 2016 20:16:37",us0);
		BlogUser bu1 = new BlogUser("Trucha","img","El oceano","January 15, 2016 10:10:00",us0);
		BlogUser bu2 = new BlogUser("Daw","img","Viva mika","May 1, 2016 19:15:37",us1);

		// BlogBand
		BlogBand bb0 = new BlogBand("Disgustipaed","img","This is necesary","June 3, 2016 19:15:37",ban0);
		BlogBand bb1 = new BlogBand("Mary","img","Give me my wings","April 1, 2016 18:20:30",ban0);
		
		// Messages
		Message mes0 = new Message(us0, us1, "Ke ase loco", "Ma burria", "July 3, 2016 18:20:30", false);
		Message mes1 = new Message(us0, us3, "Holi", "Viva Cthulhu", "April 1, 2016 18:20:30", true);
		Message mes2 = new Message(us1, us2, "Lol", "Risas", "April 1, 2016 18:10:30", true);
		Message mes3 = new Message(us3, us0, "Tas mal", "Pesao", "February 20, 2016 18:20:30", false);
		
		// Events
		Event ev0 = new Event("HellFest", "April 1, 2016 18:20:30", us0, "Festival heavy rock en Francia",
				new ArrayList<>(), "Paris, Francia", new ArrayList<>());
		Event ev1 = new Event("IndieFest",  "April 1, 2016 18:20:30", us2, "Festival indie tope guachi",
				new ArrayList<>(), "Madrid", new ArrayList<>());
		
		Event ev2 = new Event("Rockola",  "April 1, 2016 18:20:30", us2, "Arguelles",
				new ArrayList<>(), "Madrid", new ArrayList<>());
		
		ev0.getBands().add(ban0);
		ev1.getBands().add(ban1);
		ev2.getBands().add(ban0);
		ev2.getBands().add(ban1);
		
		ev0.getFollowers().add(us0);
		ev0.getFollowers().add(us1);
		ev0.getFollowers().add(us2);
		ev1.getFollowers().add(us2);
		ev1.getFollowers().add(us3);
		
		// Novelties
		Novelty nov0 = new Novelty(us0, ban0, "May 1, 2016 18:20:30", true);
		Novelty nov1 = new Novelty(us1, ban0, "April 1, 2016 18:20:30", true);
		Novelty nov2 = new Novelty(us0, ban1, "June 1, 2016 18:20:30", false);
		Novelty nov3 = new Novelty(us1, ban1, "July 1, 2016 18:20:30", true);
		
		// Follows
		Follow fol0 = new Follow(us0, us1);
		Follow fol1 = new Follow(us0, us3);
		Follow fol2 = new Follow(us1, us0);
		Follow fol3 = new Follow(us1, us2);
		Follow fol4 = new Follow(us2, us0);
		Follow fol5 = new Follow(us2, us1);
		Follow fol6 = new Follow(us2, us3);
		Follow fol7 = new Follow(us3, us0);
		
		// Saves
		instrumentRepository.save(ins0);
		instrumentRepository.save(ins1);
		instrumentRepository.save(ins2);
		instrumentRepository.save(ins3);
		instrumentRepository.save(ins4);
		instrumentRepository.save(ins5);
		instrumentRepository.save(ins6);
		instrumentRepository.save(ins7);
		
		genreRepository.save(gen0);
		genreRepository.save(gen1);
		genreRepository.save(gen2);
		genreRepository.save(gen3);
		genreRepository.save(gen4);
		genreRepository.save(gen5);
		genreRepository.save(gen6);
		genreRepository.save(gen7);
		genreRepository.save(gen8);
		genreRepository.save(gen9);
		genreRepository.save(gen10);
		
		trackRepository.save(tr0);
		trackRepository.save(tr1);
		trackRepository.save(tr2);
		trackRepository.save(tr3);
		
		userRepository.save(us0);
		userRepository.save(us1);
		userRepository.save(us2);
		userRepository.save(us3);
		
		bandRepository.save(ban0);
		bandRepository.save(ban1);
		
		blogUserRepository.save(bu0);
		blogUserRepository.save(bu1);
		blogUserRepository.save(bu2);
		
		blogBandRepository.save(bb0);
		blogBandRepository.save(bb1);
		
		messageRepository.save(mes0);
		messageRepository.save(mes1);
		messageRepository.save(mes2);
		messageRepository.save(mes3);
		
		eventRepository.save(ev0);
		eventRepository.save(ev1);
		eventRepository.save(ev2);
		
		noveltyRepository.save(nov0);
		noveltyRepository.save(nov1);
		noveltyRepository.save(nov2);
		noveltyRepository.save(nov3);
		
		followRepository.save(fol0);
		followRepository.save(fol1);
		followRepository.save(fol2);
		followRepository.save(fol3);
		followRepository.save(fol4);
		followRepository.save(fol5);
		followRepository.save(fol6);
		followRepository.save(fol7);
		
	}
	
}

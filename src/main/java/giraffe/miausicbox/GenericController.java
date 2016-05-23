package giraffe.miausicbox;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Genre;
import giraffe.miausicbox.model.Instrument;
import giraffe.miausicbox.model.User;
import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.BlogBand;
import giraffe.miausicbox.model.BlogUser;
import giraffe.miausicbox.model.Event;
import giraffe.miausicbox.model.Track;
import giraffe.miausicbox.repositories.BandRepository;
import giraffe.miausicbox.repositories.BlogBandRepository;
import giraffe.miausicbox.repositories.BlogUserRepository;
import giraffe.miausicbox.repositories.GenreRepository;
import giraffe.miausicbox.repositories.InstrumentRepository;
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
	
	interface GenericListView extends Instrument.BasicAtt, Genre.BasicAtt, User.BasicAtt {}
	
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
		
		instrumentRepository.save(ins0);
		instrumentRepository.save(ins1);
		instrumentRepository.save(ins2);
		instrumentRepository.save(ins3);
		instrumentRepository.save(ins4);
		instrumentRepository.save(ins5);
		instrumentRepository.save(ins6);
		instrumentRepository.save(ins7);
		
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
		
		// Users
		User us0 = new User("ice6294","1234","Luis Leon Gamez","luigi6294@gmail.com","Soy guay",true
				,"Alcorcon","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		User us1 = new User("carolus","1234","Carlos Ruiz Ballesteros","crbthedevil@gmail.com","Soy guay jaja",true
				,"Loranca","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		
		us0.getGenres().add(gen0);
		us0.getGenres().add(gen1);
		us1.getGenres().add(gen3);
		
		us0.getInstruments().add(ins1);
		us1.getInstruments().add(ins0);
		
		userRepository.save(us0);
		userRepository.save(us1);
		
		// Band
		Band ban0 = new Band(us0,"Tool","10000","LA","web","","",""
				,new ArrayList<User>(),new ArrayList<User>()
				,new ArrayList<Genre>(),new ArrayList<Track>());
		
		ban0.getMembers().add(us0);
		ban0.getMembers().add(us1);
		
		bandRepository.save(ban0);
		
		// BlogUser
		BlogUser bu0 = new BlogUser("Hola","img","Muchas cosas guays",new Date(),us0);
		BlogUser bu1 = new BlogUser("Trucha","img","El oceano",new Date(),us0);
		BlogUser bu2 = new BlogUser("Daw","img","Viva mika",new Date(),us1);
		
		blogUserRepository.save(bu0);
		blogUserRepository.save(bu1);
		blogUserRepository.save(bu2);

		// BlogBand
		BlogBand bb0 = new BlogBand("Disgustipaed","img","This is necesary",new Date(),ban0);
		BlogBand bb1 = new BlogBand("Mary","img","Give me my wings",new Date(),ban0);

		blogBandRepository.save(bb0);
		blogBandRepository.save(bb1);
		
	}

	@JsonView(GenericListView.class)
	@RequestMapping("/x/ins/{id}")
	public Instrument getInstrumentById(@PathVariable String id) throws Exception {
		return instrumentRepository.findOne(id);
	}
	
	@JsonView(GenericListView.class)
	@RequestMapping("/x/genre/{id}")
	public Genre getGenreById(@PathVariable String id) throws Exception {
		return genreRepository.findOne(id);
	}

	@JsonView(GenericListView.class)
	@RequestMapping("/x/user/{id}")
	public User getUserById(@PathVariable long id) throws Exception {
		return userRepository.findOne(id);
	}
	
	@JsonView(GenericListView.class)
	@RequestMapping("/x/users/")
	public List<User> getUserById() throws Exception {
		return userRepository.findAll();
	}
	
}

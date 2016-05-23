package giraffe.miausicbox;

import java.util.ArrayList;
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
import giraffe.miausicbox.model.Event;
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
	
	interface GenericListView extends Instrument.BasicAtt, Genre.BasicAtt, User.BasicAtt {}
	
	@PostConstruct
	public void init() {

		// Instruments
		Instrument ins0 = new Instrument("Gitar","","");
		Instrument ins1 = new Instrument("Bass","","");
		Instrument ins2 = new Instrument("Drums","","");
		Instrument ins3 = new Instrument("Piano","","");
		
		instrumentRepository.save(ins0);
		instrumentRepository.save(ins1);
		instrumentRepository.save(ins2);
		instrumentRepository.save(ins3);
		
		// Genres
		Genre gen0 = new Genre("Rock");
		Genre gen1 = new Genre("Indie");
		Genre gen2 = new Genre("Jazz");
		Genre gen3 = new Genre("Metal");
		
		genreRepository.save(gen0);
		genreRepository.save(gen1);
		genreRepository.save(gen2);
		genreRepository.save(gen3);
		
		// Users
		User us0 = new User("ice6294","1234","Luis Leon Gamez","luigi6294@gmail.com","Soy guay",true
				,"Alcorcon","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		
		userRepository.save(us0);
		
		// Band
		
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

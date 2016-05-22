package giraffe.miausicbox;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Genre;
import giraffe.miausicbox.model.Instrument;
import giraffe.miausicbox.repositories.GenreRepository;
import giraffe.miausicbox.repositories.InstrumentRepository;

@RestController
public class GenericController {

	@Autowired
	private InstrumentRepository instrumentRepository;
	
	@Autowired
	private GenreRepository genreRepository;
	
	interface GenericListView extends Instrument.BasicAtt, Genre.BasicAtt {}
	
	@PostConstruct
	public void init() {

		Instrument ins0 = new Instrument(0, "Gitar");
		Instrument ins1 = new Instrument(1, "Bass");
		Instrument ins2 = new Instrument(2, "Drums");
		Instrument ins3 = new Instrument(3, "Piano");
		
		instrumentRepository.save(ins0);
		instrumentRepository.save(ins1);
		instrumentRepository.save(ins2);
		instrumentRepository.save(ins3);
		
		Genre gen0 = new Genre(0, "Rock");
		Genre gen1 = new Genre(1, "Indie");
		Genre gen2 = new Genre(2, "Jazz");
		Genre gen3 = new Genre(3, "Metal");
		
		genreRepository.save(gen0);
		genreRepository.save(gen1);
		genreRepository.save(gen2);
		genreRepository.save(gen3);
		
	}

	@JsonView(GenericListView.class)
	@RequestMapping("/ins/{id}")
	public Instrument getInstrumentById(@PathVariable int id) throws Exception {
		return instrumentRepository.findOne(id);
	}
	
	@JsonView(GenericListView.class)
	@RequestMapping("/genre/{id}")
	public Genre getGenreById(@PathVariable int id) throws Exception {
		return genreRepository.findOne(id);
	}
	
}

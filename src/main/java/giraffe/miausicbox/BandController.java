package giraffe.miausicbox;

import java.util.List;

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
import giraffe.miausicbox.model.Event;
import giraffe.miausicbox.repositories.BandRepository;
import giraffe.miausicbox.repositories.EventRepository;

@RestController
public class BandController {

	/**
	 * REPOSITORIES related to BAND_CONTROLLER
	 */
	
	@Autowired
	private BandRepository bandRepository;
	@Autowired
	private EventRepository eventRepository;
	
	/**
	 * VIEWS related to BAND_CONTROLLER
	 */
	
	interface BandListView extends Band.Basic, Band.Members, Band.Genres {}
	interface BandView extends Band.Basic, Band.WebLinks, Band.Genres, Band.Tracks, Band.Members, Band.Admin, Band.Followers {}
	interface EventView extends Event.Basic, Event.Bands {}
	
	/**
	 * GET RequestMethods related to BAND_CONTROLLER
	 */
	
	@JsonView(BandView.class)
	@RequestMapping(value="/band/{id}", method = RequestMethod.GET)
	public Band getBandById(@PathVariable long id) throws Exception {
		return bandRepository.findOne(id);
	}
	
	@JsonView(EventView.class)
	@RequestMapping(value="/band/{id}/events", method = RequestMethod.GET)
	public List<Event> getEventByBandById(@PathVariable long id) throws Exception {
		Band band = bandRepository.getOne(id);
		System.out.println("Banda: " + band.getGroupName());
		return eventRepository.findEventByBands(band);
	}
	
	@JsonView(BandListView.class)
	@RequestMapping(value="/bands/name:{name}", method = RequestMethod.GET)
	public List<Band> getBandByGroupName(@PathVariable String name) throws Exception {
		return bandRepository.findBandByGroupName(name);
	}
	
	@JsonView(BandListView.class)
	@RequestMapping(value="/bands", method = RequestMethod.GET)
	public List <Band> getAllBands( ) throws Exception {
		return bandRepository.findAll();
	}
	
	
	
	/**
	 * POST RequestMethods related to BAND_CONTROLLER
	 */
	
	@RequestMapping(value = "/band/new", method = RequestMethod.POST)
	public ResponseEntity<Band> createNewband(@RequestBody Band band) {
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

}

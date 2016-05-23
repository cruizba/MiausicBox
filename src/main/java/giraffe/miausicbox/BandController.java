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
import giraffe.miausicbox.repositories.BandRepository;

@RestController
public class BandController {

	/**
	 * REPOSITORIES related to BAND_CONTROLLER
	 */
	
	@Autowired
	private BandRepository bandRepository;
	
	/**
	 * VIEWS related to BAND_CONTROLLER
	 */
	
	interface BandListView extends Band.Basic {}

	/**
	 * GET RequestMethods related to BAND_CONTROLLER
	 */
	
	@JsonView(BandListView.class)
	@RequestMapping("/band/{id}")
	public Band getBandById(@PathVariable long id) throws Exception {
		return bandRepository.findOne(id);
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

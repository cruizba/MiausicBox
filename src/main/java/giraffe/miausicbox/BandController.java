package giraffe.miausicbox;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.repositories.BandRepository;

@RestController
public class BandController {

	@Autowired
	private BandRepository bandRepository;
	
	interface BandListView extends Band.Basic {}

	@JsonView(BandListView.class)
	@RequestMapping("/band/{id}")
	public Band getBandById(@PathVariable long id) throws Exception {
		return bandRepository.findOne(id);
	}

}

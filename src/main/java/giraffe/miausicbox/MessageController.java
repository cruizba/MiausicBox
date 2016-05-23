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

import giraffe.miausicbox.EventController.EventListView;
import giraffe.miausicbox.model.Message;
import giraffe.miausicbox.repositories.MessageRepository;

@RestController
public class MessageController {

	/**
	 * REPOSITORIES related to MESSAGE_CONTROLLER
	 */

	@Autowired
	private MessageRepository messageRepository;
	
	/**
	 * VIEWS related to MESSAGE_CONTROLLER
	 */
	
	interface MessageListView extends Message.Basic {}
	
	/**
	 * GET RequestMethods related to MESSAGE_CONTROLLER
	 */
	
	@JsonView(EventListView.class)
	@RequestMapping("/artist/{id}/messages")
	public List<Message> getMessagesById(@PathVariable long id) throws Exception {
		List<Message> messages = messageRepository.findAll();
		for(Message m : messages) {
			if (m.getSender().getId() != id || m.getDestiny().getId() != id) {
				messages.remove(m);
			}
		}
		return messages;
	}
	
	/**
	 * POST RequestMethods related to MESSAGE_CONTROLLER
	 */
	
	@RequestMapping(value = "/message/new", method = RequestMethod.POST)
	public ResponseEntity<Message> createNewUser(@RequestBody Message message) {
		ResponseEntity<Message> response;
		Message newmessage;
		List<Message> allmessages = messageRepository.findAll();
		if (allmessages.contains(message)) {
			response = new ResponseEntity<Message>(message, HttpStatus.CONFLICT);
		} else {
			newmessage = messageRepository.save(message);
			response = new ResponseEntity<Message>(newmessage, HttpStatus.OK);
		}
		return response;
	}

}

package giraffe.miausicbox.controller;

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

import giraffe.miausicbox.controller.EventController.EventListView;
import giraffe.miausicbox.model.Message;
import giraffe.miausicbox.repositories.MessageRepository;
import giraffe.miausicbox.user.UserComponent;

@RestController
public class MessageController {

	/**
	 * REPOSITORIES related to MESSAGE_CONTROLLER
	 */

	@Autowired
	private MessageRepository messageRepository;
	
	/**
	 * USER SESSION
	 */
	
	@Autowired
	private UserComponent userComponent;
	
	/**
	 * VIEWS related to MESSAGE_CONTROLLER
	 */
	
	interface MessageListView extends Message.Basic {}
	
	/**
	 * GET RequestMethods related to MESSAGE_CONTROLLER
	 */
	
	@JsonView(EventListView.class)
	@RequestMapping("/artist/{id}/messages")
	public ResponseEntity<?> getMessagesById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		List<Message> messages = messageRepository.findAll();
		for(Message m : messages) {
			if (m.getSender().getId() != id || m.getDestiny().getId() != id) {
				messages.remove(m);
			}
		}
		return new ResponseEntity<>(messages, HttpStatus.OK);
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

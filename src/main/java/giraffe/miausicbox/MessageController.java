package giraffe.miausicbox;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.EventController.EventListView;
import giraffe.miausicbox.model.Message;
import giraffe.miausicbox.repositories.MessageRepository;

@RestController
public class MessageController {

	@Autowired
	private MessageRepository messageRepository;
	
	interface MessageListView extends Message.BasicAtt {}
	
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

}

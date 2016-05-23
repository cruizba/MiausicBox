package giraffe.miausicbox.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Message;
import giraffe.miausicbox.model.User;

public interface MessageRepository  extends JpaRepository<Message, Long> {

	public List<Message> findMessageBySender(User sender);
	
	public List<Message> findMessageByDestiny(User destiny);
	
}

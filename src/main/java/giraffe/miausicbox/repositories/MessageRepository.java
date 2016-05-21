package giraffe.miausicbox.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Message;

public interface MessageRepository  extends JpaRepository<Message, Long> {

}

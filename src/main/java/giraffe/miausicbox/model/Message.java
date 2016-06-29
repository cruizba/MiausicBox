package giraffe.miausicbox.model;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.user.User;

@Entity
public class Message {

	public interface Basic extends User.Basic {}

	// Attributes
	@JsonView(Basic.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(Basic.class)
	@OneToOne
	private User sender;
	
	@JsonView(Basic.class)
	@OneToOne
	private User destiny;
	
	@JsonView(Basic.class)
	private String subject;
	
	@JsonView(Basic.class)
	private String message;
	
	@JsonView(Basic.class)
	private String date;
	
	@JsonView(Basic.class)
	private Boolean readd;
	
	// Constructor
	public Message() {}
	
	public Message(
			User sender,
			User destinty,
			String subject,
			String message,
			String date,
			Boolean readd
			) {
		super();
		this.sender = sender;
		this.destiny = destinty;
		this.message = message;
		this.date = date;
		this.readd = readd;
	}

	// Getters & Setters
	public long getId() {
		return id;
	}

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public User getDestiny() {
		return destiny;
	}

	public void setDestiny(User destiny) {
		this.destiny = destiny;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Boolean getReadd() {
		return readd;
	}

	public void setReadd(Boolean readd) {
		this.readd = readd;
	}

	// ToString
	@Override
	public String toString() {
		return (this.getSender() + " - " + this.getDestiny()
				+ " (" + this.getDate().toString() + ")");
	}
	
	// Equals
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final Message other = (Message) obj;
		if (!Objects.equals(this.getId(), other.getId())) {
			return false;
		}
		return (Objects.equals(this.getSender(), other.getSender())
				&& Objects.equals(this.getDestiny(), other.getDestiny())
				&& Objects.equals(this.getDate(), other.getDate()));
	}

}

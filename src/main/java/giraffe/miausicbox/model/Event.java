package giraffe.miausicbox.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Event {

	public interface BasicAtt {}

	// Attributes
	@JsonView(BasicAtt.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(BasicAtt.class)
	private String name;
	
	@JsonView(BasicAtt.class)
	private Date date;
	
	@JsonView(BasicAtt.class)
	private User creator;
	
	@JsonView(BasicAtt.class)
	private String description;
	
	@JsonView(BasicAtt.class)
	private List<Band> bands = new ArrayList<>();
	
	@JsonView(BasicAtt.class)
	private String direction;
	
	@JsonView(BasicAtt.class)
	private List<User> followers = new ArrayList<>();
	
	// Constructor
	public Event() {}
	
	public Event(
			String name,
			Date date,
			User creator,
			String description,
			List<Band> bands,
			String direction,
			List<User> followers
			) {
		super();
		this.name = name;
		this.date = date;
		this.creator = creator;
		this.description = description;
		this.bands = bands;
		this.direction = direction;
		this.followers = followers;
	}

	// Getters & Setters
	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public User getCreator() {
		return creator;
	}

	public void setCreator(User creator) {
		this.creator = creator;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Band> getBands() {
		return bands;
	}

	public void setBands(List<Band> bands) {
		this.bands = bands;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}

	public List<User> getFollowers() {
		return followers;
	}

	public void setFollowers(List<User> followers) {
		this.followers = followers;
	}
	
	// ToString
	@Override
	public String toString() {
		return (this.getName() + " - " + this.getDate().toString());
	}
	
}

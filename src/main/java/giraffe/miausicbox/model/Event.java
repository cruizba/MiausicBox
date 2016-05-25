package giraffe.miausicbox.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.user.User;

@Entity
public class Event {

	public interface Basic {}
	
	public interface Followers extends User.Basic {}
	
	public interface Bands extends Band.Basic {}

	// Attributes
	@JsonView(Basic.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(Basic.class)
	private String name;
	
	@JsonView(Basic.class)
	private String date;
	
	@JsonView(User.Basic.class)
	@OneToOne
	private User creator;
	
	@JsonView(Basic.class)
	private String description;
	
	@JsonView(Bands.class)
	@ManyToMany
	private List<Band> bands = new ArrayList<>();

	@JsonView(Basic.class)
	private String direction;

	@JsonView(Followers.class)
	@ManyToMany
	private List<User> followers = new ArrayList<>();
	
	// Constructor
	public Event() {}
	
	public Event(
			String name,
			String date,
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

	public String getDate() {
		return date;
	}

	public void setString(String date) {
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
		final Event other = (Event) obj;
		if (!Objects.equals(this.getId(), other.getId())) {
			return false;
		}
		return (Objects.equals(this.getName(), other.getName())
				&& (Objects.equals(this.getDate(), other.getDate())));
	}
	
}

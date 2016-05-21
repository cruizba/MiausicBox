package giraffe.miausicbox.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Band.BandAtt;
import giraffe.miausicbox.model.Event.EventAtt;

@Entity
public class User {
	
	public interface BasicAtt {}

	// Attributes
	@JsonView(BasicAtt.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(BasicAtt.class)
	private String userName;
	
	@JsonView(BasicAtt.class)
	private String password;
	
	@JsonView(BasicAtt.class)
	private String completeName;
	
	@JsonView(BasicAtt.class)
	private String email;
	
	@JsonView(BasicAtt.class)
	private String description;
	
	@JsonView(BasicAtt.class)
	private Boolean isArtist;
	
	@JsonView(BasicAtt.class)
	private String city;
	
	@JsonView(BasicAtt.class)
	private String facebook;
	
	@JsonView(BasicAtt.class)
	private String twitter;
	
	@JsonView(BasicAtt.class)
	private String youtube;
	
	@JsonView(BasicAtt.class)
	private List<Integer> instruments = new ArrayList<>();
	
	@JsonView(BasicAtt.class)
	private List<Integer> genres = new ArrayList<>();
	
	@JsonView(BandAtt.class)
	@ManyToMany(mappedBy="members")
	private List<Band> bands = new ArrayList<>();
	
	@JsonView(EventAtt.class)
	@ManyToOne
	private List<Event> events = new ArrayList<>();
	
	// Constructor
	protected User() {}
	
	protected User(
			String userName,
			String password,
			String completeName,
			String email,
			String description,
			Boolean isArtist,
			String city,
			String facebook,
			String twitter,
			String youtube,
			List<Integer> instruments,
			List<Integer> genres,
			List<Band> bands,
			List<Event> events
			) {
		super();
		this.userName = userName;
		this.password = password;
		this.completeName = completeName;
		this.email = email;
		this.description = description;
		this.isArtist = isArtist;
		this.city = city;
		this.facebook = facebook;
		this.twitter = twitter;
		this.youtube = youtube;
		this.instruments = instruments;
		this.genres = genres;
		this.bands = bands;
		this.events = events;
	}

	// Getters & Setters
	public long getId() {
		return id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCompleteName() {
		return completeName;
	}

	public void setCompleteName(String completeName) {
		this.completeName = completeName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getIsArtist() {
		return isArtist;
	}

	public void setIsArtist(Boolean isArtist) {
		this.isArtist = isArtist;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getFacebook() {
		return facebook;
	}

	public void setFacebook(String facebook) {
		this.facebook = facebook;
	}

	public String getTwitter() {
		return twitter;
	}

	public void setTwitter(String twitter) {
		this.twitter = twitter;
	}

	public String getYoutube() {
		return youtube;
	}

	public void setYoutube(String youtube) {
		this.youtube = youtube;
	}

	public List<Integer> getInstruments() {
		return instruments;
	}

	public void setInstruments(List<Integer> instruments) {
		this.instruments = instruments;
	}

	public List<Integer> getGenres() {
		return genres;
	}

	public void setGenres(List<Integer> genres) {
		this.genres = genres;
	}

	public List<Band> getBands() {
		return bands;
	}

	public void setBands(List<Band> bands) {
		this.bands = bands;
	}

	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
	}
	
	// ToString
	@Override
	public String toString() {
		return (this.getUserName() + " - " + this.getEmail());
	}
}

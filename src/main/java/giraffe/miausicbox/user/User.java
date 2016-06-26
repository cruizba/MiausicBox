package giraffe.miausicbox.user;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.Event;
import giraffe.miausicbox.model.Genre;
import giraffe.miausicbox.model.Instrument;


@Entity
public class User {
	
	public interface Basic {}
	
	public interface Info {}
	
	public interface WebLinks {}
	
	public interface InstGenres extends Instrument.Basic, Genre.Basic {}
	
	public interface Bands extends Band.Basic {}
	
	public interface Events extends Event.Basic {}

	// Attributes
	@JsonView(Basic.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(Basic.class)
	private String userName;
	
	@JsonIgnore
	private String passwordHash;
	
	@ElementCollection(fetch = FetchType.EAGER)
	private List<String> roles;
	
	@JsonView(Basic.class)
	private String completeName;
	
	@JsonView(Basic.class)
	private String email;
	
	@JsonView(Info.class)
	private String description;
	
	@JsonView(Basic.class)
	private Boolean isArtist;
	
	@JsonView(Info.class)
	private String city;
	
	@JsonView(WebLinks.class)
	private String facebook;
	
	@JsonView(WebLinks.class)
	private String twitter;
	
	@JsonView(WebLinks.class)
	private String youtube;
	
	@JsonView(InstGenres.class)
	@ManyToMany
	private List<Instrument> instruments = new ArrayList<>();
	
	@JsonView(InstGenres.class)
	@ManyToMany
	private List<Genre> genres = new ArrayList<>();
	
	@JsonView(Bands.class)
	@ManyToMany(mappedBy="members")
	private List<Band> bands = new ArrayList<>();
	
	@JsonView(Events.class)
	@ManyToMany
	private List<Event> events = new ArrayList<>();
	
	// Constructor
	public User() {}
	
	public User(
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
			List<Instrument> instruments,
			List<Genre> genres,
			List<Band> bands,
			List<Event> events) {
		this.userName = userName;
		this.passwordHash = new BCryptPasswordEncoder().encode(password);
		this.instruments = instruments;
		this.genres = genres;
		this.bands = bands;
		this.events = events;
		this.email = email;
		this.description = description;
		this.isArtist = isArtist;
		this.city = city;
		this.facebook = facebook;
		this.twitter = twitter;
		this.youtube = youtube;
	}

	public Boolean getIsArtist() {
		return isArtist;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public long getId() {
		return id;
	}

	public String getUserName() {
		return userName;
	}

	public String getPasswordHash() {
		return passwordHash;
	}

	public void setPasswordHash(String passwordHash) {
		this.passwordHash = passwordHash;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
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

	public Boolean isArtist() {
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

	public List<Instrument> getInstruments() {
		return instruments;
	}

	public void setInstruments(List<Instrument> instruments) {
		this.instruments = instruments;
	}

	public List<Genre> getGenres() {
		return genres;
	}

	public void setGenres(List<Genre> genres) {
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
		final User other = (User) obj;
		if (Objects.equals(this.getId(), other.getId())) {
			return true;
		}
		return (Objects.equals(this.getUserName(), other.getUserName()));
	}
	
}

package giraffe.miausicbox.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Band {

	public interface BasicAtt {}
	
	public interface BandAtt {}

	// Attributes
	@JsonView(BasicAtt.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(BasicAtt.class)
	private User administrador;
	
	@JsonView(BasicAtt.class)
	private String groupName;
	
	@JsonView(BasicAtt.class)
	private String description;
	
	@JsonView(BasicAtt.class)
	private String city;
	
	@JsonView(BasicAtt.class)
	private String web;
	
	@JsonView(BasicAtt.class)
	private String facebook;
	
	@JsonView(BasicAtt.class)
	private String twitter;
	
	@JsonView(BasicAtt.class)
	private String youtube;
	
	@JsonView(BandAtt.class)
	@ManyToMany
	private List<User> members = new ArrayList<>();
	
	@JsonView(BandAtt.class)
	private List<User> followers = new ArrayList<>();
	
	@JsonView(BasicAtt.class)
	private List<Integer> genres = new ArrayList<>();
	
	@JsonView(BasicAtt.class)
	private List<Track> tracks = new ArrayList<>();
	
	// Constructor
	public Band() {}
	
	public Band(
			User administrador,
			String groupName,
			String description,
			String city,
			String web,
			String facebook,
			String twitter,
			String youtube,
			List<User> members,
			List<User> followers,
			List<Integer> genres,
			List<Track> tracks
			) {
		super();
		this.administrador = administrador;
		this.groupName = groupName;
		this.description = description;
		this.city = city;
		this.facebook = facebook;
		this.twitter = twitter;
		this.youtube = youtube;
		this.members = members;
		this.followers = followers;
		this.genres = genres;
		this.tracks = tracks;
	}

	// Getters & Setters
	public long getId() {
		return id;
	}

	public User getAdministrador() {
		return administrador;
	}

	public void setAdministrador(User administrador) {
		this.administrador = administrador;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getWeb() {
		return web;
	}

	public void setWeb(String web) {
		this.web = web;
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

	public List<User> getMembers() {
		return members;
	}

	public void setMembers(List<User> members) {
		this.members = members;
	}

	public List<User> getFollowers() {
		return followers;
	}

	public void setFollowers(List<User> followers) {
		this.followers = followers;
	}

	public List<Integer> getGenres() {
		return genres;
	}

	public void setGenres(List<Integer> genres) {
		this.genres = genres;
	}

	public List<Track> getTracks() {
		return tracks;
	}

	public void setTracks(List<Track> tracks) {
		this.tracks = tracks;
	}
	
	// ToString
	@Override
	public String toString() {
		return this.getGroupName();
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
		final Band other = (Band) obj;
		if (!Objects.equals(this.getId(), other.getId())) {
			return false;
		}
		return Objects.equals(this.getGroupName(), other.getGroupName());
	}
	
}

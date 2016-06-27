package giraffe.miausicbox.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.user.User;

@Entity
public class Band {

	public interface Basic {}
	
	public interface WebLinks {}
	
	public interface Members extends User.Basic, User.InstGenres {}
	
	public interface Admin extends User.Basic {}
	
	public interface Followers extends User.Basic {}
	
	public interface Genres extends Genre.Basic {}
	
	public interface Tracks extends Track.Basic {}

	// Attributes
	@JsonView(Basic.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(Admin.class)
	@OneToOne
	private User administrador;
	
	@JsonView(Basic.class)
	private String groupName;
	
	@JsonView(Basic.class)
	private String description;
	
	@JsonView(Basic.class)
	private String city;
	
	@JsonView(WebLinks.class)
	private String web;
	
	@JsonView(WebLinks.class)
	private String facebook;
	
	@JsonView(WebLinks.class)
	private String twitter;
	
	@JsonView(WebLinks.class)
	private String youtube;
	
	@JsonView(Members.class)
	@ManyToMany
	private List<User> members = new ArrayList<>();
	
	@JsonView(Followers.class)
	@OneToMany
	private List<User> followers = new ArrayList<>();
	
	@JsonView(Genres.class)
	@ManyToMany
	private List<Genre> genres = new ArrayList<>();
	
	@JsonView(Tracks.class)
	@ManyToMany
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
			List<Genre> genres,
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

	public List<Genre> getGenres() {
		return genres;
	}

	public void setGenres(List<Genre> genres) {
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

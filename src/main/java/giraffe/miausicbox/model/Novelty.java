package giraffe.miausicbox.model;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Novelty {

	public interface Basic extends User.Basic, Band.Basic {}
	
	// Attributes
	@JsonView(Basic.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(Basic.class)
	@OneToOne
	private User user;
	
	@JsonView(Basic.class)
	@OneToOne
	private Band band;
	
	@JsonView(Basic.class)
	private Date date;
	
	@JsonView(Basic.class)
	private Boolean joined;
	
	// Constructor
	public Novelty() {}
	
	public Novelty(
			User user,
			Band band,
			Date date,
			Boolean joined
			) {
		super();
		this.user= user;
		this.band = band;
		this.date = date;
		this.joined = joined;
	}

	// Getters & Setters
	public long getId() {
		return id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Band getBand() {
		return band;
	}

	public void setBand(Band band) {
		this.band = band;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Boolean isJoined() {
		return joined;
	}

	public void setJoined(Boolean joined) {
		this.joined = joined;
	}
	
	// ToString
	@Override
	public String toString() {
		String str = this.getUser().getUserName();
		if (this.joined) {
			str += " joined ";
		} else {
			str += " left ";
		}
		return (str + this.getBand().getGroupName());
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
		final Novelty other = (Novelty) obj;
		if (!Objects.equals(this.getId(), other.getId())) {
			return false;
		}
		return (Objects.equals(this.getUser(), other.getUser())
				&& (Objects.equals(this.getBand(), other.getBand()))
				&& (Objects.equals(this.isJoined(), other.isJoined()))
				&& (Objects.equals(this.getDate(), other.getDate())));
	}
	
}

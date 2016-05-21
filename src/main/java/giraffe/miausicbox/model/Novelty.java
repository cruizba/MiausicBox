package giraffe.miausicbox.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Novelty {

	public interface BasicAtt {}
	
	// Attributes
	@JsonView(BasicAtt.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(BasicAtt.class)
	private User user;
	
	@JsonView(BasicAtt.class)
	private Band band;
	
	@JsonView(BasicAtt.class)
	private Date date;
	
	@JsonView(BasicAtt.class)
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

	public Boolean getJoined() {
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
	
}

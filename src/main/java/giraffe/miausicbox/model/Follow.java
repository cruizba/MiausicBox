package giraffe.miausicbox.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Blog.BasicAtt;

@Entity
public class Follow {

	// Attributes
	@JsonView(BasicAtt.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(BasicAtt.class)
	private User emisor;
	
	@JsonView(BasicAtt.class)
	private User receptor;
	
	// Constructor
	public Follow() {}
	
	public Follow(
			User emisor,
			User receptor
			) {
		this.emisor = emisor;
		this.receptor = receptor;
	}

	// Getters & Setters
	public long getId() {
		return id;
	}

	public User getEmisor() {
		return emisor;
	}

	public void setEmisor(User emisor) {
		this.emisor = emisor;
	}

	public User getReceptor() {
		return receptor;
	}

	public void setReceptor(User receptor) {
		this.receptor = receptor;
	}
	
	// ToString
	@Override
	public String toString() {
		return (this.getEmisor().getUserName() + " - " + this.getReceptor().getUserName());
	}
	
}

package giraffe.miausicbox.model;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Follow {

	public interface BasicAtt {}
	
	// Attributes
	@JsonView(BasicAtt.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(BasicAtt.class)
	@OneToOne
	private User emisor;
	
	@JsonView(BasicAtt.class)
	@OneToOne
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
		final Follow other = (Follow) obj;
		if (!Objects.equals(this.getId(), other.getId())) {
			return false;
		}
		return (Objects.equals(this.getEmisor(), other.getEmisor())
				&& Objects.equals(this.getReceptor(), other.getReceptor()));
	}
	
}

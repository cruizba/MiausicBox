package giraffe.miausicbox.model;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Track {

	public interface BasicAtt {}
	
	// Attributes
	@JsonView(BasicAtt.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(BasicAtt.class)
	private String name;
	
	@JsonView(BasicAtt.class)
	private String group;
	
	@JsonView(BasicAtt.class)
	private String link;
	
	// Constructor
	public Track() {}
	
	public Track(
			String name,
			String group,
			String link
			) {
		super();
		this.name = name;
		this.group = group;
		this.link = link;
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

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}
	
	// ToString
	@Override
	public String toString() {
		return (this.getName() + " - " + this.getGroup());
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
		final Track other = (Track) obj;
		if (!Objects.equals(this.getId(), other.getId())) {
			return false;
		}
		return (Objects.equals(this.getName(), other.getName())
				&& Objects.equals(this.getGroup(), other.getGroup()));
	}
	
}

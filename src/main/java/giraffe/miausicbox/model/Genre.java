package giraffe.miausicbox.model;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Genre {

	public interface BasicAtt {}
	
	// Attributes
	@JsonView(BasicAtt.class)
	@Id
	private Integer id;
	
	@JsonView(BasicAtt.class)
	private String name;
	
	// Constructor
	public Genre() {}
	
	public Genre(Integer id, String name) {
		this.id = id;
	}
	
	// Getters & Setters
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	// ToString
	@Override
	public String toString() {
		return this.getName();
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
		final Genre other = (Genre) obj;
		return (Objects.equals(this.getId(), other.getId()));
	}
	
}

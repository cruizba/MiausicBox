package giraffe.miausicbox.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Genre {

	public interface Basic {}
	
	// Attributes
	@JsonView(Basic.class)
	@Id
	@Column(unique=false)
	private String name;
	
	// Getters & Setters
	public String getName() {
		return name;
	}
	
	// ToString
	@Override
	public String toString() {
		return this.getName();
	}
	
	// Constructor
	public Genre() {}
	
	public Genre(String name) {
		this.name = name;
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
		return (Objects.equals(this.getName(), other.getName()));
	}
	
}

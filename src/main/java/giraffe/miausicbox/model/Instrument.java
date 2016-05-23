package giraffe.miausicbox.model;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Instrument {

	public interface BasicAtt {}
	
	// Attributes
	@JsonView(BasicAtt.class)
	@Id
	private String name;
	
	@JsonView(BasicAtt.class)
	private String image_url;
	
	@JsonView(BasicAtt.class)
	private String image_url_white;
	
	// Constructor
	public Instrument() {}
	
	public Instrument(String name, String image_url, String image_url_white) {
		this.name = name;
		this.image_url = image_url;
		this.image_url_white = image_url_white;
	}
	
	// Getters & Setters
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getImageUrl() {
		return image_url;
	}
	
	public void setImageUrl(String image_url) {
		this.image_url = image_url;
	}
	
	public String getImageUrlWhite() {
		return image_url_white;
	}
	
	public void setImageUrlWhite(String image_url_white) {
		this.image_url_white = image_url_white;
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
		final Instrument other = (Instrument) obj;
		return (Objects.equals(this.getName(), other.getName()));
	}
	
}

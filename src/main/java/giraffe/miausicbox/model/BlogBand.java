package giraffe.miausicbox.model;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class BlogBand extends Blog {

	public interface BasicAtt {}
	
	// Attributes
	@JsonView(BasicAtt.class)
	private Band author;
	
	// Constructor
	public BlogBand() {}
	
	public BlogBand(
			String name,
			String image,
			String text,
			Date date,
			Band author
			) {
		super(name, image, text, date);
		this.author = author;
	}

	// Getters & Setters
	public Band getAuthor() {
		return author;
	}

	public void setAuthor(Band author) {
		this.author = author;
	}
	
	// ToString
	@Override
	public String toString() {
		return (this.getAuthor().getGroupName() + " - " + super.toString());
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
		final BlogBand other = (BlogBand) obj;
		if (!Objects.equals(this.getId(), other.getId())) {
			return false;
		}
		return (Objects.equals(this.getAuthor(), other.getAuthor())
				&& (Objects.equals(this, other)));
	}
	
}

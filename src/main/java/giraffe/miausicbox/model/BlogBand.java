package giraffe.miausicbox.model;

import java.util.Date;

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
	
}

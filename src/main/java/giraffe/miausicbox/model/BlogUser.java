package giraffe.miausicbox.model;

import java.util.Date;

import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class BlogUser extends Blog {

	public interface BasicAtt {}
	
	// Attributes
	@JsonView(BasicAtt.class)
	private User author;
	
	// Constructor
	public BlogUser() {}
	
	public BlogUser(
			String name,
			String image,
			String text,
			Date date,
			User author
			) {
		super(name, image, text, date);
		this.author = author;
	}
	
	// Getters & Setters
	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}
	
}

package giraffe.miausicbox.model;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class BlogUser {

	public interface Basic extends User.Basic {}
	
	// Attributes
	@JsonView(Basic.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(Basic.class)
	private String name;
	
	@JsonView(Basic.class)
	private String image;
	
	@JsonView(Basic.class)
	private String text;
	
	@JsonView(Basic.class)
	private String date;
	
	@JsonView(Basic.class)
	@OneToOne
	private User author;
	
	// Constructor
	public BlogUser() {}
	
	public BlogUser(
			String name,
			String image,
			String text,
			String date,
			User author
			) {
		super();
		this.name = name;
		this.image = image;
		this.text = text;
		this.date = date;
		this.author = author;
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

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
	public User getAuthor() {
		return author;
	}
	
	public void setAuthor(User author) {
		this.author = author;
	}
	
	// ToString
	@Override
	public String toString() {
		return (this.getName() + " (" + this.getDate().toString() + ")");
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
		final BlogUser other = (BlogUser) obj;
		if (!Objects.equals(this.getId(), other.getId())) {
			return false;
		}
		return (Objects.equals(this.getName(), other.getName())
				&& (Objects.equals(this.getDate(), other.getDate())));
	}
	
}

package giraffe.miausicbox.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Blog {

	public interface BasicAtt {}
	
	// Attributes
	@JsonView(BasicAtt.class)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@JsonView(BasicAtt.class)
	private String name;
	
	@JsonView(BasicAtt.class)
	private String image;
	
	@JsonView(BasicAtt.class)
	private String text;
	
	@JsonView(BasicAtt.class)
	private Date date;
	
	// Constructor
	public Blog() {}
	
	public Blog(
			String name,
			String image,
			String text,
			Date date
			) {
		super();
		this.name = name;
		this.image = image;
		this.text = text;
		this.date = date;
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

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
	// ToString
	@Override
	public String toString() {
		return (this.getName() + " (" + this.getDate().toString() + ")");
	}
	
}

package giraffe.miausicbox.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.BlogBand;
import giraffe.miausicbox.model.BlogUser;
import giraffe.miausicbox.repositories.BandRepository;
import giraffe.miausicbox.repositories.BlogBandRepository;
import giraffe.miausicbox.repositories.BlogUserRepository;
import giraffe.miausicbox.repositories.UserRepository;
import giraffe.miausicbox.user.User;

@RestController
public class BlogController {

	/**
	 * REPOSITORIES related to BLOG_CONTROLLER
	 */
	
	@Autowired
	private BlogBandRepository blogBandRepository;
	
	@Autowired
	private BlogUserRepository blogUserRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BandRepository bandRepository;
	
	/**
	 * VIEWS related to BLOG_CONTROLLER
	 */
	
	interface BlogListView extends BlogBand.Basic {}
	
	interface BlogView extends BlogBand.Basic {}
	
	/**
	 * GET RequestMethods related to BLOG_CONTROLLER
	 */
	
	@JsonView(BlogListView.class)
	@RequestMapping("/band/{id}/blogs")
	public List<BlogBand> getBandBlogsById(@PathVariable long id) throws Exception {
		List<BlogBand> blogs = blogBandRepository.findAll();
		for(BlogBand b : blogs) {
			if (b.getId() != id) {
				blogs.remove(b);
			}
		}
		return blogs;
	}
	
	@JsonView(BlogListView.class)
	@RequestMapping(value="/user/{id}/blogs", method = RequestMethod.GET)
	public List<BlogUser> getUserBlogsById(@PathVariable long id) throws Exception {
		List<BlogUser> blogs = blogUserRepository.findAll();
		for(BlogUser b : blogs) {
			if (b.getId() != id) {
				blogs.remove(b);
			}
		}
		return blogs;
	}
	
	/**
	 * POST RequestMethods related to BLOG_CONTROLLER
	 */
	
	@RequestMapping(value = "/blogband/new", method = RequestMethod.POST)
	public ResponseEntity<BlogBand> createNewBlogBand(@RequestBody BlogBand blogband) {
		ResponseEntity<BlogBand> response;
		BlogBand newblogband;
		List<BlogBand> allblogbands = blogBandRepository.findAll();
		if (allblogbands.contains(blogband)) {
			response = new ResponseEntity<BlogBand>(blogband, HttpStatus.CONFLICT);
		} else {
			newblogband = blogBandRepository.save(blogband);
			response = new ResponseEntity<BlogBand>(newblogband, HttpStatus.OK);
		}
		return response;
	}
	
	@JsonView(BlogView.class)
	@RequestMapping(value = "/newbloguser/{id}", method = RequestMethod.POST)
	public ResponseEntity<BlogUser> createNewBlogUser(@PathVariable long id ,@RequestBody BlogUser bloguser) {
		ResponseEntity<BlogUser> response;
		User user = userRepository.findOne(id);
		bloguser.setAuthor(user);
		BlogUser newBlogUser = blogUserRepository.save(bloguser);
		response = new ResponseEntity<BlogUser>(newBlogUser, HttpStatus.OK);
		return response;
	}
	
	@JsonView(BlogView.class)
	@RequestMapping(value = "/newblogband/{id}", method = RequestMethod.POST)
	public ResponseEntity<BlogBand> createNewBlogBand(@PathVariable long id ,@RequestBody BlogBand blogband) {
		ResponseEntity<BlogBand> response;
		Band band = bandRepository.findOne(id);
		blogband.setAuthor(band);
		BlogBand newBlogBand = blogBandRepository.save(blogband);
		response = new ResponseEntity<BlogBand>(newBlogBand, HttpStatus.OK);
		return response;
	}
	
}

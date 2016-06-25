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

import giraffe.miausicbox.model.BlogBand;
import giraffe.miausicbox.model.BlogUser;
import giraffe.miausicbox.repositories.BlogBandRepository;
import giraffe.miausicbox.repositories.BlogUserRepository;
import giraffe.miausicbox.repositories.UserRepository;
import giraffe.miausicbox.user.User;
import giraffe.miausicbox.user.UserComponent;

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
	/**
	 * USER SESSION
	 */
	
	@Autowired
	private UserComponent userComponent;
	
	
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
	public ResponseEntity<?> getBandBlogsById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		List<BlogBand> blogs = blogBandRepository.findAll();
		for(BlogBand b : blogs) {
			if (b.getId() != id) {
				blogs.remove(b);
			}
		}
		return new ResponseEntity<>(blogs, HttpStatus.OK);
	}
	
	@JsonView(BlogListView.class)
	@RequestMapping(value="/user/{id}/blogs", method = RequestMethod.GET)
	public ResponseEntity<?> getUserBlogsById(@PathVariable long id) throws Exception {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		List<BlogUser> blogs = blogUserRepository.findAll();
		for(BlogUser b : blogs) {
			if (b.getId() != id) {
				blogs.remove(b);
			}
		}
		return new ResponseEntity<>(blogs, HttpStatus.OK);
	}
	
	/**
	 * POST RequestMethods related to BLOG_CONTROLLER
	 */
	
	@RequestMapping(value = "/blogband/new", method = RequestMethod.POST)
	public ResponseEntity<?> createNewBlogBand(@RequestBody BlogBand blogband) {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
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
	public ResponseEntity<?> createNewBlogUser(@PathVariable long id ,@RequestBody BlogUser bloguser) {
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		System.out.println("saludos persona 1");
		ResponseEntity<BlogUser> response;
		//BlogUser newbloguser;
		User user = userRepository.findOne(id);
		System.out.println("saludos persona 2");
		//List<BlogUser> allblogusers = blogUserRepository.findAll();
		bloguser.setAuthor(user);
		BlogUser newBlogUser = blogUserRepository.save(bloguser);
		System.out.println("saludos persona 3");
		response = new ResponseEntity<BlogUser>(newBlogUser, HttpStatus.OK);
		System.out.println("saludos persona 4");
//		if (allblogusers.contains(bloguser)) {
//			response = new ResponseEntity<BlogUser>(bloguser, HttpStatus.CONFLICT);
//		} else {
//			newbloguser = blogUserRepository.save(bloguser);
			response = new ResponseEntity<BlogUser>(newBlogUser, HttpStatus.OK);
//		}
		return response;
	}
	

}

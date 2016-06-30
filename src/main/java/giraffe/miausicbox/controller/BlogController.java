package giraffe.miausicbox.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.BlogBand;
import giraffe.miausicbox.model.BlogUser;
import giraffe.miausicbox.repositories.BandRepository;
import giraffe.miausicbox.repositories.BlogBandRepository;
import giraffe.miausicbox.repositories.BlogUserRepository;
import giraffe.miausicbox.repositories.UserRepository;
import giraffe.miausicbox.user.User;
import giraffe.miausicbox.user.UserComponent;

@RestController
public class BlogController {

	private static final Path FILES_FOLDER = Paths.get(System.getProperty("user.dir"), "files");
	
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
	
	@JsonView(BlogView.class)
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
		System.out.println("Date:");
		System.out.println(bloguser.getDate());
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
	
	@JsonView(BlogView.class)
	@RequestMapping(value = "/band/{idBand}/blog/{idBlog}/setimage", method = RequestMethod.POST)
	public ResponseEntity<?> editBandBlogImage(@PathVariable long idBand, @PathVariable long idBlog, @RequestBody MultipartFile file) throws IllegalStateException, IOException{
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		if (file.isEmpty()) {
			return new ResponseEntity<String>("ERROR - File is empty", HttpStatus.CONFLICT);
		}
		Band band = bandRepository.findOne(idBand);
		if(band == null){
			return new ResponseEntity<String>("ERROR - User doesn't exists", HttpStatus.CONFLICT);
		}
		if(!band.getMembers().contains(userComponent.getLoggedUser())){
			return new ResponseEntity<String>("ERROR - User logged is not member", HttpStatus.CONFLICT);
		}
		BlogBand blog = blogBandRepository.findOne(idBlog);
		BlogBand newBlog;
		if(!blog.getAuthor().equals(band)){
			return new ResponseEntity<String>("ERROR - Band is not the author of the blog", HttpStatus.CONFLICT);
		}
		String filename = "blogband-" + blog.getId() + ".jpg";
		File uploadedFile = new File(FILES_FOLDER.toFile(), filename);
		//uploadedFile.delete();
		Files.deleteIfExists(uploadedFile.toPath());
		file.transferTo(uploadedFile);
		blog.setImage(filename);
		newBlog = blogBandRepository.save(blog);
		return new ResponseEntity<BlogBand>(newBlog, HttpStatus.OK);
	}
	
	@JsonView(BlogView.class)
	@RequestMapping(value = "/artist/{idUser}/blog/{idBlog}/setimage", method = RequestMethod.POST)
	public ResponseEntity<?> editUserBlogImage(@PathVariable long idUser, @PathVariable long idBlog, @RequestBody MultipartFile file) throws IllegalStateException, IOException{
		if(!userComponent.isLoggedUser()){
			return new ResponseEntity<String>("ERROR 401 - UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		}
		if (file.isEmpty()) {
			return new ResponseEntity<String>("ERROR - File is empty", HttpStatus.CONFLICT);
		}
		User user = userRepository.findOne(idUser);
		if(user == null){
			return new ResponseEntity<String>("ERROR - User doesn't exists", HttpStatus.CONFLICT);
		}
		BlogUser blog = blogUserRepository.findOne(idBlog);
		BlogUser newBlog;
		if(!blog.getAuthor().equals(user)){
			return new ResponseEntity<String>("ERROR - User is not the author of the blog", HttpStatus.CONFLICT);
		}
		String filename = "bloguser-" + blog.getId() + ".jpg";
		File uploadedFile = new File(FILES_FOLDER.toFile(), filename);
		//uploadedFile.delete();
		Files.deleteIfExists(uploadedFile.toPath());
		file.transferTo(uploadedFile);
		blog.setImage(filename);
		newBlog = blogUserRepository.save(blog);
		return new ResponseEntity<BlogUser>(newBlog, HttpStatus.OK);
	}

}

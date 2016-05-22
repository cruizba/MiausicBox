package giraffe.miausicbox;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.BlogBand;
import giraffe.miausicbox.model.BlogUser;
import giraffe.miausicbox.repositories.BlogBandRepository;
import giraffe.miausicbox.repositories.BlogUserRepository;

public class BlogController {

	@Autowired
	private BlogBandRepository blogBandRepository;
	private BlogUserRepository blogUserRepository;
	
	interface BlogListView extends BlogBand.BasicAtt {}
	
	@JsonView(BlogListView.class)
	@RequestMapping("/bnad/{id}/blogs")
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
	@RequestMapping("/user/{id}/blogs")
	public List<BlogUser> getUserBlogsById(@PathVariable long id) throws Exception {
		List<BlogUser> blogs = blogUserRepository.findAll();
		for(BlogUser b : blogs) {
			if (b.getId() != id) {
				blogs.remove(b);
			}
		}
		return blogs;
	}
	
}

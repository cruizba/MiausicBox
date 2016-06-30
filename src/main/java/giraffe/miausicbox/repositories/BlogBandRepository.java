package giraffe.miausicbox.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.BlogBand;

public interface BlogBandRepository  extends JpaRepository<BlogBand, Long> {

	public List<BlogBand> findBlogBandByAuthor(Band author);
	
	public List<BlogBand> findBlogBandByAuthorIn(List<Band> author);
	
}

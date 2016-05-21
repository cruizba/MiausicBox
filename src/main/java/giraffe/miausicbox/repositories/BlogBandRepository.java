package giraffe.miausicbox.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.BlogBand;

public interface BlogBandRepository  extends JpaRepository<BlogBand, Long> {

}

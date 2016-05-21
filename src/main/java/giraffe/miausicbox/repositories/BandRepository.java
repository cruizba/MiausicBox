package giraffe.miausicbox.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Band;

public interface BandRepository extends JpaRepository<Band, Long> {

}

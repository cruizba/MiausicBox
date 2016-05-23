package giraffe.miausicbox.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Instrument;

public interface InstrumentRepository extends JpaRepository<Instrument, String> {

}

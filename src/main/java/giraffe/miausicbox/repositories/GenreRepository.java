package giraffe.miausicbox.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Genre;

public interface GenreRepository extends JpaRepository<Genre, String> {

}

package giraffe.miausicbox.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import giraffe.miausicbox.model.Follow;

public interface FollowRepository extends JpaRepository<Follow, Long> {

}

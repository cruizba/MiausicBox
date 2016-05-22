package giraffe.miausicbox;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import giraffe.miausicbox.model.Follow;
import giraffe.miausicbox.model.User;
import giraffe.miausicbox.repositories.FollowRepository;
import giraffe.miausicbox.repositories.UserRepository;

@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;
	private FollowRepository followRepository;
	
	interface UserListView extends User.BasicAtt {}
	interface FollowListView extends Follow.BasicAtt {}
	
	@JsonView(UserListView.class)
	@RequestMapping("/artist/{id}")
	public User getUserById(@PathVariable long id) throws Exception {
		return userRepository.findOne(id);
	}
	
	@JsonView(FollowListView.class)
	@RequestMapping("/artist/{id}/follows")
	public List<Follow> getUserFollowsById(@PathVariable long id) throws Exception {
		List<Follow> follows = followRepository.findAll();
		for (Follow f : follows) {
			if (f.getEmisor().getId() != id || f.getReceptor().getId() != id) {
				follows.remove(f);
			}
		}
		return follows;
	}

}

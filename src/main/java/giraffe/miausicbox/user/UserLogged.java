package giraffe.miausicbox.user;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.FetchType;

import com.fasterxml.jackson.annotation.JsonIgnore;


public class UserLogged {
	
	
	private long realId;
	
	private String userName;
	@ElementCollection(fetch = FetchType.EAGER)
	
	@JsonIgnore
	private String passwordHash;
	
	public long getRealId() {
		return realId;
	}

	public void setRealId(long realId) {
		this.realId = realId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPasswordHash() {
		return passwordHash;
	}

	public void setPasswordHash(String passwordHash) {
		this.passwordHash = passwordHash;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	private List<String> roles;
	
	public UserLogged(){
		
	}
	
	public UserLogged(long realId, String userName, String passwordHash, String... roles){
		this.realId = realId;
		this.userName = userName;
		this.passwordHash = passwordHash;
		this.roles = new ArrayList<String>(Arrays.asList(roles));
	}

	

}

package giraffe.miausicbox.user;

public class UserRegister {
	
	private String userName;
	private String completeName;
	private String email;
	private String password;
	private boolean artist;
	
	public UserRegister(){
		
	}
	
	public UserRegister(String userName, String completeName, String email, String password, boolean artist){
		this.userName = userName;
		this.completeName = completeName;
		this.email = email;
		this.password = password;
		this.artist = artist;
	}
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getCompleteName() {
		return completeName;
	}
	public void setCompleteName(String completeName) {
		this.completeName = completeName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public boolean getIsArtist() {
		return artist;
	}

	public void setArtist(boolean artist) {
		this.artist = artist;
	}

}

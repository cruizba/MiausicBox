package giraffe.miausicbox.controller;

import java.util.ArrayList;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import giraffe.miausicbox.model.Genre;
import giraffe.miausicbox.model.Instrument;
import giraffe.miausicbox.model.Message;
import giraffe.miausicbox.model.Novelty;
import giraffe.miausicbox.model.Band;
import giraffe.miausicbox.model.BlogBand;
import giraffe.miausicbox.model.BlogUser;
import giraffe.miausicbox.model.Event;
import giraffe.miausicbox.model.Follow;
import giraffe.miausicbox.model.Track;
import giraffe.miausicbox.repositories.BandRepository;
import giraffe.miausicbox.repositories.BlogBandRepository;
import giraffe.miausicbox.repositories.BlogUserRepository;
import giraffe.miausicbox.repositories.EventRepository;
import giraffe.miausicbox.repositories.FollowRepository;
import giraffe.miausicbox.repositories.GenreRepository;
import giraffe.miausicbox.repositories.InstrumentRepository;
import giraffe.miausicbox.repositories.MessageRepository;
import giraffe.miausicbox.repositories.NoveltyRepository;
import giraffe.miausicbox.repositories.TrackRepository;
import giraffe.miausicbox.repositories.UserRepository;
import giraffe.miausicbox.user.User;

@RestController
public class GenericController {

	@Autowired
	private InstrumentRepository instrumentRepository;
	
	@Autowired
	private GenreRepository genreRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BandRepository bandRepository;
	
	@Autowired
	private BlogBandRepository blogBandRepository;
	
	@Autowired
	private BlogUserRepository blogUserRepository;
	
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private EventRepository eventRepository;
	
	@Autowired
	private NoveltyRepository noveltyRepository;
	
	@Autowired
	private TrackRepository trackRepository;
	
	@Autowired
	private FollowRepository followRepository;
	
	interface GenericListView extends User.Basic, User.InstGenres, Genre.Basic, Instrument.Basic {}
	
	@PostConstruct
	public void init() {

		// Instruments
		Instrument voz = new Instrument("Voz", "../img/instrumentoVozN.png", "../img/instrumentoVozB.png");
		Instrument gitar = new Instrument("Guitarra", "../img/instrumentoGuitarN.png", "../img/instrumentoGuitarB.png");
		Instrument bass = new Instrument("Bajo", "../img/instrumentoBajoN.png", "../img/instrumentoBajoB.png");
		Instrument drum = new Instrument("Bateria", "../img/instrumentoBajoN.png", "../img/instrumentoBajoB.png");
		Instrument violin = new Instrument("Violin", "../img/instrumentoViolinN.png", "../img/instrumentoViolinB.png");
		Instrument trompet = new Instrument("Trompeta", "../img/instrumentoTrompetaN.png", "../img/instrumentoTrompetaB.png");
		Instrument piano = new Instrument("Piano", "../img/instrumentoPianoN.png", "../img/instrumentoPianoB.png");
		Instrument other = new Instrument("Otros", "../img/instrumentoOtroN.png",  "../img/instrumentoOtroB.png");
		
		// Genres
		Genre rock = new Genre("Rock");
		Genre pop = new Genre("Pop");
		Genre jazz = new Genre("Jazz");
		Genre rap = new Genre("Rap");
		Genre reggae = new Genre("Reggae");
		Genre metal = new Genre("Metal");
		Genre hardrock = new Genre("Hard Rock");
		Genre punk = new Genre("Punk");
		Genre postpunk = new Genre("Post Punk");
		Genre indie = new Genre("Indie");
		Genre grunge = new Genre("Grunge");
		Genre postgrunge = new Genre("Post Grunge");
		Genre classic = new Genre("Classic");
		Genre house = new Genre("House");
		Genre metalcore = new Genre("Metalcore");
		Genre otros = new Genre("Otros");
		
		// Users
		User luis = new User("ice6294","1234","Luis Leon Gamez","luigi6294@gmail.com","Programador y melómano.",true
				,"Alcorcon","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		
		User carlos = new User("carolus","1234","Carlos Ruiz Ballesteros","crbthedevil@gmail.com","Viva el grunch, viva typescript. In the drak side of the moon since 1994",true
				,"Loranca","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		
		User soraya = new User("sor","a","Soraya Rama","sori@gmail.com","Gatos, gatos ,gatos :D",false
				,"Orcasitas","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		
		User thais = new User("thais","1234","Thais Mendez","thais@gmail.com","Saludos, persona. Esta es mi descripción",false
				,"Madrid","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		
		User bot = new User("mr_bot","1234","Mr. AutoBot","bot@yahoo.es","I'm not a bot, but I'm not human. What am I?",true
				,"AnonymCity","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		
		User cesar = new User("sesar","1234","César Valdés","cesar@gmail.com","Jajaja, soy un intruso.",false
				,"Alcorcón","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		
		User carlos2 = new User("cvaz","1234","Carlos Vázquez","carvaz@gmail.com","Jajaja, soy otro intruso.",true
				,"Loranca","","","",new ArrayList<Instrument>(),new ArrayList<Genre>()
				,new ArrayList<Band>(),new ArrayList<Event>());
		
		luis.getGenres().add(rock);
		luis.getGenres().add(jazz);
		luis.getGenres().add(metal);
		luis.getGenres().add(metalcore);
		luis.getGenres().add(indie);
		luis.getGenres().add(classic);
		carlos.getGenres().add(rock);
		carlos.getGenres().add(punk);
		carlos.getGenres().add(metal);
		carlos.getGenres().add(grunge);
		carlos.getGenres().add(postgrunge);
		soraya.getGenres().add(pop);
		soraya.getGenres().add(rock);
		soraya.getGenres().add(indie);
		soraya.getGenres().add(reggae);
		soraya.getGenres().add(house);
		thais.getGenres().add(pop);
		thais.getGenres().add(indie);
		thais.getGenres().add(rock);
		thais.getGenres().add(classic);
		bot.getGenres().add(rap);
		bot.getGenres().add(otros);
		cesar.getGenres().add(pop);
		cesar.getGenres().add(house);
		cesar.getGenres().add(indie);
		carlos2.getGenres().add(reggae);
		carlos2.getGenres().add(metalcore);
		carlos2.getGenres().add(rock);
		carlos2.getGenres().add(jazz);
		
		luis.getInstruments().add(gitar);
		luis.getInstruments().add(bass);
		carlos.getInstruments().add(voz);
		carlos.getInstruments().add(gitar);
		carlos2.getInstruments().add(gitar);
		carlos2.getInstruments().add(piano);
		bot.getInstruments().add(voz);
		bot.getInstruments().add(trompet);
		bot.getInstruments().add(violin);
		
		// Tracks
		Track tr0 = new Track("Hotel California", "The Eagles", "https://youtube.com/v/5a1rZrnUIRg");
		Track tr1 = new Track("Sultans Of Swing", "Dire Straits", "https://youtube.com/v/h0ffIJ7ZO4U");
		Track tr2 = new Track("School", "Supertramp", "https://youtube.com/v/dQw4w9WgXcQ");
		Track tr3 = new Track("Black", "Pearl Jam", "https://youtube.com/v/cs-XZ_dN4Hc");
		Track tr4 = new Track("Losing My Religion", "R.E.M", "https://youtube.com/v/FQ2yXWi0ppw");
		Track tr5 = new Track("Black Magic Woman", "Santana", "https://youtube.com/v/wyQUCYl-ocs");
		Track tr6 = new Track("One", "U2", "https://youtube.com/v/ElxO4eKS8EY");
		Track tr7 = new Track("Never Go Back Again", "Fleetwood Mac", "https://youtube.com/v/sKj1EFeU-cM");
		
		Track tr8 = new Track("10.000 days", "Tool", "https://youtube.com/v/FHhrmNp7o4E");
		Track tr9 = new Track("Smells Like Teen Spirit", "Nirvana", "https://youtube.com/v/hTWKbfoikeg");
		Track tr10 = new Track("So cold", "Breaking Benjamin", "https://youtube.com/v/maprNsfMS3s");
		Track tr11 = new Track("The Package", "A Perfect Circle", "https://youtube.com/v/cqJJwv_Caaw");
		Track tr12 = new Track("Were is my mind", "Pixies", "https://youtube.com/v/SjJHH6IL3Nc");
		Track tr13 = new Track("The Devil In I", "Slipknot", "https://youtube.com/v/OLqNFjLsJLk");
		Track tr14 = new Track("Bella Ciao", "Anonym", "https://youtube.com/v/4CI3lhyNKfo");
		
		Track tr15 = new Track("Radiohead", "In its right place", "https://youtube.com/v/ZRmh__q6YIM");
		
		Track tr16 = new Track("Fluorescent Adolescent", "Arctic Monkeys", "https://youtube.com/v/PltKDFVAkXs");
		Track tr17 = new Track("Little Talks", "Of Monster and Men", "https://youtube.com/v/ghb6eDopW8I");
		Track tr18 = new Track("Somebody Told Me", "The Killers", "https://youtube.com/v/Y5fBdpreJiU");
		Track tr19 = new Track("What You Know", "Two Door Cinema Club", "https://youtube.com/v/YXwYJyrKK5A");
		Track tr20 = new Track("Let Her Go","The Passenger","https://youtube.com/v/RBumgq5yVrA");
		Track tr21 = new Track("The Cave","Mumford and Sons","https://youtube.com/v/IgDNCmGr-Q4");
		Track tr22 = new Track("Get Lucky","Daft Punk","https://youtube.com/v/5NV6Rdv1a3I");
		
		// Band
		Band grudge = new Band(luis, "Our Grudge", "Come and see ...", "Madrid", "www.grudge.es","","",""
				,new ArrayList<User>(),new ArrayList<User>()
				,new ArrayList<Genre>(),new ArrayList<Track>());
		
		Band ransom = new Band(carlos,"Ransom Viral","Let the revolution begin. This is our way, there is our fate.","Madrid","www.ransomviral.es","","",""
				,new ArrayList<User>(),new ArrayList<User>()
				,new ArrayList<Genre>(),new ArrayList<Track>());
		
		Band botman = new Band(bot,"BotMan0id","To upgrade your bot account for only 999.99$ go to www.botman0id.com","GB","www.botman0id.com","","",""
				,new ArrayList<User>(),new ArrayList<User>()
				,new ArrayList<Genre>(),new ArrayList<Track>());
		
		Band indiefest = new Band(carlos,"Indie Fest","The new wave is comming. Come with us into the indie music limbo.","GB","www.botman0id.com","","",""
				,new ArrayList<User>(),new ArrayList<User>()
				,new ArrayList<Genre>(),new ArrayList<Track>());
		
		grudge.getMembers().add(luis);
		ransom.getMembers().add(carlos);
		ransom.getMembers().add(luis);
		ransom.getMembers().add(carlos2);
		botman.getMembers().add(bot);
		indiefest.getMembers().add(carlos);

		luis.getBands().add(grudge);
		luis.getBands().add(ransom);
		carlos.getBands().add(ransom);
		carlos.getBands().add(indiefest);
		bot.getBands().add(botman);
		carlos2.getBands().add(ransom);

		grudge.getTracks().add(tr0);
		grudge.getTracks().add(tr1);
		grudge.getTracks().add(tr2);
		grudge.getTracks().add(tr3);
		grudge.getTracks().add(tr4);
		grudge.getTracks().add(tr5);
		grudge.getTracks().add(tr6);
		
		ransom.getTracks().add(tr8);
		ransom.getTracks().add(tr9);
		ransom.getTracks().add(tr10);
		ransom.getTracks().add(tr11);
		ransom.getTracks().add(tr12);
		ransom.getTracks().add(tr13);
		ransom.getTracks().add(tr14);
		
		botman.getTracks().add(tr15);
		
		indiefest.getTracks().add(tr16);
		indiefest.getTracks().add(tr17);
		indiefest.getTracks().add(tr18);
		indiefest.getTracks().add(tr19);
		indiefest.getTracks().add(tr20);
		indiefest.getTracks().add(tr21);
		indiefest.getTracks().add(tr22);
		
		grudge.getGenres().add(rock);
		ransom.getGenres().add(rock);
		ransom.getGenres().add(punk);
		botman.getGenres().add(reggae);
		indiefest.getGenres().add(indie);
		
		// BlogUser
		BlogUser bu0 = new BlogUser("Tool","http://www.campusghanta.com/wp-content/uploads/2012/03/tool.jpg","Un componente básico del catálogo de Tool es el uso de compases poco comunes.","Wed Apr 13 2016 20:16:37 GMT+0200 (CEST)",luis);
		BlogUser bu1 = new BlogUser("Nueva banda!","https://wallpaperscraft.com/image/grunge_guitar_drawing_scratching_18516_3840x2400.jpg","Hoy comienza","Thu Jan 21 2016 17:47:40 GMT+0200 (CEST)",carlos);
		BlogUser bu2 = new BlogUser("Indie is life","http://www.musisteria.com/blog/wp-content/uploads/2012/01/indie1.bmp","Desde principios de los años 90, el indie pop ha estado creciendo casi sin cesar en popularidad.","Tue May 10 2016 17:15:37 GMT+0200 (CEST)",soraya);
		BlogUser bu3 = new BlogUser("Daw","https://blog-static.odesk.com/blog/uploads/sites/4/2012/04/2017_web-e1391526584549.jpg","Las aplicaciones web son populares debido a lo práctico del navegador web como cliente ligero y a la independencia del sistema operativo.","Thu Jun 2 2016 9:30:37 GMT+0200 (CEST)",thais);
		BlogUser bu4 = new BlogUser("No está mal","http://hypefreshmag.com/wp-content/uploads/2014/07/Homer-Simpsons-Music-Headphones-Anime.jpg","Pues os está quedando bien la página jeje","Tue Jun 21 2016 13:55:20 GMT+0200 (CEST)",cesar);
		BlogUser bu5 = new BlogUser("Seguimos aprendiendo", "", "Metalcore es un género de fusión musical que incorpora elementos del hardcore punk con otros del heavy metal. El término es un acrónimo de heavy metal y hardcore punk.", "Tue Jun 14 2016 23:30:20 GMT+0200 (CEST)", carlos2);

		// BlogBand
		BlogBand bb0 = new BlogBand("Bella ciao","http://lliureimillor.cat/wp-content/uploads/2016/04/bella-ciao-2.jpg","Bella ciao (Adiós, bella) es el más conocido canto partisano italiano de los grupos resistentes contra el fascismo y nazismo.","Tue Mar 22 2016 20:15:37 GMT+0200 (CEST)",ransom);
		BlogBand bb1 = new BlogBand("Bot title [Insert title]","","Bot description [Insert description]","Tue May 1 2016 10:00:00 GMT+0200 (CEST)",botman);
		
		// Messages
		Message mes0 = new Message(carlos, luis, "Ey!", "Acabo de crear una banda, te unes?", "Sat Jan 9 2016 03:07:50 GMT+0200 (CEST)", true);
		Message mes1 = new Message(soraya, thais, "Holi", "Viva Cthulhu", "Fri Apr 1 2016 18:20:30 GMT+0200 (CEST)", true);
		Message mes2 = new Message(cesar, carlos, "Lol", "Risas", "Sun Jun 5 2016 18:10:30 GMT+0200 (CEST)", false);
		Message mes3 = new Message(carlos, luis, "Unete", "necesito peña", "Sun Jan 10 2016 13:07:50 GMT+0200 (CEST)", true);
		Message mes4 = new Message(carlos, carlos2, "Ransom Viral es tu destino", "que eso, te apuntas?", "Sat Jan 9 2016 04:17:50 GMT+0200 (CEST)", true);
		Message mes5 = new Message(carlos, luis, "Ey!", "Acabo de crear una banda, te unes?", "Sat Jan 9 2016 03:07:50 GMT+0200 (CEST)", true);
		Message mes6 = new Message(thais, cesar, "Jajaja, de dónde has salido?", "Sun Bienvenido a MiausicBox :D", "Apr 24 2016 20:21:50 GMT+0200 (CEST)", false);
		Message mes7 = new Message(bot, cesar, "Upgrade your account", "For only 99.99$ you can get vip account for new bot accounts!", "Mon Jun 13 2016 10:00:00 GMT+0200 (CEST)", false);
		
		// Events
		Event ev0 = new Event("HellFest", "Fri Apr 1 2016 18:20:00 GMT+0200 (CEST)", luis, "Festival heavy rock en Francia",
				new ArrayList<>(), "Paris, Francia", new ArrayList<>());
		Event ev1 = new Event("IndieFest",  "Sat Jul 30 2016 19:00:00 GMT+0200 (CEST)", soraya, "Festival indie tope guachi",
				new ArrayList<>(), "Madrid", new ArrayList<>());
		Event ev2 = new Event("Rockola",  "Mon Sep 5 2016 17:30:00 GMT+0200 (CEST)", carlos, "Arguelles",
				new ArrayList<>(), "Madrid", new ArrayList<>());
		
		ev0.getBands().add(grudge);
		ev0.getBands().add(ransom);
		ev1.getBands().add(indiefest);
		ev2.getBands().add(ransom);
		ev2.getBands().add(botman);
		
		ev0.getFollowers().add(luis);
		ev0.getFollowers().add(carlos);
		ev0.getFollowers().add(carlos2);
		ev0.getFollowers().add(bot);
		ev1.getFollowers().add(soraya);
		ev1.getFollowers().add(thais);
		ev1.getFollowers().add(cesar);
		ev1.getFollowers().add(bot);
		ev2.getFollowers().add(bot);
		
		// Novelties
		Novelty nov0 = new Novelty(luis, grudge, "Wed Jan 20 2016 18:20:30 GMT+0200 (CEST)", true);
		Novelty nov1 = new Novelty(carlos, ransom, "Thu Jan 21 2016 16:15:10 GMT+0200 (CEST)", true);
		Novelty nov2 = new Novelty(luis, ransom, "Sat Feb 6 2016 10:54:40 GMT+0200 (CEST)", true);
		Novelty nov3 = new Novelty(carlos2, ransom, "Fri Feb 26 2016 21:02:00 GMT+0200 (CEST)", true);
		Novelty nov4 = new Novelty(bot, botman, "Sun Mar 13 2016 10:00:00 GMT+0200 (CEST)", true);
		Novelty nov5 = new Novelty(carlos, indiefest, "Wed Mar 30 2016 18:40:50 GMT+0200 (CEST)", true);
		Novelty nov6 = new Novelty(luis, indiefest, "Fri Apr 1 2016 20:33:00 GMT+0200 (CEST)", true);
		Novelty nov7 = new Novelty(luis, indiefest, "Thu Apr 28 2016 20:33:00 GMT+0200 (CEST)", false);
		Novelty nov8 = new Novelty(bot, grudge, "Fri May 13 2016 10:00:00 GMT+0200 (CEST)", true);
		Novelty nov9 = new Novelty(bot, grudge, "Fri May 13 2016 10:01:00 GMT+0200 (CEST)", false);
		
		// Follows
		Follow fol0 = new Follow(luis, carlos);
		Follow fol1 = new Follow(luis, carlos2);
		Follow fol2 = new Follow(luis, soraya);
		Follow fol3 = new Follow(luis, cesar);
		Follow fol4 = new Follow(carlos, luis);
		Follow fol5 = new Follow(carlos, carlos2);
		Follow fol6 = new Follow(carlos, thais);
		Follow fol7 = new Follow(soraya, luis);
		Follow fol8 = new Follow(soraya, thais);
		Follow fol9 = new Follow(soraya, cesar);
		Follow fol10 = new Follow(thais, carlos);
		Follow fol11 = new Follow(thais, soraya);
		Follow fol12 = new Follow(thais, carlos2);
		Follow fol13 = new Follow(carlos2, carlos);
		Follow fol14 = new Follow(carlos2, luis);
		Follow fol15 = new Follow(carlos2, thais);
		Follow fol16 = new Follow(bot, luis);
		Follow fol17 = new Follow(bot, carlos);
		Follow fol18 = new Follow(bot, soraya);
		Follow fol19 = new Follow(bot, thais);
		Follow fol20 = new Follow(bot, carlos2);
		Follow fol21 = new Follow(bot, cesar);
		
		// Saves
		instrumentRepository.save(voz);
		instrumentRepository.save(gitar);
		instrumentRepository.save(bass);
		instrumentRepository.save(drum);
		instrumentRepository.save(violin);
		instrumentRepository.save(trompet);
		instrumentRepository.save(piano);
		instrumentRepository.save(other);
		
		genreRepository.save(rock);
		genreRepository.save(pop);
		genreRepository.save(jazz);
		genreRepository.save(rap);
		genreRepository.save(reggae);
		genreRepository.save(metal);
		genreRepository.save(hardrock);
		genreRepository.save(punk);
		genreRepository.save(postpunk);
		genreRepository.save(indie);
		genreRepository.save(grunge);
		genreRepository.save(postgrunge);
		genreRepository.save(classic);
		genreRepository.save(house);
		genreRepository.save(metalcore);
		genreRepository.save(otros);
		
		trackRepository.save(tr0);
		trackRepository.save(tr1);
		trackRepository.save(tr2);
		trackRepository.save(tr3);
		trackRepository.save(tr4);
		trackRepository.save(tr5);
		trackRepository.save(tr6);
		trackRepository.save(tr7);
		trackRepository.save(tr8);
		trackRepository.save(tr9);
		trackRepository.save(tr10);
		trackRepository.save(tr11);
		trackRepository.save(tr12);
		trackRepository.save(tr13);
		trackRepository.save(tr14);
		trackRepository.save(tr15);
		trackRepository.save(tr16);
		trackRepository.save(tr17);
		trackRepository.save(tr18);
		trackRepository.save(tr19);
		trackRepository.save(tr20);
		trackRepository.save(tr21);
		trackRepository.save(tr22);
		
		userRepository.save(luis);
		userRepository.save(carlos);
		userRepository.save(soraya);
		userRepository.save(thais);
		userRepository.save(bot);
		userRepository.save(carlos2);
		userRepository.save(cesar);
		
		bandRepository.save(grudge);
		bandRepository.save(ransom);
		bandRepository.save(botman);
		bandRepository.save(indiefest);
		
		blogUserRepository.save(bu0);
		blogUserRepository.save(bu1);
		blogUserRepository.save(bu2);
		blogUserRepository.save(bu3);
		blogUserRepository.save(bu4);
		blogUserRepository.save(bu5);
		
		blogBandRepository.save(bb0);
		blogBandRepository.save(bb1);
		
		messageRepository.save(mes0);
		messageRepository.save(mes1);
		messageRepository.save(mes2);
		messageRepository.save(mes3);
		messageRepository.save(mes4);
		messageRepository.save(mes5);
		messageRepository.save(mes6);
		messageRepository.save(mes7);
		
		eventRepository.save(ev0);
		eventRepository.save(ev1);
		eventRepository.save(ev2);
		
		noveltyRepository.save(nov0);
		noveltyRepository.save(nov1);
		noveltyRepository.save(nov2);
		noveltyRepository.save(nov3);
		noveltyRepository.save(nov4);
		noveltyRepository.save(nov5);
		noveltyRepository.save(nov6);
		noveltyRepository.save(nov7);
		noveltyRepository.save(nov8);
		noveltyRepository.save(nov9);
		
		followRepository.save(fol0);
		followRepository.save(fol1);
		followRepository.save(fol2);
		followRepository.save(fol3);
		followRepository.save(fol4);
		followRepository.save(fol5);
		followRepository.save(fol6);
		followRepository.save(fol7);
		followRepository.save(fol8);
		followRepository.save(fol9);
		followRepository.save(fol10);
		followRepository.save(fol11);
		followRepository.save(fol12);
		followRepository.save(fol13);
		followRepository.save(fol14);
		followRepository.save(fol15);
		followRepository.save(fol16);
		followRepository.save(fol17);
		followRepository.save(fol18);
		followRepository.save(fol19);
		followRepository.save(fol20);
		followRepository.save(fol21);
		
		
	}
	
}

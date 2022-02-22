package fyp.kwchui.cinematicbackend.config;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import fyp.kwchui.cinematicbackend.model.Cinema;
import fyp.kwchui.cinematicbackend.model.House;
import fyp.kwchui.cinematicbackend.model.Movie;
import fyp.kwchui.cinematicbackend.model.Role;
import fyp.kwchui.cinematicbackend.model.User;
import fyp.kwchui.cinematicbackend.repository.MovieRepository;
import fyp.kwchui.cinematicbackend.service.CinemaService;
import fyp.kwchui.cinematicbackend.service.UserService;

@Configuration
public class DefaultConfig {

        @Bean
        CommandLineRunner commandLineRunner(MovieRepository movieRepository, UserService userService,
                        CinemaService cinemaService) {
                return args -> {

                        // Movie
                        Movie m1 = new Movie();
                        m1.setTitle("Free Guy");
                        m1.setGenre("Action, Comedy, Adventure");
                        m1.setLanguage("English");
                        m1.setCategory("IIA");
                        m1.setDirector("Shawn Levy");
                        m1.setStarring("Ryan Reynolds, Jodie Comer, Taika Waititi");
                        m1.setDistributor("20th Century Studios");
                        m1.setDescription(
                                        "A bank teller who discovers he is actually a non-player character in a massively multiplayer online video game and becomes the hero of the story, trying to save his friends from deletion by the game's creator.");
                        m1.setReleaseDate(LocalDate.of(2021, 8, 12));
                        m1.setDuration(115);
                        m1.setPosterFileName("FreeGuy_HKPoster.jpg");

                        Movie m2 = new Movie();
                        m2.setTitle("The Suicide Squad");
                        m2.setGenre("Action, Comedy, Adventure");
                        m2.setLanguage("English");
                        m2.setCategory("III");
                        m2.setDirector("James Gunn");
                        m2.setStarring("Margot Robbie, Idris Elba, John Cena");
                        m2.setDistributor("Warner Bros. Entertainment Inc.");
                        m2.setDescription(
                                        "Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.");
                        m2.setReleaseDate(LocalDate.of(2021, 8, 5));
                        m2.setDuration(132);
                        m2.setPosterFileName("SuicideSquad2nd_HKposter.jpg");

                        Movie m3 = new Movie();
                        m3.setTitle("Dune");
                        m3.setGenre("Action, Sci-Fi, Adventure");
                        m3.setLanguage("English");
                        m3.setCategory("IIA");
                        m3.setDirector("Denis Villeneuve");
                        m3.setStarring("Timothée Chalamet, Rebecca Ferguson, Zendaya");
                        m3.setDistributor("Warner Bros. Entertainment Inc.");
                        m3.setDescription(
                                        "A mythic and emotionally charged hero\'s journey, \"Dune\" tells the story of Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, who must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet\'s exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity\'s greatest potential-only those who can conquer their fear will survive.");
                        m3.setReleaseDate(LocalDate.of(2021, 9, 16));
                        m3.setDuration(156);
                        m3.setPosterFileName("DUNE_HKPoster.jpg");

                        movieRepository.saveAll(List.of(m1, m2, m3));

                        // User & Role
                        userService.addRole(new Role(null, "MEMBER"));
                        userService.addRole(new Role(null, "CINEMA_COMPANY"));
                        userService.addRole(new Role(null, "STREAMING_PROVIDER"));
                        userService.addRole(new Role(null, "ADMIN"));

                        userService.addUser(
                                        new User(null, "peter@cinematic.com", "Peter", "peterpw", new ArrayList<>(),
                                                        new ArrayList<>(), new ArrayList<>()));
                        userService.addRoleToUser("Peter", "MEMBER");
                        userService.addRoleToUser("Peter", "ADMIN");

                        // Cinema
                        Cinema c1 = cinemaService.addCinema(new Cinema(null, "KINGSWOOD", "1515 5555",
                                        "Shop G87A, 1/F, G/F, +WOO Phase 2, 18 Tin Yan Road, Tin Shui Wai, Yuen Long, NT",
                                        22.45734920690819, 114.00374591080308, new ArrayList<>()));

                        // House
                        cinemaService.addHouse(c1.getId(),
                                        new House(null, "House1", "alphabet", 0, 0, c1, new ArrayList<>(),
                                                        new ArrayList<>()));
                };
        }
}

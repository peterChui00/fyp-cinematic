package fyp.kwchui.cinematicbackend.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import fyp.kwchui.cinematicbackend.model.Movie;
import fyp.kwchui.cinematicbackend.repository.MovieRepository;

@Configuration
public class MovieConfig {
    
    @Bean
    CommandLineRunner commandLineRunner(MovieRepository movieRepository){
        return args -> {
            Movie m1 = new Movie();
            m1.setTitle("My Hero Academia: World Heroes' Mission");
            m1.setGenre("Animation");
            m1.setLanguage("Japanese");
            m1.setCategory("IIA");
            m1.setDirector("Kenji Nagasaki");

            Movie m2 = new Movie();
            m2.setTitle("Venom: Let There Be Carnage");
            m2.setGenre("Superhero");
            m2.setLanguage("English");
            m2.setCategory("IIB");
            m2.setDirector("Andy Serkis");

            Movie m3 = new Movie();
            m3.setTitle("Dune");
            m3.setGenre("Action, Sci-Fi, Adventure");
            m3.setLanguage("English");
            m3.setCategory("IIA");
            m3.setDirector("Denis Villeneuve");

            movieRepository.saveAll(List.of(m1, m2, m3));
        };
    }
}

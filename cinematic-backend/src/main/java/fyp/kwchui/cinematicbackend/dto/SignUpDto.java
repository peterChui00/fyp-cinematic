package fyp.kwchui.cinematicbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpDto {
    private String email;
    private String username;
    private String password;
    private String role;
}

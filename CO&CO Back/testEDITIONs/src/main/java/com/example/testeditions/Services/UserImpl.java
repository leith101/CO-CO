package com.example.testeditions.Services;

import com.example.testeditions.DTO.LoginDTO;
import com.example.testeditions.DTO.UserDTO;
import com.example.testeditions.Entites.Preferences;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class UserImpl implements UserService {

    private final TaskScheduler taskScheduler;


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    @Autowired
    private JavaMailSender emailSender;

    public UserImpl(TaskScheduler taskScheduler) {
        this.taskScheduler = taskScheduler;
    }


    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public User save(UserDTO userDTO) {

        User existingUser = userRepository.findByEmail(userDTO.getEmail());
        if (existingUser != null) {
            throw new EmailAlreadyExistsException("L'adresse e-mail est déjà utilisée.");
        }
        User user = new User();
        user.setId(userDTO.getId());
        user.setNom(userDTO.getNom());
        user.setEmail(userDTO.getEmail());
        // Encode the plain-text password using BCryptPasswordEncoder
        user.setPassword(this.passwordEncoder.encode(userDTO.getPassword()));
        user.setTelephone(userDTO.getTelephone());
        user.setRole(userDTO.getRole().utilisateur);
        user.setRating(user.getRating());
        user.setGenre(userDTO.getGenre());

        user.setDateInscription(new Date());
        user.setVerified(false);





        String verificationToken = UUID.randomUUID().toString();
        user.setVerificationToken(verificationToken);
        userRepository.save(user);
        String verificationLink = "http://localhost:8089/verify?token=" + verificationToken;
        String emailBody = "Cliquez sur le lien suivant pour vérifier votre adresse e-mail : " + verificationLink;
        sendEmail(userDTO.getEmail(), "Vérification de votre adresse e-mail", emailBody);
        return user;
    }




    public void verifyUser(String token) {
        User user = userRepository.findByVerificationToken(token);
        if (user != null) {
            user.setVerified(true);
            userRepository.save(user);
        } else {
            // Gérer le cas où aucun utilisateur n'est associé 03 token de vérification
            throw new VerificationTokenNotFoundException("Token de vérification invalide.");
        }
    }




    @Override
    public User update(Long userId, User userDTO) {
        // Retrieve the existing user from the database
        User existingUser = userRepository.findById(userId).orElse(null);

            existingUser.setNom(userDTO.getNom());
            existingUser.setEmail(userDTO.getEmail());
        existingUser.setTelephone(userDTO.getTelephone());
        existingUser.setRole(userDTO.getRole());
            // Save the updated user to the database
            return userRepository.save(existingUser);


    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) {
        String msg = "";
        User user1 = userRepository.findByEmail(loginDTO.getEmail());
        if (user1 != null) {

            if (user1.isBanned()) {
                // Return null or an appropriate response to indicate that the user is banned
                return null;
            }
            String password = loginDTO.getPassword();
            String encodedPassword = user1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);

            if (isPwdRight) {
                Optional<User> user = userRepository.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (user.isPresent()) {
                    // Create and return UserDetailsDTO with user information
                    UserDTO userDetailsDTO = new UserDTO();
                    userDetailsDTO.setId(user.get().getId());
                    userDetailsDTO.setNom(user.get().getNom());
                    userDetailsDTO.setEmail(user.get().getEmail());
                    userDetailsDTO.setTelephone(user.get().getTelephone());
                    userDetailsDTO.setRating(user.get().getRating());
                    userDetailsDTO.setRole(user.get().getRole());
                    userDetailsDTO.setVerified(user.get().isVerified());
                    userDetailsDTO.setGenre(user.get().getGenre());

                    // Add any other fields you want to include

                    return userDetailsDTO;

                }
            }
        }
        return null;
    }
    @Override
    public User addPreferencesToUser(Long userId, List<String> selectedTypes) {
        // Fetch the user by ID
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            // Create preferences and associate them with the user
            List<Preferences> preferencesList = new ArrayList<>();
            for (String selectedType : selectedTypes) {
                Preferences preferences = new Preferences();
                preferences.setSelectedTypes(Collections.singletonList(selectedType));
                preferences.setUser(user);
                preferencesList.add(preferences);
            }

            // Set the preferences for the user and save
            user.setPreferences(preferencesList);
            userRepository.save(user);
        }
            return user;

    }



    @Override
    public User disconnect(User user) {
        if (user == null) {
            return null;
        }

        User dbUser = userRepository.findByNom(user.getNom());
        if (dbUser == null) {
            return user;
        }

        dbUser.setConnected(false);
        return userRepository.save(dbUser);
    }


    @Scheduled(fixedDelay = 60000)
    public void updateBanStatus() {
        userRepository.updateBanStatusAfterOneMinute();
    }

    public void banUserByEmailTemporarily(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setBanned(true);
            user.setBanExpiration(LocalDateTime.now().plus(1, ChronoUnit.MINUTES));
            userRepository.save(user);
        }
    }

    @Override
    public void banUserByEmail(String email) {

        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setBanned(true);
            userRepository.save(user);
        }

    }



    @Override
    public long countBannedUsers() {
        return userRepository.countByBannedTrue();    }



    @Override
    public void sendVerificationCode(String toEmail) {
        String verificationCode = generateVerificationCode(); // Generate verification code
        String subject = "Verification Code";
        String body = "Your verification code is: " + verificationCode;

        sendEmail(toEmail, subject, body);
    }

    @Override
    public String generateVerificationCode() {
        // Generate a random 6-digit verification code
        Random random = new Random();
        int code = 1000 + random.nextInt(9000);
        return String.valueOf(code);
    }

    @Override
    public void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("racem.messaoudi@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        emailSender.send(message);
        System.out.println("Mail Sent successfully...");
    }

    public void insertUser(User userData) {
        // Create a new User entity from the UserData object
        User user = new User();
        user.setEmail(userData.getEmail());
        user.setNom(userData.getNom());
        // Set other properties as needed

        // Save the user entity to the database using UserRepository
        userRepository.save(user);
    }

}




package com.example.pokerplanninpi.auth;


import com.example.pokerplanninpi.Repository.EmailTokenRepository;
import com.example.pokerplanninpi.Repository.IUserRepository;
import com.example.pokerplanninpi.Repository.TokenRepository;
import com.example.pokerplanninpi.configs.JwtService;
import com.example.pokerplanninpi.email.EmailService;
import com.example.pokerplanninpi.entity.EmailToken;
import com.example.pokerplanninpi.entity.Token;
import com.example.pokerplanninpi.entity.TokenType;
import com.example.pokerplanninpi.entity.User;
import com.example.pokerplanninpi.tfa.TwoFactorAuthenticationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final IUserRepository repository;
  private final TokenRepository tokenRepository;
    private final EmailTokenRepository emailtokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
    private final EmailService emailService;
  private final AuthenticationManager authenticationManager;
  private final TwoFactorAuthenticationService tfaService;
    private final JavaMailSender emailSender;

    @Value("http://localhost:4200/activate-account")
    private  String activationUrl;

  public AuthenticationResponse register(RegisterRequest request) throws MessagingException, jakarta.mail.MessagingException {
 var user= User.builder()
         .firstname(request.getFirstname())
         .lastname(request.getLastname())
         .email(request.getEmail())
         .password(passwordEncoder.encode(request.getPassword()))
         .role(request.getRole())
         .mfaEnabled(request.isMfaEnabled())
         .build();
 //if mfa enabled--> generate secret
      if(request.isMfaEnabled()){
          user.setSecret(tfaService.generateNewSecret());
      }
      var savedUser= repository.save(user);
      sendValidationEmail(savedUser);
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    saveUserToken(savedUser, jwtToken);

    return AuthenticationResponse.builder()
            .secretImageUri(tfaService.generateQrCodeImageUri(user.getSecret()))
           .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .mfaEnabled(user.isMfaEnabled())
            .build();
  }

    private void sendValidationEmail(User user) throws MessagingException, jakarta.mail.MessagingException {
      var newToken= generateAndSaveActivationToken(user);
        sendEmail2(user.getEmail(), "activate_account", newToken,activationUrl);
        //emailService.sendEmail(user.getEmail(), user.getfullNname(), "activate_account",activationUrl,newToken,"Account activation");
    }
    private void sendEmail2(String to, String subject, String token,String activationUrl) throws MessagingException, jakarta.mail.MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject(subject);

        StringBuilder emailContent = new StringBuilder();
        emailContent.append("<html><body style='font-family: Arial, sans-serif;'>");

        // Cadre bleu avec le texte "Welcome to Poker Planning"
        emailContent.append("<div style='background-color:#007bff; color:#fff; padding:10px; text-align:center;'>");
        emailContent.append("<h1>MindCare Activating account</h1>");
        emailContent.append("</div>");

        // Texte de base de l'e-mail




        // Design de la réponse
        emailContent.append("<div style='background-color:#f8f9fa; padding:10px; margin-top:20px;'>");
        emailContent.append("<h3 style='color:#28a745;'>Token : </h3>");
        emailContent.append("<p><strong>This is your token :</strong> ").append(token).append("</p>");
        emailContent.append("<a href='").append(activationUrl).append("' style='background-color:#007bff; color:#fff; padding:10px; text-decoration:none; display:inline-block; margin-top:10px;'>Activate Account</a>");
        emailContent.append("</div>");

        emailContent.append("</body></html>");

        helper.setText(emailContent.toString(), true);
        System.out.println("mail sent");
        emailSender.send(message);
        System.out.println("mail sent");
    }
    private String generateAndSaveActivationToken(User user) {
      String generatedToken=generateActivationCode(6);
        LocalDateTime createdAt = LocalDateTime.now();
 var emailtoken= EmailToken.builder()
         .emailtoken(generatedToken)
         .createdAt(LocalDateTime.now())
         .expiresAt(LocalDateTime.now().plusMinutes(15))
         .user(user)
         .build();
 emailtokenRepository.save(emailtoken);
      return generatedToken;
    }

    private String generateActivationCode(int length) {
      String characters="0123456789";
      StringBuilder codeBuilder=new StringBuilder();
        SecureRandom secureRandom=new SecureRandom();
        for (int i=0;i<length;i++){
            int randomIndex=secureRandom.nextInt(characters.length()); //0..9
            codeBuilder.append(characters.charAt(randomIndex));
        }
      return codeBuilder.toString();
    }

    private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
            .user(user)
            .token(jwtToken)
            .tokenType(TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build();
    tokenRepository.save(token);
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );
    var user = repository.findByEmaill(request.getEmail()).orElseThrow(() -> new NoSuchElementException("No user with the provided email"));

if(user.isMfaEnabled()){
    return AuthenticationResponse.builder()
            .accessToken("")
            .refreshToken("")
            .mfaEnabled(true)
            .build();
}
      
    var jwtToken = jwtService.generateToken(user);
      var refreshToken = jwtService.generateRefreshToken(user);
      revokeAllUserTokens(user);
   saveUserToken(user,jwtToken);

    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .mfaEnabled(false)
        .build();
  }



  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
   if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {

      var user = this.repository.findByEmaill(userEmail)
              .orElseThrow(() -> new NoSuchElementException("No user with the provided email"));

      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .mfaEnabled(false)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }
    public AuthenticationResponse verifyCode(
            VerificationRequest verificationRequest
    ) {
        User user = repository
                .findByEmaill(verificationRequest.getEmail())
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("No user found with %S", verificationRequest.getEmail()))
                );
        if (tfaService.isOtpNotValid(user.getSecret(), verificationRequest.getCode())) {

            throw new BadCredentialsException("Code is not correct");
        }
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .mfaEnabled(user.isMfaEnabled())
                .build();
    }

    //@Transactional
    public void activateAccount(String token) throws MessagingException, jakarta.mail.MessagingException {
        EmailToken savedToken = emailtokenRepository.findByEmailtoken(token)
                // todo exception has to be defined
                .orElseThrow(() -> new RuntimeException("Invalid token"));
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired. A new token has been send to the same email address");
        }

        var user = repository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        repository.save(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        emailtokenRepository.save(savedToken);
    }
}

package com.example.pokerplanninpi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//import javax.persistence.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Token {

  @Id
  @GeneratedValue
  public Integer id;

  //@Column(unique = true)
  public String token;

  @Enumerated(EnumType.STRING)
  public TokenType tokenType = TokenType.BEARER;

  public boolean revoked;

  public boolean expired;
  @Override
  public String toString() {
    return "Token{" +
            "id=" + id +
            ", token='" + token + '\'' +
            ", tokenType=" + tokenType +
            ", revoked=" + revoked +
            ", expired=" + expired +
            '}';
  }
  @ManyToOne//(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  @JsonIgnore
  public User user;
}

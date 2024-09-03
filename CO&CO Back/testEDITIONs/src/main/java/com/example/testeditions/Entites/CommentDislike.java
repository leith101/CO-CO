package com.example.testeditions.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDislike implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iddis")
    private Long iddis;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "comment_id")
    private Commentaire commentaire;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;

    public CommentDislike(Commentaire commentaire, User user) {
        this.commentaire = commentaire;
        this.user = user;
    }

}

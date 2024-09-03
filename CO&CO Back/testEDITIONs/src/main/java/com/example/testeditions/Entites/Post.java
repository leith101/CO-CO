package com.example.testeditions.Entites;



import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdPost;
    private String DescriptionPost;
    private Date DatePost;
    @ManyToOne
    User user;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="post")
    private List<Likee> Likes;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy="post")
    private List<Comment> Comments;
}
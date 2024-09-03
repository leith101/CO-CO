package com.example.testeditions.Entites;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdComment;
    private  String description_comment;
    private Date DateComment;
    @JsonIgnore
    @ManyToOne
    Post post;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="comment")
    private List<ResponseComment> ResponseComments;}


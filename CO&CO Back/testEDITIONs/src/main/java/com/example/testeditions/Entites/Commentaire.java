    package com.example.testeditions.Entites;

    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    import java.io.Serializable;
    import java.util.ArrayList;
    import java.util.List;

    @Entity
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public class Commentaire implements Serializable {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "idco")
        private Long idco;
        private String comments;
        @OneToMany(mappedBy = "commentaire", cascade = CascadeType.ALL)
        @JsonIgnore
        private List<CommentLike> likes = new ArrayList<>();

        @OneToMany(mappedBy = "commentaire", cascade = CascadeType.ALL)
        @JsonIgnore
        private List<CommentDislike> dislikes = new ArrayList<>();


        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;

         @ManyToOne
        @JoinColumn(name = "annoncecov_id")
        private AnnonceCov annonceCov;



    }

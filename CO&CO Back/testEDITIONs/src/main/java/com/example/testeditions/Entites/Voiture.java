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
        public class Voiture implements Serializable {

            @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
            @Column (name = "idv")
            private Long idv;

            private int nombrePlaces;
            private String matricule;
            private String img;
            private String marque;
            private String modele;





            @JsonIgnore
            @ManyToOne
            @JoinColumn(name = "user_id")
            private User user;



        }

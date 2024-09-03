package com.example.testeditions.Entites;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Notification implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idn;

    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private boolean is_read;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;
}

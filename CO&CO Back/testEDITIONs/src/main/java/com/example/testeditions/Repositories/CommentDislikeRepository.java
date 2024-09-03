package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.CommentDislike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentDislikeRepository extends JpaRepository<CommentDislike,Long > {
    CommentDislike findByCommentaireIdcoAndUserId(Long idco, Long userId);


}

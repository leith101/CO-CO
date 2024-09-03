package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.CommentLike;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentLikeRepository extends JpaRepository<CommentLike,Long > {
    CommentLike findByCommentaireIdcoAndUserId(Long idco, Long userId);

}

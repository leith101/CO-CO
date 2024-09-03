package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.Likee;
import com.example.testeditions.Entites.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikeeRepository extends JpaRepository<Likee,Long> {
    @Query("SELECT l FROM Likee l WHERE l.post.IdPost = :postId AND l.user.id = :userId")
    List<Likee> findByPostIdAndUserId(@Param("postId") Long postId, @Param("userId") Long userId);
    @Query("SELECT l FROM Likee l WHERE l.post.IdPost = :postId")
    List<Likee> findByPostId(@Param("postId") Long postId);
}


package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.Comment;
import com.example.testeditions.Entites.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findByPost(Post post);

}

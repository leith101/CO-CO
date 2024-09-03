package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post,Long>{
}

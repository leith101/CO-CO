package com.example.testeditions.Services;

import com.example.testeditions.Entites.Post;
import com.example.testeditions.Entites.StateLike;
import com.example.testeditions.Repositories.LikeeRepository;
import com.example.testeditions.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;


public interface LikeeService  {
     void attribuerLike(Long postId, Long userId);
     void attribuerdislike(Long postId, Long userId);
     void attribuerhaha(Long postId, Long userId);
     void attribuerlove(Long postId, Long userId);
     void supprimerLike(Long postId);
     boolean utilisateurAAttribueReac(Long postId, Long userId);
     StateLike getTypeReaction(Long postId, Long userId);
     Map<String, Integer> countReactionsForPost(Long postId);
     int countTotalReactionsForPost(Long postId);

}

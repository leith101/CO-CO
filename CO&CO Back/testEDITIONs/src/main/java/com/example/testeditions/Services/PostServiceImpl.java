package com.example.testeditions.Services;

import java.util.*;

import com.example.testeditions.Entites.Post;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.PostRepository;
import com.example.testeditions.Repositories.UserRepository;
import com.example.testeditions.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;



    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post getPostById(Long id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        return optionalPost.orElse(null);
    }
    @Override
    public List<String> getPostsWithUserInfo() {
        List<String> postsWithUserInfo = new ArrayList<>();
        List<Post> posts = postRepository.findAll();

        for (Post post : posts) {
            Optional<User> optionalUser = userRepository.findById(post.getUser().getId());
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                String postInfo = "Post ID: " + post.getIdPost() + ", Description: " + post.getDescriptionPost() +
                        ", User ID: " + user.getId() + ", User Name: " + user.getNom();
                postsWithUserInfo.add(postInfo);
            }
        }
        return postsWithUserInfo;
    }
    @Override
    public double getAveragePostsPerUser() {
        List<User> users = userRepository.findAll();
        Long totalPosts = getTotalNumberOfPosts();
        if (totalPosts == 0 || users.isEmpty()) {
            return 0; // Pour éviter une division par zéro ou si aucun utilisateur n'existe
        }
        return (double) totalPosts / users.size();
    }
    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Long id, Post post) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent()) {
            Post existingPost = optionalPost.get();
            existingPost.setDescriptionPost(post.getDescriptionPost());
            existingPost.setDatePost(post.getDatePost());
            existingPost.setUser(post.getUser());
            existingPost.setLikes(post.getLikes());
            existingPost.setComments(post.getComments());
            return postRepository.save(existingPost);
        } else {
            return null;
        }
    }
    @Override
    public Post addPostByUser(Long userId, Post post) {
        Optional<User> optionalUser = userRepository.findById(userId); // Récupérer l'utilisateur par son ID
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            post.setUser(user); // Attribuer le post à l'utilisateur récupéré
            return postRepository.save(post);
        } else {
            return null; // Gérer le cas où l'utilisateur n'existe pas
        }
    }
    @Override
    public long getTotalNumberOfPosts() {
        return postRepository.count();
    }
    @Override
    public Post getPostWithMostReactions() {
        List<Post> posts = postRepository.findAll();

        // Utiliser une comparaison personnalisée pour trier les posts en fonction du nombre de réactions
        Collections.sort(posts, Comparator.comparingInt(post -> post.getLikes().size() + post.getComments().size()));

        // Retourner le post avec le plus grand nombre de réactions
        return posts.isEmpty() ? null : posts.get(posts.size() - 1);
    }
    @Override
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
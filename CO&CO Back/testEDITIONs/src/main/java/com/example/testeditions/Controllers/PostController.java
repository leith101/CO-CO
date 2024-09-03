package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.Post;
import com.example.testeditions.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @PostMapping("/create")
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @PutMapping("/update/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody Post post) {
        return postService.updatePost(id, post);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
    @PostMapping("/users/{userId}")
    public ResponseEntity<Post> addPostByUser(@PathVariable("userId") Long userId, @RequestBody Post post) {
        Post createdPost = postService.addPostByUser(userId, post);
        if (createdPost != null) {
            return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/withUserInfo")
    public List<String> getPostsWithUserInfo() {
        return postService.getPostsWithUserInfo();
    }
    @GetMapping("/total")
    public ResponseEntity<Long> getTotalNumberOfPosts() {
        long totalNumberOfPosts = postService.getTotalNumberOfPosts();
        return new ResponseEntity<>(totalNumberOfPosts, HttpStatus.OK);
    }
    @GetMapping("/average-posts-per-user")
    public double getAveragePostsPerUser() {
        return postService.getAveragePostsPerUser();
    }
    @GetMapping("/most-reacted")
    public Post getPostWithMostReactions() {
        return postService.getPostWithMostReactions();
    }
}

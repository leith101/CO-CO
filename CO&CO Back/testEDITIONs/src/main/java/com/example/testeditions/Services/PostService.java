package com.example.testeditions.Services;


import com.example.testeditions.Entites.Post;

import java.util.List;
import java.util.Map;

public interface PostService {
    List<Post> getAllPosts();
    Post getPostById(Long id);
    Post createPost(Post post);
    Post updatePost(Long id, Post post);
    void deletePost(Long id);
    Post addPostByUser(Long userId, Post post);
    public List<String> getPostsWithUserInfo();
    public long getTotalNumberOfPosts();
    double getAveragePostsPerUser();
    public Post getPostWithMostReactions();
}

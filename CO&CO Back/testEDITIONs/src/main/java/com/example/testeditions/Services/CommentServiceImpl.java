package com.example.testeditions.Services;


import com.example.testeditions.Entites.Comment;
import com.example.testeditions.Entites.Post;
import com.example.testeditions.Repositories.CommentRepository;
import com.example.testeditions.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service

public class CommentServiceImpl implements CommentService{
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;
    @Override
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public Comment getCommentById(Long id) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        return optionalComment.orElse(null);
    }
    @Override
    public void ajouterCommentaireAUnePublication(Long idPost, Comment commentaire) {
        Optional<Post> optionalPost = postRepository.findById(idPost);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();

            commentaire.setDateComment(new Date());
            commentaire.setPost(post);

            commentRepository.save(commentaire);
        } else {
            // Gérer le cas où la publication n'est pas trouvée
        }
    }


    @Override
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public Comment updateComment(Long id, Comment comment) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (optionalComment.isPresent()) {
            Comment existingComment = optionalComment.get();
            existingComment.setDescription_comment(comment.getDescription_comment());
            existingComment.setDateComment(comment.getDateComment());
            existingComment.setPost(comment.getPost());
            existingComment.setResponseComments(comment.getResponseComments());
            return commentRepository.save(existingComment);
        } else {
            return null;
        }
    }
    @Override
    public List<Comment> afficherCommentParPost(Long idPost) {
        Optional<Post> optionalPost = postRepository.findById(idPost);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            return commentRepository.findByPost(post);
        } else {
            // Gérer le cas où la publication n'est pas trouvée
            return Collections.emptyList(); // Retourner une liste vide si la publication n'est pas trouvée
        }
    }


    @Override
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
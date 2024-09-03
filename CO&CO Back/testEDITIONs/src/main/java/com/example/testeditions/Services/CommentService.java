package com.example.testeditions.Services;

import com.example.testeditions.Entites.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getAllComments();
    Comment getCommentById(Long id);
    Comment createComment(Comment comment);
    Comment updateComment(Long id, Comment comment);
    void deleteComment(Long id);
    void ajouterCommentaireAUnePublication(Long idPost, Comment commentaire);
    List<Comment> afficherCommentParPost(Long idPost);
}
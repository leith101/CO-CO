package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.Comment;
import com.example.testeditions.Services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/{id}")
    public Comment getCommentById(@PathVariable Long id) {
        return commentService.getCommentById(id);
    }

    @PostMapping("/save")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.createComment(comment));
    }

    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable Long id, @RequestBody Comment comment) {
        return commentService.updateComment(id, comment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }

    @PostMapping("/{id}/commentpost")
    public ResponseEntity<?> ajouterCommentaireAUnePublication(@PathVariable("id") Long idPost,
                                                               @RequestBody Comment comment) {
        try {
            commentService.ajouterCommentaireAUnePublication(idPost,comment);
            return ResponseEntity.ok("Le commentaire a été ajouté avec succès à la publication.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur s'est produite lors de l'ajout du commentaire à la publication.");
        }
    }
    @GetMapping("/byPost/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable("postId") Long postId) {
        List<Comment> comments = commentService.afficherCommentParPost(postId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

}

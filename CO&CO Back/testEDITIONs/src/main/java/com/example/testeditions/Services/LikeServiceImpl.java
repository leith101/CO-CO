package com.example.testeditions.Services;

import com.example.testeditions.Entites.Likee;
import com.example.testeditions.Entites.Post;
import com.example.testeditions.Entites.StateLike;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.LikeeRepository;
import com.example.testeditions.Repositories.PostRepository;
import com.example.testeditions.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class LikeServiceImpl implements LikeeService{
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private LikeeRepository likeeRepository ;
    @Autowired
    private UserRepository userRepository;


    public void attribuerLike(Long postId, Long userId) {
        // Vérifier si l'utilisateur a déjà attribué une réaction "like" au post
        List<Likee> likees = likeeRepository.findByPostIdAndUserId(postId, userId);

        if (!likees.isEmpty()) {
            // Si une réaction "like" existe déjà, ne rien faire (ou mettre à jour l'état si nécessaire)
            Likee existingLike = likees.get(0);
            if (existingLike.getStateLike() != StateLike.like) {
                existingLike.setStateLike(StateLike.like);
                likeeRepository.save(existingLike); // Mettre à jour la réaction existante
            }
        } else {
            // Si l'utilisateur n'a pas encore réagi au post avec "like", créer une nouvelle réaction avec l'état "like"
            Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found with ID: " + postId));
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

            Likee likee = new Likee();
            likee.setPost(post);
            likee.setUser(user);
            likee.setStateLike(StateLike.like);

            // Enregistrer la nouvelle réaction dans le repository
            likeeRepository.save(likee);
        }
    }

    public void attribuerdislike(Long postId, Long userId) {
        // Vérifier si l'utilisateur a déjà attribué une réaction "dislike" au post
        List<Likee> likees = likeeRepository.findByPostIdAndUserId(postId, userId);

        if (!likees.isEmpty()) {
            // Si une réaction "dislike" existe déjà, ne rien faire (ou mettre à jour l'état si nécessaire)
            Likee existingLike = likees.get(0);
            if (existingLike.getStateLike() != StateLike.dislike) {
                existingLike.setStateLike(StateLike.dislike);
                likeeRepository.save(existingLike); // Mettre à jour la réaction existante
            }
        } else {
            // Si l'utilisateur n'a pas encore réagi au post avec "dislike", créer une nouvelle réaction avec l'état "dislike"
            Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found with ID: " + postId));
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

            Likee likee = new Likee();
            likee.setPost(post);
            likee.setUser(user);
            likee.setStateLike(StateLike.dislike);

            // Enregistrer la nouvelle réaction dans le repository
            likeeRepository.save(likee);
        }
    }

    public void attribuerhaha(Long postId, Long userId) {
        // Vérifier si l'utilisateur a déjà attribué une réaction "haha" au post
        List<Likee> likees = likeeRepository.findByPostIdAndUserId(postId, userId);

        if (!likees.isEmpty()) {
            // Si une réaction "haha" existe déjà, mettre à jour son état si nécessaire
            Likee existingLike = likees.get(0);
            if (existingLike.getStateLike() != StateLike.Haha) {
                existingLike.setStateLike(StateLike.Haha);
                likeeRepository.save(existingLike); // Mettre à jour la réaction existante
            }
        } else {
            // Si l'utilisateur n'a pas encore réagi au post avec "haha", créer une nouvelle réaction avec l'état "Haha"
            Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found with ID: " + postId));
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

            Likee likee = new Likee();
            likee.setPost(post);
            likee.setUser(user);
            likee.setStateLike(StateLike.Haha);

            // Enregistrer la nouvelle réaction dans le repository
            likeeRepository.save(likee);
        }
    }

    public void attribuerlove(Long postId, Long userId) {
        // Vérifier si l'utilisateur a déjà attribué une réaction au post
        List<Likee> likees = likeeRepository.findByPostIdAndUserId(postId, userId);

        if (!likees.isEmpty()) {
            // Si une réaction existe déjà, modifier son état pour "Love"
            Likee existingLike = likees.get(0);
            existingLike.setStateLike(StateLike.Love);
            likeeRepository.save(existingLike); // Mettre à jour la réaction existante
        } else {
            // Si l'utilisateur n'a pas encore réagi au post, créer une nouvelle réaction avec l'état "Love"
            Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found with ID: " + postId));
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

            Likee likee = new Likee();
            likee.setPost(post);
            likee.setUser(user);
            likee.setStateLike(StateLike.Love);

            // Enregistrer la nouvelle réaction dans le repository
            likeeRepository.save(likee);
        }
    }


    public boolean utilisateurAAttribueReac(Long postId, Long userId) {
        // Vérifier si le like existe pour le post et l'utilisateur spécifiés
        List<Likee> likees = likeeRepository.findByPostIdAndUserId(postId, userId);
        return !likees.isEmpty(); // Retourner true si un like existe, sinon false
    }
    public void supprimerLike(Long postId) {
        // Rechercher le like pour le post spécifique
        Likee likee = likeeRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Like not found for Post ID: " + postId));

        // Supprimer le like du repository
        likeeRepository.delete(likee);
    }
    public StateLike getTypeReaction(Long postId, Long userId) {
        // Rechercher la réaction pour la publication spécifique et l'utilisateur spécifié
        List<Likee> likees = likeeRepository.findByPostIdAndUserId(postId, userId);

        if (!likees.isEmpty()) {
            // Si une réaction existe, renvoyer son type
            return likees.get(0).getStateLike();
        } else {
            // Si aucune réaction n'existe, renvoyer null ou une valeur par défaut selon le besoin
            return null;
        }
    }
    public Map<String, Integer> countReactionsForPost(Long postId) {
        Map<String, Integer> reactionCounts = new HashMap<>();

        // Récupérer toutes les réactions pour le post spécifié
        List<Likee> likees = likeeRepository.findByPostId(postId);

        // Initialiser les compteurs pour chaque type de réaction
        int likeCount = 0;
        int dislikeCount = 0;
        int loveCount = 0;
        int hahaCount = 0;

        // Parcourir chaque réaction pour le post
        for (Likee likee : likees) {
            switch (likee.getStateLike()) {
                case like:
                    likeCount++;
                    break;
                case dislike:
                    dislikeCount++;
                    break;
                case Love:
                    loveCount++;
                    break;
                case Haha:
                    hahaCount++;
                    break;
                default:
                    // Ignorer les autres types de réactions (le cas échéant)
                    break;
            }
        }

        // Ajouter les compteurs au map
        reactionCounts.put("Like", likeCount);
        reactionCounts.put("Dislike", dislikeCount);
        reactionCounts.put("Love", loveCount);
        reactionCounts.put("Haha", hahaCount);

        return reactionCounts;
    }
    public int countTotalReactionsForPost(Long postId) {
        // Récupérer toutes les réactions pour le post spécifié
        List<Likee> likees = likeeRepository.findByPostId(postId);

        // Initialiser le compteur de réactions
        int totalReactions = 0;

        // Parcourir chaque réaction pour le post
        for (Likee likee : likees) {
            // Incrémenter le compteur total de réactions
            totalReactions++;
        }

        return totalReactions;
    }




}
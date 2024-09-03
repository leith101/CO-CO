package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.Product;
import com.example.testeditions.Services.ProductImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.Random;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/product")
public class ProductController {


    @Autowired
    private ProductImpl productService;

    @Value("${image.upload.directory:C:\\Users\\21655\\Desktop\\projet\\Front\\src\\assets\\images}")
    private String UPLOAD_FOLDER;



    @GetMapping("/")
    public List<Product> getAll() {

        List<Product> products = productService.getProducts();

        // Sort products by price in descending order using Comparator
        products.sort(Comparator.comparing(Product::getPrix).reversed());

        return products;
    }

    @GetMapping("/asc")
    public List<Product> getAllAsc() {

        List<Product> products = productService.getProducts();

        // Sort products by price in descending order using Comparator
        products.sort(Comparator.comparing(Product::getPrix));

        return products;
    }


    @PostMapping("/")
    public Product Ajouter(@RequestParam("file") MultipartFile file,
                           @RequestParam("prix") Integer prix,
                           @RequestParam("description") String description,
                           @RequestParam("nom") String nom) {
        Product article = new Product();
        article.setPrix(prix);
        article.setDescription(description);
        article.setNom(nom);

        if (!file.isEmpty()) {
            String filePath = saveFile(file);
            article.setImage(filePath);
        }


        return productService.AjouterProduct(article);
    }

    @DeleteMapping("/{id}")
    public String Supprimer( @PathVariable("id") Long id ){
        productService.SupprimerProduct(id);
        return null;

    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable("id") Long id) {
        return productService.getProductById(id);
    }
    private String saveFile(MultipartFile file) {
        try {
            Random random = new Random();
            int randomNumber = random.nextInt(10000); // Change this
            String originalFileName = file.getOriginalFilename();
            int dotIndex = originalFileName.lastIndexOf('.');
            String newFileName = originalFileName.substring(0, dotIndex) + "_" + randomNumber + originalFileName.substring(dotIndex);
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOAD_FOLDER, newFileName);
            file.transferTo(path.toFile());
            return newFileName;
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception
            return null;
        }
    }

    @GetMapping("/count")
    public long getCount() {
        return productService.count();
    }


}
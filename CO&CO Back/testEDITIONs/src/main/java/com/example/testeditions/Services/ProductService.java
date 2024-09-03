package com.example.testeditions.Services;

import com.example.testeditions.Entites.Product;
import com.example.testeditions.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements ProductImpl{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product AjouterProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product ModifierProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public String SupprimerProduct(Long id) {
        productRepository.deleteById(id);
        return "Product supprimé";
    }

    @Override
    public Product getProduct(Long id) {
        return null;
    }



    @Override
    public Product getProductById(Long id) {
        Optional<Product> Product = productRepository.findById(id);
        return Product.orElse(null);
    }

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    public long count(){
        return productRepository.count();
    }

}

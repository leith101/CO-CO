package com.example.testeditions.Services;

import com.example.testeditions.Entites.Product;

import java.util.List;

public interface ProductImpl {

    public Product AjouterProduct(Product product);
    public Product ModifierProduct(Product product);
    public String SupprimerProduct(Long id);
    public Product getProduct(Long id);

    Product getProductById(Long id);

    public List<Product> getProducts();
    long count();

}
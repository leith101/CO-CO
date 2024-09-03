import { Component } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  newProduct: any = {
    prix: null,
    description: '',
    nom: '',
    image: ''
  };

  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts()
      .subscribe(products => this.products = products);
  }

  addProduct(): void {
    const formData: FormData = new FormData();
    formData.append('file', this.newProduct.image);
    formData.append('prix', this.newProduct.prix.toString());
    formData.append('description', this.newProduct.description);
    formData.append('nom', this.newProduct.nom);

    this.productService.addProduct(formData)
      .subscribe(newProduct => {
        console.log('Product added successfully:', newProduct);
        this.products.push(newProduct); // Add new product to the list
        this.resetForm();
        
      });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id)
      .subscribe(() => {
        console.log('Product deleted successfully');
        this.products = this.products.filter(product => product.id !== id); // Remove deleted product from the list
      });
  }

  getImageUrl(imageName: string): string {
    return `assets/images/${imageName}`;
  }

  onFileSelected(event : any): void {
    const file: File = event.target.files[0];
    this.newProduct.image = file;
  }

  resetForm(): void {
    this.newProduct = {
      prix: null,
      description: '',
      nom: '',
      image: ''
    };
  }

}

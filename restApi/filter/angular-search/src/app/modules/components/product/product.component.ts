import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(productData => {
      this.products = productData;
      console.log(this.products);
    });
  }

}

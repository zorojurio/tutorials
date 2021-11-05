import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(productData => {
      this.products = productData;
      console.log(this.products);
    });
  }

}

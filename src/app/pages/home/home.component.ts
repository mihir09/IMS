import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  featuredproducts$: any[] = [];
  bestSellerProduct$: any[] = [];

  constructor(private productService: ProductsService) {}
  
  ngOnInit(): void {
    this.productService.loadFeaturedProducts().subscribe((products: any[]) => {
      this.featuredproducts$ = products;
    }, (error) => {
      console.error('Error loading featured products:', error);
    });

    this.productService.loadBestSellerProducts().subscribe((products: any[]) => {
      this.bestSellerProduct$ = products;
    }, (error) => {
      console.error('Error loading best seller products:', error);
    });
  }
}

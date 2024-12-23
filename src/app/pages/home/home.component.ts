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
  carouselSlides = [
    {
      image: 'assets/images/banner1.jpg',
      title: 'Biggest Sale of the Season!',
      description: 'Up to 50% off on selected items.',
    },
    {
      image: 'assets/images/banner2.jpg',
      title: 'New Arrivals',
      description: 'Explore the latest trends.',
    },
    {
      image: 'assets/images/banner3.jpg',
      title: 'Exclusive Deals',
      description: 'Limited time offers just for you!',
    }
  ];

  constructor(private productService: ProductsService) { }

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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-selected-category',
  templateUrl: './selected-category.component.html',
  styleUrls: ['./selected-category.component.css']
})
export class SelectedCategoryComponent implements OnInit {
  products$: any[] = [];
  filteredProducts: any[] = [];
  categoryObj: any;
  searchText: string = '';

  constructor(private route: ActivatedRoute, private productService: ProductsService){}

  ngOnInit(): void{
    this.route.params.subscribe(val=>{
      this.categoryObj = val;
      this.productService.loadCategoryProducts(val['id']).subscribe((products: any[]) => {
        this.products$ = products;
        this.filteredProducts = [...products]; // Initialize filteredProducts
      }, (error) => {
        console.error('Error loading products:', error);
      });
    });
  }

  searchProducts(): void {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredProducts = this.products$.filter(product => {
      const matchName = product.data.name && product.data.name.toLowerCase().includes(searchTextLower);
      const matchDescription = product.data.description && product.data.description.toLowerCase().includes(searchTextLower);
      const matchPrice = product.data.price && product.data.price.toString().includes(searchTextLower);
      return matchName || matchDescription || matchPrice;
    });
  }

  clearSearch(): void {
    this.searchText = '';
    this.filteredProducts = [...this.products$];
  }
  
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-selected-product',
  templateUrl: './selected-product.component.html',
  styleUrls: ['./selected-product.component.css']
})
export class SelectedProductComponent implements OnInit {
  productData$: any;
  similarProducts$: any[] = [];
  @ViewChild('productSection') productSection!: ElementRef;

  constructor(private route: ActivatedRoute, private productService: ProductsService){}
  
  ngOnInit(): void {
    
    this.route.params.subscribe(val=>{
      this.productService.loadOneProduct(val['id']).subscribe((product: any)=>{
        console.log(product)
        this.productData$ = product;
        this.scrollToProduct();
        this.loadSimilar(this.productData$.data.category.categoryId)
        
      })
    })
  }
  scrollToProduct() {
    window.scrollTo(0, 0);
  }

  loadSimilar(categoryId:any){
    this.productService.loadSimilarProducts(categoryId).subscribe((products: any[])=>{
      console.log(products)
      this.similarProducts$ = products;
    })
  }
}

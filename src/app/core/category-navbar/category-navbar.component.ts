import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

interface Category {
  id: string;
  data: {
    category: string;
  };
}

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {
  categories$: Category[] = [];

  constructor(private categoriesService: CategoriesService, private router: Router) {}

  ngOnInit(): void {

    this.categoriesService.loadCategory().subscribe((categories: any[]) => {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      // Mapping the received categories to Category interface
      this.categories$ = categories.map(item => ({ id: item.id, data: { category: item.data.category } }));
      this.categories$ = this.sortCategories(this.categories$);
      
    }, (error) => {
      console.error('Error loading categories:', error);
    });
  }

  private sortCategories(categories: Category[]): Category[] {
    const preferredOrder: { [key: string]: number } = {
      'Liquor': 1,
      'Beer': 2,
      'Soda': 3,
      'Snacks': 4
    };

    return categories.sort((a, b) => {
      const orderA = preferredOrder[a.data.category] ?? Infinity;
      const orderB = preferredOrder[b.data.category] ?? Infinity;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return a.data.category.localeCompare(b.data.category);
    });
  }
}

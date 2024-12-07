import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SelectedCategoryComponent } from './pages/selected-category/selected-category.component';
import { SelectedProductComponent } from './pages/selected-product/selected-product.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'category/:category/:id', component: SelectedCategoryComponent},
  {path: 'product/:id', component: SelectedProductComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactUsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

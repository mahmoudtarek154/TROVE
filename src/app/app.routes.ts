import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/catr.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:'home' ,pathMatch:'full'},

    {path:'home' , component:HomeComponent,title:'Home',canActivate:[authGuard]},
    {path:'cart' , component:CartComponent,title:'Cart',canActivate:[authGuard]},
    {path:'products' , component:ProductsComponent,title:'Products',canActivate:[authGuard]},
    {path:'categories' , component:CategoriesComponent,title:'Categories',canActivate:[authGuard]},
    {path:'brands' , component:BrandsComponent,title:'Brands',canActivate:[authGuard]},

    {path:'login' , component:LoginComponent,title:'Login'},
    {path:'register' , component:RegisterComponent,title:'Register'},

    {path:'**' , component:NotfoundComponent,title:'Not found'},
];

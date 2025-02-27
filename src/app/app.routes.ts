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
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DetailsComponent } from './pages/details/details/details.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword/forgotpassword.component';
import { AllordersComponent } from './pages/allorders/allorders/allorders.component';
import { WishlistComponent } from './pages/wishlist/wishlist/wishlist.component';

export const routes: Routes = [
    {path:'', redirectTo:'home' ,pathMatch:'full'},

    {path:'home' , component:HomeComponent,title:'Home',canActivate:[authGuard]},
    {path:'cart' , component:CartComponent,title:'Cart',canActivate:[authGuard]},
    {path:'products' , component:ProductsComponent,title:'Products',canActivate:[authGuard]},
    {path:'allorders' , component:AllordersComponent,title:'all orders',canActivate:[authGuard]},
    {path:'categories' , component:CategoriesComponent,title:'Categories',canActivate:[authGuard]},
    {path:'details/:id' , component:DetailsComponent,title:'Product details',canActivate:[authGuard]},
    {path:'brands' , component:BrandsComponent,title:'Brands',canActivate:[authGuard]},
    {path:'checkout/:id' , component:CheckoutComponent,title:'checkout',canActivate:[authGuard]},
    {path:'wishlist' , component:WishlistComponent,title:'Wish List',canActivate:[authGuard]},

    {path:'login' , component:LoginComponent,title:'Login'},
    {path:'forgot' , component:ForgotpasswordComponent,title:'forgot Password'},
    {path:'register' , component:RegisterComponent,title:'Register'},

    {path:'**' , component:NotfoundComponent,title:'Not found'},
];

import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from './../../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../../shared/interfaces/wishlist';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [TranslatePipe],

  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  wishList: IWishlist[] = [];
  

  getWishlistData(): void {
    this.wishlistService.getLoggedWishList().subscribe({
      next: (res) => {
        this.wishList = res.data;
      },
    });
  }

  removeItemFromWishlist(id: string): void {
    this.wishlistService.removeItemFromWishlist(id).subscribe({
      next: (res) => {
        this.wishList = this.wishList.filter(item => item._id !== id);
        this.toastrService.show('Product Remove Successfully From Your Wishlist', 'Trove!');

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getWishlistData();
  }
}

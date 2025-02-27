import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RegisrtationService } from './../../core/services/auth/regisrtation.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate/mytranslate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private regisrtationService = inject(RegisrtationService);
  private mytranslateService = inject(MytranslateService);
  router = inject(Router);
  islogin: boolean = true;

  ngOnInit(): void {
    this.regisrtationService.userdata.subscribe((userData) => {
      console.log({ userData });
      if (this.regisrtationService.userdata.getValue() == null) {
        this.islogin = false;
      } else {
        this.islogin = true;
      }
    });
  }

  logout() {
    localStorage.removeItem('usertoken');
    this.router.navigate(['/login']);
    this.regisrtationService.userdata.next(null);
  }

  changeLangaugeByHtml(lang: string): void {
    this.mytranslateService.changeLangauge(lang);
  }
}

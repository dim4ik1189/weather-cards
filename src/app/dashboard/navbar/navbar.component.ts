import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  username: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;

    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.username = user.username;
    }
  }

  public signOut(): void {
    this.authService.signOut();
  }

}

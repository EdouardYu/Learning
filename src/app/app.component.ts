import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  auth: AuthService;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.auth = this.authService;
  }

  goToPokemonList() {
    this.router.navigate(['pokemons']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.auth.logout();
  }
}

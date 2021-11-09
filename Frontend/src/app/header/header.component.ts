import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  title: string = 'App Angular'
  

  constructor(public authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  logout():void{
    this.authService.logout();
    Swal.fire({
      icon: 'success',
      title: `Exito!! `,
      text: ` Has cerrado seccion!!`
    });
    this.router.navigate(['/login'])
  }

}

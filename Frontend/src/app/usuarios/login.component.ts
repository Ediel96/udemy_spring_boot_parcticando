import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo : string = 'por favor hacer Login';
  loginForm: FormGroup;
  submitted = false;
  usuario : Usuario

  constructor(private formBuilder: FormBuilder, private authServ : AuthService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    

    if(this.authServ.isAuthenticated()){
      Swal.fire({
        icon: 'info',
        title: `Hola `,
        text: `${this.authServ.usuario.username}, has iniciando sesion con exito`
      })
      this.router.navigate(['/clientes'])
    }

  }

  get f() { return this.loginForm.controls; }

  onSubmit():void{
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }


    this.authServ.login(this.loginForm.value).subscribe(response => {

      this.authServ.guardarUsuario(response.access_token);
      this.authServ.guardarToken(response.access_token);
      let usuario = this.authServ.usuario;

      console.log('ususrios' , usuario)
      this.router.navigate(['/clientes']);
      Swal.fire({
        icon: 'success',
        title: `Hola `,
        text: `${usuario.nombre}, has iniciando sesion con exito`
      })
    }, err =>{
      if(err.status == 400){
        Swal.fire({
          icon: 'error',
          title: `Error Login `,
          text: ` Usuario o clave incorrecta`
        })
      }
    })

  }


  onReset():void{

    this.submitted = false;
    
    this.loginForm.reset();

    
    
  }

}

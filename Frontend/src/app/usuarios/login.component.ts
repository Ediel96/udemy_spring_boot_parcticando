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

  }

  get f() { return this.loginForm.controls; }

  onSubmit():void{
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }

    console.log(this.loginForm.value);

    this.authServ.login(this.loginForm.value).subscribe(response => {

      let payload = JSON.parse(atob(response.access_token.split(".")[1]))

      // this.authServ.guardarUsuario()
      // this.authServ.guardarToken()

      // console.log('response : ',response)
      this.router.navigate(['/clientes']);
      Swal.fire({
        icon: 'success',
        title: `Hola `,
        text: `${response.nombre}, has iniciando sesion con exito`
      })
    })

  }


  onReset():void{

    this.submitted = false;
    
    this.loginForm.reset();

    
    
  }

}

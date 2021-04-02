import { ClienteService } from './cliente.service';
import { Cliente } from './clientes';
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  errores : string[]; 
  registerForm: FormGroup;
  submitted = false;
  cliente : Cliente = new Cliente();



  constructor(private formBuilder: FormBuilder, private ClienteService : ClienteService,
    private router : Router, private activatedRoute : ActivatedRoute) { }


  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          nombre: ['', Validators.required],
          apellido: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          createAt: ['', [Validators.required]],
      });

      this.cargarCliente();
  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.ClienteService.getCliente(id).subscribe((cliente)=> this.cliente = cliente)
      }
    })
  }

  updateCliente():void{
    this.ClienteService.updateCliente(this.cliente)
    .subscribe( res =>{
      this.router.navigate(['/clientes'])
      console.log(res)
      swal.fire('Cliente Actualizado', `Cliente ${res.nombre} actualizado con exito!`  , 'success');
      },err =>{
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }

      this.ClienteService.create(this.registerForm.value).subscribe(
        res =>{
          this.router.navigate(['/clientes'])
          swal.fire('Nuevo cliente', `Cliente ${res.nombre} creado con exito!`  , 'success');
        },err =>{
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
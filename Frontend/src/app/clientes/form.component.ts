import { ClienteService } from './cliente.service';
import { Cliente } from './clientes';
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from './region';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  errores : string[];
  registerForm: FormGroup;
  submitted = false;
  cliente : Cliente = new Cliente();
  regiones : Region[];



  constructor(private formBuilder: FormBuilder, private ClienteService : ClienteService,
    private router : Router, private activatedRoute : ActivatedRoute) { }


  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          nombre: ['', Validators.required],
          apellido: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          createAt: ['', [Validators.required]],
          region: ['', Validators.required],
      });

      this.cargarCliente();

      this.ClienteService.getRegiones().subscribe(regiones => this.regiones  = regiones);
  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.ClienteService.getCliente(id).subscribe(
          (cliente)=> this.cliente = cliente
        )
      }
    })
  }

  updateCliente():void{
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }
    this.registerForm.value.id = this.cliente.id;
    this.cliente = this.registerForm.value;
    // this.cliente.push(id)
    this.ClienteService.updateCliente(this.cliente)
    .subscribe( res =>{
      this.router.navigate(['/clientes'])
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

  compararRegion( o1: Region, o2: Region):boolean {
    return o1 === null || o2 === null? false: o1.id === o2.id;
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}

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
    .subscribe( cliente =>{
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actulizado', `Cliente ${cliente.nombre} actualizado con exito!`  , 'success');
    }
    )
  }




  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      console.log(this.registerForm.value);
      this.ClienteService.create(this.registerForm.value).subscribe(
        cliente =>{
          this.router.navigate(['clientes']);
          swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con exito!`  , 'success');
        }
      )
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

}

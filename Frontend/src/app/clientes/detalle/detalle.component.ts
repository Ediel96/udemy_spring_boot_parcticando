import { Cliente } from './../clientes';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {

  cliente : Cliente;
  titulo : string = "Detalle del cliente";
  private fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id:number = params['id'];

      if(id){
        this.clienteService.getCliente(id).subscribe(
          (cliente)=> this.cliente = cliente
        )
      }
    });
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada)
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire({
        icon:'error',
        title:'Error seleccionar image: ',
        text:'El archivo debe ser del tipo imagen'
      })
        this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      Swal.fire({
        icon: 'error',
        title:'Error Upload',
        text:  'Debe seleccionar una foto'
      })
      }else{
        this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(event => {
          if(event.type === HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded/event.total)*100);
          }else if(event.type === HttpEventType.Response){
            let response : any = event.body;
            this.cliente = response.cliente as Cliente;
            Swal.fire({
              icon: 'success',
              title: 'good',
              text: `la foto se ha subido con exito: ${response.mensaje}`
            })
          }
        });
      }
    }
}

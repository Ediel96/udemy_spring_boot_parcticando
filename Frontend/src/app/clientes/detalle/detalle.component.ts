import { Cliente } from './../clientes';
import { Component, Input, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService}  from'./modal.service'


@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']

})
export class DetalleComponent implements OnInit {

  @Input() cliente : Cliente;
  titulo : string = "Detalle del cliente";
  private fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private clienteService: ClienteService, public modalService : ModalService) { }

  ngOnInit() {
    // yo traia la informacion del cliente con el id pero con params de router

    /*
    this.activatedRoute.params.subscribe(params => {
      let id:number = params['id'];

      if(id){
        this.clienteService.getCliente(id).subscribe(
          (cliente)=> this.cliente = cliente
        )
      }
    });*/
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

            this.modalService.notificarUpload.emit(this.cliente);
            Swal.fire({
              icon: 'success',
              title: 'good',
              text: `la foto se ha subido con exito: ${response.mensaje}`
            })
          }
        });
      }
    }

    cerrarModal(){
      this.modalService.cerrarModal();
      this.fotoSeleccionada = null;
      this.progreso = 0;
    }
}

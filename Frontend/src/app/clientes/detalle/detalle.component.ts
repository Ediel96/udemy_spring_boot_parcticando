import { Cliente } from './../clientes';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {

  cliente : Cliente;
  titulo : string = "Detalle del cliente";
  private fotoSelecinada: File;

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
    this.fotoSelecinada = event.target.files[0];
    console.log(this.fotoSelecinada)
  }

  subirFoto(){

    if(!this.fotoSelecinada){
      Swal.fire({
        icon: 'error',
        title:'Error Upload',
        text:  'Debe seleccionar una foto'
      })
    }

    this.clienteService.subirFoto(this.fotoSelecinada, this.cliente.id)
      .subscribe(cliente => {
        this.cliente = cliente;
        Swal.fire({
          icon: 'success',
          title: 'good',
          text: `la foto se ha subido con exito: ${this.cliente.foto}`
        })
      });
    }

}

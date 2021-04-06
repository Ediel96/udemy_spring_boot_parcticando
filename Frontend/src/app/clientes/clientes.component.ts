import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Cliente } from './clientes';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import {ModalService} from './detalle/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any ;
  clienteSelecionado : Cliente;

  constructor(private clienteService: ClienteService,
    private activeRouter : ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      let page = params['page'];

      if(!page){ page = 0; }

      console.log(page)
      this.clienteService.getClientes(page)
      .pipe(
        tap(response => {
          (response.content as Cliente[]).forEach(cliente => {
            console.log('CLintes',cliente)
          })
        })
      ).subscribe(response => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;
        console.log(this.paginador)
      });
    })

  }

  delete(cliente: Cliente):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter( cli => cli !== cliente)
            console.log(this.clientes)
          }
        )

        swalWithBootstrapButtons.fire(
          'Cliente Eliminado!!',
          `El cliente ${cliente.nombre} eliminado con exito!.`,
          'success'
        )
      }
    })
  }

  abrirModal(cliente: Cliente){
      this.clienteSelecionado = cliente;
      this.modalService.abrilModal();
  }

}

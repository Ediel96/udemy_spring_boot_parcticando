import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';

import { Cliente } from './clientes';
import {Region} from './region';


import { Observable, throwError, of } from 'rxjs';
import { HttpClient,  HttpEvent,  HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpheader = new HttpHeaders ({'Content-type' : 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }


  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones')
  }

  getClientes(page : number): Observable<any> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint + '/pages/' + page).pipe(
      tap( (response : any) => {
        (response.content  as Cliente[]).forEach(cliente => {
        })
      }),
      map((response : any) =>{
        (response.content as  Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // let datePipe = new DatePipe('es');
          //'EEEE dd, MM yyyy' === Sunday 28, 03 2021
          // cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MM yyyy')
          //cliente.createAt =  formatDate(cliente,createAt, 'dd-MM-yyyy', 'es')
          return cliente;
        });
        return response;
      } ),
    );
  }

  create(cliente:  Cliente ) : Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpheader}).pipe(
      map((response : any) => response.cliente as Cliente),
      catchError(e => {
        if(e.status === 400){
          return throwError(e);
        }

        console.error(console.error(e.error.mensaje));
        Swal.fire('Error al crear el cliente',e.error.mensaje , 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.error.mensaje
        })
        return throwError(e)
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpheader}).pipe(
      map((response : any) => response.cliente as Cliente),
      catchError(e => {
        if(e.status === 400){
          return throwError(e);
        }
        console.error(console.error(e.error.mensaje));
        Swal.fire('Error al editar el cliente',e.error.mensaje , 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number) : Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpheader}).pipe(
      catchError(e => {
        console.error(console.error(e.error.mensaje));
        Swal.fire('Error al eliminar el cliente el cliente',e.error.mensaje , 'error');
        return throwError(e);
      })
    );
  }

  subirFoto( archivo : File, id): Observable<HttpEvent<{}>> {
    let formdata = new FormData();
    formdata.append("archivo", archivo);
    formdata.append("id", id);

    const req = new HttpRequest('POST' , `${this.urlEndPoint}/upload`, formdata,{
      reportProgress: true
    });

    return this.http.request(req);
  }

}

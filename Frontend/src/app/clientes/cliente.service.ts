import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './clientes';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpheader = new HttpHeaders ({'Content-type' : 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Cliente[])
    );
  }

  create(cliente:  Cliente ) : Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpheader}).pipe(
      catchError(e => {
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
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpheader}).pipe(
      catchError(e => {
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

}

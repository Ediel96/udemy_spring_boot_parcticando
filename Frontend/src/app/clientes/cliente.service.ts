import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './clientes';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpheader = new HttpHeaders ({'Content-type' : 'application/json'});

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Cliente[])
    );
  }

  create(cliente:  Cliente ) : Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpheader});
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  updateCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpheader})
  }

  delete(id: number) : Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpheader})
  }

}

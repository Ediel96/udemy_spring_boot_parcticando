import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 
import {Usuario} from './usuario';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _usuario: Usuario;
  private _token: string;

  constructor(private http : HttpClient) { }

  login(usuario: Usuario): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  guardarUsuario(accessToken : string):void{
    this._usuario = new Usuario();
    this._usuario.nombre
  }

  guardarToken(accessToken : string):void{
    this._token
  }

  obtenerDatosToken(accessToken : string):any{
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]))
    }
    return null;
  }
}

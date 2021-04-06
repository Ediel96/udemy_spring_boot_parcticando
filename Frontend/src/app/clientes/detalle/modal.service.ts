import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  abrilModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal= false;
  }

}

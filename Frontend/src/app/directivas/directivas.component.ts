import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directivas',
  templateUrl: './directivas.component.html',
  styleUrls: ['./directivas.component.css']
})
export class DirectivasComponent implements OnInit {


  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];

  habilitar: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  setHabilitar(): void {
    this.habilitar = (this.habilitar==true)? false: true;
  }

}

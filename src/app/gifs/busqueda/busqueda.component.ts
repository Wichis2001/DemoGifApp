import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {
  //!Colocar nombre elemento a buscar(HTML elements o clases)
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar():void{
    const valor= this.txtBuscar.nativeElement.value;
    if( valor.trim().length === 0){
      return;
    }
    this.gifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';
  }

  constructor(private gifsService: GifsService){}
}

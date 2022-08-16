import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

//!Permite que los servicios puedan estar definidos sin importar en la parte de la aplicación donde está
@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey     : string = 'oFLlLbAhWGirBxIPd5nyIWSOKAOArhVi';
  private _historial : string[] = [];
  private servicioURL: string = 'https://api.giphy.com/v1/gifs';

  //TODO: CAMBIAR ANY POR EL TIPO CORRESPONDIENTE
  //?Tomar en cuenta que el tipo obtenido es gracias a que se emmpleo una interfzaz
  public resultados: Gif[]= []

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

   }

  buscarGifs( query: string = ''){

    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift( query );
      localStorage.setItem('historial', JSON.stringify(this._historial))
      this._historial = this._historial.splice(0, 10);
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);


    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, { params })
          .subscribe( ( resp ) =>{
            this.resultados = resp.data;
            localStorage.setItem('resultados', JSON.stringify(this.resultados));
          });
  }

}

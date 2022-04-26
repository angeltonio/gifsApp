import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'T5GdUX32bFQ1PbDxGCfdCSxVybG3O7J8';
  private _historial: string []=[];
  
  public resultados: Gif[]=[];

  get historial() {
   
    return [...this._historial];
  }

  constructor(private http: HttpClient){}
 
  buscarGifs(query: string) {
     query= query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }
      
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=T5GdUX32bFQ1PbDxGCfdCSxVybG3O7J8&q=${query}&limit=10`)
    .subscribe((resp)=>{
    this.resultados=resp.data;
  
  })
    
    

  }

} 

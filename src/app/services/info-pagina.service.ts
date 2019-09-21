import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info:InfoPagina={};
  equipo:any[];
  
  cargada=false;
  constructor(private http:HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    console.log('Servicio de info pagina cargado');
    //leer el archivo Json
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp:InfoPagina)=>{
        //console.log(resp);
        //console.log(resp["facebook"]);
        this.cargada=true;
        this.info=resp;
      });
  }

  private cargarEquipo(){
    this.http.get('https://angular-html-9e01f.firebaseio.com/equipo.json')
      .subscribe((resp:any[])=>{
        this.equipo=resp
      });
  }
  


}

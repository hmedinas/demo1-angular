import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { reject } from 'q';
import { resource } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos:Producto [];
  cargando=true;
  arregloFiltrado:Producto[];

  constructor( private http: HttpClient) {
    this.productos=[];
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise((resolve,reject)=>{
      this.http.get('https://angular-html-9e01f.firebaseio.com/productos_idx.json')
      .subscribe((resp:Producto[])=>{
          console.log(resp);
          this.productos=resp;
          this.cargando=false;
          resolve();
      });
    });
  }
  getProducto(id:string){
    return this.http.get(`https://angular-html-9e01f.firebaseio.com/productos/${id}.json`);
  }
  
  buscarProducto(termino:string){
   
    if(this.productos.length===0){
      this.cargarProductos().then(()=>{
        this.filtarProducto(termino);
      });
    }
    else{
        this.filtarProducto(termino);
    }
  }
  private filtarProducto(termino:string){
    
    this.arregloFiltrado=[];
    termino=termino.toLocaleLowerCase();

    this.productos.forEach(prod=>{
      const tituloLowe=prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino)>0 || tituloLowe.indexOf(termino)>0){
        this.arregloFiltrado.push(prod);
      }
    });
   
  }
}

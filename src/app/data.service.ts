  import { Injectable } from '@angular/core';
  import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
  import { throwError } from 'rxjs'
  import { retry, catchError,tap } from 'rxjs/operators'
  import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //atributos de la clase:
  private API_REST_SERVER = 'http://localhost:3000/products';
  public first: string= "";
  public prev: string= "";
  public next: string= "";
  public last: string= "";

  //Constructor de la clase.
  constructor( private http:HttpClient ) { }

  //parseLinkHeader
  parseLinkHeader(header) {
    if(header.length == 0) return

    let parts = header.split(',');
    var links = {};

    parts.forEach(element => {
      let section = element.split(';');
      var url = section[0].replace(/<(.*)>/,'$1').trim();
      var name= section[1].replace(/rel="(.*)"/, '$1').trim()
      links[name]= url;
    });

    this.first=links["first"];
    this.last=links["last"];
    this.prev=links["prev"];
    this.next= links["next"];

  }

  //HandleError -> gestionando posibles errores del http module
  handleError(error:HttpErrorResponse){
    let errorMessage = 'Unknow Error!';

    if(error.error instanceof ErrorEvent){
      //Errores del Cliente
      errorMessage= `Error: ${error.error.message}`;
    }else{
      //Errores del Servidor
      errorMessage= `Error Code: ${error.status}\n Message: ${error.message}`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }

    /////// Metodo con url Harcodeada \\\\\\\\

  public sendGetReq = () => {
    return this.http.get<Product>(this.API_REST_SERVER,{ params : new HttpParams({ fromString: '_page=1&_limit=20'}), observe: "response" }).pipe(retry(3),catchError(this.handleError),tap(res=>{ 
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('link'));
     }))
  }

  public sendGetReqToURL = (url: string) => {
    return this.http.get<Product>(url,{ observe: "response" }).pipe(retry(3),catchError(this.handleError),tap(res=>{ 
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('link'));
     }))
  }
}

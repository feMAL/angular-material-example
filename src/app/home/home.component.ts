import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http'
import { DataService } from '../data.service'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { Product } from '../product'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  products: Product[] = [] ;
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.sendGetReq().pipe(takeUntil(this.destroy$)).subscribe((res:HttpResponse<any>)=>{
      console.log(res);
      this.products = res.body;
    })
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    //UNSUSCRIBE from the subject
    this.destroy$.unsubscribe();
  }

  public firstPage(){
    this.products = [];
    this.dataService.sendGetReqToURL(this.dataService.first).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{
      console.log(res)
      this.products = res.body;
    })
  }
  
  public previousPage(){
    this.products = [];
    if(this.dataService.prev !== undefined && this.dataService.prev !== ''){
      this.dataService.sendGetReqToURL(this.dataService.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{
        console.log(res);
        this.products = res.body;
      })
    }
  }
  
  public nextPage(){
    this.products = [];
    if(this.dataService.next !== undefined && this.dataService.next !== ''){
      this.dataService.sendGetReqToURL(this.dataService.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{
        console.log(res);
        this.products = res.body;
      })
    }
  }
    
  public lastPage(){
    this.products = [];
    this.dataService.sendGetReqToURL(this.dataService.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{
      console.log(res)
      this.products = res.body;
    })
  }

}

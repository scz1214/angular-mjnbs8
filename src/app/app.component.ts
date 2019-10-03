import { Component } from '@angular/core';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public uBike: Array<YoubikeStation> = new Array<YoubikeStation>();

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getUbikeData().subscribe(
      (response: any) => {
        this.uBike = response.result.records,
          console.log(this.uBike);
      },
      (error: HttpErrorResponse) => this.HandleError(error)
    );
  }
  name = 'Angular';
  public httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":
        "https://netcoretri30days.azurewebsites.net",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
      "Access-Control-Max-Age": "86400"
    })
  };
  public getUbikeData(): Observable<any> {
    const URL =
      "http://data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000352-001";
    return this.http.get<any>(URL, this.httpOptions);
  }
  // http呼叫錯誤處理
  public HandleError(e: any): void {
    console.log(e.error.Message);
    alert(e.error.Message);
  }
}

export class YoubikeStation {
  public sno: string; // 站點代號
  public sna: string; // 中文場站名稱
  public tot: string; // 場站總停車格
  public sbi: string; // 可借車位數
  public sarea: string; // 中文場站區域
  public mday: string; // 資料更新時間
  public lat: string; // 緯度
  public lng: string; // 經度
  public ar: string; // 中文地址
  public sareaen: string; // 英文場站區域
  public snaen: string; // 英文場站名稱
  public aren: string; // 英文地址
  public bemp: string; // 可還空位數
  public act: string; // 場站是否暫停營運
}

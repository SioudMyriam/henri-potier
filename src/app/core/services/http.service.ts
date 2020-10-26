import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'


@Injectable()
export class HttpService<T> {
  BASE_URL = ' http://henri-potier.xebia.fr';

  constructor(protected resource: string, protected httpClient: HttpClient) { }

  public get<T>(route?: string): Observable<T> {
    const url = route ? `${this.BASE_URL}/${this.resource}/${route}` : `${this.BASE_URL}/${this.resource}`
    return this.httpClient.get<any>(url, {
      observe: 'body'
    })
  }
  public getByParams<T>(params?: string, endUrl?: string): Observable<T> {
    const url = `${this.BASE_URL}/${this.resource}/${params}/${endUrl}`
    return this.httpClient.get<any>(url, {
      observe: 'body'
    })
  }
}


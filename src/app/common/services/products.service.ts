import { Book } from './../../core/models/book.model'
import { HttpClient } from '@angular/common/http'
import { HttpService } from '../../core/services/http.service'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends HttpService<any> {

  constructor(protected httpClient: HttpClient) {
    super('books', httpClient)
  }

  public getBooksList(): Observable<Book[]> {
    return this.get()
  }

  public getBooksOffers(params: string): Observable<any> {
    return this.getByParams(params, 'commercialOffers')
  }
}

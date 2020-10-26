import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private dataCenter: {
    [value: string]: BehaviorSubject<any>
  } = {};

  updateData(value: string, emittedValue: any) {
    if (this.dataCenter[value] == null) {
      this.dataCenter[value] = new BehaviorSubject(emittedValue)
    } else {
      this.dataCenter[value].next(emittedValue)
    }
  }

  getData(value: string): Observable<any> {
    if (this.dataCenter[value] == null) {
      this.dataCenter[value] = new BehaviorSubject(null)
    }
    return this.dataCenter[value].asObservable()
  }
}

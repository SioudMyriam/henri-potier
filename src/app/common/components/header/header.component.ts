import { ShareDataService } from './../../services/share-data.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  savedProductsNumber: string
  constructor(private shareData: ShareDataService) { }

  ngOnInit() {
    this.shareData.getData('numberOfSavedBooks').subscribe(value => {
      this.savedProductsNumber = value
    })
  }

}

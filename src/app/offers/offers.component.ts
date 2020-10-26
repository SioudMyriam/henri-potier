import { Book } from './../core/models/book.model';
import { ProductsService } from './../common/services/products.service'
import { ShareDataService } from './../common/services/share-data.service'
import { Component, OnInit } from '@angular/core'
import { Offer } from '../core/models/offer.model'

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  savedBooksIsbn: string[] = []
  savedBooks: Book[] = []
  offers: Offer[] = []
  totalPrice: number
  bestSellers: number[] = []
  bestSeller: number

  constructor(private shareData: ShareDataService, private productsService: ProductsService) { }

  ngOnInit() {
    this.getTotalPrice()
    this.getOffers()
  }

  getTotalPrice() {
    this.shareData.getData('totalPrice').subscribe(value => {
      this.totalPrice = value
    })
  }

  getOffers() {
    this.shareData.getData('savedBooks').subscribe(res => {
      if (res && res.length > 0) {
        this.savedBooks = res
        for (let i = 0; i < res.length; i++) {
          this.savedBooksIsbn.push(res[i].isbn)
        }
        this.productsService.getBooksOffers(this.savedBooksIsbn.toString()).subscribe(offers => {
          this.offers = offers.offers
          for (let i = 0; i < this.offers.length; i++) {
            this.getNewPrice(this.offers[i].type, this.offers[i].value, this.offers[i].sliceValue)
          }
        })
      }
    })
  }

  getNewPrice(offerType: string, value: number, sliceValue: number) {
    if (offerType === 'percentage' || offerType === 'minus') {
      this.bestSellers.push(this.totalPrice - value)
    } else {
      if (sliceValue && this.totalPrice >= sliceValue) {
        const offeredValue = Math.trunc(this.totalPrice / sliceValue)
        this.bestSellers.push(this.totalPrice - (value * offeredValue))
      } else {
        this.bestSellers.push(this.totalPrice)
      }
    }
    this.bestSeller = Math.min(...this.bestSellers)
  }

}

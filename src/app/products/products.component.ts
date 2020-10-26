import { ShareDataService } from './../common/services/share-data.service'
import { Book } from './../core/models/book.model'
import { ProductsService } from './../common/services/products.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsList: Book[] = []
  searchTitle: string
  savedBooks: number
  listOfSelectedBooks: Book[] = []
  totalPrice = 0

  constructor(private productsService: ProductsService, private shareData: ShareDataService) { }

  ngOnInit() {
    this.intializeValues()
    this.productsService.getBooksList().subscribe(books => {
      this.productsList = books
    })
  }

  addProductToBasket(isbn: string, price: number, title: string) {
    this.savedBooks = ++this.savedBooks
    this.totalPrice = this.totalPrice + price
    this.listOfSelectedBooks.push({ isbn: isbn, title: title, price: price })
    this.shareData.updateData('totalPrice', this.totalPrice)
    this.shareData.updateData('numberOfSavedBooks', this.savedBooks.toString())
    this.shareData.updateData('savedBooks', this.listOfSelectedBooks)
  }

  intializeValues() {
    this.shareData.getData('numberOfSavedBooks').subscribe(value => {
      value ? this.savedBooks = Number(value) : this.savedBooks = 0
    })
    this.shareData.getData('totalPrice').subscribe(value => {
      value ? this.totalPrice = Number(value) : this.totalPrice = 0
    })
    this.shareData.getData('savedBooks').subscribe(value => {
      value ? this.listOfSelectedBooks = value : this.listOfSelectedBooks = []
    })
  }
}

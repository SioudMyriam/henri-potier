import { ProductsService } from './common/services/products.service';
import { AppRoutingModule } from './app-routing.module'
import { OffersComponent } from './offers/offers.component'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { HeaderComponent } from './common/components/header/header.component'
import { RouterModule } from '@angular/router'
import { ProductsComponent } from './products/products.component'
import { HttpClientModule } from '@angular/common/http'
import { SearchPipe } from './common/pipes/search.pipe'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OffersComponent,
    ProductsComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

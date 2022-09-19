import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyComponentComponent } from './comments/my-component/my-component.component';
import { CommentsService } from './services/comments.service';



@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [HttpClient, CommentsService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }

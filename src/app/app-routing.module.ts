import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MyComponentComponent } from './comments/my-component/my-component.component';

const routes: Routes = [
  {
    path:'mycomponet',
    component: MyComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    
  ]
})
export class AppRoutingModule { }

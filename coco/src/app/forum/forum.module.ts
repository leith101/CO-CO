import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AfficherpostComponent } from './components/afficherpost/afficherpost.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { BackforumComponent } from './components/backforum/backforum.component';


@NgModule({
  declarations: [
    PostComponent,
   
    AfficherpostComponent,
         TestComponent,
         BackforumComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    RouterModule
  ]
})
export class ForumModule { }

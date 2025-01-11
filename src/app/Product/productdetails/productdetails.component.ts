import { Component } from '@angular/core';
import { IProduct } from '../Models/IProduct';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent {
 product:IProduct;
 constructor(private activatedRoute:ActivatedRoute,private location:Location){

  this.product = this.activatedRoute.snapshot.data["data"];

  // this.activatedRoute.data.subscribe(data => this.product$ = data)
  console.log(this.product);
 }
 GoBack(){
  this.location.back();
 }
}

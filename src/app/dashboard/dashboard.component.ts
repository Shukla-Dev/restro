import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestroData } from './restro.model';

@Component({
  selector: 'app-dashboard',   
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;
  
  restroModelObj : RestroData = new RestroData 
  allRestroData: any;

  constructor(private formBuilder:FormBuilder,private apiService:ApiService) { }

  ngOnInit(): void {
    console.log(this.restroModelObj,'obj')
    this.formValue = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:['']
    })
    this.getAllData();
  }

  //Subscribing Data whichis maped via service....
  addRestro(){
     this.restroModelObj.name = this.formValue.value.name;
     this.restroModelObj.email = this.formValue.value.email;
     this.restroModelObj.mobile = this.formValue.value.mobile;
     this.restroModelObj.address = this.formValue.value.address;
     this.restroModelObj.services = this.formValue.value.services;

     const saveMethod = this.apiService.postRestro(this.restroModelObj)
     saveMethod.subscribe(
      (res) => {
       console.log(res);
       alert("Restro Record Added Successfully ")
       let ref = document.getElementById('clear')
       ref?.click();
       this.formValue.reset()
       this.getAllData();
       
     },
       (err: any)=>{
        alert("Something Went Wrong")
     })
  }

  getAllData(){
    this.apiService.getRestro().subscribe(res=>{
      this.allRestroData = res;
    })
  }

  // deleteData(data:any){
  //   this.apiService.deleteRestro(data.id).subscribe(res => {
  //     alert("Record Delete Successfully")
  //     this.getAllData();
  //   })
  // }
  
  deleteData(data:any){
    this.apiService.deleteRestro(data.id).subscribe((res) => {
      this.getAllData();
    })
  }
}

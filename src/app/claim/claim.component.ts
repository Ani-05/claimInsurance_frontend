import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Claim } from '../claim';
import { NgForm } from '@angular/forms';
import { ClaimServiceService } from '../claim.service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-claim',
  standalone: false,
  templateUrl: './claim.component.html',
  styleUrl: './claim.component.css'
})
export class ClaimComponent implements OnInit{
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  claims: Claim={
    claimNo: '',
    claimType: '',
    policyNo: '',
    claimAmount: 0,
    insurer: {
      name: '',
      dob: '',
      address: '',
      email: '',
      mobile_no: ''
    }
  }
  ngOnInit(): void {
      
  }

  constructor(private claimservice:ClaimServiceService){}

  saveEmployee(employeeForm: NgForm):void
  {
    console.log(this.claims);
    this.claims.insurer.dob = formatDate(this.claims.insurer.dob, 'yyyy-MM-dd', 'en-US');
    delete this.claims.claimNo;
    
    this.claimservice.saveEmployee(this.claims).subscribe({
      next: (res) => {console.log("Claim saved successfully", res);this.resetForm()},

    error: (err) => console.error("Failed to save claim", err)
    });
  }

  resetForm(): void {

    this.claims = {
      claimNo: '',
      claimType: '',
      policyNo: '',
      claimAmount: 10,
      insurer: {
        name: '',
        dob: '',
        address: '',
        email: '',
        mobile_no: ''
      }
    };

    

}

}

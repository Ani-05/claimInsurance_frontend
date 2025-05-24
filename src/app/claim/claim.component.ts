import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Claim } from '../claim';
import { NgForm } from '@angular/forms';
import { ClaimServiceService } from '../claim.service.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';  // Import both ActivatedRoute and Router

@Component({
  selector: 'app-claim',
  standalone: false,
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css'] // fixed typo: was styleUrl
})
export class ClaimComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  claims: Claim = {
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
  };

  successMessage: string = '';
  errorMessage: string = '';
  isEdit: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,  // ActivatedRoute for reading route params
    private router: Router,                  // Router for navigation
    private claimservice: ClaimServiceService
  ) {}

  ngOnInit(): void {
    const claimNo = this.activatedRoute.snapshot.paramMap.get('claimNo');  // Using ActivatedRoute to access route params
    if (claimNo) {
      this.isEdit = true;
      this.claimservice.searchByClaimNo(claimNo).subscribe((data) => {
        this.claims = data;
      });
    }
  }

  saveEmployee(employeeForm: NgForm): void {
    this.claims.insurer.dob = formatDate(this.claims.insurer.dob, 'yyyy-MM-dd', 'en-US');

    // Remove claimNo for new entries
    delete this.claims.claimNo;

    this.claimservice.saveEmployee(this.claims).subscribe({
      next: (res) => {
        console.log("Claim saved successfully", res);
        this.resetForm();
      },
      error: (err) => console.error("Failed to save claim", err)
    });
  }

  updateInsurer(claimForm: NgForm): void {
    this.claims.insurer.dob = formatDate(this.claims.insurer.dob, 'yyyy-MM-dd', 'en-US');

    const payload: { [key: string]: string } = {
      claimNo: this.claims.claimNo || '',
      name: this.claims.insurer.name,
      dob: this.claims.insurer.dob,
      address: this.claims.insurer.address,
      email: this.claims.insurer.email,
      mobile_no: this.claims.insurer.mobile_no.toString()
    };

    this.claimservice.updateInsurerFields(payload).subscribe({
      next: (res) => {
        console.log("Claim insurer fields updated", res);
        this.successMessage = 'Insurer details updated successfully!';
        setTimeout(() => {
          this.router.navigate(['/claim_list']);  // Navigate using Router
        }, 2000); 
        this.resetForm();
      },
      error: (err) => {
        console.error("Failed to update insurer fields", err);
        this.errorMessage = 'Failed to update insurer details. Please try again later.';
      }
    });
  }
  resetForm(): void {
    this.claims = {
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
    };
    this.isEdit = false;
  }
}

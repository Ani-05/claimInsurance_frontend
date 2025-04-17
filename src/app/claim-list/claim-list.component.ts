import { Component, OnInit } from '@angular/core';
import { ClaimServiceService } from '../claim.service.service';
import { Claim } from '../claim';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim-list',
  standalone: false,
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {

  searchKey: string = '';
  filterBy: string = 'claimNo';
  claimlist: Claim[] = [];
  dataSource: Claim[] = [];
  displayedColumns: string[] = ['claimNo', 'claimAmount', 'claimType', 'policyNo', 'insurer', 'edit','delete'];

  constructor(private claimservice: ClaimServiceService,
    private router: Router) {
      this.loadAllClaims();
     }

  ngOnInit(): void {
    this.loadAllClaims();
  }

  editClaim(claimNo:string):void{
    this.router.navigate(['/claimID', claimNo]);
  }

  deleteClaim(claimNo: string): void {
    this.claimservice.deleteClaim(claimNo).subscribe({
      next: (res) => {
        console.log(res);
        this.loadAllClaims(); 
      },
      error: (err: HttpErrorResponse) => console.error("Error deleting claim:", err)
    });
  }

  
  loadAllClaims(): void {
    this.claimservice.getEmployee().subscribe({
      next: (res: Claim[]) => {
        this.dataSource = res; 
        console.log("Claims loaded", this.dataSource);
      },
      error: (err: HttpErrorResponse) => {
        console.error("Failed to load claims", err);
      }
    });
  }


  applyFilter(): void {
    if (this.filterBy === 'claimNo') {
      this.searchByClaimNo(this.searchKey);
    } else if (this.filterBy === 'claimType') {
      this.searchByClaimType(this.searchKey);
    } else if (this.filterBy === 'policyNo') {
      this.searchByPolicyNo(this.searchKey);
    }
  }

  
  searchByClaimNo(claimNo: string): void {
    this.claimservice.searchByClaimNo(claimNo).subscribe({
      next: (data) => {
        this.dataSource = data ? [data] : []; 
      },
      error: (err: HttpErrorResponse) => {
        console.error("Error fetching claim by Claim No:", err);
        this.dataSource = [];  
      }
    });
  }

  searchByClaimType(claimType: string): void {
    this.claimservice.searchByClaimType(claimType).subscribe({
      next: (data) => {
        this.dataSource = data; 
      },
      error: (err: HttpErrorResponse) => {
        console.error("Error fetching claims by Claim Type:", err);
        this.dataSource = [];  
      }
    });
  }

  
  searchByPolicyNo(policyNo: string): void {
    this.claimservice.searchByPolicy(policyNo).subscribe({
      next: (data) => {
        this.dataSource = data; 
      },
      error: (err: HttpErrorResponse) => {
        console.error("Error fetching claims by Policy No:", err);
        this.dataSource = [];  
      }
    });
  }

 
  clearSearch(): void {
    this.searchKey = '';  
    this.loadAllClaims(); 
  }
}

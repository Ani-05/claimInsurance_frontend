import { Component, OnInit } from '@angular/core';
import { ClaimServiceService } from '../claim.service.service';
import { Claim } from '../claim';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-claim-list',
  standalone: false,
  templateUrl: './claim-list.component.html',
  styleUrl: './claim-list.component.css'
})
export class ClaimListComponent implements OnInit {

  claimlist: Claim[]=[];

  dataSource:Claim[]=[];

  displayedColumns: string[] = ['claimNo', 'claimAmount', 'claimType', 'policyNo', 'insurer','delete'];

   constructor(private claimservice:ClaimServiceService){
this.getEmployee();
   }

   ngOnInit(): void {
   
   }

   deleteClaim(claimNo: string): void {
    this.claimservice.deleteClaim(claimNo).subscribe({
      next: (res) => {
        console.log(res);
        this.getEmployee();
      },
      error: (err: HttpErrorResponse) => console.error(err)
    });
  }
  
   

  getEmployee():void{
    this.claimservice.getEmployee().subscribe({
      next: (res:Claim[]) =>{this.claimlist = res;
        this.dataSource = res;console.log(this.claimlist)} ,

    error: (err) => console.error("Failed to save claim", err)
    })

  }

}

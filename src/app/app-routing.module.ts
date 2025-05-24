import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ClaimComponent } from './claim/claim.component';
import { ClaimListComponent } from './claim-list/claim-list.component';

const routes: Routes = [
  {path:"header", component: HeaderComponent},
  {path:"claims", component: ClaimComponent},
  { path: 'claim/:claimNo', component: ClaimComponent },
  {path:"claim_list",component:ClaimListComponent},
  {path:"", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

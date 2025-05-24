import { Insurer } from "./insurer";

export interface Claim {
    claimNo?:string;
    claimType:String;
    policyNo:String;
    claimAmount:Number;
    insurer:Insurer;
}

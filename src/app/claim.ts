import { Insurer } from "./insurer";

export interface Claim {
    claimNo?:String;
    claimType:String;
    policyNo:String;
    claimAmount:Number;
    insurer:Insurer;
}

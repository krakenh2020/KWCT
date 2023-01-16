export class SignRequest {
    created: string;
    credential: any;
    did: string;
    signatureType: string;
    verificationMethod: string;

    constructor(created:string,credential,did:string,signatureType:string, verificationMethod: string) {
      // invokes the setter
      this.created = created;
      this.credential = credential;
      this.did = did;
      this.signatureType = signatureType;
   // non usato 
   //   this.verificationMethod = verificationMethod;
    }
}
import { SignRequest } from "./SignRequest";

export class CredentialEntityFactory {

    static createSignRequest(myDID: string, claim , id: string ): SignRequest {
        let credential = {};
        //TODO: rendere dinamico
        credential['@context'] = ['https://www.w3.org/2018/credentials/v1', "https://www.w3.org/2018/credentials/examples/v1"];
        credential['id'] = id;
        credential['type'] = [ 'VerifiableCredential', 'UniversityDegreeCredential' ];
        credential['credentialSubject'] = claim;
        credential['issuanceDate'] = new Date().toISOString();
        credential['issuer'] = myDID;
        //credential['referenceNumber']=83294847;
        //TODO: rendere dinamico
        let signrequest = new SignRequest(new Date().toISOString(), credential, myDID, 'Ed25519Signature2018', "baseContextValidation");
        return signrequest;
    }

    static createSignedIssueCredential(signedCredential, credentialComment) {
        
        let data={ 'json' : signedCredential };
        
        let credentials_attach={};
        credentials_attach['lastmod_time']=new Date().toISOString();
        credentials_attach['data']=data;
        
        let issue_credential = {};
        issue_credential['credentials~attach']= [credentials_attach];
        issue_credential['comment']=credentialComment;
        let recipient={};
        recipient['issue_credential']=issue_credential
        return recipient;
    }

    
    static createIssueCredential(credentialSubject, id, issuer,comment) {
        let json={};
        //TODO: rendere dinamico
        json['@context']=["https://www.w3.org/2018/credentials/v1","https://www.w3.org/2018/credentials/examples/v1"]
        json['credentialSubject']=credentialSubject;
        json['id']=id;
        json['issuanceDate']=new Date().toISOString();
        json['issuer']=issuer;
        //TODO: rendere dinamico
        json['referenceNumber']=83294847;
        //TODO: rendere dinamico
        json['type']=["VerifiableCredential","UniversityDegreeCredential"]

        let data={};
        data['json']=json;

        let credentials_attach={};
        credentials_attach['lastmod_time']=new Date().toISOString();
        credentials_attach['data']=data;
        
        let issue_credential = {};
        issue_credential['credentials~attach']= [credentials_attach];
        issue_credential['comment']=comment;
        let recipient={};
        recipient['issue_credential']=issue_credential
        return recipient;
    }

    static createOfferRequest(myDID, their_did, claim) {
        let data = {};
        data['json'] = claim;
        let offer_attach = {};
        offer_attach['lastmod_time'] = new Date().toISOString();
        offer_attach['data'] = data;
        let offer_credential = {};
        offer_credential['offers~attach'] = offer_attach;
        let offer = {};
        offer['offer_credential'] = offer_credential;
        offer['my_did'] = myDID;
        offer['their_did'] = their_did;
        return offer;
    }
   
}
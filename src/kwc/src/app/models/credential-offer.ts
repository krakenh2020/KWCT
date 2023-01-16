export class CredentialOffer {
    constructor(mydid, theirDid, schemaID, schemaURL, comment) {
        this.my_did = mydid || '';
        this.their_did = theirDid || '';
        this.offer_credential=new Object
        this.offer_credential["comment"] = comment;
        this.offer_credential["offers~attach"] = [
            {  "data": { "links": [ schemaURL ]},
               "description" : schemaID}
        ]
    }

    my_did: string;
    their_did: string;
    offer_credential: object;
}

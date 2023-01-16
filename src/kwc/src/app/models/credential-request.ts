export class CredentialRequest {
    constructor(mydid, theirDid, schemaID, schemaURL, comment, isKwctCredentialAction: boolean) {
        this.my_did = mydid || '';
        this.their_did = theirDid || '';
        this.request_credential = new Object
        this.request_credential["comment"] = comment;
        if (isKwctCredentialAction) {
            this.request_credential["requests~attach"] = [
                {
                    "data": { "links": [schemaURL] },
                    "description": schemaID
                }
            ]
        }
    }
    my_did: string;
    their_did: string;
    request_credential: object;
}

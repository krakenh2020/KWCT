export class RequestPresentation {
    constructor(mydid, theirDid, comment ) {
        this.my_did = mydid || '';
        this.their_did = theirDid || '';
        this.request_presentation=new Object
        this.request_presentation["comment"]=comment
    }

    my_did: string;
    their_did: string;
    request_presentation: object;

   
}

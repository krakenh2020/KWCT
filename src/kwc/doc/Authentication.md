# Autenticazione con JWT
JWT, acronimo di JSON Web Token, è un sistema di cifratura e di contatto in formato JSON per lo scambio di informazioni tra i vari servizi di un server. Si genera così un token che può essere cifrato e firmato tramite una chiave disponibile solo a colui che lo ha effettivamente generato.
L’algoritmo di firma viene elaborato tramite HMAC( MD5 e SHA-1 più utilizzate) o con chiavi pubbliche e/o private con standard RSA o ECDSA.

# Funzionamento
Il sistema di funzionamento è abbastanza semplice: il client invia una richiesta al server e questo genera un token di autenticazione che il client utilizzerà tutte le volte che andrà a collegarsi allo stesso nodo.

# Composizione del token JWT
- [Header]:
    che contiene le due informazioni base: la tipologia del token, che nel nostro caso è JWT, e quella dell’algoritmo utilizzato per la cifratura;
    { "alg": "HS256", "typ": "JWT" }
- [Payload]:
    claim registrati all’interno del IANA JSON Web Token Claim Register e il cui scopo è definito in uno standard. Alcuni esempi sono l’emittente del token ("iss" per issuer), il dominio di destinazione ("aud" per audience) e il tempo di scadenza ("exp" per expiration time). Per mantenere la lunghezza del token il più breve possibile, sono stati utilizzati nomi di claim brevi.
    Claim pubblici, definibili a proprio piacimento senza restrizione. Per evitare collisioni nella semantica delle keys, è necessario registrare pubblicamente i claim nel relativo registro dei claim dei JSON Web Token IANA o assegnare nomi resistenti alle collisioni.
    Claim privati sono pensati per informazioni da scambiare specificatamente con la propria applicazione. Mentre i claim pubblici contengono informazioni come "name" o "e-mail", quelli privati sono più specifici. Un’informazione tipica è un "ID utente" o uno specifico "nome del reparto". È importante assicurarsi che il nome non si scontri con i claim registrati o pubblici.
    { "sub": "123", "name": "Alice", "exp": 30 }
- [Signature]:
    la firma di un JSON Web Token è creata utilizzando la codifica Base64 dell’header e del payload e il metodo di firma/codifica specificato. La struttura è definita dalla JSON Web Signature (JWS), uno standard secondo RFC 7515. Affinché la firma funzioni, è necessario utilizzare una chiave segreta nota solo all’applicazione originale. Da un lato, questa firma verifica che il messaggio non sia stato modificato durante il percorso e dall’altro, se il token è firmato con una chiave privata, assicura che il mittente del JWT sia quello corretto.
    
    ### Nessun backup: come precedentemente accennato, se il fattore di protezione dei dati è basso, può essere specificato il valore "none" nell’ header. In questo caso non viene generata alcuna firma. Quindi il JSON Web Token consiste solo di header e payload. Senza protezione, il payload è leggibile in chiaro dopo la decodifica di Base64 e non viene verificato se il messaggio provenga dal mittente corretto o se sia stato modificato in itinere.
    
    ### Firma (JWS): in genere è sufficiente controllare se i dati provengano dal mittente corretto e se siano stati modificati durante il percorso. Questo viene fatto utilizzando lo schema JSON Web Signature (JWS), che assicura che il messaggio non sia stato modificato durante il trasporto e che provenga dal mittente corretto. Con questa procedura, il carico utile può essere letto in chiaro anche dopo la decrittazione di Base64.
    
    ### Firma (JWS) e crittografia (JWE): è possibile utilizzare una JSON Web Encryption (JWE) in aggiunta al JWS. JWE cripta il contenuto del payload, che viene successivamente firmato con JWS. Per decifrare il contenuto, viene specificata una password comune o una chiave privata. Il mittente è quindi verificato, il messaggio è riservato e autentico e il payload non può essere letto in chiaro dopo la decrittazione di Base64.
    { 7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ }

### È importante comunque capire che il contenuto del token non è cifrato. Si può scompattare e decriptare a piacimento per cui è importante che non vengano inseriti dati sensibili come password. La sicurezza viene garantita con una chiave segreta dal server e quindi un qualsiasi dato che venga manipolato non sarà accettato da questo, vietandone di fatto l’accesso ai dati.

# Come funziona?
La funzione del JSON Web Token può essere spiegata molto bene con un login utente. Prima di utilizzare il JWT, è necessario definire una chiave segreta (secret). Una volta che un utente ha inserito con successo i propri dati di accesso, il JWT viene restituito con la chiave e memorizzato in locale. La trasmissione dovrebbe essere effettuata tramite HTTPS per proteggere meglio i dati.

Ogni volta che l’utente desidera accedere a risorse protette, ad esempio a un’API, o a un percorso protetto, lo User Agent invia il JWT come parametro (ad esempio ‘jwt’ per le GET request) o come intestazione di autorizzazione (per POST, PUT, OPTIONS, DELETE). Il partner di comunicazione è in grado di decifrare il JSON Web Token e, se il controllo va a buon fine, eseguire la richiesta.

# Dove si applica
    1) Applicazioni REST: nelle applicazioni REST, il JWT assicura che l’applicazione sia priva di stato, inviando le informazioni di autenticazione direttamente con la richiesta.
    2)Cross-Origin Ressource Sharing: JSON Web Token invia informazioni durante la condivisione di risorse cross-origin. Questo ha un enorme vantaggio rispetto ai cookie, che di solito non vengono inviati con questo metodo.
    3)Utilizzo di più framework: JSON Web Token è standardizzato e può essere utilizzato più volte Quando si utilizzano più framework, è più facile condividere i dati di autenticazione.

# Esempio
Header: {"alg": "HS256","typ": "JWT"}
base64Header = base64Encode(header)
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

Payload: {"sub": "0123456789","name": "Mario Rossi","admin": true}
base64Payload = base64Encode(payload)
// eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9

Ora non resta che creare la firma. Nell’header abbiamo indicato che la firma è HMAC-SHA256:
signature = HS256(base64Header + '.' + base64Payload, 'secret')
// dyt0CoTl4WoVjAHI9Q_CwSKhl6d_9rhM3NrXuJttkao

L’ultimo passo è quello di unire queste tre parti insieme e separarle con un punto:
Token = base64Header + ‘.’ + base64Payload + ‘.’ + signature
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.dyt0CoTl4WoVjAHI9Q_CwSKhl6d_9rhM3NrXuJttkao


# Altro
L'uso del termine firma nella RFC è analogo a una firma digitale nella crittografia asimmetrica. Nella crittografia asimmetrica se il mittente crittografa un messaggio con la propria chiave privata, chiunque disponga del messaggio può decrittografarlo con la chiave pubblica del mittente. Quindi l'obiettivo con il termine firma non è mantenere un messaggio segreto, ma verificare l'integrità / il mittente del messaggio, che non è stato modificato.

Nel caso di JWT, il sistema di invio è sia il creatore che il consumatore del messaggio e l'obiettivo è assicurarsi che il token passato all'utente non sia stato manomesso (ad esempio, dati i privilegi elevati).

Ecco una buona spiegazione dei JWT e delle firme da cui proviene l'immagine seguente. 5 semplici passaggi per comprendere i token Web JSON (JWT).

Inoltre c'è uno svantaggio significativo nella crittografia del payload: significa che il destinatario del servizio deve condividere un segreto con il server di autenticazione (la chiave di crittografia) per capire se il portatore del token è autorizzato o meno o no. Al contrario, chiunque può convalidare un JWT usando solo la chiave pubblica pubblicata dal server di autenticazione.



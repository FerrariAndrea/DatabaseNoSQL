# Esempio Gelateria

Progettare, costruire e popolare un database (usando Compass) per una gelateria all'ingrosso.
La gelateria deve poter gestire gusti di gelato diversi, ogni gusto è stoccato in appositi contenitori e viene misurato in KG.
La gelateria deve poter vendere (tramite ordini) il proprio gelato a clienti usuali.
Di ogni cliente è necessario sapere un nominativo e un indirizzo (via, città, cap).
Ogni ordine può contenere N gusti in quantità diverse.

Sarà necessario predisporre delle query per poter fare le seguenti operazioni (consiglio: una quary per operazione):
- Ottenere un ordine dato il suo id
- Sapere se un certo cliente esiste dato il suo nominativo
- Ottenere tutti i gusti in magazzino che sono disponibili in quantità minori di 5Kg
- Sapere se un certo gusto con almeno una certà quantità è disponibile in magazzino
- Ottenere la somma di KG di gelato venduti ad uno specifico cliente di uno specifico ordine (indipendentemente dai gusti)
- Ottenere tutti gli ordini che sono composti da esattamente 3 gusti diversi


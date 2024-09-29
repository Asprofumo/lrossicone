# Flies

## Obbiettivo

"Crea un file json con dei dati multivariati: ci sono 10 data-cases e
ogni data-case ha sei variabili quantitative i cui valori sono tutti
positivi. In base a questi dati disegna 10 piccole zanzare (basta la
silhouette) che hanno le coordinate x e y prese dalle prime due
variabili quantitative. Facendo click con il pulsante siistro del mouse
sullo sfondo, le zanzare si spostano nell'area di disegno assumendo una
nuova configurazione (che usa le variabili 3 e 4). Cliccando ancora si
spostano nella posizione data dalle variabili 5 e 6. Dopo l'ultima
configurazione, al click successivo, si torna alla prima configurazione.
Se l'utente clicca con il pulsante sinistro del mouse su una zanzara,
invece, questa rimane schiacciata e non si muove più. Premendo il tasto
"h" (per "horizontal flip") la posizione delle zanzare rispetto all'asse
delle x si inverte. Premendo il tasto "v" (per "vertical flip") la
posizione delle zanzare rispetto all'asse delle y si inverte. Fai in
modo che tutti i movimenti delle zanzare siano fluidi con un'animazione.
Usa le scale d3.js per mappare l'intervallo dei valori delle variabili
(che è arbitrario) sull'intervallo dei valori delle coordinate, che
dipende dalla tua interfaccia."

## Implementazione

### flies.js
Lo script principale (`flies.js`) è contenuto nella cartella `js`.

La parte iniziale del codice è costituita dalla dichiarazione delle variabili  che regolano:

1) Le dimensioni dello sfondo
2) Le caratteristiche delle zanzare
3) Flag e utilities per la sincronizzazione delle operazioni.

La parte centrale è costituita dalle funzioni `move()` e `shift()` le quali governano rispettivamente lo spostamento al click del mouse e lo shift dovuto alla pressione dei tasti `H` o `V`.

### dataset.json

Il file json che contiene le coordinate delle zanzare è contenuto nel path `./data/dataset.json`.

### index.html

La pagina principale è contenuta nella root directory e non ha un'implementazione particolare poiché delega interamente la visualizzazione al file `/js/flies.js`.

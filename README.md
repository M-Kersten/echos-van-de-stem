# Echo's van de Stem — Soundboard

Een mobielvriendelijke **soundboard** op één pagina die meeslepende audio levert
voor het bordspel *Echo's van de Stem*, dat zich afspeelt in Utrecht. Het is een
digitale metgezel tijdens het spelen: kies een locatie en laat de sfeer de kamer
vullen, terwijl je losse effecten afspeelt om scènes tot leven te brengen.

Pure HTML, CSS en JavaScript. Geen back-end, geen accounts, geen build-stap. De
soundboard werkt offline zodra hij geladen is en kan op het beginscherm van een
telefoon worden gezet.

## Locaties

Vijf locaties, elk met één doorlopende achtergrondsfeer en meerdere losse effecten:

1. **De Markt**
2. **Het UMC Ziekenhuis**
3. **Het Café**
4. **Het Appartement**
5. **De Kerk**

## Hoe het werkt

- Tik op de grote knop van een locatie om de **achtergrondsfeer te starten**. Die
  fade-t in.
- Tik er nogmaals op om te **stoppen** (fade-t uit), of tik op een andere locatie
  om er naartoe te **crossfaden**. Er speelt altijd maar één sfeer tegelijk.
- Tik op een **effect**-knop om een los geluid over de sfeer heen af te spelen.
  Meerdere effecten kunnen tegelijk klinken en de sfeer loopt gewoon door.
- Twee schuiven regelen het **achtergrond-** en **effectenvolume** los van elkaar.
  Je instellingen worden op het apparaat onthouden.
- Een balk onderaan toont altijd wat er speelt, met een snelle Stop-knop.

### Plaatsvervangende geluiden

Voor geluiden waarvoor nog geen audiobestand bestaat, speelt de soundboard een
zachte gesynthetiseerde plaatsvervangende toon, zodat de interface meteen te
testen is. Voeg een echt bestand toe en de plaatsvervanger verdwijnt vanzelf
(zie hieronder).

## Je eigen audio toevoegen

1. Zet je geluidsbestanden in de mappen `audio/<locatie>/`.
2. Gebruik exact de bestandsnamen uit [`audio/README.md`](audio/README.md)
   (bijv. `audio/marketplace/rain.mp3`).

Wil je geluiden hernoemen, toevoegen of verwijderen — of het bestandsformaat
wijzigen — pas dan [`sounds.config.js`](sounds.config.js) aan. Dat is de enige
plek waar de locaties, labels en bestandspaden worden gedefinieerd. Er hoeft geen
andere code te veranderen.

## Uitvoeren

Het is een statische site, dus al deze manieren werken:

- **Snelste:** open `index.html` direct in een browser. (Audio speelt; de
  offline service worker werkt alleen wanneer de site via http/https wordt
  aangeboden.)
- **Lokale server** (aanbevolen, schakelt offline caching in):

  ```sh
  # Python 3
  python3 -m http.server 8000
  # open daarna http://localhost:8000
  ```

- **Hosting:** upload de map naar elke statische host (GitHub Pages, Netlify,
  enz.). Gebruik op een telefoon de optie *Aan beginscherm toevoegen* om de site
  schermvullend te draaien, net als een app.

> Audio op telefoons begint pas na een tik — dat is een browserregel. Omdat elk
> geluid hier met een knop wordt gestart, werkt het gewoon op iOS en Android.

## Bestanden

| Bestand | Doel |
| --- | --- |
| `index.html` | Paginastructuur |
| `styles.css` | Perkamentthema en responsieve opmaak |
| `sounds.config.js` | **Pas dit aan** om locaties, geluiden en bestandspaden te wijzigen |
| `app.js` | Audio-engine (fades, gelaagdheid, volumes) en interface |
| `sw.js` | Service worker voor offline gebruik |
| `manifest.webmanifest`, `icon.svg` | Ondersteuning voor "aan beginscherm toevoegen" |
| `audio/` | Je geluidsbestanden |

## Vormgeving

Een warme, beschouwende, op perkament geïnspireerde stijl: vergeeld papier,
bruine inkt, gedempte aardetinten, elegante schreefletters en subtiele
christelijke accenten (een kruis in de kop en het icoon). Geen opzichtige,
moderne interface — alleen grote, vingervriendelijke knoppen, bedoeld om tijdens
het spel op tafel te liggen.

# Audiobestanden

Zet je geluidsbestanden in deze mappen. De app laadt ze op naam, dus de
**bestandsnamen moeten exact kloppen** met de lijst hieronder (de extensie wordt
ingesteld via `audioFormat` in `../sounds.config.js`, standaard `.mp3`).

Zolang een bestand nog niet bestaat, speelt de soundboard in plaats daarvan een
zachte plaatsvervangende toon, zodat alles bruikbaar is terwijl je nog opneemt of
geluiden zoekt.

## Wat hoort waar

Elke locatie heeft **één achtergrondloop** (`ambient.*`) plus meerdere losse
**effecten**. Achtergrondloops moeten naadloos zijn (loopbaar); een minuut of
langer is ideaal. Effecten moeten kort zijn.

De namen hieronder komen overeen met `sounds.config.js`. Pas dat bestand aan als
je geluiden wilt hernoemen, toevoegen of verwijderen.

```
audio/
├── marketplace/
│   ├── ambient.mp3                  Drukke markt Utrecht (loop)
│   ├── rain.mp3                     Regen
│   ├── bicycle-bell.mp3             Fietsbel
│   ├── dutch-conversation.mp3       Pratende mensen
│   ├── distant-church-bells.mp3     Kerkbellen in de verte
│   ├── footsteps.mp3                Voetstappen
│   └── vendor-call.mp3              Luide verkoper
│
├── cafe/
│   ├── ambient.mp3                  Gezellige geluiden (loop)
│   ├── espresso-machine.mp3         Espresso machine
│   ├── cups-and-plates.mp3          Servies
│   ├── quiet-chatter.mp3            Rustig gesprek
│   ├── door-opening.mp3             Openslaande deur
│   ├── music.mp3                    Live muziek
│   └── Cheers.mp3                   Proost
│
├── hospital/
│   ├── ambient.mp3                  Rustige ziekenhuis geluiden (loop)
│   ├── heart-monitor.mp3            Hartritme monitor
│   ├── rolling-cart.mp3             Bed op wielen
│   ├── announcement.mp3             Omroep in de verte
│   ├── door-opening.mp3             Openslaande deuren
│   ├── cough.mp3                    Hoesten
│   └── footsteps.mp3                Voetstappen
│
├── flat/
│   ├── ambient.mp3                  Rustige stadsgeluiden (loop)
│   ├── discussion.mp3               Mensen in discussie
│   ├── phone-vibration.mp3          Telefoon rinkelt
│   ├── doorbell.mp3                 Deurbel
│   ├── washing-machine.mp3          Wasmachine
│   ├── running-kids.mp3             Rennende kinderen
│   └── wind-blowing.mp3             Hard waaiende wind
│
└── church/
    ├── ambient.mp3                  Zacht geluid van gebed in grote kerkzaal (loop)
    ├── organ.mp3                    Orgel muziek
    ├── pages-turning.mp3            Bijbel bladzijde om
    ├── prayer-voices.mp3            Kaars wakkert
    ├── church-bells.mp3             Kerkbellen
    ├── pew-creak.mp3                Hout bankje kraakt
    └── choir.mp3                    Koor
```

## Tips

- **Formaat:** MP3 werkt op elke moderne telefoon en desktopbrowser. Wil je een
  ander formaat gebruiken (bijv. `ogg` of `m4a`), wijzig dan `audioFormat` in
  `sounds.config.js` en gebruik die extensie voor elk bestand.
- **Bestandsgrootte:** houd achtergrondloops redelijk gecomprimeerd (96–128 kbps
  mono is ruim voldoende), zodat ze snel laden en goed in de cache passen voor
  offline gebruik.
- **Let op hoofdletters:** bestandsnamen zijn hoofdlettergevoelig. `Cheers.mp3`
  moet bijvoorbeeld exact zo heten als in `sounds.config.js` staat.

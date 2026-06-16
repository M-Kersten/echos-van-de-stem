# Personagefoto's

Hier komen de iconen/foto's van de zes personages in het verbindingsweb.

Upload je PNG's met **precies deze namen** (de app verwacht ze zo):

```
images/
├── lars.png
├── amara.png
├── noor.png
├── thomas.png
├── yasmine.png
└── bram.png
```

## Tips

- **Vierkant werkt het best.** De foto wordt rond afgesneden in de knoop, met
  het midden in beeld (`xMidYMid slice`). Vierkante afbeeldingen worden dus
  netjes een cirkel; bij een rechthoek worden de randen weggesneden.
- **Formaat:** zo'n 256×256 of 512×512 px is ruim voldoende. Houd het bestand
  klein zodat de pagina snel laadt en goed offline werkt.
- **Transparante of volle achtergrond** mag allebei.
- **Andere naam of map?** Pas dan het veld `icon:` van het betreffende
  personage aan in `../connections.config.js`.
- Zolang een foto nog ontbreekt, toont die knoop gewoon een cirkel — de rest
  blijft werken.

/*
 * Echo's van de Stem — verbindingsweb
 * -----------------------------------
 * Pas dit bestand aan om de personages, hun omschrijvingen en de verbindingen
 * te wijzigen. De teksten hieronder zijn VOORBEELDEN — vervang ze door de
 * echte verhaallijnen van het spel.
 *
 * - `characters`: de zes personages, met de volgorde waarin ze (met de klok mee)
 *   in de cirkel komen te staan.
 * - `center`: de zevende knoop in het midden (de gedeelde plekken).
 * - `links`: verbindingen tussen personages.
 *      type: 'sterk'       -> dikke doorgetrokken lijn (actief in het spel)
 *            'sluimerend'  -> dunne gestippelde lijn (zelf te ontdekken)
 * - `centerLinks`: de dunne lijn van elk personage naar de gedeelde plekken.
 */
window.CONNECTIONS_CONFIG = {
  intro: 'Tik op een personage om zijn of haar verbindingen op te lichten, of tik op een lijn om te lezen wat die verbinding inhoudt.',

  center: {
    id: 'plekken',
    name: 'De gedeelde plekken',
    blurb: 'De plekken waar alle levens samenkomen: de markt, het ziekenhuis, het café, het appartement en de kerk.'
  },

  // Volgorde = plaatsing in de cirkel, met de klok mee vanaf bovenaan.
  characters: [
    { id: 'lars',    name: 'Lars',    blurb: 'Een jonge marktkoopman die houvast zoekt na een moeilijk jaar.' },
    { id: 'amara',   name: 'Amara',   blurb: 'Verpleegkundige met een luisterend oor en een rotsvast geloof.' },
    { id: 'noor',    name: 'Noor',    blurb: 'Studente die twijfelt tussen haar oude en haar nieuwe leven.' },
    { id: 'thomas',  name: 'Thomas',  blurb: 'Voorganger die worstelt met zijn eigen vragen.' },
    { id: 'yasmine', name: 'Yasmine', blurb: 'Caféhoudster die iedereen kent, maar zichzelf nauwelijks.' },
    { id: 'bram',    name: 'Bram',    blurb: 'Gepensioneerde buurman, stil maar trouw aanwezig.' }
  ],

  links: [
    // Sterke verbindingen (dik, doorgetrokken) — actief in het spel
    { a: 'lars',    b: 'amara',   type: 'sterk',      desc: 'Amara hielp Lars door zijn rouw heen; hun gesprekken openden iets nieuws.' },
    { a: 'lars',    b: 'bram',    type: 'sterk',      desc: 'Bram nam Lars onder zijn hoede toen niemand anders dat deed.' },
    { a: 'amara',   b: 'noor',    type: 'sterk',      desc: 'Amara is Noors mentor, in het ziekenhuis en daarbuiten.' },
    { a: 'noor',    b: 'thomas',  type: 'sterk',      desc: 'Noor zoekt Thomas op met haar grootste vragen.' },
    { a: 'thomas',  b: 'yasmine', type: 'sterk',      desc: 'Yasmine en Thomas delen een verleden dat ze zelden benoemen.' },
    { a: 'yasmine', b: 'amara',   type: 'sterk',      desc: 'Twee vriendinnen die elkaar overeind houden.' },

    // Sluimerende verbindingen (dun, gestippeld) — zelf te ontdekken
    { a: 'lars',    b: 'noor',    type: 'sluimerend', desc: 'Ze kruisen elkaar steeds, zonder te weten hoeveel ze gemeen hebben.' },
    { a: 'bram',    b: 'yasmine', type: 'sluimerend', desc: 'Bram komt elke dag in het café; er is meer dan koffie.' },
    { a: 'thomas',  b: 'bram',    type: 'sluimerend', desc: 'Een oud meningsverschil dat nog niet is uitgesproken.' },
    { a: 'noor',    b: 'yasmine', type: 'sluimerend', desc: 'Een toevallige ontmoeting die een vriendschap kan worden.' },
    { a: 'amara',   b: 'thomas',  type: 'sluimerend', desc: 'Geloof verbindt hen, ook al spreken ze elkaar weinig.' }
  ],

  // Dunne lijn van elk personage naar de gedeelde plekken.
  centerLinks: [
    { id: 'lars',    desc: 'Lars staat met zijn kraam op de markt.' },
    { id: 'amara',   desc: 'Amara werkt in het ziekenhuis en bidt in de kerk.' },
    { id: 'noor',    desc: 'Noor studeert in het café en zoekt rust in de kerk.' },
    { id: 'thomas',  desc: 'Thomas gaat voor in de kerk.' },
    { id: 'yasmine', desc: 'Yasmine baat het café uit.' },
    { id: 'bram',    desc: 'Bram loopt elke dag dezelfde ronde langs de plekken.' }
  ]
};

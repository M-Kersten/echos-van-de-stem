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
    blurb: 'Onder alles ligt een laag van gedeelde plekken. Het UMC verbindt Lars, Amara, Bram en Thomas — elk om een andere reden, geen van allen weet van de ander. De flat verbindt Amara, Thomas, Noor, Bram en Yasmine: vijf van de zes hebben er een verhaal. En de kerk trekt iedereen samen — Lars met zijn kaars, Noor met haar gewoonte, Bram met de stilte, Thomas voor het eerst terug.'
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
    { a: 'lars',   b: 'yasmine', type: 'sterk',      desc: 'Zij is zijn naamloze vaste gast; hij heeft haar jarenlang ingeschonken zonder haar naam te kennen.' },
    { a: 'amara',  b: 'lars',    type: 'sterk',      desc: 'Zij stond op de afdeling waar zijn moeder stierf, drie jaar geleden. Hij herkent haar niet.' },
    { a: 'amara',  b: 'bram',    type: 'sterk',      desc: 'De jongen aan wie Bram bijles geeft woont twee deuren van Amara; zij geeft hem te eten terwijl Bram hem wiskunde leert.' },
    { a: 'thomas', b: 'noor',    type: 'sterk',      desc: 'Hij schreef het verduurzamingsplan voor de flat; zij schrijft haar scriptie over de verdringing die dat plan veroorzaakt.' },
    { a: 'thomas', b: 'amara',   type: 'sterk',      desc: 'Zij woont in de flat waar zijn beleid over gaat; hij staat voor het eerst tegenover de mensen om wie het draait.' },

    // Sluimerende verbindingen (dun, gestippeld) — zelf te ontdekken
    { a: 'lars',    b: 'noor',  type: 'sluimerend', desc: 'Allebei steken ze kaarsen op — hij voor zijn moeder, zij thuis zonder uitleg — en ze weten het allebei niet van elkaar.' },
    { a: 'bram',    b: 'lars',  type: 'sluimerend', desc: 'Bram won ooit een geloofsdiscussie en voelde zich leeg; Lars vraagt nooit iets, maar bewaart alles wat mensen hem toevertrouwen.' },
    { a: 'yasmine', b: 'amara', type: 'sluimerend', desc: 'Allebei groot geworden in Overvecht, allebei gewend om voor anderen klaar te staan en zelf niets te vragen.' },
    { a: 'noor',    b: 'amara', type: 'sluimerend', desc: 'Noor flyerde over sloopplannen in de wijk waar Amara woont; ze kwamen elkaar bijna tegen.' }
  ],

  // Dunne lijn van elk personage naar de gedeelde plekken.
  centerLinks: [
    { id: 'lars',    desc: 'Het UMC, waar zijn moeder stierf, en de kerk, waar hij een kaars opsteekt.' },
    { id: 'amara',   desc: 'Het UMC waar ze werkt, de flat waar ze woont, en de kerk.' },
    { id: 'noor',    desc: 'De flat en de wijk eromheen, en de kerk — uit gewoonte.' },
    { id: 'thomas',  desc: 'Het UMC, de flat waar zijn beleid over gaat, en de kerk, waar hij voor het eerst terugkeert.' },
    { id: 'yasmine', desc: 'De flat, en de kerk die iedereen samentrekt.' },
    { id: 'bram',    desc: 'Het UMC, de flat, en de kerk, waar hij de stilte zoekt.' }
  ]
};

/*
 * Echo's van de Stem — verbindingsweb
 * -----------------------------------
 * Pas dit bestand aan om de personages, hun omschrijvingen en de verbindingen
 * te wijzigen. De teksten hieronder zijn VOORBEELDEN — vervang ze door de
 * echte verhaallijnen van het spel.
 *
 * - `characters`: de zes personages, met de volgorde waarin ze (met de klok mee)
 *   in de cirkel komen te staan.
 * - `links`: verbindingen tussen personages.
 *      type: 'sterk'       -> dikke doorgetrokken lijn (actief in het spel)
 *            'sluimerend'  -> dunne gestippelde lijn (zelf te ontdekken)
 */
window.CONNECTIONS_CONFIG = {
  intro: 'Tik op een personage om zijn of haar verbindingen op te lichten, of tik op een lijn om te lezen wat die verbinding inhoudt.',

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
  ]
};

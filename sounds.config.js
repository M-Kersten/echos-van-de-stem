/*
 * Echo's van de Stem — geluidsconfiguratie
 * ----------------------------------------
 * Dit is het ENIGE bestand dat je hoeft aan te passen om de geluiden te wijzigen.
 *
 * Elke clip verwijst naar een bestand in de map /audio. Je geeft het pad op
 * ZONDER de bestandsextensie (de extensie uit `audioFormat` wordt er voor je
 * achter gezet). Het item  file: 'marketplace/rain'  met  audioFormat: 'mp3'
 * laadt bijvoorbeeld  audio/marketplace/rain.mp3
 *
 * Wil je een geluid vervangen? Zet dan een nieuw bestand met dezelfde naam in
 * de juiste map. Een geluid toevoegen? Voeg een regel toe aan de `effects`-lijst.
 *
 * Zolang je nog geen eigen opnamen hebt toegevoegd, speelt de app zachte
 * plaatsvervangende tonen, zodat de soundboard meteen bruikbaar is. Zodra je
 * audiobestanden klaarstaan kun je `synthFallback` aan laten staan (de tonen
 * klinken dan alleen voor ontbrekende bestanden) of op false zetten.
 */
window.SOUND_CONFIG = {
  audioFormat: 'mp3',     // extensie van elke clip (bijv. 'mp3', 'ogg', 'm4a')
  fadeMs: 1800,           // duur van het in- en uitfaden van de achtergrond, in milliseconden
  synthFallback: true,    // speel een zachte plaatsvervangende toon als een audiobestand ontbreekt

  locations: [
    {
      id: 'marketplace',
      name: 'De Markt',
      icon: 'market',
      blurb: 'Stadsgeluiden van een drukke dag op het Vredenburgplein',
      ambient: { label: 'Drukke markt Utrecht', file: 'marketplace/ambient' },
      effects: [
        { label: 'Regen',                     file: 'marketplace/rain' },
        { label: 'Fietsbel',                  file: 'marketplace/bicycle-bell' },
        { label: 'Pratende mensen',           file: 'marketplace/dutch-conversation' },
        { label: 'Kerkbellen in de verte',    file: 'marketplace/distant-church-bells' },
        { label: 'Voetstappen',               file: 'marketplace/footsteps' },
        { label: 'Luide verkoper',            file: 'marketplace/vendor-call' }
      ]
    },
    {
      id: 'cafe',
      name: 'Het Café',
      icon: 'cafe',
      blurb: 'Warm cafe in de avond, gezelligheid en drukte alom',
      ambient: { label: 'Gezellige geluiden', file: 'cafe/ambient' },
      effects: [
        { label: 'Espresso machine',  file: 'cafe/espresso-machine' },
        { label: 'Servies',           file: 'cafe/cups-and-plates' },
        { label: 'Rustig gesprek',    file: 'cafe/quiet-chatter' },
        { label: 'Openslaande deur',  file: 'cafe/door-opening' },
        { label: 'Live muziek',       file: 'cafe/music' },
        { label: 'Proost',            file: 'cafe/Cheers' }
      ]
    },
    {
      id: 'hospital',
      name: 'Het UMC Ziekenhuis',
      icon: 'hospital',
      blurb: 'Stille gangen, wachtruimte',
      ambient: { label: 'Rustige ziekenhuis geluiden', file: 'hospital/ambient' },
      effects: [
        { label: 'Hartritme monitor',     file: 'hospital/heart-monitor' },
        { label: 'Bed op wielen',         file: 'hospital/rolling-cart' },
        { label: 'Omroep in de verte',    file: 'hospital/announcement' },
        { label: 'Openslaande deuren',    file: 'hospital/door-opening' },
        { label: 'Hoesten',               file: 'hospital/cough' },
        { label: 'Voetstappen',           file: 'hospital/footsteps' }
      ]
    },
    {
      id: 'flat',
      name: 'Het Appartement',
      icon: 'flat',
      blurb: 'Hoogbouw appartement in Overvecht',
      ambient: { label: 'Rustige stadsgeluiden', file: 'flat/ambient' },
      effects: [
        { label: 'Mensen in discussie',     file: 'flat/discussion' },
        { label: 'Telefoon rinkelt',         file: 'flat/phone-vibration' },
        { label: 'Deurbel',                 file: 'flat/doorbell' },
        { label: 'Wasmachine',              file: 'flat/washing-machine' },
        { label: 'Rennende kinderen',           file: 'flat/running-kids' },
        { label: 'Hard waaiende wind',      file: 'flat/wind-blowing' }
      ]
    },
    {
      id: 'church',
      name: 'De Kerk',
      icon: 'church',
      blurb: 'Een avonddienst in de kerk',
      ambient: { label: 'Zacht geluid van gebed in grote kerkzaal', file: 'church/ambient' },
      effects: [
        { label: 'Orgel muziek',              file: 'church/organ' },
        { label: 'Bijbel bladzijde om',       file: 'church/pages-turning' },
        { label: 'Kaars wakkert',             file: 'church/prayer-voices' },
        { label: 'Kerkbellen',                file: 'church/church-bells' },
        { label: 'Hout bankje kraakt',        file: 'church/pew-creak' },
        { label: 'Koor',                      file: 'church/choir' }
      ]
    }
  ]
};

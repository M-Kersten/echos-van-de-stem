/*
 * Echoes of the Voice — sound configuration
 * ------------------------------------------
 * This is the ONLY file you need to edit to change the sounds.
 *
 * Each clip points to a file inside the /audio folder. You give the path
 * WITHOUT the file extension (the extension from `audioFormat` is added for
 * you). For example, the entry  file: 'marketplace/rain'  with
 * audioFormat: 'mp3'  will load  audio/marketplace/rain.mp3
 *
 * To replace a sound, simply drop a new file with the matching name into the
 * right folder. To add a sound, add a new line to the `effects` list.
 *
 * Until you add your own recordings, the app plays gentle placeholder tones
 * so the soundboard is fully usable straight away. Once your audio files are
 * in place you can leave `synthFallback` on (it only triggers for files that
 * are missing) or set it to false to disable placeholders entirely.
 */
window.SOUND_CONFIG = {
  audioFormat: 'mp3',     // file extension used for every clip (e.g. 'mp3', 'ogg', 'm4a')
  fadeMs: 1800,           // ambient fade-in / fade-out duration, in milliseconds
  synthFallback: true,    // play a soft placeholder tone when an audio file is missing

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
        { label: 'Voetstappen',               file: 'church/footsteps' }
      ]
    }
  ]
};

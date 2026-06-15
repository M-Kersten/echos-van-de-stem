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
      name: 'Marketplace',
      dutch: 'De Markt',
      icon: 'market',
      blurb: 'Stalls and footsteps beneath the Dom tower.',
      ambient: { label: 'Busy Utrecht market', file: 'marketplace/ambient' },
      effects: [
        { label: 'Rain',                    file: 'marketplace/rain' },
        { label: 'Bicycle bell',            file: 'marketplace/bicycle-bell' },
        { label: 'Passing conversation',    file: 'marketplace/dutch-conversation' },
        { label: 'Distant church bells',    file: 'marketplace/distant-church-bells' },
        { label: 'Footsteps',               file: 'marketplace/footsteps' },
        { label: 'Vendor calling',          file: 'marketplace/vendor-call' }
      ]
    },
    {
      id: 'hospital',
      name: 'Hospital',
      dutch: 'Het Ziekenhuis',
      icon: 'hospital',
      blurb: 'Quiet corridors and the hush of waiting.',
      ambient: { label: 'Quiet hospital ambience', file: 'hospital/ambient' },
      effects: [
        { label: 'Heart monitor',           file: 'hospital/heart-monitor' },
        { label: 'Rolling cart',            file: 'hospital/rolling-cart' },
        { label: 'Distant announcement',    file: 'hospital/announcement' },
        { label: 'Door opening',            file: 'hospital/door-opening' },
        { label: 'Cough',                   file: 'hospital/cough' },
        { label: 'Footsteps',               file: 'hospital/footsteps' }
      ]
    },
    {
      id: 'cafe',
      name: 'Café',
      dutch: 'Het Café',
      icon: 'cafe',
      blurb: 'Warm light, soft talk, the smell of coffee.',
      ambient: { label: 'Cozy café ambience', file: 'cafe/ambient' },
      effects: [
        { label: 'Espresso machine',        file: 'cafe/espresso-machine' },
        { label: 'Cups and plates',         file: 'cafe/cups-and-plates' },
        { label: 'Quiet chatter',           file: 'cafe/quiet-chatter' },
        { label: 'Door opening',            file: 'cafe/door-opening' },
        { label: 'Cash register',           file: 'cafe/cash-register' },
        { label: 'Spoon stirring',          file: 'cafe/spoon-stirring' }
      ]
    },
    {
      id: 'flat',
      name: 'Flat',
      dutch: 'Het Appartement',
      icon: 'flat',
      blurb: 'A small home, quiet and close.',
      ambient: { label: 'Small apartment ambience', file: 'flat/ambient' },
      effects: [
        { label: 'Kettle boiling',          file: 'flat/kettle' },
        { label: 'Phone vibration',         file: 'flat/phone-vibration' },
        { label: 'Doorbell',                file: 'flat/doorbell' },
        { label: 'Washing machine',         file: 'flat/washing-machine' },
        { label: 'Clock ticking',           file: 'flat/clock-ticking' },
        { label: 'Rain on the window',      file: 'flat/rain-window' }
      ]
    },
    {
      id: 'church',
      name: 'Church',
      dutch: 'De Kerk',
      icon: 'church',
      blurb: 'Stone, candlelight, and reverent stillness.',
      ambient: { label: 'Reverent church atmosphere', file: 'church/ambient' },
      effects: [
        { label: 'Organ music',             file: 'church/organ' },
        { label: 'Pages turning',           file: 'church/pages-turning' },
        { label: 'Soft prayer voices',      file: 'church/prayer-voices' },
        { label: 'Church bells',            file: 'church/church-bells' },
        { label: 'Wooden pew creak',        file: 'church/pew-creak' },
        { label: 'Footsteps',               file: 'church/footsteps' }
      ]
    }
  ]
};

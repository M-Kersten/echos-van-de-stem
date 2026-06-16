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
  // `blurb` mag een string zijn of een lijst van alinea's.
  // `icon` is optioneel: pad naar een (bij voorkeur vierkante) PNG, die rond
  // wordt geknipt in de knoop. Laat het bestaan in de map /images. Ontbreekt de
  // foto nog, dan toont de knoop gewoon een cirkel.
  characters: [
    {
      id: 'lars', name: 'Lars', icon: 'images/lars.jpeg',
      blurb: [
        "Je staat negentien jaar achter de bar van café De Rechtbank, aan de Oudegracht, en je hebt de buurt zien veranderen van een kroeg voor stamgasten naar iets waar ook studenten en toeristen op afkomen. Je kent je vaste gasten bij naam en je hebt een goed geheugen voor verhalen, een slecht geheugen voor afspraken.",
        "Thuis is er Tim, je zoon van twaalf, half bij jou en half bij zijn moeder. Het ging uit elkaar zonder veel drama, ze appen nog over schoolspullen en voetbal. Je broer Rick belt vooral als er iets stuk is, want jij bent handig in projectjes in huis. Rick is sinds een tijdje lid geworden van een evangelisch clubje en lijkt nu echt gelukkig, maar dat is te zweverig voor jou om serieus te nemen. Je support FC Utrecht zonder er nog veel van te verwachten.",
        "Op je vrije dag fiets je soms zomaar de stad uit. Je sust een dronken ruzie met één zin en je timet een grap tot op de seconde. Wat mensen je toevertrouwen, vergeet je nooit."
      ]
    },
    {
      id: 'amara', name: 'Amara', icon: 'images/amara.jpeg',
      blurb: [
        "Je kwam bijna twintig jaar geleden naar Nederland. In je geboorteland was je verpleegkundige, maar je diploma werd hier nooit erkend, en nu maak je 's ochtends het ziekenhuis schoon waar je had kunnen werken. Je kent de verpleegkundigen bij naam en zij jou. Je handen staan nooit stil, en je vindt rust in werk dat af is. Je woont in Overvecht, een flat op de zesde etage met uitzicht op de Zambesidreef. Je hebt een dochter van acht. Ze is bij je moeder ver weg in Asmara. Elke zondag bel je via WhatsApp.",
        "Je gelooft in God op een manier die je niet hoeft uit te leggen. Je praat ook met je overleden grootmoeder, niet als gebed maar als gesprek, gewoon hardop in de keuken. De Nederlandse eenzaamheid begrijp je moeilijk. Al die mensen die naast elkaar leven zonder elkaar te kennen. Soms vraag je je buren hoe het gaat en dan zie je dat ze daar even niet goed raad mee weten. Dat vind je verdrietig."
      ]
    },
    {
      id: 'noor', name: 'Noor', icon: 'images/noor.jpeg',
      blurb: [
        "Je studeert Sociale Geografie aan de UU, vierde jaar, en loopt stage bij een woningcorporatie in Overvecht en schrijft ondertussen een scriptie over verdringingsprocessen in de wijk. Veel vergaderen, weinig dat verandert, en dat vreet aan je. Je woont met vier anderen aan de Amsterdamsestraatweg, en op donderdag kook je voor het hele huis, je favoriete avond van de week. Je eet geen vlees, niet om er een punt van te maken, het voelt gewoon logisch.",
        "Je weet wanneer je huisgenoten tentamens hebben en wie even een arm om zich heen nodig heeft. Je zet je altijd in tegen onrecht, dat zat al in je als kind en je weet niet waar het vandaan komt. Je demonstreert nog, minder dan vroeger. 's Avonds laat, als het huis slaapt, kun je zomaar een uur naar niets zitten kijken. Je zou zeggen dat het goed met je gaat, en grotendeels is dat ook zo."
      ]
    },
    {
      id: 'thomas', name: 'Thomas', icon: 'images/thomas.jpeg',
      blurb: [
        "Je bent beleidsadviseur klimaat en duurzaamheid bij de gemeente Utrecht. Je schrijft nota's die worden afgezwakt en rapporten die in een la belanden, maar schrijft ze toch, jaar in jaar uit. Je bent de stille kracht die reorganisaties overleeft.",
        "Liesbeth en jij zijn al lang getrouwd, met twee kinderen van negen en twaalf wonen jullie in een rijtjeshuis in Tuindorp. Je dochter wint elke discussie aan tafel, en je laat haar graag winnen. Je houdt een moestuin bij en weet precies wanneer de tomaten geplukt moeten worden. Tijdens het wieden staat de radio aan.",
        "Je groeide op in een gereformeerd gezin in Zeist en stopte rond je negentiende, zonder dat er iets gebeurd was. Het paste gewoon niet meer. Je fietst elke ochtend naar werk om langs de Dom omdat dat gewoon goed voelt. Je zegt niet snel wat je echt vindt, ook niet thuis. Wie geduld heeft, hoort het tussen de regels door."
      ]
    },
    {
      id: 'yasmine', name: 'Yasmine', icon: 'images/yasmine.jpeg',
      blurb: [
        "Je bent tweeëntwintig en je weet nog niet welke kant het op moet. Je had al drie keer wat anders willen worden en je hebt een studie half afgemaakt. Nu werk je parttime in een kledingwinkel, truien vouwen vindt je daar rustgevend maar de muziek is er verschrikkelijk.",
        "Je bent makkelijk in de omgang en gaat mee met de plannen van anderen, want zelf iets bedenken kost meer. Je groeide op in Overvecht en je kent de stad op een manier die je niet vaak laat zien. Je luistert beter dan mensen denken. In een groep ben je degene die de drankjes haalt en onthoudt wie wat wilde. Als iemand vraagt hoe het met je gaat, zeg je dat het goed gaat, en dan praat je over iets anders. Soms is dat waar. Niemand maakt zich zorgen om jou, en dat bevalt je, meestal."
      ]
    },
    {
      id: 'bram', name: 'Bram', icon: 'images/bram.jpeg',
      blurb: [
        "Je bent eenendertig, data-analist, en je woont in Lombok boven een fietsenmaker. Als kind haalde je dingen uit elkaar om te zien hoe ze werkten, en niet alles kreeg je weer in elkaar. Je werk is precies en je ziet patronen waar anderen ruis zien. Buiten je werk sleep je diezelfde precisie mee, soms tot ergernis van je vrienden, die je toch bellen als ze iets willen weten of als er iets stuk is.",
        "Je bent eerder droog dan warm, maar wie je beter kent weet dat het andersom ligt. Op zondag kook je uren aan één gerecht dat in twintig minuten op is. Je verzamelt feiten die nergens toe dienen. Je houdt van koormuziek. Je merkt eerder dan de meeste mensen wanneer iemand zichzelf tegenspreekt, en wat je daarvan vindt zeg je niet altijd."
      ]
    }
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

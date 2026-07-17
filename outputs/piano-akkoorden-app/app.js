const chromaticLabels = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const sharpLabels = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const flatLabels = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const letters = ["C", "D", "E", "F", "G", "A", "B"];
const naturalPitch = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const whitePattern = [0, 2, 4, 5, 7, 9, 11];
const blackAfterWhite = { 0: 1, 1: 3, 3: 6, 4: 8, 5: 10 };
const keyboardWhiteNotes = [
  ...whitePattern.map((pitch) => ({ pitch, octave: 3 })),
  ...whitePattern.map((pitch) => ({ pitch, octave: 4 })),
  { pitch: 0, octave: 5 },
  { pitch: 2, octave: 5 },
  { pitch: 4, octave: 5 },
  { pitch: 5, octave: 5 },
  { pitch: 7, octave: 5 }
];
const keyboardMinAbsolute = Math.min(...keyboardWhiteNotes.map((note) => note.octave * 12 + note.pitch));
const keyboardMaxAbsolute = Math.max(...keyboardWhiteNotes.map((note) => note.octave * 12 + note.pitch));

const rootOptions = [
  { label: "C", pitch: 0, accidental: "natural" },
  { label: "C#", pitch: 1, accidental: "sharp" },
  { label: "Db", pitch: 1, accidental: "flat" },
  { label: "D", pitch: 2, accidental: "natural" },
  { label: "D#", pitch: 3, accidental: "sharp" },
  { label: "Eb", pitch: 3, accidental: "flat" },
  { label: "E", pitch: 4, accidental: "natural" },
  { label: "E#", pitch: 5, accidental: "sharp" },
  { label: "F", pitch: 5, accidental: "natural" },
  { label: "F#", pitch: 6, accidental: "sharp" },
  { label: "Gb", pitch: 6, accidental: "flat" },
  { label: "G", pitch: 7, accidental: "natural" },
  { label: "G#", pitch: 8, accidental: "sharp" },
  { label: "Ab", pitch: 8, accidental: "flat" },
  { label: "A", pitch: 9, accidental: "natural" },
  { label: "A#", pitch: 10, accidental: "sharp" },
  { label: "Bb", pitch: 10, accidental: "flat" },
  { label: "B", pitch: 11, accidental: "natural" },
  { label: "B#", pitch: 0, accidental: "sharp" }
];

const keyOptions = [
  { label: "C", pitch: 0, accidental: "natural" },
  { label: "G", pitch: 7, accidental: "sharp" },
  { label: "D", pitch: 2, accidental: "sharp" },
  { label: "A", pitch: 9, accidental: "sharp" },
  { label: "E", pitch: 4, accidental: "sharp" },
  { label: "B", pitch: 11, accidental: "sharp" },
  { label: "F#", pitch: 6, accidental: "sharp" },
  { label: "Gb", pitch: 6, accidental: "flat" },
  { label: "Db", pitch: 1, accidental: "flat" },
  { label: "Ab", pitch: 8, accidental: "flat" },
  { label: "Eb", pitch: 3, accidental: "flat" },
  { label: "Bb", pitch: 10, accidental: "flat" },
  { label: "F", pitch: 5, accidental: "flat" }
];

const scales = [
  { id: "major", name: "majeur", intervals: [0, 2, 4, 5, 7, 9, 11], degrees: ["1", "2", "3", "4", "5", "6", "7"] },
  { id: "naturalMinor", name: "natuurlijk mineur", intervals: [0, 2, 3, 5, 7, 8, 10], degrees: ["1", "2", "b3", "4", "5", "b6", "b7"] },
  { id: "harmonicMinor", name: "harmonisch mineur", intervals: [0, 2, 3, 5, 7, 8, 11], degrees: ["1", "2", "b3", "4", "5", "b6", "7"] },
  { id: "melodicMinor", name: "melodisch mineur", intervals: [0, 2, 3, 5, 7, 9, 11], degrees: ["1", "2", "b3", "4", "5", "6", "7"] },
  { id: "majorPentatonic", name: "majeur pentatonisch", intervals: [0, 2, 4, 7, 9], degrees: ["1", "2", "3", "5", "6"] },
  { id: "minorPentatonic", name: "mineur pentatonisch", intervals: [0, 3, 5, 7, 10], degrees: ["1", "b3", "4", "5", "b7"] },
  { id: "blues", name: "blues", intervals: [0, 3, 5, 6, 7, 10], degrees: ["1", "b3", "4", "b5", "5", "b7"] }
];

const fifthsCircle = [
  { label: "C", aliases: ["C"] },
  { label: "G", aliases: ["G"] },
  { label: "D", aliases: ["D"] },
  { label: "A", aliases: ["A"] },
  { label: "E", aliases: ["E"] },
  { label: "B", aliases: ["B"] },
  { label: "F#/Gb", aliases: ["F#", "Gb"] },
  { label: "Db", aliases: ["Db", "C#"] },
  { label: "Ab", aliases: ["Ab", "G#"] },
  { label: "Eb", aliases: ["Eb", "D#"] },
  { label: "Bb", aliases: ["Bb", "A#"] },
  { label: "F", aliases: ["F"] }
];

const scaleVideos = {
  "C|major": "https://app.nootstudio.nl/wp-content/uploads/2026/07/C-majeur-toonladder-_-rechterhand.mp4",
  "G|major": "https://app.nootstudio.nl/wp-content/uploads/2026/07/G-majeur-toonladder-_-rechterhand.mp4",
  "D|major": "https://app.nootstudio.nl/wp-content/uploads/2026/07/D-majeur-toonladder-_-rechterhand.mp4",
  "A|major": "https://app.nootstudio.nl/wp-content/uploads/2026/07/A-majeur-toonladder-_-rechterhand.mp4",
  "E|major": "https://app.nootstudio.nl/wp-content/uploads/2026/07/E-majeur-toonladder-_-rechterhand.mp4",
  "B|major": "https://app.nootstudio.nl/wp-content/uploads/2026/07/B-majeur-toonladder-_-rechterhand.mp4",
  "F#|major": "https://youtu.be/ZdyBtt8OGRw",
  "Gb|major": "https://app.nootstudio.nl/wp-content/uploads/2026/07/Gb-majeur-toonladder-_-rechterhand.mp4",
  "Db|major": "https://app.nootstudio.nl/wp-content/uploads/2026/07/Db-majeur-toonladder-_-rechterhand.mp4",
  "Ab|major": "https://app.nootstudio.nl/wp-content/uploads/2026/07/Ab-majeur-toonladder-_-rechterhand.mp4",
  "Eb|major": "https://app.nootstudio.nl/wp-content/uploads/2026/07/Eb-majeur-toonladder-_-rechterhand.mp4",
  "Bb|major": "https://app.nootstudio.nl/wp-content/uploads/2026/07/Bb-majeur-toonladder-_-rechterhand.mp4",
  "F|major": "https://app.nootstudio.nl/wp-content/uploads/2026/07/F-majeur-toonladder-_-rechterhand.mp4"
};

const qualities = [
  { id: "maj", name: "majeur", symbol: "", intervals: [0, 4, 7], degrees: ["1", "3", "5"] },
  { id: "min", name: "mineur", symbol: "m", intervals: [0, 3, 7], degrees: ["1", "b3", "5"] },
  { id: "dim", name: "verminderd", symbol: "dim", intervals: [0, 3, 6], degrees: ["1", "b3", "b5"] },
  { id: "aug", name: "overmatig", symbol: "aug", intervals: [0, 4, 8], degrees: ["1", "3", "#5"] },
  { id: "sus2", name: "sus2", symbol: "sus2", intervals: [0, 2, 7], degrees: ["1", "2", "5"] },
  { id: "sus4", name: "sus4", symbol: "sus4", intervals: [0, 5, 7], degrees: ["1", "4", "5"] },
  { id: "maj7", name: "majeur 7", symbol: "maj7", intervals: [0, 4, 7, 11], degrees: ["1", "3", "5", "7"] },
  { id: "7", name: "dominant 7", symbol: "7", intervals: [0, 4, 7, 10], degrees: ["1", "3", "5", "b7"] },
  { id: "min7", name: "mineur 7", symbol: "m7", intervals: [0, 3, 7, 10], degrees: ["1", "b3", "5", "b7"] },
  { id: "m7b5", name: "half verminderd", symbol: "m7b5", intervals: [0, 3, 6, 10], degrees: ["1", "b3", "b5", "b7"] },
  { id: "dim7", name: "verminderd 7", symbol: "dim7", intervals: [0, 3, 6, 9], degrees: ["1", "b3", "b5", "bb7"] },
  { id: "6", name: "majeur 6", symbol: "6", intervals: [0, 4, 7, 9], degrees: ["1", "3", "5", "6"] },
  { id: "min6", name: "mineur 6", symbol: "m6", intervals: [0, 3, 7, 9], degrees: ["1", "b3", "5", "6"] },
  { id: "add9", name: "add9", symbol: "add9", intervals: [0, 4, 7, 14], degrees: ["1", "3", "5", "9"] },
  { id: "9", name: "dominant 9", symbol: "9", intervals: [0, 4, 7, 10, 14], degrees: ["1", "3", "5", "b7", "9"] },
  { id: "maj9", name: "majeur 9", symbol: "maj9", intervals: [0, 4, 7, 11, 14], degrees: ["1", "3", "5", "7", "9"] },
  { id: "min9", name: "mineur 9", symbol: "m9", intervals: [0, 3, 7, 10, 14], degrees: ["1", "b3", "5", "b7", "9"] }
];

const state = {
  root: rootOptions[0],
  libraryRoot: rootOptions[0],
  key: keyOptions[0],
  scale: scales[0],
  quality: qualities[0],
  inversion: 0,
  mode: "notes",
  selectedRootAbsolute: null,
  chordActive: false,
  chordMode: "browse",
  searchNotes: [],
  selectedInspirationSong: null,
  selectedInspirationLabel: null,
  selectedModulationChord: null,
  chordSequence: [],
  selectedSongTransposeKey: null,
  pendingKeyboardFocus: false,
  libraryOpen: false,
  isAdmin: false,
  currentUserEmail: "",
  schemaEditMode: false
};

function defaultSongSections() {
  return [
    { id: "intro", title: "Intro", chords: "" },
    { id: "verse", title: "Verse", chords: "" },
    { id: "preChorus", title: "Pre Chorus", chords: "" },
    { id: "chorus", title: "Chorus", chords: "" },
    { id: "bridge", title: "Bridge", chords: "" },
    { id: "solo", title: "Solo", chords: "" },
    { id: "break", title: "Break", chords: "" },
    { id: "outro", title: "Outro", chords: "" }
  ];
}

const songState = {
  title: "",
  artist: "",
  key: keyOptions[0],
  scale: scales[0],
  meter: "4/4",
  bpm: 84,
  startVoicing: "low",
  view: "edit",
  order: ["intro", "verse", "chorus"],
  sections: defaultSongSections()
};

const inspirationState = {
  offset: 0,
  query: "",
  sort: "title",
  favoritesOnly: false
};

const customState = {
  title: "",
  artist: "",
  key: keyOptions[0],
  scale: scales[0],
  root: rootOptions[0],
  quality: qualities[0],
  inversion: 0,
  zoom: 1,
  chords: [],
  selectedIndex: null,
  isPrinting: false
};

const userSongStorageKey = "nootstudioPianoAkkoordenSongs";
const hiddenSongStorageKey = "nootstudioPianoAkkoordenHiddenSongs";
const favoriteSongStorageKey = "nootstudioPianoAkkoordenFavorites";
const studentCodeStorageKey = "nootstudioPianoAkkoordenStudentCode";
const mediaDatabaseName = "nootstudioPianoAkkoordenMedia";
const mediaStoreName = "media";
const remoteConfig = window.NOOTSTUDIO_CONFIG || {};
let authAccessToken = "";

let songInspirations = {
  major: {
    C: [
      {
        title: "Can't stop loving you",
        artist: "Phil Collins",
        style: "Pop",
        year: "2002",
        level: "Beginner",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Phil_Collins%2C_2025_for_%22Eras%22_%28cropped%29.jpg/250px-Phil_Collins%2C_2025_for_%22Eras%22_%28cropped%29.jpg",
        meter: "4/4",
        sections: [
          { title: "Intro", key: "C", measures: [["C"], ["G"], ["Am"], ["Fsus2"]] },
          { title: "Verse", key: "C", measures: [["C"], ["G"], ["Am"], ["Em"], ["Fsus2"], ["G"], ["Fsus2"], ["G"], ["C"], ["G"], ["Am"], ["Em"], ["Fsus2"], ["G"], ["Fsus2"], ["G", "G#dim"], ["Am"], ["G"], ["F"]] },
          { title: "Chorus", key: "C", measures: [["C", "G"], ["F"], ["C", "G"], ["F"], ["C", "G"], ["F"], ["Bb"], ["Fsus2"]] },
          { title: "Bridge", key: "C", measures: [["Dm", "G"], ["C", "F"], ["Dm", "G"], ["C", "F"], ["Dm", "G"], ["C", "F"], ["Bb"], ["F"], ["Ab", "Ab7"], ["Ab6", "Ab7"]] },
          { title: "Verse modulatie", key: "Db", measures: [["Db"], ["Ab"], ["Bbm"], ["Fm"], ["Gbsus2"], ["Ab"], ["Gbsus2"], ["Ab", "Adim"], ["Bbm"], ["Ab"], ["Fm7", "Ab"]] },
          { title: "Chorus modulatie", key: "Db", measures: [["Db", "Ab"], ["Gb"], ["Db", "Ab"], ["Gb"], ["Db", "Ab"], ["Gb"], ["Cb"], ["Gb"], ["Gb"]] }
        ]
      },
      { title: "Piano man", artist: "Billy Joel", style: "Pop", year: "1973", level: "Beginner", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/BillyJoelHydeP070723_%2857_of_112%29_%2853031688782%29_%28cropped%29.jpg/330px-BillyJoelHydeP070723_%2857_of_112%29_%2853031688782%29_%28cropped%29.jpg" },
      { title: "What was I made for", artist: "Billie Eilish", style: "Pop", year: "2023", level: "Beginner", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/BillieEilishO2140725-39_-_54665577407_%28cropped%29.jpg/330px-BillieEilishO2140725-39_-_54665577407_%28cropped%29.jpg" },
      {
        title: "When I was your man",
        artist: "Bruno Mars",
        style: "Pop",
        year: "2012",
        level: "Beginner",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BrunoMars24KMagicWorldTourLive_%28cropped%29.jpg/330px-BrunoMars24KMagicWorldTourLive_%28cropped%29.jpg",
        meter: "4/4",
        sections: [
          { title: "Intro", key: "C", meter: "4/4", measures: [["D7", "Dm7"], ["C"], ["D7", "Dm7"], { nav: ["segno"], chords: ["C", "G/B"] }] },
          { title: "Verse 1", key: "C", meter: "4/4", measures: [["Am", "C"], ["Dm"], ["G", "G7"], ["C", "Em/B"], ["Am", "C"], ["Dm"], ["G"], ["C", "C/B"]] },
          { title: "Pre Chorus 1", key: "C", meter: "4/4", measures: [["Am"], ["Em"], ["Bb"], ["C/G", "G"]] },
          { title: "Chorus 1", key: "C", meter: "4/4", measures: [["F", "G"], ["C"], ["F", "G"], ["C"], ["F", "G"], ["Am", "D7"], { nav: ["toCoda"], chords: ["F", "Fm"] }, ["C", "F"], { nav: ["dsAlCoda"], chords: ["C", "Em/B"] }, { nav: ["coda"], chords: ["C"] }] },
          { title: "Bridge", key: "C", meter: "4/4", measures: [["F"], ["G"], ["C", "G/B"], ["Am", "Em/G"], ["D7"], ["Dm7"], ["G"], ["G"]] },
          { title: "Chorus 2", key: "C", meter: "4/4", measures: [["F", "G"], ["C"], ["F", "G"], ["C"], ["F", "G"], ["Am", "D7"], ["F", "Fm"], ["C", "D7"], ["F", "Fm"], ["C"], ["C"]] }
        ]
      },
      { title: "Don't look back in anger", artist: "Oasis", style: "Pop", year: "1996", level: "Beginner", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Oasis_-_Principality_Stadium%2C_Cardiff_-_Friday_4th_July_2025_member_collage.jpg/330px-Oasis_-_Principality_Stadium%2C_Cardiff_-_Friday_4th_July_2025_member_collage.jpg" },
      {
        title: "Waterdicht",
        artist: "Hannah Mae",
        style: "Pop",
        year: "2023",
        level: "Beginner",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Hannah_Mae_-_Zuiderpark_Den_Haag_2022_%28cropped%29.jpg/250px-Hannah_Mae_-_Zuiderpark_Den_Haag_2022_%28cropped%29.jpg",
        meter: "4/4",
        sections: [
          { title: "Intro", key: "C", meter: "4/4", measures: [["F"], ["Am"], ["C"], ["G"]] },
          { title: "Verse 1", key: "C", meter: "4/4", measures: [["F"], ["Am"], ["C"], ["G"], ["F"], ["Am"], ["C"], ["G"], ["F"], ["Am"], ["C"], ["G"], ["Dm"], ["C"], ["F"], ["G"]] },
          { title: "Chorus 1", key: "C", meter: "4/4", measures: [["F"], ["Am"], ["C"], ["G"], ["F"], ["Am"], ["C"], ["G"], ["F"], ["Am"], ["C"], ["G"], ["F"], ["Am"], ["C"], ["G"], ["F"], ["Am"], ["C"], ["G"]] },
          { title: "Verse 2", key: "C", meter: "4/4", measures: [["F"], ["Am"], ["C"], ["G"], ["F"], ["Am"], ["C"], ["G"], ["Dm"], ["C"], ["F"]] },
          { title: "Chorus 2", key: "C", meter: "4/4", measures: [["G"], ["F"], ["Am"], ["C"], ["G"], ["F"], ["Am"], ["C"], ["G"], ["F"], ["Am"], ["C"], ["G"], ["F"], ["Am"], ["C"], ["G"], ["F"], ["Am"], ["C"], ["G"], ["F"], ["Am"], ["C"], ["G"], ["F"], ["Am"], ["C"], ["G"]] },
          { title: "Outro", key: "C", meter: "4/4", measures: [["F"], ["Am"], ["C"], ["G"], ["G"]] }
        ]
      },
      {
        title: "Arcade",
        artist: "Duncan Laurence",
        style: "Pop",
        year: "2019",
        level: "Beginner",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Duncan_Laurence_with_the_2019_Eurovision_Trophy_%28cropped%29.jpg/250px-Duncan_Laurence_with_the_2019_Eurovision_Trophy_%28cropped%29.jpg",
        meter: "3/4",
        sections: [
          { title: "Intro", key: "C", meter: "3/4", measures: [["F", "G", "Em"], ["F"], ["F", "G", "Em"], ["F"]] },
          { title: "Verse 1", key: "C", meter: "3/4", measures: [["F", "G", "Em"], ["F"], ["F", "G", "Em"], ["F"], ["F", "G", "Em"], ["F"], ["F", "G", "Em"], ["F"], ["F", "G", "Em"], ["F"], ["F", "G", "Em"], ["F"], ["F", "G", "Em"], ["F"], ["N.C."], ["N.C."]] },
          { title: "Pre Chorus 1", key: "C", meter: "4/4", measures: [["F", "G"], ["Am", "G"], ["Fmaj7", "G"], ["Dm"]] },
          { title: "Chorus 1", key: "C", meter: "4/4", measures: [["Am", "G"], ["C", "F"], ["Am", "G"], ["Fmaj7"], { meter: "2/4", chords: ["N.C."] }] },
          { title: "Verse 2", key: "C", meter: "3/4", measures: [["F", "G", "Em"], ["F"], ["F", "G", "Em"], ["F"], ["F", "G", "Em"], ["F"], ["F", "G", "Em"], ["F"]] },
          { title: "Chorus 2", key: "C", meter: "4/4", measures: [["Am", "G"], ["C", "F"], ["Am", "G"], ["Fmaj7"], ["Am", "G"], ["C", "F"], ["Am", "G"], ["Fmaj7"]] },
          { title: "Bridge", key: "C", meter: "4/4", measures: [["Dm", "C"], ["G"], ["C", "C"], ["Fmaj7"]] },
          { title: "Chorus 3", key: "C", meter: "4/4", measures: [["Am", "G"], ["C", "F"], ["Am", "G"], ["Fmaj7"], ["Am", "G"], ["C", "F"], ["Am", "G"], ["Fmaj7"], { meter: "2/4", chords: ["N.C."] }] },
          { title: "Outro", key: "C", meter: "3/4", measures: [["F", "G", "Em"], ["F"], ["F", "G", "Em"], ["F"]] }
        ]
      },
      {
        title: "Dat heb jij gedaan",
        artist: "Meau",
        style: "Pop",
        year: "2021",
        level: "Beginner",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/MEAU_%282022%29.jpg/250px-MEAU_%282022%29.jpg",
        meter: "4/4",
        sections: [
          { title: "Intro", key: "C", meter: "4/4", measures: [["Am"], ["F"], ["C"], ["G"]] },
          { title: "Verse 1", key: "C", meter: "4/4", measures: [["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["G"]] },
          { title: "Chorus 1", key: "C", meter: "4/4", measures: [["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"]] },
          { title: "Break 1", key: "C", meter: "4/4", measures: [["Am"], ["F"], ["C"], ["G"]] },
          { title: "Verse 2", key: "C", meter: "4/4", measures: [["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["G"]] },
          { title: "Chorus 2", key: "C", meter: "4/4", measures: [["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"]] },
          { title: "Break 2", key: "C", meter: "4/4", measures: [["Am"], ["F"], ["C"], ["G"]] },
          { title: "Bridge", key: "C", meter: "4/4", measures: [["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["G"]] },
          { title: "Chorus 3", key: "C", meter: "4/4", measures: [["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"]] },
          { title: "Outro", key: "C", meter: "4/4", measures: [["Am"], ["F"], ["C"], ["G"]] }
        ]
      },
      {
        title: "Stay with me",
        artist: "Sam Smith",
        style: "Pop",
        year: "2014",
        level: "Beginner",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/SamSmith-byPhilipRomano.jpg/330px-SamSmith-byPhilipRomano.jpg",
        meter: "4/4",
        sections: [
          { title: "Intro", key: "C", meter: "4/4", measures: [["Am7", "F", "C"], ["C"], ["Am7", "F", "C"], ["C"]] },
          { title: "Verse", key: "C", meter: "4/4", measures: [["Am7", "F", "C"], ["C"], ["Am7", "F", "C"], ["C"], ["Am7", "F", "C"], ["C"], ["Am7", "Gsus4", "C"], ["C"]] },
          { title: "Chorus", key: "C", meter: "4/4", measures: [["Am", "F", "C"], ["C"], ["Am", "F", "C"], ["C"], ["Am", "F", "C"], ["C", "G#dim"], ["Am", "F", "C"], ["C"]] }
        ]
      },
      {
        title: "Always remember us this way",
        artist: "Lady Gaga",
        style: "Pop",
        year: "2018",
        level: "Beginner",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Lady_Gaga_at_Joe_Biden%27s_inauguration_(cropped).jpg",
        meter: "4/4",
        sections: [
          { title: "Intro", key: "C", meter: "4/4", measures: [["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"]] },
          { title: "Verse 1", key: "C", meter: "4/4", measures: [["F"], ["C"], ["Am"], [{ token: "G", beats: 2 }, "Gsus4", "G"], [{ token: "F", beats: 1 }, { token: "G", beats: 0.5 }, { token: "Am", beats: 2.5 }], [{ token: "F", beats: 1 }, { token: "G", beats: 0.5 }, { token: "C", beats: 2.5 }], [{ token: "F", beats: 2 }, { token: "G", beats: 2 }], ["C"]] },
          { title: "Verse 2", key: "C", meter: "4/4", measures: [["Am"], ["F"], ["C"], ["G"], ["Am"], ["F"], ["C"], ["G"]] },
          { title: "Chorus 1", key: "C", meter: "4/4", measures: [["F"], ["C"], ["Am"], [{ token: "G", beats: 2 }, "Gsus4", "G"], [{ token: "F", beats: 1 }, { token: "G", beats: 0.5 }, { token: "Am", beats: 2.5 }], [{ token: "F", beats: 1 }, { token: "G", beats: 0.5 }, { token: "C", beats: 2.5 }], [{ token: "F", beats: 2 }, { token: "G", beats: 2 }]] },
          { title: "Bridge", key: "C", meter: "4/4", measures: [["Bb"], ["F"], ["C"], ["Bb"], ["F"], ["G"]] },
          { title: "Chorus 2", key: "C", meter: "4/4", measures: [["F"], ["C"], ["Am"], [{ token: "G", beats: 2 }, "Gsus4", "G"], [{ token: "F", beats: 1 }, { token: "G", beats: 0.5 }, { token: "Am", beats: 2.5 }], [{ token: "F", beats: 1 }, { token: "G", beats: 0.5 }, { token: "C", beats: 2.5 }], [{ token: "F", beats: 2 }, { token: "G", beats: 2 }], ["Am"], [{ token: "F", beats: 1 }, { token: "G", beats: 0.5 }, { token: "Am", beats: 2.5 }], [{ token: "F", beats: 1 }, { token: "G", beats: 0.5 }, { token: "C", beats: 2.5 }], [{ token: "F", beats: 2 }, { token: "G", beats: 2 }]] },
          { title: "Outro", key: "C", meter: "4/4", measures: [[{ token: "F", beats: 2 }, { token: "Bb", beats: 2 }], ["F"], ["C"]] }
        ]
      }
    ],
    Db: [
      { title: "A Thousand Miles", artist: "Vanessa Carlton", style: "Pop", year: "2002" },
      { title: "Fallin'", artist: "Alicia Keys", style: "Soul", year: "2001" },
      { title: "Empire State of Mind", artist: "Alicia Keys", style: "Pop/Soul", year: "2009" },
      { title: "Halo", artist: "Beyonce", style: "Pop", year: "2008" }
    ],
    D: [
      { title: "Hey Jude", artist: "The Beatles", style: "Pop/Rock", year: "1968" },
      { title: "Thinking Out Loud", artist: "Ed Sheeran", style: "Pop", year: "2014" },
      { title: "Sweet Caroline", artist: "Neil Diamond", style: "Pop", year: "1969" },
      { title: "Photograph", artist: "Ed Sheeran", style: "Pop", year: "2014" },
      { title: "Country Roads", artist: "John Denver", style: "Country", year: "1971" }
    ],
    Eb: [
      { title: "Your Song", artist: "Elton John", style: "Pop", year: "1970" },
      { title: "Someone Like You", artist: "Adele", style: "Ballad", year: "2011" },
      { title: "Easy", artist: "Commodores", style: "Soul", year: "1977" },
      { title: "Isn't She Lovely", artist: "Stevie Wonder", style: "Soul", year: "1976" }
    ],
    E: [
      { title: "Perfect", artist: "Ed Sheeran", style: "Pop", year: "2017" },
      { title: "Stand By Me", artist: "Ben E. King", style: "Soul", year: "1961" },
      { title: "I Want to Break Free", artist: "Queen", style: "Rock", year: "1984" },
      { title: "Three Little Birds", artist: "Bob Marley", style: "Reggae", year: "1977" }
    ],
    F: [
      { title: "Desperado", artist: "Eagles", style: "Country Rock", year: "1973" },
      { title: "Don't Stop Me Now", artist: "Queen", style: "Rock", year: "1978" },
      { title: "What a Wonderful World", artist: "Louis Armstrong", style: "Jazz/Pop", year: "1967" },
      { title: "You've Got a Friend", artist: "Carole King", style: "Songwriter", year: "1971" }
    ],
    "F#": [
      { title: "Fix You", artist: "Coldplay", style: "Pop/Rock", year: "2005" },
      { title: "Use Somebody", artist: "Kings of Leon", style: "Rock", year: "2008" },
      { title: "If I Ain't Got You", artist: "Alicia Keys", style: "Soul", year: "2003" },
      { title: "Yellow", artist: "Coldplay", style: "Pop/Rock", year: "2000" }
    ],
    Gb: [
      { title: "Fix You", artist: "Coldplay", style: "Pop/Rock", year: "2005" },
      { title: "Use Somebody", artist: "Kings of Leon", style: "Rock", year: "2008" },
      { title: "If I Ain't Got You", artist: "Alicia Keys", style: "Soul", year: "2003" },
      { title: "Yellow", artist: "Coldplay", style: "Pop/Rock", year: "2000" }
    ],
    G: [
      { title: "Knockin' on Heaven's Door", artist: "Bob Dylan", style: "Folk/Rock", year: "1973" },
      { title: "Brown Eyed Girl", artist: "Van Morrison", style: "Pop/Rock", year: "1967" },
      { title: "Sweet Home Alabama", artist: "Lynyrd Skynyrd", style: "Rock", year: "1974" },
      { title: "Hey Soul Sister", artist: "Train", style: "Pop", year: "2009" },
      { title: "Good Riddance", artist: "Green Day", style: "Acoustic Rock", year: "1997" }
    ],
    Ab: [
      { title: "I Will Always Love You", artist: "Whitney Houston", style: "Ballad", year: "1992" },
      { title: "All by Myself", artist: "Eric Carmen", style: "Ballad", year: "1975" },
      { title: "The Way You Look Tonight", artist: "Jerome Kern", style: "Jazz", year: "1936" },
      { title: "My Girl", artist: "The Temptations", style: "Soul", year: "1964" }
    ],
    A: [
      { title: "Someone You Loved", artist: "Lewis Capaldi", style: "Pop", year: "2018" },
      { title: "I Still Haven't Found What I'm Looking For", artist: "U2", style: "Rock", year: "1987" },
      { title: "No Woman, No Cry", artist: "Bob Marley", style: "Reggae", year: "1974" },
      { title: "A Thousand Years", artist: "Christina Perri", style: "Pop", year: "2011" }
    ],
    Bb: [
      { title: "Bohemian Rhapsody", artist: "Queen", style: "Rock", year: "1975" },
      { title: "Don't Know Why", artist: "Norah Jones", style: "Jazz/Pop", year: "2002" },
      { title: "Georgia on My Mind", artist: "Ray Charles", style: "Soul/Jazz", year: "1960" },
      { title: "Blue Moon", artist: "Rodgers & Hart", style: "Jazz", year: "1934" }
    ],
    B: [
      { title: "The Scientist", artist: "Coldplay", style: "Pop/Rock", year: "2002" },
      { title: "Drops of Jupiter", artist: "Train", style: "Pop/Rock", year: "2001" },
      { title: "Iris", artist: "Goo Goo Dolls", style: "Rock", year: "1998" },
      { title: "Skyscraper", artist: "Demi Lovato", style: "Pop", year: "2011" }
    ]
  },
  minor: {
    A: [
      { title: "House of the Rising Sun", artist: "The Animals", style: "Folk/Rock", year: "1964" },
      { title: "Rolling in the Deep", artist: "Adele", style: "Soul/Pop", year: "2010" },
      { title: "Nothing Else Matters", artist: "Metallica", style: "Rock", year: "1991" },
      { title: "Stairway to Heaven", artist: "Led Zeppelin", style: "Rock", year: "1971" }
    ],
    E: [
      { title: "Losing My Religion", artist: "R.E.M.", style: "Alternative", year: "1991" },
      { title: "Californication", artist: "Red Hot Chili Peppers", style: "Rock", year: "1999" },
      { title: "Oye Como Va", artist: "Santana", style: "Latin Rock", year: "1970" },
      { title: "Hurt", artist: "Nine Inch Nails", style: "Alternative", year: "1994" }
    ],
    B: [
      { title: "Zombie", artist: "The Cranberries", style: "Rock", year: "1994" },
      { title: "Numb", artist: "Linkin Park", style: "Rock", year: "2003" },
      { title: "Another Love", artist: "Tom Odell", style: "Pop", year: "2012" },
      { title: "Lovely", artist: "Billie Eilish", style: "Pop", year: "2018" }
    ],
    D: [
      { title: "Mad World", artist: "Tears for Fears", style: "New Wave", year: "1982" },
      { title: "The Sound of Silence", artist: "Simon & Garfunkel", style: "Folk", year: "1964" },
      { title: "Sultans of Swing", artist: "Dire Straits", style: "Rock", year: "1978" },
      { title: "Bad Guy", artist: "Billie Eilish", style: "Pop", year: "2019" }
    ],
    F: [
      { title: "Somebody That I Used to Know", artist: "Gotye", style: "Indie Pop", year: "2011" },
      { title: "Sweet Dreams", artist: "Eurythmics", style: "Synthpop", year: "1983" },
      { title: "Bring Me to Life", artist: "Evanescence", style: "Rock", year: "2003" },
      { title: "Somebody Told Me", artist: "The Killers", style: "Indie Rock", year: "2004" }
    ],
    C: [
      { title: "Uprising", artist: "Muse", style: "Rock", year: "2009" },
      { title: "Seven Nation Army", artist: "The White Stripes", style: "Rock", year: "2003" },
      { title: "Radioactive", artist: "Imagine Dragons", style: "Pop/Rock", year: "2012" },
      { title: "Everybody's Got to Learn Sometime", artist: "The Korgis", style: "Pop", year: "1980" }
    ]
  }
};

const pianoManSuggestion = songInspirations.major.C.find((song) => song.title === "Piano man" && song.artist === "Billy Joel");
if (pianoManSuggestion) {
  Object.assign(pianoManSuggestion, {
    meter: "4/4",
    sections: [
      { title: "Intro", key: "C", meter: "4/4", measures: [["Dm7"], ["Ddim7"], { meter: "3/4", chords: ["C"] }, ["G/B"], ["F/A"], ["C/G"], ["F"], ["C/E"], ["D"], ["G"], ["C"], ["G/B"], ["F/A"], ["C/G"], ["F"], ["F/G"], { repeatStart: true, chords: ["C"] }, ["F/C"], ["Cmaj7"], { ending: "1", repeatEnd: true, chords: ["F", "C/E", "Dm7"] }, { ending: "2", chords: ["F", "C/E", "Dm7"] }] },
      { title: "Verse 1", key: "C", meter: "3/4", measures: [["C"], ["G/B"], ["F/A"], ["C/G"], ["F"], ["C/E"], ["D"], ["G"], ["C"], ["G/B"], ["F/A"], ["C/G"], ["F"], ["F/G"], ["C"], ["C"]] },
      { title: "Break 1", key: "C", meter: "3/4", measures: [["C"], ["G/B"], ["F/A"], ["C/G"], ["F"], ["F/G"], ["C"], ["C"], ["F/C"], ["F/C"]] },
      { title: "Verse 2", key: "C", meter: "3/4", measures: [["C"], ["G/B"], ["F/A"], ["C/G"], ["F"], ["C/E"], ["D"], ["G"], ["C"], ["G/B"], ["F/A"], ["C/G"], ["F"], ["F/G"], ["C"], ["G/B"]] },
      { title: "Pre Chorus 1", key: "C", meter: "3/4", measures: [["Am"], ["Am/G"], ["D/F#"], ["F"], ["Am"], ["Am/G"], ["D/F#"], ["D"], ["G"], ["G/F"], ["C/E"], ["G7/D"]] },
      { title: "Chorus 1", key: "C", meter: "3/4", measures: [["C"], ["G/B"], ["F/A"], ["C/G"], ["F"], ["C/E"], ["D"], ["G"], ["C"], ["G/B"], ["F/A"], ["C/G"], ["F"], ["F/G"], ["C"]] }
    ]
  });
}

const dontLookBackSuggestion = songInspirations.major.C.find((song) => song.title === "Don't look back in anger" && song.artist === "Oasis");
if (dontLookBackSuggestion) {
  Object.assign(dontLookBackSuggestion, {
    meter: "4/4",
    sections: [
      { title: "Intro", key: "C", meter: "4/4", measures: [["C"], ["F"], ["C"], ["F"]] },
      { title: "Verse 1", key: "C", meter: "4/4", measures: [{ nav: ["segno"], repeatStart: true, chords: ["C", "G"] }, ["Am", "E"], ["F", "G"], { repeatEnd: true, chords: [{ token: "C", beats: 2 }, { token: "Am", beats: 1 }, { token: "G", beats: 1 }] }, { repeatStart: true, chords: ["F", "Fm"] }, { repeatEnd: true, repeatCount: 3, chords: ["C"] }, ["G"], ["E/G#"], ["Am", "G"], ["F"], ["G"], ["G"]] },
      { title: "Chorus 1", key: "C", meter: "4/4", measures: [["C", "G"], ["Am", "E"], ["F", "G"], [{ token: "C", beats: 2 }, { token: "Am", beats: 1 }, { token: "G", beats: 1 }], ["C", "G"], ["Am", "E"], { nav: ["toCoda"], chords: ["F", "G"] }] },
      { title: "Break", key: "C", meter: "4/4", measures: [["C", "G"], ["Am", "E"], ["F", "G"], { nav: ["dsAlCoda"], chords: [{ token: "C", beats: 2 }, { token: "Am", beats: 1 }, { token: "G", beats: 1 }] }, [{ token: "C", beats: 2 }, { token: "Am", beats: 1 }, { token: "G", beats: 1 }]] },
      { title: "Solo", key: "C", meter: "4/4", measures: [{ nav: ["coda"], repeatStart: true, chords: ["F", "Fm"] }, { repeatEnd: true, repeatCount: 3, chords: ["C"] }, ["G"], ["E/G#"], ["Am", "G"], ["F"], ["G"], ["G"]] },
      { title: "Chorus 3", key: "C", meter: "4/4", measures: [{ repeatStart: true, chords: ["C", "G"] }, ["Am", "E"], ["F", "G"], [{ token: "C", beats: 2 }, { token: "Am", beats: 1 }, { token: "G", beats: 1 }], ["C", "G"], { ending: "1", chords: ["Am", "E"] }, { ending: "1", chords: ["F", "G"] }, { ending: "1", repeatEnd: true, chords: [{ token: "C", beats: 2 }, { token: "Am", beats: 1 }, { token: "G", beats: 1 }] }, { ending: "2", chords: ["Am"] }, ["F"], ["Ab"]] },
      { title: "Outro", key: "C", meter: "4/4", measures: [["C", "G"], ["Am", "E"], ["F", "Fm"], ["C"]] }
    ]
  });
}

const whatWasIMadeForSuggestion = songInspirations.major.C.find((song) => song.title === "What was I made for" && song.artist === "Billie Eilish");
if (whatWasIMadeForSuggestion) {
  Object.assign(whatWasIMadeForSuggestion, {
    meter: "4/4",
    sections: [
      { title: "Intro", key: "C", meter: "4/4", measures: [["C", "Em"], ["F"], ["C", "Em"], ["F"]] },
      { title: "Verse 1", key: "C", meter: "4/4", measures: [["C", "Em"], ["F"], ["C", "Em"], ["F"], ["C", "Em"], ["F"], ["Am", "Em"], ["F"]] },
      { title: "Verse 2", key: "C", meter: "4/4", measures: [["C", "Em"], ["F"], ["C", "Em"], ["F"], ["C", "Em"], ["F"], ["Am", "Em"], ["F", "C"], ["Dm"], ["G"]] },
      { title: "Chorus 1", key: "C", meter: "4/4", measures: [["C", "Em"], ["F"], ["C", "Em"], ["F"], ["C", "Em"], ["F"], ["C", "Em"], ["F"], ["Am", "Em"], ["F"], ["C", "Em"], ["F"], ["C", "Em"], ["F"]] }
    ]
  });
}

function clearBuiltInSuggestionsOutsideCMajor() {
  Object.entries(songInspirations).forEach(([group, library]) => {
    Object.keys(library).forEach((keyLabel) => {
      if (group === "major" && keyLabel === "C") return;
      library[keyLabel] = [];
    });
  });
}

clearBuiltInSuggestionsOutsideCMajor();

const rootSelect = document.querySelector("#rootSelect");
const keySelect = document.querySelector("#keySelect");
const scaleSelect = document.querySelector("#scaleSelect");
const qualitySelect = document.querySelector("#qualitySelect");
const inversionSelect = document.querySelector("#inversionSelect");
const chordPickerHeading = document.querySelector("#chordPickerControl > label");
const keyboard = document.querySelector("#keyboard");
const keyboardScroll = document.querySelector(".keyboard-scroll");
const noteStrip = document.querySelector("#noteStrip");
const scaleStrip = document.querySelector("#scaleStrip");
const currentName = document.querySelector("#currentName");
const currentNotes = document.querySelector("#currentNotes");
const playChordButton = document.querySelector("#playChordButton");
const playScaleButton = document.querySelector("#playScaleButton");
const appShell = document.querySelector(".app-shell");
const appTitle = document.querySelector("#appTitle");
const pianoTitle = document.querySelector("#pianoTitle");
const keyboardPanel = document.querySelector(".keyboard-panel");
const currentChordPanel = document.querySelector(".current-chord");
const degreeChords = document.querySelector("#degreeChords");
const chordSequencePanel = document.querySelector("#chordSequencePanel");
const chordSequenceList = document.querySelector("#chordSequenceList");
const chordSequenceNotation = document.querySelector("#chordSequenceNotation");
const addChordSequence = document.querySelector("#addChordSequence");
const searchChordSequence = document.querySelector("#searchChordSequence");
const resetChordSequence = document.querySelector("#resetChordSequence");
const chordSequenceResults = document.querySelector("#chordSequenceResults");
const chordNotationTitle = document.querySelector("#chordNotationTitle");
const chordNotationStaff = document.querySelector("#chordNotationStaff");
const mobileChordDetail = document.querySelector(".mobile-chord-detail");
const selectedSongChords = document.querySelector("#selectedSongChords");
const selectedSongTitle = document.querySelector("#selectedSongTitle");
const selectedSongArtist = document.querySelector("#selectedSongArtist");
const selectedSongMeta = document.querySelector("#selectedSongMeta");
const selectedSongTranspose = document.querySelector("#selectedSongTranspose");
const selectedSongChordList = document.querySelector("#selectedSongChordList");
const selectedSongAdminTools = document.querySelector("#selectedSongAdminTools");
const songSchemaEditToggle = document.querySelector("#songSchemaEditToggle");
const songSchemaEditor = document.querySelector("#songSchemaEditor");
const scaleVideoPanel = document.querySelector("#scaleVideoPanel");
const scaleVideoDetails = document.querySelector("#scaleVideoDetails");
const scaleVideoTitle = document.querySelector("#scaleVideoTitle");
const scaleVideoSubtitle = document.querySelector("#scaleVideoSubtitle");
const scaleVideoBody = document.querySelector("#scaleVideoBody");
const floatingChord = document.querySelector("#floatingChord");
const fifthsCircleSvg = document.querySelector("#fifthsCircle");
const circleKeyLabel = document.querySelector("#circleKeyLabel");
const rootTabs = document.querySelector("#rootTabs");
const chordGrid = document.querySelector("#chordGrid");
const filterInput = document.querySelector("#filterInput");
const libraryToggle = document.querySelector("#libraryToggle");
const libraryContent = document.querySelector("#libraryContent");
const modeButtons = document.querySelectorAll(".mode-button");
const chordModeButtons = document.querySelectorAll(".chord-mode-button");
const chordSearchPanel = document.querySelector("#chordSearchPanel");
const searchNotesLabel = document.querySelector("#searchNotesLabel");
const searchResultLabel = document.querySelector("#searchResultLabel");
const clearSearchButton = document.querySelector("#clearSearchButton");
const inspirationKeyLabel = document.querySelector("#inspirationKeyLabel");
const inspirationList = document.querySelector("#inspirationList");
const inspirationRefreshButton = document.querySelector("#inspirationRefreshButton");
const inspirationStatus = document.querySelector("#inspirationStatus");
const studentCodeInput = document.querySelector("#studentCodeInput");
const studentCodeStatus = document.querySelector("#studentCodeStatus");
const inspirationSearch = document.querySelector("#inspirationSearch");
const inspirationSort = document.querySelector("#inspirationSort");
const inspirationFavoriteFilter = document.querySelector("#inspirationFavoriteFilter");
const librarySyncButton = document.querySelector("#librarySyncButton");
const deleteSelectedSongButton = document.querySelector("#deleteSelectedSongButton");
const adminOnlyElements = document.querySelectorAll("[data-admin-only]");
const songLibraryStats = document.querySelector("#songLibraryStats");
const songLibraryTotalCount = document.querySelector("#songLibraryTotalCount");
const songLibraryStatsGrid = document.querySelector("#songLibraryStatsGrid");
const addSongForm = document.querySelector("#addSongForm");
const addSongTitle = document.querySelector("#addSongTitle");
const addSongArtist = document.querySelector("#addSongArtist");
const addSongKey = document.querySelector("#addSongKey");
const addSongStyle = document.querySelector("#addSongStyle");
const addSongYear = document.querySelector("#addSongYear");
const addSongLevel = document.querySelector("#addSongLevel");
const addSongImage = document.querySelector("#addSongImage");
const addSongYoutube = document.querySelector("#addSongYoutube");
const addSongMediaUrl = document.querySelector("#addSongMediaUrl");
const addSongMedia = document.querySelector("#addSongMedia");
const addSongXml = document.querySelector("#addSongXml");
const addSongStatus = document.querySelector("#addSongStatus");
const pageTabs = document.querySelectorAll(".page-tab");
const mobilePageMenuButton = document.querySelector("#mobilePageMenuButton");
const mobilePageMenu = document.querySelector("#mobilePageMenu");
const mobilePageMenuItems = document.querySelectorAll(".mobile-page-menu-item");
const pageViews = document.querySelectorAll(".page-view");
const songKeySelect = document.querySelector("#songKeySelect");
const songScaleSelect = document.querySelector("#songScaleSelect");
const songMeterSelect = document.querySelector("#songMeterSelect");
const songBpmInput = document.querySelector("#songBpmInput");
const songVoicingSelect = document.querySelector("#songVoicingSelect");
const songTitleInput = document.querySelector("#songTitleInput");
const songArtistInput = document.querySelector("#songArtistInput");
const songTitleDisplay = document.querySelector("#songTitleDisplay");
const songArtistDisplay = document.querySelector("#songArtistDisplay");
const songPlayButton = document.querySelector("#songPlayButton");
const songImportText = document.querySelector("#songImportText");
const songImportButton = document.querySelector("#songImportButton");
const songXmlInput = document.querySelector("#songXmlInput");
const songImportStatus = document.querySelector("#songImportStatus");
const songPage = document.querySelector(".song-page");
const songPrintButton = document.querySelector("#songPrintButton");
const studentKeyLabel = document.querySelector("#studentKeyLabel");
const studentMeterLabel = document.querySelector("#studentMeterLabel");
const studentBpmLabel = document.querySelector("#studentBpmLabel");
const songBlockPalette = document.querySelector("#songBlockPalette");
const songOrder = document.querySelector("#songOrder");
const songScaleTitle = document.querySelector("#songScaleTitle");
const songScaleKeyboard = document.querySelector("#songScaleKeyboard");
const songScaleNotation = document.querySelector("#songScaleNotation");
const songScaleNoteRow = document.querySelector("#songScaleNoteRow");
const songSections = document.querySelector("#songSections");
const customTitleInput = document.querySelector("#customTitleInput");
const customArtistInput = document.querySelector("#customArtistInput");
const customTitleDisplay = document.querySelector("#customTitleDisplay");
const customArtistDisplay = document.querySelector("#customArtistDisplay");
const customPrintScale = document.querySelector("#customPrintScale");
const customKeySelect = document.querySelector("#customKeySelect");
const customScaleSelect = document.querySelector("#customScaleSelect");
const customScaleKeyboard = document.querySelector("#customScaleKeyboard");
const customRootSelect = document.querySelector("#customRootSelect");
const customQualitySelect = document.querySelector("#customQualitySelect");
const customInversionSelect = document.querySelector("#customInversionSelect");
const customChordText = document.querySelector("#customChordText");
const customAddTypedChordButton = document.querySelector("#customAddTypedChordButton");
const customAddChordButton = document.querySelector("#customAddChordButton");
const customResetButton = document.querySelector("#customResetButton");
const customPrintButton = document.querySelector("#customPrintButton");
const customPdfButton = document.querySelector("#customPdfButton");
const customZoomOut = document.querySelector("#customZoomOut");
const customZoomIn = document.querySelector("#customZoomIn");
const customZoomRange = document.querySelector("#customZoomRange");
const customGrid = document.querySelector("#customGrid");
const customExampleGrid = document.querySelector("#customExampleGrid");
const authGate = document.querySelector("#authGate");
const authForm = document.querySelector("#authForm");
const authEmail = document.querySelector("#authEmail");
const authSubmit = document.querySelector("#authSubmit");
const authStatus = document.querySelector("#authStatus");
const authLogout = document.querySelector("#authLogout");
const mobileAuthLogout = document.querySelector("#mobileAuthLogout");

function syncChordNotationPlacement() {
  return;
}

let audioContext;
let pianoOutput;
let songTimeouts = [];
let scaleHighlightTimeouts = [];
let isSongPlaying = false;

function mod(value, base) {
  return ((value % base) + base) % base;
}

function accidentalText(offset) {
  if (offset === -2) return "bb";
  if (offset === -1) return "b";
  if (offset === 1) return "#";
  if (offset === 2) return "x";
  return "";
}

function accidentalOffset(accidental) {
  if (accidental === "bb") return -2;
  if (accidental === "b") return -1;
  if (accidental === "#") return 1;
  if (accidental === "x") return 2;
  return 0;
}

function degreeNumber(degree) {
  return Number(degree.replace(/[^0-9]/g, ""));
}

function chordDegreeNumberLabel(degree) {
  return String(degreeNumber(degree));
}

function targetLetter(rootLabel, degree) {
  const rootLetter = rootLabel[0];
  const start = letters.indexOf(rootLetter);
  return letters[mod(start + degreeNumber(degree) - 1, 7)];
}

function spellPitchForLetter(pitch, letter) {
  const natural = naturalPitch[letter];
  let diff = mod(pitch - natural, 12);
  if (diff > 6) diff -= 12;
  return `${letter}${accidentalText(diff)}`;
}

function chordName(root, quality) {
  return `${root.label} ${quality.name}`;
}

function chordSymbol(root, quality) {
  return `${root.label}${quality.symbol}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[character]);
}

function formatMusicText(value) {
  return escapeHtml(value);
}

function formatNoteList(notes) {
  return notes.map((note) => formatMusicText(note.label)).join(" - ");
}

function chordNotes(root, quality) {
  return quality.intervals.map((interval, index) => {
    const pitch = mod(root.pitch + interval, 12);
    const degree = quality.degrees[index];
    return {
      pitch,
      absolute: root.pitch + interval,
      degree,
      label: spellPitchForLetter(pitch, targetLetter(root.label, degree))
    };
  });
}

function qualityFromSymbol(symbol) {
  const normalized = symbol
    .trim()
    .replace(/[()]/g, "")
    .replace(/♭/g, "b")
    .replace(/♯/g, "#")
    .replace(/^majeur\s*/i, "maj")
    .replace(/^mineur\s*/i, "m")
    .replace(/^min/, "m")
    .replace(/^halfverminderd$/i, "m7b5")
    .replace(/^halfverminderd7$/i, "m7b5");
  const symbolMap = new Map([
    ["", "maj"],
    ["maj", "maj"],
    ["M", "maj"],
    ["m", "min"],
    ["min", "min"],
    ["-", "min"],
    ["dim", "dim"],
    ["aug", "aug"],
    ["+", "aug"],
    ["sus2", "sus2"],
    ["sus4", "sus4"],
    ["maj7", "maj7"],
    ["M7", "maj7"],
    ["7", "7"],
    ["m7", "min7"],
    ["min7", "min7"],
    ["m7b5", "m7b5"],
    ["min7b5", "m7b5"],
    ["ø", "m7b5"],
    ["ø7", "m7b5"],
    ["dim7", "dim7"],
    ["6", "6"],
    ["m6", "min6"],
    ["add9", "add9"],
    ["9", "9"],
    ["maj9", "maj9"],
    ["major9", "maj9"],
    ["M9", "maj9"],
    ["m9", "min9"],
    ["min9", "min9"],
    ["minor9", "min9"]
  ]);
  return qualities.find((quality) => quality.id === symbolMap.get(normalized)) || null;
}

function parseChordToken(token) {
  const value = typeof token === "object" && token !== null ? token.token : token;
  const cleaned = String(value)
    .trim()
    .replace(/[|,]/g, "");
  if (/^(?:N\.?C\.?|no\s+chord)$/i.test(cleaned)) {
    return { token: "N.C.", noChord: true, displayName: "No Chord", symbol: "N.C." };
  }
  const slashMatch = cleaned.match(/\/([A-G](?:#|b)?)$/i);
  const bassLabel = slashMatch ? slashMatch[1].replace(/^([a-g])/, (letter) => letter.toUpperCase()) : "";
  const chordText = slashMatch ? cleaned.slice(0, slashMatch.index) : cleaned;
  const match = chordText.match(/^([A-G](?:#|b)?)(.*)$/);
  if (!match) return null;
  const rootLabel = match[1];
  const root = rootOptions.find((option) => option.label === rootLabel);
  const quality = qualityFromSymbol(match[2] || "");
  if (!root || !quality) return null;
  const bass = bassLabel ? rootOptions.find((option) => option.label === bassLabel) : null;
  const baseSymbol = chordSymbol(root, quality);
  const symbol = bass ? `${baseSymbol}/${bass.label}` : baseSymbol;
  return { token: cleaned, root, quality, bass, displayName: chordName(root, quality), symbol };
}

function parseChordEntry(value) {
  const raw = value.trim();
  const match = raw.match(/^(.+?)([.-]+)$/);
  if (!match) return { token: raw, beats: null };
  const beats = [...match[2]].reduce((total, marker) => total + (marker === "." ? 1 : 0.5), 0);
  return {
    token: match[1],
    beats
  };
}

function chordEntryToken(entry) {
  if (typeof entry !== "object" || entry === null) return entry;
  return entry.token || entry.symbol || entry.chord || entry.name || entry.label || "";
}

function chordEntryVoicing(entry) {
  return typeof entry === "object" && entry !== null ? entry.voicingNotes : null;
}

function bassNoteForVoicing(parsedChord, voicingNotes) {
  if (!parsedChord?.bass || !Array.isArray(voicingNotes) || !voicingNotes.length) return null;
  const lowest = Math.min(...voicingNotes.map((note) => note.absolute));
  let absolute = parsedChord.bass.pitch;
  while (absolute >= lowest) absolute -= 12;
  while (absolute < lowest - 14) absolute += 12;
  return {
    pitch: parsedChord.bass.pitch,
    absolute,
    degree: "bass",
    label: parsedChord.bass.label,
    bass: true
  };
}

function notesWithBass(parsedChord, voicingNotes) {
  const bass = bassNoteForVoicing(parsedChord, voicingNotes);
  return bass ? [bass, ...voicingNotes] : voicingNotes;
}

function meterDetails(meter = songState.meter) {
  const [beatsText, beatValueText] = String(meter || songState.meter).split("/");
  const beats = Number(beatsText) || 4;
  const beatValue = Number(beatValueText) || 4;
  return {
    beats,
    beatValue,
    quarterBeats: (beats * 4) / beatValue,
    quarterPerBeat: 4 / beatValue
  };
}

function meterDisplayDetails(meter = songState.meter) {
  const details = meterDetails(meter);
  const compound = details.beatValue === 8 && details.beats >= 6 && details.beats % 3 === 0;
  if (!compound) {
    return {
      ...details,
      visualBeats: details.beats,
      visualSlots: Math.max(1, Math.round(details.beats * 2)),
      quarterPerVisualBeat: details.quarterPerBeat,
      compound: false
    };
  }
  return {
    ...details,
    visualBeats: details.beats / 3,
    visualSlots: details.beats,
    quarterPerVisualBeat: details.quarterPerBeat * 3,
    compound: true
  };
}

function visualTimingFromEntry(entry, meter) {
  const details = meterDisplayDetails(meter);
  const beats = Number(entry?.beats ?? 0);
  const startBeat = Number(entry?.startBeat ?? 1);
  if (entry?.timingUnit === "quarter" && details.compound) {
    return {
      beats: beats / details.quarterPerVisualBeat,
      startBeat: ((startBeat - 1) / details.quarterPerVisualBeat) + 1
    };
  }
  return { beats, startBeat };
}

function measureMeter(measure, fallbackMeter = songState.meter) {
  if (Array.isArray(measure)) {
    return measure.meter
      || measure.find((entry) => typeof entry === "object" && entry !== null && entry.meter)?.meter
      || fallbackMeter
      || songState.meter;
  }
  if (measure && typeof measure === "object") return measure.meter || fallbackMeter || songState.meter;
  return fallbackMeter || songState.meter;
}

function measureEntriesFromMeasure(measure) {
  if (Array.isArray(measure)) return measure;
  if (measure && typeof measure === "object" && Array.isArray(measure.chords)) return measure.chords;
  return [];
}

function chordBeatCount(entry, measure) {
  const meter = measureMeter(measure);
  const display = meterDisplayDetails(meter);
  if (typeof entry === "object" && entry !== null && entry.beats != null) {
    return visualTimingFromEntry(entry, meter).beats;
  }
  const entries = measureEntriesFromMeasure(measure);
  const specified = entries.reduce((total, item) => total + visualTimingFromEntry(item, meter).beats, 0);
  const unspecified = entries.filter((item) => item.beats == null).length;
  if (!unspecified) return display.visualBeats / Math.max(entries.length, 1);
  return Math.max(0, display.visualBeats - specified) / unspecified;
}

function chordQuarterLength(entry, measure) {
  return chordBeatCount(entry, measure) * meterDisplayDetails(measureMeter(measure)).quarterPerVisualBeat;
}

function voicingLabel(inversion) {
  if (inversion === 1) return "1e omkering";
  if (inversion === 2) return "2e omkering";
  if (inversion === 3) return "3e omkering";
  return "grondligging";
}

function voicingCenter(notes) {
  return notes.reduce((total, note) => total + note.absolute, 0) / notes.length;
}

function startInversion() {
  if (songState.startVoicing === "middle") return 1;
  if (songState.startVoicing === "high") return 2;
  return 0;
}

function voicingDistance(notes, previousNotes, targetCenter = 7) {
  if (!previousNotes) return Math.abs(voicingCenter(notes) - targetCenter);
  const current = notes.map((note) => note.absolute).sort((a, b) => a - b);
  const previous = previousNotes.map((note) => note.absolute).sort((a, b) => a - b);
  const shared = Math.min(current.length, previous.length);
  let score = Math.abs(voicingCenter(notes) - voicingCenter(previousNotes)) * 0.7;
  for (let index = 0; index < shared; index += 1) {
    score += Math.abs(current[index] - previous[index]);
  }
  return score;
}

function smoothVoicingDistance(notes, previousNotes) {
  if (!previousNotes?.length) return 0;
  const current = notes.map((note) => note.absolute).sort((a, b) => a - b);
  const previous = previousNotes.map((note) => note.absolute).sort((a, b) => a - b);
  const shared = Math.min(current.length, previous.length);
  let total = Math.abs(voicingCenter(notes) - voicingCenter(previousNotes)) * 2.6;
  for (let index = 0; index < shared; index += 1) {
    total += Math.abs(current[index] - previous[index]) * 1.15;
  }
  const drop = voicingCenter(previousNotes) - voicingCenter(notes);
  if (drop > 3) total += (drop - 3) * 7;
  if (drop > 7) total += (drop - 7) * 14;
  return total;
}

function notationLedgerPenalty(notes, { top = 30, bottom = 72, ledgerLines = 2 } = {}) {
  const allowed = ledgerLines * 9;
  return notes.reduce((total, note) => {
    const y = staffYForNote(note);
    const above = top - y;
    const below = y - bottom;
    const outside = Math.max(above, below, 0);
    if (!outside) return total + Math.abs(y - 52) * 0.04;
    const beyondAllowed = Math.max(0, outside - allowed);
    return total + outside * 0.35 + beyondAllowed * beyondAllowed * 1.4;
  }, 0);
}

function bestVoicing(parsedChord, previousNotes, targetCenter = 7, fixedInversion = null) {
  const candidates = [];
  const inversions = fixedInversion == null
    ? Array.from({ length: parsedChord.quality.intervals.length }, (_item, index) => index)
    : [Math.min(fixedInversion, parsedChord.quality.intervals.length - 1)];
  for (let rootAbsolute = -12 + parsedChord.root.pitch; rootAbsolute <= 24 + parsedChord.root.pitch; rootAbsolute += 12) {
    inversions.forEach((inversion) => {
      const notes = voicedNotes(parsedChord.root, parsedChord.quality, inversion, rootAbsolute);
      const absolutes = notes.map((note) => note.absolute);
      const lowest = Math.min(...absolutes);
      const highest = Math.max(...absolutes);
      if (lowest < -8 || highest > 22) return;
      candidates.push({
        inversion,
        notes,
        score: voicingDistance(notes, previousNotes, targetCenter) + Math.abs(voicingCenter(notes) - targetCenter) * 0.18
      });
    });
  }
  candidates.sort((a, b) => a.score - b.score);
  return candidates[0] || {
    inversion: fixedInversion ?? 0,
    notes: voicedNotes(parsedChord.root, parsedChord.quality, fixedInversion ?? 0)
  };
}

function firstSongVoicing(parsedChord) {
  const inversion = Math.min(startInversion(), parsedChord.quality.intervals.length - 1);
  const candidates = [];
  for (let rootAbsolute = -12 + parsedChord.root.pitch; rootAbsolute <= 24 + parsedChord.root.pitch; rootAbsolute += 12) {
    const notes = voicedNotes(parsedChord.root, parsedChord.quality, inversion, rootAbsolute);
    const absolutes = notes.map((note) => note.absolute);
    const lowest = Math.min(...absolutes);
    const highest = Math.max(...absolutes);
    if (lowest < -8 || highest > 22) continue;
    candidates.push({
      inversion,
      notes,
      score: Math.abs(voicingCenter(notes) - 7)
    });
  }
  candidates.sort((a, b) => a.score - b.score);
  return candidates[0] || { inversion, notes: voicedNotes(parsedChord.root, parsedChord.quality, inversion) };
}

function songVoicing(parsedChord, previousNotes) {
  if (!previousNotes) return firstSongVoicing(parsedChord);
  return bestVoicing(parsedChord, previousNotes, 7);
}

function sequenceVoicingScore(notes, previousNotes) {
  const center = voicingCenter(notes);
  const staffPenalty = notationLedgerPenalty(notes);
  const lowLedgerPenalty = notes.reduce((total, note) => (
    note.absolute < -6 ? total + (-6 - note.absolute) * 13 : total
  ), 0);
  const rangePenalty = notes.reduce((total, note) => {
    if (note.absolute < -10) return total + (-10 - note.absolute) * 4;
    if (note.absolute > 18) return total + (note.absolute - 18) * 5;
    return total;
  }, 0);
  const continuity = previousNotes ? smoothVoicingDistance(notes, previousNotes) : 0;
  const centerWeight = previousNotes ? 0.55 : 1.9;
  return Math.abs(center - 3) * centerWeight + staffPenalty + lowLedgerPenalty + rangePenalty + continuity;
}

function sequenceVoicing(parsedChord, previousNotes) {
  const candidates = [];
  for (let rootAbsolute = -12 + parsedChord.root.pitch; rootAbsolute <= 24 + parsedChord.root.pitch; rootAbsolute += 12) {
    parsedChord.quality.intervals.forEach((_interval, inversion) => {
      const notes = voicedNotes(parsedChord.root, parsedChord.quality, inversion, rootAbsolute);
      const absolutes = notes.map((note) => note.absolute);
      const lowest = Math.min(...absolutes);
      const highest = Math.max(...absolutes);
      if (lowest < -10 || highest > 18) return;
      candidates.push({
        inversion,
        rootAbsolute,
        notes,
        score: sequenceVoicingScore(notes, previousNotes)
      });
    });
  }
  candidates.sort((a, b) => a.score - b.score);
  return candidates[0] || {
    inversion: 0,
    rootAbsolute: parsedChord.root.pitch,
    notes: voicedNotes(parsedChord.root, parsedChord.quality, 0)
  };
}

function selectedSequenceVoicing(parsedChord) {
  const inversion = Math.min(state.inversion, parsedChord.quality.intervals.length - 1);
  return selectedSequenceVoicingForInversion(parsedChord, inversion);
}

function selectedSequenceVoicingForInversion(parsedChord, preferredInversion, previousNotes = null) {
  const inversion = Math.min(preferredInversion, parsedChord.quality.intervals.length - 1);
  const candidates = [];
  for (let rootAbsolute = -12 + parsedChord.root.pitch; rootAbsolute <= 24 + parsedChord.root.pitch; rootAbsolute += 12) {
    const notes = voicedNotes(parsedChord.root, parsedChord.quality, inversion, rootAbsolute);
    const absolutes = notes.map((note) => note.absolute);
    const lowest = Math.min(...absolutes);
    const highest = Math.max(...absolutes);
    if (lowest < -10 || highest > 18) continue;
    candidates.push({
      inversion,
      rootAbsolute,
      notes,
      score: sequenceVoicingScore(notes, previousNotes)
    });
  }
  candidates.sort((a, b) => a.score - b.score);
  return candidates[0] || {
    inversion,
    rootAbsolute: parsedChord.root.pitch,
    notes: voicedNotes(parsedChord.root, parsedChord.quality, inversion)
  };
}

function normalizeVoicingNotes(notes) {
  return [...notes].sort((a, b) => a.absolute - b.absolute);
}

function highestDegreeChordOffset(scale) {
  return scale.intervals.reduce((highest, _interval, index) => {
    const chordTopTarget = index + 4;
    const chordTop = scale.intervals[chordTopTarget % scale.intervals.length]
      + Math.floor(chordTopTarget / scale.intervals.length) * 12;
    return Math.max(highest, chordTop);
  }, 12);
}

function scaleStartAbsolute(key, scale) {
  const highestNeededInterval = highestDegreeChordOffset(scale);
  let start = 4 * 12 + key.pitch;
  while (start + highestNeededInterval > keyboardMaxAbsolute) start -= 12;
  while (start < keyboardMinAbsolute) start += 12;
  return start;
}

function scaleNotes(key, scale) {
  const start = scaleStartAbsolute(key, scale);
  return scale.intervals.map((interval, index) => {
    const pitch = mod(key.pitch + interval, 12);
    const degree = scale.degrees[index];
    return {
      pitch,
      absolute: start - 3 * 12 + interval,
      degree,
      label: spellPitchForLetter(pitch, targetLetter(key.label, degree))
    };
  });
}

function romanNumeral(index, quality) {
  const major = ["I", "II", "III", "IV", "V", "VI", "VII"];
  const minor = ["i", "ii", "iii", "iv", "v", "vi", "vii"];
  if (quality === "mineur" || quality === "verminderd") return minor[index];
  return major[index];
}

function triadQuality(notes) {
  const root = notes[0].pitch;
  const third = mod(notes[1].pitch - root, 12);
  const fifth = mod(notes[2].pitch - root, 12);
  if (third === 4 && fifth === 7) return "majeur";
  if (third === 3 && fifth === 7) return "mineur";
  if (third === 3 && fifth === 6) return "verminderd";
  if (third === 4 && fifth === 8) return "overmatig";
  return "kleurakkoord";
}

function qualityIdForTriad(notes) {
  const root = notes[0].pitch;
  const third = mod(notes[1].pitch - root, 12);
  const fifth = mod(notes[2].pitch - root, 12);
  if (third === 4 && fifth === 7) return "maj";
  if (third === 3 && fifth === 7) return "min";
  if (third === 3 && fifth === 6) return "dim";
  if (third === 4 && fifth === 8) return "aug";
  return "maj";
}

function degreeTriads(scale) {
  return scale.map((note, index) => {
    const triad = [0, 2, 4].map((offset) => {
      const target = index + offset;
      const source = scale[target % scale.length];
      return { ...source, absolute: source.absolute + Math.floor(target / scale.length) * 12 };
    });
    const quality = triadQuality(triad);
    const qualityId = qualityIdForTriad(triad);
    const matchingQuality = qualities.find((item) => item.id === qualityId);
    return {
      degree: romanNumeral(index, quality),
      root: note.label,
      rootPitch: note.pitch,
      rootAbsolute: note.absolute,
      quality,
      qualityId,
      symbol: `${note.label}${matchingQuality?.symbol || ""}`,
      fullName: `${note.label} ${quality}`,
      notes: triad
    };
  });
}

function voicedNotes(root, quality, inversion, rootAbsolute = null) {
  const notes = chordNotes(root, quality).map((note) => ({ ...note }));
  const shift = rootAbsolute == null ? 0 : rootAbsolute - root.pitch;
  notes.forEach((note) => {
    note.absolute += shift;
  });
  const turns = Math.min(inversion, notes.length - 1);
  for (let i = 0; i < turns; i += 1) {
    const moved = notes.shift();
    notes.push({ ...moved, absolute: moved.absolute + 12 });
  }
  return notes;
}

function scaleFitScore(notes, scaleStart, scaleEnd, scalePitchSet) {
  return notes.reduce((score, note) => {
    const isScalePitch = scalePitchSet.has(note.pitch);
    const outsideDistance = note.absolute < scaleStart
      ? scaleStart - note.absolute
      : Math.max(0, note.absolute - scaleEnd);
    const center = (scaleStart + scaleEnd) / 2;
    const centerDistance = Math.abs(note.absolute - center);
    return score + outsideDistance * (isScalePitch ? 12 : 7) + centerDistance * 0.08;
  }, 0);
}

function bestRootAbsoluteForScale(root, quality, inversion, scale) {
  const scaleStart = scaleStartAbsoluteForKey() - 3 * 12;
  const scaleEnd = scaleStart + 12;
  const scalePitchSet = new Set(scale.map((note) => note.pitch));
  const candidates = [];
  for (let octaveShift = -3; octaveShift <= 5; octaveShift += 1) {
    const rootAbsolute = root.pitch + octaveShift * 12;
    const notes = voicedNotes(root, quality, inversion, rootAbsolute);
    const keyboardPenalty = notes.reduce((score, note) => {
      const keyboardAbsolute = 3 * 12 + note.absolute;
      if (keyboardAbsolute < keyboardMinAbsolute) return score + (keyboardMinAbsolute - keyboardAbsolute) * 20;
      if (keyboardAbsolute > keyboardMaxAbsolute) return score + (keyboardAbsolute - keyboardMaxAbsolute) * 20;
      return score;
    }, 0);
    candidates.push({
      rootAbsolute,
      score: scaleFitScore(notes, scaleStart, scaleEnd, scalePitchSet) + keyboardPenalty
    });
  }
  candidates.sort((a, b) => a.score - b.score || a.rootAbsolute - b.rootAbsolute);
  return candidates[0]?.rootAbsolute ?? root.pitch;
}

function bestRootAbsoluteForNotation(root, quality, inversion) {
  const candidates = [];
  for (let octaveShift = -3; octaveShift <= 4; octaveShift += 1) {
    const rootAbsolute = root.pitch + octaveShift * 12;
    const notes = voicedNotes(root, quality, inversion, rootAbsolute);
    const centerDistance = Math.abs(voicingCenter(notes) - 3);
    candidates.push({
      rootAbsolute,
      score: notationLedgerPenalty(notes) * 7 + centerDistance
    });
  }
  candidates.sort((a, b) => a.score - b.score || a.rootAbsolute - b.rootAbsolute);
  return candidates[0]?.rootAbsolute ?? root.pitch;
}

function preferredLabelForPitch(pitch) {
  const scale = scaleNotes(state.key, state.scale);
  const scaleNote = scale.find((note) => note.pitch === pitch);
  if (scaleNote) return scaleNote.label;
  if (state.key.accidental === "sharp") return sharpLabels[pitch];
  return flatLabels[pitch];
}

function searchLabelForPitch(pitch, result = null) {
  if (result) {
    const chordNote = chordNotes(result.root, result.quality).find((note) => note.pitch === pitch);
    if (chordNote) return chordNote.label;
  }
  return preferredLabelForPitch(pitch);
}

function searchNotesForKeyboard(result = null) {
  return state.searchNotes.map((absolute) => {
    const pitch = mod(absolute, 12);
    return {
      pitch,
      absolute: absolute - keyboardMinAbsolute,
      degree: "",
      label: searchLabelForPitch(pitch, result)
    };
  });
}

function uniquePitchClassesFromSearch() {
  return [...new Set(state.searchNotes.map((absolute) => mod(absolute, 12)))].sort((a, b) => a - b);
}

function samePitchSet(a, b) {
  if (a.length !== b.length) return false;
  return a.every((pitch, index) => pitch === b[index]);
}

function rootMatchScore(root, selectedLabels) {
  if (selectedLabels.includes(root.label)) return 0;
  if (root.accidental === state.key.accidental) return 1;
  if (root.accidental === "natural") return 2;
  return 3;
}

function candidateSortScore(candidate, selectedLabels, lowestPitch) {
  return [
    candidate.root.pitch === lowestPitch ? 0 : 1,
    candidate.inversion === 0 ? 0 : 1,
    rootMatchScore(candidate.root, selectedLabels),
    candidate.quality.intervals.length
  ];
}

function compareCandidateScores(a, b, selectedLabels, lowestPitch) {
  const aScore = candidateSortScore(a, selectedLabels, lowestPitch);
  const bScore = candidateSortScore(b, selectedLabels, lowestPitch);
  for (let index = 0; index < aScore.length; index += 1) {
    if (aScore[index] !== bScore[index]) return aScore[index] - bScore[index];
  }
  return 0;
}

function recognizeSearchChord() {
  const selectedPitches = uniquePitchClassesFromSearch();
  if (selectedPitches.length < 2) return null;
  const selectedLabels = selectedPitches.map(preferredLabelForPitch);
  const lowestPitch = mod(Math.min(...state.searchNotes), 12);
  const candidates = [];
  rootOptions.forEach((root) => {
    qualities.forEach((quality) => {
      const chordPitches = [...new Set(quality.intervals.map((interval) => mod(root.pitch + interval, 12)))].sort((a, b) => a - b);
      if (!samePitchSet(chordPitches, selectedPitches)) return;
      const bassInterval = mod(lowestPitch - root.pitch, 12);
      const inversion = quality.intervals.findIndex((interval) => mod(interval, 12) === bassInterval);
      candidates.push({
        root,
        quality,
        inversion: Math.max(0, inversion)
      });
    });
  });
  candidates.sort((a, b) => compareCandidateScores(a, b, selectedLabels, lowestPitch));
  if (!candidates.length) return null;
  const best = candidates[0];
  const seen = new Set([`${best.root.label}-${best.quality.id}`]);
  const alternatives = candidates.slice(1).filter((candidate) => {
    const key = `${candidate.root.label}-${candidate.quality.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return candidate.root.pitch !== best.root.pitch || candidate.quality.id !== best.quality.id;
  }).slice(0, 2);
  return { ...best, alternatives };
}

function searchInversionLabel(inversion) {
  if (inversion === 1) return "1e omkering";
  if (inversion === 2) return "2e omkering";
  if (inversion === 3) return "3e omkering";
  return "grondligging";
}

function toggleSearchNote(pitch, octave) {
  const absolute = octave * 12 + pitch;
  const index = state.searchNotes.indexOf(absolute);
  if (index >= 0) {
    state.searchNotes.splice(index, 1);
  } else {
    state.searchNotes.push(absolute);
    state.searchNotes.sort((a, b) => a - b);
  }
}

function syncControlsToSearchResult(result) {
  state.root = result.root;
  state.libraryRoot = result.root;
  state.quality = result.quality;
  state.inversion = result.inversion;
  state.selectedRootAbsolute = null;
  state.chordActive = true;
  requestKeyboardFocus();
  rootSelect.value = String(rootOptions.indexOf(result.root));
  qualitySelect.value = result.quality.id;
  inversionSelect.value = String(result.inversion);
  updateInversions();
}

function appendNoteStripHeading(symbol, inversion) {
  const heading = document.createElement("div");
  heading.className = "note-strip-heading";
  heading.innerHTML = `
    <strong>${formatMusicText(symbol)}</strong>
    <span>${formatMusicText(voicingLabel(inversion))}</span>
  `;
  noteStrip.append(heading);
}

function updateSearchSummary() {
  const result = recognizeSearchChord();
  const selectedLabels = state.searchNotes.map((absolute) => searchLabelForPitch(mod(absolute, 12), result));
  currentName.classList.toggle("search-found", Boolean(result));
  searchResultLabel?.classList.toggle("search-found", Boolean(result));
  noteStrip.innerHTML = "";
  if (result) {
    appendNoteStripHeading(chordSymbol(result.root, result.quality), result.inversion);
  }
  searchNotesForKeyboard(result).slice().reverse().forEach((note) => {
    const pill = document.createElement("div");
    pill.className = "note-pill";
    pill.innerHTML = `<span class="note-name">${formatMusicText(note.label)}</span>`;
    noteStrip.append(pill);
  });
  if (searchNotesLabel) {
    searchNotesLabel.innerHTML = selectedLabels.length
      ? selectedLabels.map(formatMusicText).join(" - ")
      : "Geen tonen gekozen";
  }
  if (result) {
    syncControlsToSearchResult(result);
    const symbol = chordSymbol(result.root, result.quality);
    const fullName = `${result.root.label} ${result.quality.name}`;
    const inversionText = searchInversionLabel(result.inversion);
    const alternatives = result.alternatives
      .map((candidate) => `${formatMusicText(chordSymbol(candidate.root, candidate.quality))} - ${searchInversionLabel(candidate.inversion)}`)
      .join(", ");
    const alternativeText = alternatives ? `<br><span class="search-alternative">Ook: ${alternatives}</span>` : "";
    currentName.innerHTML = `<span class="current-symbol">${formatMusicText(symbol)}</span><span class="current-full-name">${formatMusicText(fullName)} - ${inversionText}</span>`;
    currentNotes.innerHTML = `${selectedLabels.map(formatMusicText).join(" - ")}${alternativeText}`;
    pianoTitle.innerHTML = formatMusicText(symbol);
    if (searchResultLabel) searchResultLabel.innerHTML = `${formatMusicText(symbol)} - ${inversionText}${alternativeText}`;
    return result;
  }
  currentName.textContent = state.searchNotes.length ? "Onbekend akkoord" : "Zoek akkoord";
  currentNotes.textContent = state.searchNotes.length ? "Kies eventueel nog een toon erbij" : "Klik tonen op het klavier";
  pianoTitle.textContent = state.searchNotes.length ? "Zoek akkoord" : "Klik tonen";
  if (searchResultLabel) {
    searchResultLabel.textContent = state.searchNotes.length ? "Nog geen akkoord gevonden" : "Klik tonen op het klavier";
  }
  return null;
}

function midiFromAbsolutePitch(absolute) {
  return 60 + absolute;
}

function notationKeyFromNote(note) {
  const label = note.label || sharpLabels[mod(note.absolute, 12)];
  const midi = midiFromAbsolutePitch(note.absolute);
  const writtenPitch = naturalPitch[label[0]] + accidentalOffset(label.slice(1));
  const octave = Math.round((midi - writtenPitch) / 12) - 1;
  return {
    key: `${label[0].toLowerCase()}${label.slice(1)}/${octave}`,
    accidental: label.slice(1)
  };
}

function chordCardsInMeasure(measure) {
  return [...measure.children].filter((child) => child.classList?.contains("song-chord-card"));
}

function addStaffBarline(container, stave, x, className = "staff-barline") {
  const svg = container.querySelector("svg");
  if (!svg || typeof stave.getYForLine !== "function") return;
  const y1 = stave.getYForLine(0);
  const y2 = stave.getYForLine(4);
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("class", className);
  line.setAttribute("x1", String(x));
  line.setAttribute("x2", String(x));
  line.setAttribute("y1", String(y1));
  line.setAttribute("y2", String(y2));
  line.setAttribute("stroke", "#151515");
  line.setAttribute("stroke-width", "1.3");
  line.setAttribute("stroke-linecap", "butt");
  line.setAttribute("vector-effect", "non-scaling-stroke");
  svg.append(line);
}

function chordNotationLedgerScore(notes) {
  return notes.reduce((score, note) => {
    const y = staffYForNote(note);
    const outside = y < 30 ? 30 - y : Math.max(0, y - 76);
    const tooHigh = y < 44 ? 44 - y : 0;
    return score + outside * 8 + tooHigh * 1.5 + Math.abs(y - 68) * 0.22;
  }, 0);
}

function readableChordNotationNotes(notes) {
  const candidates = [-24, -12, 0, 12, 24].map((shift) => {
    const shifted = notes.map((note) => ({ ...note, absolute: note.absolute + shift }));
    return {
      notes: shifted,
      score: chordNotationLedgerScore(shifted)
    };
  });
  candidates.sort((a, b) => a.score - b.score);
  return candidates[0]?.notes || notes;
}

function renderChordNotation(container) {
  if (!window.Vex?.Flow) return;
  const labels = (container.dataset.labels || "").split(",").filter(Boolean);
  const duration = container.dataset.duration || "w";
  const dots = Number(container.dataset.dots || 0);
  const showClef = container.dataset.clef !== "false";
  const absoluteNotes = container.dataset.notes
    .split(",")
    .map((value, index) => ({ absolute: Number(value), label: labels[index] }))
    .filter((note) => Number.isFinite(note.absolute));
  if (!absoluteNotes.length) return;

  const large = container.classList.contains("chord-notation-staff");
  const notationNotes = large ? readableChordNotationNotes(absoluteNotes) : absoluteNotes;
  const vfNotes = notationNotes
    .map(notationKeyFromNote)
    .sort((a, b) => {
      const [noteA, octaveA] = a.key.split("/");
      const [noteB, octaveB] = b.key.split("/");
      return Number(octaveA) - Number(octaveB) || noteA.localeCompare(noteB);
  });
  const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental, Dot, Barline } = window.Vex.Flow;
  container.innerHTML = "";
  const compactSequence = container.classList.contains("chord-sequence-staff") && !showClef;
  const rendererWidth = large ? 170 : (compactSequence ? 148 : 190);
  const rendererHeight = large ? 92 : (container.classList.contains("chord-sequence-staff") ? 108 : 84);
  const staveWidth = large ? 158 : rendererWidth;
  const formatWidth = large ? 56 : (compactSequence ? 74 : 104);
  const renderer = new Renderer(container, Renderer.Backends.SVG);
  renderer.resize(rendererWidth, rendererHeight);
  const context = renderer.getContext();
  const stave = new Stave(0, large ? 10 : 4, staveWidth);
  if (showClef) stave.addClef("treble");
  if (Barline?.type?.NONE != null) {
    stave.setBegBarType(Barline.type.NONE);
    stave.setEndBarType(Barline.type.NONE);
  }
  stave.setContext(context).draw();
  const chord = new StaveNote({
    clef: "treble",
    keys: vfNotes.map((note) => note.key),
    duration
  });
  vfNotes.forEach((note, index) => {
    if (note.accidental) chord.addModifier(new Accidental(note.accidental), index);
  });
  if (dots > 0) {
    if (typeof chord.addDotToAll === "function") {
      for (let index = 0; index < dots; index += 1) chord.addDotToAll();
    } else if (Dot) {
      vfNotes.forEach((_note, noteIndex) => {
        for (let dotIndex = 0; dotIndex < dots; dotIndex += 1) {
          chord.addModifier(new Dot(), noteIndex);
        }
      });
    }
  }
  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  if (typeof voice.setStrict === "function") voice.setStrict(false);
  voice.addTickables([chord]);
  new Formatter().joinVoices([voice]).format([voice], formatWidth);
  voice.draw(context, stave);

  const card = container.closest(".song-chord-card");
  const measure = container.closest(".song-measure");
  if (card && measure) {
    if (container.dataset.measureStart === "true") addStaffBarline(container, stave, stave.getX());
    if (container.dataset.staffEnd === "true") {
      addStaffBarline(container, stave, stave.getX() + stave.getWidth(), "staff-barline staff-end-barline");
    }
  }
}

function renderSongNotation(root = document) {
  root.querySelectorAll(".song-notation").forEach((container) => {
    try {
      renderChordNotation(container);
    } catch {
      container.innerHTML = "";
    }
  });
}

function updateSongNotationClefs(root = songSections) {
  const grids = root.matches?.(".song-chord-grid")
    ? [root]
    : [...root.querySelectorAll(".song-chord-grid")];
  grids.forEach((grid) => {
    const notations = [...grid.querySelectorAll(".song-notation")];
    const rows = [];
    const measures = [...grid.querySelectorAll(".song-measure")];
    measures.forEach((measure) => {
      const measureNotations = [...measure.querySelectorAll(".song-notation")];
      if (!measureNotations.length) return;
      const rowTop = Math.round(measure.getBoundingClientRect().top);
      const row = rows.find((item) => item.rowTop === rowTop);
      if (row) {
        row.notations.push(...measureNotations);
      } else {
        rows.push({ rowTop, notations: measureNotations });
      }
    });
    const isPrintLayout = document.body.classList.contains("print-layout-probe");
    const clefNotations = new Set(isPrintLayout && notations[0]
      ? [notations[0]]
      : rows.map((row) => row.notations[0]));
    const endNotations = new Set(rows.map((row) => row.notations[row.notations.length - 1]));
    notations.forEach((notation) => {
      notation.dataset.clef = clefNotations.has(notation) ? "true" : "false";
      notation.dataset.staffEnd = endNotations.has(notation) ? "true" : "false";
    });
  });
}

function updateAndRenderSongNotation(root = songSections) {
  updateSongNotationClefs(root);
  renderSongNotation(root);
}

function nextAnimationFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

async function prepareSongPrintNotation() {
  document.body.classList.add("print-layout-probe");
  await nextAnimationFrame();
  updateAndRenderSongNotation();
  await nextAnimationFrame();
  updateAndRenderSongNotation();
}

function cleanupSongPrintNotation() {
  document.body.classList.remove("print-layout-probe");
  updateAndRenderSongNotation();
}

function keySignatureLabel(key, scale) {
  if (scale.id === "major" || scale.id === "majorPentatonic") return key.label;
  const relativeMajorPitch = mod(key.pitch + 3, 12);
  const relativeMajorLabels = {
    0: "C",
    1: "Db",
    2: "D",
    3: "Eb",
    4: "E",
    5: "F",
    6: key.accidental === "flat" ? "Gb" : "F#",
    7: "G",
    8: "Ab",
    9: "A",
    10: "Bb",
    11: "B"
  };
  return relativeMajorLabels[relativeMajorPitch] || "C";
}

function keySignatureAccidentals(signature) {
  const signatures = {
    C: {},
    G: { F: "#" },
    D: { F: "#", C: "#" },
    A: { F: "#", C: "#", G: "#" },
    E: { F: "#", C: "#", G: "#", D: "#" },
    B: { F: "#", C: "#", G: "#", D: "#", A: "#" },
    "F#": { F: "#", C: "#", G: "#", D: "#", A: "#", E: "#" },
    F: { B: "b" },
    Bb: { B: "b", E: "b" },
    Eb: { B: "b", E: "b", A: "b" },
    Ab: { B: "b", E: "b", A: "b", D: "b" },
    Db: { B: "b", E: "b", A: "b", D: "b", G: "b" },
    Gb: { B: "b", E: "b", A: "b", D: "b", G: "b", C: "b" }
  };
  return signatures[signature] || {};
}

function scaleNotationKey(note, signatureAccidentals) {
  const midi = midiFromAbsolutePitch(note.absolute);
  const label = note.label;
  const letter = label[0].toLowerCase();
  const writtenAccidental = label.slice(1);
  const writtenPitch = naturalPitch[label[0]] + accidentalOffset(writtenAccidental);
  const octave = Math.round((midi - writtenPitch) / 12) - 1;
  const keyAccidental = signatureAccidentals[label[0]] || "";
  let accidental = "";
  if (writtenAccidental && writtenAccidental !== keyAccidental) accidental = writtenAccidental;
  if (!writtenAccidental && keyAccidental) accidental = "n";
  return {
    key: `${letter}/${octave}`,
    accidental
  };
}

function scaleNotationLedgerScore(notes) {
  return notes.reduce((score, note) => {
    const y = staffYForNote(note);
    const outside = y < 30 ? 30 - y : (y > 80 ? y - 80 : 0);
    return score + outside * 8 + Math.abs(y - 55) * 0.08;
  }, 0);
}

function readableScaleNotationNotes(notes) {
  const candidates = [-12, 0, 12].map((shift) => {
    const shifted = notes.map((note) => ({ ...note, absolute: note.absolute + shift }));
    return {
      shift,
      notes: shifted,
      score: scaleNotationLedgerScore(shifted) + Math.abs(shift) * 0.05
    };
  });
  candidates.sort((a, b) => a.score - b.score);
  return candidates[0]?.notes || notes;
}

function renderScaleNotation(container, notes) {
  container.innerHTML = "";
  if (!window.Vex?.Flow) return;
  const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = window.Vex.Flow;
  const shiftedNotes = readableScaleNotationNotes(notes);
  const signature = keySignatureLabel(songState.key, songState.scale);
  const signatureAccidentals = keySignatureAccidentals(signature);
  const vfNotes = shiftedNotes.map((note) => scaleNotationKey(note, signatureAccidentals));
  const renderer = new Renderer(container, Renderer.Backends.SVG);
  renderer.resize(520, 124);
  const context = renderer.getContext();
  const stave = new Stave(10, 12, 500);
  stave.addClef("treble");
  stave.addKeySignature(signature);
  stave.setContext(context).draw();
  const staveNotes = vfNotes.map((note) => {
    const staveNote = new StaveNote({
      clef: "treble",
      keys: [note.key],
      duration: "q"
    });
    if (note.accidental) staveNote.addModifier(new Accidental(note.accidental), 0);
    return staveNote;
  });
  const voice = new Voice({ num_beats: staveNotes.length, beat_value: 4 }).addTickables(staveNotes);
  new Formatter().joinVoices([voice]).format([voice], 380);
  voice.draw(context, stave);
}

function staffYForNote(note) {
  const midi = midiFromAbsolutePitch(note.absolute);
  const octave = Math.floor(midi / 12) - 1;
  const letterIndex = letters.indexOf(note.label[0]);
  const bottomLineE4 = 4 * 7 + letters.indexOf("E");
  const noteIndex = octave * 7 + letterIndex;
  return 72 - (noteIndex - bottomLineE4) * 4.5;
}

function frequencyFromMidi(midi) {
  return 440 * (2 ** ((midi - 69) / 12));
}

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContextClass();
  }
  return audioContext;
}

function resetAudioContext() {
  if (!audioContext) return;
  const context = audioContext;
  audioContext = null;
  pianoOutput = null;
  if (context.state !== "closed") {
    context.close().catch(() => {});
  }
}

function stopStandaloneAudioPlayback() {
  if (isSongPlaying) {
    stopSongPlayback();
  } else {
    resetAudioContext();
  }
  clearScaleKeyHighlights();
}

function createImpulseResponse(context, seconds = 1.15, decay = 2.6) {
  const length = Math.floor(context.sampleRate * seconds);
  const impulse = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < 2; channel += 1) {
    const data = impulse.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      const envelope = (1 - index / length) ** decay;
      data[index] = (Math.random() * 2 - 1) * envelope * 0.42;
    }
  }
  return impulse;
}

function getPianoOutput(context) {
  if (pianoOutput) return pianoOutput;
  const dry = context.createGain();
  const wet = context.createGain();
  const convolver = context.createConvolver();
  const compressor = context.createDynamicsCompressor();
  dry.gain.value = 0.9;
  wet.gain.value = 0.12;
  convolver.buffer = createImpulseResponse(context);
  compressor.threshold.value = -18;
  compressor.knee.value = 18;
  compressor.ratio.value = 3;
  compressor.attack.value = 0.012;
  compressor.release.value = 0.22;
  dry.connect(compressor);
  dry.connect(convolver);
  convolver.connect(wet);
  wet.connect(compressor);
  compressor.connect(context.destination);
  pianoOutput = dry;
  return pianoOutput;
}

function playHammerNoise(context, destination, startTime, velocity) {
  const sampleCount = Math.floor(context.sampleRate * 0.045);
  const buffer = context.createBuffer(1, sampleCount, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < sampleCount; index += 1) {
    const envelope = 1 - index / sampleCount;
    data[index] = (Math.random() * 2 - 1) * envelope * envelope;
  }
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(2400, startTime);
  filter.Q.setValueAtTime(0.7, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.002, velocity * 0.18), startTime + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.055);
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  source.start(startTime);
  source.stop(startTime + 0.06);
}

function playPianoTone(context, frequency, startTime, duration, velocity) {
  const destination = getPianoOutput(context);
  const output = context.createGain();
  const filter = context.createBiquadFilter();
  const body = context.createGain();
  const lowShelf = context.createBiquadFilter();
  const highShelf = context.createBiquadFilter();
  lowShelf.type = "lowshelf";
  lowShelf.frequency.setValueAtTime(180, startTime);
  lowShelf.gain.setValueAtTime(3.8, startTime);
  highShelf.type = "highshelf";
  highShelf.frequency.setValueAtTime(2600, startTime);
  highShelf.gain.setValueAtTime(-8, startTime);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(3600, startTime);
  filter.frequency.exponentialRampToValueAtTime(950, startTime + Math.max(0.8, duration * 0.75));
  body.gain.setValueAtTime(0.0001, startTime);
  body.gain.exponentialRampToValueAtTime(velocity * 0.92, startTime + 0.028);
  body.gain.exponentialRampToValueAtTime(Math.max(0.0001, velocity * 0.62), startTime + 0.38);
  body.gain.exponentialRampToValueAtTime(Math.max(0.0001, velocity * 0.28), startTime + duration * 0.92);
  body.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 1.95);
  filter.connect(lowShelf);
  lowShelf.connect(highShelf);
  highShelf.connect(body);
  body.connect(output);
  output.gain.setValueAtTime(0.78, startTime);
  output.connect(destination);

  [
    { multiple: 1, gain: 0.82, type: "sine", detune: 0, decay: 1.9 },
    { multiple: 1.006, gain: 0.52, type: "triangle", detune: 6, decay: 1.65 },
    { multiple: 2.01, gain: 0.5, type: "sine", detune: -5, decay: 1.15 },
    { multiple: 3.02, gain: 0.22, type: "sine", detune: 4, decay: 0.72 },
    { multiple: 4.04, gain: 0.13, type: "sine", detune: -7, decay: 0.48 },
    { multiple: 5.08, gain: 0.06, type: "sine", detune: 8, decay: 0.35 }
  ].forEach((partial) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = partial.type;
    osc.frequency.setValueAtTime(frequency * partial.multiple, startTime);
    osc.detune.setValueAtTime(partial.detune, startTime);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(partial.gain, startTime + 0.024);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + Math.max(0.4, duration * partial.decay));
    osc.connect(gain);
    gain.connect(filter);
    osc.start(startTime);
    osc.stop(startTime + duration * 2 + 0.08);
  });
}

function playCurrentChord() {
  if (state.chordMode !== "search" && !state.chordActive) return;
  if (!isSongPlaying) resetAudioContext();
  const context = getAudioContext();
  const now = context.currentTime + 0.03;
  const scale = scaleNotes(state.key, state.scale);
  const rootAbsolute = state.selectedRootAbsolute ?? bestRootAbsoluteForScale(state.root, state.quality, state.inversion, scale);
  const notes = state.chordMode === "search"
    ? searchNotesForKeyboard()
    : voicedNotes(state.root, state.quality, state.inversion, rootAbsolute);
  notes.forEach((note, index) => {
    const frequency = frequencyFromMidi(midiFromAbsolutePitch(note.absolute));
    playPianoTone(context, frequency, now + index * 0.024, 2.8, 0.18);
  });
}

function clearScaleKeyHighlights() {
  scaleHighlightTimeouts.forEach((timeout) => window.clearTimeout(timeout));
  scaleHighlightTimeouts = [];
  keyboard.querySelectorAll(".scale-playing").forEach((key) => key.classList.remove("scale-playing"));
}

function highlightScaleKey(note, delayMs, durationMs) {
  const targetAbsolute = 3 * 12 + note.absolute;
  const timeout = window.setTimeout(() => {
    const key = [...keyboard.querySelectorAll("button")].find((item) => {
      const absolute = Number(item.dataset.octave) * 12 + Number(item.dataset.pitch);
      return absolute === targetAbsolute;
    });
    if (!key) return;
    key.classList.add("scale-playing");
    const clearTimeout = window.setTimeout(() => {
      key.classList.remove("scale-playing");
    }, durationMs);
    scaleHighlightTimeouts.push(clearTimeout);
  }, delayMs);
  scaleHighlightTimeouts.push(timeout);
}

function playCurrentScale() {
  stopStandaloneAudioPlayback();
  const context = getAudioContext();
  const scale = scaleNotes(state.key, state.scale);
  const finalRoot = scale[0]
    ? { ...scale[0], absolute: scale[0].absolute + 12 }
    : null;
  const notes = finalRoot ? [...scale, finalRoot] : scale;
  const now = context.currentTime + 0.04;
  notes.forEach((note, index) => {
    const isLast = index === notes.length - 1;
    const frequency = frequencyFromMidi(midiFromAbsolutePitch(note.absolute - 12));
    const delay = index * 0.42;
    playPianoTone(context, frequency, now + delay, isLast ? 2.1 : 1.45, isLast ? 0.2 : 0.16);
    highlightScaleKey(note, delay * 1000, isLast ? 650 : 420);
  });
}

function playCurrentScaleFromButton() {
  focusScaleOnKeyboard();
  playCurrentScale();
}

function playCurrentSelection() {
  if (state.chordMode === "search" || state.chordActive) {
    playCurrentChord();
    return;
  }
  playCurrentScaleFromButton();
}

function fillControls() {
  rootOptions.forEach((root, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = root.label;
    rootSelect.append(option);
    customRootSelect?.append(option.cloneNode(true));
  });

  keyOptions.forEach((key, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = key.label;
    keySelect.append(option);
    songKeySelect.append(option.cloneNode(true));
    selectedSongTranspose?.append(option.cloneNode(true));
    customKeySelect?.append(option.cloneNode(true));
  });

  scales.forEach((scale) => {
    const option = document.createElement("option");
    option.value = scale.id;
    option.textContent = scale.name;
    scaleSelect.append(option);
    songScaleSelect.append(option.cloneNode(true));
    customScaleSelect?.append(option.cloneNode(true));
  });

  qualities.forEach((quality) => {
    const option = document.createElement("option");
    option.value = quality.id;
    option.textContent = quality.name;
    qualitySelect.append(option);
    customQualitySelect?.append(option.cloneNode(true));
  });

  keyOptions.forEach((key) => {
    ["majeur", "mineur"].forEach((scaleName) => {
      const option = document.createElement("option");
      option.value = `${key.label} ${scaleName}`;
      option.textContent = `${key.label} ${scaleName}`;
      addSongKey?.append(option);
    });
  });
}

function updateChordRootOptions(scale) {
  const selectedValue = rootSelect.value || String(rootOptions.indexOf(state.root));
  const options = rootOptions.map((root, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = root.label;
    return option;
  });
  rootSelect.replaceChildren(...options);
  rootSelect.value = selectedValue;
}

function inspirationGroupForScale(scale) {
  return scale.id.toLowerCase().includes("minor") || scale.name.toLowerCase().includes("mineur")
    ? "minor"
    : "major";
}

function enharmonicKeyLabel(label) {
  const root = rootOptions.find((option) => option.label === label);
  return rootOptions.find((option) => option.pitch === root?.pitch && option.label !== label)?.label || label;
}

function suggestionsForCurrentScale() {
  const group = inspirationGroupForScale(state.scale);
  const library = songInspirations[group] || songInspirations.major;
  const label = currentSongLibraryLabel();
  const hidden = hiddenSongsForLabel(label);
  return (library[state.key.label] || library[enharmonicKeyLabel(state.key.label)] || songInspirations.major.C)
    .filter((song) => !hidden.has(songIdentifier(song)));
}

function songHasChordData(song) {
  return Boolean(
    (Array.isArray(song?.sections) && song.sections.length)
    || song?.chords
    || song?.file
  );
}

function keyOptionFromLabel(label) {
  if (!label) return null;
  const keyLabel = keyPartsFromSongJsonLabel(label).keyLabel;
  return keyOptions.find((key) => key.label === keyLabel)
    || keyOptions.find((key) => key.pitch === rootOptions.find((root) => root.label === keyLabel)?.pitch)
    || null;
}

function majorScaleForKeyLabel(label) {
  const key = keyOptionFromLabel(label) || state.key;
  const majorScale = scales.find((scale) => scale.id === "major") || state.scale;
  return { key, scale: majorScale, notes: scaleNotes(key, majorScale) };
}

function contextualChromaticRootLabel(pitch, contextKeyLabel) {
  const key = keyOptionFromLabel(contextKeyLabel) || state.key;
  const relativePitch = mod(pitch - key.pitch, 12);
  const borrowedMajorAccidentals = {
    1: "flat",
    3: "flat",
    6: "sharp",
    8: "flat",
    10: "flat"
  };
  const preferredAccidental = borrowedMajorAccidentals[relativePitch]
    || (key?.accidental === "sharp" ? "sharp" : "flat");
  const uncommonRootLabels = new Set(["E#", "B#", "Cb", "Fb"]);
  return rootOptions.find((root) => root.pitch === pitch && root.accidental === preferredAccidental && !uncommonRootLabels.has(root.label))?.label
    || rootOptions.find((root) => root.pitch === pitch && root.accidental === "natural")?.label
    || rootOptions.find((root) => root.pitch === pitch && !uncommonRootLabels.has(root.label))?.label
    || chromaticLabels[pitch];
}

function keyPartsFromSongJsonLabel(label) {
  const text = String(label || "").trim();
  const match = text.match(/^(.+?)\s+(majeur|major|mineur|minor)$/i);
  const keyLabel = match ? match[1].trim() : text;
  const scaleText = match ? match[2].toLowerCase() : "majeur";
  return {
    group: scaleText === "mineur" || scaleText === "minor" ? "minor" : "major",
    keyLabel
  };
}

function songOriginalKeyLabel(song) {
  const songKey = keyPartsFromSongJsonLabel(song?.key || "").keyLabel;
  const sectionKey = song?.sections?.find((section) => section.key)?.key || "";
  return keyOptionFromLabel(songKey)?.label
    || keyOptionFromLabel(sectionKey)?.label
    || state.key.label;
}

function selectedSongTransposeKeyLabel(song = state.selectedInspirationSong) {
  return keyOptionFromLabel(state.selectedSongTransposeKey)?.label || songOriginalKeyLabel(song);
}

function transposeIntervalForSong(song = state.selectedInspirationSong) {
  const sourceKey = keyOptionFromLabel(songOriginalKeyLabel(song));
  const targetKey = keyOptionFromLabel(selectedSongTransposeKeyLabel(song));
  if (!sourceKey || !targetKey) return 0;
  return mod(targetKey.pitch - sourceKey.pitch, 12);
}

function labelForTransposedPitch(pitch, contextKeyLabel) {
  const contextScale = majorScaleForKeyLabel(contextKeyLabel);
  const scaleNote = contextScale.notes.find((note) => note.pitch === pitch);
  if (scaleNote) return scaleNote.label;
  return rootOptions.find((root) => root.pitch === pitch && root.accidental === "natural")?.label
    || contextualChromaticRootLabel(pitch, contextKeyLabel);
}

function transposeKeyLabel(label, interval, targetContextLabel = null) {
  const key = keyOptionFromLabel(label);
  if (!key) return keyPartsFromSongJsonLabel(label).keyLabel || label;
  if (mod(interval, 12) === 0) return key.label;
  const targetPitch = mod(key.pitch + interval, 12);
  return keyOptions.find((option) => option.pitch === targetPitch && option.accidental === key.accidental)?.label
    || keyOptions.find((option) => option.pitch === targetPitch)?.label
    || labelForTransposedPitch(targetPitch, targetContextLabel || selectedSongTransposeKeyLabel());
}

function transposeChordToken(token, interval, contextKeyLabel) {
  const parsed = parseChordToken(token);
  if (!parsed || parsed.noChord) return chordEntryToken(token);
  if (mod(interval, 12) === 0) {
    const rootLabel = labelForTransposedPitch(parsed.root.pitch, contextKeyLabel);
    const bassLabel = parsed.bass ? labelForTransposedPitch(parsed.bass.pitch, contextKeyLabel) : "";
    return `${rootLabel}${parsed.quality.symbol}${bassLabel ? `/${bassLabel}` : ""}`;
  }
  const rootLabel = labelForTransposedPitch(mod(parsed.root.pitch + interval, 12), contextKeyLabel);
  const bassLabel = parsed.bass
    ? labelForTransposedPitch(mod(parsed.bass.pitch + interval, 12), contextKeyLabel)
    : "";
  const symbol = `${rootLabel}${parsed.quality.symbol}${bassLabel ? `/${bassLabel}` : ""}`;
  return symbol;
}

function transposeChordEntry(entry, interval, contextKeyLabel) {
  const token = transposeChordToken(chordEntryToken(entry), interval, contextKeyLabel);
  if (typeof entry === "object" && entry !== null) {
    return { ...entry, token };
  }
  return token;
}

function transposedSongSections(song) {
  if (!Array.isArray(song?.sections) || !song.sections.length) return null;
  const interval = transposeIntervalForSong(song);
  return song.sections.map((section) => {
    const sectionKey = section.key || songOriginalKeyLabel(song);
    const transposedKey = transposeKeyLabel(sectionKey, interval, selectedSongTransposeKeyLabel(song));
    return {
      ...section,
      key: transposedKey,
      measures: (section.measures || []).map((measure) => {
        const measureMeta = !Array.isArray(measure) && measure && typeof measure === "object" ? measure : null;
        const measureKey = measureMeta?.key || sectionKey;
        const transposedMeasureKey = transposeKeyLabel(measureKey, interval, selectedSongTransposeKeyLabel(song));
        const chords = measureEntriesFromMeasure(measure);
        const transposedChords = chords.map((entry) => transposeChordEntry(entry, interval, transposedMeasureKey));
        return measureMeta ? { ...measureMeta, key: transposedMeasureKey, chords: transposedChords } : transposedChords;
      })
    };
  });
}

function normalizeSongJsonEntry(entry) {
  if (!entry || typeof entry !== "object") return null;
  const title = entry.title || entry.titel || "";
  const artist = entry.artist || entry.artiest || "";
  if (!title || !artist) return null;
  return compactSongData({
    title,
    artist,
    style: entry.style || entry.genre || "",
    year: entry.year || entry.jaar || "",
    level: entry.level || entry.niveau || "",
    image: entry.image || entry.afbeelding || "",
    youtube: entry.youtube || entry.youtubeLink || entry.youtubeUrl || "",
    mediaKey: entry.mediaKey || "",
    mediaUrl: entry.mediaUrl || entry.audioUrl || entry.audioLink || entry.audio || "",
    mediaType: entry.mediaType || "",
    mediaName: entry.mediaName || "",
    meter: entry.meter || entry.maatsoort || "",
    file: entry.file || entry.bestand || entry.musicxml || entry.musicXml || "",
    sections: entry.sections || entry.secties || undefined
  });
}

function compactSongData(song) {
  return Object.fromEntries(Object.entries(song).filter(([, value]) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null && value !== "";
  }));
}

function remoteLibraryEnabled() {
  return Boolean(remoteConfig.supabaseUrl && remoteConfig.supabaseAnonKey && remoteConfig.songsTable);
}

function remoteFavoritesEnabled() {
  return Boolean(remoteConfig.supabaseUrl && remoteConfig.supabaseAnonKey && remoteConfig.favoritesTable);
}

function remoteBaseUrl() {
  return String(remoteConfig.supabaseUrl || "").replace(/\/+$/, "");
}

function remoteHeaders(extra = {}) {
  const token = authAccessToken || remoteConfig.supabaseAnonKey;
  return {
    apikey: remoteConfig.supabaseAnonKey,
    Authorization: `Bearer ${token}`,
    ...extra
  };
}

function authClientEnabled() {
  return Boolean(remoteConfig.supabaseUrl && remoteConfig.supabaseAnonKey && window.supabase?.createClient);
}

const authClient = authClientEnabled()
  ? window.supabase.createClient(remoteBaseUrl(), remoteConfig.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

function setAuthStatus(message, isError = false) {
  if (!authStatus) return;
  authStatus.textContent = message;
  authStatus.classList.toggle("is-error", Boolean(isError));
}

function setAuthView(mode) {
  document.body.classList.remove("auth-loading", "auth-locked", "auth-unlocked");
  document.body.classList.add(mode);
  if (authGate) authGate.hidden = mode === "auth-unlocked";
  if (authLogout) authLogout.hidden = mode !== "auth-unlocked";
  if (mobileAuthLogout) mobileAuthLogout.hidden = mode !== "auth-unlocked";
}

function isLocalDevBypass() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("dev") === "0") return false;
  const host = window.location.hostname;
  return host === "localhost"
    || host === "127.0.0.1"
    || host === "::1"
    || /^10\./.test(host)
    || /^192\.168\./.test(host)
    || /^172\.(1[6-9]|2\d|3[0-1])\./.test(host);
}

function clearAdminAccess() {
  state.isAdmin = false;
  state.currentUserEmail = "";
  state.schemaEditMode = false;
  updateAdminUi();
}

async function refreshAdminAccess(user = null) {
  state.currentUserEmail = user?.email || "";
  state.isAdmin = false;
  if (isLocalDevBypass()) {
    state.isAdmin = true;
    state.currentUserEmail = "local-admin";
    updateAdminUi();
    return true;
  }
  if (authClient && user?.id) {
    try {
      const { data, error } = await authClient
        .from("profiles")
        .select("role,email")
        .eq("user_id", user.id)
        .maybeSingle();
      if (!error && data?.role === "admin") {
        state.isAdmin = true;
        state.currentUserEmail = data.email || user.email || "";
      }
    } catch (error) {
      console.warn("admin role check failed", error);
    }
  }
  if (!state.isAdmin) state.schemaEditMode = false;
  updateAdminUi();
  return state.isAdmin;
}

function updateAdminUi() {
  const isAdmin = Boolean(state.isAdmin);
  adminOnlyElements.forEach((element) => {
    element.hidden = !isAdmin;
    element.classList.toggle("is-admin-hidden", !isAdmin);
  });
  if (deleteSelectedSongButton) {
    deleteSelectedSongButton.hidden = !isAdmin || !state.selectedInspirationSong;
  }
  if (selectedSongAdminTools) {
    selectedSongAdminTools.hidden = !isAdmin || !songHasChordData(state.selectedInspirationSong);
  }
  if (songSchemaEditToggle) {
    songSchemaEditToggle.textContent = state.schemaEditMode ? "Sluit editor" : "Bewerk schema";
  }
  if (!isAdmin) state.schemaEditMode = false;
  renderSongSchemaEditor();
  renderSongLibraryStats();
}

async function claimCurrentUserEntitlements() {
  if (!authClient) return 0;
  const { data, error } = await authClient.rpc("claim_entitlements_for_current_user");
  if (error) throw error;
  return Number(data || 0);
}

async function hasActiveEntitlement() {
  if (!authClient) return false;
  const { data, error } = await authClient.rpc("has_active_entitlement");
  if (error) throw error;
  return Boolean(data);
}

async function refreshAuthAccess({ showWelcome = false } = {}) {
  if (isLocalDevBypass()) {
    authAccessToken = remoteConfig.supabaseAnonKey || "";
    await refreshAdminAccess();
    setAuthView("auth-unlocked");
    setAuthStatus("Lokale ontwikkelmodus actief.");
    return true;
  }

  if (!authClient) {
    clearAdminAccess();
    setAuthView("auth-locked");
    setAuthStatus("Login is nog niet beschikbaar. Controleer de Supabase-instellingen.", true);
    return false;
  }

  setAuthView("auth-loading");
  const { data: sessionData, error: sessionError } = await authClient.auth.getSession();
  if (sessionError) {
    clearAdminAccess();
    setAuthView("auth-locked");
    setAuthStatus("Inloggen lukte niet. Probeer de link opnieuw.", true);
    return false;
  }

  const session = sessionData?.session;
  if (!session?.user) {
    authAccessToken = "";
    clearAdminAccess();
    setAuthView("auth-locked");
    setAuthStatus("Log in met het e-mailadres waarmee de app is gekocht.");
    return false;
  }

  try {
    authAccessToken = session.access_token || "";
    await claimCurrentUserEntitlements();
    const isAdmin = await refreshAdminAccess(session.user);
    const allowed = isAdmin || await hasActiveEntitlement();
    if (!allowed) {
      clearAdminAccess();
      setAuthView("auth-locked");
      setAuthStatus("Dit e-mailadres heeft nog geen actieve toegang. Controleer het e-mailadres van de bestelling.", true);
      return false;
    }

    setAuthView("auth-unlocked");
    setAuthStatus(showWelcome ? "Je bent ingelogd. De app is geopend." : "");
    loadRemoteSongLibrary();
    return true;
  } catch (error) {
    clearAdminAccess();
    setAuthView("auth-locked");
    setAuthStatus("De toegang kon niet gecontroleerd worden. Probeer het zo opnieuw.", true);
    console.warn("auth access check failed", error);
    return false;
  }
}

function safeRemotePathPart(value) {
  return String(value || "bestand")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "bestand";
}

function remoteSongPayload(label, song) {
  const data = compactSongData(normalizeSongJsonEntry(song) || song);
  return {
    library_label: label,
    song_key: songIdentifier(data),
    title: data.title,
    artist: data.artist,
    data
  };
}

function openMediaDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(mediaDatabaseName, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(mediaStoreName);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveMediaFile(file) {
  if (!file) return null;
  const db = await openMediaDatabase();
  const key = `${Date.now()}-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`;
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(mediaStoreName, "readwrite");
    transaction.objectStore(mediaStoreName).put(file, key);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
  return {
    mediaKey: key,
    mediaType: file.type || "",
    mediaName: file.name || "Audio/video"
  };
}

async function uploadRemoteMediaFile(file, song) {
  if (!file || !remoteLibraryEnabled() || !remoteConfig.mediaBucket) return null;
  const path = [
    safeRemotePathPart(songIdentifier(song)),
    `${Date.now()}-${safeRemotePathPart(file.name || "media")}`
  ].join("/");
  const response = await fetch(`${remoteBaseUrl()}/storage/v1/object/${encodeURIComponent(remoteConfig.mediaBucket)}/${path}`, {
    method: "POST",
    headers: remoteHeaders({
      "content-type": file.type || "application/octet-stream",
      "x-upsert": "true"
    }),
    body: file
  });
  if (!response.ok) throw new Error("Remote media upload failed");
  return {
    mediaUrl: `${remoteBaseUrl()}/storage/v1/object/public/${encodeURIComponent(remoteConfig.mediaBucket)}/${path}`,
    mediaType: file.type || "",
    mediaName: file.name || "Audio/video"
  };
}

async function saveSongMediaFile(file, song) {
  if (!file) return null;
  try {
    const remote = await uploadRemoteMediaFile(file, song);
    if (remote) return remote;
  } catch {
    // If central upload is not ready yet, keep the app usable with local browser storage.
  }
  return saveMediaFile(file);
}

async function loadMediaFile(key) {
  if (!key) return null;
  const db = await openMediaDatabase();
  const file = await new Promise((resolve, reject) => {
    const transaction = db.transaction(mediaStoreName, "readonly");
    const request = transaction.objectStore(mediaStoreName).get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return file;
}

async function loadRemoteSongLibrary() {
  if (!remoteLibraryEnabled()) return;
  try {
    const response = await fetch(`${remoteBaseUrl()}/rest/v1/${encodeURIComponent(remoteConfig.songsTable)}?select=library_label,data&order=updated_at.desc`, {
      headers: remoteHeaders()
    });
    if (!response.ok) return;
    const rows = await response.json();
    const library = {};
    rows.forEach((row) => {
      if (!row.library_label || !row.data) return;
      library[row.library_label] ||= [];
      library[row.library_label].push(row.data);
    });
    mergeSongJsonLibrary(library);
    renderSongInspirations();
    renderSelectedInspirationSong();
  } catch {
    if (inspirationStatus) inspirationStatus.textContent = "Centrale liedjes konden niet worden geladen.";
  }
}

async function saveRemoteSong(label, song) {
  if (!remoteLibraryEnabled()) return null;
  const payload = remoteSongPayload(label, song);
  const response = await fetch(`${remoteBaseUrl()}/rest/v1/${encodeURIComponent(remoteConfig.songsTable)}?on_conflict=library_label,song_key`, {
    method: "POST",
    headers: remoteHeaders({
      "content-type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    }),
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("Remote song save failed");
  const [row] = await response.json();
  return row?.data || payload.data;
}

async function deleteRemoteSong(label, song) {
  if (!remoteLibraryEnabled()) return;
  const songKey = encodeURIComponent(songIdentifier(song));
  const libraryLabel = encodeURIComponent(label);
  await fetch(`${remoteBaseUrl()}/rest/v1/${encodeURIComponent(remoteConfig.songsTable)}?library_label=eq.${libraryLabel}&song_key=eq.${songKey}`, {
    method: "DELETE",
    headers: remoteHeaders({ Prefer: "return=minimal" })
  });
}

async function syncLocalSongsOnline() {
  if (!state.isAdmin) {
    if (inspirationStatus) inspirationStatus.textContent = "Alleen beheerders kunnen synchroniseren.";
    return;
  }
  if (!remoteLibraryEnabled()) {
    if (inspirationStatus) inspirationStatus.textContent = "Online synchronisatie is nog niet ingesteld in app-config.js.";
    return;
  }
  const localLibrary = userSongsFromStorage();
  const items = Object.entries(localLibrary)
    .flatMap(([label, songs]) => (Array.isArray(songs) ? songs : []).map((song) => ({ label, song: normalizeSongJsonEntry(song) })))
    .filter((item) => item.song);
  if (!items.length) {
    if (inspirationStatus) inspirationStatus.textContent = "Er staan geen lokale liedjes klaar om online te synchroniseren.";
    return;
  }
  if (librarySyncButton) librarySyncButton.disabled = true;
  if (inspirationStatus) inspirationStatus.textContent = `${items.length} lokale liedjes worden online gezet...`;
  let saved = 0;
  let failed = 0;
  for (const item of items) {
    try {
      await saveRemoteSong(item.label, item.song);
      saved += 1;
    } catch {
      failed += 1;
    }
  }
  await loadRemoteSongLibrary();
  if (librarySyncButton) librarySyncButton.disabled = false;
  if (inspirationStatus) {
    inspirationStatus.textContent = failed
      ? `${saved} liedjes online gezet, ${failed} niet gelukt.`
      : `${saved} lokale liedjes zijn online gezet. Open de site opnieuw op mobiel.`;
  }
}

function mergeSongList(existing = [], incoming = []) {
  const merged = [...existing];
  incoming.forEach((song) => {
    const cleanSong = compactSongData(song);
    const index = merged.findIndex((item) => songMatchesStoredItem(item, cleanSong));
    if (index >= 0) {
      const nextSong = compactSongData({ ...merged[index], ...cleanSong });
      if ("youtube" in song && !song.youtube) delete nextSong.youtube;
      merged[index] = nextSong;
    } else {
      merged.push(cleanSong);
    }
  });
  return sortSongsByTitle(merged);
}

function sortSongsByTitle(songs = []) {
  return [...songs].sort((left, right) => (
    compareSongText(left, right, "title")
    || compareSongText(left, right, "artist")
  ));
}

function addSongJsonEntries(group, keyLabel, entries) {
  const songs = entries.map(normalizeSongJsonEntry).filter(Boolean);
  if (!songs.length) return;
  songInspirations[group] ||= {};
  songInspirations[group][keyLabel] = mergeSongList(songInspirations[group][keyLabel] || [], songs);
}

function mergeSongJsonLibrary(data) {
  if (!data || typeof data !== "object") return;
  if (data.major || data.minor) {
    ["major", "minor"].forEach((group) => {
      Object.entries(data[group] || {}).forEach(([keyLabel, entries]) => {
        if (Array.isArray(entries)) addSongJsonEntries(group, keyLabel, entries);
      });
    });
    return;
  }
  Object.entries(data).forEach(([label, entries]) => {
    if (!Array.isArray(entries)) return;
    const { group, keyLabel } = keyPartsFromSongJsonLabel(label);
    addSongJsonEntries(group, keyLabel, entries);
  });
}

function userSongsFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(userSongStorageKey) || "{}");
  } catch {
    return {};
  }
}

function saveUserSongs(data) {
  localStorage.setItem(userSongStorageKey, JSON.stringify(data));
}

function hiddenSongsFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(hiddenSongStorageKey) || "{}");
  } catch {
    return {};
  }
}

function saveHiddenSongs(data) {
  localStorage.setItem(hiddenSongStorageKey, JSON.stringify(data));
}

function songIdentifier(song) {
  return `${song?.title || song?.titel || ""}::${song?.artist || song?.artiest || ""}`
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function hiddenSongsForLabel(label) {
  return new Set(hiddenSongsFromStorage()[label] || []);
}

function favoriteSongsFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(favoriteSongStorageKeyForCurrentStudent()) || "[]");
  } catch {
    return [];
  }
}

function saveFavoriteSongs(items) {
  localStorage.setItem(favoriteSongStorageKeyForCurrentStudent(), JSON.stringify([...new Set(items)]));
}

function normalizeStudentCode(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "")
    .toLowerCase()
    .slice(0, 40);
}

function currentStudentCode() {
  return normalizeStudentCode(studentCodeInput?.value || localStorage.getItem(studentCodeStorageKey) || "");
}

function favoriteSongStorageKeyForCurrentStudent() {
  const code = currentStudentCode();
  return code ? `${favoriteSongStorageKey}:${code}` : favoriteSongStorageKey;
}

function setStudentCodeStatus(message = "") {
  if (studentCodeStatus) studentCodeStatus.textContent = message;
}

async function loadRemoteFavoritesForStudent(code = currentStudentCode()) {
  if (!code || !remoteFavoritesEnabled()) return false;
  try {
    const table = encodeURIComponent(remoteConfig.favoritesTable);
    const student = encodeURIComponent(code);
    const response = await fetch(`${remoteBaseUrl()}/rest/v1/${table}?student_code=eq.${student}&select=song_key`, {
      headers: remoteHeaders()
    });
    if (!response.ok) throw new Error("Remote favorites load failed");
    const rows = await response.json();
    saveFavoriteSongs(rows.map((row) => row.song_key).filter(Boolean));
    setStudentCodeStatus(`Favorieten geladen voor ${code}.`);
    return true;
  } catch {
    setStudentCodeStatus(`Favorieten voor ${code} staan lokaal op dit apparaat.`);
    return false;
  }
}

async function saveRemoteFavoriteForStudent(song, favorite, code = currentStudentCode()) {
  if (!code || !remoteFavoritesEnabled()) return false;
  const songKey = songIdentifier(song);
  const table = encodeURIComponent(remoteConfig.favoritesTable);
  const student = encodeURIComponent(code);
  const key = encodeURIComponent(songKey);
  try {
    if (favorite) {
      const payload = {
        student_code: code,
        song_key: songKey,
        title: song.title || song.titel || "",
        artist: song.artist || song.artiest || ""
      };
      const response = await fetch(`${remoteBaseUrl()}/rest/v1/${table}?on_conflict=student_code,song_key`, {
        method: "POST",
        headers: remoteHeaders({
          "content-type": "application/json",
          Prefer: "resolution=merge-duplicates,return=minimal"
        }),
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Remote favorite save failed");
    } else {
      const response = await fetch(`${remoteBaseUrl()}/rest/v1/${table}?student_code=eq.${student}&song_key=eq.${key}`, {
        method: "DELETE",
        headers: remoteHeaders({ Prefer: "return=minimal" })
      });
      if (!response.ok) throw new Error("Remote favorite delete failed");
    }
    setStudentCodeStatus(`Favorieten opgeslagen voor ${code}.`);
    return true;
  } catch {
    setStudentCodeStatus(`Favoriet lokaal bewaard. Online opslag voor ${code} lukte niet.`);
    return false;
  }
}

function isFavoriteSong(song) {
  return favoriteSongsFromStorage().includes(songIdentifier(song));
}

async function toggleFavoriteSong(song) {
  const favorites = favoriteSongsFromStorage();
  const id = songIdentifier(song);
  const favorite = !favorites.includes(id);
  saveFavoriteSongs(favorite ? [...favorites, id] : favorites.filter((item) => item !== id));
  await saveRemoteFavoriteForStudent(song, favorite);
}

function songSearchText(song) {
  return [
    song.title,
    song.artist,
    song.style,
    song.year,
    song.level,
    songHasChordData(song) ? "akkoorden musicxml" : "",
    song.mediaUrl || song.mediaKey ? "audio" : ""
  ].filter(Boolean).join(" ").toLowerCase();
}

function compareSongText(left, right, field) {
  return String(left[field] || "").localeCompare(String(right[field] || ""), "nl", { sensitivity: "base" });
}

function songFromSuggestionItem(item) {
  return item?.song || item;
}

function labelFromSuggestionItem(item) {
  return item?.label || currentSongLibraryLabel();
}

function filteredSortedSuggestions(suggestions) {
  const query = inspirationState.query.trim().toLowerCase();
  const filtered = suggestions.filter((item) => {
    const song = songFromSuggestionItem(item);
    const label = labelFromSuggestionItem(item).toLowerCase();
    if (inspirationState.favoritesOnly && !isFavoriteSong(song)) return false;
    return !query || songSearchText(song).includes(query) || label.includes(query);
  });
  return [...filtered].sort((left, right) => {
    const leftSong = songFromSuggestionItem(left);
    const rightSong = songFromSuggestionItem(right);
    if (inspirationState.sort === "title") return compareSongText(leftSong, rightSong, "title");
    if (inspirationState.sort === "artist") return compareSongText(leftSong, rightSong, "artist") || compareSongText(leftSong, rightSong, "title");
    if (inspirationState.sort === "year") return (Number(rightSong.year) || 0) - (Number(leftSong.year) || 0) || compareSongText(leftSong, rightSong, "title");
    if (inspirationState.sort === "level") return compareSongText(leftSong, rightSong, "level") || compareSongText(leftSong, rightSong, "title");
    return 0;
  });
}

function groupedSuggestions(suggestions) {
  return suggestions.reduce((groups, item) => {
    const song = songFromSuggestionItem(item);
    const label = song.style || "Overig";
    groups[label] ||= [];
    groups[label].push(item);
    return groups;
  }, {});
}

async function applyStudentCode(value) {
  const code = normalizeStudentCode(value);
  if (studentCodeInput) studentCodeInput.value = code;
  if (code) {
    localStorage.setItem(studentCodeStorageKey, code);
    setStudentCodeStatus(`Favorieten worden bewaard voor ${code}.`);
    await loadRemoteFavoritesForStudent(code);
  } else {
    localStorage.removeItem(studentCodeStorageKey);
    setStudentCodeStatus("Vul een leerlingcode in om favorieten op meerdere apparaten te onthouden.");
  }
  renderSongInspirations();
}

function restoreStudentCode() {
  const code = normalizeStudentCode(localStorage.getItem(studentCodeStorageKey) || "");
  if (studentCodeInput) studentCodeInput.value = code;
  if (code) {
    setStudentCodeStatus(`Favorieten worden bewaard voor ${code}.`);
    loadRemoteFavoritesForStudent(code).then(() => renderSongInspirations());
  } else {
    setStudentCodeStatus("Favorieten worden lokaal bewaard. Vul een leerlingcode in voor synchronisatie.");
  }
}

function clearStoredYoutubeOnce(title, artist, migrationKey) {
  if (localStorage.getItem(migrationKey)) return;
  const data = userSongsFromStorage();
  Object.values(data).forEach((songs) => {
    if (!Array.isArray(songs)) return;
    songs.forEach((song) => {
      if ((song.titel || song.title) === title && (song.artiest || song.artist) === artist) {
        delete song.youtube;
      }
    });
  });
  saveUserSongs(data);
  localStorage.setItem(migrationKey, "1");
}

function songHasValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  return value !== undefined && value !== null && value !== "";
}

function songEntryForLabel(label, song) {
  const localData = userSongsFromStorage();
  const labels = [label, ...Object.keys(localData).filter((item) => item !== label)];
  for (const itemLabel of labels) {
    const found = (localData[itemLabel] || []).find((item) => songMatchesStoredItem(item, song));
    if (found) return found;
  }

  const { group, keyLabel } = keyPartsFromSongJsonLabel(label);
  const preferred = (songInspirations[group]?.[keyLabel] || []).find((item) => songMatchesStoredItem(item, song));
  if (preferred) return preferred;

  for (const groupName of Object.keys(songInspirations)) {
    for (const songs of Object.values(songInspirations[groupName] || {})) {
      const found = (songs || []).find((item) => songMatchesStoredItem(item, song));
      if (found) return found;
    }
  }
  return null;
}

function mergeSongUpdate(existing, incoming) {
  const base = normalizeSongJsonEntry(existing) || compactSongData(existing || {});
  const update = compactSongData(normalizeSongJsonEntry(incoming) || incoming || {});
  const merged = { ...base };
  Object.entries(update).forEach(([key, value]) => {
    if (key === "title" || key === "artist") return;
    if (songHasValue(value)) merged[key] = value;
  });
  merged.title = update.title || base.title || "";
  merged.artist = update.artist || base.artist || "";
  return compactSongData(merged);
}

function addUserSong(label, song) {
  const data = userSongsFromStorage();
  const existingSong = songEntryForLabel(label, song);
  Object.keys(data).forEach((itemLabel) => {
    data[itemLabel] = (data[itemLabel] || []).filter((item) => !songMatchesStoredItem(item, song));
    if (!data[itemLabel].length) delete data[itemLabel];
  });
  data[label] ||= [];
  const nextStored = mergeSongUpdate(existingSong, song);
  data[label].push(nextStored);
  data[label] = sortSongsByTitle(data[label]);
  saveUserSongs(data);
  mergeSongJsonLibrary(data);
  const hidden = hiddenSongsFromStorage();
  if (Array.isArray(hidden[label])) {
    hidden[label] = hidden[label].filter((id) => id !== songIdentifier(song));
    if (!hidden[label].length) delete hidden[label];
    saveHiddenSongs(hidden);
  }
  return normalizeSongJsonEntry(nextStored);
}

function songMatchesStoredItem(item, song) {
  return songIdentifier(item) === songIdentifier(song);
}

function currentSongLibraryLabel() {
  const group = inspirationGroupForScale(state.scale);
  return `${state.key.label} ${group === "minor" ? "mineur" : "majeur"}`;
}

function isUserSong(song, label = currentSongLibraryLabel()) {
  return Boolean((userSongsFromStorage()[label] || []).some((item) => songMatchesStoredItem(item, song)));
}

function removeUserSong(label, song) {
  const data = userSongsFromStorage();
  const songs = data[label] || [];
  data[label] = songs.filter((item) => !songMatchesStoredItem(item, song));
  if (!data[label].length) delete data[label];
  saveUserSongs(data);
  const { group, keyLabel } = keyPartsFromSongJsonLabel(label);
  const library = songInspirations[group]?.[keyLabel];
  if (Array.isArray(library)) {
    songInspirations[group][keyLabel] = library.filter((item) => (
      item.title !== song.title || item.artist !== song.artist
    ));
  }
  if (state.selectedInspirationSong?.title === song.title && state.selectedInspirationSong?.artist === song.artist) {
    state.selectedInspirationSong = null;
  }
}

function hideBuiltInSong(label, song) {
  const data = hiddenSongsFromStorage();
  data[label] ||= [];
  const id = songIdentifier(song);
  if (!data[label].includes(id)) data[label].push(id);
  saveHiddenSongs(data);
  if (state.selectedInspirationSong?.title === song.title && state.selectedInspirationSong?.artist === song.artist) {
    state.selectedInspirationSong = null;
    state.selectedInspirationLabel = null;
    state.schemaEditMode = false;
  }
}

function removeInspirationSong(label, song) {
  if (!state.isAdmin) return;
  if (isUserSong(song, label)) {
    removeUserSong(label, song);
  } else {
    hideBuiltInSong(label, song);
  }
  deleteRemoteSong(label, song).catch(() => {});
}

function deleteSelectedInspirationSong() {
  if (!state.isAdmin) return;
  const song = state.selectedInspirationSong;
  if (!song) {
    if (addSongStatus) addSongStatus.textContent = "Selecteer eerst een liedje om te verwijderen.";
    return;
  }
  const label = state.selectedInspirationLabel || currentSongLibraryLabel();
  removeInspirationSong(label, song);
  state.selectedInspirationSong = null;
  state.selectedInspirationLabel = null;
  state.schemaEditMode = false;
  render();
  if (addSongStatus) addSongStatus.textContent = `${song.title} is verwijderd uit ${label}.`;
}

function loadUserSongLibrary() {
  mergeSongJsonLibrary(userSongsFromStorage());
}

async function loadSongJsonLibrary() {
  try {
    const response = await fetch("songs.json", { cache: "no-store" });
    if (!response.ok) return;
    mergeSongJsonLibrary(await response.json());
    renderSongInspirations();
  } catch {
    // Opening the app directly as a file can block loading songs.json; the built-in list stays available.
  }
}

function syncAddSongKeyToCurrentScale() {
  if (!addSongKey) return;
  const label = `${state.key.label} ${inspirationGroupForScale(state.scale) === "minor" ? "mineur" : "majeur"}`;
  const matching = [...addSongKey.options].find((option) => option.value === label);
  addSongKey.value = matching?.value || `${state.key.label} majeur`;
}

function renderSongInspirations() {
  renderSongLibraryStats();
  const searchingAllKeys = Boolean(inspirationState.query.trim());
  const showingFavorites = Boolean(inspirationState.favoritesOnly);
  const showingCrossKeyList = searchingAllKeys || showingFavorites;
  const currentLabel = currentSongLibraryLabel();
  const sourceSuggestions = showingCrossKeyList
    ? allSongSearchCandidates()
    : suggestionsForCurrentScale().map((song) => ({ song, label: currentLabel }));
  const suggestions = filteredSortedSuggestions(sourceSuggestions);
  const group = inspirationGroupForScale(state.scale);
  const keyText = `${state.key.label} ${group === "minor" ? "mineur" : state.scale.name}`;
  inspirationKeyLabel.innerHTML = showingFavorites
    ? "Alle favoriete liedjes"
    : searchingAllKeys
    ? `Zoeken in alle toonsoorten`
    : `${formatMusicText(keyText)} - oefen met deze toonladder`;
  inspirationList.innerHTML = "";
  if (inspirationStatus) inspirationStatus.textContent = "";
  inspirationFavoriteFilter?.classList.toggle("active", inspirationState.favoritesOnly);
  if (!suggestions.length) {
    inspirationList.innerHTML = `<p class="inspiration-empty">Geen liedjes gevonden.</p>`;
    inspirationRefreshButton.hidden = true;
    return;
  }
  const renderSongCard = (item, target) => {
    const song = songFromSuggestionItem(item);
    const label = labelFromSuggestionItem(item);
    const userSong = isUserSong(song, label);
    const favorite = isFavoriteSong(song);
    const chordPreview = inspirationChordPreview(song);
    const keyBadge = showingFavorites ? `<i class="inspiration-key-badge">${formatMusicText(label)}</i>` : "";
    const card = document.createElement("button");
    card.type = "button";
    card.className = "inspiration-card";
    card.classList.toggle("user-song", userSong);
    card.classList.toggle("favorite", favorite);
    card.innerHTML = `
      <span class="artist-avatar" aria-hidden="true">
        ${song.image ? `<img src="${song.image}" alt="" onerror="this.remove()">` : ""}
      </span>
      <span class="inspiration-info">
        <strong>${song.title}</strong>
        <span>${song.artist}</span>
        <small><em>${song.style}</em><b>${song.year}</b>${song.level ? `<i>${song.level}</i>` : ""}${keyBadge}${searchingAllKeys && !showingFavorites ? `<i>${formatMusicText(label)}</i>` : ""}${!songHasChordData(song) ? `<u>MusicXML later</u>` : ""}</small>
        ${chordPreview ? `<span class="inspiration-chords">${chordPreview}</span>` : ""}
      </span>
      <span class="inspiration-favorite" aria-label="Favoriet" title="Favoriet">${favorite ? "★" : "☆"}</span>
    `;
    card.classList.toggle("selected", state.selectedInspirationSong?.title === song.title && state.selectedInspirationSong?.artist === song.artist);
    card.addEventListener("click", (event) => {
      if (event.target.closest(".inspiration-favorite")) {
        event.stopPropagation();
        toggleFavoriteSong(song).catch(() => {});
        renderSongInspirations();
        return;
      }
      selectInspirationSong(card, song, label);
    });
    target.append(card);
  };
  Object.entries(groupedSuggestions(suggestions)).forEach(([style, songs]) => {
    const section = document.createElement("section");
    section.className = "inspiration-group";
    section.innerHTML = `
      <h3>${escapeHtml(style)}</h3>
      <div class="inspiration-group-list"></div>
    `;
    const list = section.querySelector(".inspiration-group-list");
    songs.forEach((song) => renderSongCard(song, list));
    inspirationList.append(section);
  });
  inspirationRefreshButton.hidden = true;
}

function chordTokensFromEntries(entries) {
  return entries
    .map(chordEntryToken)
    .filter((token) => parseChordToken(token));
}

function measureChordEntries(measure) {
  if (Array.isArray(measure)) return measure;
  if (typeof measure !== "object" || measure === null) return [measure];
  if (Array.isArray(measure.chords)) return measure.chords;
  if (measure.token || measure.symbol || measure.chord || measure.name || measure.label) return [measure];
  return [];
}

function escapeAttribute(value) {
  return escapeHtml(String(value ?? "")).replace(/"/g, "&quot;");
}

function editableSongSections(song) {
  return Array.isArray(song?.sections) ? song.sections : [];
}

function editableSectionMeasures(section) {
  if (Array.isArray(section?.measures)) return section.measures;
  if (Array.isArray(section?.chords)) return [{ chords: section.chords }];
  return [];
}

function formatSchemaNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "";
  return String(Math.round(number * 100) / 100);
}

function parseSchemaNumber(value) {
  const number = Number(String(value || "").replace(",", "."));
  return Number.isFinite(number) && number > 0 ? number : null;
}

function schemaEntryTiming(entry, measure) {
  if (typeof entry !== "object" || entry === null || (entry.beats == null && entry.startBeat == null)) {
    return { startBeat: "", beats: "" };
  }
  const timing = visualTimingFromEntry(entry, measureMeter(measure));
  return {
    startBeat: formatSchemaNumber(timing.startBeat),
    beats: formatSchemaNumber(timing.beats)
  };
}

function chordEntryWithToken(entry, token, timing = {}) {
  const value = String(token || "").trim();
  if (!value) return "";
  const hasTiming = Number.isFinite(timing.startBeat) || Number.isFinite(timing.beats);
  if ((typeof entry === "string" || typeof entry === "number" || typeof entry !== "object" || entry === null) && !hasTiming) {
    return value;
  }
  const next = typeof entry === "object" && entry !== null ? { ...entry } : { token: value };
  if ("token" in next) next.token = value;
  else if ("symbol" in next) next.symbol = value;
  else if ("chord" in next) next.chord = value;
  else if ("name" in next) next.name = value;
  else if ("label" in next) next.label = value;
  else next.token = value;
  if (hasTiming) {
    if (Number.isFinite(timing.startBeat)) next.startBeat = timing.startBeat;
    else delete next.startBeat;
    if (Number.isFinite(timing.beats)) next.beats = timing.beats;
    else delete next.beats;
    delete next.timingUnit;
  }
  return next;
}

function setEditableMeasureChords(measure, chords) {
  if (Array.isArray(measure)) return chords;
  if (typeof measure === "object" && measure !== null) return { ...measure, chords };
  return { chords };
}

function schemaChordRowHtml(sectionIndex, measureIndex, originalIndex, entry = "", measure = null) {
  const token = chordEntryToken(entry);
  const timing = schemaEntryTiming(entry, measure);
  return `
    <div class="schema-chord-row" data-section-index="${sectionIndex}" data-measure-index="${measureIndex}" data-original-index="${originalIndex}">
      <label>
        <span>Akkoord</span>
        <input class="schema-chord-token" type="text" value="${escapeAttribute(token)}" aria-label="Akkoord">
      </label>
      <label>
        <span>Start</span>
        <input class="schema-chord-start" type="number" min="1" step="0.25" value="${escapeAttribute(timing.startBeat)}" aria-label="Starttel">
      </label>
      <label>
        <span>Tellen</span>
        <input class="schema-chord-beats" type="number" min="0.25" step="0.25" value="${escapeAttribute(timing.beats)}" aria-label="Aantal tellen">
      </label>
      <button type="button" class="schema-remove-chord" data-schema-action="remove-chord" aria-label="Verwijder akkoord">×</button>
    </div>`;
}

function measureNumberText(measure, index) {
  return String(measure?.measureNumber || measure?.number || measure?.bar || index + 1);
}

function sectionNameText(section, index) {
  return section?.title || section?.name || section?.label || section?.type || `Deel ${index + 1}`;
}

function sectionChordTokens(section) {
  if (!section) return [];
  if (Array.isArray(section.measures)) {
    return chordTokensFromEntries(section.measures.flatMap(measureChordEntries));
  }
  if (Array.isArray(section.chords)) return chordTokensFromEntries(section.chords);
  return [];
}

function sectionTitleText(section) {
  return String(section?.title || section?.name || section?.label || section?.type || "").trim();
}

function inspirationChorusChordTokens(song) {
  if (!Array.isArray(song?.sections)) return [];
  const chorus = song.sections.find((section) => /^(chorus|refrein)\b/i.test(sectionTitleText(section)));
  return sectionChordTokens(chorus);
}

function inspirationChordTokens(song) {
  if (Array.isArray(song?.sections)) {
    return song.sections.flatMap(sectionChordTokens);
  }
  if (!song?.chords) return [];
  if (Array.isArray(song.chords)) return chordTokensFromEntries(song.chords);
  return parseMeasures(song.chords)
    .flatMap((part) => part.measures)
    .flat()
    .map(chordEntryToken)
    .filter((token) => parseChordToken(token));
}

function inspirationChordPreview(song) {
  const chorusTokens = inspirationChorusChordTokens(song);
  const tokens = chorusTokens.length ? chorusTokens : inspirationChordTokens(song);
  return tokens
    .slice(0, 4)
    .map((token) => formatMusicText(token))
    .join(" - ");
}

function chordSearchQualityFamily(quality) {
  if (!quality) return "";
  if (["min", "min7", "min6", "min9"].includes(quality.id)) return "min";
  if (["dim", "dim7", "m7b5"].includes(quality.id)) return "dim";
  if (quality.id === "aug") return "aug";
  if (["sus2", "sus4"].includes(quality.id)) return quality.id;
  return "maj";
}

function chordSearchKeys(value) {
  const parsed = parseChordToken(value);
  if (!parsed || parsed.noChord) return null;
  return {
    exact: `${parsed.root.pitch}:${parsed.quality.id}`,
    family: `${parsed.root.pitch}:${chordSearchQualityFamily(parsed.quality)}`,
    symbol: parsed.symbol
  };
}

function chordSequenceSearchPattern() {
  return state.chordSequence
    .map((chord) => chordSearchKeys(chord.symbol))
    .filter(Boolean);
}

function allSongSearchCandidates() {
  const seen = new Set();
  return ["major", "minor"].flatMap((group) => (
    Object.entries(songInspirations[group] || {}).flatMap(([keyLabel, songs]) => {
      const label = `${keyLabel} ${group === "minor" ? "mineur" : "majeur"}`;
      const hidden = hiddenSongsForLabel(label);
      return (songs || []).map((song) => ({ song, label, group, keyLabel }))
        .filter(({ song }) => {
          const id = songIdentifier(song);
          const searchId = `${label}::${id}`;
          if (!id || seen.has(searchId) || hidden.has(id)) return false;
          seen.add(searchId);
          return true;
        });
    })
  ));
}

function keyLibrarySortIndex(group, keyLabel) {
  const keyIndex = keyOptions.findIndex((key) => key.label === keyLabel);
  const normalizedKeyIndex = keyIndex === -1 ? keyOptions.length : keyIndex;
  return (group === "minor" ? 100 : 0) + normalizedKeyIndex;
}

function renderSongLibraryStats() {
  if (!songLibraryStats || !songLibraryStatsGrid || !songLibraryTotalCount) return;
  if (!state.isAdmin) return;
  const candidates = allSongSearchCandidates();
  const totalsByLabel = new Map();
  const uniqueSongs = new Set();
  candidates.forEach(({ song, label, group, keyLabel }) => {
    const id = songIdentifier(song);
    if (!id) return;
    uniqueSongs.add(id);
    const existing = totalsByLabel.get(label) || {
      label,
      group,
      keyLabel,
      count: 0
    };
    existing.count += 1;
    totalsByLabel.set(label, existing);
  });
  keyOptions.forEach((key) => {
    const label = `${key.label} majeur`;
    if (!totalsByLabel.has(label)) {
      totalsByLabel.set(label, {
        label,
        group: "major",
        keyLabel: key.label,
        count: 0
      });
    }
  });
  const rows = [...totalsByLabel.values()].sort((left, right) => (
    keyLibrarySortIndex(left.group, left.keyLabel) - keyLibrarySortIndex(right.group, right.keyLabel)
    || left.label.localeCompare(right.label, "nl")
  ));
  songLibraryTotalCount.textContent = String(uniqueSongs.size);
  songLibraryStatsGrid.innerHTML = rows.map((row) => `
    <div class="song-library-stat-card${row.count ? "" : " is-empty"}">
      <span class="song-library-stat-label">${formatMusicText(row.label)}</span>
      <strong class="song-library-stat-count">${row.count}</strong>
    </div>
  `).join("");
}

function songWithLibraryKey(song, label) {
  if (!label) return song;
  return { ...song, key: label };
}

function songSearchMeasures(song) {
  const measures = [];
  const measureEntries = (items, meta = {}) => {
    const entries = [];
    items.forEach((token, chordIndex) => {
      const keys = chordSearchKeys(chordEntryToken(token));
      if (keys) entries.push({ ...keys, ...meta, chordIndex });
    });
    return entries;
  };
  if (Array.isArray(song?.sections)) {
    song.sections.forEach((section, sectionIndex) => {
      const sectionTitle = section.title || "";
      (section.measures || []).forEach((measure, measureIndex) => {
        const chords = measureEntriesFromMeasure(measure);
        const entries = measureEntries(chords, { sectionTitle, sectionIndex, measureIndex });
        if (entries.length) measures.push(entries);
      });
      if (Array.isArray(section.chords)) {
        const entries = measureEntries(section.chords, { sectionTitle, sectionIndex, measureIndex: 0 });
        if (entries.length) measures.push(entries);
      }
    });
    return measures;
  }
  if (Array.isArray(song.chords)) {
    const entries = measureEntries(song.chords, { sectionTitle: "", sectionIndex: 0, measureIndex: 0 });
    return entries.length ? [entries] : [];
  }
  return parseMeasures(song.chords || "")
    .flatMap((part) => part.measures)
    .map((measure, measureIndex) => measureEntries(measure, { sectionTitle: "", sectionIndex: 0, measureIndex }))
    .filter((measure) => measure.length);
}

function isLogicalChordSearchStart(entry, { requirePhraseStart = false } = {}) {
  if (Number(entry?.chordIndex || 0) !== 0) return false;
  if (!requirePhraseStart) return true;
  const measureIndex = Number(entry?.measureIndex);
  return !Number.isFinite(measureIndex) || measureIndex % 4 === 0;
}

function contiguousChordMatch(entries, pattern, key, options = {}) {
  if (entries.length < pattern.length) return [];
  const matches = [];
  for (let index = 0; index <= entries.length - pattern.length; index += 1) {
    const segment = entries.slice(index, index + pattern.length);
    const sameSection = segment.every((entry) => entry.sectionTitle === segment[0].sectionTitle);
    if (
      sameSection
      && isLogicalChordSearchStart(segment[0], options)
      && segment.every((entry, offset) => entry[key] === pattern[offset][key])
    ) {
      matches.push(segment[0].sectionTitle || "");
    }
  }
  return matches;
}

function sectionChordStreams(measures) {
  const streams = new Map();
  measures.forEach((measure) => {
    measureEntriesFromMeasure(measure).forEach((entry) => {
      const streamKey = `${entry.sectionIndex ?? 0}:${entry.sectionTitle || ""}`;
      const stream = streams.get(streamKey) || [];
      stream.push(entry);
      streams.set(streamKey, stream);
    });
  });
  return [...streams.values()];
}

function measureAwareChordMatches(song, pattern, key) {
  const measures = songSearchMeasures(song);
  const matches = [];
  measures.forEach((measure) => {
    matches.push(...contiguousChordMatch(measure, pattern, key));
  });
  sectionChordStreams(measures).forEach((stream) => {
    matches.push(...contiguousChordMatch(stream, pattern, key, { requirePhraseStart: true }));
  });
  const primaryLine = measures
    .map((measure) => measure[0])
    .filter(Boolean);
  matches.push(...contiguousChordMatch(primaryLine, pattern, key, { requirePhraseStart: true }));
  return matches;
}

function findChordSequenceInSong(song, pattern) {
  const exact = measureAwareChordMatches(song, pattern, "exact");
  const family = measureAwareChordMatches(song, pattern, "family");
  return { exact, family };
}

function chordSearchResultRank(result) {
  return result.matches.exact.length ? 0 : 1;
}

function uniqueNonEmpty(items) {
  return [...new Set(items.filter(Boolean))];
}

async function searchSongsForChordSequence() {
  if (!chordSequenceResults) return;
  const pattern = chordSequenceSearchPattern();
  chordSequenceResults.innerHTML = "";
  if (!pattern.length) {
    chordSequenceResults.textContent = "Plaats eerst 1 tot 4 akkoorden in de reeks.";
    return;
  }
  chordSequenceResults.textContent = "Liedjes worden doorzocht...";
  if (searchChordSequence) searchChordSequence.disabled = true;
  const results = [];
  for (const candidate of allSongSearchCandidates()) {
    const song = songWithLibraryKey(candidate.song, candidate.label);
    await loadInspirationSongFile(song);
    const matches = findChordSequenceInSong(song, pattern);
    if (matches.exact.length || matches.family.length) {
      results.push({ ...candidate, song, matches });
    }
  }
  results.sort((a, b) => chordSearchResultRank(a) - chordSearchResultRank(b)
    || String(a.song.title || "").localeCompare(String(b.song.title || ""), "nl", { sensitivity: "base" }));
  if (searchChordSequence) searchChordSequence.disabled = false;
  if (!results.length) {
    chordSequenceResults.innerHTML = `<p>Geen liedjes gevonden met deze volgorde.</p>`;
    return;
  }
  const list = document.createElement("div");
  list.className = "chord-sequence-result-list";
  results.slice(0, 8).forEach(({ song, matches, label }) => {
    const exactSections = uniqueNonEmpty(matches.exact);
    const familySections = uniqueNonEmpty(matches.family);
    const item = document.createElement("button");
    item.type = "button";
    item.className = "chord-sequence-result";
    item.innerHTML = `
      <strong>${formatMusicText(song.title)}</strong>
      <span>${formatMusicText(song.artist)}</span>
      <small>${formatMusicText(label)} - ${exactSections.length ? "Exact" : "Akkoordfamilie"}${(exactSections.length ? exactSections : familySections).length ? ` - ${(exactSections.length ? exactSections : familySections).map(formatMusicText).join(", ")}` : ""}</small>
    `;
    item.addEventListener("click", () => selectInspirationSong(item, song, label));
    list.append(item);
  });
  chordSequenceResults.innerHTML = "";
  chordSequenceResults.append(list);
}

function selectChordFromInspiration(token, keyLabel = null) {
  const parsed = parseChordToken(token);
  if (!parsed) return;
  if (parsed.noChord) {
    state.selectedModulationChord = null;
    render();
    return;
  }
  const sectionKey = keyOptionFromLabel(keyLabel);
  if (sectionKey && sectionKey.label !== state.key.label) {
    state.selectedModulationChord = { keyLabel: sectionKey.label, token };
    render();
    return;
  }
  state.selectedModulationChord = null;
  state.root = parsed.root;
  state.libraryRoot = parsed.root;
  state.quality = parsed.quality;
  state.inversion = 0;
  state.chordActive = true;
  state.chordMode = "browse";
  state.selectedRootAbsolute = bestRootAbsoluteForScale(parsed.root, parsed.quality, 0, scaleNotes(state.key, state.scale));
  requestKeyboardFocus();
  rootSelect.value = String(rootOptions.indexOf(parsed.root));
  qualitySelect.value = parsed.quality.id;
  inversionSelect.value = "0";
  render();
}

function sectionScaleNotes(keyLabel) {
  const sectionScale = majorScaleForKeyLabel(keyLabel);
  const notes = sectionScale.notes;
  return notes[0] ? [...notes, { ...notes[0], absolute: notes[0].absolute + 12 }] : notes;
}

function renderModulationMarker(keyLabel) {
  const sectionScale = majorScaleForKeyLabel(keyLabel);
  const selected = state.selectedModulationChord?.keyLabel === keyLabel
    ? parseChordToken(state.selectedModulationChord.token)
    : null;
  const selectedNotes = selected && !selected.noChord
    ? voicedNotes(
      selected.root,
      selected.quality,
      0,
      bestRootAbsoluteForScale(selected.root, selected.quality, 0, sectionScale.notes)
    )
    : [];
  const marker = document.createElement("div");
  marker.className = "selected-song-modulation";
  marker.innerHTML = `
    <span>Modulatie naar ${formatMusicText(keyLabel)} majeur</span>
    ${scaleKeyboardHtml(sectionScaleNotes(keyLabel), sectionScale.key, sectionScale.scale, selectedNotes)}
  `;
  return marker;
}

function selectedSongMeterMark(meter) {
  const mark = document.createElement("div");
  mark.className = "selected-song-meter";
  const [top = "4", bottom = "4"] = String(meter || "4/4").split("/");
  mark.innerHTML = `<b>${formatMusicText(top)}</b><b>${formatMusicText(bottom)}</b>`;
  return mark;
}

function youtubeVideoId(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    let id = "";
    if (host === "youtu.be") {
      id = parsed.pathname.split("/").filter(Boolean)[0] || "";
    } else if (host.endsWith("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) {
        id = parsed.pathname.split("/").filter(Boolean)[1] || "";
      } else if (parsed.pathname.startsWith("/shorts/")) {
        id = parsed.pathname.split("/").filter(Boolean)[1] || "";
      } else {
        id = parsed.searchParams.get("v") || "";
      }
    }
    return id;
  } catch {
    return "";
  }
}

function selectedSongYoutubePlayer(song) {
  if (!song?.youtube) return null;
  const id = youtubeVideoId(song.youtube);
  if (!id) return null;
  const thumbnail = id ? `https://img.youtube.com/vi/${encodeURIComponent(id)}/hqdefault.jpg` : "";
  const player = document.createElement("div");
  player.className = "selected-song-youtube";
  player.innerHTML = `
    <a class="youtube-card" href="${song.youtube}" target="_blank" rel="noreferrer">
      ${thumbnail ? `<img src="${thumbnail}" alt="">` : ""}
      <span class="youtube-play" aria-hidden="true"></span>
      <strong>Open video op YouTube</strong>
    </a>
  `;
  return player;
}

function selectedSongMediaPlayer(song) {
  if (!song?.mediaKey && !song?.mediaUrl) return null;
  const wrapper = document.createElement("div");
  wrapper.className = "selected-song-media";
  if (song.mediaUrl) {
    const isVideo = (song.mediaType || "").startsWith("video/");
    if (isVideo) {
      wrapper.innerHTML = `<video controls src="${escapeHtml(song.mediaUrl)}"></video>`;
    } else {
      wrapper.innerHTML = nootstudioAudioPlayerHtml(escapeHtml(song.mediaUrl));
      setupNootstudioAudioPlayer(wrapper.querySelector(".nootstudio-player"));
    }
    return wrapper;
  }
  wrapper.textContent = "Audio/video wordt geladen...";
  loadMediaFile(song.mediaKey)
    .then((file) => {
      if (!file) {
        wrapper.textContent = "Audio/video bestand niet gevonden op dit apparaat.";
        return;
      }
      const source = URL.createObjectURL(file);
      const isVideo = (song.mediaType || file.type || "").startsWith("video/");
      if (isVideo) {
        wrapper.innerHTML = `<video controls src="${source}"></video>`;
      } else {
        wrapper.innerHTML = nootstudioAudioPlayerHtml(source);
        setupNootstudioAudioPlayer(wrapper.querySelector(".nootstudio-player"));
      }
    })
    .catch(() => {
      wrapper.textContent = "Audio/video kon niet worden geladen.";
    });
  return wrapper;
}

function formatMediaTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function nootstudioAudioPlayerHtml(source) {
  return `
    <div class="nootstudio-player">
      <audio src="${source}" preload="metadata"></audio>
      <img class="nootstudio-player-logo" src="assets/nootstudio-n.png" alt="">
      <button class="nootstudio-player-button" type="button" aria-label="Speel audio">
        <span aria-hidden="true"></span>
      </button>
      <div class="nootstudio-player-main">
        <input class="nootstudio-player-seek" type="range" min="0" max="100" value="0" step="0.1" aria-label="Voortgang">
        <div class="nootstudio-player-time">
          <span>0:00</span>
          <span>0:00</span>
        </div>
      </div>
    </div>
  `;
}

function setupNootstudioAudioPlayer(player) {
  if (!player) return;
  const audio = player.querySelector("audio");
  const button = player.querySelector(".nootstudio-player-button");
  const seek = player.querySelector(".nootstudio-player-seek");
  const [currentTimeLabel, durationLabel] = player.querySelectorAll(".nootstudio-player-time span");
  const update = () => {
    const duration = audio.duration || 0;
    const progress = duration ? (audio.currentTime / duration) * 100 : 0;
    seek.value = String(progress);
    seek.style.setProperty("--progress", `${progress}%`);
    currentTimeLabel.textContent = formatMediaTime(audio.currentTime);
    durationLabel.textContent = formatMediaTime(duration);
  };
  button.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });
  seek.addEventListener("input", () => {
    const duration = audio.duration || 0;
    if (duration) audio.currentTime = (Number(seek.value) / 100) * duration;
    seek.style.setProperty("--progress", `${seek.value}%`);
  });
  audio.addEventListener("loadedmetadata", update);
  audio.addEventListener("timeupdate", update);
  audio.addEventListener("play", () => {
    player.classList.add("is-playing");
    button.setAttribute("aria-label", "Pauzeer audio");
  });
  audio.addEventListener("pause", () => {
    player.classList.remove("is-playing");
    button.setAttribute("aria-label", "Speel audio");
  });
  audio.addEventListener("ended", () => {
    player.classList.remove("is-playing");
    update();
  });
}

function songGridMeterMark(meter) {
  const mark = document.createElement("div");
  mark.className = "meter-mark";
  const [top = "4", bottom = "4"] = String(meter || "4/4").split("/");
  mark.innerHTML = `<b>${formatMusicText(top)}</b><b>${formatMusicText(bottom)}</b>`;
  return mark;
}

function inspirationMeasureInfo(measure, fallbackMeter) {
  const chords = measureEntriesFromMeasure(measure);
  const meter = measureMeter(measure, fallbackMeter);
  const display = meterDisplayDetails(meter);
  const specified = chords.reduce((total, item) => total + visualTimingFromEntry(item, meter).beats, 0);
  const unspecified = chords.filter((item) => item?.beats == null).length;
  const defaultBeats = unspecified
    ? Math.max(0, display.visualBeats - specified) / unspecified
    : display.visualBeats / Math.max(chords.length, 1);
  let beatCursor = 1;
  const chordEntries = chords.map((entry) => {
    const visualTiming = visualTimingFromEntry(entry, meter);
    const beats = entry?.beats == null ? defaultBeats : visualTiming.beats;
    const startBeat = Number.isFinite(entry?.startBeat) ? visualTiming.startBeat : beatCursor;
    const chordEntry = {
      token: chordEntryToken(entry),
      beats,
      startBeat
    };
    beatCursor = Math.max(beatCursor + (beats || 0), startBeat + (beats || 0));
    return chordEntry;
  });
  chordEntries
    .sort((a, b) => a.startBeat - b.startBeat)
    .forEach((entry, index, entries) => {
      const nextStart = entries[index + 1]?.startBeat ?? (display.visualBeats + 1);
      if (nextStart > entry.startBeat) {
        entry.beats = Math.min(entry.beats, Math.max(0.25, nextStart - entry.startBeat));
      }
      entry.startBeat = Math.max(1, Math.min(display.visualBeats, entry.startBeat));
      entry.beats = Math.max(0.25, Math.min(entry.beats, display.visualBeats - entry.startBeat + 1));
    });
  return {
    key: measure?.key || "",
    meter,
    explicitMeter: Boolean(measure?.meter),
    ending: measure?.ending || "",
    nav: Array.isArray(measure?.nav) ? measure.nav : [],
    repeatStart: Boolean(measure?.repeatStart),
    repeatEnd: Boolean(measure?.repeatEnd),
    repeatCount: measure?.repeatCount || 1,
    chords: chordEntries.filter((entry) => parseChordToken(entry.token))
  };
}

const navigationLabels = {
  segno: { symbol: "𝄋", text: "Segno" },
  toCoda: { symbol: "→", text: "To Coda" },
  dsAlCoda: { symbol: "D.S.", text: "al Coda" },
  coda: { symbol: "𝄌", text: "Coda" }
};

function navigationMarkerHtml(navItems = []) {
  return navItems
    .map((item) => navigationLabels[item])
    .filter(Boolean)
    .map((item) => `<span class="song-nav-marker"><strong>${formatMusicText(item.symbol)}</strong>${formatMusicText(item.text)}</span>`)
    .join("");
}

function renderSelectedInspirationSong() {
  const song = state.selectedInspirationSong;
  if (!selectedSongChords || !selectedSongChordList) return;
  const hasMedia = Boolean(song && (song.mediaKey || song.mediaUrl || song.youtube));
  const hasChordData = songHasChordData(song);
  selectedSongChords.hidden = !song || (!hasMedia && !hasChordData);
  if (!song) {
    state.schemaEditMode = false;
    updateAdminUi();
    return;
  }

  selectedSongTitle.textContent = song.title;
  if (selectedSongArtist) selectedSongArtist.textContent = song.artist || "";
  selectedSongMeta.textContent = [song.style, song.year, song.level].filter(Boolean).join(" - ");
  if (selectedSongTranspose) {
    const transposeKey = keyOptionFromLabel(selectedSongTransposeKeyLabel(song)) || state.key;
    selectedSongTranspose.value = String(keyOptions.indexOf(transposeKey));
  }
  selectedSongChordList.innerHTML = "";
  const mediaPlayer = selectedSongMediaPlayer(song);
  const youtubePlayer = selectedSongYoutubePlayer(song);
  const appendSongMedia = () => {
    if (mediaPlayer) selectedSongChordList.append(mediaPlayer);
    if (youtubePlayer) selectedSongChordList.append(youtubePlayer);
  };
  appendSongMedia();
  const displaySections = transposedSongSections(song);
  const sections = Array.isArray(displaySections) && displaySections.length
    ? displaySections.map((section) => {
      let runningMeter = section.meter || song.meter || "4/4";
      return {
        title: section.title,
        key: section.key || "",
        meter: runningMeter,
        measures: (section.measures || [section.chords || []])
          .map((measure) => {
            const info = inspirationMeasureInfo(measure, runningMeter);
            runningMeter = info.meter || runningMeter;
            return info;
          })
          .filter((measure) => (
            measure.chords.length
            || measure.meter
            || measure.repeatStart
            || measure.repeatEnd
            || measure.ending
            || measure.nav.length
          ))
      };
    }).filter((section) => section.measures.length)
    : null;
  const interval = transposeIntervalForSong(song);
  const fallbackKey = selectedSongTransposeKeyLabel(song);
  const tokens = sections
    ? sections.flatMap((section) => section.measures.flatMap((measure) => measure.chords))
    : inspirationChordTokens(song).map((token) => transposeChordEntry(token, interval, fallbackKey));
  if (!tokens.length) {
    selectedSongChords.hidden = !hasMedia;
    updateAdminUi();
    return;
  }

  const renderChordButton = (entry, target, sectionKeyLabel = null) => {
    const token = chordEntryToken(entry);
    const parsed = parseChordToken(token);
    const sectionScale = majorScaleForKeyLabel(sectionKeyLabel);
    const scalePitchSet = new Set(sectionScale.notes.map((note) => note.pitch));
    const fitsScale = parsed.noChord || [...chordTonePitchSet(parsed)].every((pitch) => scalePitchSet.has(pitch));
    const button = document.createElement("button");
    button.type = "button";
    button.className = "selected-song-chord";
    button.classList.toggle("no-chord", Boolean(parsed.noChord));
    button.classList.toggle("has-bass-note", Boolean(parsed.bass));
    button.classList.toggle("outside-scale", !fitsScale);
    button.classList.toggle("four-beats", Number(entry?.beats || 0) >= 4);
    button.classList.toggle("short-beat", Number(entry?.beats || 0) > 0 && Number(entry?.beats || 0) <= 1.05);
    button.classList.toggle("long-name", parsed.symbol.length >= 5);
    if (target.classList.contains("timed")) {
      const measureBeats = Number(target.style.getPropertyValue("--measure-beats")) || 4;
      const measureSlots = Number(target.style.getPropertyValue("--measure-slots")) || measureBeats;
      const slotsPerBeat = measureSlots / measureBeats;
      const chordBeats = Number(entry?.beats || 1);
      const startSlot = Math.min(measureSlots, Math.max(1, Math.floor(((entry?.startBeat || 1) - 1) * slotsPerBeat) + 1));
      const endSlot = Math.min(measureSlots + 1, Math.max(startSlot + 1, Math.ceil(((entry?.startBeat || 1) - 1 + chordBeats) * slotsPerBeat) + 1));
      const slotSpan = Math.min(measureSlots - startSlot + 1, Math.max(1, endSlot - startSlot));
      button.style.gridColumn = `${startSlot} / span ${slotSpan}`;
      button.style.gridRow = "1";
      button.style.setProperty("--mobile-chord-grow", String(Math.max(0.72, Math.min(4, chordBeats))));
    }
    button.classList.toggle(
      "selected",
      state.selectedModulationChord?.keyLabel === sectionScale.key.label && state.selectedModulationChord?.token === token
    );
    button.innerHTML = `
      <strong>${formatMusicText(parsed.symbol)}</strong>
    `;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const anchorRect = button.getBoundingClientRect();
      selectChordFromInspiration(token, sectionKeyLabel);
      showFloatingChord(anchorRect, token, sectionKeyLabel);
    });
    target.append(button);
  };

  if (sections) {
    let activeKeyLabel = sections[0]?.key || state.key.label;
    let activeMeter = "";
    let songMeterShown = false;
    sections.forEach((section) => {
      if (section.key && section.key !== activeKeyLabel) {
        selectedSongChordList.append(renderModulationMarker(section.key));
        activeKeyLabel = section.key;
      }
      const part = document.createElement("section");
      part.className = "selected-song-part";
      part.classList.toggle("starts-with-nav", Boolean(section.measures[0]?.nav?.length));
      const title = document.createElement("h4");
      title.innerHTML = formatMusicText(section.title);
      const row = document.createElement("div");
      row.className = "selected-song-part-row";
      let currentLine = null;
      let measuresInLine = 0;
      const ensureMeasureLine = () => {
        if (!currentLine || measuresInLine >= 4) {
          currentLine = document.createElement("div");
          currentLine.className = "selected-song-measure-line";
          row.append(currentLine);
          measuresInLine = 0;
        }
      };
      section.measures.forEach((measure, measureIndex) => {
        const measureKeyLabel = measure.key || section.key || activeKeyLabel;
        if (measureKeyLabel && measureKeyLabel !== activeKeyLabel) {
          if (currentLine && !measuresInLine) currentLine.remove();
          currentLine = null;
          measuresInLine = 0;
          row.append(renderModulationMarker(measureKeyLabel));
          activeKeyLabel = measureKeyLabel;
        }
        const measureMeterValue = measureMeter(measure, section.meter || song.meter || activeMeter || "");
        const visibleMeter = !songMeterShown || (measureMeterValue && measureMeterValue !== activeMeter)
          ? measureMeterValue
          : "";
        if (visibleMeter) {
          activeMeter = visibleMeter;
          songMeterShown = true;
        } else if (measure.meter) {
          activeMeter = measure.meter;
        }
        const measureEl = document.createElement("div");
        measureEl.className = "selected-song-measure";
        if (visibleMeter) {
          measureEl.classList.add("has-inline-meter");
          measureEl.append(selectedSongMeterMark(visibleMeter));
        }
        const meterDisplay = meterDisplayDetails(measureMeter(measure));
        const measureBeats = Math.max(1, meterDisplay.visualBeats);
        const measureSlots = Math.max(1, Math.round(meterDisplay.visualSlots));
        measureEl.classList.add("timed");
        measureEl.style.setProperty("--measure-beats", String(measureBeats));
        measureEl.style.setProperty("--measure-slots", String(measureSlots));
        measureEl.classList.toggle("repeat-start", measure.repeatStart);
        measureEl.classList.toggle("repeat-end", measure.repeatEnd);
        measureEl.classList.toggle("after-repeat-end", Boolean(section.measures[measureIndex - 1]?.repeatEnd));
        if (measure.ending) {
          measureEl.classList.add("has-ending");
          measureEl.classList.toggle("ending-continuation", section.measures[measureIndex - 1]?.ending === measure.ending);
          const bracket = document.createElement("span");
          bracket.className = "selected-ending-bracket";
          measureEl.append(bracket);
          if (section.measures[measureIndex - 1]?.ending !== measure.ending) {
            const ending = document.createElement("span");
            ending.className = "selected-ending-number";
            ending.textContent = `${measure.ending}.`;
            measureEl.append(ending);
          }
        }
        if (measure.nav.length) {
          measureEl.classList.add("has-nav");
          const nav = document.createElement("span");
          nav.className = "selected-song-nav";
          nav.innerHTML = navigationMarkerHtml(measure.nav);
          measureEl.append(nav);
        }
        measureEntriesFromMeasure(measure).forEach((token) => renderChordButton(token, measureEl, measureKeyLabel));
        if (measure.repeatEnd && measure.repeatCount > 1) {
          measureEl.classList.add("has-repeat-badge");
          const repeatBadge = document.createElement("span");
          repeatBadge.className = "selected-repeat-badge";
          repeatBadge.textContent = `x${measure.repeatCount}`;
          measureEl.append(repeatBadge);
        }
        ensureMeasureLine();
        currentLine.append(measureEl);
        measuresInLine += 1;
      });
      part.append(title, row);
      selectedSongChordList.append(part);
    });
    updateAdminUi();
    return;
  }

  tokens.forEach((token) => renderChordButton(token, selectedSongChordList));
  updateAdminUi();
}

function renderSongSchemaEditor() {
  if (!songSchemaEditor) return;
  const song = state.selectedInspirationSong;
  const canEdit = state.isAdmin && state.schemaEditMode && songHasChordData(song);
  songSchemaEditor.hidden = !canEdit;
  if (!canEdit) {
    songSchemaEditor.innerHTML = "";
    return;
  }
  const sections = editableSongSections(song);
  const sectionsHtml = sections.map((section, sectionIndex) => {
    const measures = editableSectionMeasures(section);
    if (!measures.length) return "";
    const measureCards = measures.map((measure, measureIndex) => {
      const entries = measureChordEntries(measure);
      const rows = entries
        .map((entry, chordIndex) => schemaChordRowHtml(sectionIndex, measureIndex, chordIndex, entry, measure))
        .join("");
      return `
        <article class="schema-measure-card" data-section-index="${sectionIndex}" data-measure-index="${measureIndex}">
          <div class="schema-measure-head">
            <strong>Maat ${escapeHtml(measureNumberText(measure, measureIndex))}</strong>
            <button type="button" class="schema-add-chord" data-schema-action="add-chord">+ akkoord</button>
          </div>
          <div class="schema-chord-rows">${rows || '<span class="schema-empty-measure">Geen akkoord</span>'}</div>
        </article>`;
    }).join("");
    return `
      <section class="schema-section">
        <h5>${escapeHtml(sectionNameText(section, sectionIndex))}</h5>
        <div class="schema-measure-grid">${measureCards}</div>
      </section>`;
  }).join("");
  songSchemaEditor.innerHTML = `
    <div class="schema-editor-head">
      <div>
        <h4>Akkoordenschema bewerken</h4>
        <p>Maatsoort, secties en herhalingstekens blijven intact.</p>
      </div>
      <div class="schema-editor-actions">
        <button type="button" class="schema-save-button" data-schema-action="save-schema">Opslaan</button>
        <button type="button" class="schema-cancel-button" data-schema-action="cancel-schema">Annuleren</button>
      </div>
    </div>
    <div class="schema-editor-sections">${sectionsHtml || '<p class="schema-editor-note">Geen maten gevonden om te bewerken.</p>'}</div>`;
}

function cloneSongForSchemaEdit(song) {
  return JSON.parse(JSON.stringify(song || {}));
}

function handleSongSchemaEditorClick(event) {
  const button = event.target.closest("[data-schema-action]");
  if (!button || !songSchemaEditor?.contains(button) || !state.isAdmin) return;
  const action = button.dataset.schemaAction;
  if (action === "cancel-schema") {
    state.schemaEditMode = false;
    renderSelectedInspirationSong();
    return;
  }
  if (action === "save-schema") {
    handleSaveSongSchemaEdits();
    return;
  }
  if (action === "remove-chord") {
    const row = button.closest(".schema-chord-row");
    const rows = row?.parentElement;
    row?.remove();
    if (rows && !rows.querySelector(".schema-chord-row")) {
      rows.innerHTML = '<span class="schema-empty-measure">Geen akkoord</span>';
    }
    return;
  }
  if (action === "add-chord") {
    const card = button.closest(".schema-measure-card");
    const rows = card?.querySelector(".schema-chord-rows");
    if (!card || !rows) return;
    rows.querySelector(".schema-empty-measure")?.remove();
    rows.insertAdjacentHTML("beforeend", schemaChordRowHtml(card.dataset.sectionIndex, card.dataset.measureIndex, -1, ""));
    rows.querySelector(".schema-chord-row:last-child input")?.focus();
  }
}

function buildEditedSongFromSchemaForm(song) {
  const nextSong = cloneSongForSchemaEdit(song);
  const sections = editableSongSections(nextSong);
  const rowsByMeasure = new Map();
  songSchemaEditor?.querySelectorAll(".schema-chord-row").forEach((row) => {
    const key = `${row.dataset.sectionIndex}:${row.dataset.measureIndex}`;
    const value = row.querySelector(".schema-chord-token")?.value.trim() || "";
    const startBeat = parseSchemaNumber(row.querySelector(".schema-chord-start")?.value);
    const beats = parseSchemaNumber(row.querySelector(".schema-chord-beats")?.value);
    if (!rowsByMeasure.has(key)) rowsByMeasure.set(key, []);
    if (value) rowsByMeasure.get(key).push({
      originalIndex: Number(row.dataset.originalIndex),
      token: value,
      startBeat,
      beats
    });
  });
  sections.forEach((section, sectionIndex) => {
    const originalHadChordList = !Array.isArray(section.measures) && Array.isArray(section.chords);
    const measures = editableSectionMeasures(section);
    const nextMeasures = measures.map((measure, measureIndex) => {
      const originalEntries = measureChordEntries(measure);
      const edits = rowsByMeasure.get(`${sectionIndex}:${measureIndex}`) || [];
      const chords = edits.map((edit) => {
        const original = edit.originalIndex >= 0 ? originalEntries[edit.originalIndex] : null;
        return chordEntryWithToken(original, edit.token, {
          startBeat: edit.startBeat,
          beats: edit.beats
        });
      }).filter(Boolean);
      return setEditableMeasureChords(measure, chords);
    });
    if (originalHadChordList && nextMeasures.length === 1) {
      section.chords = nextMeasures[0].chords || [];
    } else {
      section.measures = nextMeasures;
      delete section.chords;
    }
  });
  nextSong.sections = sections;
  nextSong.editedAt = new Date().toISOString();
  nextSong.editedBy = state.currentUserEmail || "admin";
  return nextSong;
}

async function handleSaveSongSchemaEdits() {
  const song = state.selectedInspirationSong;
  if (!state.isAdmin || !song) return;
  const label = state.selectedInspirationLabel || currentSongLibraryLabel();
  const editedSong = buildEditedSongFromSchemaForm(song);
  const localSong = addUserSong(label, editedSong) || editedSong;
  let remoteSaveFailed = false;
  const remoteSong = await saveRemoteSong(label, localSong).catch((error) => {
    console.warn("schema edit remote save failed", error);
    remoteSaveFailed = true;
    return null;
  });
  state.selectedInspirationSong = remoteSong || localSong;
  state.selectedInspirationLabel = label;
  state.schemaEditMode = false;
  render();
  if (inspirationStatus) {
    inspirationStatus.textContent = remoteSaveFailed
      ? "Het schema is lokaal opgeslagen, maar online opslaan is niet gelukt."
      : "Het akkoordenschema is opgeslagen.";
  }
}

function setActivePage(page) {
  pageTabs.forEach((item) => item.classList.toggle("active", item.dataset.page === page));
  mobilePageMenuItems.forEach((item) => item.classList.toggle("active", item.dataset.page === page));
  pageViews.forEach((view) => view.classList.toggle("active", view.dataset.pageView === page));
  appShell.classList.toggle("song-mode", page === "song");
  appShell.classList.toggle("custom-mode", page === "custom");
  mobilePageMenuButton?.setAttribute("aria-expanded", "false");
  if (mobilePageMenu) mobilePageMenu.hidden = true;
  appTitle.classList.add("brand-title", "brand-title-logo");
  if (!appTitle.querySelector(".brand-logo")) {
    appTitle.innerHTML = '<img class="brand-logo" src="assets/nootstudio-piano-toolkit-logo-transparent.png" alt="Nootstudio piano toolkit">';
  }
  if (window.matchMedia?.("(max-width: 820px)").matches) {
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
}

async function loadInspirationSongFile(song) {
  if (!song?.file || song.sections?.length || song.loadError) return;
  try {
    if (inspirationStatus) inspirationStatus.textContent = `${song.title} wordt geladen...`;
    const response = await fetch(song.file, { cache: "no-store" });
    if (!response.ok) throw new Error("MusicXML niet gevonden");
    const imported = parseMusicXml(await response.text());
    song.key ||= imported.key?.replace(/\s+majeur$/i, "") || "";
    song.meter ||= imported.meter || "";
    song.bpm ||= imported.bpm || "";
    song.sections = imported.sections;
  } catch (error) {
    song.loadError = true;
    if (inspirationStatus) {
      inspirationStatus.textContent = `${song.title} kon het MusicXML-bestand niet laden. Controleer het pad in songs.json.`;
    }
  }
}

async function selectInspirationSong(card, song, libraryLabel = null) {
  const label = libraryLabel || currentSongLibraryLabel();
  const selectedSong = songWithLibraryKey(song, label);
  state.selectedInspirationSong = selectedSong;
  state.selectedInspirationLabel = label;
  state.selectedSongTransposeKey = null;
  state.schemaEditMode = false;
  clearChordSequence();
  renderChordSequence();
  inspirationList.querySelectorAll(".inspiration-card").forEach((item) => {
    item.classList.toggle("selected", item === card);
  });
  await loadInspirationSongFile(selectedSong);
  applySelectedSongTransposeKey(songOriginalKeyLabel(selectedSong));
  render();
  scrollSelectedSongIntoView();
  if (inspirationStatus) {
    inspirationStatus.textContent = selectedSong.sections?.length
      ? `${selectedSong.title} is geladen.`
      : `${selectedSong.title} is geselecteerd. MusicXML kan later worden toegevoegd.`;
  }
}

function scrollSelectedSongIntoView() {
  if (!selectedSongChords || selectedSongChords.hidden) return;
  window.requestAnimationFrame(() => {
    const target = selectedSongTitle || selectedSongChords;
    const mobile = window.matchMedia?.("(max-width: 820px)").matches;
    const offset = mobile ? 10 : 22;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? "auto" : "smooth" });
  });
}

function applySongKeyLabel(label) {
  const { group, keyLabel } = keyPartsFromSongJsonLabel(label);
  const key = keyOptionFromLabel(keyLabel);
  const scale = scales.find((item) => group === "minor"
    ? item.id.toLowerCase().includes("minor") || item.name.toLowerCase().includes("mineur")
    : item.id === "major" || item.name.toLowerCase() === "majeur"
  );
  if (key) {
    state.key = key;
    keySelect.value = String(keyOptions.indexOf(key));
  }
  if (scale) {
    state.scale = scale;
    scaleSelect.value = scale.id;
  }
}

function applySelectedSongTransposeKey(label) {
  const key = keyOptionFromLabel(label);
  if (!key) return;
  state.selectedSongTransposeKey = key.label;
  state.key = key;
  state.scale = scales.find((scale) => scale.id === "major") || state.scale;
  keySelect.value = String(keyOptions.indexOf(key));
  scaleSelect.value = state.scale.id;
  clearChordSequence();
  syncChordToKey();
  syncSongTheoryToChordTab();
}

async function songFromAddForm() {
  let imported = null;
  const file = addSongXml?.files?.[0];
  if (file) {
    imported = parseMusicXml(await file.text());
  }
  const title = addSongTitle.value.trim();
  const artist = addSongArtist.value.trim();
  const media = await saveSongMediaFile(addSongMedia?.files?.[0], { title, artist });
  return {
    title,
    artist,
    style: addSongStyle.value.trim(),
    year: addSongYear.value.trim(),
    level: addSongLevel.value.trim(),
    image: addSongImage.value.trim(),
    youtube: addSongYoutube.value.trim(),
    mediaUrl: addSongMediaUrl.value.trim() || media?.mediaUrl || "",
    mediaKey: media?.mediaKey || "",
    mediaType: media?.mediaType || "",
    mediaName: media?.mediaName || "",
    meter: imported?.meter || "",
    sections: imported?.sections || undefined
  };
}

async function handleAddSongSubmit(event) {
  event.preventDefault();
  if (!state.isAdmin) {
    if (addSongStatus) addSongStatus.textContent = "Alleen beheerders kunnen liedjes toevoegen.";
    return;
  }
  if (!addSongTitle.value.trim() || !addSongArtist.value.trim()) return;
  try {
    const label = addSongKey.value || `${state.key.label} majeur`;
    const song = await songFromAddForm();
    const savedSong = addUserSong(label, song) || song;
    let remoteSaveFailed = false;
    const remoteSong = await saveRemoteSong(label, savedSong).catch(() => {
      remoteSaveFailed = true;
      return null;
    });
    applySongKeyLabel(label);
    state.selectedInspirationSong = remoteSong || savedSong;
    state.selectedInspirationLabel = label;
    state.selectedSongTransposeKey = null;
    state.schemaEditMode = false;
    render();
    addSongForm.reset();
    syncAddSongKeyToCurrentScale();
    if (addSongStatus) {
      if (remoteSong) {
        addSongStatus.textContent = `${savedSong.title} is online bijgewerkt in ${label}.`;
      } else if (remoteSaveFailed) {
        addSongStatus.textContent = `${savedSong.title} is alleen lokaal opgeslagen. De centrale bibliotheek is niet bereikbaar.`;
      } else {
        addSongStatus.textContent = `${savedSong.title} is alleen op dit apparaat opgeslagen. Vul app-config.js in voor synchronisatie met mobiel.`;
      }
    }
  } catch {
    if (addSongStatus) addSongStatus.textContent = "Dit MusicXML-bestand kon niet goed worden gelezen.";
  }
}

function tonicQualityForScale(scale) {
  const intervals = new Set(scale.intervals.map((interval) => mod(interval, 12)));
  if (intervals.has(4) && intervals.has(7)) return qualities.find((quality) => quality.id === "maj");
  if (intervals.has(3) && intervals.has(7)) return qualities.find((quality) => quality.id === "min");
  if (intervals.has(3) && intervals.has(6)) return qualities.find((quality) => quality.id === "dim");
  if (intervals.has(4) && intervals.has(8)) return qualities.find((quality) => quality.id === "aug");
  return state.quality;
}

function scaleStartAbsoluteForKey() {
  return scaleStartAbsolute(state.key, state.scale);
}

function syncChordToKey() {
  const matchingRoot = rootOptions.find((root) => root.label === state.key.label)
    || rootOptions.find((root) => root.pitch === state.key.pitch)
    || rootOptions[0];
  state.root = matchingRoot;
  state.libraryRoot = matchingRoot;
  state.quality = tonicQualityForScale(state.scale);
  state.selectedRootAbsolute = null;
  state.chordActive = false;
  rootSelect.value = String(rootOptions.indexOf(matchingRoot));
  qualitySelect.value = state.quality.id;
}

function syncSongTheoryToChordTab() {
  stopSongPlayback();
  songState.key = state.key;
  songState.scale = state.scale;
}

function rootForKeyboardPitch(pitch) {
  const keyMatchingRoot = rootOptions.find((root) => root.pitch === pitch && root.label === state.key.label);
  if (keyMatchingRoot) return keyMatchingRoot;
  const accidentalMatchingRoot = rootOptions.find((root) => root.pitch === pitch && root.accidental === state.key.accidental);
  if (accidentalMatchingRoot) return accidentalMatchingRoot;
  return rootOptions.find((root) => root.pitch === pitch) || rootOptions[0];
}

function setKeyFromCircleItem(item) {
  const matchingKey = keyOptions.find((key) => item.aliases.includes(key.label))
    || keyOptions.find((key) => key.pitch === rootOptions.find((root) => item.aliases.includes(root.label))?.pitch);
  if (!matchingKey) return;
  state.key = matchingKey;
  keySelect.value = String(keyOptions.indexOf(matchingKey));
  clearSelectedInspirationSong();
  clearChordSequence();
  syncChordToKey();
  syncSongTheoryToChordTab();
  render();
  scrollToKeyboardAfterKeyChange();
}

function renderRootTabs() {
  rootTabs.innerHTML = "";
  rootOptions.forEach((root) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "root-tab";
    tab.classList.toggle("active", state.libraryRoot.label === root.label);
    tab.textContent = root.label;
    tab.addEventListener("click", () => {
      state.libraryRoot = root;
      renderGrid();
    });
    rootTabs.append(tab);
  });
}

function renderKeyboard() {
  keyboard.innerHTML = "";
  const whiteKeys = [];
  keyboardWhiteNotes.forEach(({ pitch, octave }) => {
    const key = document.createElement("button");
    key.type = "button";
    key.className = "white-key";
    key.dataset.pitch = String(pitch);
      key.dataset.octave = String(octave);
      key.innerHTML = `<span class="key-label">${formatMusicText(chromaticLabels[pitch])}</span>`;
      key.addEventListener("click", () => {
      if (state.chordMode === "search") {
        toggleSearchNote(pitch, octave);
        render();
        return;
      }
      state.root = rootForKeyboardPitch(pitch);
      state.selectedRootAbsolute = null;
      state.chordActive = true;
      requestKeyboardFocus();
      rootSelect.value = String(rootOptions.indexOf(state.root));
      render();
    });
    whiteKeys.push({ key, pitch, octave });
    keyboard.append(key);
  });

  whiteKeys.forEach((entry, index) => {
    const pitch = blackAfterWhite[index % 7];
    if (pitch === undefined || index + 1 >= whiteKeys.length) return;
    const octave = entry.octave;
    const key = document.createElement("button");
    key.type = "button";
    key.className = "black-key";
    key.dataset.pitch = String(pitch);
    key.dataset.octave = String(octave);
    key.style.left = `calc(((100% / 19) * ${index + 1}))`;
    key.innerHTML = `<span class="key-label">${formatMusicText(chromaticLabels[pitch])}</span>`;
    key.addEventListener("click", () => {
      if (state.chordMode === "search") {
        toggleSearchNote(pitch, octave);
        render();
        return;
      }
      state.root = rootForKeyboardPitch(pitch);
      state.selectedRootAbsolute = null;
      state.chordActive = true;
      requestKeyboardFocus();
      rootSelect.value = String(rootOptions.indexOf(state.root));
      render();
    });
    keyboard.append(key);
  });
}

function updateKeyboard(notes, scale) {
  const keyboardBaseOctave = 3;
  const scaleLabelTargets = new Map();
  const keys = [...keyboard.querySelectorAll("button")].sort((a, b) => {
    const aAbsolute = Number(a.dataset.octave) * 12 + Number(a.dataset.pitch);
    const bAbsolute = Number(b.dataset.octave) * 12 + Number(b.dataset.pitch);
    return aAbsolute - bAbsolute;
  });
  const labelStartAbsolute = scaleStartAbsoluteForKey();
  const romanLabels = degreeTriads(scale).map((chord) => chord.degree);
  state.scale.intervals.forEach((interval, index) => {
    const scaleNote = scale.find((note) => note.pitch === mod(state.key.pitch + interval, 12));
    scaleLabelTargets.set(labelStartAbsolute + interval, { ...scaleNote, roman: romanLabels[index] });
  });
  scaleLabelTargets.set(labelStartAbsolute + 12, { ...scale[0], roman: romanLabels[0] });
  const scaleTargets = new Set(scaleLabelTargets.keys());
  const scalePitchSet = new Set(scale.map((note) => note.pitch));
  const scaleRootTargets = new Set([labelStartAbsolute, labelStartAbsolute + 12]);
  const activeNotes = new Map(notes.map((note) => [keyboardBaseOctave * 12 + note.absolute, note]));
  keys.forEach((key) => {
    const pitch = Number(key.dataset.pitch);
    const octave = Number(key.dataset.octave);
    const absolutePitch = octave * 12 + pitch;
    const scaleNote = scaleLabelTargets.get(absolutePitch);
    const activeNote = activeNotes.get(absolutePitch);
    const isActive = Boolean(activeNote);
    const isScale = scaleTargets.has(absolutePitch);
    const isOutside = isActive && !scalePitchSet.has(pitch);
    key.classList.toggle("active", isActive);
    key.classList.toggle("root", Boolean(activeNote?.degree && degreeNumber(activeNote.degree) === 1));
    key.classList.toggle("in-scale", isScale);
    key.classList.toggle("outside", isOutside);
    key.classList.toggle("scale-root", scaleRootTargets.has(absolutePitch));
    key.classList.toggle("has-chord-degree", state.mode === "degrees" && Boolean(activeNote?.degree));
    const label = key.querySelector(".key-label");
    const scaleLabel = scaleLabelTargets.get(absolutePitch);
    if (!scaleLabel && !activeNote) {
      label.innerHTML = "";
      return;
    }
    const activeLabel = activeNote ? {
      label: activeNote.label,
      roman: state.mode === "degrees" ? activeNote.degree : activeNote.label
    } : null;
    const displayLabel = scaleLabel || activeLabel;
    const outsideClass = isOutside ? " outside-note-label" : "";
    if (state.mode === "degrees") {
      if (activeNote?.degree) {
        label.innerHTML = `
          <span class="chord-degree-label${outsideClass}">${escapeHtml(chordDegreeNumberLabel(activeNote.degree))}</span>
          ${scaleLabel ? `<span class="scale-degree-label">${escapeHtml(scaleLabel.roman)}</span>` : ""}
        `;
      } else {
        label.innerHTML = `<span class="scale-degree-label">${escapeHtml(displayLabel.roman)}</span>`;
      }
    } else {
      label.innerHTML = `<span${isOutside ? ' class="outside-note-label"' : ""}>${formatMusicText(displayLabel.label)}</span>`;
    }
  });
}

function shouldAutoFocusKeyboard() {
  return window.matchMedia("(pointer: coarse), (max-width: 820px)").matches;
}

function requestKeyboardFocus() {
  state.pendingKeyboardFocus = true;
}

function scrollToMobileChordDetail() {
  if (!shouldAutoFocusKeyboard()) return;
  const target = chordPickerHeading || mobileChordDetail;
  if (!target) return;
  requestAnimationFrame(() => {
    const top = target.getBoundingClientRect().top + window.scrollY - 6;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });
}

function scrollToChordInfoBlock() {
  const target = currentChordPanel || currentName || keyboardPanel;
  if (!target) return;
  requestAnimationFrame(() => {
    const top = target.getBoundingClientRect().top + window.scrollY - 10;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });
}

function scrollToKeyboardPanel() {
  if (!shouldAutoFocusKeyboard() || !keyboardPanel) return;
  requestAnimationFrame(() => {
    const top = keyboardPanel.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });
}

function scrollToKeyboardAfterKeyChange() {
  scrollToKeyboardPanel();
}

function keepKeyboardPanelInViewOnTablet() {
  if (!keyboardPanel || !window.matchMedia("(min-width: 700px) and (max-width: 1180px)").matches) return;
  if (!document.querySelector('[data-page-view="chords"].active')) return;
  requestAnimationFrame(() => {
    const rect = keyboardPanel.getBoundingClientRect();
    const shouldMove = rect.top < 10 || rect.top > window.innerHeight * 0.34;
    if (!shouldMove) return;
    const top = keyboardPanel.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });
}

function focusActiveChordOnKeyboard() {
  if (!state.pendingKeyboardFocus) return;
  state.pendingKeyboardFocus = false;
  if (!state.chordActive || !keyboardScroll || !shouldAutoFocusKeyboard()) return;

  requestAnimationFrame(() => {
    const activeKeys = [...keyboard.querySelectorAll(".white-key.active, .black-key.active")];
    if (!activeKeys.length || keyboardScroll.scrollWidth <= keyboardScroll.clientWidth) return;

    const scrollRect = keyboardScroll.getBoundingClientRect();
    const keyRects = activeKeys.map((key) => key.getBoundingClientRect());
    const left = Math.min(...keyRects.map((rect) => rect.left)) - scrollRect.left + keyboardScroll.scrollLeft;
    const right = Math.max(...keyRects.map((rect) => rect.right)) - scrollRect.left + keyboardScroll.scrollLeft;
    const target = (left + right) / 2 - keyboardScroll.clientWidth / 2;
    const maxScroll = keyboardScroll.scrollWidth - keyboardScroll.clientWidth;

    keyboardScroll.scrollTo({
      left: Math.max(0, Math.min(target, maxScroll)),
      behavior: "smooth"
    });
  });
}

function centerCurrentScaleOnKeyboard({ behavior = "auto" } = {}) {
  if (!keyboardScroll || !shouldAutoFocusKeyboard()) return;
  const scale = scaleNotes(state.key, state.scale);
  const finalRoot = scale[0] ? { ...scale[0], absolute: scale[0].absolute + 12 } : null;
  const notes = finalRoot ? [...scale, finalRoot] : scale;
  const targetAbsolutes = new Set(notes.map((note) => 3 * 12 + note.absolute));

  requestAnimationFrame(() => {
    const scaleKeys = [...keyboard.querySelectorAll("button")].filter((key) => {
      const absolute = Number(key.dataset.octave) * 12 + Number(key.dataset.pitch);
      return targetAbsolutes.has(absolute);
    });
    if (!scaleKeys.length || keyboardScroll.scrollWidth <= keyboardScroll.clientWidth) return;

    const scrollRect = keyboardScroll.getBoundingClientRect();
    const keyRects = scaleKeys.map((key) => key.getBoundingClientRect());
    const left = Math.min(...keyRects.map((rect) => rect.left)) - scrollRect.left + keyboardScroll.scrollLeft;
    const right = Math.max(...keyRects.map((rect) => rect.right)) - scrollRect.left + keyboardScroll.scrollLeft;
    const width = right - left;
    const padding = 14;
    const maxScroll = keyboardScroll.scrollWidth - keyboardScroll.clientWidth;
    const target = width + padding * 2 <= keyboardScroll.clientWidth
      ? left + width / 2 - keyboardScroll.clientWidth / 2
      : left - padding;

    keyboardScroll.scrollTo({
      left: Math.max(0, Math.min(target, maxScroll)),
      behavior
    });
  });
}

function focusScaleOnKeyboard() {
  if (!keyboardScroll) return;
  const scale = scaleNotes(state.key, state.scale);
  const finalRoot = scale[0] ? { ...scale[0], absolute: scale[0].absolute + 12 } : null;
  const notes = finalRoot ? [...scale, finalRoot] : scale;
  const targetAbsolutes = new Set(notes.map((note) => 3 * 12 + note.absolute));

  keyboardPanel?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (!shouldAutoFocusKeyboard()) return;

  requestAnimationFrame(() => {
    const scaleKeys = [...keyboard.querySelectorAll("button")].filter((key) => {
      const absolute = Number(key.dataset.octave) * 12 + Number(key.dataset.pitch);
      return targetAbsolutes.has(absolute);
    });
    if (!scaleKeys.length || keyboardScroll.scrollWidth <= keyboardScroll.clientWidth) return;

    const scrollRect = keyboardScroll.getBoundingClientRect();
    const keyRects = scaleKeys.map((key) => key.getBoundingClientRect());
    const left = Math.min(...keyRects.map((rect) => rect.left)) - scrollRect.left + keyboardScroll.scrollLeft;
    const right = Math.max(...keyRects.map((rect) => rect.right)) - scrollRect.left + keyboardScroll.scrollLeft;
    const width = right - left;
    const padding = 14;
    const maxScroll = keyboardScroll.scrollWidth - keyboardScroll.clientWidth;
    const target = width + padding * 2 <= keyboardScroll.clientWidth
      ? left + width / 2 - keyboardScroll.clientWidth / 2
      : left - padding;

    keyboardScroll.scrollTo({
      left: Math.max(0, Math.min(target, maxScroll)),
      behavior: "smooth"
    });
  });
}

function scaleVideoLookupKey(key = state.key, scale = state.scale) {
  return `${key.label}|${scale.id}`;
}

function youtubeEmbedUrl(videoValue) {
  if (!videoValue) return "";
  const value = String(videoValue).trim();
  const watchMatch = value.match(/[?&]v=([^&]+)/);
  const shortMatch = value.match(/youtu\.be\/([^?&]+)/);
  const embedMatch = value.match(/youtube(?:-nocookie)?\.com\/embed\/([^?&/]+)/);
  const id = embedMatch?.[1] || watchMatch?.[1] || shortMatch?.[1] || value;
  if (!/^[\w-]{6,}$/.test(id)) return "";
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&modestbranding=1&playsinline=1`;
}

function directVideoUrl(videoValue) {
  const value = String(videoValue || "").trim();
  if (!value) return "";
  return /\.(mp4|webm|ogg)(?:[?#].*)?$/i.test(value) ? value : "";
}

function currentScaleVideo() {
  const direct = scaleVideos[scaleVideoLookupKey()];
  if (direct) return direct;
  const enharmonic = keyOptions.find((key) => key.label === enharmonicKeyLabel(state.key.label));
  if (enharmonic) return scaleVideos[scaleVideoLookupKey(enharmonic, state.scale)] || "";
  return "";
}

function nootstudioScaleVideoHtml(source, title) {
  return `
    <div class="scale-video-frame nootstudio-video-player">
      <video src="${escapeHtml(source)}" preload="metadata" playsinline></video>
      <div class="scale-video-poster" aria-hidden="true">
        <img src="assets/nootstudio-piano-toolkit-logo-transparent.png" alt="">
        <span>${formatMusicText(title)}</span>
      </div>
      <div class="scale-video-brand" aria-hidden="true">
        <img src="assets/nootstudio-piano-toolkit-logo-transparent.png" alt="">
      </div>
      <button class="scale-video-big-play" type="button" aria-label="Speel ${escapeHtml(title)}">
        <span aria-hidden="true"></span>
      </button>
      <div class="scale-video-controls">
        <button class="scale-video-play" type="button" aria-label="Speel video">
          <span aria-hidden="true"></span>
        </button>
        <div class="scale-video-progress-wrap">
          <input class="scale-video-seek" type="range" min="0" max="100" value="0" step="0.1" aria-label="Voortgang video">
          <div class="scale-video-time">
            <span>0:00</span>
            <span>0:00</span>
          </div>
        </div>
        <button class="scale-video-mute" type="button" aria-label="Geluid uit">
          <span aria-hidden="true"></span>
        </button>
        <button class="scale-video-fullscreen" type="button" aria-label="Volledig scherm">
          <span aria-hidden="true"></span>
        </button>
      </div>
    </div>
  `;
}

function setupNootstudioScaleVideoPlayer(player) {
  if (!player) return;
  const video = player.querySelector("video");
  const bigPlay = player.querySelector(".scale-video-big-play");
  const playButton = player.querySelector(".scale-video-play");
  const muteButton = player.querySelector(".scale-video-mute");
  const fullscreenButton = player.querySelector(".scale-video-fullscreen");
  const seek = player.querySelector(".scale-video-seek");
  const [currentLabel, durationLabel] = player.querySelectorAll(".scale-video-time span");
  let controlsHideTimer = null;
  let touchControlsReady = false;
  let touchControlsWereVisible = false;
  const isTouchVideoMode = () => window.matchMedia?.("(hover: none), (pointer: coarse)").matches ?? false;
  const hideControls = () => {
    window.clearTimeout(controlsHideTimer);
    controlsHideTimer = null;
    player.classList.remove("controls-visible");
    touchControlsReady = false;
  };
  const showControls = () => {
    player.classList.add("controls-visible");
    touchControlsReady = true;
    window.clearTimeout(controlsHideTimer);
    if (isTouchVideoMode()) {
      controlsHideTimer = window.setTimeout(() => {
        player.classList.remove("controls-visible");
        touchControlsReady = false;
      }, 2400);
    }
  };
  const sync = () => {
    const duration = video.duration || 0;
    const progress = duration ? (video.currentTime / duration) * 100 : 0;
    seek.value = String(progress);
    seek.style.setProperty("--progress", `${progress}%`);
    currentLabel.textContent = formatMediaTime(video.currentTime);
    durationLabel.textContent = formatMediaTime(duration);
  };
  const startPlayback = () => {
    player.classList.add("has-started");
    const playPromise = video.play();
    if (playPromise?.catch) playPromise.catch(() => showControls());
  };
  const playVideo = () => {
    showControls();
    startPlayback();
  };
  const togglePlayback = () => {
    showControls();
    if (video.paused) {
      startPlayback();
    } else {
      video.pause();
    }
  };
  bigPlay.addEventListener("click", playVideo);
  playButton.addEventListener("click", togglePlayback);
  video.addEventListener("click", () => {
    if (isTouchVideoMode() && !touchControlsWereVisible) {
      showControls();
      return;
    }
    togglePlayback();
  });
  player.addEventListener("pointerenter", () => {
    if (!isTouchVideoMode()) showControls();
  });
  player.addEventListener("pointerleave", () => {
    if (!isTouchVideoMode()) hideControls();
  });
  player.addEventListener("pointerdown", () => {
    if (isTouchVideoMode()) {
      touchControlsWereVisible = touchControlsReady;
      showControls();
    }
  });
  seek.addEventListener("input", () => {
    showControls();
    const duration = video.duration || 0;
    if (duration) video.currentTime = (Number(seek.value) / 100) * duration;
    seek.style.setProperty("--progress", `${seek.value}%`);
  });
  muteButton.addEventListener("click", () => {
    showControls();
    video.muted = !video.muted;
    player.classList.toggle("is-muted", video.muted);
    muteButton.setAttribute("aria-label", video.muted ? "Geluid aan" : "Geluid uit");
  });
  fullscreenButton.addEventListener("click", () => {
    showControls();
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      player.requestFullscreen?.();
    }
  });
  video.addEventListener("loadedmetadata", sync);
  video.addEventListener("timeupdate", sync);
  video.addEventListener("play", () => {
    player.classList.add("is-playing");
    playButton.setAttribute("aria-label", "Pauzeer video");
  });
  video.addEventListener("pause", () => {
    player.classList.remove("is-playing");
    playButton.setAttribute("aria-label", "Speel video");
  });
  video.addEventListener("ended", () => {
    player.classList.remove("is-playing");
    hideControls();
    sync();
  });
  sync();
}

function renderScaleVideo() {
  if (!scaleVideoPanel || !scaleVideoDetails || !scaleVideoTitle || !scaleVideoSubtitle || !scaleVideoBody) return;
  const title = `${state.key.label} ${state.scale.name} toonladder`;
  const videoValue = currentScaleVideo();
  const ownVideoUrl = directVideoUrl(videoValue);
  const videoUrl = ownVideoUrl ? "" : youtubeEmbedUrl(videoValue);
  scaleVideoTitle.innerHTML = formatMusicText(title);
  const compact = shouldAutoFocusKeyboard();
  const compactKey = compact ? "compact" : "wide";
  if (scaleVideoDetails.dataset.mode !== compactKey) {
    scaleVideoDetails.open = !compact;
    scaleVideoDetails.dataset.mode = compactKey;
  }
  if (ownVideoUrl) {
    scaleVideoPanel.classList.remove("empty");
    scaleVideoSubtitle.textContent = "Speel mee met de Nootstudio video";
    scaleVideoBody.innerHTML = nootstudioScaleVideoHtml(ownVideoUrl, title);
    setupNootstudioScaleVideoPlayer(scaleVideoBody.querySelector(".nootstudio-video-player"));
  } else if (videoUrl) {
    scaleVideoPanel.classList.remove("empty");
    scaleVideoSubtitle.textContent = "Bekijk hoe je deze toonladder speelt";
    scaleVideoBody.innerHTML = `
      <div class="scale-video-frame">
        <iframe
          src="${escapeHtml(videoUrl)}"
          title="${escapeHtml(title)}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
    `;
  } else {
    scaleVideoPanel.classList.add("empty");
    scaleVideoSubtitle.textContent = "Video volgt binnenkort";
    scaleVideoBody.innerHTML = `
      <div class="scale-video-placeholder">
        <strong>${formatMusicText(title)}</strong>
        <span>Voeg straks de YouTube-ID toe om deze lesvideo hier te tonen.</span>
      </div>
    `;
  }
}

function scrollToMainKeyboard() {
  keyboardPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateInversions() {
  const allowed = state.quality.intervals.length - 1;
  [...inversionSelect.options].forEach((option) => {
    option.disabled = Number(option.value) > allowed;
  });
  if (state.inversion > allowed) {
    state.inversion = allowed;
    inversionSelect.value = String(allowed);
  }
}

function renderChordMode() {
  chordModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.chordMode === state.chordMode);
  });
  if (chordSearchPanel) chordSearchPanel.hidden = state.chordMode !== "search";
  appShell.classList.toggle("chord-search-mode", state.chordMode === "search");
}

function updateSummary(notes, scale) {
  const name = chordName(state.root, state.quality);
  const scaleSet = new Set(scale.map((note) => note.pitch));
  currentName.classList.remove("search-found");
  searchResultLabel?.classList.remove("search-found");
  currentName.innerHTML = `<span class="current-symbol">${formatMusicText(chordSymbol(state.root, state.quality))}</span><span class="current-full-name">${formatMusicText(name)}</span>`;
  currentNotes.innerHTML = formatNoteList(notes);
  pianoTitle.innerHTML = formatMusicText(chordSymbol(state.root, state.quality));

  noteStrip.innerHTML = "";
  appendNoteStripHeading(chordSymbol(state.root, state.quality), state.inversion);
  [...notes].reverse().forEach((note) => {
    const pill = document.createElement("div");
    pill.className = "note-pill";
    pill.classList.toggle("root-note", degreeNumber(note.degree) === 1);
    const outside = !scaleSet.has(note.pitch);
    pill.classList.toggle("outside", outside);
    pill.innerHTML = `<span class="note-name${outside ? " outside-note-label" : ""}">${formatMusicText(note.label)}</span>`;
    noteStrip.append(pill);
  });
}

function updateScaleOnlySummary(scale) {
  currentName.classList.remove("search-found");
  searchResultLabel?.classList.remove("search-found");
  currentName.innerHTML = `<span class="current-symbol scale-summary-symbol">${formatMusicText(state.key.label)} ${state.scale.name} toonladder</span>`;
  currentNotes.innerHTML = formatNoteList(scale);
  pianoTitle.innerHTML = `${formatMusicText(state.key.label)} ${state.scale.name}`;
  noteStrip.innerHTML = "";
}

function updateScaleStrip(scale) {
  scaleStrip.innerHTML = "";
  const title = document.createElement("div");
  title.className = "scale-title";
  title.innerHTML = `${formatMusicText(state.key.label)} ${state.scale.name} toonladder`;
  const notes = document.createElement("div");
  notes.className = "scale-notes";
  scale.forEach((note) => {
    const pill = document.createElement("div");
    pill.className = "scale-pill";
    pill.innerHTML = formatMusicText(note.label);
    notes.append(pill);
  });
  scaleStrip.append(title, notes);
}

function updateDegreeChords(scale) {
  degreeChords.innerHTML = "";
  degreeTriads(scale).forEach((chord) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "degree-card";
    card.classList.toggle("selected", state.chordActive && chord.rootPitch === state.root.pitch && chord.qualityId === state.quality.id);
    card.innerHTML = `
      <strong>${chord.degree}</strong>
      <span>${formatMusicText(chord.symbol)}</span>
      <em class="chord-full-name">${formatMusicText(chord.fullName)}</em>
      <small>${formatNoteList(chord.notes)}</small>
    `;
    card.addEventListener("click", () => selectDegreeChord(chord));
    degreeChords.append(card);
  });
}

function chordSequenceItemId(chord) {
  return [chord.root, chord.qualityId, chord.rootAbsolute].join(":");
}

function sequenceInversionOptions(chord) {
  const quality = qualities.find((item) => item.id === chord.qualityId) || state.quality;
  const maxInversion = Math.max(0, quality.intervals.length - 1);
  return Array.from({ length: maxInversion + 1 }, (_item, index) => ({
    value: index,
    label: voicingLabel(index)
  }));
}

function sequenceChordWithVoicing(chord, previousNotes = null, useSelectedInversion = false) {
  const matchingRoot = rootOptions.find((root) => root.label === chord.root)
    || rootOptions.find((root) => root.pitch === chord.rootPitch)
    || state.root;
  const matchingQuality = qualities.find((quality) => quality.id === chord.qualityId) || state.quality;
  const parsedChord = { root: matchingRoot, quality: matchingQuality };
  const maxInversion = Math.max(0, matchingQuality.intervals.length - 1);
  const manualInversion = Number.isFinite(chord.manualInversion)
    ? Math.min(Math.max(0, Number(chord.manualInversion)), maxInversion)
    : null;
  const voicing = manualInversion !== null
    ? selectedSequenceVoicingForInversion(parsedChord, manualInversion, previousNotes)
    : (useSelectedInversion
      ? selectedSequenceVoicing(parsedChord)
      : sequenceVoicing(parsedChord, previousNotes));
  return {
    ...chord,
    root: matchingRoot.label,
    rootPitch: matchingRoot.pitch,
    qualityId: matchingQuality.id,
    symbol: chordSymbol(matchingRoot, matchingQuality),
    fullName: chordName(matchingRoot, matchingQuality),
    notes: voicing.notes,
    voicingNotes: voicing.notes,
    inversion: voicing.inversion,
    manualInversion,
    selectedRootAbsolute: voicing.rootAbsolute
  };
}

function rebuildChordSequence(chords) {
  let previousNotes = null;
  return chords.slice(0, 4).map((chord, index) => {
    const sequenceChord = sequenceChordWithVoicing(chord, previousNotes, index === 0);
    previousNotes = sequenceChord.voicingNotes;
    return sequenceChord;
  });
}

function currentChordForSequence() {
  return {
    root: state.root.label,
    rootPitch: state.root.pitch,
    qualityId: state.quality.id,
    symbol: chordSymbol(state.root, state.quality),
    fullName: chordName(state.root, state.quality),
    notes: chordNotes(state.root, state.quality)
  };
}

function addChordToSequence(chord) {
  const nextSequence = state.chordSequence.length >= 4
    ? [chord, ...state.chordSequence.slice(0, 3)]
    : [...state.chordSequence, chord];
  state.chordSequence = rebuildChordSequence(nextSequence);
  applyDegreeChord(chord, { record: false, focus: false });
}

function clearChordSequence() {
  state.chordSequence = [];
}

function clearSelectedInspirationSong() {
  state.selectedInspirationSong = null;
  state.selectedSongTransposeKey = null;
  state.selectedModulationChord = null;
  inspirationList?.querySelectorAll(".inspiration-card.selected").forEach((card) => {
    card.classList.remove("selected");
  });
}

function renderChordSequenceNotation() {
  if (!chordSequenceNotation) return;
  chordSequenceNotation.innerHTML = "";
  if (!state.chordSequence.length) return;
  state.chordSequence.forEach((chord, index) => {
    const staff = document.createElement("div");
    staff.className = "song-notation chord-sequence-staff";
    staff.dataset.notes = chord.voicingNotes.map((note) => note.absolute).join(",");
    staff.dataset.labels = chord.voicingNotes.map((note) => note.label).join(",");
    staff.dataset.duration = "w";
    staff.dataset.dots = "0";
    staff.dataset.clef = index === 0 ? "true" : "false";
    staff.dataset.staffEnd = "false";
    chordSequenceNotation.append(staff);
  });
  renderSongNotation(chordSequenceNotation);
}

function renderChordSequence() {
  if (!chordSequencePanel || !chordSequenceList) return;
  chordSequencePanel.hidden = false;
  if (addChordSequence) addChordSequence.disabled = false;
  chordSequenceList.innerHTML = "";
  chordSequenceList.classList.toggle("empty", state.chordSequence.length === 0);
  if (!state.chordSequence.length) {
    chordSequenceList.textContent = "Kies een akkoord en klik op Voeg toe";
    renderChordSequenceNotation();
    return;
  }
  state.chordSequence.forEach((chord, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chord-sequence-card";
    button.classList.toggle("selected", state.chordActive && chord.rootPitch === state.root.pitch && chord.qualityId === state.quality.id);
    button.dataset.sequenceId = chordSequenceItemId(chord);
    button.innerHTML = `
      <small>${index + 1}</small>
      <strong>${formatMusicText(chord.symbol)}</strong>
      <span>${formatNoteList(chord.voicingNotes || chord.notes || [])}</span>
      <em>${formatMusicText(voicingLabel(chord.inversion))}</em>
    `;
    button.addEventListener("click", () => {
      const options = sequenceInversionOptions(chord);
      const currentIndex = options.findIndex((option) => Number(option.value) === chord.inversion);
      const nextOption = options[(currentIndex + 1 + options.length) % options.length] || options[0];
      const nextSequence = state.chordSequence.map((item, itemIndex) => (
        itemIndex === index
          ? { ...item, manualInversion: Number(nextOption.value) }
          : item
      ));
      state.chordSequence = rebuildChordSequence(nextSequence);
      applyDegreeChord({ ...chord, inversion: Number(nextOption.value) }, { record: false, focus: false });
      render();
    });
    chordSequenceList.append(button);
  });
  renderChordSequenceNotation();
}

function customChordWithVoicing(chord, previousNotes = null, index = 0) {
  const root = rootOptions.find((option) => option.label === chord.root)
    || rootOptions.find((option) => option.pitch === chord.rootPitch)
    || customState.root;
  const quality = qualities.find((option) => option.id === chord.qualityId) || customState.quality;
  const parsedChord = { root, quality };
  const maxInversion = Math.max(0, quality.intervals.length - 1);
  const manualInversion = Number.isFinite(chord.manualInversion)
    ? Math.min(Math.max(0, Number(chord.manualInversion)), maxInversion)
    : null;
  const firstInversion = Math.min(Math.max(0, Number(chord.startInversion ?? customState.inversion) || 0), maxInversion);
  const voicing = manualInversion !== null
    ? selectedSequenceVoicingForInversion(parsedChord, manualInversion, previousNotes)
    : (index === 0
      ? selectedSequenceVoicingForInversion(parsedChord, firstInversion)
      : sequenceVoicing(parsedChord, previousNotes));
  return {
    ...chord,
    root: root.label,
    rootPitch: root.pitch,
    qualityId: quality.id,
    symbol: chordSymbol(root, quality),
    fullName: chordName(root, quality),
    notes: chordNotes(root, quality),
    voicingNotes: voicing.notes,
    inversion: voicing.inversion,
    manualInversion,
    selectedRootAbsolute: voicing.rootAbsolute
  };
}

function rebuildCustomChords() {
  let previousNotes = null;
  customState.chords = customState.chords.map((chord, index) => {
    const next = customChordWithVoicing(chord, previousNotes, index);
    previousNotes = next.voicingNotes;
    return next;
  });
}

function currentCustomChord() {
  return {
    root: customState.root.label,
    rootPitch: customState.root.pitch,
    qualityId: customState.quality.id,
    startInversion: customState.inversion
  };
}

function customChordFromParsed(parsed) {
  return {
    root: parsed.root.label,
    rootPitch: parsed.root.pitch,
    qualityId: parsed.quality.id,
    startInversion: customState.inversion
  };
}

function addCustomChord(chord = currentCustomChord()) {
  const insertAt = customState.chords.length;
  customState.chords.splice(insertAt, 0, chord);
  customState.selectedIndex = insertAt;
  rebuildCustomChords();
  renderCustomComposer();
}

function addTypedCustomChord() {
  const parsed = parseChordToken(customChordText?.value || "");
  if (!parsed || parsed.noChord) return;
  addCustomChord(customChordFromParsed(parsed));
  if (customChordText) customChordText.value = "";
}

function removeCustomChord(index) {
  customState.chords.splice(index, 1);
  if (customState.selectedIndex === index) customState.selectedIndex = null;
  if (Number.isInteger(customState.selectedIndex) && customState.selectedIndex > index) customState.selectedIndex -= 1;
  rebuildCustomChords();
  renderCustomComposer();
}

function resetCustomChords() {
  customState.chords = [];
  customState.selectedIndex = null;
  renderCustomComposer();
}

function cycleCustomChordInversion(index) {
  const chord = customState.chords[index];
  if (!chord) return;
  const quality = qualities.find((option) => option.id === chord.qualityId) || customState.quality;
  const allowed = Math.max(0, quality.intervals.length - 1);
  const currentInversion = Number.isFinite(chord.manualInversion)
    ? Number(chord.manualInversion)
    : Number(chord.inversion || 0);
  const nextInversion = (Math.min(Math.max(0, currentInversion), allowed) + 1) % (allowed + 1);
  customState.selectedIndex = index;
  customState.chords = customState.chords.map((item, itemIndex) => {
    if (itemIndex < index) return item;
    if (itemIndex === index) {
      const next = { ...item, manualInversion: nextInversion };
      if (itemIndex === 0) {
        next.startInversion = nextInversion;
        customState.inversion = nextInversion;
      }
      return next;
    }
    const { manualInversion, ...automaticItem } = item;
    return automaticItem;
  });
  rebuildCustomChords();
  renderCustomComposer();
}

function setCustomZoom(value) {
  customState.zoom = Math.min(1.4, Math.max(0.85, Number(value) || 1));
  renderCustomComposer();
}

function renderCustomComposer() {
  if (!customGrid) return;
  if (customKeySelect) customKeySelect.value = String(keyOptions.indexOf(customState.key));
  if (customScaleSelect) customScaleSelect.value = customState.scale.id;
  if (customRootSelect) customRootSelect.value = String(rootOptions.indexOf(customState.root));
  if (customQualitySelect) customQualitySelect.value = customState.quality.id;
  if (customInversionSelect) {
    [...customInversionSelect.options].forEach((option) => {
      option.disabled = Number(option.value) > customState.quality.intervals.length - 1;
    });
    if (customState.inversion > customState.quality.intervals.length - 1) {
      customState.inversion = customState.quality.intervals.length - 1;
    }
    customInversionSelect.value = String(customState.inversion);
  }
  if (customTitleInput && customTitleInput.value !== customState.title) customTitleInput.value = customState.title;
  if (customArtistInput && customArtistInput.value !== customState.artist) customArtistInput.value = customState.artist;
  if (customTitleDisplay) customTitleDisplay.textContent = customState.title || "Titel";
  if (customArtistDisplay) customArtistDisplay.textContent = customState.artist || "";
  if (customZoomRange && Number(customZoomRange.value) !== customState.zoom) customZoomRange.value = String(customState.zoom);
  renderCustomScaleKeyboard();
  renderCustomPrintScale();
  if (customState.chords[0]) {
    const firstQuality = qualities.find((quality) => quality.id === customState.chords[0].qualityId) || customState.quality;
    const allowedFirstInversion = firstQuality.intervals.length - 1;
    if (customState.inversion > allowedFirstInversion) {
      customState.inversion = allowedFirstInversion;
      customState.chords[0].startInversion = allowedFirstInversion;
      rebuildCustomChords();
    }
  }

  renderCustomExamples();

  customGrid.innerHTML = "";
  customGrid.style.setProperty("--custom-zoom", customState.zoom.toFixed(2));
  customGrid.classList.toggle("empty", customState.chords.length === 0);
  if (!customState.chords.length) {
    customGrid.textContent = "Kies, typ of klik op een voorbeeldakkoord om te beginnen.";
    return;
  }

  customState.chords.forEach((chord, index) => {
    const card = document.createElement("article");
    card.className = "custom-chord-card";
    card.classList.toggle("selected", customState.selectedIndex === index);
    card.tabIndex = 0;
    card.innerHTML = `
      <button class="custom-remove" type="button" aria-label="Verwijder ${formatMusicText(chord.symbol)}">×</button>
      <div class="custom-card-head">
        <strong>${formatMusicText(chord.symbol)}</strong>
        <span class="custom-card-voicing">${formatMusicText(voicingLabel(chord.inversion))}</span>
      </div>
      ${miniKeyboardHtml(chord.voicingNotes || chord.notes || [], true, {
        className: "custom-mini-keyboard",
        whiteWidth: 34,
        blackWidth: 22,
        height: 48,
        blackHeight: 30,
        whiteLabelY: 40,
        blackLabelY: 24
      })}
    `;
    card.addEventListener("click", () => {
      cycleCustomChordInversion(index);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      cycleCustomChordInversion(index);
    });
    card.querySelector(".custom-remove").addEventListener("click", (event) => {
      event.stopPropagation();
      removeCustomChord(index);
    });
    customGrid.append(card);
  });
}

function renderCustomScaleKeyboard() {
  if (!customScaleKeyboard) return;
  const notes = scaleNotes(customState.key, customState.scale);
  customScaleKeyboard.innerHTML = scaleKeyboardHtml(notes, customState.key, customState.scale);
  requestAnimationFrame(() => {
    const markedKeys = Array.from(customScaleKeyboard.querySelectorAll(".in-scale"));
    if (!markedKeys.length || customScaleKeyboard.scrollWidth <= customScaleKeyboard.clientWidth) return;
    const left = Math.min(...markedKeys.map((key) => key.offsetLeft));
    const right = Math.max(...markedKeys.map((key) => key.offsetLeft + key.offsetWidth));
    customScaleKeyboard.scrollLeft = Math.max(0, (left + right) / 2 - customScaleKeyboard.clientWidth / 2);
  });
}

function renderCustomPrintScale() {
  if (!customPrintScale) return;
  const notes = scaleNotes(customState.key, customState.scale);
  customPrintScale.innerHTML = `
    <h3>${formatMusicText(customState.key.label)} ${customState.scale.name} toonladder</h3>
    ${scaleKeyboardHtml(notes, customState.key, customState.scale)}
  `;
}

function renderCustomExamples() {
  if (!customExampleGrid) return;
  customExampleGrid.innerHTML = "";
  const scale = scaleNotes(customState.key, customState.scale);
  degreeTriads(scale).forEach((chord) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "custom-example-card";
    button.innerHTML = `
      <strong>${formatMusicText(chord.symbol)}</strong>
      <span>${formatNoteList(chord.notes)}</span>
    `;
    button.addEventListener("click", () => {
      addCustomChord({
        root: chord.root,
        rootPitch: chord.rootPitch,
        qualityId: chord.qualityId,
        startInversion: customState.inversion
      });
    });
    customExampleGrid.append(button);
  });
}

function updateChordNotationPanel(notes, title = "") {
  if (!chordNotationStaff) return;
  const fallbackTitle = `
    <strong>${formatMusicText(chordSymbol(state.root, state.quality))}</strong>
    <small>${formatNoteList(notes)}</small>
    <small>${formatMusicText(voicingLabel(state.inversion))}</small>
  `;
  if (chordNotationTitle) chordNotationTitle.innerHTML = title || fallbackTitle;
  chordNotationStaff.innerHTML = "";
  if (!notes.length) {
    chordNotationStaff.textContent = "";
    return;
  }
  chordNotationStaff.dataset.notes = notes.map((note) => note.absolute).join(",");
  chordNotationStaff.dataset.labels = notes.map((note) => note.label).join(",");
  chordNotationStaff.dataset.duration = "w";
  chordNotationStaff.dataset.dots = "0";
  chordNotationStaff.dataset.clef = "true";
  chordNotationStaff.dataset.staffEnd = "false";
  renderChordNotation(chordNotationStaff);
}

function applyDegreeChord(chord, { record = true, useChordVoicing = false, focus = true, scrollTarget = "detail" } = {}) {
  const matchingRoot = rootOptions.find((root) => root.label === chord.root)
    || rootOptions.find((root) => root.pitch === chord.rootPitch)
    || state.root;
  const matchingQuality = qualities.find((quality) => quality.id === chord.qualityId) || state.quality;
  const allowedInversion = matchingQuality.intervals.length - 1;
  state.root = matchingRoot;
  state.libraryRoot = matchingRoot;
  state.quality = matchingQuality;
  state.inversion = useChordVoicing && Number.isFinite(chord.inversion)
    ? Math.min(chord.inversion, allowedInversion)
    : Math.min(state.inversion, allowedInversion);
  state.selectedRootAbsolute = useChordVoicing
    ? (chord.selectedRootAbsolute ?? chord.rootAbsolute)
    : (Number.isFinite(chord.rootAbsolute) ? chord.rootAbsolute : null);
  state.chordActive = true;
  state.selectedInspirationSong = null;
  state.selectedModulationChord = null;
  if (record) addChordToSequence(chord);
  if (focus) requestKeyboardFocus();
  rootSelect.value = String(rootOptions.indexOf(matchingRoot));
  qualitySelect.value = matchingQuality.id;
  inversionSelect.value = String(state.inversion);
  render();
  if (focus && shouldAutoFocusKeyboard()) {
    if (scrollTarget === "keyboard") {
      scrollToKeyboardPanel();
    } else {
      scrollToMobileChordDetail();
    }
  }
  if (focus) keepKeyboardPanelInViewOnTablet();
}

function selectDegreeChord(chord) {
  applyDegreeChord(chord, { record: false, scrollTarget: "keyboard" });
}

function svgEl(name, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function polarPoint(center, radius, angleDegrees) {
  const radians = angleDegrees * Math.PI / 180;
  return {
    x: center + Math.cos(radians) * radius,
    y: center + Math.sin(radians) * radius
  };
}

function annularSectorPath(center, innerRadius, outerRadius, startAngle, endAngle) {
  const outerStart = polarPoint(center, outerRadius, startAngle);
  const outerEnd = polarPoint(center, outerRadius, endAngle);
  const innerEnd = polarPoint(center, innerRadius, endAngle);
  const innerStart = polarPoint(center, innerRadius, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z"
  ].join(" ");
}

function renderFifthsCircle() {
  const center = 180;
  const outerRadius = 164;
  const innerRadius = 114;
  const labelRadius = 140;
  const minorLabelRadius = 86;
  const relativeMinors = ["Am", "Em", "Bm", "F#m", "C#m", "G#m", "Ebm", "Bbm", "Fm", "Cm", "Gm", "Dm"];
  const activeIndex = fifthsCircle.findIndex((item) => item.aliases.includes(state.key.label));
  const activeAngle = -90 + activeIndex * 30;
  const arrowEnd = polarPoint(center, 58, activeAngle);

  fifthsCircleSvg.innerHTML = "";
  circleKeyLabel.innerHTML = `${formatMusicText(state.key.label)} ${state.scale.name}`;

  const defs = svgEl("defs");
  const marker = svgEl("marker", {
    id: "arrowHead",
    markerWidth: "10",
    markerHeight: "10",
    refX: "7",
    refY: "3",
    orient: "auto",
    markerUnits: "strokeWidth"
  });
  marker.append(svgEl("path", { d: "M0,0 L0,6 L8,3 z", fill: "#d5a51d" }));
  defs.append(marker);
  fifthsCircleSvg.append(defs);
  fifthsCircleSvg.append(svgEl("circle", { class: "circle-outer-disc", cx: center, cy: center, r: outerRadius }));

  fifthsCircle.forEach((item, index) => {
    const active = index === activeIndex;
    const startAngle = -105 + index * 30;
    const endAngle = startAngle + 30;
    const slice = svgEl("path", {
      class: `circle-slice ${active ? "active" : ""}`,
      d: annularSectorPath(center, innerRadius, outerRadius, startAngle, endAngle)
    });
    slice.addEventListener("click", () => setKeyFromCircleItem(item));
    fifthsCircleSvg.append(slice);
  });

  fifthsCircleSvg.append(svgEl("circle", { class: "circle-inner-disc", cx: center, cy: center, r: innerRadius }));

  fifthsCircle.forEach((_item, index) => {
    const boundary = -105 + index * 30;
    const start = polarPoint(center, innerRadius, boundary);
    const end = polarPoint(center, outerRadius, boundary);
    fifthsCircleSvg.append(svgEl("line", {
      class: "circle-spoke",
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y
    }));
  });

  fifthsCircleSvg.append(svgEl("line", {
    class: "circle-arrow",
    x1: center,
    y1: center,
    x2: arrowEnd.x,
    y2: arrowEnd.y,
    "marker-end": "url(#arrowHead)"
  }));
  fifthsCircleSvg.append(svgEl("circle", { class: "circle-center", cx: center, cy: center, r: 18 }));

  fifthsCircle.forEach((item, index) => {
    const active = index === activeIndex;
    const angle = -90 + index * 30;
    const outer = polarPoint(center, labelRadius, angle);
    const inner = polarPoint(center, minorLabelRadius, angle);
    const text = svgEl("text", {
      class: `circle-label circle-major-label ${active ? "active" : ""}`,
      x: outer.x,
      y: outer.y
    });
    text.textContent = item.label;
    text.addEventListener("click", () => setKeyFromCircleItem(item));
    fifthsCircleSvg.append(text);
    const minorText = svgEl("text", {
      class: "circle-label circle-minor-label",
      x: inner.x,
      y: inner.y
    });
    minorText.textContent = relativeMinors[index];
    fifthsCircleSvg.append(minorText);
  });
}

function renderGrid() {
  const filter = filterInput.value.trim().toLowerCase();
  const scaleSet = new Set(scaleNotes(state.key, state.scale).map((note) => note.pitch));
  if (libraryToggle) libraryToggle.setAttribute("aria-expanded", state.libraryOpen ? "true" : "false");
  if (libraryContent) libraryContent.hidden = !state.libraryOpen;
  chordGrid.innerHTML = "";
  renderRootTabs();
  qualities.forEach((quality) => {
    const name = chordName(state.libraryRoot, quality);
    const symbol = chordSymbol(state.libraryRoot, quality);
    const chord = chordNotes(state.libraryRoot, quality);
    const notes = chord.map((note) => note.label).join(" - ");
    const outside = chord.filter((note) => !scaleSet.has(note.pitch));
    const haystack = `${name} ${symbol} ${notes}`.toLowerCase();
    if (filter && !haystack.includes(filter)) return;

    const card = document.createElement("button");
    card.type = "button";
    card.className = "chord-card";
    card.classList.toggle("fits-scale", outside.length === 0);
    card.classList.toggle("selected", state.chordActive && state.root.label === state.libraryRoot.label && state.quality.id === quality.id);
    card.setAttribute(
      "aria-label",
      outside.length
        ? `${name}, buiten toonladder: ${outside.map((note) => note.label).join(", ")}`
        : `${name}, past in toonladder`
    );
    card.innerHTML = `
      <strong>${formatMusicText(symbol)}</strong>
      <span class="chord-full-name">${formatMusicText(name)}</span>
      <small>${chord.map((note) => formatMusicText(note.label)).join(" - ")}</small>
    `;
    card.addEventListener("click", () => {
      state.root = state.libraryRoot;
      state.quality = quality;
      state.selectedRootAbsolute = null;
      state.chordActive = true;
      requestKeyboardFocus();
      rootSelect.value = String(rootOptions.indexOf(state.root));
      qualitySelect.value = quality.id;
      render();
      scrollToChordInfoBlock();
    });
    chordGrid.append(card);
  });
}

function playNotes(notes) {
  if (!isSongPlaying) resetAudioContext();
  const context = getAudioContext();
  const now = context.currentTime + 0.03;
  notes.forEach((note, index) => {
    const frequency = frequencyFromMidi(midiFromAbsolutePitch(note.absolute));
    playPianoTone(context, frequency, now + index * 0.024, 2.6, 0.17);
  });
}

function playNotesAt(notes, startTime, duration = 1.35) {
  const context = getAudioContext();
  notes.forEach((note, index) => {
    const frequency = frequencyFromMidi(midiFromAbsolutePitch(note.absolute));
    playPianoTone(context, frequency, startTime + index * 0.024, Math.max(1.1, duration * 1.35), 0.17);
  });
}

function miniKeyboardHtml(notes, showLabels = false, options = {}) {
  const active = new Set(notes.map((note) => note.absolute));
  const bassNotes = new Set(notes.filter((note) => note.bass).map((note) => note.absolute));
  const labels = new Map(notes.map((note) => [note.absolute, note.label]));
  const absolutes = notes.map((note) => note.absolute);
  const lowest = Math.min(...absolutes);
  const highest = Math.max(...absolutes);
  const paddedLow = lowest - 2;
  const paddedHigh = highest + 2;
  let firstWhite = Math.floor(paddedLow / 12) * 12;
  let lastWhite = Math.floor(paddedHigh / 12) * 12 + 11;
  while (!whitePattern.includes(mod(lastWhite, 12))) lastWhite -= 1;
  while (lastWhite - firstWhite < 12) {
    firstWhite -= 12;
    if (lastWhite - firstWhite >= 12) break;
    lastWhite += 12;
  }
  const whiteNotes = [];
  for (let absolute = firstWhite; absolute <= lastWhite; absolute += 1) {
    if (whitePattern.includes(mod(absolute, 12))) {
      whiteNotes.push({ absolute, pitch: mod(absolute, 12) });
    }
  }
  const blackKeys = [];
  whiteNotes.forEach((note, index) => {
    const next = whiteNotes[index + 1];
    if (!next || next.absolute - note.absolute !== 2) return;
    blackKeys.push({ absolute: note.absolute + 1, index });
  });
  const whiteWidth = options.whiteWidth || 16;
  const blackWidth = options.blackWidth || 9;
  const keyboardHeight = options.height || 52;
  const blackHeight = options.blackHeight || 32;
  const whiteLabelY = options.whiteLabelY || 43.5;
  const blackLabelY = options.blackLabelY || 25;
  const extraClass = options.className ? ` ${options.className}` : "";
  const keyboardWidth = whiteNotes.length * whiteWidth;
  return `
    <svg class="mini-keyboard${extraClass}" viewBox="0 0 ${keyboardWidth} ${keyboardHeight}" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      ${whiteNotes.map((note, index) => `
        <rect
          class="mini-white ${active.has(note.absolute) ? "active" : ""} ${bassNotes.has(note.absolute) ? "bass" : ""}"
          x="${index * whiteWidth}"
          y="0"
          width="${whiteWidth}"
          height="${keyboardHeight}"
          rx="1.6"
        ></rect>
        ${bassNotes.has(note.absolute) ? `<circle class="mini-bass-dot" cx="${index * whiteWidth + whiteWidth / 2}" cy="44" r="3.2"></circle>` : ""}
        ${showLabels && labels.has(note.absolute) ? `<text class="mini-note-label" x="${index * whiteWidth + whiteWidth / 2}" y="${whiteLabelY}">${formatMusicText(labels.get(note.absolute))}</text>` : ""}
      `).join("")}
      ${blackKeys.map((note) => `
        <rect
          class="mini-black ${active.has(note.absolute) ? "active" : ""} ${bassNotes.has(note.absolute) ? "bass" : ""}"
          x="${(note.index + 1) * whiteWidth - blackWidth / 2}"
          y="0"
          width="${blackWidth}"
          height="${blackHeight}"
          rx="1.4"
        ></rect>
        ${bassNotes.has(note.absolute) ? `<circle class="mini-bass-dot" cx="${(note.index + 1) * whiteWidth}" cy="27" r="2.8"></circle>` : ""}
        ${showLabels && labels.has(note.absolute) ? `<text class="mini-note-label mini-note-label-black" x="${(note.index + 1) * whiteWidth}" y="${blackLabelY}">${formatMusicText(labels.get(note.absolute))}</text>` : ""}
      `).join("")}
    </svg>
  `;
}

function hideFloatingChord() {
  if (!floatingChord) return;
  floatingChord.hidden = true;
  floatingChord.innerHTML = "";
}

function showFloatingChord(anchor, token, keyLabel = null) {
  if (!floatingChord) return;
  const parsed = parseChordToken(token);
  if (!parsed || parsed.noChord) {
    hideFloatingChord();
    return;
  }
  const sectionScale = majorScaleForKeyLabel(keyLabel);
  const notes = voicedNotes(
    parsed.root,
    parsed.quality,
    0,
    bestRootAbsoluteForScale(parsed.root, parsed.quality, 0, sectionScale.notes)
  );
  floatingChord.innerHTML = `
    <div class="floating-chord-title">
      <strong>${formatMusicText(parsed.symbol)}</strong>
      <span>${formatMusicText(chordNotes(parsed.root, parsed.quality).map((note) => note.label).join(" - "))}</span>
    </div>
    ${miniKeyboardHtml(notes, true)}
  `;
  floatingChord.hidden = false;
  const rect = typeof anchor?.getBoundingClientRect === "function" ? anchor.getBoundingClientRect() : anchor;
  const popup = floatingChord.getBoundingClientRect();
  const margin = 10;
  const left = Math.min(
    window.innerWidth - popup.width - margin,
    Math.max(margin, rect.left + rect.width / 2 - popup.width / 2)
  );
  const top = Math.min(
    window.innerHeight - popup.height - margin,
    Math.max(margin, rect.bottom + 8)
  );
  floatingChord.style.left = `${left}px`;
  floatingChord.style.top = `${top}px`;
}

function scaleKeyboardGeometry(notes) {
  const start = notes[0].absolute;
  const end = notes[notes.length - 1].absolute;
  const firstWhite = whitePattern.includes(mod(start, 12))
    ? start
    : start - 1;
  const lastWhite = whitePattern.includes(mod(end, 12))
    ? end
    : end + 1;
  const whiteNotes = [];
  for (let absolute = firstWhite; absolute <= lastWhite; absolute += 1) {
    if (whitePattern.includes(mod(absolute, 12))) {
      whiteNotes.push({ absolute, pitch: mod(absolute, 12) });
    }
  }
  const blackKeys = [];
  whiteNotes.forEach((note, index) => {
    const next = whiteNotes[index + 1];
    if (!next || next.absolute - note.absolute !== 2) return;
    const blackAbsolute = note.absolute + 1;
    if (blackAbsolute >= start && blackAbsolute <= end) {
      blackKeys.push({ absolute: blackAbsolute, index });
    }
  });
  const whiteWidth = 42;
  const blackWidth = 26;
  const keyboardWidth = whiteNotes.length * whiteWidth;
  const notePoints = notes.map((note) => {
    const whiteIndex = whiteNotes.findIndex((white) => white.absolute === note.absolute);
    if (whiteIndex >= 0) {
      return { ...note, x: whiteIndex * whiteWidth + whiteWidth / 2 };
    }
    const leftWhiteIndex = whiteNotes.findIndex((white) => white.absolute + 1 === note.absolute);
    return { ...note, x: (leftWhiteIndex + 1) * whiteWidth };
  });
  return { blackKeys, blackWidth, keyboardWidth, notePoints, whiteNotes, whiteWidth };
}

function scaleKeyStaffHtml(note, x, y, width, colorClass) {
  const lineSpacing = 4;
  const staffY = Math.min(80, Math.max(30, staffYForNote(note)));
  const noteY = y - 2 + ((staffY - 30) / 50) * 24;
  const stemUp = noteY >= y + lineSpacing * 2;
  const stemX = stemUp ? x + 4.2 : x - 4.2;
  const stemTop = stemUp ? noteY - 18 : noteY;
  const stemBottom = stemUp ? noteY : noteY + 18;
  const accidental = note.label.slice(1);
  return `
    <g class="scale-key-staff ${colorClass}">
      ${Array.from({ length: 5 }, (_, index) => `<line class="scale-key-staff-line" x1="${x - width / 2}" y1="${y + index * lineSpacing}" x2="${x + width / 2}" y2="${y + index * lineSpacing}"></line>`).join("")}
      ${accidental ? `<text class="scale-key-accidental" x="${x - width / 2 + 2}" y="${noteY + 3}">${formatMusicText(accidental)}</text>` : ""}
      <line class="scale-key-stem" x1="${stemX}" y1="${stemBottom}" x2="${stemX}" y2="${stemTop}"></line>
      <ellipse class="scale-key-notehead" cx="${x}" cy="${noteY}" rx="4.4" ry="3.2" transform="rotate(-18 ${x} ${noteY})"></ellipse>
    </g>
  `;
}

function scaleKeyboardHtml(notes, key = songState.key, scale = songState.scale, activeNotes = []) {
  const labelStartAbsolute = scaleStartAbsolute(key, scale);
  const labelTargets = new Map();
  const activeTargets = new Set(activeNotes.map((note) => 3 * 12 + note.absolute));
  const activeRootTargets = new Set(
    activeNotes
      .filter((note) => note.degree && degreeNumber(note.degree) === 1)
      .map((note) => 3 * 12 + note.absolute)
  );
  scale.intervals.forEach((interval, index) => {
    labelTargets.set(labelStartAbsolute + interval, notes[index]?.label || "");
  });
  labelTargets.set(labelStartAbsolute + 12, notes[0]?.label || "");
  const rootTargets = new Set([labelStartAbsolute, labelStartAbsolute + 12]);
  const whiteKeys = keyboardWhiteNotes.map(({ pitch, octave }, index) => {
    const absolute = octave * 12 + pitch;
    const label = labelTargets.get(absolute) || "";
    const active = activeTargets.has(absolute);
    return `
      <button class="white-key ${label ? "in-scale" : ""} ${rootTargets.has(absolute) ? "scale-root" : ""} ${active ? "active" : ""} ${activeRootTargets.has(absolute) ? "root" : ""}" type="button" tabindex="-1">
        <span class="key-label">${formatMusicText(label)}</span>
      </button>
    `;
  }).join("");
  const blackKeys = keyboardWhiteNotes.map(({ octave }, index) => {
    const pitch = blackAfterWhite[index % 7];
    if (pitch === undefined || index + 1 >= keyboardWhiteNotes.length) return "";
    const absolute = octave * 12 + pitch;
    const label = labelTargets.get(absolute) || "";
    const active = activeTargets.has(absolute);
    return `
      <button
        class="black-key ${label ? "in-scale" : ""} ${rootTargets.has(absolute) ? "scale-root" : ""} ${active ? "active" : ""} ${activeRootTargets.has(absolute) ? "root" : ""}"
        type="button"
        tabindex="-1"
        style="left: calc(((100% / 19) * ${index + 1}))"
      >
        <span class="key-label">${formatMusicText(label)}</span>
      </button>
    `;
  }).join("");
  return `<div class="keyboard song-scale-piano">${whiteKeys}${blackKeys}</div>`;
}

function scaleNotationHtml(notes) {
  const shifted = readableScaleNotationNotes(notes);
  const notationWidth = 156;
  const lineYs = [36, 45, 54, 63, 72];
  const noteSpacing = notationWidth / Math.max(notes.length - 1, 1);
  const noteMarkup = shifted.map((note, index) => {
    const x = index * noteSpacing + 6;
    const y = Math.min(80, Math.max(30, staffYForNote(note)));
    const stemUp = y >= 54;
    const stemX = x + 5;
    const stemTop = stemUp ? y - 28 : y;
    const stemBottom = stemUp ? y : y + 28;
    const accidental = note.label.slice(1);
    return `
      ${accidental ? `<text class="scale-staff-accidental" x="${x - 9}" y="${y + 4}">${formatMusicText(accidental)}</text>` : ""}
      <ellipse class="scale-staff-note" cx="${x}" cy="${y}" rx="4.8" ry="3.6" transform="rotate(-18 ${x} ${y})"></ellipse>
      <line class="scale-staff-stem" x1="${stemX}" y1="${stemBottom}" x2="${stemX}" y2="${stemTop}"></line>
    `;
  }).join("");
  return `
    <svg class="scale-staff" viewBox="-18 0 ${notationWidth + 30} 92" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <text class="scale-staff-clef" x="-16" y="70">&#119070;</text>
      ${lineYs.map((y) => `<line class="scale-staff-line" x1="0" y1="${y}" x2="${notationWidth + 12}" y2="${y}"></line>`).join("")}
      ${noteMarkup}
    </svg>
  `;
}

function renderSongScaleOverview() {
  const scale = scaleNotes(songState.key, songState.scale);
  const repeatedScale = [...scale, { ...scale[0], absolute: scale[0].absolute + 12 }];
  songScaleTitle.innerHTML = `${formatMusicText(songState.key.label)} ${songState.scale.name} toonladder`;
  songScaleKeyboard.innerHTML = scaleKeyboardHtml(scale);
  try {
    renderScaleNotation(songScaleNotation, repeatedScale);
  } catch {
    songScaleNotation.innerHTML = "";
  }
  songScaleNoteRow.innerHTML = "";
}

function parseMeasures(chordText) {
  const trimmed = chordText.trim();
  if (!trimmed) return [];

  const parseMeasureGroup = (value) => value
    .split(/\n+|\|/)
    .map((measure) => measure.trim().split(/\s+/).filter(Boolean).map(parseChordEntry))
    .filter((measure) => measure.length > 0 && !measure.every((entry) => /^:?$/.test(chordEntryToken(entry))));

  const parts = [];
  let rest = trimmed;
  const repeatPattern = /\|\|:?\s*([\s\S]*?)\s*:?\|\|\s*x([2-9]\d*)/i;
  while (rest) {
    const repeatMatch = rest.match(repeatPattern);
    if (!repeatMatch) {
      const measures = parseMeasureGroup(rest);
      if (measures.length) parts.push({ measures, repeat: 1 });
      break;
    }

    const before = rest.slice(0, repeatMatch.index);
    const beforeMeasures = parseMeasureGroup(before);
    if (beforeMeasures.length) parts.push({ measures: beforeMeasures, repeat: 1 });

    const repeatMeasures = parseMeasureGroup(repeatMatch[1]);
    if (repeatMeasures.length) {
      parts.push({ measures: repeatMeasures, repeat: Number(repeatMatch[2]) });
    }

    rest = rest.slice(repeatMatch.index + repeatMatch[0].length).trim();
  }

  return parts.length ? parts : [{
    measures: parseMeasureGroup(trimmed),
    repeat: 1
  }];
}

function measureEndingNumbers(measure) {
  return String(measure?.ending || "")
    .split(/[,\s]+/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function measureHasEnding(measure, number) {
  return measureEndingNumbers(measure).includes(String(number));
}

function expandedPartMeasures(part) {
  if (!part?.measures?.length) return [];
  const repeat = Math.max(1, Number(part.repeat || 1));
  if (repeat <= 1) return part.measures;

  const hasFirstEnding = part.measures.some((measure) => measureHasEnding(measure, "1"));
  if (!hasFirstEnding) {
    return Array.from({ length: repeat }, () => part.measures).flat();
  }

  const commonMeasures = part.measures.filter((measure) => !measureHasEnding(measure, "1") && !measureHasEnding(measure, "2"));
  const firstEndingMeasures = part.measures.filter((measure) => measureHasEnding(measure, "1"));
  const secondEndingMeasures = part.measures.filter((measure) => measureHasEnding(measure, "2"));
  return [
    ...commonMeasures,
    ...firstEndingMeasures,
    ...Array.from({ length: repeat - 1 }, () => commonMeasures).flat(),
    ...secondEndingMeasures
  ];
}

function markRepeatPartMeasures(part) {
  if (!part?.measures?.length || Number(part.repeat || 1) <= 1) return part;
  const first = part.measures[0];
  const last = part.measures[part.measures.length - 1];
  if (first && typeof first === "object") first.repeatStart = true;
  if (last && typeof last === "object") {
    last.repeatEnd = true;
    last.repeatCount = Math.max(Number(last.repeatCount || 1), Number(part.repeat || 1));
  }
  return part;
}

function expandedMeasures(parts) {
  return parts.flatMap(expandedPartMeasures);
}

function visibleMeasureCount(parts) {
  return parts.reduce((total, part) => total + expandedPartMeasures(part).length, 0);
}

function normalizeImportText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9#/\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function importKeyAndScale(value) {
  const match = value.trim().match(/^([A-G](?:#|b)?)(?:\s+(.*))?$/i);
  if (!match) return false;
  const keyLabel = match[1].replace(/^([a-g])/, (letter) => letter.toUpperCase());
  const key = keyOptions.find((option) => option.label.toLowerCase() === keyLabel.toLowerCase())
    || keyOptions.find((option) => option.pitch === rootOptions.find((root) => root.label.toLowerCase() === keyLabel.toLowerCase())?.pitch);
  if (!key) return false;
  const scaleText = normalizeImportText(match[2] || "majeur");
  const scaleAliases = [
    ["major", "majeur"],
    ["naturalMinor", "mineur", "natuurlijk mineur", "minor", "natural minor"],
    ["harmonicMinor", "harmonisch mineur", "harmonic minor"],
    ["melodicMinor", "melodisch mineur", "melodic minor"],
    ["majorPentatonic", "majeur pentatonisch", "major pentatonic"],
    ["minorPentatonic", "mineur pentatonisch", "minor pentatonic"],
    ["blues", "blues"]
  ];
  const scaleId = scaleAliases.find((aliases) => aliases.slice(1).some((alias) => normalizeImportText(alias) === scaleText))?.[0]
    || "major";
  songState.key = key;
  songState.scale = scales.find((scale) => scale.id === scaleId) || scales[0];
  return true;
}

function importSectionInfo(title) {
  const numberMatch = normalizeImportText(title).match(/\b(\d+)\b/);
  const normalized = normalizeImportText(title)
    .replace(/\b(?:x[2-9]\d*|repeat|herhaal)\b/g, "")
    .replace(/^\d+\s+/, "")
    .replace(/\s+\d+$/, "")
    .replace(/\s+/g, " ")
    .trim();
  const aliases = [
    ["intro", "intro"],
    ["verse", "verse", "couplet"],
    ["preChorus", "pre chorus", "prechorus", "voorrefrein"],
    ["chorus", "chorus", "refrein"],
    ["bridge", "bridge", "brug"],
    ["solo", "solo"],
    ["break", "break"],
    ["outro", "outro"]
  ];
  const match = aliases.find((item) => item.slice(1).some((alias) => (
    normalized === alias || normalized.startsWith(`${alias} `) || normalized.endsWith(` ${alias}`)
  )));
  if (!match) return null;
  const template = defaultSongSections().find((section) => section.id === match[0]);
  return template ? { baseId: template.id, title: template.title, instance: numberMatch?.[1] || "" } : null;
}

function normalizeImportedChordToken(token) {
  return token
    .trim()
    .replace(/[()[\]{}]/g, "")
    .replace(/half[-\s]?dim(?:inished)?/i, "m7b5")
    .replace(/majoor/i, "")
    .replace(/mineur/i, "m")
    .replace(/Δ/i, "maj");
}

function chordTokensFromLine(line) {
  const bracketMatches = [...line.matchAll(/\[([^\]]+)\]/g)]
    .map((match) => normalizeImportedChordToken(match[1]))
    .filter((token) => parseChordToken(token));
  if (bracketMatches.length) return bracketMatches;

  const cleaned = line
    .replace(/[|:]/g, " ")
    .replace(/\b(?:x[2-9]\d*|repeat|herhaal)\b/gi, " ")
    .trim();
  if (!cleaned) return [];

  const words = cleaned.split(/\s+/).map(normalizeImportedChordToken).filter(Boolean);
  const chordWords = words.filter((word) => parseChordToken(word));
  if (!chordWords.length) return [];

  const chordLike = chordWords.length / words.length >= 0.55;
  return chordLike ? chordWords : [];
}

function importedChordLine(line) {
  const tokens = chordTokensFromLine(line);
  if (!tokens.length) return "";
  if (line.includes("|")) return line;
  return `| ${tokens.join(" | ")} |`;
}

function parseSongImportText(text) {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim());
  const imported = {
    key: null,
    meter: null,
    bpm: null,
    sections: []
  };
  let current = null;

  lines.forEach((line) => {
    if (!line) return;
    const meta = line.match(/^(toonsoort|toonladder|key|maatsoort|meter|bpm|tempo)\s*:\s*(.+)$/i);
    if (meta) {
      const label = normalizeImportText(meta[1]);
      const value = meta[2].trim();
      if (["toonsoort", "toonladder", "key"].includes(label)) imported.key = value;
      if (["maatsoort", "meter"].includes(label)) imported.meter = value;
      if (["bpm", "tempo"].includes(label)) imported.bpm = value;
      return;
    }
    const bracketHeading = line.match(/^\[([^\]]{1,40})\]$/);
    const heading = bracketHeading || line.match(/^(.{1,40}):$/);
    if (heading) {
      const info = importSectionInfo(heading[1]);
      if (!info) {
        current = null;
        return;
      }
      current = { ...info, lines: [] };
      imported.sections.push(current);
      return;
    }
    if (current) {
      const chordLine = importedChordLine(line);
      if (chordLine) current.lines.push(chordLine);
    }
  });

  return imported;
}

function applyImportedSong(imported) {
  stopSongPlayback();
  let changes = 0;

  if (imported.key && importKeyAndScale(imported.key)) changes += 1;
  if (imported.meter && [...songMeterSelect.options].some((option) => option.value === imported.meter)) {
    songState.meter = imported.meter;
    changes += 1;
  }
  if (imported.bpm) {
    const bpm = Number(imported.bpm.match(/\d+/)?.[0]);
    if (bpm) {
      songState.bpm = Math.min(220, Math.max(40, bpm));
      changes += 1;
    }
  }

  if (imported.sections.length) {
    const baseSections = defaultSongSections();
    const sections = baseSections.map((section) => ({ ...section, chords: "" }));
    const order = [];
    const counts = {};
    const totals = imported.sections.reduce((items, section) => {
      items[section.baseId] = (items[section.baseId] || 0) + 1;
      return items;
    }, {});

    imported.sections.forEach((section) => {
      counts[section.baseId] = (counts[section.baseId] || 0) + 1;
      const firstUse = counts[section.baseId] === 1;
      const id = firstUse ? section.baseId : `${section.baseId}Import${counts[section.baseId]}`;
      const title = totals[section.baseId] > 1 ? `${section.title} ${counts[section.baseId]}` : section.title;
      const target = firstUse
        ? sections.find((item) => item.id === section.baseId)
        : { id, title, chords: "" };
      target.chords = section.lines.join("\n").trim();
      target.key = section.key || keyPartsFromSongJsonLabel(imported.key || "").keyLabel || songState.key.label;
      target.meter = section.meter || songState.meter;
      target.importedParts = section.parts?.length ? section.parts : (section.measures?.length ? [{ measures: section.measures, repeat: 1 }] : null);
      if (!firstUse) sections.push(target);
      order.push(target.id);
    });

    songState.sections = sections;
    songState.order = order;
    changes += imported.sections.length;
  }

  renderSong();
  songImportStatus.textContent = changes
    ? "Liedje geimporteerd."
    : "Geen herkenbare liedgegevens gevonden.";
}

function applySongImport() {
  applyImportedSong(parseSongImportText(songImportText.value));
}

function musicXmlText(node, selector) {
  return node.querySelector(selector)?.textContent?.trim() || "";
}

function musicXmlChordSymbol(harmony) {
  const rootStep = musicXmlText(harmony, "root > root-step");
  const kindText = harmony.querySelector("kind")?.getAttribute("text")?.trim() || "";
  const kindValue = musicXmlText(harmony, "kind").toLowerCase();
  if (/^(?:N\.?C\.?|no\s+chord)$/i.test(kindText) || kindValue === "none") return "N.C.";
  if (!rootStep) return "";
  const rootAlter = Number(musicXmlText(harmony, "root > root-alter") || 0);
  const bassStep = musicXmlText(harmony, "bass > bass-step");
  const bassAlter = Number(musicXmlText(harmony, "bass > bass-alter") || 0);
  const kind = kindValue;
  const degreeValues = [...harmony.querySelectorAll("degree")]
    .map((degree) => ({
      value: musicXmlText(degree, "degree-value"),
      alter: musicXmlText(degree, "degree-alter"),
      type: musicXmlText(degree, "degree-type")
    }));
  const root = `${rootStep}${rootAlter > 0 ? "#" : rootAlter < 0 ? "b" : ""}`;
  const kindMap = [
    [/major-ninth|maj9|major ninth/, "maj9"],
    [/minor-ninth|min9|minor ninth/, "m9"],
    [/dominant-ninth|dominant ninth/, "9"],
    [/major-seventh|maj7|major seventh/, "maj7"],
    [/minor-seventh|min7|minor seventh/, "m7"],
    [/dominant|dominant-seventh/, "7"],
    [/half-diminished/, "m7b5"],
    [/diminished-seventh/, "dim7"],
    [/diminished/, "dim"],
    [/augmented/, "aug"],
    [/suspended-fourth|sus4/, "sus4"],
    [/suspended-second|sus2/, "sus2"],
    [/minor-sixth/, "m6"],
    [/major-sixth/, "6"],
    [/minor|min/, "m"],
    [/major|none/, ""]
  ];
  let suffix = kindMap.find(([pattern]) => pattern.test(kind))?.[1] ?? "";
  degreeValues.forEach((degree) => {
    if (degree.type === "add" && degree.value === "9") suffix = suffix || "add9";
    if (degree.type === "alter" && degree.value === "5" && degree.alter === "-1" && suffix === "m7") suffix = "m7b5";
  });
  const bass = bassStep ? `${bassStep}${bassAlter > 0 ? "#" : bassAlter < 0 ? "b" : ""}` : "";
  return `${root}${suffix}${bass ? `/${bass}` : ""}`;
}

function musicXmlSectionFromMeasure(measures) {
  const measureList = Array.isArray(measures) ? measures : [measures];
  const textNames = new Set(["words", "rehearsal", "credit-words"]);
  const attributeNames = new Set(["bookmark"]);
  const candidates = [];
  const collectCandidates = (node) => {
    if (!node || node.nodeType !== 1) return;
    const name = (node.localName || node.tagName || "").toLowerCase();
    if (textNames.has(name)) candidates.push(node.textContent.trim());
    if (attributeNames.has(name)) {
      const label = node.getAttribute("name") || node.getAttribute("id") || "";
      if (label) candidates.push(label.trim());
    }
    [...node.children].forEach(collectCandidates);
  };
  measureList.forEach((measure) => {
    collectCandidates(measure);
  });
  const match = candidates.find((value) => importSectionInfo(value));
  return match ? importSectionInfo(match) : null;
}

function sameImportSection(a, b) {
  return Boolean(a && b && a.baseId === b.baseId && (a.instance || "") === (b.instance || ""));
}

function musicXmlRepeatStart(measures) {
  const measureList = Array.isArray(measures) ? measures : [measures];
  return Boolean(measureList.flatMap((measure) => [...measure.querySelectorAll("barline repeat")])
    .some((repeat) => repeat.getAttribute("direction") === "forward"));
}

function musicXmlRepeatEndCount(measures) {
  const measureList = Array.isArray(measures) ? measures : [measures];
  const backward = measureList.flatMap((measure) => [...measure.querySelectorAll("barline repeat")])
    .find((repeat) => repeat.getAttribute("direction") === "backward");
  if (!backward) return 1;
  const count = Number(backward.getAttribute("times") || 2);
  return Number.isFinite(count) && count > 1 ? Math.round(count) : 2;
}

function musicXmlEndingNumber(measures) {
  const measureList = Array.isArray(measures) ? measures : [measures];
  const numbers = measureList
    .flatMap((measure) => [...measure.querySelectorAll("barline ending")])
    .flatMap((ending) => String(ending.getAttribute("number") || "")
      .split(/[,\s]+/)
      .map((value) => value.trim())
      .filter(Boolean));
  return [...new Set(numbers)].join(",");
}

function musicXmlNavigationMarkers(measures) {
  const measureList = Array.isArray(measures) ? measures : [measures];
  const markers = new Set();
  measureList.forEach((measure) => {
    if (measure.querySelector("segno")) markers.add("segno");
    if (measure.querySelector("coda")) markers.add("coda");
    const words = [...measure.querySelectorAll("words")]
      .map((item) => item.textContent.trim())
      .join(" ")
      .toLowerCase();
    if (/to\s+coda/.test(words)) markers.add("toCoda");
    if (/d\.?\s*s\.?\s*al\s+coda/.test(words)) markers.add("dsAlCoda");
  });
  return [...markers];
}

function musicXmlKeyFromFifths(fifths) {
  const majorKeys = {
    "-7": "Cb", "-6": "Gb", "-5": "Db", "-4": "Ab", "-3": "Eb", "-2": "Bb", "-1": "F",
    0: "C", 1: "G", 2: "D", 3: "A", 4: "E", 5: "B", 6: "F#", 7: "C#"
  };
  return majorKeys[String(fifths)] || "C";
}

function musicXmlRootLabelForPitch(pitch, keyLabel) {
  const scale = majorScaleForKeyLabel(keyLabel);
  const scaleNote = scale.notes.find((note) => note.pitch === pitch);
  if (scaleNote) return scaleNote.label;
  return rootOptions.find((root) => root.pitch === pitch && root.accidental === "natural")?.label
    || contextualChromaticRootLabel(pitch, keyLabel);
}

function musicXmlInferChordFromNotes(notesInput, keyLabel) {
  const notes = normalizeVoicingNotes(notesInput || []);
  if (notes.length < 2) return "";
  const bass = notes[0];
  const pitchCounts = notes.reduce((counts, note) => {
    counts.set(note.pitch, (counts.get(note.pitch) || 0) + 1);
    return counts;
  }, new Map());
  const pitchSet = new Set(pitchCounts.keys());
  const scale = majorScaleForKeyLabel(keyLabel);
  const diatonicTriads = degreeTriads(scale.notes);
  const candidateQualities = ["maj", "min", "dim", "sus2", "sus4", "7", "min7", "maj7", "9", "min9", "maj9"]
    .map((id) => qualities.find((quality) => quality.id === id))
    .filter(Boolean);
  const rootPitches = [...new Set([
    bass.pitch,
    ...diatonicTriads.map((triad) => triad.rootPitch),
    ...pitchSet
  ])];
  const candidates = rootPitches.flatMap((rootPitch) => {
    const rootLabel = musicXmlRootLabelForPitch(rootPitch, keyLabel);
    return candidateQualities.map((quality) => {
      const chordPitchSet = new Set(quality.intervals.map((interval) => mod(rootPitch + interval, 12)));
      const matched = [...pitchSet].filter((pitch) => chordPitchSet.has(pitch)).length;
      const extra = [...pitchSet].filter((pitch) => !chordPitchSet.has(pitch)).length;
      const chordHasBass = chordPitchSet.has(bass.pitch);
      const rootPresent = pitchSet.has(rootPitch);
      const fifthPresent = pitchSet.has(mod(rootPitch + 7, 12));
      const scaleTriad = diatonicTriads.find((triad) => triad.rootPitch === rootPitch);
      let score = 0;
      score += extra * 12;
      score += (pitchSet.size - matched) * 8;
      score += bass.pitch === rootPitch ? -10 : 7;
      score += rootPresent ? -4 : 5;
      score += chordHasBass ? -2 : 4;
      score += scaleTriad?.qualityId === quality.id ? -5 : 2;
      score += ["maj", "min", "dim"].includes(quality.id) ? 0 : 3;
      if (pitchSet.size <= 2 && bass.pitch === rootPitch && fifthPresent && quality.id === "maj") score -= 6;
      return {
        token: `${rootLabel}${quality.symbol}`,
        score,
        matched
      };
    });
  }).filter((candidate) => candidate.matched >= Math.min(2, pitchSet.size));
  candidates.sort((a, b) => a.score - b.score);
  return candidates[0]?.token || "";
}

function musicXmlInferChordFromNoteGroups(groups, keyLabel) {
  return musicXmlInferChordFromNotes(groups.flatMap((group) => group.all || []), keyLabel);
}

function musicXmlMeasureDurationFromGroups(groups) {
  const ends = groups.flatMap((group) => (group.all || [])
    .map((note) => note.end)
    .filter((end) => Number.isFinite(end)));
  return Math.max(...ends, 0);
}

function musicXmlQuarterBeatsFromMeter(meter) {
  const [beats, beatType] = String(meter || "4/4").split("/").map(Number);
  if (!Number.isFinite(beats) || !Number.isFinite(beatType) || !beatType) return 4;
  return beats * (4 / beatType);
}

function musicXmlMeasureDurationFromDivisions(meter, divisions) {
  const unit = Number(divisions);
  if (!Number.isFinite(unit) || unit <= 0) return 0;
  return musicXmlQuarterBeatsFromMeter(meter) * unit;
}

function musicXmlFallbackChordEntries(groups, keyLabel, meter) {
  if (!groups.length) return [];
  const measureBeats = musicXmlQuarterBeatsFromMeter(meter);
  const fullMeasureToken = musicXmlInferChordFromNoteGroups(groups, keyLabel);
  return fullMeasureToken ? [{ token: fullMeasureToken, startBeat: 1, beats: measureBeats, timingUnit: "quarter" }] : [];
}

function musicXmlPitch(note) {
  const step = musicXmlText(note, "pitch > step");
  const octave = Number(musicXmlText(note, "pitch > octave"));
  if (!step || !Number.isFinite(octave)) return null;
  const alter = Number(musicXmlText(note, "pitch > alter") || 0);
  const pitch = mod(naturalPitch[step] + alter, 12);
  const midi = (octave + 1) * 12 + pitch;
  return {
    pitch,
    absolute: midi - 60,
    label: spellPitchForLetter(pitch, step)
  };
}

function musicXmlMeasureNoteGroups(measure, partIndex = 0) {
  let position = 0;
  let lastNotePosition = 0;
  const events = [];
  [...measure.children].forEach((node) => {
    if (node.tagName === "backup") {
      position -= Number(musicXmlText(node, "duration") || 0);
      return;
    }
    if (node.tagName === "forward") {
      position += Number(musicXmlText(node, "duration") || 0);
      return;
    }
    if (node.tagName !== "note") return;
    const duration = Number(musicXmlText(node, "duration") || 0);
    const isChordTone = Boolean(node.querySelector("chord"));
    const notePosition = isChordTone ? lastNotePosition : position;
    const pitch = musicXmlPitch(node);
    if (pitch && !node.querySelector("rest")) {
      const staff = musicXmlText(node, "staff") || (partIndex === 0 ? "1" : "2");
      events.push({
        ...pitch,
        staff,
        start: notePosition,
        end: notePosition + Math.max(duration, 1)
      });
    }
    if (!isChordTone) {
      lastNotePosition = notePosition;
      position += duration;
    }
  });
  const groups = new Map();
  [...new Set(events.map((event) => event.start))].sort((a, b) => a - b).forEach((time) => {
    const activeEvents = events.filter((event) => event.start <= time && event.end > time);
    activeEvents.forEach((event) => {
      const key = String(time);
      const group = groups.get(key) || { time, right: [], left: [], all: [] };
      const note = {
        pitch: event.pitch,
        absolute: event.absolute,
        label: event.label,
        start: event.start,
        end: event.end
      };
      const target = event.staff === "2" ? group.left : group.right;
      target.push(note);
      group.all.push(note);
      groups.set(key, group);
    });
  });
  return [...groups.values()].filter((group) => group.all.length).sort((a, b) => a.time - b.time);
}

function musicXmlCombinedMeasureGroups(parts, measureIndex) {
  const combined = new Map();
  parts.forEach((part, partIndex) => {
    const measure = part.measures[measureIndex];
    if (!measure) return;
    musicXmlMeasureNoteGroups(measure, partIndex).forEach((group) => {
      const key = String(group.time);
      const target = combined.get(key) || { time: group.time, right: [], left: [], all: [] };
      target.right.push(...group.right);
      target.left.push(...group.left);
      target.all.push(...group.all);
      combined.set(key, target);
    });
  });
  return [...combined.values()].filter((group) => group.all.length).sort((a, b) => a.time - b.time);
}

function musicXmlHarmonyEvents(measure) {
  let position = 0;
  let lastNotePosition = 0;
  const events = [];
  [...measure.children].forEach((node) => {
    if (node.tagName === "backup") {
      position -= Number(musicXmlText(node, "duration") || 0);
      return;
    }
    if (node.tagName === "forward") {
      position += Number(musicXmlText(node, "duration") || 0);
      return;
    }
    if (node.tagName === "harmony") {
      const token = musicXmlChordSymbol(node);
      const offset = Number(musicXmlText(node, "offset") || 0);
      if (token) events.push({ token, time: Math.max(0, position + offset) });
      return;
    }
    if (node.tagName !== "note") return;
    const duration = Number(musicXmlText(node, "duration") || 0);
    const isChordTone = Boolean(node.querySelector("chord"));
    const notePosition = isChordTone ? lastNotePosition : position;
    if (!isChordTone) {
      lastNotePosition = notePosition;
      position += duration;
    }
  });
  return events;
}

function musicXmlHarmonyEventsFromMeasures(measures) {
  const measureList = Array.isArray(measures) ? measures : [measures];
  const events = measureList
    .flatMap((measure) => musicXmlHarmonyEvents(measure))
    .sort((a, b) => a.time - b.time);
  return events.filter((event, index) => (
    index === 0 || event.time !== events[index - 1].time || event.token !== events[index - 1].token
  ));
}

function musicXmlHarmonyEntriesFromEvents(events, groups, meter, lastToken = "", divisions = 0) {
  const measureBeats = musicXmlQuarterBeatsFromMeter(meter);
  const noteDuration = musicXmlMeasureDurationFromGroups(groups);
  const divisionDuration = musicXmlMeasureDurationFromDivisions(meter, divisions);
  const measureDuration = Math.max(noteDuration, divisionDuration, ...events.map((event) => event.time), 0);
  const durationToBeats = (duration) => (
    measureDuration > 0 ? (duration / measureDuration) * measureBeats : measureBeats
  );
  const timeToBeat = (time) => (
    measureDuration > 0 ? (time / measureDuration) * measureBeats + 1 : 1
  );
  const entries = events
    .filter((event) => event.token)
    .map((event, index) => {
      const nextTime = events[index + 1]?.time ?? measureDuration;
      return {
        token: event.token,
        startBeat: timeToBeat(event.time),
        beats: Math.max(0.25, durationToBeats(Math.max(0, nextTime - event.time))),
        timingUnit: "quarter"
      };
    });
  if (lastToken && entries.length && entries[0].startBeat > 1.01 && entries[0].token !== lastToken) {
    entries.unshift({
      token: lastToken,
      startBeat: 1,
      beats: Math.max(0.25, entries[0].startBeat - 1),
      timingUnit: "quarter"
    });
  }
  if (!entries.length && lastToken) {
    entries.push({ token: lastToken, startBeat: 1, beats: measureBeats, timingUnit: "quarter" });
  }
  return entries;
}

function musicXmlMeterFromMeasures(measures) {
  const measureList = Array.isArray(measures) ? measures : [measures];
  const measure = measureList.find((item) => musicXmlText(item, "attributes > time > beats") && musicXmlText(item, "attributes > time > beat-type"));
  if (!measure) return "";
  return `${musicXmlText(measure, "attributes > time > beats")}/${musicXmlText(measure, "attributes > time > beat-type")}`;
}

function musicXmlDivisionsFromMeasures(measures) {
  const measureList = Array.isArray(measures) ? measures : [measures];
  const value = measureList
    .map((measure) => musicXmlText(measure, "attributes > divisions"))
    .find((item) => item !== "");
  return value === undefined ? null : Number(value);
}

function chordTonePitchSet(parsed) {
  return new Set(parsed.quality.intervals.map((interval) => mod(parsed.root.pitch + interval, 12)));
}

function musicXmlChordToneNotes(notes, parsed) {
  const pitchSet = chordTonePitchSet(parsed);
  const byPitch = new Map();
  normalizeVoicingNotes(notes)
    .filter((note) => pitchSet.has(note.pitch))
    .forEach((note) => {
      if (!byPitch.has(note.pitch)) byPitch.set(note.pitch, note);
    });
  const chordLabels = chordNotes(parsed.root, parsed.quality);
  return [...byPitch.values()].map((note) => ({
    ...note,
    label: chordLabels.find((chordNote) => chordNote.pitch === note.pitch)?.label || note.label
  }));
}

function musicXmlInversionFromNotes(notes, parsed) {
  if (!notes.length) return 0;
  const normalized = normalizeVoicingNotes(notes);
  const lowestPitch = normalized[0].pitch;
  const intervalPitches = parsed.quality.intervals.map((interval) => mod(parsed.root.pitch + interval, 12));
  const hasFifth = normalized.some((note) => note.pitch === intervalPitches[2]);
  if (parsed.quality.intervals.length >= 4 && !hasFifth && lowestPitch === intervalPitches[3]) {
    return 2;
  }
  const inversion = parsed.quality.intervals.findIndex((interval) => mod(parsed.root.pitch + interval, 12) === lowestPitch);
  return Math.max(0, inversion);
}

function musicXmlAnalysisInversion(bestNotes, allNotes, parsed) {
  const expectedToneCount = parsed.quality.intervals.length;
  const bestComplete = bestNotes.length >= expectedToneCount;
  const allComplete = allNotes.length >= expectedToneCount;
  const bestHasRoot = bestNotes.some((note) => note.pitch === parsed.root.pitch);
  const allAddsMissingRoot = !bestHasRoot && allNotes.length > bestNotes.length && allNotes.some((note) => note.pitch === parsed.root.pitch);
  if (!bestComplete && allComplete && allAddsMissingRoot) {
    return musicXmlInversionFromNotes(allNotes, parsed);
  }
  return musicXmlInversionFromNotes(bestNotes, parsed);
}

function musicXmlBestHandVoicing(group, parsed) {
  const right = musicXmlChordToneNotes(group.right, parsed);
  const left = musicXmlChordToneNotes(group.left, parsed);
  const all = musicXmlChordToneNotes(group.all, parsed);
  const rootInLeft = left.some((note) => note.pitch === parsed.root.pitch);
  const candidates = [
    { hand: "rechts", notes: right, score: right.length >= 2 ? 0 : 12 - right.length * 2 },
    { hand: "links", notes: left, score: left.length >= 2 ? 1 : 13 - left.length * 2 },
    { hand: "samen", notes: all, score: all.length >= 2 ? 3 : 16 - all.length * 2 }
  ].filter((candidate) => candidate.notes.length >= 2);
  if (rootInLeft && right.length >= 2) candidates[0].score -= 2;
  candidates.sort((a, b) => a.score - b.score || b.notes.length - a.notes.length);
  const best = candidates[0];
  if (!best) return null;
  const notes = normalizeVoicingNotes(best.notes);
  const combinedNotes = normalizeVoicingNotes(all);
  return {
    notes,
    inversion: musicXmlAnalysisInversion(notes, combinedNotes, parsed),
    chordToneCount: combinedNotes.length,
    rightToneCount: right.length,
    leftToneCount: left.length,
    hand: best.hand,
    bass: normalizeVoicingNotes(left)[0]?.label || ""
  };
}

function musicXmlVoicingForChord(groups, chordIndex, token) {
  const parsed = parseChordToken(token);
  if (!parsed || parsed.noChord || !groups.length) return null;
  const ordered = groups.map((group, index) => ({ group, index }));
  const preferred = ordered[Math.min(chordIndex, ordered.length - 1)] || ordered[0];
  const candidates = [preferred, ...ordered.filter((item) => item !== preferred)]
    .map((item) => {
      const voicing = musicXmlBestHandVoicing(item.group, parsed);
      if (!voicing) return null;
      const completeEnough = voicing.chordToneCount >= Math.min(3, parsed.quality.intervals.length);
      return {
        ...voicing,
        score: (completeEnough ? 0 : 20)
          + (voicing.rightToneCount >= 2 ? -3 : 0)
          + (item.index === preferred.index ? 0 : 2 + Math.abs(item.index - preferred.index))
      };
    })
    .filter(Boolean);
  candidates.sort((a, b) => a.score - b.score);
  return candidates[0] || null;
}

function importedLineFromMeasureEntries(measureEntries) {
  const tokens = measureEntries.map((entry) => entry.token).filter(Boolean);
  return tokens.length ? `| ${tokens.join(" ")} |` : "| |";
}

function serializableImportedMeasure(measure) {
  if (!Array.isArray(measure)) return measure;
  const meta = {};
  if (measure.key) meta.key = measure.key;
  if (measure.meter) meta.meter = measure.meter;
  if (measure.ending) meta.ending = measure.ending;
  if (Array.isArray(measure.nav) && measure.nav.length) meta.nav = [...measure.nav];
  if (measure.repeatStart) meta.repeatStart = true;
  if (measure.repeatEnd) meta.repeatEnd = true;
  if (measure.repeatCount && measure.repeatCount > 1) meta.repeatCount = measure.repeatCount;
  return Object.keys(meta).length ? { ...meta, chords: [...measure] } : [...measure];
}

function musicXmlFallbackSectionsFromStructure(section) {
  const templates = defaultSongSections();
  const sequence = ["intro", "verse", "chorus", "bridge", "outro", "chorus", "outro"];
  const parts = section.parts.filter((part) => part.measures.length);
  return parts.map((part, index) => {
    const baseId = sequence[Math.min(index, sequence.length - 1)];
    const template = templates.find((item) => item.id === baseId) || templates[0];
    return {
      baseId: template.id,
      title: template.title,
      meter: section.meter || "4/4",
      lines: part.measures.map(importedLineFromMeasureEntries),
      measures: part.measures,
      parts: [part]
    };
  });
}

function parseMusicXml(text) {
  const doc = new DOMParser().parseFromString(text, "application/xml");
  if (doc.querySelector("parsererror")) throw new Error("MusicXML kon niet worden gelezen.");
  const xmlParts = [...doc.querySelectorAll("part")].map((part) => ({ part, measures: [...part.querySelectorAll("measure")] }));
  const measures = xmlParts[0]?.measures || [];
  const imported = { key: null, meter: null, bpm: null, sections: [] };
  const firstAttributes = doc.querySelector("attributes");
  const fifths = musicXmlText(firstAttributes || doc, "key > fifths");
  if (fifths !== "") imported.key = `${musicXmlKeyFromFifths(Number(fifths))} majeur`;
  const beats = musicXmlText(firstAttributes || doc, "time > beats");
  const beatType = musicXmlText(firstAttributes || doc, "time > beat-type");
  if (beats && beatType) imported.meter = `${beats}/${beatType}`;
  const hasExplicitHarmony = Boolean(doc.querySelector("harmony"));

  let currentMeter = imported.meter || "4/4";
  let currentDivisions = Number(musicXmlText(firstAttributes || doc, "divisions") || 0);
  let currentKeyLabel = keyPartsFromSongJsonLabel(imported.key || "C majeur").keyLabel;
  let currentInfo = importSectionInfo("Intro");
  let currentSection = { ...currentInfo, key: currentKeyLabel, meter: currentMeter, lines: [], measures: [], parts: [{ measures: [], repeat: 1 }] };
  let lastChord = "";
  imported.sections.push(currentSection);
  let repeatBuffer = null;
  let explicitSectionCount = 0;

  const pushMeasureToCurrentSection = (measureEntries) => {
    if (repeatBuffer) {
      repeatBuffer.measures.push(measureEntries);
      return;
    }
    currentSection.parts.at(-1).measures.push(measureEntries);
  };

  const currentSectionHasContent = () => currentSection.parts.some((part) => part.measures.length);

  measures.forEach((measure, measureIndex) => {
    const measureStack = xmlParts.map((part) => part.measures[measureIndex]).filter(Boolean);
    const changedMeter = musicXmlMeterFromMeasures(measureStack);
    if (changedMeter) currentMeter = changedMeter;
    const changedDivisions = musicXmlDivisionsFromMeasures(measureStack);
    if (Number.isFinite(changedDivisions) && changedDivisions > 0) currentDivisions = changedDivisions;
    const changedFifths = measureStack
      .map((item) => musicXmlText(item, "attributes > key > fifths"))
      .find((value) => value !== "");
    if (changedFifths !== undefined) currentKeyLabel = musicXmlKeyFromFifths(Number(changedFifths));
    const sectionInfo = musicXmlSectionFromMeasure(measureStack);
    if (sectionInfo && (!sameImportSection(sectionInfo, currentInfo) || currentSectionHasContent())) {
      explicitSectionCount += 1;
      if (repeatBuffer) {
        currentSection.parts.push(repeatBuffer);
        repeatBuffer = null;
      }
      currentInfo = sectionInfo;
      currentSection = { ...sectionInfo, key: currentKeyLabel, meter: currentMeter, lines: [], measures: [], parts: [{ measures: [], repeat: 1 }] };
      imported.sections.push(currentSection);
    }
    if (musicXmlRepeatStart(measureStack) && !repeatBuffer) {
      repeatBuffer = { measures: [], repeat: 1 };
    }
    const noteGroups = musicXmlCombinedMeasureGroups(xmlParts, measureIndex);
    const harmonyEvents = musicXmlHarmonyEventsFromMeasures(measureStack);
    const inferredEntries = harmonyEvents.length || hasExplicitHarmony
      ? []
      : musicXmlFallbackChordEntries(noteGroups, currentKeyLabel, currentMeter);
    const harmonyEntries = musicXmlHarmonyEntriesFromEvents(harmonyEvents, noteGroups, currentMeter, lastChord, currentDivisions);
    let measureEntries = [];
    if (harmonyEvents.length || hasExplicitHarmony) {
      if (harmonyEntries.length) lastChord = harmonyEntries.at(-1).token;
      measureEntries = harmonyEntries.map((entry, chordIndex) => {
        const voicing = musicXmlVoicingForChord(noteGroups, chordIndex, entry.token);
        return {
          ...entry,
          meter: currentMeter,
          voicingNotes: voicing?.notes || null,
          xmlInversion: voicing?.inversion ?? null,
          xmlHand: voicing?.hand || "",
          xmlBass: voicing?.bass || ""
        };
      });
    } else {
      if (inferredEntries.length) lastChord = inferredEntries.at(-1).token;
      const entries = inferredEntries.length ? inferredEntries : (lastChord ? [{ token: lastChord, startBeat: 1, beats: musicXmlQuarterBeatsFromMeter(currentMeter), timingUnit: "quarter" }] : []);
      measureEntries = entries.map((entry, chordIndex) => {
        const voicing = musicXmlVoicingForChord(noteGroups, chordIndex, entry.token);
        return {
          ...entry,
          meter: currentMeter,
          voicingNotes: voicing?.notes || null,
          xmlInversion: voicing?.inversion ?? null,
          xmlHand: voicing?.hand || "",
          xmlBass: voicing?.bass || ""
        };
      });
    }
    const endingNumber = musicXmlEndingNumber(measureStack);
    const navMarkers = musicXmlNavigationMarkers(measureStack);
    const hasRepeatStart = musicXmlRepeatStart(measureStack);
    const repeatCount = musicXmlRepeatEndCount(measureStack);
    if (changedMeter) measureEntries.meter = currentMeter;
    if (currentKeyLabel) measureEntries.key = currentKeyLabel;
    if (endingNumber) measureEntries.ending = endingNumber;
    if (navMarkers.length) measureEntries.nav = navMarkers;
    if (hasRepeatStart) measureEntries.repeatStart = true;
    if (repeatCount > 1) {
      measureEntries.repeatEnd = true;
      measureEntries.repeatCount = repeatCount;
    }
    currentSection.lines.push(importedLineFromMeasureEntries(measureEntries));
    pushMeasureToCurrentSection(measureEntries);
    if (repeatBuffer && repeatCount > 1) {
      repeatBuffer.repeat = repeatCount;
      currentSection.parts.push(repeatBuffer);
      repeatBuffer = null;
      currentSection.parts.push({ measures: [], repeat: 1 });
    }
  });
  if (repeatBuffer) currentSection.parts.push(repeatBuffer);
  imported.sections.forEach((section) => {
    section.parts = section.parts.filter((part) => part.measures.length);
    section.parts.forEach(markRepeatPartMeasures);
    section.measures = section.parts.flatMap((part) => part.measures);
  });
  if (explicitSectionCount === 0 && imported.sections.length === 1) {
    imported.sections = musicXmlFallbackSectionsFromStructure(imported.sections[0]);
  }

  imported.sections.forEach((section) => {
    section.measures = (section.measures || []).map(serializableImportedMeasure);
  });

  imported.sections = imported.sections.filter((section) => section.lines.some((line) => line.replace(/[|\s]/g, "")));
  return imported;
}

function applyMusicXmlImport(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      applyImportedSong(parseMusicXml(String(reader.result || "")));
      songImportStatus.textContent = `${file.name} geimporteerd.`;
    } catch (error) {
      songImportStatus.textContent = error.message || "MusicXML kon niet worden geimporteerd.";
    }
  });
  reader.readAsText(file);
}

function notationDurationForLength(chordLength) {
  const options = [
    { value: 4, duration: "w", dots: 0 },
    { value: 3, duration: "h", dots: 1 },
    { value: 2, duration: "h", dots: 0 },
    { value: 1.5, duration: "q", dots: 1 },
    { value: 1, duration: "q", dots: 0 },
    { value: 0.75, duration: "8", dots: 1 },
    { value: 0.5, duration: "8", dots: 0 },
    { value: 0.25, duration: "16", dots: 0 }
  ];
  return options.reduce((best, option) => (
    Math.abs(option.value - chordLength) < Math.abs(best.value - chordLength) ? option : best
  ), options[0]);
}

function notationDurationForMeasure(chordsInMeasure) {
  return notationDurationForLength(meterDetails().quarterBeats / Math.max(chordsInMeasure, 1));
}

function chordCardHtml(entry, previousNotes, scaleSet, playId, measure, chordIndex = 0) {
  const token = chordEntryToken(entry);
  const parsed = parseChordToken(token);
  if (!parsed) {
    return {
      notes: previousNotes,
      html: `
        <div class="song-chord-card unknown">
          <strong>${formatMusicText(token)}</strong>
          <span>niet herkend</span>
        </div>
      `
    };
  }
  if (parsed.noChord) {
    return {
      notes: previousNotes,
      html: `
        <div class="song-chord-card no-chord">
          <strong>${formatMusicText(parsed.symbol)}</strong>
        </div>
      `
    };
  }

  const importedInversion = typeof entry === "object" && entry !== null && entry.xmlInversion != null
    ? entry.xmlInversion
    : null;
  const voicing = importedInversion != null
    ? {
      ...bestVoicing(parsed, previousNotes, 7, importedInversion),
      source: "xml",
      hand: entry.xmlHand || "",
      bass: entry.xmlBass || ""
    }
    : songVoicing(parsed, previousNotes);
  const playbackNotes = notesWithBass(parsed, voicing.notes);
  const outside = playbackNotes.some((note) => !scaleSet.has(note.pitch));
  const notationDuration = notationDurationForLength(chordQuarterLength(entry, measure));
  return {
    notes: voicing.notes,
    html: `
      <button class="song-chord-card ${outside ? "" : "fits-scale"} ${parsed.bass ? "has-bass-note" : ""}" type="button" data-play-id="${playId}" data-token="${escapeHtml(token)}" data-notes="${playbackNotes.map((note) => note.absolute).join(",")}">
        <strong>${formatMusicText(parsed.symbol)}</strong>
        ${miniKeyboardHtml(playbackNotes)}
        <span class="song-notation" data-notes="${playbackNotes.map((note) => note.absolute).join(",")}" data-labels="${playbackNotes.map((note) => note.label).join(",")}" data-duration="${notationDuration.duration}" data-dots="${notationDuration.dots}" data-measure-start="${chordIndex === 0 ? "true" : "false"}"></span>
      </button>
    `
  };
}

function songBeatCount() {
  return Number(songState.meter.split("/")[0]) || 4;
}

function songSectionById(sectionId) {
  return songState.sections.find((section) => section.id === sectionId);
}

function orderedSongSections() {
  return songState.order
    .map((sectionId) => songSectionById(sectionId))
    .filter(Boolean);
}

function orderedSongEntries() {
  const totals = songState.order.reduce((counts, sectionId) => {
    counts[sectionId] = (counts[sectionId] || 0) + 1;
    return counts;
  }, {});
  const seen = {};
  return songState.order
    .map((sectionId) => {
      const section = songSectionById(sectionId);
      if (!section) return null;
      seen[sectionId] = (seen[sectionId] || 0) + 1;
      return {
        section,
        title: totals[sectionId] > 1 ? `${section.title} ${seen[sectionId]}` : section.title
      };
    })
    .filter(Boolean);
}

function buildSongPlayback() {
  const beatDuration = 60 / songState.bpm;
  const events = [];
  let currentTime = 0;
  let previousNotes = null;

  orderedSongEntries().forEach(({ section }) => {
    expandedMeasures(section.importedParts || parseMeasures(section.chords)).forEach((measure) => {
      measureEntriesFromMeasure(measure).forEach((entry, chordIndex) => {
        const token = chordEntryToken(entry);
        const chordDuration = beatDuration * chordBeatCount(entry, measure);
        const parsed = parseChordToken(token);
        if (parsed && !parsed.noChord) {
          const voicing = songVoicing(parsed, previousNotes);
          previousNotes = voicing.notes;
          events.push({
            notes: notesWithBass(parsed, voicing.notes),
            time: currentTime,
            duration: chordDuration,
            cardIndex: events.length
          });
        }
        currentTime += chordDuration;
      });
    });
  });

  return events;
}

function clearSongActiveCards() {
  document.querySelectorAll(".song-chord-card.playing").forEach((card) => {
    card.classList.remove("playing");
  });
}

function stopSongPlayback() {
  songTimeouts.forEach((timeout) => window.clearTimeout(timeout));
  songTimeouts = [];
  resetAudioContext();
  isSongPlaying = false;
  songPlayButton.classList.remove("playing");
  songPlayButton.innerHTML = `<span aria-hidden="true"></span>Speel liedje`;
  clearSongActiveCards();
  document.querySelectorAll(".song-chord-card.played").forEach((card) => card.classList.remove("played"));
}

function startSongPlayback() {
  stopSongPlayback();
  const events = buildSongPlayback();
  if (!events.length) return;
  const context = getAudioContext();
  const startAt = context.currentTime + 0.08;
  isSongPlaying = true;
  songPlayButton.classList.add("playing");
  songPlayButton.textContent = "Stop";

  events.forEach((event) => {
    playNotesAt(event.notes, startAt + event.time, Math.min(1.35, event.duration * 0.9));
    songTimeouts.push(window.setTimeout(() => {
      clearSongActiveCards();
      const card = document.querySelectorAll(".song-chord-card[data-notes]")[event.cardIndex];
      if (card) {
        card.classList.add("playing", "played");
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }, event.time * 1000));
  });

  const totalDuration = events[events.length - 1].time + events[events.length - 1].duration;
  songTimeouts.push(window.setTimeout(() => {
    document.querySelectorAll(".song-chord-card.played").forEach((card) => card.classList.remove("played"));
    stopSongPlayback();
  }, totalDuration * 1000 + 300));
}

function renderSongCards(section, grid, startMeasure = 1, showMeter = false) {
  const parts = section.importedParts || parseMeasures(section.chords);
  const scaleSet = new Set(scaleNotes(songState.key, songState.scale).map((note) => note.pitch));
  let activeMeter = section.meter || songState.meter;
  let previousNotes = null;
  let measureNumber = startMeasure;
  let playIndex = 0;
  grid.innerHTML = "";

  if (showMeter) {
    const firstMeasure = parts[0]?.measures?.[0] || null;
    activeMeter = firstMeasure ? measureMeter(firstMeasure, activeMeter) : activeMeter;
    grid.append(songGridMeterMark(activeMeter));
  }

  parts.forEach((part) => {
    markRepeatPartMeasures(part);
    const repeatWrap = document.createElement("div");
    repeatWrap.className = "repeat-group";
    repeatWrap.classList.toggle("is-repeated", part.repeat > 1);
    repeatWrap.style.setProperty("--repeat-count", String(part.repeat));

    let repeatBadge = null;
    if (part.repeat > 1) {
      repeatBadge = document.createElement("span");
      repeatBadge.className = "repeat-badge";
      repeatBadge.textContent = `x${part.repeat}`;
    }

    part.measures.forEach((measure, measureIndex) => {
      const nextMeter = measureMeter(measure, activeMeter);
      if (nextMeter !== activeMeter) {
        repeatWrap.append(songGridMeterMark(nextMeter));
        activeMeter = nextMeter;
      }
      const measureElement = document.createElement("div");
      measureElement.className = "song-measure";
      measureElement.classList.toggle("repeat-start", Boolean(measure.repeatStart || (part.repeat > 1 && measureIndex === 0)));
      measureElement.classList.toggle("repeat-end", Boolean(measure.repeatEnd || (part.repeat > 1 && measureIndex === part.measures.length - 1)));
      if (measure.ending) {
        measureElement.classList.add("has-ending");
        measureElement.dataset.ending = measure.ending;
      }
      const entries = measureEntriesFromMeasure(measure);
      measureElement.style.setProperty("--chords-in-measure", String(Math.max(entries.length, 1)));
      const number = document.createElement("span");
      number.className = "measure-number";
      number.textContent = String(measureNumber);
      measureElement.append(number);
      if (measure.ending) {
        const ending = document.createElement("span");
        ending.className = "ending-number";
        ending.textContent = `${measure.ending}.`;
        measureElement.append(ending);
      }
      if (Array.isArray(measure.nav) && measure.nav.length) {
        measureElement.classList.add("has-nav");
        const nav = document.createElement("span");
        nav.className = "song-grid-nav";
        nav.innerHTML = navigationMarkerHtml(measure.nav);
        measureElement.append(nav);
      }

      entries.forEach((entry, chordIndex) => {
        const result = chordCardHtml(entry, previousNotes, scaleSet, `${section.id}-${measureNumber - 1}-${chordIndex}-${playIndex}`, measure, chordIndex);
        previousNotes = result.notes;
        playIndex += 1;
        measureElement.insertAdjacentHTML("beforeend", result.html);
      });

      if (repeatBadge && measureIndex === part.measures.length - 1) {
        measureElement.append(repeatBadge);
      }

      measureNumber += 1;
      repeatWrap.append(measureElement);
    });

    measureNumber += Math.max(0, expandedPartMeasures(part).length - part.measures.length);
    grid.append(repeatWrap);
  });

  grid.querySelectorAll(".song-chord-card[data-notes]").forEach((card) => {
    card.addEventListener("click", () => {
      const notes = card.dataset.notes.split(",").map((absolute) => ({ absolute: Number(absolute) }));
      playNotes(notes);
    });
  });
  if (grid.isConnected) updateAndRenderSongNotation(grid);
}

function moveSongOrder(fromIndex, toIndex) {
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
  const nextOrder = [...songState.order];
  const [moved] = nextOrder.splice(fromIndex, 1);
  nextOrder.splice(toIndex, 0, moved);
  songState.order = nextOrder;
  stopSongPlayback();
  renderSong();
}

function renderSongOrder() {
  songBlockPalette.innerHTML = "";
  songState.sections.forEach((section) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "song-preset";
    button.textContent = section.title;
    button.addEventListener("click", () => {
      stopSongPlayback();
      songState.order.push(section.id);
      renderSong();
    });
    songBlockPalette.append(button);
  });

  songOrder.innerHTML = "";
  if (!songState.order.length) {
    const empty = document.createElement("p");
    empty.className = "song-order-empty";
    empty.textContent = "Klik op een blok om de volgorde op te bouwen.";
    songOrder.append(empty);
    return;
  }
  orderedSongEntries().forEach(({ section, title }, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "song-order-item";
    item.draggable = true;
    item.dataset.index = String(index);
    item.innerHTML = `
      <strong>${title}</strong>
      <em aria-hidden="true">x</em>
    `;
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", String(index));
      event.dataTransfer.effectAllowed = "move";
    });
    item.addEventListener("dragover", (event) => {
      event.preventDefault();
      item.classList.add("drag-over");
    });
    item.addEventListener("dragleave", () => {
      item.classList.remove("drag-over");
    });
    item.addEventListener("drop", (event) => {
      event.preventDefault();
      item.classList.remove("drag-over");
      moveSongOrder(Number(event.dataTransfer.getData("text/plain")), index);
    });
    item.querySelector("em").addEventListener("click", (event) => {
      event.stopPropagation();
      stopSongPlayback();
      songState.order.splice(index, 1);
      renderSong();
    });
    songOrder.append(item);
  });
}

function renderSong() {
  songKeySelect.value = String(keyOptions.indexOf(songState.key));
  songScaleSelect.value = songState.scale.id;
  songMeterSelect.value = songState.meter;
  songBpmInput.value = String(songState.bpm);
  songVoicingSelect.value = songState.startVoicing;
  songTitleInput.value = songState.title;
  songArtistInput.value = songState.artist;
  songTitleDisplay.textContent = songState.title || "Titel";
  songArtistDisplay.textContent = songState.artist || "";
  studentKeyLabel.innerHTML = `${formatMusicText(songState.key.label)} ${songState.scale.name}`;
  studentMeterLabel.textContent = songState.meter;
  studentBpmLabel.textContent = `${songState.bpm} BPM`;
  songSections.innerHTML = "";
  renderSongOrder();
  renderSongScaleOverview();
  let nextMeasureNumber = 1;
  let visibleMeter = "";

  orderedSongEntries().forEach(({ section, title }, orderIndex) => {
    const parts = parseMeasures(section.chords);
    const sectionStartMeasure = nextMeasureNumber;
    const sectionMeter = section.meter || songState.meter;
    const showMeter = orderIndex === 0 || sectionMeter !== visibleMeter;
    visibleMeter = sectionMeter;
    const wrapper = document.createElement("section");
    wrapper.className = "song-section";
    wrapper.innerHTML = `
      <div class="song-section-head">
        <h2>${title}</h2>
        <div class="control-group">
          <label for="${section.id}-${orderIndex}Chords">Akkoorden</label>
          <textarea class="song-chord-input" id="${section.id}-${orderIndex}Chords" rows="4" spellcheck="false">${escapeHtml(section.chords)}</textarea>
        </div>
      </div>
      <div class="song-chord-grid" aria-label="${title} akkoorden"></div>
    `;
    const input = wrapper.querySelector(".song-chord-input");
    const grid = wrapper.querySelector(".song-chord-grid");
    input.addEventListener("input", () => {
      stopSongPlayback();
      section.chords = input.value;
      section.importedParts = null;
      renderSongCards(section, grid, sectionStartMeasure, showMeter);
    });
    renderSongCards(section, grid, sectionStartMeasure, showMeter);
    nextMeasureNumber += visibleMeasureCount(parts);
    songSections.append(wrapper);
    updateAndRenderSongNotation(grid);
  });
}

function render() {
  syncChordNotationPlacement();
  updateInversions();
  const scale = scaleNotes(state.key, state.scale);
  updateChordRootOptions(scale);
  const rootAbsolute = state.selectedRootAbsolute ?? bestRootAbsoluteForScale(state.root, state.quality, state.inversion, scale);
  const notes = voicedNotes(state.root, state.quality, state.inversion, rootAbsolute);
  let searchResult = null;
  renderChordMode();
  if (state.chordMode === "search") {
    searchResult = updateSearchSummary();
  } else if (state.chordActive) {
    updateSummary(notes, scale);
  } else {
    updateScaleOnlySummary(scale);
  }
  updateScaleStrip(scale);
  const keyboardNotes = state.chordMode === "search"
    ? searchNotesForKeyboard(searchResult)
    : (state.chordActive ? notes : []);
  updateKeyboard(keyboardNotes, scale);
  updateDegreeChords(scale);
  renderChordSequence();
  if (state.chordMode === "search" && !searchResult) {
    updateChordNotationPanel([], "Zoek akkoord");
  } else {
    const notationRootAbsolute = bestRootAbsoluteForNotation(state.root, state.quality, state.inversion);
    const notationNotes = voicedNotes(state.root, state.quality, state.inversion, notationRootAbsolute);
    const notationTitle = `
      <strong>${formatMusicText(chordSymbol(state.root, state.quality))}</strong>
      <small>${formatNoteList(notationNotes)}</small>
      <small>${formatMusicText(voicingLabel(state.inversion))}</small>
    `;
    updateChordNotationPanel(notationNotes, notationTitle);
  }
  renderSelectedInspirationSong();
  renderScaleVideo();
  renderFifthsCircle();
  syncAddSongKeyToCurrentScale();
  renderSongInspirations();
  renderGrid();
  renderSong();
  renderCustomComposer();
  if (!state.chordActive && state.chordMode !== "search") {
    centerCurrentScaleOnKeyboard();
  }
  focusActiveChordOnKeyboard();
}

rootSelect.addEventListener("change", () => {
  state.root = rootOptions[Number(rootSelect.value)];
  state.libraryRoot = state.root;
  state.selectedRootAbsolute = null;
  state.chordActive = true;
  requestKeyboardFocus();
  render();
  scrollToChordInfoBlock();
});

keySelect.addEventListener("change", () => {
  state.key = keyOptions[Number(keySelect.value)];
  clearSelectedInspirationSong();
  clearChordSequence();
  syncChordToKey();
  syncSongTheoryToChordTab();
  render();
  scrollToKeyboardAfterKeyChange();
});

scaleSelect.addEventListener("change", () => {
  state.scale = scales.find((scale) => scale.id === scaleSelect.value);
  clearSelectedInspirationSong();
  clearChordSequence();
  syncChordToKey();
  syncSongTheoryToChordTab();
  render();
});

qualitySelect.addEventListener("change", () => {
  state.quality = qualities.find((quality) => quality.id === qualitySelect.value);
  state.selectedRootAbsolute = null;
  state.chordActive = true;
  requestKeyboardFocus();
  render();
  scrollToChordInfoBlock();
});

inversionSelect.addEventListener("change", () => {
  state.inversion = Number(inversionSelect.value);
  state.selectedRootAbsolute = null;
  state.chordActive = true;
  requestKeyboardFocus();
  render();
  scrollToChordInfoBlock();
});

filterInput.addEventListener("input", renderGrid);

libraryToggle?.addEventListener("click", () => {
  state.libraryOpen = !state.libraryOpen;
  renderGrid();
});

resetChordSequence?.addEventListener("click", () => {
  clearChordSequence();
  if (chordSequenceResults) chordSequenceResults.innerHTML = "";
  renderChordSequence();
});

addChordSequence?.addEventListener("click", () => {
  if (chordSequenceResults) chordSequenceResults.innerHTML = "";
  addChordToSequence(currentChordForSequence());
});

searchChordSequence?.addEventListener("click", () => {
  searchSongsForChordSequence().catch(() => {
    if (searchChordSequence) searchChordSequence.disabled = false;
    if (chordSequenceResults) chordSequenceResults.textContent = "Zoeken is niet gelukt.";
  });
});

selectedSongTranspose?.addEventListener("change", () => {
  const key = keyOptions[Number(selectedSongTranspose.value)];
  if (!key) return;
  applySelectedSongTransposeKey(key.label);
  render();
  scrollSelectedSongIntoView();
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    modeButtons.forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
});

chordModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.chordMode = button.dataset.chordMode;
    render();
  });
});

clearSearchButton?.addEventListener("click", () => {
  state.searchNotes = [];
  render();
});

inspirationRefreshButton?.addEventListener("click", () => {
  inspirationState.offset += 4;
  renderSongInspirations();
});

inspirationSearch?.addEventListener("input", () => {
  inspirationState.query = inspirationSearch.value;
  renderSongInspirations();
});

inspirationSort?.addEventListener("change", () => {
  inspirationState.sort = inspirationSort.value;
  renderSongInspirations();
});

inspirationFavoriteFilter?.addEventListener("click", () => {
  inspirationState.favoritesOnly = !inspirationState.favoritesOnly;
  renderSongInspirations();
});

librarySyncButton?.addEventListener("click", () => {
  syncLocalSongsOnline().catch(() => {
    if (librarySyncButton) librarySyncButton.disabled = false;
    if (inspirationStatus) inspirationStatus.textContent = "Online synchronisatie is niet gelukt.";
  });
});

deleteSelectedSongButton?.addEventListener("click", deleteSelectedInspirationSong);

songSchemaEditToggle?.addEventListener("click", () => {
  if (!state.isAdmin) return;
  state.schemaEditMode = !state.schemaEditMode;
  renderSelectedInspirationSong();
});

songSchemaEditor?.addEventListener("click", handleSongSchemaEditorClick);

let studentCodeInputTimer;
studentCodeInput?.addEventListener("input", () => {
  window.clearTimeout(studentCodeInputTimer);
  const code = normalizeStudentCode(studentCodeInput.value);
  if (studentCodeInput.value !== code) studentCodeInput.value = code;
  studentCodeInputTimer = window.setTimeout(() => {
    applyStudentCode(code).catch(() => {});
  }, 450);
});

studentCodeInput?.addEventListener("change", () => {
  window.clearTimeout(studentCodeInputTimer);
  applyStudentCode(studentCodeInput.value).catch(() => {});
});

addSongForm?.addEventListener("submit", handleAddSongSubmit);

playChordButton.addEventListener("click", playCurrentSelection);
playScaleButton?.addEventListener("click", playCurrentScaleFromButton);

customTitleInput?.addEventListener("input", () => {
  customState.title = customTitleInput.value;
  renderCustomComposer();
});

customArtistInput?.addEventListener("input", () => {
  customState.artist = customArtistInput.value;
  renderCustomComposer();
});

customKeySelect?.addEventListener("change", () => {
  customState.key = keyOptions[Number(customKeySelect.value)] || customState.key;
  renderCustomComposer();
});

customScaleSelect?.addEventListener("change", () => {
  customState.scale = scales.find((scale) => scale.id === customScaleSelect.value) || customState.scale;
  renderCustomComposer();
});

customRootSelect?.addEventListener("change", () => {
  customState.root = rootOptions[Number(customRootSelect.value)] || customState.root;
  customState.selectedIndex = null;
  renderCustomComposer();
});

customQualitySelect?.addEventListener("change", () => {
  customState.quality = qualities.find((quality) => quality.id === customQualitySelect.value) || customState.quality;
  customState.selectedIndex = null;
  renderCustomComposer();
});

customInversionSelect?.addEventListener("change", () => {
  customState.inversion = Number(customInversionSelect.value);
  renderCustomComposer();
});

customChordText?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  addTypedCustomChord();
});

customAddChordButton?.addEventListener("click", addCustomChord);
customAddTypedChordButton?.addEventListener("click", addTypedCustomChord);
customResetButton?.addEventListener("click", resetCustomChords);
customZoomOut?.addEventListener("click", () => setCustomZoom(customState.zoom - 0.1));
customZoomIn?.addEventListener("click", () => setCustomZoom(customState.zoom + 0.1));
customZoomRange?.addEventListener("input", () => setCustomZoom(customZoomRange.value));

authForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!authClient || !authEmail || !authSubmit) {
    setAuthStatus("Login is nog niet beschikbaar. Controleer de Supabase-instellingen.", true);
    return;
  }

  const email = authEmail.value.trim().toLowerCase();
  if (!email) return;

  authSubmit.disabled = true;
  setAuthStatus("Loginlink wordt verstuurd...");
  try {
    const { error } = await authClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.href.split("#")[0]
      }
    });
    if (error) throw error;
    setAuthStatus("Check je e-mail. Klik op de link om de app op dit apparaat te openen.");
  } catch (error) {
    setAuthStatus("De loginlink kon niet verstuurd worden. Controleer het e-mailadres en probeer opnieuw.", true);
    console.warn("auth magic link failed", error);
  } finally {
    authSubmit.disabled = false;
  }
});

async function signOutUser() {
  await authClient?.auth.signOut();
  authAccessToken = "";
  setAuthView("auth-locked");
  setAuthStatus("Je bent uitgelogd. Log opnieuw in om de app te openen.");
}

authLogout?.addEventListener("click", signOutUser);
mobileAuthLogout?.addEventListener("click", signOutUser);

authClient?.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
    refreshAuthAccess({ showWelcome: event === "SIGNED_IN" });
  }
  if (event === "SIGNED_OUT") {
    authAccessToken = "";
    setAuthView("auth-locked");
    setAuthStatus("Log in met het e-mailadres waarmee de app is gekocht.");
  }
});

function openCustomPrintView() {
  customState.isPrinting = true;
  document.body.classList.add("custom-printing");
  window.print();
}

const pdfPageWidth = 595.28;
const pdfPageHeight = 841.89;
const pdfMargin = 42;
const pdfGold = [0.835, 0.647, 0.114];
const pdfDark = [0.12, 0.13, 0.15];
const pdfMuted = [0.43, 0.46, 0.5];
const pdfLineColor = [0.82, 0.82, 0.78];

function plainMusicText(value) {
  const container = document.createElement("span");
  container.innerHTML = formatMusicText(value);
  return container.textContent || "";
}

function pdfEscape(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[^\x20-\x7E]/g, "");
}

function pdfColor(color) {
  return color.map((part) => Number(part).toFixed(3)).join(" ");
}

function pdfText(stream, text, x, yTop, size = 12, font = "F1", color = pdfDark) {
  const y = pdfPageHeight - yTop;
  stream.push(`BT /${font} ${size} Tf ${pdfColor(color)} rg ${x.toFixed(2)} ${y.toFixed(2)} Td (${pdfEscape(text)}) Tj ET`);
}

function pdfCenteredText(stream, text, x, yTop, width, size = 12, font = "F1", color = pdfDark) {
  const estimatedWidth = String(text ?? "").length * size * 0.5;
  pdfText(stream, text, x + Math.max(0, (width - estimatedWidth) / 2), yTop, size, font, color);
}

function pdfRect(stream, x, yTop, width, height, options = {}) {
  const y = pdfPageHeight - yTop - height;
  if (options.fill) stream.push(`${pdfColor(options.fill)} rg`);
  if (options.stroke) stream.push(`${pdfColor(options.stroke)} RG`);
  if (options.lineWidth) stream.push(`${options.lineWidth.toFixed(2)} w`);
  stream.push(`${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re ${options.fill && options.stroke ? "B" : options.fill ? "f" : "S"}`);
}

function pdfLine(stream, x1, y1Top, x2, y2Top, width = 1, color = pdfLineColor) {
  const y1 = pdfPageHeight - y1Top;
  const y2 = pdfPageHeight - y2Top;
  stream.push(`${pdfColor(color)} RG ${width.toFixed(2)} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`);
}

function buildPdfDocument(pageStreams) {
  const encoder = new TextEncoder();
  const pageCount = Math.max(1, pageStreams.length);
  const fontRegularId = 3 + pageCount * 2;
  const fontBoldId = fontRegularId + 1;
  const objects = [];
  objects[0] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[1] = `<< /Type /Pages /Kids [${Array.from({ length: pageCount }, (_, index) => `${3 + index * 2} 0 R`).join(" ")}] /Count ${pageCount} >>`;
  pageStreams.forEach((stream, index) => {
    const pageId = 3 + index * 2;
    const contentId = pageId + 1;
    const content = stream.join("\n");
    objects[pageId - 1] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdfPageWidth} ${pdfPageHeight}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId - 1] = `<< /Length ${encoder.encode(content).length} >>\nstream\n${content}\nendstream`;
  });
  objects[fontRegularId - 1] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objects[fontBoldId - 1] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(encoder.encode(pdf).length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = encoder.encode(pdf).length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

function pdfKeyboardRange(notes) {
  const absolutes = notes.map((note) => note.absolute);
  const lowest = Math.min(...absolutes);
  const highest = Math.max(...absolutes);
  let firstWhite = Math.floor((lowest - 2) / 12) * 12;
  let lastWhite = Math.floor((highest + 2) / 12) * 12 + 11;
  while (!whitePattern.includes(mod(lastWhite, 12))) lastWhite -= 1;
  while (lastWhite - firstWhite < 12) {
    firstWhite -= 12;
    if (lastWhite - firstWhite >= 12) break;
    lastWhite += 12;
  }
  const whiteNotes = [];
  for (let absolute = firstWhite; absolute <= lastWhite; absolute += 1) {
    if (whitePattern.includes(mod(absolute, 12))) whiteNotes.push({ absolute, pitch: mod(absolute, 12) });
  }
  return whiteNotes;
}

function drawPdfKeyboard(stream, notes, x, yTop, width, height) {
  if (!notes.length) return;
  const active = new Map(notes.map((note) => [note.absolute, note.label]));
  const whiteNotes = pdfKeyboardRange(notes);
  const whiteWidth = width / whiteNotes.length;
  const blackWidth = whiteWidth * 0.58;
  const blackHeight = height * 0.58;
  whiteNotes.forEach((note, index) => {
    const isActive = active.has(note.absolute);
    pdfRect(stream, x + index * whiteWidth, yTop, whiteWidth, height, {
      fill: isActive ? pdfGold : [0.985, 0.985, 0.97],
      stroke: [0.72, 0.72, 0.7],
      lineWidth: 0.55
    });
    if (isActive) {
      pdfCenteredText(stream, active.get(note.absolute), x + index * whiteWidth, yTop + height - 9, whiteWidth, 7.5, "F2", pdfDark);
    }
  });
  whiteNotes.forEach((note, index) => {
    const next = whiteNotes[index + 1];
    if (!next || next.absolute - note.absolute !== 2) return;
    const blackAbsolute = note.absolute + 1;
    const isActive = active.has(blackAbsolute);
    const blackX = x + (index + 1) * whiteWidth - blackWidth / 2;
    pdfRect(stream, blackX, yTop, blackWidth, blackHeight, {
      fill: isActive ? [0.22, 0.22, 0.22] : [0.16, 0.17, 0.19],
      stroke: [0.08, 0.08, 0.09],
      lineWidth: 0.45
    });
    if (isActive) {
      pdfCenteredText(stream, active.get(blackAbsolute), blackX, yTop + blackHeight - 8, blackWidth, 6.4, "F2", [1, 1, 1]);
    }
  });
}

function drawCustomPdfScale(stream, yTop) {
  const title = `${plainMusicText(customState.key.label)} ${customState.scale.name} toonladder`;
  const notes = scaleNotes(customState.key, customState.scale);
  pdfText(stream, title, pdfMargin, yTop, 14, "F2", pdfDark);
  drawPdfKeyboard(stream, notes, pdfMargin, yTop + 14, pdfPageWidth - pdfMargin * 2, 66);
}

function drawCustomPdfChord(stream, chord, index, x, yTop, width, height) {
  const notes = chord.voicingNotes || chord.notes || [];
  pdfRect(stream, x, yTop, width, height, {
    fill: [1, 1, 1],
    stroke: [0.82, 0.82, 0.8],
    lineWidth: 0.75
  });
  pdfText(stream, `${index + 1}. ${plainMusicText(chord.symbol)}`, x + 10, yTop + 18, 16, "F2", pdfDark);
  pdfText(stream, plainMusicText(formatNoteList(notes)), x + 10, yTop + 37, 9.5, "F1", pdfMuted);
  pdfText(stream, plainMusicText(voicingLabel(chord.inversion)), x + 10, yTop + 52, 9.5, "F1", pdfMuted);
  drawPdfKeyboard(stream, notes, x + 10, yTop + 64, width - 20, height - 76);
}

function customPdfFilename() {
  const base = `${customState.title || "akkoordenreeks"} ${customState.artist || ""}`.trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "nootstudio-akkoordenreeks"}.pdf`;
}

function downloadPdfBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.target = "_blank";
  link.rel = "noopener";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function createCustomPdf() {
  rebuildCustomChords();
  const pageStreams = [[]];
  let stream = pageStreams[0];
  let y = 46;
  const cardGap = 12;
  const columns = 3;
  const cardWidth = (pdfPageWidth - pdfMargin * 2 - cardGap * (columns - 1)) / columns;
  const cardHeight = 136;

  const newPage = () => {
    stream = [];
    pageStreams.push(stream);
    y = 46;
  };
  const ensureSpace = (height) => {
    if (y + height <= pdfPageHeight - 40) return;
    newPage();
  };

  pdfCenteredText(stream, customState.title || "Akkoordenreeks", pdfMargin, y, pdfPageWidth - pdfMargin * 2, 22, "F2", pdfDark);
  y += 24;
  if (customState.artist) {
    pdfCenteredText(stream, customState.artist, pdfMargin, y, pdfPageWidth - pdfMargin * 2, 13, "F1", pdfMuted);
    y += 24;
  } else {
    y += 8;
  }
  drawCustomPdfScale(stream, y);
  y += 98;

  if (!customState.chords.length) {
    pdfRect(stream, pdfMargin, y, pdfPageWidth - pdfMargin * 2, 54, {
      fill: [0.98, 0.97, 0.93],
      stroke: [0.86, 0.78, 0.55],
      lineWidth: 0.7
    });
    pdfCenteredText(stream, "Voeg eerst akkoorden toe voordat je een PDF maakt.", pdfMargin, y + 32, pdfPageWidth - pdfMargin * 2, 12, "F1", pdfMuted);
  } else {
    customState.chords.forEach((chord, index) => {
      if (index % columns === 0) ensureSpace(cardHeight + 18);
      const column = index % columns;
      const x = pdfMargin + column * (cardWidth + cardGap);
      drawCustomPdfChord(stream, chord, index, x, y, cardWidth, cardHeight);
      if (column === columns - 1) y += cardHeight + 14;
    });
  }

  const blob = buildPdfDocument(pageStreams);
  downloadPdfBlob(blob, customPdfFilename());
}

customPrintButton?.addEventListener("click", openCustomPrintView);
customPdfButton?.addEventListener("click", createCustomPdf);

pageTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActivePage(tab.dataset.page);
  });
});

mobilePageMenuButton?.addEventListener("click", () => {
  const isOpen = !mobilePageMenu?.hidden;
  if (mobilePageMenu) mobilePageMenu.hidden = isOpen;
  mobilePageMenuButton.setAttribute("aria-expanded", String(!isOpen));
});

mobilePageMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!item.dataset.page) return;
    setActivePage(item.dataset.page);
  });
});

document.addEventListener("click", (event) => {
  if (!mobilePageMenu || mobilePageMenu.hidden) return;
  const target = event.target;
  if (mobilePageMenu.contains(target) || mobilePageMenuButton?.contains(target)) return;
  mobilePageMenu.hidden = true;
  mobilePageMenuButton?.setAttribute("aria-expanded", "false");
});

songPrintButton.addEventListener("click", async () => {
  stopSongPlayback();
  await prepareSongPrintNotation();
  window.print();
});

window.addEventListener("beforeprint", () => {
  document.body.classList.add("print-layout-probe");
  updateAndRenderSongNotation();
});

window.addEventListener("afterprint", () => {
  customState.isPrinting = false;
  document.body.classList.remove("custom-printing");
  cleanupSongPrintNotation();
});

const printMediaQuery = window.matchMedia?.("print");
if (printMediaQuery?.addEventListener) {
  printMediaQuery.addEventListener("change", (event) => {
    if (event.matches) {
      document.body.classList.add("print-layout-probe");
      requestAnimationFrame(() => updateAndRenderSongNotation());
    } else {
      cleanupSongPrintNotation();
    }
  });
}

let notationResizeTimer;
window.addEventListener("resize", () => {
  syncChordNotationPlacement();
  window.clearTimeout(notationResizeTimer);
  notationResizeTimer = window.setTimeout(() => updateAndRenderSongNotation(), 120);
});

songKeySelect.addEventListener("change", () => {
  stopSongPlayback();
  songState.key = keyOptions[Number(songKeySelect.value)];
  renderSong();
});

songScaleSelect.addEventListener("change", () => {
  stopSongPlayback();
  songState.scale = scales.find((scale) => scale.id === songScaleSelect.value);
  renderSong();
});

songMeterSelect.addEventListener("change", () => {
  stopSongPlayback();
  songState.meter = songMeterSelect.value;
  renderSong();
});

songBpmInput.addEventListener("input", () => {
  stopSongPlayback();
  songState.bpm = Math.min(220, Math.max(40, Number(songBpmInput.value) || 84));
});

songVoicingSelect.addEventListener("change", () => {
  stopSongPlayback();
  songState.startVoicing = songVoicingSelect.value;
  renderSong();
});

songTitleInput.addEventListener("input", () => {
  songState.title = songTitleInput.value;
  songTitleDisplay.textContent = songState.title || "Titel";
});

songArtistInput.addEventListener("input", () => {
  songState.artist = songArtistInput.value;
  songArtistDisplay.textContent = songState.artist;
});

songImportButton.addEventListener("click", () => {
  if (!state.isAdmin) {
    if (songImportStatus) songImportStatus.textContent = "Alleen beheerders kunnen liedjes importeren.";
    return;
  }
  applySongImport();
});

songXmlInput.addEventListener("change", () => {
  if (!state.isAdmin) {
    songXmlInput.value = "";
    if (songImportStatus) songImportStatus.textContent = "Alleen beheerders kunnen MusicXML importeren.";
    return;
  }
  const [file] = songXmlInput.files;
  if (!file) return;
  applyMusicXmlImport(file);
  songXmlInput.value = "";
});

songPlayButton.addEventListener("click", () => {
  if (isSongPlaying) {
    stopSongPlayback();
    return;
  }
  startSongPlayback();
});

document.addEventListener("click", (event) => {
  if (floatingChord && !floatingChord.hidden && !floatingChord.contains(event.target)) {
    hideFloatingChord();
  }
});

window.addEventListener("scroll", hideFloatingChord, { passive: true });
window.addEventListener("resize", hideFloatingChord);

fillControls();
syncChordToKey();
clearStoredYoutubeOnce("What was I made for", "Billie Eilish", "nootstudioClearYoutubeWhatWasIMadeFor");
loadUserSongLibrary();
renderKeyboard();
restoreStudentCode();
render();
loadSongJsonLibrary();
loadRemoteSongLibrary();
refreshAuthAccess();

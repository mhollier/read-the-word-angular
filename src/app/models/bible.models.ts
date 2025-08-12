export type Testament = "OT" | "NT";

export type Category =
  | "Law"
  | "History"
  | "Poetry & Wisdom"
  | "Major Prophets"
  | "Minor Prophets"
  | "Gospels"
  | "Letters of Paul"
  | "General Letters"
  | "Prophecy";

export interface BookSummary {
  code: string;
  abbr: string;
  title: string;
  testament: Testament;
  seq: number;
  category: Category;
  chapters: number;
}

export interface Verse {
  book: string;
  chapter: number;
  verse: number;
  verseText: string;
}

export interface RandomVerse {
  book: string;
  chapter: number;
  start: number;
  end: number;
  verseText: string;
}

export interface BibleSummary {
  code: string;
  title: string;
}

export interface BibleFull {
  info: BibleSummary;
  verses: ReadonlyArray<Verse>;
}

export const BOOKS: Array<BookSummary> = [
  { code: "GEN", abbr: "Gn", title: "Genesis", testament: "OT", seq: 1, category: "Law", chapters: 50 },
  { code: "EXO", abbr: "Ex", title: "Exodus", testament: "OT", seq: 2, category: "Law", chapters: 40 },
  { code: "LEV", abbr: "Lv", title: "Leviticus", testament: "OT", seq: 3, category: "Law", chapters: 27 },
  { code: "NUM", abbr: "Nm", title: "Numbers", testament: "OT", seq: 4, category: "Law", chapters: 36 },
  { code: "DEU", abbr: "Dt", title: "Deuteronomy", testament: "OT", seq: 5, category: "Law", chapters: 34 },
  { code: "JOS", abbr: "Jos", title: "Joshua", testament: "OT", seq: 6, category: "History", chapters: 24 },
  { code: "JDG", abbr: "Jgs", title: "Judges", testament: "OT", seq: 7, category: "History", chapters: 21 },
  { code: "RUT", abbr: "Ru", title: "Ruth", testament: "OT", seq: 8, category: "History", chapters: 4 },
  { code: "1SA", abbr: "1 Sm", title: "1 Samuel", testament: "OT", seq: 9, category: "History", chapters: 31 },
  { code: "2SA", abbr: "2 Sm", title: "2 Samuel", testament: "OT", seq: 10, category: "History", chapters: 24 },
  { code: "1KI", abbr: "1 Kgs", title: "1 Kings", testament: "OT", seq: 11, category: "History", chapters: 22 },
  { code: "2KI", abbr: "2 Kgs", title: "2 Kings", testament: "OT", seq: 12, category: "History", chapters: 25 },
  { code: "1CH", abbr: "1 Chr", title: "1 Chronicles", testament: "OT", seq: 13, category: "History", chapters: 29 },
  { code: "2CH", abbr: "2 Chr", title: "2 Chronicles", testament: "OT", seq: 14, category: "History", chapters: 36 },
  { code: "EZR", abbr: "Ezr", title: "Ezra", testament: "OT", seq: 15, category: "History", chapters: 10 },
  { code: "NEH", abbr: "Neh", title: "Nehemiah", testament: "OT", seq: 16, category: "History", chapters: 13 },
  { code: "EST", abbr: "Est", title: "Esther", testament: "OT", seq: 17, category: "History", chapters: 10 },
  { code: "JOB", abbr: "Jb", title: "Job", testament: "OT", seq: 18, category: "Poetry & Wisdom", chapters: 42 },
  { code: "PSA", abbr: "Ps", title: "Psalms", testament: "OT", seq: 19, category: "Poetry & Wisdom", chapters: 150 },
  { code: "PRO", abbr: "Prv", title: "Proverbs", testament: "OT", seq: 20, category: "Poetry & Wisdom", chapters: 31 },
  { code: "ECC", abbr: "Eccl", title: "Ecclesiastes", testament: "OT", seq: 21, category: "Poetry & Wisdom", chapters: 12 },
  { code: "SOL", abbr: "Sng", title: "Song of Solomon", testament: "OT", seq: 22, category: "Poetry & Wisdom", chapters: 8 },
  { code: "ISA", abbr: "Wis", title: "Isaiah", testament: "OT", seq: 23, category: "Major Prophets", chapters: 66 },
  { code: "JER", abbr: "Jer", title: "Jeremiah", testament: "OT", seq: 24, category: "Major Prophets", chapters: 52 },
  { code: "LAM", abbr: "Lam", title: "Lamentations", testament: "OT", seq: 25, category: "Major Prophets", chapters: 5 },
  { code: "EZE", abbr: "Ezr", title: "Ezekiel", testament: "OT", seq: 26, category: "Major Prophets", chapters: 48 },
  { code: "DAN", abbr: "Dn", title: "Daniel", testament: "OT", seq: 27, category: "Major Prophets", chapters: 12 },
  { code: "HOS", abbr: "Hos", title: "Hosea", testament: "OT", seq: 28, category: "Minor Prophets", chapters: 14 },
  { code: "JOE", abbr: "Jl", title: "Joel", testament: "OT", seq: 29, category: "Minor Prophets", chapters: 3 },
  { code: "AMO", abbr: "Am", title: "Amos", testament: "OT", seq: 30, category: "Minor Prophets", chapters: 9 },
  { code: "OBA", abbr: "Ob", title: "Obadiah", testament: "OT", seq: 31, category: "Minor Prophets", chapters: 1 },
  { code: "JON", abbr: "Jon", title: "Jonah", testament: "OT", seq: 32, category: "Minor Prophets", chapters: 4 },
  { code: "MIC", abbr: "Mi", title: "Micah", testament: "OT", seq: 33, category: "Minor Prophets", chapters: 7 },
  { code: "NAH", abbr: "Na", title: "Nahum", testament: "OT", seq: 34, category: "Minor Prophets", chapters: 3 },
  { code: "HAB", abbr: "Hb", title: "Habakkuk", testament: "OT", seq: 35, category: "Minor Prophets", chapters: 3 },
  { code: "ZEP", abbr: "Zep", title: "Zephaniah", testament: "OT", seq: 36, category: "Minor Prophets", chapters: 3 },
  { code: "HAG", abbr: "Hg", title: "Haggai", testament: "OT", seq: 37, category: "Minor Prophets", chapters: 2 },
  { code: "ZEC", abbr: "Zec", title: "Zechariah", testament: "OT", seq: 38, category: "Minor Prophets", chapters: 14 },
  { code: "MAL", abbr: "Mal", title: "Malachi", testament: "OT", seq: 39, category: "Minor Prophets", chapters: 4 },
  { code: "MAT", abbr: "Mt", title: "Matthew", testament: "NT", seq: 40, category: "Gospels", chapters: 28 },
  { code: "MAR", abbr: "Mk", title: "Mark", testament: "NT", seq: 41, category: "Gospels", chapters: 16 },
  { code: "LUK", abbr: "Lk", title: "Luke", testament: "NT", seq: 42, category: "Gospels", chapters: 24 },
  { code: "JOH", abbr: "Jn", title: "John", testament: "NT", seq: 43, category: "Gospels", chapters: 21 },
  { code: "ACT", abbr: "Acts", title: "Acts", testament: "NT", seq: 44, category: "History", chapters: 28 },
  { code: "ROM", abbr: "Rom", title: "Romans", testament: "NT", seq: 45, category: "Letters of Paul", chapters: 16 },
  { code: "1CO", abbr: "1 Cor", title: "1 Corinthians", testament: "NT", seq: 46, category: "Letters of Paul", chapters: 16 },
  { code: "2CO", abbr: "2 Cor", title: "2 Corinthians", testament: "NT", seq: 47, category: "Letters of Paul", chapters: 13 },
  { code: "GAL", abbr: "Gal", title: "Galatians", testament: "NT", seq: 48, category: "Letters of Paul", chapters: 6 },
  { code: "EPH", abbr: "Eph", title: "Ephesians", testament: "NT", seq: 49, category: "Letters of Paul", chapters: 6 },
  { code: "PHI", abbr: "Phil", title: "Philippians", testament: "NT", seq: 50, category: "Letters of Paul", chapters: 4 },
  { code: "COL", abbr: "Col", title: "Colossians", testament: "NT", seq: 51, category: "Letters of Paul", chapters: 4 },
  { code: "1TH", abbr: "1 Thes", title: "1 Thessalonians", testament: "NT", seq: 52, category: "Letters of Paul", chapters: 5 },
  { code: "2TH", abbr: "2 Thes", title: "2 Thessalonians", testament: "NT", seq: 53, category: "Letters of Paul", chapters: 3 },
  { code: "1TI", abbr: "1 Tim", title: "1 Timothy", testament: "NT", seq: 54, category: "Letters of Paul", chapters: 6 },
  { code: "2TI", abbr: "2 Tim", title: "2 Timothy", testament: "NT", seq: 55, category: "Letters of Paul", chapters: 4 },
  { code: "TIT", abbr: "Ti", title: "Titus", testament: "NT", seq: 56, category: "Letters of Paul", chapters: 3 },
  { code: "PHM", abbr: "Phim", title: "Philemon", testament: "NT", seq: 57, category: "Letters of Paul", chapters: 1 },
  { code: "HEB", abbr: "Heb", title: "Hebrews", testament: "NT", seq: 58, category: "General Letters", chapters: 13 },
  { code: "JAM", abbr: "Jas", title: "James", testament: "NT", seq: 59, category: "General Letters", chapters: 5 },
  { code: "1PE", abbr: "1 Pt", title: "1 Peter", testament: "NT", seq: 60, category: "General Letters", chapters: 5 },
  { code: "2PE", abbr: "2 Pt", title: "2 Peter", testament: "NT", seq: 61, category: "General Letters", chapters: 3 },
  { code: "1JO", abbr: "1 Jn", title: "1 John", testament: "NT", seq: 62, category: "General Letters", chapters: 5 },
  { code: "2JO", abbr: "2 Jn", title: "2 John", testament: "NT", seq: 63, category: "General Letters", chapters: 1 },
  { code: "3JO", abbr: "3 Jn", title: "3 John", testament: "NT", seq: 64, category: "General Letters", chapters: 1 },
  { code: "JUD", abbr: "Jude", title: "Jude", testament: "NT", seq: 65, category: "General Letters", chapters: 1 },
  { code: "REV", abbr: "Rv", title: "Revelation", testament: "NT", seq: 66, category: "Prophecy", chapters: 22 }
];
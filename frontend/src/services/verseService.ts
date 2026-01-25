import { storage } from '../utils/storage';
import { NATURE_PHOTOS } from '../data/photos';

// Import all 6236 verses
import versesData from '../data/verses.json';

// Verse type definition
export interface Verse {
  id: number;
  surahNumber: number;
  surahName: string;
  surahNameTurkish: string;
  verseNumber: number;
  arabic: string;
  turkish: string;
}

// Cast imported data to Verse array
const ALL_VERSES: Verse[] = versesData as Verse[];

class VerseService {
  private verses: Verse[] = ALL_VERSES;

  getTotalVerseCount(): number {
    return this.verses.length;
  }

  getVerseByIndex(index: number): Verse {
    return this.verses[index % this.verses.length];
  }

  async getRandomVerse(): Promise<{ verse: Verse; index: number }> {
    const shownVerses = await storage.getShownVerses();
    const totalVerses = this.verses.length;

    // If all verses have been shown, reset
    if (shownVerses.length >= totalVerses) {
      await storage.resetShownVerses();
      shownVerses.length = 0;
    }

    // Pick a random verse from available ones
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * totalVerses);
    } while (shownVerses.includes(randomIndex) && shownVerses.length < totalVerses);
    
    await storage.addShownVerse(randomIndex);

    return {
      verse: this.verses[randomIndex],
      index: randomIndex,
    };
  }

  getRandomPhotoIndex(): number {
    return Math.floor(Math.random() * NATURE_PHOTOS.length);
  }

  getAllVerses(): Verse[] {
    return this.verses;
  }

  // Get verse by surah and verse number
  getVerseBySurahAndNumber(surahNumber: number, verseNumber: number): Verse | null {
    return this.verses.find(
      v => v.surahNumber === surahNumber && v.verseNumber === verseNumber
    ) || null;
  }

  // Get all verses of a surah
  getVersesBySurah(surahNumber: number): Verse[] {
    return this.verses.filter(v => v.surahNumber === surahNumber);
  }
}

export const verseService = new VerseService();

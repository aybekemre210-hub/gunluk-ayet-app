import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  LAST_UPDATE_DATE: 'last_update_date',
  CURRENT_VERSE_INDEX: 'current_verse_index',
  CURRENT_PHOTO_INDEX: 'current_photo_index',
  SHOWN_VERSES: 'shown_verses',
  IS_SETUP_COMPLETE: 'is_setup_complete',
};

export const storage = {
  async getLastUpdateDate(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.LAST_UPDATE_DATE);
  },

  async setLastUpdateDate(date: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_UPDATE_DATE, date);
  },

  async getCurrentVerseIndex(): Promise<number> {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_VERSE_INDEX);
    return value ? parseInt(value, 10) : 0;
  },

  async setCurrentVerseIndex(index: number): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_VERSE_INDEX, index.toString());
  },

  async getCurrentPhotoIndex(): Promise<number> {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_PHOTO_INDEX);
    return value ? parseInt(value, 10) : 0;
  },

  async setCurrentPhotoIndex(index: number): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_PHOTO_INDEX, index.toString());
  },

  async getShownVerses(): Promise<number[]> {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.SHOWN_VERSES);
    return value ? JSON.parse(value) : [];
  },

  async setShownVerses(verses: number[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.SHOWN_VERSES, JSON.stringify(verses));
  },

  async addShownVerse(verseIndex: number): Promise<void> {
    const shown = await this.getShownVerses();
    if (!shown.includes(verseIndex)) {
      shown.push(verseIndex);
      await this.setShownVerses(shown);
    }
  },

  async resetShownVerses(): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.SHOWN_VERSES, JSON.stringify([]));
  },

  async isSetupComplete(): Promise<boolean> {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_SETUP_COMPLETE);
    return value === 'true';
  },

  async setSetupComplete(complete: boolean): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.IS_SETUP_COMPLETE, complete.toString());
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  },
};

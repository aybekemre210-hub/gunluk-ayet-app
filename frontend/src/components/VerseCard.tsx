import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Verse } from '../services/verseService';

const { width, height } = Dimensions.get('window');

interface VerseCardProps {
  verse: Verse;
  showBackground?: boolean;
}

export const VerseCard: React.FC<VerseCardProps> = ({ verse, showBackground = false }) => {
  return (
    <View style={[styles.container, showBackground && styles.withBackground]}>
      {/* Arabic Text */}
      <Text style={styles.arabicText}>{verse.arabic}</Text>
      
      {/* Turkish Translation */}
      <Text style={styles.turkishText}>{verse.turkish}</Text>
      
      {/* Surah Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {verse.surahNameTurkish} Suresi, {verse.verseNumber}. Ayet
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  withBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
    margin: 16,
  },
  arabicText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    writingDirection: 'rtl',
  },
  turkishText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    paddingHorizontal: 8,
  },
  infoContainer: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
});

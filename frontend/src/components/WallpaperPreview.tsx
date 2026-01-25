import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import ViewShot from 'react-native-view-shot';
import { Verse } from '../services/verseService';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface WallpaperPreviewProps {
  verse: Verse;
  photoUrl: string;
  style?: object;
}

export interface WallpaperPreviewRef {
  capture: () => Promise<string>;
}

export const WallpaperPreview = forwardRef<WallpaperPreviewRef, WallpaperPreviewProps>(
  ({ verse, photoUrl, style }, ref) => {
    const viewShotRef = useRef<ViewShot>(null);

    useImperativeHandle(ref, () => ({
      capture: async () => {
        if (viewShotRef.current) {
          const uri = await viewShotRef.current.capture?.();
          return uri || '';
        }
        return '';
      },
    }));

    return (
      <ViewShot
        ref={viewShotRef}
        options={{
          format: 'jpg',
          quality: 0.95,
          width: 1080,
          height: 1920,
        }}
        style={[styles.container, style]}
      >
        {/* Background Image */}
        <Image
          source={{ uri: photoUrl }}
          style={styles.backgroundImage}
          contentFit="cover"
        />
        
        {/* Overlay for better text readability */}
        <View style={styles.overlay} />
        
        {/* Content */}
        <View style={styles.content}>
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
      </ViewShot>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  arabicText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 52,
    marginBottom: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    writingDirection: 'rtl',
  },
  turkishText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    paddingHorizontal: 12,
  },
  infoContainer: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  infoText: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
});

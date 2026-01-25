import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';
import { Ionicons } from '@expo/vector-icons';

import { verseService, Verse } from '../src/services/verseService';
import { NATURE_PHOTOS } from '../src/data/photos';
import { storage } from '../src/utils/storage';
import { getTodayDateString, isNewDay, getTimeUntilMidnight, formatTimeRemaining } from '../src/utils/dateUtils';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [timeUntilChange, setTimeUntilChange] = useState<string>('');
  const viewShotRef = useRef<ViewShot>(null);

  // Load today's verse
  const loadDailyVerse = useCallback(async () => {
    try {
      setIsLoading(true);
      const lastUpdate = await storage.getLastUpdateDate();
      const today = getTodayDateString();

      if (isNewDay(lastUpdate)) {
        // New day, get a new verse and photo
        const { verse, index } = await verseService.getRandomVerse();
        const photoIndex = verseService.getRandomPhotoIndex();
        
        setCurrentVerse(verse);
        setCurrentPhotoIndex(photoIndex);
        
        await storage.setLastUpdateDate(today);
        await storage.setCurrentVerseIndex(index);
        await storage.setCurrentPhotoIndex(photoIndex);
      } else {
        // Same day, load saved verse and photo
        const verseIndex = await storage.getCurrentVerseIndex();
        const photoIndex = await storage.getCurrentPhotoIndex();
        
        setCurrentVerse(verseService.getVerseByIndex(verseIndex));
        setCurrentPhotoIndex(photoIndex);
      }
    } catch (error) {
      console.error('Error loading daily verse:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check setup status and load verse
  useEffect(() => {
    const initApp = async () => {
      const setupComplete = await storage.isSetupComplete();
      setIsSetupComplete(setupComplete);
      await loadDailyVerse();
    };
    initApp();
  }, [loadDailyVerse]);

  // Update countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const ms = getTimeUntilMidnight();
      setTimeUntilChange(formatTimeRemaining(ms));
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Save wallpaper to gallery
  const saveWallpaper = async () => {
    try {
      setIsSaving(true);
      
      // Request permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Izin Gerekli', 'Duvar kagidini kaydetmek icin galeri izni gereklidir.');
        return;
      }

      // Capture the view
      if (viewShotRef.current) {
        const uri = await viewShotRef.current.capture?.();
        if (uri) {
          // Save to media library
          const asset = await MediaLibrary.createAssetAsync(uri);
          
          // Create album if needed
          const album = await MediaLibrary.getAlbumAsync('Gunluk Ayet');
          if (album) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          } else {
            await MediaLibrary.createAlbumAsync('Gunluk Ayet', asset, false);
          }
          
          Alert.alert(
            'Basarili!',
            'Duvar kagidi galeriye kaydedildi. Ayarlar > Duvar Kagidi bolumunden uygulayabilirsiniz.',
            [{ text: 'Tamam' }]
          );
        }
      }
    } catch (error) {
      console.error('Error saving wallpaper:', error);
      Alert.alert('Hata', 'Duvar kagidi kaydedilirken bir hata olustu.');
    } finally {
      setIsSaving(false);
    }
  };

  // Complete setup
  const completeSetup = async () => {
    await storage.setSetupComplete(true);
    setIsSetupComplete(true);
  };

  // Refresh verse (for testing)
  const refreshVerse = async () => {
    const { verse, index } = await verseService.getRandomVerse();
    const photoIndex = verseService.getRandomPhotoIndex();
    setCurrentVerse(verse);
    setCurrentPhotoIndex(photoIndex);
    await storage.setCurrentVerseIndex(index);
    await storage.setCurrentPhotoIndex(photoIndex);
  };

  // Setup screen
  if (!isSetupComplete) {
    return (
      <SafeAreaView style={styles.setupContainer}>
        <View style={styles.setupContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="moon" size={80} color="#ffd700" />
          </View>
          
          <Text style={styles.setupTitle}>Gunluk Ayet</Text>
          <Text style={styles.setupSubtitle}>Her gun yeni bir ayet, kalbinize huzur</Text>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4ade80" />
              <Text style={styles.featureText}>Her gun rastgele bir ayet</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4ade80" />
              <Text style={styles.featureText}>Arapca metin ve Turkce meal</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4ade80" />
              <Text style={styles.featureText}>Guzel doga fotograflari</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4ade80" />
              <Text style={styles.featureText}>Duvar kagidi olarak kaydet</Text>
            </View>
          </View>
          
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={24} color="#60a5fa" />
            <Text style={styles.infoText}>
              Ayet her gece 00:00'da otomatik degisir. Duvar kagidi olarak kaydetmek icin galeriye erisim izni gerekir.
            </Text>
          </View>
          
          <TouchableOpacity style={styles.startButton} onPress={completeSetup}>
            <Text style={styles.startButtonText}>Basla</Text>
            <Ionicons name="arrow-forward" size={24} color="#1a1a2e" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Loading state
  if (isLoading || !currentVerse) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffd700" />
        <Text style={styles.loadingText}>Gunun ayeti yukleniyor...</Text>
      </View>
    );
  }

  const currentPhotoUrl = NATURE_PHOTOS[currentPhotoIndex];

  return (
    <View style={styles.container}>
      {/* Wallpaper Preview (Capturable) */}
      <ViewShot
        ref={viewShotRef}
        options={{
          format: 'jpg',
          quality: 0.95,
        }}
        style={styles.wallpaperContainer}
      >
        {/* Background Image */}
        <Image
          source={{ uri: currentPhotoUrl }}
          style={styles.backgroundImage}
          contentFit="cover"
        />
        
        {/* Overlay */}
        <View style={styles.overlay} />
        
        {/* Verse Content */}
        <View style={styles.verseContent}>
          <Text style={styles.arabicText}>{currentVerse.arabic}</Text>
          <Text style={styles.turkishText}>{currentVerse.turkish}</Text>
          <View style={styles.surahInfo}>
            <Text style={styles.surahText}>
              {currentVerse.surahNameTurkish} Suresi, {currentVerse.verseNumber}. Ayet
            </Text>
          </View>
        </View>
      </ViewShot>
      
      {/* Bottom Controls */}
      <SafeAreaView style={styles.controlsContainer} edges={['bottom']}>
        <View style={styles.timerContainer}>
          <Ionicons name="time-outline" size={16} color="#ffffff80" />
          <Text style={styles.timerText}>Sonraki ayet: {timeUntilChange}</Text>
        </View>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={refreshVerse}
          >
            <Ionicons name="refresh" size={24} color="#ffffff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={saveWallpaper}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="#1a1a2e" />
            ) : (
              <>
                <Ionicons name="download" size={24} color="#1a1a2e" />
                <Text style={styles.saveButtonText}>Duvar Kagidi Kaydet</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#ffffff80',
  },
  
  // Setup screen styles
  setupContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  setupContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  setupTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  setupSubtitle: {
    fontSize: 16,
    color: '#ffffff80',
    marginBottom: 32,
    textAlign: 'center',
  },
  featureList: {
    width: '100%',
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#1e3a5f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff90',
    marginLeft: 12,
    lineHeight: 20,
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#ffd700',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginRight: 8,
  },
  
  // Main screen styles
  wallpaperContainer: {
    flex: 1,
    width: '100%',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  verseContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 80,
  },
  arabicText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  turkishText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    paddingHorizontal: 8,
  },
  surahInfo: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  surahText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  
  // Controls styles
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  timerText: {
    fontSize: 13,
    color: '#ffffff80',
    marginLeft: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  refreshButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 14,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#ffd700',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginLeft: 8,
  },
});

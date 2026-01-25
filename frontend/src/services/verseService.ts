import { storage } from '../utils/storage';
import { NATURE_PHOTOS } from '../data/photos';

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

// Sample verses - In production, this would be loaded from a JSON file
// For MVP, we include a selection of important verses
const SAMPLE_VERSES: Verse[] = [
  {
    id: 1,
    surahNumber: 1,
    surahName: 'الفاتحة',
    surahNameTurkish: 'Fatiha',
    verseNumber: 1,
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    turkish: 'Rahman ve Rahim olan Allah\'ın adıyla.',
  },
  {
    id: 2,
    surahNumber: 1,
    surahName: 'الفاتحة',
    surahNameTurkish: 'Fatiha',
    verseNumber: 2,
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    turkish: 'Hamd, Alemlerin Rabbi olan Allah\'a mahsustur.',
  },
  {
    id: 3,
    surahNumber: 1,
    surahName: 'الفاتحة',
    surahNameTurkish: 'Fatiha',
    verseNumber: 3,
    arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
    turkish: 'O, Rahman ve Rahim\'dir.',
  },
  {
    id: 4,
    surahNumber: 1,
    surahName: 'الفاتحة',
    surahNameTurkish: 'Fatiha',
    verseNumber: 4,
    arabic: 'مَالِكِ يَوْمِ الدِّينِ',
    turkish: 'Din gününün sahibidir.',
  },
  {
    id: 5,
    surahNumber: 1,
    surahName: 'الفاتحة',
    surahNameTurkish: 'Fatiha',
    verseNumber: 5,
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    turkish: 'Yalnız Sana kulluk eder, yalnız Senden yardım dileriz.',
  },
  {
    id: 6,
    surahNumber: 1,
    surahName: 'الفاتحة',
    surahNameTurkish: 'Fatiha',
    verseNumber: 6,
    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    turkish: 'Bizi doğru yola ilet.',
  },
  {
    id: 7,
    surahNumber: 2,
    surahName: 'البقرة',
    surahNameTurkish: 'Bakara',
    verseNumber: 255,
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
    turkish: 'Allah, O\'ndan başka ilah yoktur. O, Hayy ve Kayyum\'dur. Onu ne uyuklama tutar ne de uyku. Göklerde ve yerde olanların hepsi O\'nundur.',
  },
  {
    id: 8,
    surahNumber: 2,
    surahName: 'البقرة',
    surahNameTurkish: 'Bakara',
    verseNumber: 286,
    arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    turkish: 'Allah, hiç kimseye gücünün yetmeyeceği bir şeyi yüklemez.',
  },
  {
    id: 9,
    surahNumber: 3,
    surahName: 'آل عمران',
    surahNameTurkish: 'Al-i İmran',
    verseNumber: 8,
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ',
    turkish: 'Rabbimiz! Bizi hidayete erdirdikten sonra kalplerimizi eğriltme. Bize katından bir rahmet bağışla. Şüphesiz Sen çok bağışlayansın.',
  },
  {
    id: 10,
    surahNumber: 3,
    surahName: 'آل عمران',
    surahNameTurkish: 'Al-i İmran',
    verseNumber: 173,
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    turkish: 'Allah bize yeter, O ne güzel vekildir!',
  },
  {
    id: 11,
    surahNumber: 4,
    surahName: 'النساء',
    surahNameTurkish: 'Nisa',
    verseNumber: 1,
    arabic: 'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ',
    turkish: 'Ey insanlar! Sizi bir tek nefisten yaratan Rabbinize karşı gelmekten sakının.',
  },
  {
    id: 12,
    surahNumber: 5,
    surahName: 'المائدة',
    surahNameTurkish: 'Maide',
    verseNumber: 3,
    arabic: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا',
    turkish: 'Bugün sizin dininizi kemale erdirdim, üzerinizdeki nimetimi tamamladım ve sizin için din olarak İslam\'ı seçtim.',
  },
  {
    id: 13,
    surahNumber: 6,
    surahName: 'الأنعام',
    surahNameTurkish: 'En\'am',
    verseNumber: 162,
    arabic: 'قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ',
    turkish: 'De ki: "Şüphesiz benim namazım, ibadetlerim, hayatım ve ölümüm, alemlerin Rabbi Allah içindir."',
  },
  {
    id: 14,
    surahNumber: 7,
    surahName: 'الأعراف',
    surahNameTurkish: 'A\'raf',
    verseNumber: 55,
    arabic: 'ادْعُوا رَبَّكُمْ تَضَرُّعًا وَخُفْيَةً ۚ إِنَّهُ لَا يُحِبُّ الْمُعْتَدِينَ',
    turkish: 'Rabbinize yalvararak ve gizlice dua edin. Şüphesiz O, haddi aşanları sevmez.',
  },
  {
    id: 15,
    surahNumber: 9,
    surahName: 'التوبة',
    surahNameTurkish: 'Tevbe',
    verseNumber: 51,
    arabic: 'قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا هُوَ مَوْلَانَا',
    turkish: 'De ki: "Bize ancak Allah\'ın yazdığı isabet eder. O bizim Mevla\'mızdır."',
  },
  {
    id: 16,
    surahNumber: 10,
    surahName: 'يونس',
    surahNameTurkish: 'Yunus',
    verseNumber: 62,
    arabic: 'أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ',
    turkish: 'İyi bilin ki, Allah\'ın dostlarına korku yoktur ve onlar üzülmeyeceklerdir.',
  },
  {
    id: 17,
    surahNumber: 12,
    surahName: 'يوسف',
    surahNameTurkish: 'Yusuf',
    verseNumber: 87,
    arabic: 'وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ ۖ إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ',
    turkish: 'Allah\'ın rahmetinden ümit kesmeyin. Çünkü kafirler topluluğundan başkası Allah\'ın rahmetinden ümit kesmez.',
  },
  {
    id: 18,
    surahNumber: 13,
    surahName: 'الرعد',
    surahNameTurkish: 'Ra\'d',
    verseNumber: 28,
    arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    turkish: 'İyi bilin ki, kalpler ancak Allah\'ı anmakla huzur bulur.',
  },
  {
    id: 19,
    surahNumber: 14,
    surahName: 'إبراهيم',
    surahNameTurkish: 'İbrahim',
    verseNumber: 7,
    arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    turkish: 'Eğer şükrederseniz, elbette size nimetimi artırırım.',
  },
  {
    id: 20,
    surahNumber: 16,
    surahName: 'النحل',
    surahNameTurkish: 'Nahl',
    verseNumber: 125,
    arabic: 'ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ',
    turkish: 'Rabbinin yoluna hikmetle ve güzel öğütle çağır.',
  },
  {
    id: 21,
    surahNumber: 17,
    surahName: 'الإسراء',
    surahNameTurkish: 'İsra',
    verseNumber: 23,
    arabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا',
    turkish: 'Rabbin, yalnız kendisine ibadet etmenizi ve anne babaya iyilik yapmanızı emretti.',
  },
  {
    id: 22,
    surahNumber: 18,
    surahName: 'الكهف',
    surahNameTurkish: 'Kehf',
    verseNumber: 10,
    arabic: 'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
    turkish: 'Rabbimiz! Bize katından bir rahmet ver ve işimizde bize doğruyu göster.',
  },
  {
    id: 23,
    surahNumber: 20,
    surahName: 'طه',
    surahNameTurkish: 'Taha',
    verseNumber: 114,
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    turkish: 'Rabbim! İlmimi artır.',
  },
  {
    id: 24,
    surahNumber: 21,
    surahName: 'الأنبياء',
    surahNameTurkish: 'Enbiya',
    verseNumber: 87,
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    turkish: 'Senden başka ilah yoktur. Sen yücesin! Ben gerçekten zalimlerden oldum.',
  },
  {
    id: 25,
    surahNumber: 23,
    surahName: 'المؤمنون',
    surahNameTurkish: 'Mü\'minun',
    verseNumber: 118,
    arabic: 'رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ',
    turkish: 'Rabbim! Bağışla, merhamet et. Sen merhamet edenlerin en hayırlısısın.',
  },
  {
    id: 26,
    surahNumber: 24,
    surahName: 'النور',
    surahNameTurkish: 'Nur',
    verseNumber: 35,
    arabic: 'اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ',
    turkish: 'Allah, göklerin ve yerin nurudur.',
  },
  {
    id: 27,
    surahNumber: 25,
    surahName: 'الفرقان',
    surahNameTurkish: 'Furkan',
    verseNumber: 74,
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    turkish: 'Rabbimiz! Eşlerimizi ve çocuklarımızı bize göz aydınlığı kıl ve bizi takva sahiplerine önder eyle.',
  },
  {
    id: 28,
    surahNumber: 27,
    surahName: 'النمل',
    surahNameTurkish: 'Neml',
    verseNumber: 19,
    arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ',
    turkish: 'Rabbim! Bana ve anne babama verdiğin nimete şükretmemi bana ilham et.',
  },
  {
    id: 29,
    surahNumber: 28,
    surahName: 'القصص',
    surahNameTurkish: 'Kasas',
    verseNumber: 24,
    arabic: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
    turkish: 'Rabbim! Bana indireceğin her hayra muhtacım.',
  },
  {
    id: 30,
    surahNumber: 29,
    surahName: 'العنكبوت',
    surahNameTurkish: 'Ankebut',
    verseNumber: 69,
    arabic: 'وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا',
    turkish: 'Bizim uğrumuzda cihad edenleri, elbette yollarımıza ileteceğiz.',
  },
  {
    id: 31,
    surahNumber: 33,
    surahName: 'الأحزاب',
    surahNameTurkish: 'Ahzab',
    verseNumber: 56,
    arabic: 'إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ',
    turkish: 'Şüphesiz Allah ve melekleri, Peygamber\'e salat ederler.',
  },
  {
    id: 32,
    surahNumber: 35,
    surahName: 'فاطر',
    surahNameTurkish: 'Fatır',
    verseNumber: 34,
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنَّا الْحَزَنَ',
    turkish: 'Bizden üzüntüyü gideren Allah\'a hamdolsun.',
  },
  {
    id: 33,
    surahNumber: 36,
    surahName: 'يس',
    surahNameTurkish: 'Yasin',
    verseNumber: 58,
    arabic: 'سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ',
    turkish: 'Rahim olan Rabden "Selam" sözü vardır.',
  },
  {
    id: 34,
    surahNumber: 39,
    surahName: 'الزمر',
    surahNameTurkish: 'Zümer',
    verseNumber: 53,
    arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',
    turkish: 'De ki: "Ey kendilerine karşı aşırı giden kullarım! Allah\'ın rahmetinden ümit kesmeyin."',
  },
  {
    id: 35,
    surahNumber: 40,
    surahName: 'غافر',
    surahNameTurkish: 'Mümin',
    verseNumber: 60,
    arabic: 'ادْعُونِي أَسْتَجِبْ لَكُمْ',
    turkish: 'Bana dua edin, size karşılık vereyim.',
  },
  {
    id: 36,
    surahNumber: 42,
    surahName: 'الشورى',
    surahNameTurkish: 'Şura',
    verseNumber: 19,
    arabic: 'اللَّهُ لَطِيفٌ بِعِبَادِهِ يَرْزُقُ مَن يَشَاءُ',
    turkish: 'Allah kullarına karşı lütufkardır. Dilediğini rızıklandırır.',
  },
  {
    id: 37,
    surahNumber: 48,
    surahName: 'الفتح',
    surahNameTurkish: 'Fetih',
    verseNumber: 29,
    arabic: 'مُّحَمَّدٌ رَّسُولُ اللَّهِ',
    turkish: 'Muhammed, Allah\'ın Resulüdür.',
  },
  {
    id: 38,
    surahNumber: 49,
    surahName: 'الحجرات',
    surahNameTurkish: 'Hucurat',
    verseNumber: 13,
    arabic: 'إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ',
    turkish: 'Allah katında en değerliniz, en çok takva sahibi olanınızdır.',
  },
  {
    id: 39,
    surahNumber: 55,
    surahName: 'الرحمن',
    surahNameTurkish: 'Rahman',
    verseNumber: 13,
    arabic: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
    turkish: 'Öyleyse Rabbinizin hangi nimetlerini yalanlarsınız?',
  },
  {
    id: 40,
    surahNumber: 57,
    surahName: 'الحديد',
    surahNameTurkish: 'Hadid',
    verseNumber: 4,
    arabic: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ',
    turkish: 'Nerede olursanız olun, O sizinle beraberdir.',
  },
  {
    id: 41,
    surahNumber: 59,
    surahName: 'الحشر',
    surahNameTurkish: 'Haşr',
    verseNumber: 22,
    arabic: 'هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ ۖ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ ۖ هُوَ الرَّحْمَٰنُ الرَّحِيمُ',
    turkish: 'O, kendisinden başka ilah olmayan Allah\'tır. Görülmeyeni ve görüleni bilendir. O, Rahman ve Rahim\'dir.',
  },
  {
    id: 42,
    surahNumber: 65,
    surahName: 'الطلاق',
    surahNameTurkish: 'Talak',
    verseNumber: 3,
    arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
    turkish: 'Kim Allah\'a tevekkül ederse, Allah ona yeter.',
  },
  {
    id: 43,
    surahNumber: 67,
    surahName: 'الملك',
    surahNameTurkish: 'Mülk',
    verseNumber: 1,
    arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    turkish: 'Hükümranlık elinde olan Allah yücedir ve O her şeye kadirdir.',
  },
  {
    id: 44,
    surahNumber: 93,
    surahName: 'الضحى',
    surahNameTurkish: 'Duha',
    verseNumber: 5,
    arabic: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ',
    turkish: 'Rabbin sana verecek ve sen razı olacaksın.',
  },
  {
    id: 45,
    surahNumber: 94,
    surahName: 'الشرح',
    surahNameTurkish: 'İnşirah',
    verseNumber: 5,
    arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
    turkish: 'Şüphesiz güçlükle beraber bir kolaylık vardır.',
  },
  {
    id: 46,
    surahNumber: 94,
    surahName: 'الشرح',
    surahNameTurkish: 'İnşirah',
    verseNumber: 6,
    arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    turkish: 'Muhakkak güçlükle beraber bir kolaylık vardır.',
  },
  {
    id: 47,
    surahNumber: 112,
    surahName: 'الإخلاص',
    surahNameTurkish: 'İhlas',
    verseNumber: 1,
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
    turkish: 'De ki: "O Allah birdir."',
  },
  {
    id: 48,
    surahNumber: 112,
    surahName: 'الإخلاص',
    surahNameTurkish: 'İhlas',
    verseNumber: 2,
    arabic: 'اللَّهُ الصَّمَدُ',
    turkish: 'Allah Samed\'dir (her şey O\'na muhtaç, O hiçbir şeye muhtaç değil).',
  },
  {
    id: 49,
    surahNumber: 113,
    surahName: 'الفلق',
    surahNameTurkish: 'Felak',
    verseNumber: 1,
    arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
    turkish: 'De ki: "Sabahın Rabbine sığınırım."',
  },
  {
    id: 50,
    surahNumber: 114,
    surahName: 'الناس',
    surahNameTurkish: 'Nas',
    verseNumber: 1,
    arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
    turkish: 'De ki: "İnsanların Rabbine sığınırım."',
  },
];

class VerseService {
  private verses: Verse[] = SAMPLE_VERSES;

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

    // Find verses that haven't been shown
    const availableIndices: number[] = [];
    for (let i = 0; i < totalVerses; i++) {
      if (!shownVerses.includes(i)) {
        availableIndices.push(i);
      }
    }

    // Pick a random verse from available ones
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
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
}

export const verseService = new VerseService();

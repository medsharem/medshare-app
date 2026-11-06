import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { MedicalCase } from '../types';
import {
  ProfileIcon,
  BellIcon,
  SearchIcon,
  ShieldCheckIcon,
  SwapIcon,
  CasesFolderIcon,
  WalletIcon,
  ChatIcon,
} from '../components/MedicalIcons';

interface Props {
  onNavigate: (screen: string, params?: any) => void;
  cases: MedicalCase[];
}

export const HomeScreen: React.FC<Props> = ({ onNavigate, cases }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(24);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const getDynamicGreeting = () => {
    const hour = new Date().getHours();
    // AM = Good Morning, PM = Good Evening
    return hour < 12 ? 'Good Morning, Doctor' : 'Good Evening, Doctor';
  };

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
      setLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setLiked(true);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Official Navy Header matching approved design */}
      <View style={styles.headerHero}>
        <View style={styles.topIconRow}>
          <TouchableOpacity
            style={styles.circleIconBtn}
            onPress={() => onNavigate('specialist_profile')}
            activeOpacity={0.8}
          >
            <ProfileIcon size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.rightIconsGroup}>
            <TouchableOpacity
              style={styles.adminBadgeBtn}
              onPress={() => onNavigate('admin_dashboard')}
              activeOpacity={0.8}
            >
              <ShieldCheckIcon size={14} color={Colors.gold} />
              <Text style={styles.adminBadgeBtnText}>Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.circleIconBtn, showNotifications && styles.circleIconBtnActive]}
              activeOpacity={0.8}
              onPress={() => setShowNotifications(!showNotifications)}
            >
              <BellIcon size={18} color="#FFFFFF" />
              <View style={styles.headerBadge} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.circleIconBtn, isSearchOpen && styles.circleIconBtnActive]}
              activeOpacity={0.8}
              onPress={() => setIsSearchOpen(!isSearchOpen)}
            >
              <SearchIcon size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications Dropdown Banner */}
        {showNotifications && (
          <View style={styles.notificationsBanner}>
            <View style={styles.notifHeader}>
              <Text style={styles.notifTitle}>التنبيهات والإشعارات الطبية (3 جديدة)</Text>
              <TouchableOpacity onPress={() => setShowNotifications(false)}>
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.notifItem}
              onPress={() => {
                setShowNotifications(false);
                onNavigate('case_tracking');
              }}
            >
              <View style={styles.notifDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.notifItemTitle}>وافق د. أحمد الشريف على إحالة الحالة MS-8924</Text>
                <Text style={styles.notifItemTime}>منذ 15 دقيقة • تخصص علاج الجذور</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.notifItem}
              onPress={() => {
                setShowNotifications(false);
                onNavigate('case_chat');
              }}
            >
              <View style={styles.notifDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.notifItemTitle}>رسالة طبية جديدة في شات الاستشارة</Text>
                <Text style={styles.notifItemTime}>منذ 40 دقيقة • بخصوص الأشعة المقطعية CBCT</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Interactive Search Bar when Lens is Clicked */}
        {isSearchOpen && (
          <View style={styles.searchContainer}>
            <View style={styles.searchBarBox}>
              <SearchIcon size={16} color="#64748B" />
              <TextInput
                style={styles.searchInput}
                placeholder="ابحث عن استشاري، تخصص (جذور، قلب..)، أو كود حالة..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={16} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            {/* Instant Search Results Preview */}
            <View style={styles.searchResultsBox}>
              <Text style={styles.searchResultsTitle}>نتائج البحث المباشر في شبكة MEDSHARE:</Text>
              <TouchableOpacity
                style={styles.searchResultItem}
                onPress={() => onNavigate('specialist_profile')}
              >
                <Ionicons name="medkit" size={16} color={Colors.gold} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.searchResultName}>د. أحمد الشريف</Text>
                  <Text style={styles.searchResultSub}>استشاري علاج جذور وحشو عصب ميكروسكوبي • متاح الآن 🟢</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.searchResultItem}
                onPress={() => onNavigate('case_details')}
              >
                <Ionicons name="document-text" size={16} color={Colors.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.searchResultName}>حالة مريض كود: PT-9402 (MS-8924)</Text>
                  <Text style={styles.searchResultSub}>ضرس 46 • كسر أداة في القناة الأنسية • عاجلة 🔴</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Brand & Greeting */}
        <View style={styles.brandTitleContainer}>
          <View style={styles.logoAndBrandRow}>
            <Image
              source={require('../../assets/medshare_logo.png')}
              style={styles.officialLogo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.brandTitleText}>MEDSHARE</Text>
              <Text style={styles.networkSubText}>YOUR MEDICAL NETWORK</Text>
            </View>
          </View>

          <Text style={styles.greetingTitle}>{getDynamicGreeting()}</Text>
          <Text style={styles.greetingSub}>Welcome to your professional workspace.</Text>
        </View>
      </View>

      {/* Your Dashboard Section Header */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.dashboardSectionTitle}>Your Dashboard</Text>
      </View>

      {/* 4 Dashboard Metric Cards (matching exact approved mockup) */}
      <View style={styles.dashboardGrid}>
        {/* Card 1: Referrals */}
        <TouchableOpacity
          style={styles.dashCard}
          activeOpacity={0.85}
          onPress={() => onNavigate('case_tracking')}
        >
          <View style={styles.cardIconRow}>
            <SwapIcon size={18} color={Colors.completed} />
          </View>
          <Text style={styles.cardNumber}>4</Text>
          <Text style={styles.cardLabel}>Referrals</Text>
        </TouchableOpacity>

        {/* Card 2: My Cases */}
        <TouchableOpacity
          style={styles.dashCard}
          activeOpacity={0.85}
          onPress={() => onNavigate('case_tracking')}
        >
          <View style={styles.cardIconRow}>
            <CasesFolderIcon size={18} color={Colors.primary} />
          </View>
          <Text style={styles.cardNumber}>12</Text>
          <Text style={styles.cardLabel}>My Cases</Text>
        </TouchableOpacity>

        {/* Card 3: Wallet */}
        <TouchableOpacity
          style={styles.dashCard}
          activeOpacity={0.85}
          onPress={() => onNavigate('billing')}
        >
          <View style={styles.cardIconRow}>
            <WalletIcon size={18} color={Colors.gold} />
          </View>
          <Text style={styles.cardNumber}>14.8k</Text>
          <Text style={styles.cardLabel}>Wallet (EGP)</Text>
        </TouchableOpacity>

        {/* Card 4: Messages */}
        <TouchableOpacity
          style={styles.dashCard}
          activeOpacity={0.85}
          onPress={() => onNavigate('case_chat')}
        >
          <View style={styles.cardIconRow}>
            <ChatIcon size={18} color={Colors.waiting} />
          </View>
          <Text style={styles.cardNumber}>8</Text>
          <Text style={styles.cardLabel}>Messages</Text>
        </TouchableOpacity>
      </View>

      {/* Live Registration Analytics Banner (The Specific Counter requested) */}
      <View style={styles.analyticsCounterBanner}>
        <View style={styles.counterLeft}>
          <View style={styles.counterLiveDot} />
          <Text style={styles.counterTitle}>Live Network Sync</Text>
        </View>
        <Text style={styles.counterStatsText}>
          <Text style={{ fontWeight: '800', color: Colors.primary }}>1,420</Text> Doctors Registered •{' '}
          <Text style={{ fontWeight: '800', color: Colors.completed }}>980</Text> Verified
        </Text>
      </View>

      {/* Medical Feed Header */}
      <View style={styles.feedHeaderRow}>
        <TouchableOpacity onPress={() => onNavigate('post_case')}>
          <Text style={styles.viewAllText}>+ Post New Case</Text>
        </TouchableOpacity>
        <Text style={styles.feedTitle}>Medical Feed</Text>
      </View>

      {/* Feed Post Card (Matching approved mockup) */}
      <View style={styles.feedCard}>
        {/* Author Header */}
        <View style={styles.feedAuthorRow}>
          <View style={styles.authorAvatar}>
            <Ionicons name="person" size={20} color={Colors.primary} />
          </View>
          <View style={styles.authorMeta}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={styles.authorName}>Dr. Specialist</Text>
              <Ionicons name="checkmark-circle" size={14} color={Colors.gold} />
            </View>
            <Text style={styles.authorSpecialty}>Orthodontics • 2 hours ago</Text>
          </View>
        </View>

        {/* Post Text */}
        <Text style={styles.postBodyText}>
          .New clinical case shared for professional discussion
        </Text>
        <Text style={styles.postSubText}>
          Mandibular second molar impaction with proximity to inferior alveolar nerve canal. Seeking endo-ortho surgical consensus.
        </Text>

        {/* Clinical Case Images Box */}
        <View style={styles.clinicalImagesBox}>
          <Ionicons name="images-outline" size={32} color={Colors.textMuted} />
          <Text style={styles.clinicalBoxLabel}>Clinical case images (3 Scans)</Text>
          <Text style={styles.clinicalBoxSub}>CBCT Coronal Slice • Intraoral Photo • Diagnostic Tracing</Text>
        </View>

        {/* Action Row */}
        <View style={styles.feedActionRow}>
          <TouchableOpacity
            style={styles.discussBtn}
            onPress={() => onNavigate('case_chat')}
          >
            <Ionicons name="chatbubbles-outline" size={16} color="#FFFFFF" />
            <Text style={styles.discussBtnText}>Discuss Case</Text>
          </TouchableOpacity>

          <View style={styles.socialButtonsGroup}>
            <TouchableOpacity style={styles.socialBtn} onPress={handleLike}>
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={18}
                color={liked ? Colors.urgent : Colors.textSecondary}
              />
              <Text style={[styles.socialBtnText, liked && { color: Colors.urgent }]}>
                {likesCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialBtn}
              onPress={() => onNavigate('case_chat')}
            >
              <Ionicons name="chatbubble-outline" size={17} color={Colors.textSecondary} />
              <Text style={styles.socialBtnText}>Comment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="share-social-outline" size={17} color={Colors.textSecondary} />
              <Text style={styles.socialBtnText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Secondary Feed Post (Pediatric / General Surgery) */}
      <View style={styles.feedCard}>
        <View style={styles.feedAuthorRow}>
          <View style={[styles.authorAvatar, { backgroundColor: Colors.goldLight }]}>
            <Ionicons name="medkit" size={20} color={Colors.gold} />
          </View>
          <View style={styles.authorMeta}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={styles.authorName}>Dr. Ahmed El-Sherif</Text>
              <Ionicons name="checkmark-circle" size={14} color={Colors.gold} />
            </View>
            <Text style={styles.authorSpecialty}>Endodontic Consultant • 4 hours ago</Text>
          </View>
        </View>

        <Text style={styles.postBodyText}>
          Successful retrieval of separated rotary instrument (size 25/.06).
        </Text>
        <Text style={styles.postSubText}>
          Patient referred with acute periapical periodontitis. Retrieval accomplished under surgical microscope using ultrasonic troughing.
        </Text>

        <View style={styles.feedActionRow}>
          <TouchableOpacity
            style={styles.discussBtn}
            onPress={() => onNavigate('case_tracking')}
          >
            <Ionicons name="eye-outline" size={16} color="#FFFFFF" />
            <Text style={styles.discussBtnText}>View Referral</Text>
          </TouchableOpacity>

          <View style={styles.socialButtonsGroup}>
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="heart-outline" size={18} color={Colors.textSecondary} />
              <Text style={styles.socialBtnText}>48</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={() => onNavigate('case_chat')}
            >
              <Ionicons name="chatbubble-outline" size={17} color={Colors.textSecondary} />
              <Text style={styles.socialBtnText}>14 Comments</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Official WhatsApp & Support Footer */}
      <View style={styles.supportFooterCard}>
        <View style={styles.supportIconCircle}>
          <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.supportHeading}>Direct Medical Support</Text>
          <Text style={styles.supportPhone}>WhatsApp: 01554338033</Text>
          <Text style={styles.supportEmail}>Email: medsharem@gmail.com</Text>
        </View>
        <View style={styles.officialBadge}>
          <Text style={styles.officialBadgeText}>VERIFIED</Text>
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerHero: {
    backgroundColor: '#10243E',
    paddingTop: 18,
    paddingBottom: 26,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  circleIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circleIconBtnActive: {
    backgroundColor: Colors.gold,
  },
  notificationsBanner: {
    backgroundColor: '#0F2744',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(200, 164, 93, 0.4)',
    marginBottom: 14,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 6,
  },
  notifTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.gold,
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 6,
  },
  notifDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.completed,
    marginTop: 5,
  },
  notifItemTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  notifItemTime: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 2,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1.5,
    borderColor: Colors.gold,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#10243E',
    textAlign: 'right',
  },
  searchResultsBox: {
    backgroundColor: '#0F2744',
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchResultsTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 8,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
    gap: 10,
  },
  searchResultName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  searchResultSub: {
    fontSize: 10,
    color: '#CBD5E1',
    marginTop: 2,
  },
  headerBadge: {
    position: 'absolute',
    top: 6,
    right: 7,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.urgent,
  },
  adminBadgeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(200, 164, 93, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  adminBadgeBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.gold,
  },
  rightIconsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitleContainer: {
    marginTop: 4,
  },
  logoAndBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  officialLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  brandTitleText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  networkSubText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.gold,
    letterSpacing: 1,
    marginTop: 1,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  greetingSub: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
  },
  sectionHeaderRow: {
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dashboardSectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#10243E',
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
  },
  dashCard: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardIconRow: {
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: '#10243E',
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  analyticsCounterBanner: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  counterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  counterLiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.completed,
  },
  counterTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  counterStatsText: {
    fontSize: 11,
    color: '#64748B',
  },
  feedHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 26,
    marginBottom: 12,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#10243E',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.goldDark,
  },
  feedCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#10243E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  feedAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorMeta: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10243E',
  },
  authorSpecialty: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  postBodyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10243E',
    marginTop: 12,
  },
  postSubText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  clinicalImagesBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  clinicalBoxLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10243E',
    marginTop: 8,
  },
  clinicalBoxSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  feedActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  discussBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#10243E',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  discussBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  socialButtonsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  socialBtnText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  supportFooterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  supportIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(37, 211, 102, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10243E',
  },
  supportPhone: {
    fontSize: 12,
    fontWeight: '600',
    color: '#25D366',
    marginTop: 2,
  },
  supportEmail: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  officialBadge: {
    backgroundColor: Colors.goldLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.goldBorder,
  },
  officialBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.goldDark,
  },
});

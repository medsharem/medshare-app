import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { mockDoctorProfile } from '../data/mockData';

interface Props {
  onBack: () => void;
  onSendCase: () => void;
}

export const SpecialistProfileScreen: React.FC<Props> = ({ onBack, onSendCase }) => {
  const doc = mockDoctorProfile;

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>صفحة الدكتور المتخصص</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="heart-outline" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="ellipsis-vertical" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Doctor Main Info Card */}
        <View style={styles.profileHeaderCard}>
          <Image
            source={{ uri: doc.avatarUrl }}
            style={styles.avatar}
          />
          <View style={styles.docInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.docName}>{doc.name}</Text>
              <Ionicons name="checkmark-circle" size={18} color="#3B82F6" style={{ marginLeft: 6 }} />
            </View>
            <Text style={styles.docTitle}>{doc.title}</Text>

            <View style={styles.ratingLocationRow}>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={15} color="#FBBF24" />
                <Text style={styles.ratingText}>{doc.rating}</Text>
                <Text style={styles.reviewsCount}>({doc.reviewsCount} reviews)</Text>
              </View>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={14} color={Colors.textMuted} />
                <Text style={styles.distanceText}>{doc.distanceKm} km away</Text>
              </View>
            </View>

            <View style={styles.verifiedBadge}>
              <Ionicons name="shield-checkmark" size={14} color={Colors.primary} />
              <Text style={styles.verifiedBadgeText}>Verified Specialist</Text>
            </View>
          </View>
        </View>

        {/* 3 Metric Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{doc.yearsExp}</Text>
            <Text style={styles.statLabel}>Years Exp.</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{doc.casesCompleted}</Text>
            <Text style={styles.statLabel}>Cases Completed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{doc.avgResponseMin} min</Text>
            <Text style={styles.statLabel}>Avg. Response</Text>
          </View>
        </View>

        {/* Specialized In Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Specialized In</Text>
          <View style={styles.specialtyList}>
            {(doc.specialties || doc.subSpecialties || []).map((item, idx) => (
              <View key={idx} style={styles.specItemRow}>
                <Ionicons name="checkmark" size={18} color={Colors.gold} />
                <Text style={styles.specItemText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Clinic & Availability Information */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Clinic & Schedule</Text>
          <View style={styles.infoRow}>
            <Ionicons name="business-outline" size={18} color={Colors.primary} />
            <Text style={styles.infoRowText}>Elite Dental Specialized Center</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color={Colors.primary} />
            <Text style={styles.infoRowText}>Available: Sat - Thu (10:00 AM - 08:00 PM)</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="hardware-chip-outline" size={18} color={Colors.primary} />
            <Text style={styles.infoRowText}>Equipped with Carl Zeiss Dental Microscope</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Sticky Bottom Bar with Send Case Button */}
      <View style={styles.footerBar}>
        <TouchableOpacity
          style={styles.sendCaseBtn}
          activeOpacity={0.85}
          onPress={onSendCase}
        >
          <Text style={styles.sendCaseBtnText}>Send Case</Text>
          <Ionicons name="paper-plane" size={18} color="#0A1728" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerBtn: {
    padding: 6,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 6,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  profileHeaderCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 14,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  docInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  docTitle: {
    fontSize: 13,
    color: Colors.primary,
    marginTop: 2,
    fontWeight: '600',
  },
  ratingLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 12,
  },
  reviewsCount: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  distanceText: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
    gap: 4,
  },
  verifiedBadgeText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  statNumber: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  specialtyList: {
    gap: 10,
  },
  specItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  specItemText: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  infoRowText: {
    color: Colors.textSecondary,
    fontSize: 13,
    flex: 1,
  },
  footerBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: '#FFFFFF',
    marginBottom: 65, // Clearance for Bottom Navigation Bar on Mobile
  },
  sendCaseBtn: {
    backgroundColor: Colors.gold, // Champagne Gold for maximum visibility!
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  sendCaseBtnText: {
    color: '#0A1728', // Deep Navy text on Champagne Gold
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { sampleCaseDM10254 } from '../data/mockData';

interface Props {
  onBack: () => void;
  onChat: () => void;
  onEditCase: () => void;
}

export const CaseDetailsScreen: React.FC<Props> = ({ onBack, onChat, onEditCase }) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Files' | 'History'>('Overview');
  const c = sampleCaseDM10254;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Case #{c.id}</Text>
        <View style={styles.urgencyBadge}>
          <Text style={styles.urgencyBadgeText}>{c.urgency}</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="ellipsis-vertical" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {(['Overview', 'Files', 'History'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'Overview' && (
          <View>
            {/* Patient & Case Summary Card */}
            <View style={styles.detailsCard}>
              {/* Patient Anonymous ID */}
              <View style={styles.detailRow}>
                <Ionicons name="person-outline" size={20} color={Colors.primary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Patient (Anonymous)</Text>
                  <Text style={styles.detailValue}>ID: {c.patientCode || (c as any).patientId || 'PT-9402'}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Tooth Number */}
              <View style={styles.detailRow}>
                <Ionicons name="ellipse-outline" size={20} color={Colors.gold} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Tooth (FDI)</Text>
                  <Text style={styles.detailValue}>#{c.toothNumber || 46}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Specialty */}
              <View style={styles.detailRow}>
                <Ionicons name="medical-outline" size={20} color={Colors.primary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Specialty</Text>
                  <Text style={styles.detailValue}>{c.specialtyName || (c as any).specialty || 'Dentistry'}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Problem */}
              <View style={styles.detailRow}>
                <Ionicons name="warning-outline" size={20} color={Colors.gold} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Chief Complaint / Problem</Text>
                  <Text style={styles.detailValue}>{c.chiefComplaint || (c as any).problem || 'Separated File'}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Description */}
              <View style={styles.detailRow}>
                <Ionicons name="document-text-outline" size={20} color={Colors.primary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Clinical Findings</Text>
                  <Text style={styles.detailDesc}>{c.clinicalFindings || (c as any).description}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Urgency */}
              <View style={styles.detailRow}>
                <Ionicons name="alarm-outline" size={20} color={Colors.urgent} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Urgency</Text>
                  <Text style={[styles.detailValue, { color: Colors.urgent }]}>
                    {c.urgency}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Referring Dentist */}
              <View style={styles.detailRow}>
                <Ionicons name="person-circle-outline" size={20} color={Colors.textSecondary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Referring Doctor</Text>
                  <Text style={styles.detailValue}>
                    {typeof c.referringDoctor === 'object' ? c.referringDoctor?.name : (c.referringDoctor as any) || 'Dr. Abdelrahman Mostafa'}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Receiving Specialist */}
              <View style={styles.detailRow}>
                <Ionicons name="ribbon-outline" size={20} color={Colors.gold} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Receiving Specialist</Text>
                  <Text style={[styles.detailValue, { color: Colors.primary }]}>
                    {typeof c.specialistDoctor === 'object' ? c.specialistDoctor?.name : (c.specialistDoctor as any) || 'Dr. Ahmed El-Sherif'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'Files' && (
          <View style={styles.filesTabContainer}>
            <Text style={styles.sectionTitle}>Attached Radiographs & Clinical Media</Text>
            {c.files.map((file, idx) => (
              <View key={idx} style={styles.fileCard}>
                <View style={styles.fileIconBox}>
                  <Ionicons name="image-outline" size={22} color={Colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fileNameText}>{file.name}</Text>
                  <Text style={styles.fileTypeText}>{file.type.toUpperCase()} • 2.4 MB</Text>
                </View>
                <TouchableOpacity
                  style={styles.viewFileBtn}
                  onPress={() => Alert.alert('معاينة الملف', `جاري فتح ${file.name}`)}
                >
                  <Ionicons name="eye-outline" size={18} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'History' && (
          <View style={styles.historyContainer}>
            <Text style={styles.sectionTitle}>Audit Log & Timeline</Text>
            <View style={styles.historyItem}>
              <Text style={styles.historyDate}>22 May 2024 - 02:15 PM</Text>
              <Text style={styles.historyDesc}>Specialist started treatment session.</Text>
            </View>
            <View style={styles.historyItem}>
              <Text style={styles.historyDate}>21 May 2024 - 03:00 PM</Text>
              <Text style={styles.historyDesc}>Patient attended clinic appointment.</Text>
            </View>
            <View style={styles.historyItem}>
              <Text style={styles.historyDate}>20 May 2024 - 11:02 AM</Text>
              <Text style={styles.historyDesc}>Dr. Ahmed Mohamed accepted referral.</Text>
            </View>
            <View style={styles.historyItem}>
              <Text style={styles.historyDate}>20 May 2024 - 10:30 AM</Text>
              <Text style={styles.historyDesc}>Case published by Dr. Abdelrahman.</Text>
            </View>
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.chatButton} onPress={onChat}>
          <Ionicons name="chatbubbles-outline" size={18} color={Colors.primary} />
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={onEditCase}>
          <Text style={styles.editButtonText}>Edit Case</Text>
          <Ionicons name="create-outline" size={18} color="#0A1728" style={{ marginLeft: 6 }} />
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  headerBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
    marginLeft: 8,
  },
  urgencyBadge: {
    backgroundColor: Colors.urgentLight,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  urgencyBadgeText: {
    color: Colors.urgent,
    fontWeight: 'bold',
    fontSize: 11,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingHorizontal: 16,
  },
  tabItem: {
    paddingVertical: 12,
    marginRight: 24,
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: Colors.primary,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  detailsCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
  },
  detailValue: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  detailDesc: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  filesTabContainer: {
    gap: 12,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  fileIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileNameText: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  fileTypeText: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  viewFileBtn: {
    padding: 8,
  },
  historyContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  historyItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  historyDate: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  historyDesc: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
    gap: 12,
  },
  chatButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  chatButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  editButton: {
    flex: 1.4,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: Colors.gold,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#0A1728',
    fontWeight: '800',
    fontSize: 15,
  },
});


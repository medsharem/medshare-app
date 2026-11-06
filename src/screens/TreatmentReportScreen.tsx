import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

interface Props {
  onBack: () => void;
  onSendBack: () => void;
}

export const TreatmentReportScreen: React.FC<Props> = ({ onBack, onSendBack }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Case #DM10254</Text>
        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>Completed</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="ellipsis-vertical" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Report Card */}
        <View style={styles.reportCard}>
          <View style={styles.reportHeader}>
            <View>
              <Text style={styles.reportTitle}>Treatment Report</Text>
              <Text style={styles.reportDate}>22 May 2024 - 06:30 PM</Text>
            </View>
            <View style={styles.docMiniBadge}>
              <Ionicons name="ribbon" size={16} color={Colors.primary} />
              <Text style={styles.docMiniText}>Dr. Ahmed Mohamed</Text>
            </View>
          </View>

          {/* Procedure Performed */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>Procedure Performed</Text>
            <Text style={styles.procedureText}>
              Separated file removed successfully using ultrasonic tips under microscope.
            </Text>
          </View>

          {/* Files / Materials Used */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>Files & Materials Used</Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Ionicons name="radio-button-on" size={8} color={Colors.primary} style={{ marginTop: 5 }} />
                <Text style={styles.bulletText}>Ultrasonic Tip E6</Text>
              </View>
              <View style={styles.bulletItem}>
                <Ionicons name="radio-button-on" size={8} color={Colors.primary} style={{ marginTop: 5 }} />
                <Text style={styles.bulletText}>Carl Zeiss Dental Operating Microscope</Text>
              </View>
              <View style={styles.bulletItem}>
                <Ionicons name="radio-button-on" size={8} color={Colors.primary} style={{ marginTop: 5 }} />
                <Text style={styles.bulletText}>Irrigation: NaOCl 5.25%</Text>
              </View>
              <View style={styles.bulletItem}>
                <Ionicons name="radio-button-on" size={8} color={Colors.primary} style={{ marginTop: 5 }} />
                <Text style={styles.bulletText}>EDTA 17% solution</Text>
              </View>
            </View>
          </View>

          {/* Clinical Notes */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>Notes</Text>
            <Text style={styles.notesText}>
              Canals are clean and ready for obturation. No complications occurred during retrieval. Working length verified via apex locator.
            </Text>
          </View>

          {/* Attached Images */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>Attached Files & Radiographs</Text>
            <View style={styles.thumbGrid}>
              <View style={styles.thumbBox}>
                <Ionicons name="image" size={32} color={Colors.primary} />
                <Text style={styles.thumbLabel}>Pre-Op File</Text>
              </View>
              <View style={styles.thumbBox}>
                <Ionicons name="checkmark-circle" size={32} color={Colors.completed} />
                <Text style={styles.thumbLabel}>Retrieved File</Text>
              </View>
              <TouchableOpacity
                style={styles.moreThumbBox}
                onPress={() => Alert.alert('المرفقات الإضافية', 'عرض 2 صورة وفيديو مجهري إضافي')}
              >
                <Text style={styles.moreThumbText}>+2</Text>
                <Text style={styles.moreThumbSub}>more</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View style={styles.footerBar}>
        <TouchableOpacity
          style={styles.sendBackBtn}
          activeOpacity={0.85}
          onPress={onSendBack}
        >
          <Text style={styles.sendBackBtnText}>Send Back to Referring Dentist</Text>
          <Ionicons name="return-up-back" size={20} color="#000000" style={{ marginLeft: 8 }} />
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
    paddingBottom: 12,
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
  completedBadge: {
    backgroundColor: Colors.completedLight,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  completedBadgeText: {
    color: Colors.completed,
    fontWeight: 'bold',
    fontSize: 11,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  reportCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 12,
    marginBottom: 14,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  reportDate: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 2,
    fontWeight: '500',
  },
  docMiniBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  docMiniText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  sectionBlock: {
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  procedureText: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  bulletList: {
    gap: 6,
    marginTop: 4,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletText: {
    color: Colors.textSecondary,
    fontSize: 13,
    flex: 1,
  },
  notesText: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  thumbGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  thumbBox: {
    width: 90,
    height: 80,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  thumbLabel: {
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 4,
  },
  moreThumbBox: {
    width: 70,
    height: 80,
    borderRadius: 10,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  moreThumbText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  moreThumbSub: {
    color: Colors.textMuted,
    fontSize: 10,
  },
  footerBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  sendBackBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBackBtnText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
  },
});


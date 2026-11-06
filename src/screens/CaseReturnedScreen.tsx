import React from 'react';
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

interface Props {
  onBack: () => void;
  onViewReport: () => void;
  onViewBilling?: () => void;
  onMarkCompleted: () => void;
}

export const CaseReturnedScreen: React.FC<Props> = ({
  onBack,
  onViewReport,
  onViewBilling,
  onMarkCompleted,
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Case #DM10254</Text>
        <View style={styles.returnedBadge}>
          <Text style={styles.returnedBadgeText}>Returned</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="ellipsis-vertical" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Returned Notification Card */}
        <View style={styles.returnedCard}>
          <View style={styles.returnedIconBox}>
            <Ionicons name="checkmark-done" size={26} color={Colors.completed} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.returnedTitle}>Case Returned</Text>
            <Text style={styles.returnedDate}>22 May 2024 - 07:15 PM</Text>
            <Text style={styles.returnedDoc}>by Dr. Ahmed Mohamed</Text>
          </View>
        </View>

        {/* Specialist Report Bar */}
        <TouchableOpacity
          style={styles.viewReportRow}
          activeOpacity={0.8}
          onPress={onViewReport}
        >
          <View style={styles.reportRowLeft}>
            <Ionicons name="document-text" size={20} color={Colors.primary} />
            <Text style={styles.reportRowText}>Specialist Report</Text>
          </View>
          <View style={styles.reportRowRight}>
            <Text style={styles.viewReportLink}>View Report</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Financial Settlement & Billing Bar */}
        {onViewBilling && (
          <TouchableOpacity
            style={styles.viewReportRow}
            activeOpacity={0.8}
            onPress={onViewBilling}
          >
            <View style={styles.reportRowLeft}>
              <Ionicons name="wallet-outline" size={20} color={Colors.completed} />
              <Text style={styles.reportRowText}>فاتورة الإجراء وتحصيل الرسوم (2,400 ج.م)</Text>
            </View>
            <View style={styles.reportRowRight}>
              <Text style={[styles.viewReportLink, { color: Colors.completed }]}>عرض الفاتورة</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.completed} />
            </View>
          </TouchableOpacity>
        )}

        {/* Next Steps Card */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Next Steps for General Dentist</Text>
          <View style={styles.stepsList}>
            <View style={styles.stepItem}>
              <Ionicons name="radio-button-on" size={10} color={Colors.primary} style={{ marginTop: 5 }} />
              <Text style={styles.stepItemText}>Complete obturation</Text>
            </View>
            <View style={styles.stepItem}>
              <Ionicons name="radio-button-on" size={10} color={Colors.primary} style={{ marginTop: 5 }} />
              <Text style={styles.stepItemText}>Build up (Core restoration)</Text>
            </View>
            <View style={styles.stepItem}>
              <Ionicons name="radio-button-on" size={10} color={Colors.primary} style={{ marginTop: 5 }} />
              <Text style={styles.stepItemText}>Final restoration (Crown / Overlay)</Text>
            </View>
          </View>
        </View>

        {/* Notes from Specialist */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Notes from Specialist</Text>
          <Text style={styles.specialistNotes}>
            Canals are clean, shaped, and ready for obturation. No apical perforation or canal wall stripping detected. Temporary seal applied with Cavit.
          </Text>
        </View>

        {/* Patient Review & Feedback prompt */}
        <View style={styles.feedbackBanner}>
          <Ionicons name="star" size={20} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.feedbackTitle}>تقييم الإجراء والأخصائي</Text>
            <Text style={styles.feedbackSub}>تقييمك يساعد في رفع جودة شبكة DentMatch</Text>
          </View>
          <TouchableOpacity
            style={styles.rateBtn}
            onPress={() => Alert.alert('تقييم الأخصائي', 'تم تقييم دكتور أحمد محمد بـ 5 نجوم بنجاح!')}
          >
            <Text style={styles.rateBtnText}>تقييم</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View style={styles.footerBar}>
        <TouchableOpacity
          style={styles.completeBtn}
          activeOpacity={0.85}
          onPress={onMarkCompleted}
        >
          <Text style={styles.completeBtnText}>Mark as Completed</Text>
          <Ionicons name="checkmark-circle" size={20} color="#000000" style={{ marginLeft: 8 }} />
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
  returnedBadge: {
    backgroundColor: Colors.returnedLight,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  returnedBadgeText: {
    color: Colors.returned,
    fontWeight: 'bold',
    fontSize: 11,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  returnedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 14,
  },
  returnedIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.completedLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  returnedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  returnedDate: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 2,
    fontWeight: '500',
  },
  returnedDoc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  viewReportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 14,
  },
  reportRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reportRowText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  reportRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewReportLink: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  stepsList: {
    gap: 10,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  stepItemText: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  specialistNotes: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  feedbackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  feedbackTitle: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  feedbackSub: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  rateBtn: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  rateBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  footerBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  completeBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeBtnText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
  },
});


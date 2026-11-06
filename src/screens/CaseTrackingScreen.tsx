import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

interface Props {
  onBack: () => void;
  onChat: () => void;
  onViewCase: () => void;
  onViewReport: () => void;
}

export const CaseTrackingScreen: React.FC<Props> = ({
  onBack,
  onChat,
  onViewCase,
  onViewReport,
}) => {
  const steps = [
    {
      id: 1,
      title: 'Case Created',
      time: '20 May 2024 - 10:30 AM',
      subtitle: 'by Dr. Abdelrahman',
      isCompleted: true,
      icon: 'checkmark-circle',
      iconColor: Colors.completed,
    },
    {
      id: 2,
      title: 'Accepted',
      time: '20 May 2024 - 11:02 AM',
      subtitle: 'by Dr. Ahmed Mohamed',
      isCompleted: true,
      icon: 'checkmark-circle',
      iconColor: Colors.completed,
    },
    {
      id: 3,
      title: 'Appointment Scheduled',
      time: '21 May 2024 - 03:00 PM',
      subtitle: 'At Dr. Ahmed Clinic',
      isCompleted: true,
      icon: 'calendar',
      iconColor: Colors.underTreatment,
    },
    {
      id: 4,
      title: 'Under Treatment',
      time: '22 May 2024 - 02:15 PM',
      subtitle: 'Treatment is in progress',
      isCurrent: true,
      icon: 'pulse',
      iconColor: Colors.underTreatment,
    },
    {
      id: 5,
      title: 'Completed',
      time: 'Estimated Today',
      subtitle: 'Waiting for completion report',
      isPending: true,
      icon: 'ellipse-outline',
      iconColor: Colors.textMuted,
    },
    {
      id: 6,
      title: 'Returned to Referring Dentist',
      time: 'Next Phase',
      subtitle: 'Waiting for return',
      isPending: true,
      icon: 'return-up-back',
      iconColor: Colors.textMuted,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Case #DM10254</Text>
        <View style={styles.urgencyBadge}>
          <Text style={styles.urgencyBadgeText}>High</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="ellipsis-vertical" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Status Highlight Banner */}
        <View style={styles.statusBanner}>
          <View style={styles.statusIndicatorRow}>
            <View style={styles.statusActiveDot} />
            <Text style={styles.statusHeadline}>Status: </Text>
            <Text style={styles.statusState}>Under Treatment</Text>
          </View>
          <Text style={styles.statusHelper}>
            Specialist is currently executing the procedure. You will receive an instant notification when treatment report is submitted.
          </Text>
        </View>

        {/* Vertical Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineSectionTitle}>تتبع مسار الحالة خطوة بخطوة</Text>

          <View style={styles.timelineList}>
            {steps.map((st, idx) => {
              const isLast = idx === steps.length - 1;
              return (
                <View key={st.id} style={styles.timelineItemRow}>
                  {/* Left Column: Icon & Connecting Line */}
                  <View style={styles.lineCol}>
                    <View
                      style={[
                        styles.iconCircle,
                        st.isCurrent && styles.currentIconCircle,
                      ]}
                    >
                      <Ionicons name={st.icon as any} size={18} color={st.iconColor} />
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.verticalLine,
                          st.isCompleted && styles.completedLine,
                        ]}
                      />
                    )}
                  </View>

                  {/* Right Column: Step Info */}
                  <View style={styles.stepInfoCol}>
                    <View style={styles.stepInfoTop}>
                      <Text
                        style={[
                          styles.stepTitle,
                          st.isCurrent && { color: Colors.primary, fontWeight: 'bold' },
                        ]}
                      >
                        {st.title}
                      </Text>
                    </View>
                    <Text style={styles.stepTime}>{st.time}</Text>
                    <Text style={styles.stepSubtitle}>{st.subtitle}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Quick Shortcut to Specialist Report Preview */}
        <TouchableOpacity
          style={styles.reportPreviewBtn}
          activeOpacity={0.8}
          onPress={onViewReport}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.reportPreviewTitle}>عرض تقرير الإجراء الطبي</Text>
            <Text style={styles.reportPreviewSubtitle}>معاينة تقرير الأخصائي وملفات الأشعة بعد العملية</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.chatButton}
          activeOpacity={0.8}
          onPress={onChat}
        >
          <Ionicons name="chatbubbles-outline" size={18} color={Colors.primary} />
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewCaseButton}
          activeOpacity={0.85}
          onPress={onViewCase}
        >
          <Text style={styles.viewCaseButtonText}>View Case</Text>
          <Ionicons name="document-text-outline" size={18} color="#000000" style={{ marginLeft: 6 }} />
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
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  statusBanner: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 16,
  },
  statusIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusActiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.underTreatment,
    marginRight: 8,
  },
  statusHeadline: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  statusState: {
    color: Colors.underTreatment,
    fontSize: 15,
    fontWeight: 'bold',
  },
  statusHelper: {
    color: Colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  timelineCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 16,
  },
  timelineSectionTitle: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
  },
  timelineList: {
    paddingLeft: 4,
  },
  timelineItemRow: {
    flexDirection: 'row',
  },
  lineCol: {
    alignItems: 'center',
    width: 32,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    zIndex: 2,
  },
  currentIconCircle: {
    borderColor: Colors.underTreatment,
    backgroundColor: Colors.underTreatmentLight,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    minHeight: 36,
    backgroundColor: Colors.border,
    marginVertical: -2,
    zIndex: 1,
  },
  completedLine: {
    backgroundColor: Colors.completed,
  },
  stepInfoCol: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 22,
  },
  stepInfoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepTitle: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  stepTime: {
    color: Colors.primary,
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  stepSubtitle: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  reportPreviewBtn: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reportPreviewTitle: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  reportPreviewSubtitle: {
    color: Colors.textMuted,
    fontSize: 11,
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
  viewCaseButton: {
    flex: 1.4,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCaseButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
});


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { platformAnalyticsData, specialtiesList } from '../data/mockData';

interface Props {
  onBackToDoctorView: () => void;
  onNavigate: (screen: string) => void;
}

interface VerificationRequest {
  id: string;
  name: string;
  specialty: string;
  syndicateId: string;
  hospital: string;
  submittedAt: string;
  documentType: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const AdminDashboardScreen: React.FC<Props> = ({
  onBackToDoctorView,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'referrals' | 'revenue'>('overview');
  const [searchDoctor, setSearchDoctor] = useState<string>('');

  const [verificationQueue, setVerificationQueue] = useState<VerificationRequest[]>([
    {
      id: 'V-101',
      name: 'Dr. Mahmoud Tarek',
      specialty: 'Cardiology (أمراض القلب)',
      syndicateId: 'SYND-89412',
      hospital: 'Ain Shams Specialized Hospital',
      submittedAt: 'Today at 09:30 AM',
      documentType: 'Medical Syndicate License & Specialist Degree',
      status: 'Pending',
    },
    {
      id: 'V-102',
      name: 'Dr. Sara Nabil',
      specialty: 'Orthopedics (جراحة العظام)',
      syndicateId: 'SYND-76231',
      hospital: 'Kasr Al Ainy Hospital',
      submittedAt: 'Today at 08:15 AM',
      documentType: 'Consultant Fellowship Certificate',
      status: 'Pending',
    },
    {
      id: 'V-103',
      name: 'Dr. Karim Hossam',
      specialty: 'Dentistry (جراحة الفم والفكين)',
      syndicateId: 'SYND-55104',
      hospital: 'Al-Galaa Military Medical Center',
      submittedAt: 'Yesterday at 04:45 PM',
      documentType: 'Ministry of Health Practice License',
      status: 'Pending',
    },
  ]);

  const handleApprove = (id: string) => {
    setVerificationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Approved' } : item))
    );
  };

  const handleReject = (id: string) => {
    setVerificationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Rejected' } : item))
    );
  };

  const pendingCount = verificationQueue.filter((v) => v.status === 'Pending').length;

  return (
    <View style={styles.container}>
      {/* Top Admin Security Bar */}
      <View style={styles.adminTopBar}>
        <View style={styles.adminLeftInfo}>
          <View style={styles.adminShieldBadge}>
            <Ionicons name="shield-checkmark" size={18} color={Colors.gold} />
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.adminTitle}>MEDSHARE Control Center</Text>
              <View style={styles.superAdminPill}>
                <Text style={styles.superAdminText}>FOUNDER / ADMIN</Text>
              </View>
            </View>
            <Text style={styles.adminDoctorName}>Dr. Abdelrahman Mostafa (Full System Authority)</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.switchRoleButton}
          onPress={onBackToDoctorView}
          activeOpacity={0.8}
        >
          <Ionicons name="swap-horizontal" size={14} color="#FFFFFF" />
          <Text style={styles.switchRoleText}>Doctor View</Text>
        </TouchableOpacity>
      </View>

      {/* Admin Sub Navigation Tabs */}
      <View style={styles.adminTabsRow}>
        {[
          { key: 'overview', label: 'Platform Stats' },
          { key: 'verification', label: `Verifications (${pendingCount})` },
          { key: 'referrals', label: 'All Referrals' },
          { key: 'revenue', label: 'Financial Center' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.adminTab,
              activeTab === tab.key && styles.adminTabActive,
            ]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Text
              style={[
                styles.adminTabText,
                activeTab === tab.key && styles.adminTabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {/* TAB 1: OVERVIEW & SYSTEM HEALTH */}
        {activeTab === 'overview' && (
          <View>
            {/* Live Master Metric Cards */}
            <View style={styles.masterStatsGrid}>
              <View style={styles.masterStatBox}>
                <View style={styles.statIconBox}>
                  <Ionicons name="people" size={20} color={Colors.primary} />
                </View>
                <Text style={styles.statBigNumber}>{platformAnalyticsData.totalDoctors.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Total Registered Doctors</Text>
                <View style={styles.statFooterRow}>
                  <Text style={styles.statGreenText}>+{pendingCount} pending review</Text>
                </View>
              </View>

              <View style={styles.masterStatBox}>
                <View style={[styles.statIconBox, { backgroundColor: Colors.completedLight }]}>
                  <Ionicons name="checkmark-done-circle" size={20} color={Colors.completed} />
                </View>
                <Text style={[styles.statBigNumber, { color: Colors.completed }]}>
                  {platformAnalyticsData.verifiedDoctors.toLocaleString()}
                </Text>
                <Text style={styles.statLabel}>Verified Doctors & Consultants</Text>
                <View style={styles.statFooterRow}>
                  <Text style={styles.statMutedText}>69% Verified Rate</Text>
                </View>
              </View>

              <View style={styles.masterStatBox}>
                <View style={[styles.statIconBox, { backgroundColor: Colors.goldLight }]}>
                  <Ionicons name="swap-horizontal" size={20} color={Colors.gold} />
                </View>
                <Text style={styles.statBigNumber}>{platformAnalyticsData.totalReferrals}</Text>
                <Text style={styles.statLabel}>Total Patient Referrals</Text>
                <View style={styles.statFooterRow}>
                  <Text style={styles.statGreenText}>{platformAnalyticsData.completedReferrals} Completed</Text>
                </View>
              </View>

              <View style={styles.masterStatBox}>
                <View style={[styles.statIconBox, { backgroundColor: Colors.waitingLight }]}>
                  <Ionicons name="cash-outline" size={20} color={Colors.waiting} />
                </View>
                <Text style={[styles.statBigNumber, { color: Colors.waiting }]}>425k</Text>
                <Text style={styles.statLabel}>Total Referral Volume (EGP)</Text>
                <View style={styles.statFooterRow}>
                  <Text style={styles.statGreenText}>Platform Fee: 15%</Text>
                </View>
              </View>
            </View>

            {/* Quick Action Queue Banner */}
            <View style={styles.actionBanner}>
              <View style={styles.actionBannerLeft}>
                <View style={styles.bellPill}>
                  <Ionicons name="alert-circle" size={16} color={Colors.urgent} />
                  <Text style={styles.bellPillText}>{pendingCount} Doctors Awaiting Verification</Text>
                </View>
                <Text style={styles.actionBannerSub}>
                  Review syndicate IDs and practice licenses to grant official Verified Badges.
                </Text>
              </View>
              <TouchableOpacity
                style={styles.reviewNowBtn}
                onPress={() => setActiveTab('verification')}
              >
                <Text style={styles.reviewNowBtnText}>Review Queue</Text>
              </TouchableOpacity>
            </View>

            {/* Visual Cloud Storage & Radiographs Indicator */}
            <View style={styles.storageCard}>
              <View style={styles.storageCardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={styles.storageIconCircle}>
                    <Ionicons name="cloud-done" size={20} color={Colors.gold} />
                  </View>
                  <View>
                    <Text style={styles.storageTitle}>سيرفر الأشعة والمستندات (Cloud Storage)</Text>
                    <Text style={styles.storageSub}>سيرفرات Google Firebase السحابية المشفرة</Text>
                  </View>
                </View>
                <View style={styles.storageFreeTierPill}>
                  <Text style={styles.storageFreeTierText}>الباقة المجانية (Free Tier)</Text>
                </View>
              </View>

              <View style={styles.storageNumbersRow}>
                <Text style={styles.storageUsedText}>
                  المستهلك: <Text style={{ fontWeight: '900', color: Colors.primary }}>1.2 GB</Text> من أصل 5.0 GB
                </Text>
                <Text style={styles.storageRemainingText}>المتبقي: 3.8 GB (76% مساحة فارغة)</Text>
              </View>

              {/* Graphical Progress Bar */}
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: '24%' }]} />
              </View>

              <View style={styles.storageFooterRow}>
                <View style={styles.storageHealthLeft}>
                  <Ionicons name="checkmark-circle" size={14} color={Colors.completed} />
                  <Text style={styles.storageHealthText}>
                    المساحة الحالية تكفي لحوالي <Text style={{ fontWeight: '800' }}>3,800 صورة أشعة إضافية</Text> مجاناً
                  </Text>
                </View>
                <View style={styles.alertPill}>
                  <Ionicons name="notifications" size={12} color="#D97706" />
                  <Text style={styles.alertPillText}>تنبيه تلقائي عند 80%</Text>
                </View>
              </View>
            </View>

            {/* Specialties Distribution in Egypt */}
            <View style={styles.specialtiesCard}>
              <View style={styles.cardTitleRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="pie-chart-outline" size={18} color={Colors.primary} />
                  <Text style={styles.cardTitle}>Registered Specialties Breakdown</Text>
                </View>
                <Text style={styles.subTitleSmall}>Across Cairo, Giza, Alexandria</Text>
              </View>

              <View style={styles.specialtiesListAdmin}>
                {specialtiesList.slice(0, 6).map((sp) => (
                  <View key={sp.id} style={styles.specialtyRowAdmin}>
                    <View style={styles.spNameGroup}>
                      <Ionicons name={sp.icon as any} size={16} color={Colors.gold} />
                      <Text style={styles.spNameText}>{sp.arabicName}</Text>
                    </View>
                    <View style={styles.spBarContainer}>
                      <View
                        style={[
                          styles.spBarFill,
                          { width: `${Math.min(100, ((sp.count || 50) / 480) * 100)}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.spCountText}>{sp.count} docs</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* System Server Status */}
            <View style={styles.serverStatusCard}>
              <View style={styles.statusRowLeft}>
                <View style={styles.onlinePulseDot} />
                <View>
                  <Text style={styles.serverStatusTitle}>Google Firebase Cloud Cluster: Operational</Text>
                  <Text style={styles.serverStatusSub}>
                    Latency: 24ms • Storage: 1.1 GB / 5.0 GB Free Tier • Uptime: 99.98%
                  </Text>
                </View>
              </View>
              <View style={styles.serverBadge}>
                <Text style={styles.serverBadgeText}>HEALTHY</Text>
              </View>
            </View>
          </View>
        )}

        {/* TAB 2: DOCTOR VERIFICATION QUEUE */}
        {activeTab === 'verification' && (
          <View>
            <View style={styles.searchBarContainer}>
              <Ionicons name="search" size={18} color={Colors.textMuted} />
              <TextInput
                style={styles.adminSearchInput}
                placeholder="Search by doctor name, specialty, or syndicate ID..."
                value={searchDoctor}
                onChangeText={setSearchDoctor}
              />
            </View>

            <Text style={styles.queueHeaderTitle}>
              Verification Requests Requiring Action ({verificationQueue.length}):
            </Text>

            {verificationQueue.map((item) => (
              <View key={item.id} style={styles.requestCard}>
                <View style={styles.requestTop}>
                  <View style={styles.requestDoctorAvatar}>
                    <Ionicons name="medkit" size={20} color={Colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={styles.requestDoctorName}>{item.name}</Text>
                      <View
                        style={[
                          styles.statusBadge,
                          item.status === 'Approved' && { backgroundColor: Colors.completedLight },
                          item.status === 'Rejected' && { backgroundColor: Colors.urgentLight },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusBadgeText,
                            item.status === 'Approved' && { color: Colors.completed },
                            item.status === 'Rejected' && { color: Colors.urgent },
                          ]}
                        >
                          {item.status.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.requestSpecialtyText}>{item.specialty}</Text>
                    <Text style={styles.requestHospitalText}>
                      {item.hospital} • {item.syndicateId}
                    </Text>
                  </View>
                </View>

                {/* Uploaded Verification Docs */}
                <View style={styles.docAttachmentBox}>
                  <Ionicons name="document-attach" size={18} color={Colors.gold} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.docAttachmentTitle}>{item.documentType}</Text>
                    <Text style={styles.docAttachmentSub}>Verified against Egyptian Medical Syndicate registry</Text>
                  </View>
                  <TouchableOpacity style={styles.viewDocBtn}>
                    <Text style={styles.viewDocBtnText}>Inspect Document</Text>
                  </TouchableOpacity>
                </View>

                {/* Action Buttons */}
                {item.status === 'Pending' ? (
                  <View style={styles.decisionRow}>
                    <TouchableOpacity
                      style={styles.rejectBtn}
                      onPress={() => handleReject(item.id)}
                    >
                      <Ionicons name="close" size={16} color={Colors.urgent} />
                      <Text style={styles.rejectBtnText}>Reject Application</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.approveBtn}
                      onPress={() => handleApprove(item.id)}
                    >
                      <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                      <Text style={styles.approveBtnText}>Approve & Issue Badge</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.decisionCompletedBanner}>
                    <Ionicons
                      name={item.status === 'Approved' ? 'checkmark-circle' : 'close-circle'}
                      size={16}
                      color={item.status === 'Approved' ? Colors.completed : Colors.urgent}
                    />
                    <Text style={styles.decisionCompletedText}>
                      Decision Recorded: Doctor {item.status.toLowerCase()} by Dr. Abdelrahman
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* TAB 3: REFERRALS MONITOR */}
        {activeTab === 'referrals' && (
          <View>
            <View style={styles.referralsHeaderBox}>
              <Text style={styles.referralsTitle}>Active Platform Referrals (Live Triage)</Text>
              <Text style={styles.referralsSub}>
                Every clinical case transferred between referring GPs and specialists in Egypt.
              </Text>
            </View>

            {[
              {
                id: 'MS-8924',
                patient: 'PT-9402',
                specialty: 'Dentistry (Endodontics)',
                from: 'Dr. Abdelrahman Mostafa',
                to: 'Dr. Ahmed El-Sherif',
                urgency: 'Urgent',
                status: 'In Progress',
                fee: 'EGP 3,850',
              },
              {
                id: 'MS-8925',
                patient: 'PT-7104',
                specialty: 'Cardiology (Angioplasty)',
                from: 'Dr. Khaled Samir (GP)',
                to: 'Dr. Mahmoud Tarek (Consultant)',
                urgency: 'Emergency',
                status: 'Accepted',
                fee: 'EGP 12,500',
              },
              {
                id: 'MS-8926',
                patient: 'PT-6309',
                specialty: 'Orthopedics (ACL Reconstruction)',
                from: 'Dr. Mona Fathi (Physiotherapist)',
                to: 'Dr. Sara Nabil (Orthopedic Surgeon)',
                urgency: 'Normal',
                status: 'Appointment Set',
                fee: 'EGP 8,200',
              },
            ].map((ref) => (
              <View key={ref.id} style={styles.referralAuditCard}>
                <View style={styles.auditCardTop}>
                  <View style={styles.refCodeBadge}>
                    <Text style={styles.refCodeText}>{ref.id}</Text>
                  </View>
                  <Text style={styles.refSpecialtyText}>{ref.specialty}</Text>
                  <View style={[styles.urgencyBadge, ref.urgency === 'Emergency' && { backgroundColor: Colors.urgentLight }]}>
                    <Text style={[styles.urgencyBadgeText, ref.urgency === 'Emergency' && { color: Colors.urgent }]}>
                      {ref.urgency}
                    </Text>
                  </View>
                </View>

                <View style={styles.auditFlowRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.flowLabel}>Referring Doctor:</Text>
                    <Text style={styles.flowDoctorName}>{ref.from}</Text>
                  </View>
                  <Ionicons name="arrow-forward" size={16} color={Colors.gold} style={{ marginHorizontal: 8 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.flowLabel}>Assigned Specialist:</Text>
                    <Text style={styles.flowDoctorName}>{ref.to}</Text>
                  </View>
                </View>

                <View style={styles.auditFooterRow}>
                  <Text style={styles.auditStatusText}>
                    Status: <Text style={{ color: Colors.completed, fontWeight: '700' }}>{ref.status}</Text>
                  </Text>
                  <Text style={styles.auditFeeText}>Procedure Value: {ref.fee}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* TAB 4: FINANCIAL & REVENUE */}
        {activeTab === 'revenue' && (
          <View>
            <View style={styles.revenueBannerCard}>
              <Text style={styles.revenueBannerLabel}>Platform Gross Referral Volume</Text>
              <Text style={styles.revenueBannerAmount}>EGP 425,000</Text>
              <Text style={styles.revenueBannerSub}>
                15% Platform Commission: <Text style={{ color: Colors.gold, fontWeight: '800' }}>EGP 63,750</Text>
              </Text>
            </View>

            <View style={styles.payoutSettingsBox}>
              <Text style={styles.payoutSettingsTitle}>Connected Payout Gateways (Egypt)</Text>
              <View style={styles.gatewayItem}>
                <Ionicons name="flash" size={20} color="#7C3AED" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.gatewayName}>InstaPay IPN Settlement</Text>
                  <Text style={styles.gatewayDesc}>Instant bank account & IPA transfer</Text>
                </View>
                <View style={styles.activePill}><Text style={styles.activePillText}>CONNECTED</Text></View>
              </View>
              <View style={styles.gatewayItem}>
                <Ionicons name="phone-portrait" size={20} color="#DC2626" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.gatewayName}>Vodafone Cash & Mobile Wallets</Text>
                  <Text style={styles.gatewayDesc}>Direct merchant e-wallet payouts</Text>
                </View>
                <View style={styles.activePill}><Text style={styles.activePillText}>CONNECTED</Text></View>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  adminTopBar: {
    backgroundColor: '#0A1728',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.gold,
  },
  adminLeftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  adminShieldBadge: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(200, 164, 93, 0.15)',
    borderWidth: 1,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  superAdminPill: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  superAdminText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#0A1728',
  },
  adminDoctorName: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  switchRoleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  switchRoleText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  adminTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 8,
  },
  adminTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  adminTabActive: {
    borderBottomColor: Colors.gold,
  },
  adminTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  adminTabTextActive: {
    color: '#10243E',
    fontWeight: '800',
  },
  scrollBody: {
    flex: 1,
    padding: 16,
  },
  masterStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  masterStatBox: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statIconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statBigNumber: {
    fontSize: 26,
    fontWeight: '900',
    color: '#10243E',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  statFooterRow: {
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  statGreenText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.completed,
  },
  statMutedText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  actionBanner: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBannerLeft: {
    flex: 1,
  },
  bellPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bellPillText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
  },
  actionBannerSub: {
    fontSize: 11,
    color: '#78350F',
    marginTop: 3,
  },
  reviewNowBtn: {
    backgroundColor: '#D97706',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  reviewNowBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  storageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginTop: 14,
    borderWidth: 1.5,
    borderColor: Colors.goldBorder,
  },
  storageCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  storageIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(200, 164, 93, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storageTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#10243E',
  },
  storageSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  storageFreeTierPill: {
    backgroundColor: Colors.completedLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.completedBorder,
  },
  storageFreeTierText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.completed,
  },
  storageNumbersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storageUsedText: {
    fontSize: 12,
    color: '#475569',
  },
  storageRemainingText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.completed,
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: '#F1F5F9',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.completed,
    borderRadius: 5,
  },
  storageFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  storageHealthLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  storageHealthText: {
    fontSize: 10,
    color: '#64748B',
  },
  alertPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  alertPillText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#B45309',
  },
  specialtiesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10243E',
  },
  subTitleSmall: {
    fontSize: 10,
    color: '#94A3B8',
  },
  specialtiesListAdmin: {
    gap: 10,
  },
  specialtyRowAdmin: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  spNameGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 140,
  },
  spNameText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10243E',
  },
  spBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  spBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  spCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    width: 50,
    textAlign: 'right',
  },
  serverStatusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  onlinePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.completed,
  },
  serverStatusTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10243E',
  },
  serverStatusSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  serverBadge: {
    backgroundColor: Colors.completedLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  serverBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.completed,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  adminSearchInput: {
    flex: 1,
    fontSize: 12,
    color: '#10243E',
  },
  queueHeaderTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10243E',
    marginBottom: 10,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  requestTop: {
    flexDirection: 'row',
    gap: 12,
  },
  requestDoctorAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestDoctorName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#10243E',
  },
  statusBadge: {
    backgroundColor: Colors.waitingLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.waiting,
  },
  requestSpecialtyText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.goldDark,
    marginTop: 2,
  },
  requestHospitalText: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  docAttachmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  docAttachmentTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10243E',
  },
  docAttachmentSub: {
    fontSize: 9,
    color: '#94A3B8',
  },
  viewDocBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  viewDocBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
  decisionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  rejectBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 9,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.urgentBorder,
    backgroundColor: Colors.urgentLight,
  },
  rejectBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.urgent,
  },
  approveBtn: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 9,
    borderRadius: 6,
    backgroundColor: Colors.completed,
  },
  approveBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  decisionCompletedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  decisionCompletedText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  referralsHeaderBox: {
    marginBottom: 12,
  },
  referralsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#10243E',
  },
  referralsSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  referralAuditCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  auditCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  refCodeBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  refCodeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
  },
  refSpecialtyText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10243E',
    flex: 1,
  },
  urgencyBadge: {
    backgroundColor: Colors.waitingLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  urgencyBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.waiting,
  },
  auditFlowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  flowLabel: {
    fontSize: 9,
    color: '#94A3B8',
  },
  flowDoctorName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10243E',
  },
  auditFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  auditStatusText: {
    fontSize: 10,
    color: '#64748B',
  },
  auditFeeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.completed,
  },
  revenueBannerCard: {
    backgroundColor: '#10243E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  revenueBannerLabel: {
    fontSize: 12,
    color: '#CBD5E1',
    fontWeight: '600',
  },
  revenueBannerAmount: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 6,
  },
  revenueBannerSub: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  payoutSettingsBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  payoutSettingsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10243E',
    marginBottom: 12,
  },
  gatewayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  gatewayName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10243E',
  },
  gatewayDesc: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  activePill: {
    backgroundColor: Colors.completedLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activePillText: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.completed,
  },
});


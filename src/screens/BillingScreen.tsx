import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

interface Props {
  onBack: () => void;
  onViewCaseDetails?: () => void;
}

interface ModalData {
  title: string;
  amount?: string;
  details: string;
  account?: string;
  refCode?: string;
}

export const BillingScreen: React.FC<Props> = ({ onBack, onViewCaseDetails }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'withdraw'>('overview');
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const showModal = (title: string, details: string, amount?: string, account?: string) => {
    setModalData({
      title,
      details,
      amount,
      account,
      refCode: 'IP-' + Math.floor(100000 + Math.random() * 900000),
    });
  };

  const transactions = [
    {
      id: 'TXN-9021',
      caseId: 'DM10254',
      patientId: 'P-874512',
      procedure: 'Broken Instrument Removal (Tooth 46)',
      doctor: 'Dr. Ahmed Mohamed',
      amount: 2400,
      commission: 120,
      referralBonus: 360,
      status: 'Ready for Settlement',
      date: '22 May 2024 - 07:15 PM',
      isIncome: true,
    },
    {
      id: 'TXN-8942',
      caseId: 'DM10190',
      patientId: 'P-873104',
      procedure: 'Molar Apicoectomy (Tooth 36)',
      doctor: 'Dr. Tarek Hossam',
      amount: 3200,
      commission: 160,
      referralBonus: 480,
      status: 'Completed',
      date: '18 May 2024 - 02:40 PM',
      isIncome: true,
    },
    {
      id: 'TXN-8810',
      caseId: 'DM09951',
      patientId: 'P-871992',
      procedure: 'Complex Retreatment (Tooth 16)',
      doctor: 'Dr. Sara Mostafa',
      amount: 1800,
      commission: 90,
      referralBonus: 270,
      status: 'Completed',
      date: '12 May 2024 - 11:15 AM',
      isIncome: true,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تحصيل الرسوم والفواتير المالية</Text>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => showModal('فريق الدعم المالي', 'فريق المحاسبة والتحصيل في DentMatch متاح لخدمتك 24/7 عبر واتساب وهاتفياً.')}
        >
          <Ionicons name="help-circle-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'overview' && styles.tabItemActive]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>
            المحفظة والرصيد
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'invoices' && styles.tabItemActive]}
          onPress={() => setActiveTab('invoices')}
        >
          <Text style={[styles.tabText, activeTab === 'invoices' && styles.tabTextActive]}>
            فواتير الحالات
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'withdraw' && styles.tabItemActive]}
          onPress={() => setActiveTab('withdraw')}
        >
          <Text style={[styles.tabText, activeTab === 'withdraw' && styles.tabTextActive]}>
            طرق التحصيل والسحب
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* ================= TAB 1: OVERVIEW & WALLET ================= */}
        {activeTab === 'overview' && (
          <View>
            {/* Wallet Big Card */}
            <View style={styles.walletCard}>
              <View style={styles.walletTop}>
                <View>
                  <Text style={styles.walletLabel}>الرصيد المتاح للتحصيل / السحب</Text>
                  <Text style={styles.walletBalance}>14,850 <Text style={styles.currency}>ج.م</Text></Text>
                </View>
                <View style={styles.walletBadge}>
                  <Ionicons name="shield-checkmark" size={16} color={Colors.completed} />
                  <Text style={styles.walletBadgeText}>محفظة مؤمنة</Text>
                </View>
              </View>

              <View style={styles.walletStatsRow}>
                <View style={styles.walletStatItem}>
                  <Text style={styles.walletStatSub}>قيد التحصيل</Text>
                  <Text style={styles.walletStatVal}>2,400 ج.م</Text>
                </View>
                <View style={styles.walletStatDivider} />
                <View style={styles.walletStatItem}>
                  <Text style={styles.walletStatSub}>أرباح الإحالات</Text>
                  <Text style={[styles.walletStatVal, { color: Colors.completed }]}>+1,110 ج.م</Text>
                </View>
                <View style={styles.walletStatDivider} />
                <View style={styles.walletStatItem}>
                  <Text style={styles.walletStatSub}>عمولات المنصة</Text>
                  <Text style={styles.walletStatVal}>-370 ج.م</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionBtnRow}>
                <TouchableOpacity
                  style={styles.primaryActionBtn}
                  onPress={() => setActiveTab('withdraw')}
                >
                  <Ionicons name="arrow-up-circle" size={18} color="#000000" />
                  <Text style={styles.primaryActionBtnText}>سحب الأرباح</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryActionBtn}
                  onPress={() => showModal('شحن رصيد الإحالات', 'تم إنشاء رابط دفع سريع لشحن محفظة الحالات عبر كود فوري أو InstaPay', '500 ج.م')}
                >
                  <Ionicons name="add-circle-outline" size={18} color={Colors.primary} />
                  <Text style={styles.secondaryActionBtnText}>شحن رصيد</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Current Active Case Settlement Preview (Case #DM10254) */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>تسوية الحالة النشطة الحالية</Text>
              <View style={styles.tagActive}>
                <Text style={styles.tagActiveText}>Case #DM10254</Text>
              </View>
            </View>

            <View style={styles.caseInvoiceCard}>
              <View style={styles.invoiceRow}>
                <Text style={styles.invoiceItemName}>أتعاب الإجراء (إزالة فايل مكسور بالميكروسكوب)</Text>
                <Text style={styles.invoiceItemPrice}>2,000 ج.م</Text>
              </View>
              <View style={styles.invoiceRow}>
                <Text style={styles.invoiceItemName}>المستهلكات والتيبس فوق الصوتية ومحاليل الإرواء</Text>
                <Text style={styles.invoiceItemPrice}>400 ج.م</Text>
              </View>
              <View style={styles.invoiceRow}>
                <Text style={[styles.invoiceItemName, { color: Colors.completed }]}>
                  حصة الطبيب المحيل (نسبة الإحالة 15%)
                </Text>
                <Text style={[styles.invoiceItemPrice, { color: Colors.completed }]}>+360 ج.م</Text>
              </View>
              <View style={styles.invoiceRow}>
                <Text style={[styles.invoiceItemName, { color: Colors.textMuted }]}>
                  رسوم خدمة منصة DentMatch (5%)
                </Text>
                <Text style={[styles.invoiceItemPrice, { color: Colors.textMuted }]}>-120 ج.م</Text>
              </View>

              <View style={styles.invoiceDivider} />

              <View style={styles.invoiceTotalRow}>
                <Text style={styles.invoiceTotalLabel}>إجمالي التسوية المستحقة للأخصائي</Text>
                <Text style={styles.invoiceTotalVal}>2,280 ج.م</Text>
              </View>

              <TouchableOpacity
                style={styles.confirmPaymentBtn}
                onPress={() => showModal('تم تأكيد التحصيل بنجاح ✅', 'تم تسجيل استلام أتعاب الحالة في العيادة بنجاح، وترحيل نسبة الطبيب المحيل وعمولة المنصة للمحفظة فوراً.', '2,400 ج.م')}
              >
                <Ionicons name="checkmark-done" size={18} color="#000000" />
                <Text style={styles.confirmPaymentBtnText}>تأكيد تحصيل الرسوم من المريض</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ================= TAB 2: INVOICES LIST ================= */}
        {activeTab === 'invoices' && (
          <View>
            <Text style={styles.sectionTitle}>سجل الفواتير والمعاملات المالية</Text>
            {transactions.map((tx) => (
              <View key={tx.id} style={styles.txCard}>
                <View style={styles.txHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.txId}>{tx.id} • {tx.caseId}</Text>
                    <Text style={styles.txProc}>{tx.procedure}</Text>
                    <Text style={styles.txDoc}>مع {tx.doctor}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.txAmount}>{tx.amount} ج.م</Text>
                    <View style={styles.statusPill}>
                      <Text style={styles.statusPillText}>{tx.status}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.txFooter}>
                  <Text style={styles.txDate}>{tx.date}</Text>
                  <TouchableOpacity
                    style={styles.pdfBtn}
                    onPress={() => showModal(`فاتورة ضريبية ${tx.id}`, `تم تجهيز الفاتورة الإلكترونية المعتمدة للحالة ${tx.caseId}. جاهزة للمعاينة والطباعة.`, `${tx.amount} ج.م`)}
                  >
                    <Ionicons name="download-outline" size={14} color={Colors.primary} />
                    <Text style={styles.pdfBtnText}>فاتورة PDF</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ================= TAB 3: WITHDRAWAL & METHODS ================= */}
        {activeTab === 'withdraw' && (
          <View>
            <Text style={styles.sectionTitle}>طرق التحصيل والسحب الفوري (مصر)</Text>

            {/* InstaPay */}
            <View style={styles.methodCard}>
              <View style={styles.methodIconBox}>
                <Ionicons name="flash" size={22} color="#8B5CF6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.methodTitle}>انستاباي (InstaPay)</Text>
                <Text style={styles.methodSub}>تحويل لحظي مباشر لحسابك البنكي أو عنوان الدفع (IPA)</Text>
                <Text style={styles.methodAccount}>dr.abdelrahman@instapay</Text>
              </View>
              <View style={styles.activeTag}>
                <Text style={styles.activeTagText}>مفعّل ✅</Text>
              </View>
            </View>

            {/* Vodafone Cash / Smart Wallets */}
            <View style={styles.methodCard}>
              <View style={styles.methodIconBox}>
                <Ionicons name="phone-portrait" size={22} color={Colors.urgent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.methodTitle}>فودافون كاش والمحافظ الإلكترونية</Text>
                <Text style={styles.methodSub}>سحب فوري لأي محفظة كاش على شبكات مصر</Text>
                <Text style={styles.methodAccount}>010 **** 5421</Text>
              </View>
              <View style={styles.activeTag}>
                <Text style={styles.activeTagText}>مفعّل ✅</Text>
              </View>
            </View>

            {/* Clinic Cash Collection */}
            <View style={styles.methodCard}>
              <View style={styles.methodIconBox}>
                <Ionicons name="cash" size={22} color={Colors.completed} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.methodTitle}>تحصيل نقدي بالعيادة (Clinic Cash)</Text>
                <Text style={styles.methodSub}>المريض يسدد المبلغ للأخصائي مباشرة ويسجل التطبيق العمولة تلقائياً</Text>
              </View>
            </View>

            {/* Request Withdrawal Button */}
            <TouchableOpacity
              style={styles.requestWithdrawBtn}
              activeOpacity={0.85}
              onPress={() => showModal(
                'طلب تحويل أرباح ناجح ⚡',
                'تم تنفيذ طلب تحويل الأرباح بنجاح وفورياً عبر شبكة المدفوعات اللحظية InstaPay.',
                '14,850 ج.م',
                'dr.abdelrahman@instapay'
              )}
            >
              <Text style={styles.requestWithdrawBtnText}>تحويل الأرباح إلى InstaPay الآن</Text>
              <Ionicons name="send" size={18} color="#000000" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ================= SUCCESS / FEEDBACK MODAL ================= */}
      {modalData && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalIconCircle}>
              <Ionicons name="checkmark" size={32} color="#000000" />
            </View>

            <Text style={styles.modalTitleText}>{modalData.title}</Text>
            
            {modalData.amount && (
              <View style={styles.modalAmountBox}>
                <Text style={styles.modalAmountLabel}>المبلغ المحدد</Text>
                <Text style={styles.modalAmountValue}>{modalData.amount}</Text>
              </View>
            )}

            {modalData.account && (
              <View style={styles.modalAccountRow}>
                <Ionicons name="flash" size={16} color="#8B5CF6" />
                <Text style={styles.modalAccountText}>{modalData.account}</Text>
              </View>
            )}

            <Text style={styles.modalDetailsText}>{modalData.details}</Text>

            {modalData.refCode && (
              <Text style={styles.modalRefText}>رقم المعاملة المرجعي: {modalData.refCode}</Text>
            )}

            <TouchableOpacity
              style={styles.modalConfirmBtn}
              activeOpacity={0.85}
              onPress={() => setModalData(null)}
            >
              <Text style={styles.modalConfirmBtnText}>تم والمتابعة</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  headerBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingHorizontal: 16,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  walletCard: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  walletTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  walletLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  walletBalance: {
    color: Colors.textPrimary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  currency: {
    color: Colors.primary,
    fontSize: 18,
  },
  walletBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.completedLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  walletBadgeText: {
    color: Colors.completed,
    fontSize: 11,
    fontWeight: '600',
  },
  walletStatsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  walletStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  walletStatSub: {
    color: Colors.textMuted,
    fontSize: 10,
    marginBottom: 2,
  },
  walletStatVal: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  walletStatDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
  },
  actionBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryActionBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  primaryActionBtnText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  secondaryActionBtn: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  secondaryActionBtnText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  tagActive: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagActiveText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: 'bold',
  },
  caseInvoiceCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 20,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  invoiceItemName: {
    color: Colors.textSecondary,
    fontSize: 12,
    flex: 1,
    marginRight: 10,
  },
  invoiceItemPrice: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  invoiceDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
  },
  invoiceTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  invoiceTotalLabel: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  invoiceTotalVal: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmPaymentBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  confirmPaymentBtnText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  txCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 12,
  },
  txHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txId: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  txProc: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  txDoc: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  txAmount: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  statusPill: {
    backgroundColor: Colors.completedLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  statusPillText: {
    color: Colors.completed,
    fontSize: 10,
    fontWeight: '600',
  },
  txFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  txDate: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  pdfBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pdfBtnText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  methodCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 12,
    alignItems: 'center',
  },
  methodIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodTitle: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  methodSub: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 2,
    lineHeight: 15,
  },
  methodAccount: {
    color: Colors.primary,
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
  activeTag: {
    backgroundColor: Colors.completedLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 6,
  },
  activeTagText: {
    color: Colors.completed,
    fontSize: 10,
    fontWeight: 'bold',
  },
  requestWithdrawBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  requestWithdrawBtnText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
  },

  /* Modal Styles */
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 999,
  },
  modalBox: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalAmountBox: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    width: '100%',
  },
  modalAmountLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    marginBottom: 2,
  },
  modalAmountValue: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalAccountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  modalAccountText: {
    color: '#8B5CF6',
    fontWeight: '600',
    fontSize: 13,
  },
  modalDetailsText: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalRefText: {
    color: Colors.textMuted,
    fontSize: 11,
    marginBottom: 18,
  },
  modalConfirmBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
    width: '100%',
    alignItems: 'center',
  },
  modalConfirmBtnText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

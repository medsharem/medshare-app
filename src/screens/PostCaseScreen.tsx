import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { specialtiesList } from '../data/mockData';
import { DentalOdontogram } from '../components/DentalOdontogram';
import { UrgencyLevel, ReferralType } from '../types';

interface Props {
  onBack: () => void;
  onCaseCreated: (newCase: any) => void;
  onFindSpecialists: () => void;
}

export const PostCaseScreen: React.FC<Props> = ({
  onBack,
  onCaseCreated,
  onFindSpecialists,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('dentistry');
  const [referralType, setReferralType] = useState<ReferralType>('Direct');
  const [patientCode, setPatientCode] = useState<string>('PT-9402');
  const [patientAge, setPatientAge] = useState<string>('38');
  const [patientGender, setPatientGender] = useState<'Male' | 'Female'>('Male');
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([46]);
  const [chiefComplaint, setChiefComplaint] = useState<string>(
    'Separated instrument in mesial canal; persistent apical inflammation.'
  );
  const [clinicalFindings, setClinicalFindings] = useState<string>(
    'Patient asymptomatic during normal mastication, percussion test positive on distal cusp. No mobility. Root curvature 35 degrees.'
  );
  const [urgency, setUrgency] = useState<UrgencyLevel>('Urgent');

  const [files, setFiles] = useState<{ id: string; name: string; type: string; size: string }[]>([
    { id: '1', name: 'PreOp_Diagnostic_Scan.png', type: 'X-Ray', size: '2.4 MB' },
    { id: '2', name: 'HighRes_Coronal_CBCT.dicom', type: 'CBCT / MRI', size: '38.1 MB' },
    { id: '3', name: 'Clinical_Orifice_Photo.jpg', type: 'Photo', size: '1.8 MB' },
  ]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      onFindSpecialists();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const renderStepper = () => (
    <View style={styles.stepperContainer}>
      {[
        { step: 1, title: 'Specialty' },
        { step: 2, title: 'Patient Info' },
        { step: 3, title: 'Files & Scans' },
        { step: 4, title: 'Urgency & Type' },
        { step: 5, title: 'Review' },
      ].map((item) => (
        <View key={item.step} style={styles.stepItem}>
          <View
            style={[
              styles.stepCircle,
              currentStep === item.step && styles.stepCircleActive,
              currentStep > item.step && styles.stepCircleCompleted,
            ]}
          >
            {currentStep > item.step ? (
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            ) : (
              <Text
                style={[
                  styles.stepNumber,
                  currentStep === item.step && styles.stepNumberActive,
                ]}
              >
                {item.step}
              </Text>
            )}
          </View>
          <Text
            style={[
              styles.stepTitle,
              currentStep === item.step && styles.stepTitleActive,
            ]}
          >
            {item.title}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Ionicons name="arrow-back" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerTitle}>Refer a Patient</Text>
          <Text style={styles.headerSubtitle}>MEDSHARE Clinical Referral Engine</Text>
        </View>
        <View style={styles.privacyBadge}>
          <Ionicons name="shield-checkmark" size={14} color={Colors.completed} />
          <Text style={styles.privacyText}>HIPAA Safe</Text>
        </View>
      </View>

      {renderStepper()}

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* STEP 1: Select Specialty */}
        {currentStep === 1 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepHeading}>Step 1: Select Medical Specialty</Text>
            <Text style={styles.stepInstruction}>
              Choose the clinical specialty required for this patient's case:
            </Text>

            <View style={styles.specialtiesGrid}>
              {specialtiesList.map((item) => {
                const isSelected = selectedSpecialty === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.specialtyChoice,
                      isSelected && styles.specialtyChoiceActive,
                    ]}
                    onPress={() => setSelectedSpecialty(item.id)}
                  >
                    <View
                      style={[
                        styles.specialtyIconBox,
                        isSelected && { backgroundColor: Colors.gold },
                      ]}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={18}
                        color={isSelected ? '#FFFFFF' : Colors.primary}
                      />
                    </View>
                    <Text
                      style={[
                        styles.specialtyChoiceText,
                        isSelected && styles.specialtyChoiceTextActive,
                      ]}
                    >
                      {item.arabicName}
                    </Text>
                    <Text style={styles.specialtySubText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* STEP 2: Patient Info & Clinical Findings */}
        {currentStep === 2 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepHeading}>Step 2: Anonymous Patient Information</Text>
            <Text style={styles.stepInstruction}>
              All patient names are encrypted into unique ID codes for full medical privacy.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Patient Code (Auto-Encrypted):</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: Colors.backgroundSecondary }]}
                value={patientCode}
                editable={false}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Age:</Text>
                <TextInput
                  style={styles.textInput}
                  value={patientAge}
                  onChangeText={setPatientAge}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Gender:</Text>
                <View style={styles.genderRow}>
                  <TouchableOpacity
                    style={[
                      styles.genderBtn,
                      patientGender === 'Male' && styles.genderBtnActive,
                    ]}
                    onPress={() => setPatientGender('Male')}
                  >
                    <Text
                      style={[
                        styles.genderBtnText,
                        patientGender === 'Male' && styles.genderBtnTextActive,
                      ]}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderBtn,
                      patientGender === 'Female' && styles.genderBtnActive,
                    ]}
                    onPress={() => setPatientGender('Female')}
                  >
                    <Text
                      style={[
                        styles.genderBtnText,
                        patientGender === 'Female' && styles.genderBtnTextActive,
                      ]}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* If Dentistry is selected, show Odontogram */}
            {selectedSpecialty === 'dentistry' ? (
              <View style={{ marginTop: 14 }}>
                <Text style={styles.inputLabel}>مخطط الأسنان التفاعلي FDI (حدد الضروس/الأسنان المطلوبة):</Text>
                <DentalOdontogram
                  selectedTeeth={selectedTeeth}
                  onToggleTooth={(teeth) => setSelectedTeeth(teeth)}
                />
              </View>
            ) : null}

            <View style={[styles.inputGroup, { marginTop: 14 }]}>
              <Text style={styles.inputLabel}>Chief Complaint (الشكوى الأساسية):</Text>
              <TextInput
                style={styles.textInput}
                value={chiefComplaint}
                onChangeText={setChiefComplaint}
                placeholder="e.g. Broken Instrument, Severe Radicular Pain..."
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Clinical Findings & Diagnostic Notes:</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={clinicalFindings}
                onChangeText={setClinicalFindings}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        )}

        {/* STEP 3: Diagnostic Files */}
        {currentStep === 3 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepHeading}>Step 3: Upload Scans & Diagnostic Files</Text>
            <Text style={styles.stepInstruction}>
              Attach X-Rays, DICOM/CBCT scans, MRI, or laboratory reports:
            </Text>

            <View style={styles.uploadArea}>
              <Ionicons name="cloud-upload-outline" size={36} color={Colors.gold} />
              <Text style={styles.uploadMainText}>Tap to add Radiographs or Documents</Text>
              <Text style={styles.uploadSubText}>Supports DICOM, JPEG, PNG, PDF up to 100MB</Text>
            </View>

            <Text style={[styles.inputLabel, { marginTop: 18 }]}>Attached Files ({files.length}):</Text>
            {files.map((file) => (
              <View key={file.id} style={styles.fileCard}>
                <View style={styles.fileIconBox}>
                  <Ionicons name="document-text" size={20} color={Colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fileName}>{file.name}</Text>
                  <Text style={styles.fileMeta}>{file.type} • {file.size}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setFiles(files.filter((f) => f.id !== file.id))}
                >
                  <Ionicons name="trash-outline" size={18} color={Colors.urgent} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* STEP 4: Urgency & Referral Mode */}
        {currentStep === 4 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepHeading}>Step 4: Referral Mode & Urgency</Text>
            <Text style={styles.stepInstruction}>
              Choose how you want to route this referral in MEDSHARE network:
            </Text>

            <Text style={styles.inputLabel}>Referral Method:</Text>
            {[
              {
                type: 'Direct' as ReferralType,
                title: 'A. Direct Referral',
                desc: 'Select a verified specialist directly from the directory and transfer case files.',
                icon: 'person',
              },
              {
                type: 'Public' as ReferralType,
                title: 'B. Public Specialty Network',
                desc: 'Broadcast anonymously to all verified consultants in this specialty for fastest response.',
                icon: 'globe',
              },
              {
                type: 'Assisted' as ReferralType,
                title: 'C. MEDSHARE Assisted',
                desc: 'Request MEDSHARE clinical coordinator team to find and match the optimal consultant.',
                icon: 'headset',
              },
              {
                type: 'PrivateRecord' as ReferralType,
                title: 'D. حفظ في سجلاتي الخاصة فقط (Private Clinic Archive)',
                desc: 'حفظ ملف الحالة والأشعة في أرشيف عيادتك الخاص فقط بدون تحويل وبدون مشاركة مع أي طبيب.',
                icon: 'lock-closed',
              },
            ].map((mode) => (
              <TouchableOpacity
                key={mode.type}
                style={[
                  styles.modeCard,
                  referralType === mode.type && styles.modeCardActive,
                ]}
                onPress={() => setReferralType(mode.type)}
              >
                <View style={[styles.modeIconCircle, referralType === mode.type && { backgroundColor: Colors.gold }]}>
                  <Ionicons
                    name={mode.icon as any}
                    size={18}
                    color={referralType === mode.type ? '#FFFFFF' : Colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.modeTitle,
                      referralType === mode.type && styles.modeTitleActive,
                    ]}
                  >
                    {mode.title}
                  </Text>
                  <Text style={styles.modeDesc}>{mode.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <Text style={[styles.inputLabel, { marginTop: 16 }]}>Clinical Urgency:</Text>
            <View style={styles.urgencyRow}>
              {(['Normal', 'Urgent', 'Emergency'] as UrgencyLevel[]).map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.urgencyBtn,
                    urgency === level && styles.urgencyBtnActive,
                    urgency === level && level === 'Emergency' && { backgroundColor: Colors.urgent },
                  ]}
                  onPress={() => setUrgency(level)}
                >
                  <Text
                    style={[
                      styles.urgencyBtnText,
                      urgency === level && styles.urgencyBtnTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* STEP 5: Final Review */}
        {currentStep === 5 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepHeading}>Step 5: Review & Broadcast Referral</Text>
            <Text style={styles.stepInstruction}>
              Confirm clinical details before sending to the specialist network:
            </Text>

            <View style={styles.reviewBox}>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Specialty:</Text>
                <Text style={styles.reviewVal}>{selectedSpecialty.toUpperCase()}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Patient Code:</Text>
                <Text style={styles.reviewVal}>{patientCode} ({patientGender}, {patientAge}y)</Text>
              </View>
              {selectedSpecialty === 'dentistry' && (
                <View style={styles.reviewRow}>
                  <Text style={styles.reviewLabel}>الأسنان المحددة (FDI):</Text>
                  <Text style={[styles.reviewVal, { color: Colors.goldDark }]}>
                    {selectedTeeth.map((t) => `#${t}`).join(', ')} ({selectedTeeth.length} أسنان)
                  </Text>
                </View>
              )}
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Referral Mode:</Text>
                <Text style={styles.reviewVal}>{referralType} Referral</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Urgency:</Text>
                <Text style={[styles.reviewVal, { color: Colors.urgent }]}>{urgency}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Diagnostic Files:</Text>
                <Text style={styles.reviewVal}>{files.length} attached</Text>
              </View>
            </View>

            <View style={styles.chiefComplaintBox}>
              <Text style={styles.reviewLabel}>Complaint & Diagnostic Notes:</Text>
              <Text style={styles.chiefComplaintText}>{chiefComplaint}</Text>
              <Text style={[styles.chiefComplaintText, { marginTop: 4, color: Colors.textSecondary }]}>
                {clinicalFindings}
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Footer Navigation Bar */}
      <View style={styles.footerBar}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.prevBtn} onPress={handleBack}>
            <Text style={styles.prevBtnText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.nextBtn, currentStep === 1 && { flex: 1 }]}
          onPress={handleNext}
        >
          <Text style={styles.nextBtnText}>
            {currentStep === 5
              ? referralType === 'PrivateRecord'
                ? 'حفظ في أرشيف عيادتي فقط (Save Private)'
                : 'Send Referral & Match Specialists'
              : 'Continue Step →'}
          </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  privacyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.completedLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  privacyText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.completed,
  },
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.gold,
    borderWidth: 1.5,
  },
  stepCircleCompleted: {
    backgroundColor: Colors.completed,
    borderColor: Colors.completed,
  },
  stepNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  stepNumberActive: {
    color: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.textMuted,
    marginTop: 4,
  },
  stepTitleActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  stepCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
  },
  stepInstruction: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 18,
  },
  specialtiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  specialtyChoice: {
    width: '48%',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  specialtyChoiceActive: {
    borderColor: Colors.gold,
    backgroundColor: Colors.goldLight,
  },
  specialtyIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  specialtyChoiceText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  specialtyChoiceTextActive: {
    color: Colors.primary,
  },
  specialtySubText: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: Colors.inputBg,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  genderRow: {
    flexDirection: 'row',
    gap: 8,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.inputBg,
    alignItems: 'center',
  },
  genderBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  genderBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  genderBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.goldBorder,
    borderRadius: 12,
    backgroundColor: Colors.goldLight,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadMainText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 8,
  },
  uploadSubText: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  fileIconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  fileMeta: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  modeCardActive: {
    borderColor: Colors.gold,
    backgroundColor: Colors.goldLight,
  },
  modeIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  modeTitleActive: {
    color: Colors.primary,
  },
  modeDesc: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 14,
  },
  urgencyRow: {
    flexDirection: 'row',
    gap: 8,
  },
  urgencyBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  urgencyBtnActive: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  urgencyBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  urgencyBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  reviewBox: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 10,
    padding: 14,
    gap: 8,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  reviewVal: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  chiefComplaintBox: {
    marginTop: 12,
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chiefComplaintText: {
    fontSize: 12,
    color: Colors.textPrimary,
    lineHeight: 18,
    marginTop: 4,
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
  },
  prevBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  nextBtn: {
    flex: 2,
    backgroundColor: Colors.gold,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0A1728',
  },
});

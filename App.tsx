import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Colors } from './src/theme/colors';
import { HomeScreen } from './src/screens/HomeScreen';
import { PostCaseScreen } from './src/screens/PostCaseScreen';
import { SpecialistProfileScreen } from './src/screens/SpecialistProfileScreen';
import { CaseTrackingScreen } from './src/screens/CaseTrackingScreen';
import { CaseDetailsScreen } from './src/screens/CaseDetailsScreen';
import { TreatmentReportScreen } from './src/screens/TreatmentReportScreen';
import { CaseReturnedScreen } from './src/screens/CaseReturnedScreen';
import { CaseChatScreen } from './src/screens/CaseChatScreen';
import { BillingScreen } from './src/screens/BillingScreen';
import { AdminDashboardScreen } from './src/screens/AdminDashboardScreen';
import { BottomNavBar } from './src/components/BottomNavBar';
import { sampleCaseDM10254 } from './src/data/mockData';
import { MedicalCase } from './src/types';

// Inject vector icon fonts for web preview
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const iconFontStyles = `
    @font-face {
      font-family: 'Ionicons';
      src: url('/fonts/Ionicons.ttf') format('truetype');
    }
    @font-face {
      font-family: 'MaterialIcons';
      src: url('/fonts/MaterialIcons.ttf') format('truetype');
    }
    @font-face {
      font-family: 'Material Icons';
      src: url('/fonts/MaterialIcons.ttf') format('truetype');
    }
    @font-face {
      font-family: 'MaterialCommunityIcons';
      src: url('/fonts/MaterialCommunityIcons.ttf') format('truetype');
    }
    @font-face {
      font-family: 'FontAwesome';
      src: url('/fonts/FontAwesome.ttf') format('truetype');
    }
    @font-face {
      font-family: 'Feather';
      src: url('/fonts/Feather.ttf') format('truetype');
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.appendChild(document.createTextNode(iconFontStyles));
  document.head.appendChild(styleEl);
}

export default function App() {
  const getInitialScreen = () => {
    if (typeof window !== 'undefined' && window.location) {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('screen');
      if (s) return s;
    }
    return 'home';
  };
  const [currentScreen, setCurrentScreenState] = useState<string>(getInitialScreen);
  const setCurrentScreen = (screen: string) => {
    setCurrentScreenState(screen);
    if (typeof window !== 'undefined' && window.history) {
      const url = new URL(window.location.href);
      url.searchParams.set('screen', screen);
      window.history.replaceState({}, '', url.toString());
    }
  };
  const [casesList, setCasesList] = useState<MedicalCase[]>([sampleCaseDM10254]);

  const screens = [
    { key: 'home', label: '1. واجهة الطبيب (Dashboard)' },
    { key: 'admin_dashboard', label: '🛡️ لوحة تحكم الإدارة (Admin)' },
    { key: 'post_case', label: '2. إحالة مريض (5 خطوات)' },
    { key: 'specialist_profile', label: '3. بروفايل الاستشاري' },
    { key: 'case_tracking', label: '4. تتبع الإحالة' },
    { key: 'case_details', label: '5. التفاصيل والأشعة' },
    { key: 'treatment_report', label: '6. تقرير الإجراء الطبي' },
    { key: 'case_returned', label: '7. استلام المريض' },
    { key: 'case_chat', label: '8. الاستشارة والشات' },
    { key: 'billing', label: '9. المركز المالي والمحفظة' },
  ];

  const handleCaseCreated = (newCase: any) => {
    setCurrentScreen('specialist_profile');
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            cases={casesList}
          />
        );
      case 'admin_dashboard':
        return (
          <AdminDashboardScreen
            onBackToDoctorView={() => setCurrentScreen('home')}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        );
      case 'post_case':
        return (
          <PostCaseScreen
            onBack={() => setCurrentScreen('home')}
            onCaseCreated={handleCaseCreated}
            onFindSpecialists={() => setCurrentScreen('specialist_profile')}
          />
        );
      case 'specialist_profile':
        return (
          <SpecialistProfileScreen
            onBack={() => setCurrentScreen('home')}
            onSendCase={() => setCurrentScreen('case_tracking')}
          />
        );
      case 'case_tracking':
        return (
          <CaseTrackingScreen
            onBack={() => setCurrentScreen('home')}
            onChat={() => setCurrentScreen('case_chat')}
            onViewCase={() => setCurrentScreen('case_details')}
            onViewReport={() => setCurrentScreen('treatment_report')}
          />
        );
      case 'case_details':
        return (
          <CaseDetailsScreen
            onBack={() => setCurrentScreen('case_tracking')}
            onChat={() => setCurrentScreen('case_chat')}
            onEditCase={() => setCurrentScreen('post_case')}
          />
        );
      case 'treatment_report':
        return (
          <TreatmentReportScreen
            onBack={() => setCurrentScreen('case_tracking')}
            onSendBack={() => setCurrentScreen('case_returned')}
          />
        );
      case 'case_returned':
        return (
          <CaseReturnedScreen
            onBack={() => setCurrentScreen('case_tracking')}
            onViewReport={() => setCurrentScreen('treatment_report')}
            onViewBilling={() => setCurrentScreen('billing')}
            onMarkCompleted={() => {
              setCurrentScreen('billing');
            }}
          />
        );
      case 'case_chat':
        return (
          <CaseChatScreen
            caseId="MS-8924"
            onBack={() => setCurrentScreen('case_tracking')}
          />
        );
      case 'billing':
        return (
          <BillingScreen
            onBack={() => setCurrentScreen('home')}
            onViewCaseDetails={() => setCurrentScreen('case_details')}
          />
        );
      default:
        return (
          <HomeScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            cases={casesList}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ExpoStatusBar style="dark" />

      {/* MEDSHARE Top Bar & Role Selector */}
      <View style={styles.topSwitcher}>
        <View style={styles.phaseIndicatorRow}>
          <Text style={styles.brandTitle}>MEDSHARE</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <TouchableOpacity
              style={[
                styles.roleToggleBtn,
                currentScreen !== 'admin_dashboard' && styles.roleToggleBtnActive,
              ]}
              onPress={() => setCurrentScreen('home')}
            >
              <Text style={styles.roleToggleText}>👨‍⚕️ Doctor View</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleToggleBtn,
                styles.adminPanelBtn,
                currentScreen === 'admin_dashboard' && styles.adminPanelBtnActive,
              ]}
              onPress={() => setCurrentScreen('admin_dashboard')}
            >
              <Text
                style={[
                  styles.adminPanelBtnText,
                  currentScreen === 'admin_dashboard' && styles.adminPanelBtnTextActive,
                ]}
              >
                🛡️ Admin Panel
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.switcherScroll}
        >
          {screens.map((sc) => {
            const isActive = currentScreen === sc.key;
            return (
              <TouchableOpacity
                key={sc.key}
                style={[
                  styles.switchChip,
                  isActive && styles.switchChipActive,
                  sc.key === 'admin_dashboard' && styles.switchChipAdmin,
                ]}
                onPress={() => setCurrentScreen(sc.key)}
              >
                <Text
                  style={[
                    styles.switchChipText,
                    isActive && styles.switchChipTextActive,
                    sc.key === 'admin_dashboard' && { color: Colors.gold },
                  ]}
                >
                  {sc.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Screen Body */}
      <View style={styles.body}>{renderActiveScreen()}</View>

      {/* Persistent Bottom Navigation on Main Tabs */}
      {['home', 'case_tracking', 'specialist_profile'].includes(currentScreen) && (
        <BottomNavBar
          activeScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topSwitcher: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.gold,
  },
  phaseIndicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  brandTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  roleToggleBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  roleToggleBtnActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: '#FFFFFF',
  },
  roleToggleBtnActiveAdmin: {
    backgroundColor: Colors.gold,
    borderColor: '#FFFFFF',
  },
  roleToggleText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  adminPanelBtn: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  adminPanelBtnActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  adminPanelBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  adminPanelBtnTextActive: {
    color: Colors.primary,
  },
  switcherScroll: {
    paddingHorizontal: 8,
    gap: 6,
  },
  switchChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  switchChipAdmin: {
    borderColor: Colors.goldBorder,
    backgroundColor: 'rgba(200, 164, 93, 0.15)',
  },
  switchChipActive: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  switchChipText: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '600',
  },
  switchChipTextActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
  body: {
    flex: 1,
  },
});

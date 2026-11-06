import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors } from '../theme/colors';
import {
  NetworkGridIcon,
  SwapIcon,
  PlusIcon,
  ChatIcon,
  WalletIcon,
} from './MedicalIcons';

interface Props {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export const BottomNavBar: React.FC<Props> = ({ activeScreen, onNavigate }) => {
  return (
    <View style={styles.navContainer}>
      {/* 1. Dashboard / Home */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onNavigate('home')}
        activeOpacity={0.8}
      >
        <NetworkGridIcon
          size={20}
          color={activeScreen === 'home' ? Colors.primary : Colors.textMuted}
        />
        <Text
          style={[
            styles.navLabel,
            activeScreen === 'home' && styles.navLabelActive,
          ]}
        >
          Network
        </Text>
      </TouchableOpacity>

      {/* 2. My Cases & Referrals */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onNavigate('case_tracking')}
        activeOpacity={0.8}
      >
        <SwapIcon
          size={20}
          color={activeScreen === 'case_tracking' ? Colors.primary : Colors.textMuted}
        />
        <Text
          style={[
            styles.navLabel,
            activeScreen === 'case_tracking' && styles.navLabelActive,
          ]}
        >
          Referrals
        </Text>
      </TouchableOpacity>

      {/* Center Action: Refer Patient (+) */}
      <TouchableOpacity
        style={styles.centerButton}
        onPress={() => onNavigate('post_case')}
        activeOpacity={0.85}
      >
        <View style={styles.centerButtonInner}>
          <PlusIcon size={24} color="#FFFFFF" />
        </View>
        <Text style={styles.centerButtonText}>Refer</Text>
      </TouchableOpacity>

      {/* 3. Messages / Chat */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onNavigate('case_chat')}
        activeOpacity={0.8}
      >
        <ChatIcon
          size={20}
          color={activeScreen === 'case_chat' ? Colors.primary : Colors.textMuted}
        />
        <Text
          style={[
            styles.navLabel,
            activeScreen === 'case_chat' && styles.navLabelActive,
          ]}
        >
          Messages
        </Text>
      </TouchableOpacity>

      {/* 4. Financial & Doctor Wallet */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onNavigate('billing')}
        activeOpacity={0.8}
      >
        <WalletIcon
          size={20}
          color={activeScreen === 'billing' ? Colors.primary : Colors.textMuted}
        />
        <Text
          style={[
            styles.navLabel,
            activeScreen === 'billing' && styles.navLabelActive,
          ]}
        >
          Wallet
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textMuted,
    marginTop: 2,
  },
  navLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  centerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
  },
  centerButtonInner: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  centerButtonText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 2,
  },
});

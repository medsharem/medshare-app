import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

interface Props {
  selectedTooth?: number;
  selectedTeeth?: number[];
  onSelectTooth?: (tooth: number) => void;
  onToggleTooth?: (teeth: number[]) => void;
}

export const DentalOdontogram: React.FC<Props> = ({
  selectedTooth = 46,
  selectedTeeth,
  onSelectTooth,
  onToggleTooth,
}) => {
  // If selectedTeeth is passed, use it; otherwise wrap selectedTooth in an array
  const currentSelection: number[] = selectedTeeth
    ? selectedTeeth
    : selectedTooth
    ? [selectedTooth]
    : [46];

  // Upper arch: 18 down to 11, then 21 up to 28
  const upperRight = [18, 17, 16, 15, 14, 13, 12, 11];
  const upperLeft = [21, 22, 23, 24, 25, 26, 27, 28];

  // Lower arch: 48 down to 41, then 31 up to 38
  const lowerRight = [48, 47, 46, 45, 44, 43, 42, 41];
  const lowerLeft = [31, 32, 33, 34, 35, 36, 37, 38];

  const handleToothPress = (num: number) => {
    let updated: number[];
    if (currentSelection.includes(num)) {
      // If already selected, remove it (unless it's the last one)
      updated = currentSelection.filter((t) => t !== num);
      if (updated.length === 0) updated = [num]; // Keep at least one
    } else {
      // Add to selection (Multi-Select!)
      updated = [...currentSelection, num].sort((a, b) => a - b);
    }

    if (onToggleTooth) {
      onToggleTooth(updated);
    }
    if (onSelectTooth) {
      onSelectTooth(num);
    }
  };

  const renderTooth = (num: number) => {
    const isSelected = currentSelection.includes(num);
    return (
      <TouchableOpacity
        key={num}
        onPress={() => handleToothPress(num)}
        activeOpacity={0.7}
        style={[
          styles.toothButton,
          isSelected && styles.toothSelected,
        ]}
      >
        <Text style={[styles.toothText, isSelected && styles.toothTextSelected]}>
          {num}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Mobile Swipe Hint */}
      <View style={styles.mobileHintRow}>
        <Ionicons name="swap-horizontal" size={13} color="#94A3B8" />
        <Text style={styles.mobileHintText}>اسحب يميناً ويساراً للتنقل بين أرباع الفك وتحديد الأسنان بدقة</Text>
      </View>

      {/* Arch Visual Container with Smooth Horizontal Scroll for Mobile */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollWrapper}
      >
        <View style={styles.archWrapper}>
          <View style={styles.archHeader}>
            <Text style={styles.quadrantLabel}>UR (يمين علوي)</Text>
            <Text style={styles.archTitle}>Maxilla (الفك العلوي)</Text>
            <Text style={styles.quadrantLabel}>UL (يسار علوي)</Text>
          </View>

          {/* Upper Row */}
          <View style={styles.teethRow}>
            <View style={styles.quadrantGroup}>
              {upperRight.map(renderTooth)}
            </View>
            <View style={styles.centerDivider} />
            <View style={styles.quadrantGroup}>
              {upperLeft.map(renderTooth)}
            </View>
          </View>

          <View style={styles.jawSeparator}>
            <View style={styles.jawLine} />
            <Text style={styles.midlineLabel}>Midline (خط المنتصف)</Text>
            <View style={styles.jawLine} />
          </View>

          {/* Lower Row */}
          <View style={styles.teethRow}>
            <View style={styles.quadrantGroup}>
              {lowerRight.map(renderTooth)}
            </View>
            <View style={styles.centerDivider} />
            <View style={styles.quadrantGroup}>
              {lowerLeft.map(renderTooth)}
            </View>
          </View>

          <View style={[styles.archHeader, { marginTop: 8 }]}>
            <Text style={styles.quadrantLabel}>LR (يمين سفلي)</Text>
            <Text style={styles.archTitle}>Mandible (الفك السفلي)</Text>
            <Text style={styles.quadrantLabel}>LL (يسار سفلي)</Text>
          </View>
        </View>
      </ScrollView>

      {/* Multi-Selection Dynamic Indicator Bar */}
      <View style={styles.selectionSummaryCard}>
        <View style={styles.selectionLeft}>
          <View style={styles.goldDot} />
          <View>
            <Text style={styles.selectionTitle}>الأسنان والضروس المحددة للإجراء:</Text>
            <Text style={styles.selectionTeethList}>
              {currentSelection.map((t) => `#${t}`).join(', ')}{' '}
              <Text style={styles.selectionCount}>
                ({currentSelection.length} {currentSelection.length === 1 ? 'سن/ضرس' : 'ضروس مختارة'})
              </Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => {
            if (onToggleTooth) onToggleTooth([46]);
            if (onSelectTooth) onSelectTooth(46);
          }}
        >
          <Ionicons name="refresh-outline" size={14} color="#64748B" />
          <Text style={styles.clearBtnText}>إعادة ضبط</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  mobileHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 6,
  },
  mobileHintText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  scrollWrapper: {
    paddingBottom: 4,
  },
  archWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    minWidth: 470,
  },
  archHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  archTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#10243E',
  },
  quadrantLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#94A3B8',
  },
  teethRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quadrantGroup: {
    flexDirection: 'row',
    gap: 3,
  },
  centerDivider: {
    width: 2,
    height: 32,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 4,
  },
  toothButton: {
    width: 26,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toothSelected: {
    backgroundColor: '#C8A45D', // Champagne Gold
    borderColor: '#B38F46',
    elevation: 3,
    shadowColor: '#C8A45D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    transform: [{ scale: 1.08 }],
  },
  toothText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#475569',
  },
  toothTextSelected: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  jawSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  jawLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  midlineLabel: {
    fontSize: 8,
    fontWeight: '600',
    color: '#94A3B8',
    paddingHorizontal: 8,
  },
  selectionSummaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  selectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goldDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C8A45D',
  },
  selectionTitle: {
    fontSize: 10,
    color: '#92400E',
    fontWeight: '600',
  },
  selectionTeethList: {
    fontSize: 12,
    fontWeight: '800',
    color: '#78350F',
    marginTop: 1,
  },
  selectionCount: {
    fontSize: 10,
    fontWeight: '600',
    color: '#B45309',
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  clearBtnText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
});

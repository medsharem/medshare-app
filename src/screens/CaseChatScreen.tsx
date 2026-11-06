import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { ChatMessage } from '../types';

interface Props {
  onBack: () => void;
  caseId: string;
}

export const CaseChatScreen: React.FC<Props> = ({ onBack, caseId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'dr_abdelrahman',
      senderName: 'Dr. Abdelrahman',
      text: 'مرحباً دكتور أحمد، تم تحويل حالة السن 46 مع وجود فايل مكسور في القناة الإنسية (mesial canal). مرفق صور الأشعة.',
      timestamp: '10:35 AM',
      isDoctor: true,
    },
    {
      id: '2',
      senderId: 'dr_ahmed',
      senderName: 'Dr. Ahmed Mohamed',
      text: 'أهلاً دكتور عبد الرحمن، استلمت الحالة وفحصت الأشعة. هل فيه أي ألم أو تورم حالياً عند المريض؟',
      timestamp: '11:05 AM',
      isDoctor: false,
    },
    {
      id: '3',
      senderId: 'dr_abdelrahman',
      senderName: 'Dr. Abdelrahman',
      text: 'لا يوجد أي أعراض، الحالة asymptomatic تماماً.',
      timestamp: '11:15 AM',
      isDoctor: true,
    },
    {
      id: '4',
      senderId: 'dr_ahmed',
      senderName: 'Dr. Ahmed Mohamed',
      text: 'ممتاز، حجزنا جلسة للمريض وسأستخدم التبس فوق الصوتية تحت الميكروسكوب لإزالة الفايل وإرسال التقرير فور الانتهاء.',
      timestamp: '11:20 AM',
      isDoctor: false,
    },
  ]);

  const [inputVal, setInputVal] = useState<string>('');

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'dr_abdelrahman',
      senderName: 'Dr. Abdelrahman',
      text: inputVal.trim(),
      timestamp: 'Now',
      isDoctor: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Dr. Ahmed Mohamed</Text>
          <Text style={styles.headerSub}>Case #{caseId} • Endodontics</Text>
        </View>
        {/* Placeholder to keep title balanced; call & voice note deferred to final phase */}
        <View style={{ width: 36 }} />
      </View>

      {/* Case Context Strip */}
      <View style={styles.caseStrip}>
        <Ionicons name="information-circle" size={16} color={Colors.primary} />
        <Text style={styles.caseStripText}>
          Tooth #46: Broken Instrument (File) • High Urgency
        </Text>
      </View>

      {/* Messages ScrollView */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={{ paddingVertical: 14 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((m) => {
          const isMe = m.isDoctor;
          return (
            <View
              key={m.id}
              style={[
                styles.bubbleWrapper,
                isMe ? styles.myBubbleWrapper : styles.otherBubbleWrapper,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  isMe ? styles.myBubble : styles.otherBubble,
                ]}
              >
                {!isMe && (
                  <Text style={styles.senderTitle}>{m.senderName}</Text>
                )}
                <Text
                  style={[
                    styles.messageText,
                    isMe ? styles.myMessageText : styles.otherMessageText,
                  ]}
                >
                  {m.text}
                </Text>
                <Text
                  style={[
                    styles.timeText,
                    isMe ? styles.myTimeText : styles.otherTimeText,
                  ]}
                >
                  {m.timestamp}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.attachBtn}>
          <Ionicons name="attach" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          value={inputVal}
          onChangeText={setInputVal}
          placeholder="اكتب رسالتك للدكتور..."
          placeholderTextColor={Colors.textMuted}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          activeOpacity={0.8}
        >
          <Ionicons name="send" size={18} color="#0A1728" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerBtn: {
    padding: 6,
  },
  headerCenter: {
    flex: 1,
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerSub: {
    fontSize: 11,
    color: Colors.primary,
    marginTop: 1,
  },
  caseStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  caseStripText: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bubbleWrapper: {
    marginBottom: 12,
    maxWidth: '82%',
  },
  myBubbleWrapper: {
    alignSelf: 'flex-end',
  },
  otherBubbleWrapper: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  myBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderBottomLeftRadius: 4,
  },
  senderTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'right',
  },
  myMessageText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  otherMessageText: {
    color: Colors.textPrimary,
  },
  timeText: {
    fontSize: 9,
    marginTop: 4,
  },
  myTimeText: {
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'left',
  },
  otherTimeText: {
    color: Colors.textMuted,
    textAlign: 'right',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 8,
  },
  attachBtn: {
    padding: 6,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.inputBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    color: Colors.textPrimary,
    fontSize: 13,
    maxHeight: 90,
    textAlign: 'right',
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


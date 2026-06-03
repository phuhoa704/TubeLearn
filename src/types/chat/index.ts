export interface ChatMessage {
  id: number;
  text: string;
  sender: "bot" | "me";
  time: string;
  isReminderCard?: boolean;
  reminderData?: {
    type: string;
    badge: string;
    title: string;
    sub: string;
    course: string;
  };
  isDismissed?: boolean;
  isCourseCard?: boolean;
  courseData?: {
    required: boolean;
    badge: string;
    name: string;
    reason: string;
    icon: string;
  };
  isQuickReplyOptions?: boolean;
  quickReplyOptions?: Array<{ label: string; action: string }>;
  isFaqCard?: boolean;
  faqData?: {
    a: string;
    src: string;
    feedbackDone?: boolean;
    feedbackPositive?: boolean;
  };
}
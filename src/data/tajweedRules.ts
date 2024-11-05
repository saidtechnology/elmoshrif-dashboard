import { TajweedRule } from '../types';

export const tajweedRules: TajweedRule[] = [
  {
    id: 1,
    title: "النون الساكنة والتنوين",
    definition: "النون الساكنة هي النون الخالية من الحركة والتنوين هو نون ساكنة زائدة تلحق آخر الاسم لفظاً لا خطاً",
    examples: [
      {
        text: "مِنْ بَعْدِ",
        explanation: "مثال على النون الساكنة مع حكم الإقلاب"
      },
      {
        text: "سَمِيعٌ عَلِيمٌ",
        explanation: "مثال على التنوين مع حكم الإدغام"
      }
    ],
    notes: [
      "للنون الساكنة والتنوين أربعة أحكام: الإظهار، الإدغام، الإقلاب، الإخفاء",
      "يجب مراعاة هذه الأحكام عند تلاوة القرآن الكريم"
    ]
  },
  {
    id: 2,
    title: "المد وأحكامه",
    definition: "المد هو إطالة الصوت بحرف من حروف المد الثلاثة: الألف الساكنة المفتوح ما قبلها، والواو الساكنة المضموم ما قبلها، والياء الساكنة المكسور ما قبلها",
    examples: [
      {
        text: "قَالَ",
        explanation: "مثال على المد الطبيعي بالألف"
      },
      {
        text: "يَقُولُ",
        explanation: "مثال على المد الطبيعي بالواو"
      }
    ],
    notes: [
      "المد الطبيعي مقداره حركتان",
      "المد الفرعي له أسباب وأحكام مختلفة"
    ]
  },
  {
    id: 3,
    title: "القلقلة",
    definition: "القلقلة هي اضطراب الصوت عند النطق بالحرف الساكن حتى يُسمع له نبرة قوية، وحروفها خمسة مجموعة في قولنا: قطب جد",
    examples: [
      {
        text: "يَجْعَلْ",
        explanation: "مثال على القلقلة في حرف الجيم الساكن"
      },
      {
        text: "خَلَقْ",
        explanation: "مثال على القلقلة في حرف القاف الساكن"
      }
    ]
  }
];
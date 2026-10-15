export interface SentenceItem {
  id: string;
  type: 'zero' | 'first';
  text: string;
  contextTag: string;
  ifClause: string;
  mainClause: string;
  verb1: string;
  verb2: string;
  explanation: string;
  correctFeedback: string;
  incorrectFeedback: string;
}

export interface BlankChallenge {
  id: string;
  title: string;
  type: 'zero' | 'first';
  scenario: string;
  sentenceBefore: string;
  blank1Options: string[];
  correctBlank1: string;
  sentenceMiddle: string;
  blank2Options?: string[];
  correctBlank2?: string;
  sentenceEnd: string;
  fullSentence: string;
  hint: string;
  explanation: string;
}

export const CLASSIFICATION_SENTENCES: SentenceItem[] = [
  // Zero Conditional (Rules & Habits)
  {
    id: 'z1',
    type: 'zero',
    text: 'If students arrive late to class, they miss the introduction.',
    contextTag: 'Classroom Rule',
    ifClause: 'If students arrive late to class',
    mainClause: 'they miss the introduction',
    verb1: 'arrive (Present Simple)',
    verb2: 'miss (Present Simple)',
    explanation: 'Zero Conditional: States a permanent classroom rule. Present Simple in both clauses (arrive → miss).',
    correctFeedback: "Spot on! That's a general classroom rule! Both verbs are in Present Simple (+10 pts).",
    incorrectFeedback: "Oops! Notice there is no 'will'. 'Arrive' and 'miss' are both Present Simple—it's a general rule!",
  },
  {
    id: 'z2',
    type: 'zero',
    text: 'If you press the mute button on Zoom, nobody hears your background noise.',
    contextTag: 'Online Class Habit',
    ifClause: 'If you press the mute button on Zoom',
    mainClause: 'nobody hears your background noise',
    verb1: 'press (Present Simple)',
    verb2: 'hears (Present Simple)',
    explanation: 'Zero Conditional: A technical fact and online etiquette rule. Press → hears (both Present Simple).',
    correctFeedback: "Superb! Pressing mute always silences sound—a universal fact and habit! (+10 pts).",
    incorrectFeedback: "Watch out! It's an automatic technical fact: If you press... nobody hears. Zero conditional!",
  },
  {
    id: 'z3',
    type: 'zero',
    text: 'If a student raises their hand, the teacher knows they want to speak.',
    contextTag: 'Classroom Protocol',
    ifClause: 'If a student raises their hand',
    mainClause: 'the teacher knows they want to speak',
    verb1: 'raises (Present Simple)',
    verb2: 'knows (Present Simple)',
    explanation: 'Zero Conditional: A regular classroom habit and recognized signal. Raises → knows.',
    correctFeedback: "Excellent deduction! Hand-raising is standard school protocol: raises → knows! (+10 pts).",
    incorrectFeedback: "Hold on! Hand-raising is a constant classroom rule: both verbs are in Present Simple!",
  },
  {
    id: 'z4',
    type: 'zero',
    text: "If you don't study regularly, you forget new vocabulary quickly.",
    contextTag: 'Study Habit',
    ifClause: "If you don't study regularly",
    mainClause: 'you forget new vocabulary quickly',
    verb1: "don't study (Present Simple)",
    verb2: 'forget (Present Simple)',
    explanation: 'Zero Conditional: A universal study truth about human memory. Both are Present Simple.',
    correctFeedback: "Right on target! Forgetting unpracticed words is a proven study fact! (+10 pts).",
    incorrectFeedback: "Careful! This describes a regular study habit, not a single future event. Zero conditional!",
  },
  {
    id: 'z5',
    type: 'zero',
    text: 'If the teacher writes on the board, the class copies the notes.',
    contextTag: 'Lesson Routine',
    ifClause: 'If the teacher writes on the board',
    mainClause: 'the class copies the notes',
    verb1: 'writes (Present Simple)',
    verb2: 'copies (Present Simple)',
    explanation: 'Zero Conditional: A repeated classroom routine. Writes → copies.',
    correctFeedback: "Brilliant! That's a daily classroom routine and automatic habit! (+10 pts).",
    incorrectFeedback: "Remember: 'writes' and 'copies' are both Present Simple routines, so it's Zero Conditional!",
  },

  // First Conditional (Future Scenarios)
  {
    id: 'f1',
    type: 'first',
    text: 'If you practice your presentation tonight, you will feel more confident tomorrow.',
    contextTag: 'Future Prep',
    ifClause: 'If you practice your presentation tonight',
    mainClause: 'you will feel more confident tomorrow',
    verb1: 'practice (Present Simple)',
    verb2: 'will feel (WILL + Verb)',
    explanation: 'First Conditional: A specific condition tonight with a predicted future result tomorrow (will feel).',
    correctFeedback: "Awesome! 'Will feel' points to tomorrow's future prediction! (+10 pts).",
    incorrectFeedback: "Oops! Notice 'will feel' and 'tomorrow'. That's a First Conditional future prediction!",
  },
  {
    id: 'f2',
    type: 'first',
    text: 'If the teacher uses a game today, the students will enjoy the lesson.',
    contextTag: 'Lesson Scenario',
    ifClause: 'If the teacher uses a game today',
    mainClause: 'the students will enjoy the lesson',
    verb1: 'uses (Present Simple)',
    verb2: 'will enjoy (WILL + Verb)',
    explanation: 'First Conditional: A possible condition for today and its expected future reaction (will enjoy).',
    correctFeedback: "Spot on! The modal 'will enjoy' shows an expected future outcome! (+10 pts).",
    incorrectFeedback: "Take another look: 'will enjoy' indicates a specific future event, not an automatic constant rule!",
  },
  {
    id: 'f3',
    type: 'first',
    text: "If you don't take notes during the lecture, you will find the quiz difficult later.",
    contextTag: 'Academic Warning',
    ifClause: "If you don't take notes during the lecture",
    mainClause: 'you will find the quiz difficult later',
    verb1: "don't take (Present Simple)",
    verb2: 'will find (WILL + Verb)',
    explanation: 'First Conditional: A real condition in class with a probable future outcome later (will find).',
    correctFeedback: "Well done! 'Will find' warns about a future quiz result later! (+10 pts).",
    incorrectFeedback: "Check the main clause: 'will find ... later' is a First Conditional prediction!",
  },
  {
    id: 'f4',
    type: 'first',
    text: 'If we finish the task early, we will leave the classroom five minutes ahead.',
    contextTag: 'Classroom Incentive',
    ifClause: 'If we finish the task early',
    mainClause: 'we will leave the classroom five minutes ahead',
    verb1: 'finish (Present Simple)',
    verb2: 'will leave (WILL + Verb)',
    explanation: 'First Conditional: A possible early finish resulting in a future departure (will leave).',
    correctFeedback: "Great job! A probable future reward: 'finish' (present) + 'will leave' (future)! (+10 pts).",
    incorrectFeedback: "Notice 'will leave'! When we promise or predict a future action, we use First Conditional!",
  },
  {
    id: 'f5',
    type: 'first',
    text: 'If the student studies hard this semester, she will pass the final exam.',
    contextTag: 'Semester Goal',
    ifClause: 'If the student studies hard this semester',
    mainClause: 'she will pass the final exam',
    verb1: 'studies (Present Simple)',
    verb2: 'will pass (WILL + Verb)',
    explanation: 'First Conditional: Realistic condition this semester leading to passing in the future (will pass).',
    correctFeedback: "Perfect! 'Studies' in the condition, 'will pass' for future achievement! (+10 pts).",
    incorrectFeedback: "Remember: 'will pass' refers to the future exam. That's a classic First Conditional!",
  },
];

// Completely unique educational challenges for Part 2 (NO repetition with Part 1)
export const BLANK_CHALLENGES: BlankChallenge[] = [
  {
    id: 'b1',
    title: 'Library Etiquette',
    type: 'zero',
    scenario: 'Standard borrowing policy in the campus library',
    sentenceBefore: 'If you ',
    blank1Options: ['borrow', 'will borrow', 'borrowed'],
    correctBlank1: 'borrow',
    sentenceMiddle: ' a library book, you ',
    blank2Options: ['return', 'will return', 'returned'],
    correctBlank2: 'return',
    sentenceEnd: ' it within two weeks.',
    fullSentence: 'If you borrow a library book, you return it within two weeks.',
    hint: 'This is an institutional library rule. Use Present Simple in both clauses.',
    explanation: 'Zero Conditional rule: If + Present Simple (borrow), Present Simple (return).',
  },
  {
    id: 'b2',
    title: 'Essay Draft Feedback',
    type: 'first',
    scenario: 'Teacher promise for students who submit their drafts before Friday',
    sentenceBefore: 'If you ',
    blank1Options: ['send', 'will send', 'sent'],
    correctBlank1: 'send',
    sentenceMiddle: ' your draft before Friday, Mr. Jean ',
    blank2Options: ['will review', 'reviews', 'reviewed'],
    correctBlank2: 'will review',
    sentenceEnd: ' it with detailed comments.',
    fullSentence: 'If you send your draft before Friday, Mr. Jean will review it with detailed comments.',
    hint: 'Real condition now (send) leading to a future action by the teacher (will review).',
    explanation: 'First Conditional: If + Present Simple (send), WILL + Verb (will review) for a future promise.',
  },
  {
    id: 'b3',
    title: 'Lab Safety Protocol',
    type: 'zero',
    scenario: 'Mandatory eye safety habit in the school science lab',
    sentenceBefore: 'If students enter the chemistry lab, they ',
    blank1Options: ['wear', 'will wear', 'wore'],
    correctBlank1: 'wear',
    sentenceMiddle: '',
    sentenceEnd: ' protective safety goggles.',
    fullSentence: 'If students enter the chemistry lab, they wear protective safety goggles.',
    hint: 'Safety regulations are permanent rules. The subject "they" takes Present Simple base form.',
    explanation: 'Zero Conditional fact/rule: If students enter, they wear (both Present Simple).',
  },
  {
    id: 'b4',
    title: 'Study Group Forecast',
    type: 'first',
    scenario: 'Group study session planned for tonight before the grammar test',
    sentenceBefore: 'If we ',
    blank1Options: ['organize', 'will organize', 'organized'],
    correctBlank1: 'organize',
    sentenceMiddle: ' a study group tonight, we ',
    blank2Options: ['will understand', 'understand', 'understood'],
    correctBlank2: 'will understand',
    sentenceEnd: ' the grammar rules much better.',
    fullSentence: 'If we organize a study group tonight, we will understand the grammar rules much better.',
    hint: "Notice 'tonight' describes an upcoming scenario with an expected future gain (will understand).",
    explanation: 'First Conditional: If + Present Simple (organize), WILL + Verb (will understand).',
  },
  {
    id: 'b5',
    title: 'Digital Assignment Portal',
    type: 'zero',
    scenario: 'Automated notification whenever homework is submitted',
    sentenceBefore: 'If a student submits their assignment online, the platform ',
    blank1Options: ['sends', 'will send', 'sent'],
    correctBlank1: 'sends',
    sentenceMiddle: '',
    sentenceEnd: ' a confirmation receipt.',
    fullSentence: 'If a student submits their assignment online, the platform sends a confirmation receipt.',
    hint: 'Computer systems perform automated actions every time. Use 3rd-person singular present (sends).',
    explanation: 'Zero Conditional system rule: If a student submits, the platform sends (Present Simple).',
  },
  {
    id: 'b6',
    title: 'Daily Speaking Practice',
    type: 'first',
    scenario: 'Carlos aims to boost his conversational English this month',
    sentenceBefore: 'If Carlos ',
    blank1Options: ['practices', 'will practice', 'practiced'],
    correctBlank1: 'practices',
    sentenceMiddle: ' English every day this month, he ',
    blank2Options: ['will improve', 'improves', 'improved'],
    correctBlank2: 'will improve',
    sentenceEnd: ' his speaking fluency rapidly.',
    fullSentence: 'If Carlos practices English every day this month, he will improve his speaking fluency rapidly.',
    hint: 'Condition: singular present (practices). Future outcome: modal WILL (will improve).',
    explanation: 'First Conditional: If + Present Simple (practices), WILL + Verb (will improve) for future progress.',
  },
];

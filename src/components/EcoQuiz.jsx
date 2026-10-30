import { useState, useEffect, useCallback, useRef } from 'react';
import '../styles/EcoQuiz.css';

/* ── Question Bank ── */
const questionBank = {
  water: [
    {
      emoji: '💧',
      question: 'كم لتر ماء يضيع عندما تسيب الحنفية مفتوحة وأنت بتغسل سنانك؟',
      options: ['لتر واحد', '٥ لترات', 'أكثر من ١٠ لترات', '٢٠ لتر'],
      correct: 2,
      hint: 'فكّر في المدة اللي الحنفية بتكون فيها مفتوحة!',
      explanation: 'الحنفية المفتوحة ممكن تضيّع أكثر من ١٠ لترات في الدقيقة! 💧',
      points: 10,
    },
    {
      emoji: '🚿',
      question: 'إيه أحسن طريقة لتوفير المياه في البيت؟',
      options: ['سيب الحنفية مفتوحة', 'خد دش قصير بدل البانيو', 'اغسل العربية كل يوم', 'اسقي النباتات بالليل'],
      correct: 1,
      hint: 'فكّر في كمية المياه اللي كل طريقة بتستخدمها',
      explanation: 'الدش القصير بيوفر لحد ١٥٠ لتر مقارنة بالبانيو! 🚿',
      points: 10,
    },
    {
      emoji: '🌊',
      question: 'كم نسبة المياه العذبة على كوكب الأرض؟',
      options: ['٥٠٪', '٢٥٪', '٣٪ فقط', '١٠٪'],
      correct: 2,
      hint: 'النسبة أقل بكتير مما تتخيل!',
      explanation: 'بس ٣٪ من مياه الأرض عذبة، وأغلبها متجمدة! 🧊',
      points: 15,
    },
    {
      emoji: '🪣',
      question: 'إيه أفضل وقت لسقي النباتات؟',
      options: ['وقت الظهر', 'الصبح بدري أو المغرب', 'في نص الليل', 'مش مهم الوقت'],
      correct: 1,
      hint: 'فكّر في الشمس والتبخر! ☀️',
      explanation: 'السقي الصبح أو المغرب يقلل التبخر ويوفر المياه! 🌱',
      points: 10,
    },
    {
      emoji: '🐟',
      question: 'إيه اللي بيلوث المياه أكتر؟',
      options: ['رمي الزبالة في النهر', 'الصيد', 'السباحة', 'ركوب القوارب'],
      correct: 0,
      hint: 'فكّر في حاجة بتأذي الكائنات البحرية',
      explanation: 'الزبالة بتسمم المياه وبتأذي الأسماك والحيوانات البحرية! 🐠',
      points: 10,
    },
  ],
  recycle: [
    {
      emoji: '♻️',
      question: 'إيه اللي ممكن نعيد تدويره؟',
      options: ['الورق والكرتون', 'بواقي الأكل فقط', 'الرمل', 'الهواء'],
      correct: 0,
      hint: 'فكّر في المواد اللي ممكن نستخدمها تاني',
      explanation: 'الورق والكرتون من أسهل المواد اللي ممكن نعيد تدويرها! 📄',
      points: 10,
    },
    {
      emoji: '🥫',
      question: 'العلب المعدنية ممكن تتحول لإيه بعد إعادة التدوير؟',
      options: ['ورق', 'علب جديدة أو أجزاء سيارات', 'ملابس', 'أكل'],
      correct: 1,
      hint: 'المعادن ممكن تتصهر وتتشكل من جديد!',
      explanation: 'المعادن ممكن تتصهر وتبقى علب جديدة أو حتى أجزاء عربيات! 🚗',
      points: 10,
    },
    {
      emoji: '🗑️',
      question: 'لون سلة إعادة تدوير الورق عادة بيكون إيه؟',
      options: ['أحمر', 'أخضر', 'أزرق', 'أصفر'],
      correct: 2,
      hint: 'فكّر في لون السما! ☁️',
      explanation: 'السلة الزرقاء عادة مخصصة للورق والكرتون! 📦',
      points: 10,
    },
    {
      emoji: '📦',
      question: 'كام شجرة بتتقطع عشان نعمل طن ورق واحد؟',
      options: ['٢ شجرة', '٥ شجرات', 'حوالي ١٧ شجرة', '١٠٠ شجرة'],
      correct: 2,
      hint: 'الرقم أكبر مما تفتكر!',
      explanation: 'حوالي ١٧ شجرة بتتقطع لطن ورق واحد! إعادة التدوير بتنقذ الأشجار! 🌳',
      points: 15,
    },
    {
      emoji: '🧴',
      question: 'البلاستيك بياخد قد إيه عشان يتحلل في الطبيعة؟',
      options: ['سنة', '١٠ سنين', '١٠٠ سنة', 'أكتر من ٤٠٠ سنة'],
      correct: 3,
      hint: 'فترة طويلة جداً جداً! 😱',
      explanation: 'البلاستيك ممكن ياخد أكتر من ٤٠٠ سنة! عشان كده لازم نقلل استخدامه! 🚫',
      points: 15,
    },
  ],
  energy: [
    {
      emoji: '💡',
      question: 'إيه أحسن طريقة لتوفير الكهرباء في البيت؟',
      options: ['سيب النور مفتوح', 'استخدم لمبات LED', 'افتح التكييف على أقل درجة', 'شغّل كل الأجهزة مع بعض'],
      correct: 1,
      hint: 'فكّر في نوع اللمبات الموفرة للطاقة!',
      explanation: 'لمبات LED بتوفر لحد ٨٠٪ من الكهرباء مقارنة باللمبات العادية! 💡',
      points: 10,
    },
    {
      emoji: '☀️',
      question: 'الطاقة الشمسية بتيجي منين؟',
      options: ['من باطن الأرض', 'من القمر', 'من الشمس', 'من الرياح'],
      correct: 2,
      hint: 'الاسم فيه الإجابة! 😊',
      explanation: 'الطاقة الشمسية بتحول ضوء الشمس لكهرباء نظيفة! ☀️',
      points: 10,
    },
    {
      emoji: '🌬️',
      question: 'طاقة الرياح بتشتغل إزاي؟',
      options: ['بتسخن المياه', 'بتدور توربينات بتولد كهرباء', 'بتضغط الهواء', 'بتحرك السحب'],
      correct: 1,
      hint: 'فكّر في المراوح الكبيرة اللي بتشوفها!',
      explanation: 'التوربينات بتدور بفعل الرياح وبتولد كهرباء نظيفة! 🌀',
      points: 10,
    },
    {
      emoji: '🔌',
      question: 'الشاحن لو فاضل في الكهرباء من غير موبايل، بيستهلك كهرباء؟',
      options: ['لا خالص', 'أيوا بيستهلك كهرباء قليلة', 'بس لو النور مفتوح', 'بيستهلك كتير'],
      correct: 1,
      hint: 'ده اسمه "استهلاك الطاقة الوهمية"!',
      explanation: 'الشاحن الفاضي بيستهلك كهرباء! اطلعه من الفيشة لما تخلص شحن 🔋',
      points: 15,
    },
    {
      emoji: '🏠',
      question: 'إيه أكتر جهاز بيستهلك كهرباء في البيت؟',
      options: ['الموبايل', 'التكييف أو السخان', 'التلفزيون', 'اللمبة'],
      correct: 1,
      hint: 'فكّر في الأجهزة اللي بتسخن أو بتبرد!',
      explanation: 'أجهزة التبريد والتسخين بتستهلك أكتر كهرباء في البيت! ❄️🔥',
      points: 10,
    },
  ],
  nature: [
    {
      emoji: '🌳',
      question: 'الأشجار بتساعد الأرض إزاي؟',
      options: ['بتمتص ثاني أكسيد الكربون وبتطلع أكسجين', 'بتعمل ضوضاء', 'بتسخن الجو', 'مفيش فايدة منها'],
      correct: 0,
      hint: 'فكّر في الهواء اللي بنتنفسه! 🌬️',
      explanation: 'الأشجار هي رئة الأرض! بتنظف الهواء وبتقلل الاحتباس الحراري! 🌍',
      points: 10,
    },
    {
      emoji: '🐝',
      question: 'ليه النحل مهم جداً للبيئة؟',
      options: ['بيعمل عسل بس', 'بيلقح النباتات عشان تثمر', 'بيلدغ الحشرات الضارة', 'مش مهم'],
      correct: 1,
      hint: 'فكّر في دور النحل لما بيطير من زهرة لزهرة 🌸',
      explanation: 'النحل بيلقح ٧٥٪ من المحاصيل الغذائية! من غيره مش هنلاقي أكل كفاية! 🍎',
      points: 15,
    },
    {
      emoji: '🌍',
      question: 'إيه معنى "الاحتباس الحراري"؟',
      options: ['البرد الشديد', 'ارتفاع درجة حرارة الأرض بسبب الغازات', 'زيادة الأشجار', 'نقص المياه'],
      correct: 1,
      hint: 'فكّر في الأرض كأنها جوا صوبة زجاجية! 🏠',
      explanation: 'الاحتباس الحراري يعني إن الغازات بتحبس الحرارة حوالين الأرض! 🌡️',
      points: 15,
    },
    {
      emoji: '🦁',
      question: 'كام نوع حيوان معرض للانقراض دلوقتي؟',
      options: ['١٠ أنواع', '١٠٠ نوع', 'أكتر من ٤٠,٠٠٠ نوع', '٥ أنواع بس'],
      correct: 2,
      hint: 'الرقم مخيف فعلاً! 😢',
      explanation: 'أكتر من ٤٠,٠٠٠ نوع حيوان مهدد بالانقراض! لازم نحميهم! 🐾',
      points: 15,
    },
    {
      emoji: '🌱',
      question: 'إيه أسهل حاجة ممكن تعملها عشان تساعد البيئة؟',
      options: ['مش لازم أعمل حاجة', 'ازرع شجرة أو نبتة', 'ارمي زبالة أكتر', 'استخدم بلاستيك أكتر'],
      correct: 1,
      hint: 'حاجة بسيطة لكن ليها تأثير كبير! 💚',
      explanation: 'زراعة شجرة واحدة ممكن تمتص ٢٢ كيلو ثاني أكسيد الكربون في السنة! 🌳',
      points: 10,
    },
  ],
};

const topics = [
  { key: 'water', name: 'المياه', icon: '💧', count: questionBank.water.length },
  { key: 'recycle', name: 'إعادة التدوير', icon: '♻️', count: questionBank.recycle.length },
  { key: 'energy', name: 'الطاقة', icon: '⚡', count: questionBank.energy.length },
  { key: 'nature', name: 'الطبيعة', icon: '🌿', count: questionBank.nature.length },
];

const letters = ['A', 'B', 'C', 'D'];

const feedbackMessages = {
  correct: ['أحسنت! 🎉', 'برافو عليك! ⭐', 'ممتاز! 🌟', 'عبقري! 🧠', 'رائع جداً! 💚'],
  wrong: ['حاول تاني! 💪', 'مش مشكلة، بنتعلم! 📚', 'قرب! حاول كمان 🌱', 'المرة الجاية إن شاء الله! ✨'],
};

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/* ── Confetti Component ── */
function Confetti() {
  const colors = ['#22c55e', '#fbbf24', '#3b82f6', '#ef4444', '#a855f7', '#ec4899'];
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    size: `${6 + Math.random() * 8}px`,
    rotation: `${Math.random() * 360}deg`,
  }));

  return (
    <div className="eq-confetti">
      {pieces.map(p => (
        <div
          key={p.id}
          className="eq-confetti-piece"
          style={{
            backgroundColor: p.color,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            transform: `rotate(${p.rotation})`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Main Component ── */
export default function EcoQuiz({ onBack }) {
  const [screen, setScreen] = useState('welcome'); // welcome | quiz | results
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [feedback, setFeedback] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [scorePop, setScorePop] = useState(null);
  const timerRef = useRef(null);

  // Timer
  const getTimeLimit = useCallback(() => {
    switch (difficulty) {
      case 'easy': return 30;
      case 'medium': return 20;
      case 'hard': return 12;
      default: return 20;
    }
  }, [difficulty]);

  useEffect(() => {
    if (timerActive && timer > 0) {
      timerRef.current = setTimeout(() => setTimer(t => t - 1), 1000);
    } else if (timerActive && timer === 0) {
      handleTimeout();
    }
    return () => clearTimeout(timerRef.current);
  }, [timer, timerActive]);

  const handleTimeout = () => {
    setTimerActive(false);
    setAnswered(true);
    setStreak(0);
    setFeedback({ type: 'wrong', message: 'انتهى الوقت! ⏰' });
    setTimeout(() => setFeedback(null), 2000);
  };

  const startGame = () => {
    if (!selectedTopic) return;
    const topicQuestions = questionBank[selectedTopic];
    const numQuestions = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : topicQuestions.length;
    const shuffled = shuffleArray(topicQuestions).slice(0, numQuestions);
    setQuestions(shuffled);
    setCurrentQ(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setSelected(null);
    setShowHint(false);
    setHintsLeft(3);
    setFeedback(null);
    setAnswered(false);
    setTimer(getTimeLimit());
    setTimerActive(true);
    setScreen('quiz');
  };

  const handleAnswer = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    setTimerActive(false);

    const q = questions[currentQ];
    const isCorrect = index === q.correct;

    if (isCorrect) {
      const timeBonus = Math.floor(timer / 2);
      const streakBonus = streak >= 2 ? 5 : 0;
      const earned = q.points + timeBonus + streakBonus;
      setScore(s => s + earned);
      setStreak(s => s + 1);
      setMaxStreak(m => Math.max(m, streak + 1));
      setCorrectCount(c => c + 1);
      setScorePop(`+${earned}`);
      setTimeout(() => setScorePop(null), 800);

      const msg = feedbackMessages.correct[Math.floor(Math.random() * feedbackMessages.correct.length)];
      setFeedback({ type: 'correct', message: msg });
    } else {
      setStreak(0);
      const msg = feedbackMessages.wrong[Math.floor(Math.random() * feedbackMessages.wrong.length)];
      setFeedback({ type: 'wrong', message: msg });
    }

    setTimeout(() => setFeedback(null), 2500);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      setScreen('results');
    } else {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setShowHint(false);
      setAnswered(false);
      setFeedback(null);
      setTimer(getTimeLimit());
      setTimerActive(true);
    }
  };

  const useHint = () => {
    if (hintsLeft > 0 && !showHint) {
      setShowHint(true);
      setHintsLeft(h => h - 1);
    }
  };

  const restartGame = () => {
    setScreen('welcome');
    setSelectedTopic(null);
  };

  const getStars = () => {
    const pct = (correctCount / questions.length) * 100;
    if (pct >= 90) return 3;
    if (pct >= 60) return 2;
    if (pct >= 30) return 1;
    return 0;
  };

  const getResultTitle = () => {
    const stars = getStars();
    if (stars === 3) return { text: 'بطل البيئة! 🏆', class: 'excellent' };
    if (stars === 2) return { text: 'أداء ممتاز! 👏', class: 'good' };
    if (stars >= 1) return { text: 'بداية كويسة! 💪', class: 'okay' };
    return { text: 'حاول تاني! 🌱', class: 'okay' };
  };

  const getImpactMessage = () => {
    const topicData = topics.find(t => t.key === selectedTopic);
    const messages = {
      water: `تعلمت ${correctCount} معلومات عن المياه! كل معلومة بتساعدك توفر مياه أكتر 💧`,
      recycle: `عرفت ${correctCount} حقائق عن إعادة التدوير! أنت بتساعد تنقذ الأشجار 🌳`,
      energy: `اكتشفت ${correctCount} طرق لتوفير الطاقة! كوكبنا بيشكرك ⚡`,
      nature: `اتعلمت ${correctCount} معلومات عن الطبيعة! أنت حامي البيئة 🌍`,
    };
    return messages[selectedTopic] || '';
  };

  /* ── Render Welcome Screen ── */
  if (screen === 'welcome') {
    return (
      <div className="eq-page" dir="rtl">
        <span className="eq-leaf">🍃</span>
        <span className="eq-leaf">🌿</span>
        <span className="eq-leaf">🍀</span>

        <div className="eq-topbar">
          <button className="eq-back" onClick={onBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            رجوع
          </button>
        </div>

        <div className="eq-container">
          <div className="eq-welcome">
            <div className="eq-welcome-mascot">🌍</div>
            <h1>كويز <span>البيئة</span></h1>
            <p className="eq-welcome-desc">
              اختبر معلوماتك عن البيئة واكسب نقاط! 🌱
              <br />اختار الموضوع والمستوى وابدأ المغامرة
            </p>

            {/* Topics */}
            <div className="eq-topics">
              {topics.map(t => (
                <button
                  key={t.key}
                  className={`eq-topic-card${selectedTopic === t.key ? ' selected' : ''}`}
                  onClick={() => setSelectedTopic(t.key)}
                >
                  <span className="eq-topic-icon">{t.icon}</span>
                  <div className="eq-topic-name">{t.name}</div>
                  <div className="eq-topic-count">{t.count} أسئلة</div>
                </button>
              ))}
            </div>

            {/* Difficulty */}
            <div className="eq-difficulty">
              {[
                { key: 'easy', label: '😊 سهل' },
                { key: 'medium', label: '🤔 متوسط' },
                { key: 'hard', label: '🔥 صعب' },
              ].map(d => (
                <button
                  key={d.key}
                  className={`eq-diff-btn${difficulty === d.key ? ' active' : ''}`}
                  onClick={() => setDifficulty(d.key)}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <button
              className="eq-start-btn"
              onClick={startGame}
              disabled={!selectedTopic}
            >
              🚀 ابدأ الكويز
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Render Quiz Screen ── */
  if (screen === 'quiz') {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;

    return (
      <div className="eq-page" dir="rtl">
        <span className="eq-leaf">🍃</span>
        <span className="eq-leaf">🌿</span>

        <div className="eq-topbar">
          <button className="eq-back" onClick={restartGame}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            خروج
          </button>
          <div className="eq-score-badge" style={{ position: 'relative' }}>
            <span className="eq-score-icon">⭐</span>
            <span className="eq-score-value">{score}</span>
            <span className="eq-score-label">نقطة</span>
            {streak >= 2 && (
              <span className="eq-streak">🔥 {streak}x</span>
            )}
            {scorePop && <span className="eq-score-pop">{scorePop}</span>}
          </div>
        </div>

        <div className="eq-container">
          <div className="eq-quiz">
            {/* Progress */}
            <div className="eq-progress-wrap">
              <div className="eq-progress-info">
                <span className="eq-progress-text">
                  سؤال {currentQ + 1} من {questions.length}
                </span>
                <span className={`eq-progress-timer${timer <= 5 ? ' warning' : ''}`}>
                  ⏱️ {timer} ثانية
                </span>
              </div>
              <div className="eq-progress-bar">
                <div className="eq-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Question Card */}
            <div className="eq-question-card">
              <div className="eq-question-emoji">{q.emoji}</div>
              <h2 className="eq-question-text">{q.question}</h2>

              {showHint && (
                <div className="eq-hint">
                  <span className="eq-hint-icon">💡</span>
                  {q.hint}
                </div>
              )}

              <div className="eq-options">
                {q.options.map((opt, i) => {
                  let cls = 'eq-option';
                  if (answered) {
                    if (i === q.correct) cls += ' correct';
                    else if (i === selected) cls += ' wrong';
                    else cls += ' disabled';
                  }

                  return (
                    <button
                      key={i}
                      className={cls}
                      onClick={() => handleAnswer(i)}
                      disabled={answered}
                    >
                      <span className="eq-option-letter">{letters[i]}</span>
                      <span className="eq-option-text">{opt}</span>
                      {answered && i === q.correct && <span className="eq-option-result">✅</span>}
                      {answered && i === selected && i !== q.correct && <span className="eq-option-result">❌</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation after answer */}
            {answered && (
              <div className="eq-hint" style={{ marginBottom: 'var(--space-4)' }}>
                <span className="eq-hint-icon">📖</span>
                {q.explanation}
              </div>
            )}

            {/* Actions */}
            <div className="eq-actions">
              <button
                className="eq-hint-btn"
                onClick={useHint}
                disabled={hintsLeft <= 0 || showHint || answered}
              >
                💡 تلميح ({hintsLeft})
              </button>

              {answered && (
                <button className="eq-next-btn" onClick={nextQuestion}>
                  {currentQ + 1 >= questions.length ? '📊 النتيجة' : 'السؤال التالي'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Feedback toast */}
        {feedback && (
          <div className={`eq-feedback ${feedback.type}`}>
            {feedback.message}
          </div>
        )}
      </div>
    );
  }

  /* ── Render Results Screen ── */
  if (screen === 'results') {
    const stars = getStars();
    const result = getResultTitle();
    const pct = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="eq-page" dir="rtl">
        <span className="eq-leaf">🍃</span>
        <span className="eq-leaf">🌿</span>
        <span className="eq-leaf">🍀</span>

        <div className="eq-topbar">
          <button className="eq-back" onClick={onBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            الرئيسية
          </button>
        </div>

        <div className="eq-container">
          <div className="eq-results">
            <div className="eq-results-card">
              {stars >= 2 && <Confetti />}

              <div className="eq-results-mascot">
                {stars === 3 ? '🏆' : stars === 2 ? '🌟' : stars === 1 ? '💪' : '🌱'}
              </div>

              {/* Stars */}
              <div className="eq-stars">
                {[1, 2, 3].map(s => (
                  <span
                    key={s}
                    className={`eq-star ${s <= stars ? 'filled' : 'empty'}`}
                    style={{ animationDelay: `${s * 0.2}s` }}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              <h2 className={result.class}>{result.text}</h2>
              <p className="eq-results-subtitle">
                أجبت على {correctCount} من {questions.length} أسئلة صح ({pct}%)
              </p>

              {/* Stats */}
              <div className="eq-stats">
                <div className="eq-stat">
                  <div className="eq-stat-icon">⭐</div>
                  <div className="eq-stat-value">{score}</div>
                  <div className="eq-stat-label">النقاط</div>
                </div>
                <div className="eq-stat">
                  <div className="eq-stat-icon">🔥</div>
                  <div className="eq-stat-value">{maxStreak}</div>
                  <div className="eq-stat-label">أعلى سلسلة</div>
                </div>
                <div className="eq-stat">
                  <div className="eq-stat-icon">💡</div>
                  <div className="eq-stat-value">{3 - hintsLeft}</div>
                  <div className="eq-stat-label">تلميحات</div>
                </div>
              </div>

              {/* Eco Impact */}
              <div className="eq-impact">
                <span className="eq-impact-icon">🌍</span>
                <div className="eq-impact-text">
                  <div className="eq-impact-title">أثرك البيئي</div>
                  <div className="eq-impact-desc">{getImpactMessage()}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="eq-result-actions">
                <button className="eq-play-again" onClick={restartGame}>
                  🔄 العب تاني
                </button>
                <button className="eq-home-btn" onClick={onBack}>
                  🏠 الرئيسية
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

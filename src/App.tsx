import { useState, useCallback } from 'react';
import './styles.css';

const wisdomBank: string[] = [
  "The obstacle is the way. What blocks your path becomes your path.",
  "Done is better than perfect. Ship it, learn, iterate.",
  "You cannot think your way into a new way of acting. You must act your way into a new way of thinking.",
  "The best time to start was yesterday. The second best time is now.",
  "What you're avoiding is exactly what you need to face.",
  "Sleep on it. Tomorrow's clarity will thank you.",
  "Say no to almost everything, so you can say yes to what matters.",
  "The discomfort you feel is growth in disguise.",
  "Stop optimizing. Start doing.",
  "Your future self will thank you for the hard choice you make today.",
  "Trust your gut — it's been collecting data your whole life.",
  "The answer you seek requires the question you're afraid to ask.",
  "Consistency beats intensity. Show up every day, even when it's small.",
  "Let go of what you cannot control. Double down on what you can.",
  "The person who makes fewer decisions makes better decisions. Simplify ruthlessly.",
  "Fear is just excitement without breath. Breathe deeply.",
  "You don't need permission. You need to begin.",
  "The cost of inaction always exceeds the cost of action.",
  "What would this look like if it were easy? Start there.",
  "Your environment shapes your behavior. Design it wisely.",
  "Progress, not perfection. One step forward is still forward.",
  "The truth you're resisting is the truth you most need to hear.",
  "Time is the only resource you can't get back. Spend it like it matters.",
  "Comparison is the thief of joy. Run your own race.",
  "When in doubt, choose the path that scares you more — that's where growth lives.",
  "Rest is not the opposite of productivity. It's the foundation of it.",
  "You teach people how to treat you. Set the standard.",
  "The conversation you're avoiding is the relationship you're losing.",
  "Motivation follows action, not the other way around. Move first.",
  "Your comfort zone is a beautiful place, but nothing ever grows there.",
];

function App() {
  const [question, setQuestion] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);

  const getAdvice = useCallback(() => {
    if (!question.trim()) return;

    setIsRevealing(true);
    setHasAsked(true);

    // Simulate contemplation delay
    setTimeout(() => {
      const randomAdvice = wisdomBank[Math.floor(Math.random() * wisdomBank.length)];
      setAdvice(randomAdvice);
      setIsRevealing(false);
    }, 1500);
  }, [question]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      getAdvice();
    }
  };

  const askAgain = () => {
    setAdvice(null);
    setQuestion('');
    setHasAsked(false);
  };

  return (
    <div className="oracle-container">
      <div className="grain-overlay" />

      <div className="content-wrapper">
        <header className="oracle-header">
          <div className="oracle-symbol">&#9673;</div>
          <h1 className="oracle-title">The Oracle</h1>
          <p className="oracle-subtitle">Ask, and wisdom shall be revealed</p>
        </header>

        <main className="oracle-main">
          {!hasAsked ? (
            <div className="input-section">
              <div className="scroll-container">
                <textarea
                  className="question-input"
                  placeholder="What troubles your mind?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={3}
                />
                <div className="scroll-decoration scroll-top" />
                <div className="scroll-decoration scroll-bottom" />
              </div>
              <button
                className="seek-button"
                onClick={getAdvice}
                disabled={!question.trim()}
              >
                <span className="button-text">Seek Wisdom</span>
                <span className="button-glow" />
              </button>
            </div>
          ) : (
            <div className="advice-section">
              {isRevealing ? (
                <div className="contemplation">
                  <div className="contemplation-orb">
                    <div className="orb-ring orb-ring-1" />
                    <div className="orb-ring orb-ring-2" />
                    <div className="orb-ring orb-ring-3" />
                    <div className="orb-core" />
                  </div>
                  <p className="contemplation-text">The Oracle contemplates...</p>
                </div>
              ) : (
                <div className="wisdom-reveal">
                  <div className="wisdom-decoration">&#10022;</div>
                  <blockquote className="wisdom-text">
                    {advice}
                  </blockquote>
                  <div className="wisdom-decoration">&#10022;</div>
                  <button className="ask-again-button" onClick={askAgain}>
                    Seek Again
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <footer className="oracle-footer">
        <p>Requested by @LEZZYBRUV · Built by @clonkbot</p>
      </footer>
    </div>
  );
}

export default App;

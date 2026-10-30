import { useMemo, useState, useCallback } from 'react';
import { missions } from '../data/missions';
import logo from '../assets/ecoventure-logo.png';
import '../styles/TeacherDashboard.css';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const PERFORMANCE_LEVELS = [
  { id: 'excellent', label: 'Excellent', emoji: '🌟', multiplier: 1.0 },
  { id: 'good', label: 'Good', emoji: '🌿', multiplier: 0.8 },
  { id: 'fair', label: 'Fair', emoji: '👍', multiplier: 0.6 },
  { id: 'needs-work', label: 'Needs Work', emoji: '🌱', multiplier: 0.4 },
];

export default function TeacherDashboard({ onExit, students, setStudents, teams, setTeams }) {
  const [tab, setTab] = useState('scores');
  const [teamName, setTeamName] = useState('');
  const [teamSize, setTeamSize] = useState(2);
  const [members, setMembers] = useState(['', '']);
  const [topic, setTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [game, setGame] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [savedChallenges, setSavedChallenges] = useState([]);
  const [challengeSaved, setChallengeSaved] = useState(false);

  // Combine official missions with any saved AI missions
  const allMissions = useMemo(() => [
    ...missions.map(m => ({
      id: m.id,
      title: m.title,
      emoji: m.emoji || '🎯',
      points: m.points || 20,
      category: m.category,
      type: 'official'
    })),
    ...savedChallenges.map(c => ({
      id: c.id,
      title: c.title,
      emoji: c.icon || '🤖',
      points: 15,
      category: c.category || 'AI Mission',
      type: 'ai'
    })),
    {
      id: 'general-eco',
      title: 'General Classroom Eco Action',
      emoji: '🌍',
      points: 20,
      category: 'General',
      type: 'general'
    }
  ], [savedChallenges]);

  // Student scoring states
  const [selectedStudent, setSelectedStudent] = useState('');
  const [studentMissionId, setStudentMissionId] = useState(missions[0]?.id || 'give-paper-a-second-life');
  const [studentPerformance, setStudentPerformance] = useState('excellent');
  const [points, setPoints] = useState(String(missions[0]?.points || 20));
  const [scoreNote, setScoreNote] = useState('');

  // Team scoring states
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamMissionId, setTeamMissionId] = useState(missions[0]?.id || 'give-paper-a-second-life');
  const [teamPerformance, setTeamPerformance] = useState('excellent');
  const [teamPoints, setTeamPoints] = useState(String(missions[0]?.points || 20));
  const [teamScoreNote, setTeamScoreNote] = useState('');

  // Recent evaluation history log
  const [recentAwards, setRecentAwards] = useState([
    {
      id: 1,
      targetType: 'student',
      targetName: 'Ahmed Mohamed',
      missionTitle: 'Give Paper a Second Life',
      missionEmoji: '📄',
      points: 20,
      performance: 'Outstanding',
      performanceEmoji: '🌟',
      timestamp: 'Today, 10:30 AM'
    },
    {
      id: 2,
      targetType: 'student',
      targetName: 'Sara Ali',
      missionTitle: 'Save Water',
      missionEmoji: '💧',
      points: 20,
      performance: 'Very Good',
      performanceEmoji: '🌿',
      timestamp: 'Today, 09:15 AM'
    }
  ]);

  const currentStudentMission = allMissions.find(m => m.id === studentMissionId) || allMissions[0];
  const currentTeamMission = allMissions.find(m => m.id === teamMissionId) || allMissions[0];

  const handleStudentMissionChange = (newMissionId) => {
    setStudentMissionId(newMissionId);
    const mission = allMissions.find(m => m.id === newMissionId);
    if (!mission) return;
    const basePts = mission.points || 20;
    const perf = PERFORMANCE_LEVELS.find(p => p.id === studentPerformance);
    if (perf && perf.multiplier !== null) {
      setPoints(String(Math.round(basePts * perf.multiplier)));
    }
  };

  const handleStudentPerformanceChange = (perfId) => {
    setStudentPerformance(perfId);
    const perf = PERFORMANCE_LEVELS.find(p => p.id === perfId);
    if (!perf || perf.multiplier === null) return;
    const mission = allMissions.find(m => m.id === studentMissionId) || allMissions[0];
    const basePts = mission?.points || 20;
    setPoints(String(Math.round(basePts * perf.multiplier)));
  };

  const adjustStudentPoints = (delta) => {
    const current = Number(points) || 0;
    const next = Math.max(1, current + delta);
    setPoints(String(next));
    setStudentPerformance('custom');
  };

  const handleTeamMissionChange = (newMissionId) => {
    setTeamMissionId(newMissionId);
    const mission = allMissions.find(m => m.id === newMissionId);
    if (!mission) return;
    const basePts = mission.points || 20;
    const perf = PERFORMANCE_LEVELS.find(p => p.id === teamPerformance);
    if (perf && perf.multiplier !== null) {
      setTeamPoints(String(Math.round(basePts * perf.multiplier)));
    }
  };

  const handleTeamPerformanceChange = (perfId) => {
    setTeamPerformance(perfId);
    const perf = PERFORMANCE_LEVELS.find(p => p.id === perfId);
    if (!perf || perf.multiplier === null) return;
    const mission = allMissions.find(m => m.id === teamMissionId) || allMissions[0];
    const basePts = mission?.points || 20;
    setTeamPoints(String(Math.round(basePts * perf.multiplier)));
  };

  const adjustTeamPoints = (delta) => {
    const current = Number(teamPoints) || 0;
    const next = Math.max(1, current + delta);
    setTeamPoints(String(next));
    setTeamPerformance('custom');
  };

  const availableStudents = useMemo(() => students.filter(student => !teams.some(team => team.members.includes(student.name))), [students, teams]);

  const addScore = (event) => {
    event.preventDefault();
    const numericPoints = Number(points);
    if (!selectedStudent || !Number.isFinite(numericPoints) || numericPoints <= 0) return;
    const student = students.find(s => s.id === Number(selectedStudent));
    const mission = allMissions.find(m => m.id === studentMissionId) || allMissions[0];
    const perf = PERFORMANCE_LEVELS.find(p => p.id === studentPerformance) || PERFORMANCE_LEVELS[0];

    setStudents(current => current.map(s => s.id === Number(selectedStudent) ? { ...s, points: s.points + numericPoints } : s));
    setScoreNote(`Added +${numericPoints} points to ${student?.name} for "${mission.title}" (${perf.label}).`);

    setRecentAwards(prev => [
      {
        id: Date.now(),
        targetType: 'student',
        targetName: student?.name,
        missionTitle: mission.title,
        missionEmoji: mission.emoji,
        points: numericPoints,
        performance: perf.label,
        performanceEmoji: perf.emoji,
        timestamp: 'Just now'
      },
      ...prev.slice(0, 7)
    ]);
  };

  const addTeamScore = (event) => {
    event.preventDefault();
    const numericPoints = Number(teamPoints);
    const team = teams.find(currentTeam => currentTeam.id === Number(selectedTeam));
    if (!team || !Number.isFinite(numericPoints) || numericPoints <= 0) return;
    const mission = allMissions.find(m => m.id === teamMissionId) || allMissions[0];
    const perf = PERFORMANCE_LEVELS.find(p => p.id === teamPerformance) || PERFORMANCE_LEVELS[0];

    setTeams(current => current.map(currentTeam => currentTeam.id === team.id
      ? { ...currentTeam, points: (currentTeam.points || 0) + numericPoints }
      : currentTeam
    ));
    setTeamScoreNote(`Added +${numericPoints} points to team ${team.name} for "${mission.title}" (${perf.label}).`);

    setRecentAwards(prev => [
      {
        id: Date.now(),
        targetType: 'team',
        targetName: team.name,
        missionTitle: mission.title,
        missionEmoji: mission.emoji,
        points: numericPoints,
        performance: perf.label,
        performanceEmoji: perf.emoji,
        timestamp: 'Just now'
      },
      ...prev.slice(0, 7)
    ]);
  };

  // Update team size - adjusts the members array accordingly
  const handleTeamSizeChange = (newSize) => {
    const size = Math.max(1, Math.min(20, Number(newSize) || 1));
    setTeamSize(size);
    setMembers(current => {
      if (size > current.length) {
        return [...current, ...Array(size - current.length).fill('')];
      }
      return current.slice(0, size);
    });
  };

  const saveTeam = (event) => {
    event.preventDefault();
    const cleanMembers = members.filter(Boolean);
    if (!teamName.trim() || cleanMembers.length < 1 || new Set(cleanMembers).size !== cleanMembers.length) return;
    setTeams(current => [...current, { id: Date.now(), name: teamName.trim(), members: cleanMembers, points: 0 }]);
    setTeamName('');
    setMembers(Array(teamSize).fill(''));
  };

  const removeTeam = (teamId) => {
    setTeams(current => current.filter(t => t.id !== teamId));
  };

  const updateMember = (index, value) => setMembers(current => current.map((member, memberIndex) => memberIndex === index ? value : member));

  // AI Game Generation using Gemini API
  const generateAIGame = useCallback(async () => {
    const topicText = topic === 'custom' ? customTopic.trim() : topic;
    if (!topicText) return;

    setAiLoading(true);
    setAiError('');
    setGame(null);
    setChallengeSaved(false);

    if (!GEMINI_API_KEY) {
      setAiError('AI generation is not configured. Add VITE_GEMINI_API_KEY to your local environment.');
      setAiLoading(false);
      return;
    }

    const prompt = `You are an expert environmental educator for primary school children (ages 7-12). Generate a creative, practical eco-friendly classroom activity/game about the topic: "${topicText}".

Return a JSON object with EXACTLY these fields (no markdown, no code fences, just raw JSON):
{
  "title": "Creative activity name",
  "duration": "Number of school days (e.g. '5 school days')",
  "description": "A one-sentence exciting description for students",
  "instructions": "Clear step-by-step instructions for the teacher to run the activity in class. Make it practical and engaging.",
  "materials": "List of simple, affordable materials needed (comma separated)",
  "evidence": "What students should bring back or show as proof of completion",
  "points": "Assessment guide with criteria and points (up to 15 points total), broken into 3 categories of 5 points each",
  "schedule": ["Day 1 task", "Day 2 task", ...],
  "steps": [
    {"text": "Step 1 description for students"},
    {"text": "Step 2 description for students"},
    {"text": "Step 3 description for students"}
  ]
}

Make the activity creative, fun, measurable, and safe for young children. The activity should be trackable over multiple days. The schedule should have one entry per day matching the duration.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 2048,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) throw new Error('No response from AI');

      // Parse JSON - strip any markdown code fences if present
      const cleanText = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      const parsed = JSON.parse(cleanText);

      setGame(parsed);
    } catch (err) {
      console.error('AI Generation Error:', err);
      setAiError(err.message === 'Failed to fetch'
        ? 'Could not connect to AI service. Check your internet connection.'
        : `AI generation failed: ${err.message}`
      );
    } finally {
      setAiLoading(false);
    }
  }, [topic, customTopic]);

  const saveAsChallenge = () => {
    if (!game) return;
    const newChallenge = {
      id: `ai-${Date.now()}`,
      category: topic === 'custom' ? customTopic.toLowerCase().replace(/\s+/g, '-') : topic,
      title: game.title,
      description: game.description || 'AI-generated eco challenge',
      duration: game.duration,
      type: 'Team',
      icon: '🤖',
      materials: game.materials?.split(',').map(m => m.trim()) || [],
      evidence: game.evidence,
      rubric: game.points,
      schedule: game.schedule || [],
      steps: game.steps || [],
      instructions: game.instructions,
      source: 'ai',
    };
    setSavedChallenges(prev => [...prev, newChallenge]);
    setChallengeSaved(true);
  };

  const topicOptions = [
    { value: '', label: 'Choose a topic...' },
    { value: 'recycling', label: '♻️ Recycling & Waste Sorting' },
    { value: 'water conservation', label: '💧 Water Conservation' },
    { value: 'energy saving', label: '⚡ Energy Saving' },
    { value: 'growing plants', label: '🌱 Growing Plants' },
    { value: 'biodiversity', label: '🦋 Biodiversity & Wildlife' },
    { value: 'clean air', label: '🌬️ Clean Air & Pollution' },
    { value: 'composting', label: '🍂 Composting' },
    { value: 'ocean protection', label: '🌊 Ocean & Marine Life' },
    { value: 'sustainable food', label: '🥕 Sustainable Food' },
    { value: 'custom', label: '✏️ Type your own topic...' },
  ];

  return (
    <main className="teacher-page">
      <header className="teacher-header">
        <button className="teacher-brand" onClick={onExit} aria-label="Ecoventure Home">
          <img src={logo} alt="Ecoventure" className="teacher-brand-logo" />
        </button>
        <button className="teacher-exit" onClick={onExit}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          Exit
        </button>
      </header>

      <section className="teacher-intro">
        <div className="teacher-intro-content">
          <p className="teacher-eyebrow">🎓 Teacher Dashboard</p>
          <h1>Manage Your Eco Classroom</h1>
          <p>Create teams, generate AI-powered activities, award points, and track student progress — all in one place.</p>
        </div>
        <div className="teacher-stats-row">
          <div className="teacher-stat">
            <span className="stat-number">{students.length}</span>
            <span className="stat-label">Students</span>
          </div>
          <div className="teacher-stat">
            <span className="stat-number">{teams.length}</span>
            <span className="stat-label">Teams</span>
          </div>
          <div className="teacher-stat">
            <span className="stat-number">{savedChallenges.length}</span>
            <span className="stat-label">AI Missions</span>
          </div>
        </div>
      </section>

      <nav className="teacher-tabs" aria-label="Teacher workspace sections">
        <button className={tab === 'scores' ? 'active' : ''} onClick={() => setTab('scores')}>
          <span className="tab-icon">🏆</span> Award Points
        </button>
        <button className={tab === 'teams' ? 'active' : ''} onClick={() => setTab('teams')}>
          <span className="tab-icon">👥</span> Create Teams
        </button>
        <button className={tab === 'games' ? 'active' : ''} onClick={() => setTab('games')}>
          <span className="tab-icon">🤖</span> AI Missions
        </button>
        {savedChallenges.length > 0 && (
          <button className={tab === 'saved' ? 'active' : ''} onClick={() => setTab('saved')}>
            <span className="tab-icon">📋</span> Saved ({savedChallenges.length})
          </button>
        )}
      </nav>

      <section className="teacher-content">
        {/* ── SCORES TAB ── */}
        {tab === 'scores' && <div className="teacher-grid scores-grid">
          {/* Student Evaluation Form */}
          <form className="teacher-card score-form" onSubmit={addScore}>
            <div className="card-label">STUDENT EVALUATION</div>
            <h2>Award Student Points</h2>
            <p>Select the activity, rate the student's performance, and award score.</p>

            <label>
              Student
              <select required value={selectedStudent} onChange={event => setSelectedStudent(event.target.value)}>
                <option value="">Choose a student</option>
                {students.map(student => (
                  <option value={student.id} key={student.id}>
                    {student.name} ({student.points} pts currently)
                  </option>
                ))}
              </select>
            </label>

            <label>
              Completed Mission / Activity
              <select value={studentMissionId} onChange={e => handleStudentMissionChange(e.target.value)}>
                {allMissions.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.emoji} {m.title} ({m.points} pts max)
                  </option>
                ))}
              </select>
            </label>

            <label>
              Performance Rating
              <div className="simple-perf-row">
                {PERFORMANCE_LEVELS.map(level => {
                  const isActive = studentPerformance === level.id;
                  const ptsVal = Math.round((currentStudentMission?.points || 20) * level.multiplier);
                  return (
                    <button
                      key={level.id}
                      type="button"
                      className={`simple-perf-btn${isActive ? ' active' : ''}`}
                      onClick={() => handleStudentPerformanceChange(level.id)}
                    >
                      <span className="simple-perf-name">{level.emoji} {level.label}</span>
                      <span className="simple-perf-pts">+{ptsVal} pts</span>
                    </button>
                  );
                })}
              </div>
            </label>

            <label>
              Points earned
              <input
                min="1"
                type="number"
                value={points}
                onChange={event => {
                  setPoints(event.target.value);
                  setStudentPerformance('custom');
                }}
              />
            </label>

            <button className="teacher-primary" type="submit">
              Add points
            </button>
            {scoreNote && <p className="form-success" role="status">✓ {scoreNote}</p>}
          </form>

          {/* Team Evaluation Form */}
          <form className="teacher-card score-form" onSubmit={addTeamScore}>
            <div className="card-label">TEAM EVALUATION</div>
            <h2>Award Team Points</h2>
            <p>Select the activity, rate the team's collaboration, and award score.</p>

            <label>
              Team
              <select required value={selectedTeam} onChange={event => setSelectedTeam(event.target.value)}>
                <option value="">Choose a team</option>
                {teams.map(team => (
                  <option value={team.id} key={team.id}>
                    {team.name} ({team.points || 0} pts currently)
                  </option>
                ))}
              </select>
            </label>

            <label>
              Completed Mission / Activity
              <select value={teamMissionId} onChange={e => handleTeamMissionChange(e.target.value)}>
                {allMissions.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.emoji} {m.title} ({m.points} pts max)
                  </option>
                ))}
              </select>
            </label>

            <label>
              Team Collaboration & Performance Rating
              <div className="simple-perf-row">
                {PERFORMANCE_LEVELS.map(level => {
                  const isActive = teamPerformance === level.id;
                  const ptsVal = Math.round((currentTeamMission?.points || 20) * level.multiplier);
                  return (
                    <button
                      key={level.id}
                      type="button"
                      className={`simple-perf-btn${isActive ? ' active' : ''}`}
                      onClick={() => handleTeamPerformanceChange(level.id)}
                    >
                      <span className="simple-perf-name">{level.emoji} {level.label}</span>
                      <span className="simple-perf-pts">+{ptsVal} pts</span>
                    </button>
                  );
                })}
              </div>
            </label>

            <label>
              Points earned
              <input
                min="1"
                type="number"
                value={teamPoints}
                onChange={event => {
                  setTeamPoints(event.target.value);
                  setTeamPerformance('custom');
                }}
              />
            </label>

            <button className="teacher-primary" type="submit" disabled={teams.length === 0}>
              Add team points
            </button>
            {teams.length === 0 && <p className="form-hint">Create a team first in the "Create Teams" tab.</p>}
            {teamScoreNote && <p className="form-success" role="status">✓ {teamScoreNote}</p>}
          </form>

          {/* Class Scoreboard */}
          <div className="teacher-card">
            <div className="card-label">CLASS LEADERBOARD</div>
            <h2>Student Standings</h2>
            <div className="score-list">
              {[...students].sort((a, b) => b.points - a.points).map((student, index) => (
                <div className="score-row" key={student.id}>
                  <span className="rank">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}</span>
                  <span>{student.name}</span>
                  <strong>{student.points} <small>pts</small></strong>
                </div>
              ))}
            </div>
          </div>

          {/* Team Scoreboard */}
          <div className="teacher-card">
            <div className="card-label">TEAM LEADERBOARD</div>
            <h2>Team Standings</h2>
            <div className="score-list">
              {[...teams].sort((a, b) => (b.points || 0) - (a.points || 0)).map((team, index) => (
                <div className="score-row" key={team.id}>
                  <span className="rank">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}</span>
                  <span>{team.name}</span>
                  <strong>{team.points || 0} <small>pts</small></strong>
                </div>
              ))}
            </div>
            {teams.length === 0 && <div className="empty-state">No teams yet. Build teams in the Teams tab!</div>}
          </div>

          {/* Recent Evaluations Feed */}
          {recentAwards.length > 0 && (
            <div className="teacher-card recent-awards-card">
              <div className="card-label">EVALUATION LOG</div>
              <h2>Recent Mission Awards</h2>
              <p>Record of recent scores granted based on activity performance.</p>
              <div className="recent-awards-list">
                {recentAwards.map(award => (
                  <div className="recent-award-row" key={award.id}>
                    <div className="recent-award-info">
                      <span className="recent-award-avatar">{award.targetType === 'team' ? '👥' : '🌱'}</span>
                      <div className="recent-award-details">
                        <span className="recent-award-name">
                          {award.targetName}
                          <span className={`recent-award-tag ${award.targetType === 'team' ? 'team-tag' : ''}`}>
                            {award.targetType}
                          </span>
                        </span>
                        <span className="recent-award-meta">
                          <span>{award.missionEmoji} {award.missionTitle}</span>
                          <span>•</span>
                          <span>{award.performanceEmoji} {award.performance}</span>
                        </span>
                      </div>
                    </div>
                    <div className="recent-award-points">
                      <span className="recent-award-badge">+{award.points} pts</span>
                      <span className="recent-award-time">{award.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>}

        {/* ── TEAMS TAB ── */}
        {tab === 'teams' && <div className="teacher-grid teams-grid">
          <form className="teacher-card team-form" onSubmit={saveTeam}>
            <div className="card-label">SET UP GROUPS</div>
            <h2>Create a team</h2>
            <p>Set the team size and select students from the class list.</p>

            <label>Team name
              <input placeholder="e.g. Green Explorers" value={teamName} onChange={event => setTeamName(event.target.value)} />
            </label>

            <label>
              Team size
              <div className="team-size-control">
                <button type="button" className="size-btn" onClick={() => handleTeamSizeChange(teamSize - 1)} disabled={teamSize <= 1}>−</button>
                <input
                  type="number"
                  className="size-input"
                  min="1"
                  max="20"
                  value={teamSize}
                  onChange={e => handleTeamSizeChange(e.target.value)}
                />
                <button type="button" className="size-btn" onClick={() => handleTeamSizeChange(teamSize + 1)} disabled={teamSize >= 20}>+</button>
                <span className="size-hint">{teamSize === 1 ? 'solo' : `${teamSize} players`}</span>
              </div>
            </label>

            <div className="members-list">
              {members.map((member, index) => (
                <label key={index}>
                  Player {index + 1}
                  <select value={member} onChange={event => updateMember(index, event.target.value)}>
                    <option value="">Choose a student</option>
                    {availableStudents.filter(student => !members.includes(student.name) || student.name === member).map(student => (
                      <option key={student.id} value={student.name}>{student.name}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>

            <button className="teacher-primary" type="submit">Save team</button>
          </form>

          <div className="teacher-card">
            <div className="card-label">CLASS TEAMS</div>
            <h2>Ready to play</h2>
            {teams.length === 0
              ? <div className="empty-state">No teams yet. Build groups from the student list.</div>
              : <div className="team-list">{teams.map(team => (
                <article className="team-item" key={team.id}>
                  <div className="team-item-header">
                    <strong>🌿 {team.name}</strong>
                    <span className="team-count">{team.members.length} {team.members.length === 1 ? 'player' : 'players'}</span>
                  </div>
                  <span>{team.members.join(' · ')} · {team.points || 0} pts</span>
                  <button type="button" className="team-remove" onClick={() => removeTeam(team.id)} title="Remove team">✕</button>
                </article>
              ))}</div>
            }
          </div>
        </div>}

        {/* ── AI GAMES TAB ── */}
        {tab === 'games' && <div className="teacher-grid games-grid">
          <div className="teacher-card game-generator">
            <div className="card-label">
              <span className="ai-badge">AI POWERED</span>
              ACTIVITY GENERATOR
            </div>
            <h2>Generate eco missions with AI</h2>
            <p>Choose a topic and let Gemini AI create a complete, trackable classroom activity with materials, schedules, and assessment criteria.</p>

            <label>Environmental topic
              <select value={topic} onChange={event => { setTopic(event.target.value); setGame(null); setChallengeSaved(false); }}>
                {topicOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>

            {topic === 'custom' && (
              <label>Your topic
                <input
                  placeholder="e.g. Reducing plastic waste in the cafeteria"
                  value={customTopic}
                  onChange={e => setCustomTopic(e.target.value)}
                />
              </label>
            )}

            <button
              className="teacher-primary ai-generate-btn"
              onClick={generateAIGame}
              disabled={aiLoading || (!topic || (topic === 'custom' && !customTopic.trim()))}
            >
              {aiLoading ? (
                <span className="ai-loading">
                  <span className="ai-spinner"></span>
                  AI is thinking...
                </span>
              ) : (
                <>🤖 Generate with AI</>
              )}
            </button>

            {aiError && <p className="form-error" role="alert">⚠️ {aiError}</p>}

            <p className="ai-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              Powered by Google Gemini AI — generates unique activities each time
            </p>
          </div>

          <div className="teacher-card game-result">
            {game ? <>
              <div className="game-badge">
                <span className="ai-generated-tag">🤖 AI Generated</span>
                CLASS PROJECT · {game.duration}
              </div>
              <h2>{game.title}</h2>

              {game.description && <p className="game-description">{game.description}</p>}

              <h3>How to run it</h3>
              <p>{game.instructions}</p>

              <h3>Materials needed</h3>
              <p>{game.materials}</p>

              {game.schedule && game.schedule.length > 0 && <>
                <h3>Day-by-day schedule</h3>
                <div className="ai-schedule">
                  {game.schedule.map((day, i) => (
                    <div className="ai-schedule-day" key={i}>
                      <span className="day-num">Day {i + 1}</span>
                      <span>{day}</span>
                    </div>
                  ))}
                </div>
              </>}

              {game.steps && game.steps.length > 0 && <>
                <h3>Student steps</h3>
                <div className="ai-steps">
                  {game.steps.map((step, i) => (
                    <div className="ai-step" key={i}>
                      <span className="step-circle">{i + 1}</span>
                      <span>{step.text}</span>
                    </div>
                  ))}
                </div>
              </>}

              <h3>Assessment guide</h3>
              <p>{game.points}</p>

              <h3>Evidence required</h3>
              <p>{game.evidence}</p>

              <button
                className={`teacher-primary save-challenge-btn ${challengeSaved ? 'saved' : ''}`}
                onClick={saveAsChallenge}
                disabled={challengeSaved}
              >
                {challengeSaved ? '✓ Saved to Missions' : '📋 Save as Mission'}
              </button>
            </> : (
              <div className="empty-state ai-empty">
                <div className="ai-empty-icon">🤖</div>
                <p>Select a topic and click <strong>"Generate with AI"</strong> to create a unique classroom activity.</p>
                <span className="ai-empty-sub">Each generation creates a brand new activity!</span>
              </div>
            )}
          </div>
        </div>}

        {/* ── SAVED MISSIONS TAB ── */}
        {tab === 'saved' && <div className="saved-challenges-grid">
          <div className="card-label">SAVED AI MISSIONS</div>
          <h2>Your AI-generated missions</h2>
          <p className="saved-subtitle">These missions were generated by AI and saved. You can use them in your classroom.</p>

          {savedChallenges.length === 0
            ? <div className="empty-state">No saved missions yet. Generate missions in the AI tab.</div>
            : <div className="saved-list">
              {savedChallenges.map((ch, i) => (
                <article className="saved-challenge-card" key={ch.id}>
                  <div className="saved-card-header">
                    <span className="saved-icon">🤖</span>
                    <div>
                      <h3>{ch.title}</h3>
                      <span className="saved-meta">{ch.duration} · {ch.category}</span>
                    </div>
                  </div>
                  <p>{ch.description}</p>
                  <div className="saved-card-footer">
                    <span className="saved-tag">AI Generated</span>
                    <button className="remove-saved" onClick={() => setSavedChallenges(prev => prev.filter((_, idx) => idx !== i))}>Remove</button>
                  </div>
                </article>
              ))}
            </div>
          }
        </div>}
      </section>
    </main>
  );
}

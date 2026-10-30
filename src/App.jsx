import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Impact from './components/Impact';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import TeacherDashboard from './components/TeacherDashboard';
import EcoQuiz from './components/EcoQuiz';
import Leaderboard from './components/Leaderboard';
import MissionsPage from './pages/MissionsPage';

export default function App() {
  const getPageFromHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash === 'challenges') {
      return 'missions';
    }
    if (['home', 'missions', 'leaderboard', 'quiz', 'teacher'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [page, setPage] = useState(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [students, setStudents] = useState([
    { id: 1, name: 'Ahmed Mohamed', points: 125 },
    { id: 2, name: 'Sara Ali', points: 110 },
    { id: 3, name: 'Omar Hassan', points: 95 },
    { id: 4, name: 'Fatma Khaled', points: 90 },
    { id: 5, name: 'Youssef Adel', points: 80 },
    { id: 6, name: 'Mariam Tarek', points: 75 },
    { id: 7, name: 'Adam Samir', points: 70 },
    { id: 8, name: 'Laila Hany', points: 65 },
  ]);
  const [teams, setTeams] = useState([]);

  const navigate = (nextPage) => {
    setPage(nextPage);
    window.location.hash = nextPage;
    window.scrollTo(0, 0);
  };

  if (page === 'teacher') {
    return (
      <TeacherDashboard
        onExit={() => navigate('home')}
        students={students}
        setStudents={setStudents}
        teams={teams}
        setTeams={setTeams}
      />
    );
  }

  if (page === 'quiz') {
    return <EcoQuiz onBack={() => navigate('home')} />;
  }

  if (page === 'leaderboard') {
    return <Leaderboard onBack={() => navigate('home')} students={students} teams={teams} />;
  }

  if (page === 'missions') {
    return <MissionsPage onBack={() => navigate('home')} />;
  }

  return (
    <>
      <Navbar
        activePage={page}
        onNavigate={navigate}
      />
      {page === 'home' && <Hero onBrowseMissions={() => navigate('missions')} />}
      {(page === 'home' || page === 'about') && <Features />}
      {(page === 'home' || page === 'how-it-works') && <HowItWorks />}
      {page === 'home' && <Impact />}
      {page === 'home' && (
        <section className="home-leaderboard-wrapper" id="leaderboard">
          <Leaderboard students={students} teams={teams} />
        </section>
      )}
      {page === 'home' && <CtaBanner onStart={() => navigate('teacher')} />}
      <Footer onNavigate={navigate} activePage={page} />
    </>
  );
}


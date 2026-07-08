import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './components/common/Toast';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Breadcrumbs from './components/common/Breadcrumbs';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import DailySchedule from './pages/DailySchedule';
import LearningPaths from './pages/LearningPaths';
import Projects from './pages/Projects';
import Resources from './pages/Resources';
import Tips from './pages/Tips';
import Certifications from './pages/Certifications';
import JobPrep from './pages/JobPrep';
import FAQ from './pages/FAQ';
import Dashboard from './pages/Dashboard';
import GitCommands from './pages/GitCommands';
import PythonGuide from './pages/PythonGuide';
import Labs from './pages/Labs';
import LabPlayground from './pages/LabPlayground';
import DatabaseLab from './pages/DatabaseLab';
import Quizzes from './pages/Quizzes';
import Search from './pages/Search';
import SecurityLabs from './pages/SecurityLabs';
import SecurityLabRunner from './pages/SecurityLabRunner';
import SecurityDashboard from './pages/SecurityDashboard';
import NotFound from './pages/NotFound';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-dark-bg text-light-text">
      <Header />
      <Breadcrumbs />
      <main className="pt-16 lg:pt-20">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ToastProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/schedule" element={<DailySchedule />} />
              <Route path="/paths/:pathId" element={<LearningPaths />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/job-prep" element={<JobPrep />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/git-commands" element={<GitCommands />} />
              <Route path="/python-guide" element={<PythonGuide />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/labs/:labId" element={<LabPlayground />} />
              <Route path="/database-lab" element={<DatabaseLab />} />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/search" element={<Search />} />
              <Route path="/security-labs" element={<SecurityLabs />} />
              <Route path="/security-labs/:categoryId" element={<SecurityLabRunner />} />
              <Route path="/security-labs/:categoryId/:labId" element={<SecurityLabRunner />} />
              <Route path="/security-dashboard" element={<SecurityDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </ToastProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './components/common/Toast';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Breadcrumbs from './components/common/Breadcrumbs';
import Loading from './components/common/Loading';

const Home = lazy(() => import('./pages/Home'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const DailySchedule = lazy(() => import('./pages/DailySchedule'));
const LearningPaths = lazy(() => import('./pages/LearningPaths'));
const Projects = lazy(() => import('./pages/Projects'));
const Resources = lazy(() => import('./pages/Resources'));
const Tips = lazy(() => import('./pages/Tips'));
const Certifications = lazy(() => import('./pages/Certifications'));
const JobPrep = lazy(() => import('./pages/JobPrep'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const GitCommands = lazy(() => import('./pages/GitCommands'));
const PythonGuide = lazy(() => import('./pages/PythonGuide'));
const Labs = lazy(() => import('./pages/Labs'));
const LabPlayground = lazy(() => import('./pages/LabPlayground'));
const DatabaseLab = lazy(() => import('./pages/DatabaseLab'));
const Quizzes = lazy(() => import('./pages/Quizzes'));
const Search = lazy(() => import('./pages/Search'));
const SecurityLabs = lazy(() => import('./pages/SecurityLabs'));
const SecurityLabRunner = lazy(() => import('./pages/SecurityLabRunner'));
const SecurityDashboard = lazy(() => import('./pages/SecurityDashboard'));
const CTFTracker = lazy(() => import('./pages/CTFTracker'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
            <Suspense fallback={<Loading type="full" text="جارٍ تحميل الصفحة..." />}>
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
                <Route path="/ctf-tracker" element={<CTFTracker />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </ToastProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

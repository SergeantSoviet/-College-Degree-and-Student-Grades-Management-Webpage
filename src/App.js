// App.js
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DegreeList from './components/DegreeList'; 
import DegreeDetail from './components/DegreeDetail'; 
import CreateDegree from './components/CreateDegree'; 
import CohortList from './components/CohortList'; 
import CreateCohort from './components/CreateCohort'; 
import CohortDetail from './components/CohortDetail'; 
import ModuleList from './components/ModuleList'; 
import ModuleDetail from './components/ModuleDetail';
import CreateModule from './components/CreateModule';
import CohortModules from './components/CohortModules';
import StudentDetail from './components/StudentDetail';
import StudentSearch from './components/StudentSearch';
import NewStudent from './components/NewStudent';
import EditGrade from './components/EditGrade';
import HomePage from './components/HomePage';
import StudentsList from './components/StudentsList';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/degree/:shortcode" element={<DegreeDetail />} />
        <Route path="/create-degree" element={<CreateDegree />} />
        <Route path="/degree-list" element={<DegreeList />} />
        <Route path="/cohorts" element={<CohortList />} />
        <Route path="/cohorts/:cohortFlag" element={<CohortDetail />} />
        <Route path="/students/list/:cohortFlag" element={<StudentsList />} />
        <Route path="/cohorts/:cohortFlag/modules" element={<CohortModules />} />
        <Route path="/create-cohort" element={<CreateCohort />} />
        <Route path="/modules/:code" element={<ModuleDetail />} /> 
        <Route path="/modules" element={<ModuleList />} />
        <Route path="/create-module" element={<CreateModule />} /> 
        <Route path="/students/search" element={<StudentSearch />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/new-student" element={<NewStudent />} />
        <Route path="/editgrade/:id" element={<EditGrade />} />
      </Routes>
    </Router>
  );
}

export default App;
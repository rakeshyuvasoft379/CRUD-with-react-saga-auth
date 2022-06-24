import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import {Routes, Route} from 'react-router-dom'
import Logout from './components/logout';
import Dashboard from './components/dashboard';
import Addpost from './components/addpost';
import Updatepost from './components/updatepost';
import Singlepost from './components/singlepost';


function App() {
  return (
    <div className="App">
     <Routes>
      
      <Route path="/" element={<Login/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="logout" element={<Logout/>}/>
      <Route path="addpost" element={<Addpost/>}/>
      <Route path="updatepost/:id" element={<Updatepost/>}/>
      <Route path="singlepost/:id" element={<Singlepost/>}/>
     </Routes>
    </div>
  );
}

export default App;

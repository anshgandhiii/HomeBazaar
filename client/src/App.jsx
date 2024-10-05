import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './components/home/Home';
import Freq from './components/home/Freq';



function App() {
   return (
    <>
     <Routes>
     <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />

      </Route>
     </Routes>
    </>
  );
}

export default App;

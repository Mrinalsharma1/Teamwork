import './App.css';
import Chatbox from './Pages/Chatbox';
import Login from './Pages/Login';
import {Routes,Route} from 'react-router-dom'

function App() {
 
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={ <Login/> } />
      <Route path="/Chatbox" element={<Chatbox/>} />
      {/* <Route path="about" element={ <About/> } />
      <Route path="contact" element={ <Contact/> } /> */}
    </Routes>
  </div>
  );
}

export default App;

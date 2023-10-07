
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Content from './Components/Content';

function App() {
  return (
<div className="App">
      <Router>
        
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Content} />       
        
      </Router>
    </div>
  );
}

export default App;

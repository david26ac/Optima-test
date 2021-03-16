import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ScoreTable from './components/score-table'

function App() {
  return (
    <div className="App">
      <div className="container">
        <ScoreTable></ScoreTable>
      </div>
    </div>
  );
}

export default App;

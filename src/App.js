import './App.css';
import AddHabitForm from './components/AddHabitForm';
import HabitList from './components/HabitList';
import LogIn from './components/LogIn';

function App() {
  return (
    <div className="App">
      
      <p>Habit Tracker</p>
    
      <HabitList/>
      <div>
        <AddHabitForm/>
      </div>
      <LogIn/>
      
    </div>
  );
}

export default App;

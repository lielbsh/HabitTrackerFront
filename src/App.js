import './App.css';
import AddHabitForm from './components/AddHabitForm';
import HabitList from './components/HabitList';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <p>Habit Tracker</p>
      
        <HabitList/>
        <div>
          <AddHabitForm/>
        </div>
      </DataProvider>
    </div>
  );
}

export default App;

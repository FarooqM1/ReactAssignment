import EnhancedTable from './EnhancedTable';
import StatsView from './StatsView';

function App() {
  return (
    <div className="App">
      <header >
        {/* <BigScreen></BigScreen> */}
        <div> <StatsView></StatsView> </div> 
        <div> <EnhancedTable />  </div>
      </header>
    </div>
  );
}

export default App;

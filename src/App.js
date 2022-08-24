import logo from './logo.svg';
import EnhancedTable from './EnhancedTable';
import { BigScreen } from './BigScreen';
import { ContentDeliveryWithPagination } from './ContentDeliveryWithPagination';
import { Assignment } from './Assignment';
import { HeaderDiv } from './HeaderDiv';
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

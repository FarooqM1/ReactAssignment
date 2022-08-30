import React from 'react'
import './App.css';
import EnhancedTable from './EnhancedTable';
//import { HeaderDiv } from './HeaderDiv';
import StatsView from './StatsView';


export function BigScreen() {

    return (
        <div className="big-screen">
            <div> <StatsView></StatsView> </div> 
            <div> <EnhancedTable />  </div>
        </div>
    )
}
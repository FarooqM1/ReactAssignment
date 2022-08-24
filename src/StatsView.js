import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react"
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ErrorIcon from '@mui/icons-material/Error';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';


export default function StatsView() {

    const [statData, setStatData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticcount?fromdate=2022-07-01&todate=2022-07-14")
            .then(function (response) {
                return response.json()
            })
            .then(function (product) {
                setStatData(product.data)
                console.log(product.data)
            })
    }

    const card1 = (
        <React.Fragment>
            <CardContent style={{ backgroundColor: "#283046", color: "white" }}>

                <Typography >
                    <div> <ArrowCircleDownIcon></ArrowCircleDownIcon> </div>
                    <div>{statData.totalInstall} </div>
                    <div>App Installed</div>
                </Typography>

            </CardContent>

        </React.Fragment>
    )

    const card2 = (
        <React.Fragment>
            <CardContent style={{ backgroundColor: "#283046", color: "white" }}>
                <Typography>
                    <div> <ErrorIcon></ErrorIcon> </div>
                    {statData.totaluninstall}<br /> App Un-Installed
                </Typography>

            </CardContent>
        </React.Fragment>
    )

    const card3 = (
        <React.Fragment>
            <CardContent style={{ backgroundColor: "#283046", color: "white" }} >
                <Typography>
                    <div> <PanoramaFishEyeIcon></PanoramaFishEyeIcon> </div>
                    {statData.activeinstall}<br /> Active Installs
                </Typography>
            </CardContent>
        </React.Fragment>
    )

    const card4 = (
        <React.Fragment>
            <CardContent style={{ backgroundColor: "#283046", color: "white" }}>
                <Typography>
                    <div> <PanoramaFishEyeIcon></PanoramaFishEyeIcon> </div>
                    {statData.aliveappusers}<br /> Alive Apps Users
                </Typography>
            </CardContent>
        </React.Fragment>
    )

    const card5 = (
        <React.Fragment>
            <CardContent style={{ backgroundColor: "#283046", color: "white" }}>
                <Typography >
                    <div> <PanoramaFishEyeIcon></PanoramaFishEyeIcon> </div>
                    {statData.churn}<br /> Churn Rate
                </Typography>
            </CardContent>
        </React.Fragment>
    )

    const card6 = (
        <React.Fragment>
            <CardContent style={{ backgroundColor: "#283046", color: "white" }}>
                <Typography>
                    <div> <PanoramaFishEyeIcon></PanoramaFishEyeIcon> </div>
                    {statData.alivechurn}<br /> Alive Churn Rate
                </Typography>

            </CardContent>

        </React.Fragment>
    )

    return (
        <Box sx={{ minWidth: 275 }} style={{ marginBottom: "30px", marginTop: "30px" , border: "none"}}>
            <div style={{display:"flex", justifyContent: "space-around" ,backgroundColor:"#283046" , alignItems:"center",textAlign:"center"}}>
                <Card variant="outlined" style={{ border: "none"}}>{card1}</Card>
                <Card variant="outlined" style={{ border: "none"}}>{card2}</Card>
                <Card variant="outlined" style={{ border: "none"}}>{card3}</Card>
            </div>
            <div style={{display:"flex", justifyContent: "space-around",backgroundColor:"#283046"}}>
                <Card variant="outlined" style={{ border: "none"}}>{card4}</Card>
                <Card variant="outlined" style={{ border: "none"}}>{card5}</Card>
                <Card variant="outlined" style={{ border: "none"}}>{card6}</Card>
            </div>
        </Box>
    );
}


import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import DragHandleSharpIcon from '@mui/icons-material/DragHandleSharp';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import EnhancedTable from './EnhancedTable';
import StatsView from './StatsView';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CategoryIcon from '@mui/icons-material/Category';
import InfoIcon from '@mui/icons-material/Info';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import LaunchIcon from '@mui/icons-material/Launch';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export function HomePage() {

    const [dashboardShow, setDashboardShow] = React.useState(false);
    const [menuShow, setMenuShow] = React.useState(false);

    function dashboardClick() {
        if (dashboardShow) {
            setDashboardShow(false)
        } else {
            setDashboardShow(true)
        }

        console.log("testhjsdgjavhgjh")
    }

    function menuClick() {
        if (menuShow) {
            setMenuShow(false)
        } else {
            setDashboardShow(false)
            setMenuShow(true)
        }

        console.log("testhjsdgjavhgjh")
    }

    return (

        <Box
            sx={{
                width: '100%',
                height: '100%',

            }}
        > <Grid container spacing={2}>

                <Grid item xs={2} style={{marginTop:"20px"}}>
                    <Item>

                        <Paper sx={{ width: 300, maxWidth: '100%'}}>
                            <MenuList style={{ backgroundColor: "#283046" }}>
                                <MenuItem onClick={dashboardClick} >
                                    <ListItemIcon style={{ color: "white" }}>
                                        <DragHandleSharpIcon fontSize="small" />
                                        <ListItemText >Dashboard</ListItemText>
                                    </ListItemIcon>
                                </MenuItem>
                                <MenuItem onClick={menuClick}>
                                    <ListItemIcon style={{ color: "white" }}>
                                        <PersonSharpIcon fontSize="small" />
                                        <ListItemText>WOW Users</ListItemText>
                                    </ListItemIcon>
                                </MenuItem>
                                <MenuItem onClick={menuClick}>
                                    <ListItemIcon style={{ color: "white" }}>
                                        <PlayCircleIcon fontSize="small" />
                                        <ListItemText>VideoClips</ListItemText>
                                    </ListItemIcon>
                                </MenuItem>
                                <MenuItem onClick={menuClick}>
                                    <ListItemIcon style={{ color: "white" }}>
                                        <ContentPasteIcon fontSize="small" />
                                        <ListItemText>Reported Content</ListItemText>
                                    </ListItemIcon>
                                </MenuItem>
                                <MenuItem onClick={menuClick}>
                                    <ListItemIcon style={{ color: "white" }}>
                                        <CategoryIcon fontSize="small" />
                                        <ListItemText>Category</ListItemText>
                                    </ListItemIcon>
                                </MenuItem>
                                <MenuItem onClick={menuClick}>
                                    <ListItemIcon style={{ color: "white" }}>
                                        <InfoIcon fontSize="small" />
                                        <ListItemText>Info Page</ListItemText>
                                    </ListItemIcon>
                                </MenuItem>
                                <MenuItem onClick={menuClick}>
                                    <ListItemIcon style={{ color: "white" }}>
                                        <LiveHelpIcon fontSize="small" />
                                        <ListItemText>FAQ</ListItemText>
                                    </ListItemIcon>
                                </MenuItem>
                                <MenuItem onClick={menuClick}>
                                    <ListItemIcon style={{ color: "white" }}>
                                        <CircleNotificationsIcon fontSize="small" />
                                        <ListItemText>Push Notification</ListItemText>
                                    </ListItemIcon>
                                </MenuItem>
                                <MenuItem onClick={menuClick}>
                                    <ListItemIcon style={{ color: "white" }}>
                                        <LaunchIcon fontSize="small" />
                                        <ListItemText>Internal User</ListItemText>
                                    </ListItemIcon>
                                </MenuItem>

                            </MenuList>
                        </Paper>

                    </Item>
                </Grid>
                {
                    dashboardShow ? <Grid item xs={8}>
                        <div> <StatsView></StatsView> </div>
                        <div> <EnhancedTable />  </div>
                    </Grid> : <div> </div>
                }
                {
                    menuShow ? <Grid item xs={8}>
                        This is still under development Please click on Dashboard
                    </Grid> : <div> </div>
                }

            </Grid> </Box>


    )
}
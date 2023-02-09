import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import  ListItemIcon  from '@mui/material/ListItemIcon';
import { ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import Toolbar from '@mui/material/Toolbar';
import { Filter } from '../App';

interface SideMenuProps {
    onClickMenuItem: Function,
    onClose: Function,
    open: boolean,
}

export const SideMenu = (props:SideMenuProps)=>{

    const {onClickMenuItem, onClose} = props;

    const handleClick = (filter: Filter)=>{
        onClickMenuItem(filter);
        onClose(false);
    }

    const drawerWidth = 240;

    return <Drawer
    anchor="left"
    open={props.open}
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
  >
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {/* {['Все', 'Выполненные', 'Не выполненные', 'Просроченные'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>handleFilter(Filter.ALL)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
        <ListItem key={'Все'} disablePadding>
            <ListItemButton onClick={()=>handleClick(Filter.ALL)}>
              <ListItemIcon>
                 <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Все'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Выполненные'} disablePadding>
            <ListItemButton onClick={()=>handleClick(Filter.DONE)}>
              <ListItemIcon>
                 <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Выполненные'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Не выполненные'} disablePadding>
            <ListItemButton onClick={()=>handleClick(Filter.NOT_DONE)}>
              <ListItemIcon>
                 <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Не выполненные'} />
            </ListItemButton>
          </ListItem>
      </List>
      
    </Box>
  </Drawer>
}


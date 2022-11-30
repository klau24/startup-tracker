import * as React from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'

const drawerWidth = 240

function Sidebar(props) {
   const drawer = (
      <div className="pt-4">
         <List className="font-mono">
            {SidebarData.map((item, index) => (
               <ListItem key={item} sx={{ padding: 2 }}>
                  <ListItemButton>
                     <ListItemIcon>{<item.icon />}</ListItemIcon>
                     <Link
                        to={item.link}
                        key={index}
                        onClick={props.handleDrawerToggle}
                     >
                        {item.title}
                     </Link>
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
      </div>
   )

   const renderSidebar = () => {
      if (props.isOpen) {
         return (
            <Box
               component="nav"
               sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
               <Drawer
                  variant="temporary"
                  sx={{
                     display: { xs: 'none', sm: 'block' },
                     '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        backgroundColor: '#FFFFFE',
                     },
                  }}
                  onClose={props.handleDrawerToggle}
                  anchor="bottom"
                  open
                  PaperProps={{
                     sx: {
                        height: '100vh',
                     },
                  }}
               >
                  <Link
                     className="pt-7 flex justify-evenly items-center text-black relative font-mono"
                     to="/"
                  >
                     startup-tracker
                  </Link>
                  {drawer}
               </Drawer>
            </Box>
         )
      }
   }
   return renderSidebar()
}

export default Sidebar

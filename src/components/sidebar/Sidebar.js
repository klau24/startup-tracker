import * as React from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Toolbar from '@mui/material/Toolbar'

const drawerWidth = 240

function Sidebar(props) {
   const { window } = props
   const [mobileOpen, setMobileOpen] = React.useState(false)

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen)
   }
   const container =
      window !== undefined ? () => window().document.body : undefined

   const drawer = (
      <div>
         <Toolbar />
         <List>
            {SidebarData.map((item, index) => (
               <ListItem key={item} sx={{ padding: 2 }}>
                  <ListItemButton>
                     <ListItemIcon>{<item.icon />}</ListItemIcon>
                     <Link to={item.link} key={index}>
                        {item.title}
                     </Link>
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
      </div>
   )

   return (
      <Box
         component="nav"
         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
         <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
               keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
               display: { xs: 'block', sm: 'none' },
               '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
               },
            }}
         >
            {drawer}
         </Drawer>
         <Drawer
            variant="permanent"
            sx={{
               display: { xs: 'none', sm: 'block' },
               '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
               },
            }}
            anchor="bottom"
            open
            PaperProps={{
               sx: {
                  height: '94.13%',
               },
            }}
         >
            {drawer}
         </Drawer>
      </Box>
   )
}

export default Sidebar

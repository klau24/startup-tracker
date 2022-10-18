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
      <div className="pt-4">
         <List className="font-mono">
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
                  backgroundColor: '#FFFFFE',
                  zIndex: 0,
               },
            }}
            anchor="bottom"
            open
            PaperProps={{
               sx: {
                  height: '100%',
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

export default Sidebar

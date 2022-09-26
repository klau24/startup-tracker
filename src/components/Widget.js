import React from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import InfoIcon from '@mui/icons-material/Info'
import Divider from '@material-ui/core/Divider'

function Widget(props) {
   return (
      <Card sx={{ minWidth: 225, borderRadius: 4, boxShadow: 3 }}>
         <CardContent>
            <Typography
               className="flex justify-between flex-row"
               sx={{ fontSize: 18 }}
               color="black"
               gutterBottom
            >
               {props.title}
               <div>
                  <InfoIcon style={{ color: 'grey' }} />
               </div>
            </Typography>
            <Typography
               variant="h5"
               component="div"
               sx={{ mb: 1.5, fontWeight: 'bold' }}
            >
               {props.data}

               <span className="pl-3 font-normal text-base">
                  + 0% <KeyboardArrowUpIcon className="text-green-500" />
               </span>
            </Typography>
            <Divider light />
            <Typography className="pt-3" color="text.secondary">
               Compared to last month
            </Typography>
         </CardContent>
      </Card>
   )
}

export default Widget

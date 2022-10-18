import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import InfoIcon from '@mui/icons-material/Info'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@mui/material/Tooltip'

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
                  <Tooltip title={props.tooltip}>
                     <InfoIcon style={{ color: 'gray' }} />
                  </Tooltip>
               </div>
            </Typography>
            <Typography
               variant="h5"
               component="div"
               sx={{ mb: 1.5, fontWeight: 'bold', textAlign: 'center' }}
            >
               {props.data}
            </Typography>
            <Divider light />
         </CardContent>
      </Card>
   )
}

export default Widget

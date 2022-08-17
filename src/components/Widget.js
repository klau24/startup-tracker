import React from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

function Widget(props) {
   return (
      <Card sx={{ minWidth: 225, borderRadius: 4, boxShadow: 3 }}>
         <CardContent>
            <Typography sx={{ fontSize: 18 }} color="black" gutterBottom>
               {props.title}
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
            <Typography color="text.secondary">
               Compared to last month
            </Typography>
         </CardContent>
      </Card>
   )
}

export default Widget

/*
<div className="flex-1 mb-0 ml-6 mr-6 p-9 rounded-xl shadow-xl h-1/6 bg-white">
         <span className="lg:text-2xl md:text-lg sm:text-base">{props.title}</span>
         <div className="flex mt-5 mb-5 mr-0 ml-0 items-center">
            <span className="lg:text-3xl md:text-xl sm:text-lg font-bold">{props.data}</span>
            {props.showPercent && (
               <span className="flex items-center ml-5">
                  +0 % <KeyboardArrowUpIcon className="text-green-500" />
               </span>
            )}
         </div>
         <span className="text-base text-gray-400">Compared to last month</span>
      </div>
*/

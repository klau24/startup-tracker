import React from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

function Widget(props) {
   return (
      <div className="flex-1 mb-0 ml-6 mr-6 p-9 rounded-xl shadow-xl h-1/6 bg-white">
         <span className="text-2xl">{props.title}</span>
         <div className="flex mt-5 mb-5 mr-0 ml-0 items-center">
            <span className="text-3xl font-bold">{props.data}</span>
            {props.showPercent && (
               <span className="flex items-center ml-5">
                  +0 % <KeyboardArrowUpIcon className="text-green-500" />
               </span>
            )}
         </div>
         <span className="text-base text-gray-400">Compared to last month</span>
      </div>
   )
}

export default Widget

import React, { useState } from 'react'
import Button from '@mui/material/Button'

function GenericButton(props) {
   const [flag, setFlag] = useState(1)

   function handleFlag() {
      setFlag(!flag)
      props.filterItems(props.text)
   }

   function changeVariant() {
      if (!props.isFilter) {
         return 'contained'
      } else {
         return flag & props.isFilter ? 'contained' : 'outlined'
      }
   }

   return (
      <Button
         sx={{ borderRadius: '12px', textTransform: 'none' }}
         onClick={handleFlag}
         variant={changeVariant()}
         size="medium"
      >
         {props.text}
      </Button>
   )
}

export default GenericButton

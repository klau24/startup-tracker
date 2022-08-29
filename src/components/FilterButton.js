import React, { useState } from 'react'
import Button from '@mui/material/Button'

function FilterButton(props) {
   const [flag, setFlag] = useState(1)

   function handleFlag() {
      setFlag(!flag)
      props.filterItems(props.text)
   }

   return (
      <Button
         sx={{ borderRadius: '12px', textTransform: 'none' }}
         onClick={handleFlag}
         variant={flag ? 'contained' : 'outlined'}
         size="medium"
      >
         {props.text}
      </Button>
   )
}

export default FilterButton

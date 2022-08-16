import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ReactWordcloud from 'react-wordcloud'

function WordCloudCard(props) {
   return (
      <Card
         sx={{
            minWidth: '20vw',
            overflow: 'auto',
            borderRadius: '20px',
            boxShadow: 3,
            height: '50vh',
         }}
      >
         <CardContent className="h-full">
            <ReactWordcloud
               size={[400, 600]}
               fontSizes={[70, 100]}
               words={props.words}
            />
         </CardContent>
      </Card>
   )
}

export default WordCloudCard

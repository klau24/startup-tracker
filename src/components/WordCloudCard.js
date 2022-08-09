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
               size={[800, 800]}
               fontSizes={[70, 100]}
               words={props.words}
            />
         </CardContent>
         <CardContent>
            <p>
               Lorem Ipsum is simply dummy text of the printing and typesetting
               industry. Lorem Ipsum has been the industry's standard dummy text
               ever since the 1500s, when an unknown printer took a galley of
               type and scrambled it to make a type specimen book. It has
               survived not only five centuries, but also the leap into
               electronic typesetting, remaining essentially unchanged.
            </p>
         </CardContent>
      </Card>
   )
}

export default WordCloudCard

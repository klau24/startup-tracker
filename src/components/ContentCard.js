import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Line, Bar } from 'react-chartjs-2'
import ReactWordcloud from 'react-wordcloud'

function ContentCard(props) {
   const renderSelection = () => {
      switch (props.cardType) {
         case 'line':
            return (
               <Line
                  data={{
                     labels: props.data['labels'],
                     datasets: [
                        {
                           label: props.data['title'],
                           data: props.data['data'],
                           backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                     ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
               />
            )
         case 'bar':
            return (
               <Bar
                  data={{
                     labels: props.data['labels'],
                     datasets: [
                        {
                           label: props.data['title'],
                           data: props.data['data'],
                           backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                     ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
               />
            )
         case 'wordCloud':
            return (
               <ReactWordcloud
                  size={[400, 600]}
                  fontsizes={[70, 100]}
                  words={props.data['words']}
               />
            )
         case 'stackedBar':
            return (
               <Bar
                  data={{
                     labels: props.data['labels'],
                     datasets: props.data['data'],
                  }}
                  options={{
                     responsive: true,
                     maintainAspectRatio: false,
                     scales: {
                        x: {
                           stacked: true,
                        },
                        y: {
                           stacked: true,
                        },
                     },
                  }}
               />
            )
         default:
            return null
      }
   }

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
         <CardContent className="h-full">{renderSelection()}</CardContent>
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

export default ContentCard

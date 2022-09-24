import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Line, Bar } from 'react-chartjs-2'
import ReactWordcloud from 'react-wordcloud'
import { padding } from '@mui/system'

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
                           data: props.data['data'],
                           backgroundColor: '#ffffff ',
                           borderColor: '#B2002C',
                        },
                     ],
                  }}
                  options={{
                     responsive: true,
                     maintainAspectRatio: false,
                     plugins: {
                        legend: { display: false },
                        title: { display: true, text: props.data['title'] },
                     },
                  }}
               />
            )
         case 'bar':
            return (
               <Bar
                  data={{
                     labels: props.data['labels'],
                     datasets: [
                        {
                           data: props.data['data'],
                           backgroundColor: '#B2002C ',
                        },
                     ],
                  }}
                  options={{
                     responsive: true,
                     maintainAspectRatio: false,
                     plugins: {
                        legend: { display: false },
                        title: { display: true, text: props.data['title'] },
                     },
                  }}
               />
            )
         case 'wordCloud':
            return (
               <ReactWordcloud
                  size={[200, 300]}
                  fontsizes={[70, 100]}
                  words={props.data['words']}
                  options={{ padding: 1, fontSizes: [20, 70] }}
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
            borderRadius: '20px',
            boxShadow: 3,
            height: '50vh',
         }}
      >
         <CardContent className="h-full">{renderSelection()}</CardContent>
         <CardContent>
            <p></p>
         </CardContent>
      </Card>
   )
}

export default ContentCard

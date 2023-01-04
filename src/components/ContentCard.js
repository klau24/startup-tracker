import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Line, Bar } from 'react-chartjs-2'
import ReactWordcloud from 'react-wordcloud'
import InfoIcon from '@mui/icons-material/Info'
import CardHeader from '@material-ui/core/CardHeader'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'

function ContentCard(props) {
   const renderSelection = () => {
      switch (props.cardType) {
         case 'line':
            if (props.data['fill']) {
               return (
                  <Line
                     data={{
                        labels: props.data['labels'],
                        datasets: [
                           {
                              data: props.data['data'],
                              borderColor: '#252A34',
                              tension: 0.4,
                              fill: {
                                 target: 'origin',
                                 below: 'rgba(255, 26, 104, .7)',
                                 above: 'rgba(75, 192, 192, .7)',
                              },
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
            } else {
               return (
                  <Line
                     data={{
                        labels: props.data['labels'],
                        datasets: [
                           {
                              data: props.data['data'],
                              borderColor: '#252A34',
                              tension: 0.4,
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
            }
         case 'bar':
            return (
               <Bar
                  data={{
                     labels: props.data['labels'],
                     datasets: [
                        {
                           data: props.data['data'],
                           backgroundColor: '#252A34',
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
                  fontsizes={[10, 80]}
                  words={props.data['words']}
                  options={{ padding: 1, fontSizes: [20, 30] }}
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
         case 'info':
            return (
               <>
                  <Grid
                     className="pt-4 pl-12 pr-12"
                     container
                     justifyContent="center"
                  >
                     <Grid item xs={6} s={4} md={4}>
                        <img
                           src={props.data['image']}
                           width="250"
                           height="200"
                        />
                        <div className="pt-3">
                           <b>{props.data['title']}</b>
                           <p>{props.data['position']}</p>
                           <p>{props.data['email']}</p>
                        </div>
                     </Grid>
                     <Grid item xs={6} s={8} md={8}>
                        <p>{props.data['description']}</p>
                        <br />
                        <p>{props.data['description2']}</p>
                     </Grid>
                  </Grid>
               </>
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
         {props.isGraph ? (
            <CardHeader
               action={
                  <Tooltip title={props.tooltip}>
                     <InfoIcon className="mr-3" style={{ color: 'gray' }} />
                  </Tooltip>
               }
            />
         ) : (
            ''
         )}
         <CardContent className="h-4/5">{renderSelection()}</CardContent>
      </Card>
   )
}

export default ContentCard

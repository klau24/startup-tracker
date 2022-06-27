import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Bar } from 'react-chartjs-2'

function BarGraphCard(props) {
   return (
      <Card
         sx={{
            width: 320,
            height: 380,
            overflow: 'auto',
            borderRadius: '15px',
            boxShadow: 3,
         }}
      >
         <CardContent className="h-full">
            <Bar
               data={{
                  labels: props.labels,
                  datasets: [
                     {
                        label: props.title,
                        data: props.data,
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                     },
                  ],
               }}
               options={{ responsive: true, maintainAspectRatio: false }}
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

export default BarGraphCard

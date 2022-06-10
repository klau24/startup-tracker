import React, { useEffect, useState } from 'react'
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
   ArcElement,
   PointElement,
   LineElement,
   RadialLinearScale,
} from 'chart.js'
import { Bar, Pie, Scatter, Bubble, Line, PolarArea } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import annotationPlugin from 'chartjs-plugin-annotation'
import axios from 'axios'

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
   ArcElement,
   PointElement,
   LineElement,
   RadialLinearScale,
   annotationPlugin
)
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

function Dashboard() {
   const [weeklyData, setWeeklyData] = useState(0)

   useEffect(() => {
      axios.get('/api/weeklyData/PrizePool').then((res) => {
         setWeeklyData(res.data)
         console.log(res.data)
      })
   }, [])

   return (
      <div className="h-screen w-5/6">
         <div className="flex h-1/2 justify-center items-center">
            <div className="h-full w-1/3 border-r-2 border-b-2 border-bg-stone-100">
               <Pie
                  data={{
                     labels: [
                        'Red',
                        'Blue',
                        'Yellow',
                        'Green',
                        'Purple',
                        'Orange',
                     ],
                     datasets: [
                        {
                           label: '# of Votes',
                           data: [12, 19, 3, 5, 2, 3],
                           backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)',
                           ],
                        },
                     ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: true }}
               />
            </div>

            <div className="h-full w-1/3 border-r-2 border-b-2 border-bg-stone-100">
               <Line
                  data={{
                     labels: Object.keys(weeklyData),
                     datasets: [
                        {
                           label: 'PrizePool Weekly Users',
                           data: [342, 45, 322, 202, 192, 2862, 1696],
                           backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                     ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: true }}
               />
               <div className="flex h-1/2 w-full justify-left pt-5 pl-5">
                  <p>
                     Title: PrizePool Weekly Users From 2021-08-05
                     <br />
                     <br />
                     Description: Lorem Ipsum is simply dummy text of the
                     printing and typesetting industry. Lorem Ipsum has been the
                     industry's standard dummy text ever since the 1500s, when
                     an unknown printer took a galley of type and scrambled it
                     to make a type specimen book.
                  </p>
               </div>
            </div>

            <div className="h-full w-1/3 border-r-2 border-b-2 border-bg-stone-100">
               <Bar
                  data={{
                     labels: Object.keys(weeklyData),
                     datasets: [
                        {
                           label: 'PrizePool Weekly User Tweets',
                           data: [406, 46, 352, 207, 209], //Object.values(weeklyData['2021-08-05']['nlp_features']),
                           backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                     ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: true }}
               />

               <div className="flex h-1/2 w-full justify-left pt-5 pl-5">
                  <p>
                     Title: PrizePool Weekly Users Tweets From 2021-08-05
                     <br />
                     <br />
                     Description: Lorem Ipsum is simply dummy text of the
                     printing and typesetting industry. Lorem Ipsum has been the
                     industry's standard dummy text ever since the 1500s, when
                     an unknown printer took a galley of type and scrambled it
                     to make a type specimen book.
                  </p>
               </div>
            </div>
         </div>

         <div className="flex h-1/2 justify-center items-center">
            <div className="h-full w-1/3 border-r-2 border-b-2 border-bg-stone-100">
               <Bubble
                  data={{
                     datasets: [
                        {
                           label: 'Red dataset',
                           data: Array.from({ length: 50 }, () => ({
                              x: faker.datatype.number({ min: -100, max: 100 }),
                              y: faker.datatype.number({ min: -100, max: 100 }),
                              r: faker.datatype.number({ min: 5, max: 20 }),
                           })),
                           backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                           label: 'Blue dataset',
                           data: Array.from({ length: 50 }, () => ({
                              x: faker.datatype.number({ min: -100, max: 100 }),
                              y: faker.datatype.number({ min: -100, max: 100 }),
                              r: faker.datatype.number({ min: 5, max: 20 }),
                           })),
                           backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                     ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: true }}
               />

               <div className="flex h-1/2 w-full justify-left pt-5 pl-5">
                  <p>
                     Title: My bubble chart
                     <br />
                     Description: Lorem Ipsum is simply dummy text of the
                     printing and typesetting industry. Lorem Ipsum has been the
                     industry's standard dummy text ever since the 1500s, when
                     an unknown printer took a galley of type and scrambled it
                     to make a type specimen book.
                  </p>
               </div>
            </div>

            <div className="h-full w-1/3 border-r-2 border-b-2 border-bg-stone-100">
               <Line
                  data={{
                     labels: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                     ],
                     datasets: [
                        {
                           label: 'Dataset 1',
                           data: labels.map(() =>
                              faker.datatype.number({ min: -1000, max: 1000 })
                           ),
                           borderColor: 'rgb(255, 99, 132)',
                           backgroundColor: 'rgba(255, 99, 132, 0.5)',
                           yAxisID: 'y',
                        },
                     ],
                  }}
                  options={{
                     responsive: true,
                     maintainAspectRatio: true,
                     plugins: {
                        autocolors: false,
                        annotation: {
                           annotations: {
                              line1: {
                                 type: 'line',
                                 xMin: 'April',
                                 xMax: 'April',
                                 borderColor: 'black',
                                 borderWidth: 2,
                                 borderDash: [10, 15],
                              },
                           },
                        },
                     },
                  }}
               />

               <div className="flex h-1/2 w-full justify-left pt-5 pl-5">
                  <p>
                     Title: My line chart
                     <br />
                     Description: Lorem Ipsum is simply dummy text of the
                     printing and typesetting industry. Lorem Ipsum has been the
                     industry's standard dummy text ever since the 1500s, when
                     an unknown printer took a galley of type and scrambled it
                     to make a type specimen book.
                  </p>
               </div>
            </div>

            <div className="h-full w-1/3 border-r-2 border-b-2 border-bg-stone-100">
               <PolarArea
                  data={{
                     labels: [
                        'Red',
                        'Blue',
                        'Yellow',
                        'Green',
                        'Purple',
                        'Orange',
                     ],
                     datasets: [
                        {
                           label: '# of Votes',
                           data: [12, 19, 3, 5, 2, 3],
                           backgroundColor: [
                              'rgba(255, 99, 132, 0.5)',
                              'rgba(54, 162, 235, 0.5)',
                              'rgba(255, 206, 86, 0.5)',
                              'rgba(75, 192, 192, 0.5)',
                              'rgba(153, 102, 255, 0.5)',
                              'rgba(255, 159, 64, 0.5)',
                           ],
                           borderWidth: 1,
                        },
                     ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: true }}
               />
            </div>
         </div>
      </div>
   )
}

export default Dashboard

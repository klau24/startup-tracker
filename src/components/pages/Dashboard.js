import React from 'react'
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
   ArcElement,
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
   ArcElement
)

function Dashboard() {
   return (
      <div className="h-screen w-5/6 justify-center flex">
         <div className="h-1/3 w-1/4 p-10 ml-40">
            <Pie
               data={{
                  labels: ['True', 'False'],
                  datasets: [
                     {
                        label: 'Number of People',
                        data: [30, 40],
                        backgroundColor: ['#cc241d', '#98971a'],
                     },
                  ],
               }}
               options={{ responsive: true, maintainAspectRatio: false }}
            />

            <Bar
               data={{
                  labels: ['0-17', '18-25', '26-35'],
                  datasets: [
                     {
                        label: 'Number of People',
                        data: [3, 5, 7],
                        backgroundColor: [
                           '#cc241d',
                           '#98971a',
                           '#d79921',
                           '#458588',
                           '#b16286',
                        ],
                     },
                  ],
               }}
               options={{ responsive: true, maintainAspectRatio: false }}
            />
         </div>

         <div className="h-1/3 w-1/4 p-10">
            <Pie
               data={{
                  labels: ['True', 'False'],
                  datasets: [
                     {
                        label: 'Number of People',
                        data: [30, 40],
                        backgroundColor: ['#cc241d', '#98971a'],
                     },
                  ],
               }}
               options={{ responsive: true, maintainAspectRatio: false }}
            />

            <Pie
               data={{
                  labels: ['True', 'False'],
                  datasets: [
                     {
                        label: 'Number of People',
                        data: [30, 40],
                        backgroundColor: ['#cc241d', '#98971a'],
                     },
                  ],
               }}
               options={{ responsive: true, maintainAspectRatio: false }}
            />
         </div>

         <div className="h-1/3 w-1/4 p-10">
            <Bar
               data={{
                  labels: ['0-17', '18-25', '26-35'],
                  datasets: [
                     {
                        label: 'Number of People',
                        data: [3, 5, 7],
                        backgroundColor: [
                           '#cc241d',
                           '#98971a',
                           '#d79921',
                           '#458588',
                           '#b16286',
                        ],
                     },
                  ],
               }}
               options={{ responsive: true, maintainAspectRatio: false }}
            />

            <Pie
               data={{
                  labels: ['True', 'False'],
                  datasets: [
                     {
                        label: 'Number of People',
                        data: [30, 40],
                        backgroundColor: ['#cc241d', '#98971a'],
                     },
                  ],
               }}
               options={{ responsive: true, maintainAspectRatio: false }}
            />
         </div>
      </div>
   )
}

export default Dashboard

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

const company = 'Yotascale'

function parseWeeklyData(key, weeklyData, nlpFlag) {
   var parsedData = {}

   if (nlpFlag) {
      for (let item in weeklyData) {
         parsedData[item] = weeklyData[item]['nlp_features'][key]
      }
   } else {
      for (let item in weeklyData) {
         parsedData[item] = weeklyData[item][key]
      }
   }
   return parsedData
}

function Dashboard() {
   const [weeklyData, setWeeklyData] = useState(0)

   useEffect(() => {
      axios.get('/api/weeklyData/'.concat(company)).then((res) => {
         setWeeklyData(res.data)
      })
   }, [])

   return (
      <div className="h-screen w-5/6">
         <div className="flex h-1/2 justify-center items-center">
            <div className="h-full w-1/2 border-r-2 border-b-2 border-bg-stone-100">
               <Bar
                  data={{
                     labels: Object.keys(weeklyData),
                     datasets: [
                        {
                           label: company.concat(' Weekly Company Tweets'),
                           data: parseWeeklyData(
                              'company_tweets',
                              weeklyData,
                              0
                           ),
                           backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                     ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
               />
            </div>

            <div className="h-full w-full border-r-2 border-b-2 border-bg-stone-100">
               <Line
                  data={{
                     labels: Object.keys(weeklyData),
                     datasets: [
                        {
                           label: company.concat(' Weekly Users'),
                           data: parseWeeklyData('users', weeklyData, 0),
                           backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                     ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
               />
            </div>

            <div className="h-full w-full border-r-2 border-b-2 border-bg-stone-100">
               <Bar
                  data={{
                     labels: Object.keys(weeklyData),
                     datasets: [
                        {
                           label: company.concat(' Weekly User Tweets'),
                           data: parseWeeklyData('user_tweets', weeklyData, 0),
                           backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                     ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
               />
            </div>
         </div>

         <div className="flex h-1/2 justify-center items-center">
            <div className="h-full w-fullborder-r-2 border-b-2 border-bg-stone-100">
               <Line
                  data={{
                     labels: Object.keys(weeklyData),
                     datasets: [
                        {
                           label: company.concat(' Weekly Average Mentions'),
                           data: parseWeeklyData('avg_mentions', weeklyData, 1),
                           backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                     ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
               />
            </div>

            <div className="h-full w-full border-r-2 border-b-2 border-bg-stone-100">
               <Bar
                  data={{
                     labels: Object.keys(weeklyData),
                     datasets: [
                        {
                           label: company.concat(
                              ' Weekly Average VADER Sentiment'
                           ),
                           data: parseWeeklyData(
                              'avg_vader_sentiment',
                              weeklyData,
                              1
                           ),
                           backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                     ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
               />
            </div>

            <div className="h-full w-1/3 border-r-2 border-b-2 border-bg-stone-100">
               <Line
                  data={{
                     labels: Object.keys(weeklyData),
                     datasets: [
                        {
                           label: company.concat(
                              ' Weekly Average Tweet Characters'
                           ),
                           data: parseWeeklyData('avg_chars', weeklyData, 1),
                           backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                     ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
               />
            </div>
         </div>
      </div>
   )
}

export default Dashboard

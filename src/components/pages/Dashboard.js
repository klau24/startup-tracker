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
import { Bar, Line } from 'react-chartjs-2'
import annotationPlugin from 'chartjs-plugin-annotation'
import axios from 'axios'
import BarGraphCard from '../BarGraphCard'
import LineGraphCard from '../LineGraphCard'

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
         <div className="flex h-1/2 justify-center items-center pl-3.5 pt-4">
            <div className="h-full w-full">
               <BarGraphCard
                  title={company.concat(' Weekly Company Tweets')}
                  labels={Object.keys(weeklyData)}
                  data={parseWeeklyData('company_tweets', weeklyData, 0)}
               />
            </div>

            <div className="h-full w-full">
               <LineGraphCard
                  title={company.concat(' Weekly Users')}
                  labels={Object.keys(weeklyData)}
                  data={parseWeeklyData('users', weeklyData, 0)}
               />
            </div>

            <div className="h-full w-full">
               <BarGraphCard
                  title={company.concat(' Weekly User Tweets')}
                  labels={Object.keys(weeklyData)}
                  data={parseWeeklyData('user_tweets', weeklyData, 0)}
               />
            </div>
         </div>

         <div className="flex h-1/2 justify-center items-center pl-3.5">
            <div className="h-full w-full">
               <LineGraphCard
                  title={company.concat(' Weekly Average Mentions')}
                  labels={Object.keys(weeklyData)}
                  data={parseWeeklyData('avg_mentions', weeklyData, 1)}
               />
            </div>

            <div className="h-full w-full">
               <BarGraphCard
                  title={company.concat(' Weekly Average VADER Sentiment')}
                  labels={Object.keys(weeklyData)}
                  data={parseWeeklyData('avg_vader_sentiment', weeklyData, 1)}
               />
            </div>

            <div className="h-full w-full">
               <LineGraphCard
                  title={company.concat(' Weekly Average Tweet Characters')}
                  labels={Object.keys(weeklyData)}
                  data={parseWeeklyData('avg_chars', weeklyData, 1)}
               />
            </div>
         </div>
      </div>
   )
}

export default Dashboard

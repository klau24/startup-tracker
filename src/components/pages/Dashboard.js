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
import annotationPlugin from 'chartjs-plugin-annotation'
import axios from 'axios'
import Grid from '@mui/material/Grid'

import BarGraphCard from '../BarGraphCard'
import LineGraphCard from '../LineGraphCard'
import StackedBarGraphCard from '../StackedBarGraphCard'

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

let company = 'Yotascale'

function parseWeeklyDataHas(weeklyData) {
   var dataArr = []
   var jsonArr = []
   var colors = [
      'rgba(53, 162, 235, 0.5)',
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(33, 234, 152)',
   ]
   var count = 0

   for (let date in weeklyData) {
      for (let feat in weeklyData[date]['nlp_features']) {
         if (feat.indexOf('has_') >= 0) {
            dataArr.push(weeklyData[date]['nlp_features'][feat])
         }
      }
      jsonArr.push({
         label: date,
         data: dataArr,
         backgroundColor: colors[count % 4],
      })
      count++
      dataArr = []
   }
   return jsonArr.splice(-4)
}

function parseWeeklyData(key, weeklyData, nlpFlag) {
   var parsedData = {}

   for (let date in weeklyData) {
      if (nlpFlag) {
         parsedData[date] = weeklyData[date]['nlp_features'][key]
      } else {
         parsedData[date] = weeklyData[date][key]
      }
   }
   return parsedData
}

function Dashboard() {
   const [weeklyData, setWeeklyData] = useState(0)
   const [weeklyHasData, setWeeklyHasData] = useState([])

   useEffect(() => {
      if (company.indexOf(' ') >= 0) {
         company = company.replace(' ', '+')
      }
      axios.get('/api/weeklyData/'.concat(company)).then((res) => {
         setWeeklyData(res.data)
         setWeeklyHasData(parseWeeklyDataHas(res.data))
      })
   }, [])

   return (
      <Grid className="p-4" container spacing={2}>
         <Grid item xs={12} s={6} md={4}>
            <StackedBarGraphCard
               title={company.concat(' Weekly Company Tweets')}
               labels={[
                  'has_emoticon_ratio',
                  'has_hashtag_ratio',
                  'has_link_ratio',
                  'has_mention_ratio',
               ]}
               data={weeklyHasData}
            />
         </Grid>

         <Grid item xs={12} s={6} md={4}>
            <LineGraphCard
               title={company.concat(' Weekly Users')}
               labels={Object.keys(weeklyData)}
               data={parseWeeklyData('users', weeklyData, 0)}
            />
         </Grid>

         <Grid item xs={12} s={6} md={4}>
            <BarGraphCard
               title={company.concat(' Weekly User Tweets')}
               labels={Object.keys(weeklyData)}
               data={parseWeeklyData('user_tweets', weeklyData, 0)}
            />
         </Grid>

         <Grid item xs={12} s={6} md={4}>
            <LineGraphCard
               title={company.concat(' Weekly Average Mentions')}
               labels={Object.keys(weeklyData)}
               data={parseWeeklyData('avg_mentions', weeklyData, 1)}
            />
         </Grid>

         <Grid item xs={12} s={6} md={4}>
            <BarGraphCard
               title={company.concat(' Weekly Average VADER Sentiment')}
               labels={Object.keys(weeklyData)}
               data={parseWeeklyData('avg_vader_sentiment', weeklyData, 1)}
            />
         </Grid>

         <Grid item xs={12} s={6} md={4}>
            <LineGraphCard
               title={company.concat(' Weekly Average Tweet Characters')}
               labels={Object.keys(weeklyData)}
               data={parseWeeklyData('avg_chars', weeklyData, 1)}
            />
         </Grid>
      </Grid>
   )
}

export default Dashboard

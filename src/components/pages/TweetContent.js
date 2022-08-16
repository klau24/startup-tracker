import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import WordCloudCard from '../WordCloudCard'
import Widget from '../Widget'
import LineGraphCard from '../LineGraphCard'
import BarGraphCard from '../BarGraphCard'
import Sidebar from '../sidebar/Sidebar'

function TweetContent(props) {
   const [tweetData, setTweetData] = useState(null)
   const [weeklyData, setWeeklyData] = useState(null)

   useEffect(() => {
      var company = props.company
      if (company) {
         if (props.company.indexOf(' ') >= 0) {
            company = company.replace(' ', '+')
         }

         axios
            .get('/api/tweets/'.concat(company))
            .then((res) => {
               setTweetData(res.data)
            })
            .catch((err) => {
               console.log(err)
            })

         axios
            .get('/api/weeklyData/'.concat(company))
            .then((res) => {
               setWeeklyData(res.data)
            })
            .catch((err) => {
               console.log(err)
            })
      }
   }, [props.company])

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

   if (tweetData && weeklyData) {
      return (
         <>
            <Sidebar />
            <Grid
               className="p-4"
               container
               spacing={2}
               style={{ height: '95vh', overflow: 'auto' }}
            >
               <Grid item xs={12} s={6} md={4}>
                  <Widget
                     title={'Average Coleman-Liau Readability Grade'}
                     data={tweetData['summaryData']['avgReadGrade']}
                     showPercent={false}
                  />
               </Grid>
               <Grid item xs={12} s={6} md={4}>
                  <Widget
                     title={'Average Number of Words'}
                     data={tweetData['summaryData']['avgWords']}
                     showPercent={false}
                  />
               </Grid>
               <Grid item xs={12} s={6} md={4}>
                  <Widget
                     title={'Average Number of Syllables'}
                     data={tweetData['summaryData']['avgSyllables']}
                     showPercent={false}
                  />
               </Grid>
               <Grid item xs={12} s={6} md={4}>
                  <WordCloudCard words={tweetData['wordFrequency']} />
               </Grid>
               <Grid item xs={12} s={6} md={4}>
                  <LineGraphCard
                     title={props.company.concat(' Tweet Likes')}
                     labels={Object.keys(tweetData['data'])}
                     data={Object.values(tweetData['data']).map(
                        (val) => val['likeCount']
                     )}
                  />
               </Grid>
               <Grid item xs={12} s={6} md={4}>
                  <LineGraphCard
                     title={props.company.concat(' Retweets')}
                     labels={Object.keys(tweetData['data'])}
                     data={Object.values(tweetData['data']).map(
                        (val) => val['retweetCount']
                     )}
                  />
               </Grid>
               <Grid item xs={12} s={6} md={4}>
                  <BarGraphCard
                     title={props.company.concat(' Weekly User Tweets')}
                     labels={Object.keys(weeklyData)}
                     data={parseWeeklyData('user_tweets', weeklyData, 0)}
                  />
               </Grid>
               <Grid item xs={12} s={6} md={4}>
                  <LineGraphCard
                     title={props.company.concat(
                        ' Weekly Average Tweet Characters'
                     )}
                     labels={Object.keys(weeklyData)}
                     data={parseWeeklyData('avg_chars', weeklyData, 1)}
                  />
               </Grid>
            </Grid>
         </>
      )
   }
}

export default TweetContent

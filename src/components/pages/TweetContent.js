import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import WordCloudCard from '../WordCloudCard'
import Widget from '../Widget'
import LineGraphCard from '../LineGraphCard'

function TweetContent(props) {
   const [tweetData, setTweetData] = useState(null)

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
      }
   }, [props.company])

   if (tweetData) {
      return (
         <Grid className="p-4" container spacing={2}>
            <Grid item xs={12} s={6} md={4}>
               <WordCloudCard words={tweetData['wordFrequency']} />
            </Grid>
            <Grid item xs={12} s={6} md={4}>
               <div>
                  <Widget
                     title={'Average Coleman-Liau Readability Grade'}
                     data={tweetData['summaryData']['avgReadGrade']}
                     showPercent={false}
                  />
                  <br></br>
                  <Widget
                     title={'Average Number of Words'}
                     data={tweetData['summaryData']['avgWords']}
                     showPercent={false}
                  />
                  <br></br>
                  <Widget
                     title={'Average Number of Syllables'}
                     data={tweetData['summaryData']['avgSyllables']}
                     showPercent={false}
                  />
                  <br></br>
               </div>
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
                  title={props.company.concat(' Tweet Retweets')}
                  labels={Object.keys(tweetData['data'])}
                  data={Object.values(tweetData['data']).map(
                     (val) => val['retweetCount']
                  )}
               />
            </Grid>
         </Grid>
      )
   }
}

export default TweetContent

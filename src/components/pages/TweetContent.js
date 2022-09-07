import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Widget from '../Widget'
import Sidebar from '../sidebar/Sidebar'
import FilterButton from '../FilterButton'
import ContentCard from '../ContentCard'
import SortSelector from '../SortSelector'
import { TweetContentData } from './TweetContentData'

function TweetContent(props) {
   const [tweetData, setTweetData] = useState(null)
   const [weeklyData, setWeeklyData] = useState(null)
   const [filterItems, setFilterItems] = useState(
      [TweetContentData.map((content) => content['data'])][0]
   )

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
   }, [props.company, props.filterItems])

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

   function handleFilterItems(item) {
      var itemsArr = [...filterItems]

      if (itemsArr.indexOf(item) === -1) {
         itemsArr.push(item)
         setFilterItems(itemsArr)
      } else {
         itemsArr = itemsArr.filter((c) => c !== item)
         setFilterItems(itemsArr)
      }
   }

   if (tweetData && weeklyData) {
      return (
         <>
            <Grid
               className="p-4"
               container
               spacing={2}
               style={{ height: '95vh', overflow: 'auto' }}
            >
               <Grid
                  className="p-4 pb-12"
                  container
                  spacing={1}
                  style={{ height: '4.5vh' }}
               >
                  {TweetContentData.map((content) => {
                     return (
                        <Grid item>
                           <FilterButton
                              text={content['data']}
                              filterItems={handleFilterItems}
                           />
                        </Grid>
                     )
                  })}
                  <SortSelector />
               </Grid>

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

               {filterItems.map((item) => {
                  switch (item) {
                     case 'Word Cloud':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="wordCloud"
                                 data={{ words: tweetData['wordFrequency'] }}
                              />
                           </Grid>
                        )
                     case 'Tweet Likes':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: props.company.concat(' Tweet Likes'),
                                    labels: Object.keys(tweetData['data']),
                                    data: Object.values(tweetData['data']).map(
                                       (val) => val['likeCount']
                                    ),
                                 }}
                              />
                           </Grid>
                        )
                     case 'Retweet':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: props.company.concat(' Retweets'),
                                    labels: Object.keys(tweetData['data']),
                                    data: Object.values(tweetData['data']).map(
                                       (val) => val['retweetCount']
                                    ),
                                 }}
                              />
                           </Grid>
                        )
                     case 'User Tweets':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="bar"
                                 data={{
                                    title: props.company.concat(
                                       ' Weekly User Tweets'
                                    ),
                                    labels: Object.keys(weeklyData),
                                    data: parseWeeklyData(
                                       'user_tweets',
                                       weeklyData,
                                       0
                                    ),
                                 }}
                              />
                           </Grid>
                        )
                     case 'Average Tweet Characters':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: props.company.concat(
                                       ' Weekly Average Tweet Characters'
                                    ),
                                    labels: Object.keys(weeklyData),
                                    data: parseWeeklyData(
                                       'avg_chars',
                                       weeklyData,
                                       1
                                    ),
                                 }}
                              />
                           </Grid>
                        )
                  }
               })}
            </Grid>
         </>
      )
   }
}

export default TweetContent

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Widget from '../Widget'
import FilterButton from '../FilterButton'
import ContentCard from '../ContentCard'
import SortSelector from '../SortSelector'
import { UserTweetsData } from './UserTweetsData'

function UserTweets(props) {
   const [nlpData, setNlpData] = useState(null)
   const [userTweetData, setUserTweetData] = useState(null)
   const [wordcloudData, setWordcloudData] = useState(null)
   const [filterItems, setFilterItems] = useState(
      [UserTweetsData.map((content) => content)][0]
   )

   useEffect(() => {
      var company = props.company
      if (company) {
         if (props.company.indexOf(' ') >= 0) {
            company = company.replace(' ', '+')
         }
         axios
            .get(
               '/api/'
                  .concat(company)
                  .concat('/')
                  .concat(props.sortBy)
                  .concat('/linguistic_features')
            )
            .then((res) => {
               setNlpData(res.data)
            })
            .catch((err) => {
               console.log(err)
            })

         axios
            .get(
               '/api/'
                  .concat(company)
                  .concat('/')
                  .concat(props.sortBy)
                  .concat('/activity')
            )
            .then((res) => {
               setUserTweetData(res.data)
            })
            .catch((err) => {
               console.log(err)
            })

         axios
            .get(
               '/api/'
                  .concat(company)
                  .concat('/')
                  .concat(props.sortBy)
                  .concat('/words')
            )
            .then((res) => {
               setWordcloudData(res.data)
            })
            .catch((err) => {
               console.log(err)
            })
      }
   }, [props.company, props.filterItems, props.sortBy])

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

   if (nlpData && userTweetData && wordcloudData) {
      var latestDate = Object.keys(nlpData).pop()
      return (
         <>
            <Grid
               className="p-4"
               container
               spacing={2}
               style={{ height: '95vh', overflow: 'auto' }}
            >
               <Grid item xs={12} s={12} md={12}>
                  <h1 className="text-center text-2xl font-bold">
                     {props.company}
                  </h1>
               </Grid>
               <Grid
                  className="p-4 pb-12"
                  container
                  justifyContent="center"
                  spacing={1}
                  style={{ height: '4.5vh' }}
               >
                  {filterItems.map((content) => {
                     return (
                        <Grid item>
                           <FilterButton
                              text={content['data']}
                              filterItems={handleFilterItems}
                           />
                        </Grid>
                     )
                  })}
                  <SortSelector
                     currentSort={props.sortBy}
                     sortBy={props.handleSort}
                  />
               </Grid>

               {filterItems.map((item) => {
                  switch (item.data) {
                     case 'Average Readability Grade':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <Widget
                                 title={'Average Readability Grade'}
                                 data={
                                    nlpData[latestDate]['nlp_features'][
                                       'avg_flesch_reading_ease'
                                    ]
                                 }
                                 showPercent={false}
                              />
                           </Grid>
                        )
                     case 'Average Number of Words':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <Widget
                                 title={'Average Number of Words'}
                                 data={
                                    nlpData[latestDate]['nlp_features'][
                                       'avg_words'
                                    ]
                                 }
                                 showPercent={false}
                              />
                           </Grid>
                        )
                     case 'Average Number of Links':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <Widget
                                 title={'Average Number of Links'}
                                 data={
                                    nlpData[latestDate]['nlp_features'][
                                       'avg_links'
                                    ]
                                 }
                                 showPercent={false}
                              />
                           </Grid>
                        )
                     case 'Word Cloud':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType={item.dataType}
                                 data={{ words: wordcloudData['wordcloud'] }}
                              />
                           </Grid>
                        )
                     case 'Tweet Likes':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType={item.dataType}
                                 data={{
                                    title: 'Tweet Likes',
                                    labels: Object.keys(userTweetData),
                                    data: Object.values(userTweetData).map(
                                       (val) =>
                                          val['tweet_metrics']['other_users'][
                                             'like_count'
                                          ]
                                    ),
                                 }}
                              />
                           </Grid>
                        )
                     case 'Retweet':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType={item.dataType}
                                 data={{
                                    title: 'Retweets',
                                    labels: Object.keys(userTweetData),
                                    data: Object.values(userTweetData).map(
                                       (val) =>
                                          val['tweet_metrics']['other_users'][
                                             'retweet_count'
                                          ]
                                    ),
                                 }}
                              />
                           </Grid>
                        )
                     case 'User Tweets':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType={item.dataType}
                                 data={{
                                    title: 'User Tweets',
                                    labels: Object.keys(userTweetData),
                                    data: Object.values(userTweetData).map(
                                       (val) => val['user_tweets']
                                    ),
                                 }}
                              />
                           </Grid>
                        )
                     case 'User Tweets About Company':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType={item.dataType}
                                 data={{
                                    title: 'User Tweets About Company',
                                    labels: Object.keys(userTweetData),
                                    data: Object.values(userTweetData).map(
                                       (val) => val['user_tweets']
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

export default UserTweets

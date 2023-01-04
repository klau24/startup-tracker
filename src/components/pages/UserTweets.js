import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Widget from '../Widget'
import GenericButton from '../GenericButton'
import ContentCard from '../ContentCard'
import SortSelector from '../SortSelector'
import { UserTweetsData } from './UserTweetsData'

function UserTweets(props) {
   const [nlpData, setNlpData] = useState(null)
   const [userTweetData, setUserTweetData] = useState(null)
   const [wordcloudData, setWordcloudData] = useState(null)
   const [emojiCloud, setEmojiCloud] = useState(null)
   const [hashtagCloud, setHashtagCloud] = useState(null)
   const [filterItems, setFilterItems] = useState(
      [UserTweetsData.map((content) => content['data'])][0]
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

         axios
            .get(
               '/api/'
                  .concat(company)
                  .concat('/')
                  .concat(props.sortBy)
                  .concat('/emojis')
            )
            .then((res) => {
               setEmojiCloud(res.data)
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
                  .concat('/hashtags')
            )
            .then((res) => {
               setHashtagCloud(res.data)
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
            <Grid className="pt-4 pb-4 pl-12 pr-12" container spacing={2.5}>
               <Grid item xs={12} s={12} md={12}>
                  <h1 className="text-center text-xl">User Tweets</h1>
                  <h2 className="pt-3 text-center text-2xl font-bold">
                     {props.company}
                  </h2>
               </Grid>
               <Grid
                  className="p-4 pb-12"
                  container
                  justifyContent="center"
                  spacing={1}
                  style={{ height: '4.5vh' }}
               >
                  {filterItems.map((content) => {
                     if (content.indexOf('Average') === -1) {
                        return (
                           <Grid item>
                              <GenericButton
                                 text={content}
                                 filterItems={handleFilterItems}
                                 isFilter={true}
                              />
                           </Grid>
                        )
                     }
                  })}
                  <SortSelector
                     currentSort={props.sortBy}
                     sortBy={props.handleSort}
                  />
               </Grid>

               {filterItems.map((item) => {
                  switch (item) {
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
                                 tooltip="Flesch Reading Ease Grade"
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
                                 tooltip="Avg. number of words in a tweet"
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
                                 tooltip="Avg. website links in a tweet"
                              />
                           </Grid>
                        )
                     case 'Word Cloud':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="wordCloud"
                                 data={{ words: wordcloudData['wordcloud'] }}
                                 tooltip="Tweet word cloud"
                                 isGraph={1}
                              />
                           </Grid>
                        )
                     case 'Tweet Likes':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
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
                                 isGraph={1}
                                 tooltip="User tweet likes"
                              />
                           </Grid>
                        )
                     case 'Retweet':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
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
                                 isGraph={1}
                                 tooltip="User tweet retweets"
                              />
                           </Grid>
                        )
                     case 'User Tweets':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'User Tweets',
                                    labels: Object.keys(userTweetData),
                                    data: Object.values(userTweetData).map(
                                       (val) => val['user_tweets']
                                    ),
                                 }}
                                 isGraph={1}
                                 tooltip="User tweets about company"
                              />
                           </Grid>
                        )
                     case 'Emoji Cloud':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="wordCloud"
                                 data={{ words: emojiCloud['wordcloud'] }}
                                 isGraph={1}
                                 tooltip="Emoji word cloud"
                              />
                           </Grid>
                        )
                     case 'Hashtag Cloud':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="wordCloud"
                                 data={{ words: hashtagCloud['wordcloud'] }}
                                 isGraph={1}
                                 tooltip="Hashtag word cloud"
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

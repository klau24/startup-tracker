import React, { useEffect, useState } from 'react'
import Widget from '../Widget'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import ContentCard from '../ContentCard'
import { companyTwitterData } from './CompanyTwitterData'
import FilterButton from '../FilterButton'
import SortSelector from '../SortSelector'
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

function CompanyTwitter(props) {
   const [companyTweetData, setCompanyTweetData] = useState(null)
   const [twitterData, setTwitterData] = useState(null)
   const [weeklyData, setWeeklyData] = useState(null)
   const [weeklyHasData, setWeeklyHasData] = useState(null)
   const [filterItems, setFilterItems] = useState(
      [companyTwitterData.map((content) => content['data'])][0]
   )

   useEffect(() => {
      var company = props.company

      if (company) {
         if (props.company.indexOf(' ') >= 0) {
            company = company.replace(' ', '+')
         }
         axios
            .get('/api/companyTwitterData/'.concat(company))
            .then((res) => {
               setTwitterData(res.data)
            })
            .catch((err) => {
               console.log(err)
            })

         axios.get('/api/weeklyData/'.concat(company)).then((res) => {
            setWeeklyData(res.data)
            setWeeklyHasData(parseWeeklyDataHas(res.data))
         })

         axios
            .get('/api/'.concat(company).concat('/weekly/activity'))
            .then((res) => {
               setCompanyTweetData(res.data)
            })
      }
   }, [props.company])

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

   if (twitterData && weeklyData && weeklyHasData && companyTweetData) {
      return (
         <>
            <Grid
               className="p-4"
               container
               justifyContent="center"
               style={{ height: '95vh', overflow: 'auto' }}
               spacing={2}
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
                  {companyTwitterData.map((content) => {
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

               {/* <Grid item xs={12} s={6} md={4}>
                  <Widget
                     title="Follower Count"
                     data={twitterData['summary']['followers_count']}
                     showPercent={true}
                  />
               </Grid>

               <Grid item xs={12} s={6} md={4}>
                  <Widget
                     title="Following Count"
                     data={twitterData['summary']['following_count']}
                     showPercent={true}
                  />
               </Grid>

               <Grid item xs={12} s={6} md={4}>
                  <Widget
                     title="Number of Tweets"
                     data={twitterData['summary']['tweet_count']}
                     showPercent={true}
                  />
               </Grid> */}

               {filterItems.map((item) => {
                  switch (item) {
                     case 'Company Tweets':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'Company Tweets',
                                    labels: Object.keys(companyTweetData),
                                    data: Object.values(companyTweetData).map(
                                       (val) => val['company_tweets']
                                    ),
                                 }}
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
                                    labels: Object.keys(companyTweetData),
                                    data: Object.values(companyTweetData).map(
                                       (val) =>
                                          val['tweet_metrics']['company'][
                                             'like_count'
                                          ]
                                    ),
                                 }}
                              />
                           </Grid>
                        )
                     case 'Retweets':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'Retweets',
                                    labels: Object.keys(companyTweetData),
                                    data: Object.values(companyTweetData).map(
                                       (val) =>
                                          val['tweet_metrics']['company'][
                                             'retweet_count'
                                          ]
                                    ),
                                 }}
                              />
                           </Grid>
                        )
                     case 'Users':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'Users',
                                    labels: Object.keys(companyTweetData),
                                    data: Object.values(companyTweetData).map(
                                       (val) => val['users']
                                    ),
                                 }}
                              />
                           </Grid>
                        )
                     case 'User Tweets About Company':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'User Tweets About Company',
                                    labels: Object.keys(companyTweetData),
                                    data: Object.values(companyTweetData).map(
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

export default CompanyTwitter

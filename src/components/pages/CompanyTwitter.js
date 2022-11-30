import React, { useEffect, useState } from 'react'
import Widget from '../Widget'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import ContentCard from '../ContentCard'
import { companyTwitterData } from './CompanyTwitterData'
import GenericButton from '../GenericButton'
import SortSelector from '../SortSelector'

function CompanyTwitter(props) {
   const [activity, setActivity] = useState(null)
   const [twitterData, setTwitterData] = useState(null)
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
            .get('/api/'.concat(company).concat('/companyTwitterData'))
            .then((res) => {
               setTwitterData(res.data)
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
               setActivity(res.data)
            })
      }
   }, [props.company, props.sortBy])

   function handleFilterItems(item) {
      var itemsArr = [...filterItems]
      console.log(item)
      console.log(itemsArr)
      if (itemsArr.indexOf(item) === -1) {
         itemsArr.push(item)
         setFilterItems(itemsArr)
      } else {
         itemsArr = itemsArr.filter((c) => c !== item)
         setFilterItems(itemsArr)
      }
   }

   if (twitterData && activity) {
      console.log(filterItems)
      return (
         <>
            <Grid
               className="pt-4 pb-4 pl-12 pr-12"
               container
               justifyContent="center"
               spacing={2.5}
            >
               <Grid item xs={12} s={12} md={12}>
                  <h1 className="text-center text-xl">Company Twitter</h1>
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
                  {companyTwitterData.map((content) => {
                     return (
                        <Grid item>
                           <GenericButton
                              text={content['data']}
                              filterItems={handleFilterItems}
                              isFilter={true}
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
                  switch (item) {
                     case 'Followers Count':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'Follower Count',
                                    labels: Object.keys(twitterData),
                                    data: Object.values(twitterData).map(
                                       (val) => val['followers_count']
                                    ),
                                 }}
                                 //tooltip={item.tooltip}
                                 tooltip="Number of Twitter followers"
                              />
                           </Grid>
                        )
                     case 'Number of Tweets':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'Number of Tweets',
                                    labels: Object.keys(twitterData),
                                    data: Object.values(twitterData).map(
                                       (val) => val['tweet_count']
                                    ),
                                 }}
                                 //tooltip={item.tooltip}
                                 tooltip="Tweets over time"
                              />
                           </Grid>
                        )
                     case 'Company Tweets':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'Company Tweets',
                                    labels: Object.keys(activity),
                                    data: Object.values(activity).map(
                                       (val) => val['company_tweets']
                                    ),
                                 }}
                                 //tooltip={item.tooltip}
                                 tooltip="Company tweets over time"
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
                                    labels: Object.keys(activity),
                                    data: Object.values(activity).map(
                                       (val) =>
                                          val['tweet_metrics']['company'][
                                             'like_count'
                                          ]
                                    ),
                                 }}
                                 //tooltip={item.tooltip}
                                 tooltip="Likes on company tweets"
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
                                    labels: Object.keys(activity),
                                    data: Object.values(activity).map(
                                       (val) =>
                                          val['tweet_metrics']['company'][
                                             'retweet_count'
                                          ]
                                    ),
                                 }}
                                 //tooltip={item.tooltip}
                                 tooltip="Retweets on company tweets"
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
                                    labels: Object.keys(activity),
                                    data: Object.values(activity).map(
                                       (val) => val['users']
                                    ),
                                 }}
                                 //tooltip={item.tooltip}
                                 tooltip="Number of users"
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

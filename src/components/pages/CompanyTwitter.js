import React, { useEffect, useState } from 'react'
import Widget from '../Widget'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import ContentCard from '../ContentCard'
import { companyTwitterData } from './CompanyTwitterData'
import FilterButton from '../FilterButton'
import SortSelector from '../SortSelector'

function CompanyTwitter(props) {
   const [activity, setActivity] = useState(null)
   const [twitterData, setTwitterData] = useState(null)
   const [filterItems, setFilterItems] = useState(
      [companyTwitterData.map((content) => content)][0]
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
                  <SortSelector
                     currentSort={props.sortBy}
                     sortBy={props.handleSort}
                  />
               </Grid>

               {/* <Grid item xs={12} s={6} md={4}>
                  <Widget
                     title="Following Count"
                     data={twitterData['summary']['following_count']}
                     showPercent={true}
                  />
               </Grid> */}

               {filterItems.map((item) => {
                  switch (item.data) {
                     case 'Follower Count':
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

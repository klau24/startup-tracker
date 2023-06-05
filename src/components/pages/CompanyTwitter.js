import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import Widget from '../Widget'
import ContentCard from '../ContentCard'
import { companyTwitterData } from './CompanyTwitterData'
import { companySourceData } from './CompanySourceData'
import GenericButton from '../GenericButton'
import SortSelector from '../SortSelector'
import { Chart as ChartJS, registerables } from 'chart.js'
ChartJS.register(...registerables)

function CompanyTwitter(props) {
   const [activity, setActivity] = useState(null)
   const [twitterData, setTwitterData] = useState(null)
   const [source, setSource] = useState([])
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

   function handleSource(source) {
      setSource((prevSource) => {
         if (prevSource.includes(source)) {
            return prevSource.filter((item) => item !== source)
         } else {
            return [...prevSource, source]
         }
      })
   }
   while (true) {
      return (
         <>
            <Grid item xs={12} s={12} md={12}>
               <h2 className="pt-3 text-center text-2xl font-bold">
                  {props.company}
               </h2>
            </Grid>
            <Box mt={3} />
            <Grid item xs={12} s={12} md={12}>
               <h1 className="text-center text-xl">Source</h1>
            </Grid>
            <Grid
               className="p-4 pb-12"
               container
               justifyContent="center"
               spacing={1}
               style={{ height: '4.5vh' }}
            >
               {companySourceData.map((content) => {
                  return (
                     <Grid item>
                        <GenericButton
                           text={content['data']}
                           filterItems={handleSource}
                           isFilter={true}
                        />
                     </Grid>
                  )
               })}
            </Grid>
            <Box mt={3} />
            {source.map((item) => {
               switch (item) {
                  case 'Twitter':
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
                                    <h1 className="text-center text-xl">
                                       Company Twitter
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
                                                      labels:
                                                         Object.keys(
                                                            twitterData
                                                         ),
                                                      data: Object.values(
                                                         twitterData
                                                      ).map(
                                                         (val) =>
                                                            val[
                                                               'followers_count'
                                                            ]
                                                      ),
                                                   }}
                                                   isGraph={1}
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
                                                      labels:
                                                         Object.keys(
                                                            twitterData
                                                         ),
                                                      data: Object.values(
                                                         twitterData
                                                      ).map(
                                                         (val) =>
                                                            val['tweet_count']
                                                      ),
                                                   }}
                                                   isGraph={1}
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
                                                      labels:
                                                         Object.keys(activity),
                                                      data: Object.values(
                                                         activity
                                                      ).map(
                                                         (val) =>
                                                            val[
                                                               'company_tweets'
                                                            ]
                                                      ),
                                                   }}
                                                   //tooltip={item.tooltip}
                                                   isGraph={1}
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
                                                      labels:
                                                         Object.keys(activity),
                                                      data: Object.values(
                                                         activity
                                                      ).map(
                                                         (val) =>
                                                            val[
                                                               'tweet_metrics'
                                                            ]['company'][
                                                               'like_count'
                                                            ]
                                                      ),
                                                   }}
                                                   //tooltip={item.tooltip}
                                                   isGraph={1}
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
                                                      labels:
                                                         Object.keys(activity),
                                                      data: Object.values(
                                                         activity
                                                      ).map(
                                                         (val) =>
                                                            val[
                                                               'tweet_metrics'
                                                            ]['company'][
                                                               'retweet_count'
                                                            ]
                                                      ),
                                                   }}
                                                   //tooltip={item.tooltip}
                                                   isGraph={1}
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
                                                      labels:
                                                         Object.keys(activity),
                                                      data: Object.values(
                                                         activity
                                                      ).map(
                                                         (val) => val['users']
                                                      ),
                                                   }}
                                                   //tooltip={item.tooltip}
                                                   isGraph={1}
                                                   tooltip="Number of users"
                                                />
                                             </Grid>
                                          )
                                       default:
                                          return null
                                    }
                                 })}
                              </Grid>
                           </>
                        )
                     }
                  case 'Crunchbase':
                     const schools = ['School A', 'School B', 'School C']
                     const degrees = ['Degree A', 'Degree B', 'Degree C']
                     return (
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                           <Widget
                              title={"Founders' Alma Maters"}
                              data={schools.map((school) => (
                                 <>
                                    {school}
                                    <br />
                                 </>
                              ))}
                              tooltip="Schools attended by the founders of the company"
                           />
                           <Widget
                              title={"Founders' Degrees"}
                              data={degrees.map((degree) => (
                                 <>
                                    {degree}
                                    <br />
                                 </>
                              ))}
                              tooltip="Degrees pursued by the founders of the company"
                           />
                        </Box>
                     )
                  default:
                     return null
               }
            })}
         </>
      )
   }
}

export default CompanyTwitter

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import GenericButton from '../GenericButton'
import ContentCard from '../ContentCard'
import SortSelector from '../SortSelector'
import { advancedNlpData } from './AdvancedNLPData'

function AdvancedNLP(props) {
   const [nlpData, setNlpData] = useState(null)
   const [filterItems, setFilterItems] = useState(
      [advancedNlpData.map((content) => content['data'])][0]
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
      }
   }, [props.company, props.sortBy])

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

   if (nlpData) {
      return (
         <>
            <Grid
               className="pt-4 pb-4 pl-12 pr-12"
               container
               justifyContent="center"
               spacing={2.5}
            >
               <Grid item xs={12} s={12} md={12}>
                  <h1 className="text-center text-xl">Advanced NLP</h1>
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
                           <GenericButton
                              text={content}
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
                     case 'Mentions':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'Mentions',
                                    labels: Object.keys(nlpData),
                                    data: Object.values(nlpData).map(
                                       (val) =>
                                          val['nlp_features'][
                                             'avg_num_mentions'
                                          ]
                                    ),
                                    fill: 0,
                                 }}
                                 isGraph={1}
                              />
                           </Grid>
                        )
                     case 'Tweets About Funding':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'Tweets About Funding',
                                    labels: Object.keys(nlpData),
                                    data: Object.values(nlpData).map(
                                       (val) =>
                                          val['nlp_features']['tweet funding']
                                    ),
                                    fill: 0,
                                 }}
                                 isGraph={1}
                              />
                           </Grid>
                        )
                     case 'Tweets About Management Change':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'Tweets About Management Change',
                                    labels: Object.keys(nlpData),
                                    data: Object.values(nlpData).map(
                                       (val) =>
                                          val['nlp_features'][
                                             'tweet management change'
                                          ]
                                    ),
                                    fill: 0,
                                 }}
                                 isGraph={1}
                              />
                           </Grid>
                        )
                     case 'Bert Sentiment':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'Bert Sentiment',
                                    labels: Object.keys(nlpData),
                                    data: Object.values(nlpData).map(
                                       (val) =>
                                          val['nlp_features'][
                                             'avg_bert_sentiment'
                                          ]
                                    ),
                                    fill: 1,
                                 }}
                                 isGraph={1}
                              />
                           </Grid>
                        )
                     case 'Synset Complexity':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'Synset Complexity',
                                    labels: Object.keys(nlpData),
                                    data: Object.values(nlpData).map(
                                       (val) =>
                                          val['nlp_features'][
                                             'avg_synset_complexity'
                                          ]
                                    ),
                                    fill: 0,
                                 }}
                                 isGraph={1}
                              />
                           </Grid>
                        )
                     case 'Tweet Characters':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType="line"
                                 data={{
                                    title: 'Tweet Characters',
                                    labels: Object.keys(nlpData),
                                    data: Object.values(nlpData).map(
                                       (val) =>
                                          val['nlp_features']['avg_num_chars']
                                    ),
                                    fill: 0,
                                 }}
                                 isGraph={1}
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
}

export default AdvancedNLP

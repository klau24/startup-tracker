import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import FilterButton from '../FilterButton'
import ContentCard from '../ContentCard'
import SortSelector from '../SortSelector'
import { advancedNlpData } from './AdvancedNLPData'

function AdvancedNLP(props) {
   const [nlpData, setNlpData] = useState(null)
   const [filterItems, setFilterItems] = useState(
      [advancedNlpData.map((content) => content)][0]
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
                     case 'Vader Sentiment':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType={item.dataType}
                                 data={{
                                    title: 'Vader Sentiment',
                                    labels: Object.keys(nlpData),
                                    data: Object.values(nlpData).map(
                                       (val) =>
                                          val['nlp_features'][
                                             'avg_vader_sentiment'
                                          ]
                                    ),
                                    fill: 1,
                                 }}
                              />
                           </Grid>
                        )
                     case 'Hugging Face Sentiment':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType={item.dataType}
                                 data={{
                                    title: 'Hugging Face Sentiment',
                                    labels: Object.keys(nlpData),
                                    data: Object.values(nlpData).map(
                                       (val) =>
                                          val['nlp_features'][
                                             'avg_hugging_face_sentiment'
                                          ]
                                    ),
                                    fill: 1,
                                 }}
                              />
                           </Grid>
                        )
                     case 'Synsets Ratio':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType={item.dataType}
                                 data={{
                                    title: 'Synsets Ratio',
                                    labels: Object.keys(nlpData),
                                    data: Object.values(nlpData).map(
                                       (val) =>
                                          val['nlp_features'][
                                             'avg_synset_ratio'
                                          ]
                                    ),
                                    fill: 1,
                                 }}
                              />
                           </Grid>
                        )
                     case 'Emoticon Ratio':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType={item.dataType}
                                 data={{
                                    title: 'Emoticon Ratio',
                                    labels: Object.keys(nlpData),
                                    data: Object.values(nlpData).map(
                                       (val) =>
                                          val['nlp_features'][
                                             'has_emoticon_ratio'
                                          ]
                                    ),
                                 }}
                              />
                           </Grid>
                        )
                     case 'Hashtag Ratio':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType={item.dataType}
                                 data={{
                                    title: 'Hashtag Ratio',
                                    labels: Object.keys(nlpData),
                                    data: Object.values(nlpData).map(
                                       (val) =>
                                          val['nlp_features'][
                                             'hash_hashtag_ratio'
                                          ]
                                    ),
                                 }}
                              />
                           </Grid>
                        )
                     case 'Mention Ratio':
                        return (
                           <Grid item xs={12} s={6} md={4}>
                              <ContentCard
                                 cardType={item.dataType}
                                 data={{
                                    title: 'Mention Ratio',
                                    labels: Object.keys(nlpData),
                                    data: Object.values(nlpData).map(
                                       (val) =>
                                          val['nlp_features'][
                                             'hash_mention_ratio'
                                          ]
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

export default AdvancedNLP

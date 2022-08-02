import React, { useEffect, useState } from 'react'
import Widget from '../Widget'
import axios from 'axios'

let company = 'Yotascale'

// Figure out how to implement with grid
function CompanyTwitter() {
   const [twitterData, setTwitterData] = useState(null)

   useEffect(() => {
      axios
         .get('/api/twitterData/'.concat(company))
         .then((res) => {
            console.log('res: ', res.data)
            setTwitterData(res.data)
            console.log('twitterData: ', twitterData)
         })
         .catch((err) => {
            console.log(err)
         })
   }, [])

   if (twitterData) {
      return (
         <div className="w-full flex justify-between mt-3">
            <Widget
               title="Follower Count"
               data={twitterData['summary']['followers_count']}
            />
            <Widget
               title="Following Count"
               data={twitterData['summary']['following_count']}
            />
            <Widget
               title="Number of Tweets"
               data={twitterData['summary']['tweet_count']}
            />
            <Widget
               title="Public List Count"
               data={twitterData['summary']['listed_count']}
            />
         </div>
      )
   }
}

export default CompanyTwitter

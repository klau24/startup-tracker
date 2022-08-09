import React, { useEffect, useState } from 'react'
import Widget from '../Widget'
import axios from 'axios'

let company = 'Yotascale'

// Figure out how to implement with grid
function CompanyTwitter(props) {
   const [twitterData, setTwitterData] = useState(null)

   useEffect(() => {
      var company = props.company

      if (company) {
         if (props.company.indexOf(' ') >= 0) {
            company = company.replace(' ', '+')
         }
         axios
            .get('/api/twitterData/'.concat(company))
            .then((res) => {
               setTwitterData(res.data)
            })
            .catch((err) => {
               console.log(err)
            })
      }
   }, [props.company])

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

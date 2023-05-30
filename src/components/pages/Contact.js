import React from 'react'
import ContentCard from '../ContentCard'
import Grid from '@mui/material/Grid'
import foaad from '../../images/foaad.png'
import mahdi from '../../images/mahdi.jpg'
import sadra from '../../images/sadra.jpg'
import nick from '../../images/nick.png'
import mansi from '../../images/mansi.JPG'
import emily from '../../images/emily.png'
import kenny from '../../images/kenny.jpg'

function Contact() {
   return (
      <>
         <Grid
            className="pt-4 pb-4 pl-12 pr-12"
            container
            justifyContent="center"
            spacing={3}
         >
            <Grid item xs={12} s={12} md={12}>
               <ContentCard
                  cardType="info"
                  data={{
                     image: mahdi,
                     title: 'Mahdi Rastad, Ph.D.',
                     position: 'Associate Professor of Finance',
                     email: 'mrastad@calpoly.edu',
                     description:
                        'Dr. Rastad’s research spans several areas of Finance and Economics, including corporate finance, pension funds, applied econometrics, industrial organization and behavioral economics. He has recently worked on capital structure decision of corporations, asset allocation of public pension funds, a theory for country cartels and interactions of emotions and economics decision-making.',
                     description2:
                        'Mahdi holds a Ph.D. in Economics and M.S. in Finance from University of Illinois. He received Paul W. Boltz Research Fellowship, Beckman Institute Research Fellowship where he was a research fellow at the University of Illinois. He taught Corporate Finance, Merger and Acquisition and Fixed Income Portfolio as well as courses in Statistics and Economics.  He was placed on the List of Teachers Ranked as Excellent by their students several times at University of Illinois.',
                  }}
                  isGraph={0}
               />
            </Grid>
            <Grid item xs={12} s={12} md={12}>
               <ContentCard
                  cardType="info"
                  data={{
                     image: sadra,
                     title: 'Sadra Amiri-Moghadam, Ph.D',
                     position:
                        'JPMorgan Chase & Co. Machine Learning Engineer, VP',
                     email: 'sadra.amiri@gmail.com',
                     description: '',
                  }}
                  isGraph={0}
               />
            </Grid>
            <Grid item xs={12} s={12} md={12}>
               <ContentCard
                  cardType="info"
                  data={{
                     image: foaad,
                     title: 'Foaad Khosmood, Ph.D. فواد خوشمود',
                     position:
                        'Forbes Endowed Professor of Computer Engineering',
                     email: 'foaad@calpoly.edu',
                     description:
                        'Foaad Khosmood (he/him Persian: فواد خوشمود) is Forbes Endowed Professor of Computer Engineering at California Polytechnic State University (Cal Poly) and research director at Institute for Advanced Technology & Public Policy. Foaad holds a Ph.D. in Computer Science from the University of California Santa Cruz. His dissertation work was on "Computational Style Processing".',
                     description2:
                        "A distinguished scholarship award winner, Foaad's research interests include natural language processing (NLP), artificial intelligence, digital government, interactive entertainment, game AI and game jams. He is co-founder and past president of Global Game Jam, Inc. where he was responsible for organizing the world's largest game creation activity (120+ countries). Foaad served as general chair for FDG 2019.",
                  }}
                  isGraph={0}
               />
            </Grid>
            <Grid item xs={12} s={12} md={12}>
               <ContentCard
                  cardType="info"
                  data={{
                     image: emily,
                     title: 'Emily Gavrilenko',
                     position: 'Computer Science Graduate Student',
                     email: 'egavrile@calpoly.edu',
                     description: '',
                  }}
                  isGraph={0}
               />
            </Grid>
            <Grid item xs={12} s={12} md={12}>
               <ContentCard
                  cardType="info"
                  data={{
                     image: nick,
                     title: 'Nicholas Hausman',
                     position: 'Computer Science Student, Data Science Minor',
                     email: 'nrhausma@calpoly.edu',
                     description:
                        'Nick is a 4th year student at Cal Poly studying Computer and Data Science. He is interested in deep learning, natural language processing, finance, and gaming.',
                  }}
                  isGraph={0}
               />
            </Grid>
            <Grid item xs={12} s={12} md={12}>
               <ContentCard
                  cardType="info"
                  data={{
                     image: mansi,
                     title: 'Mansi Achuthan',
                     position: 'Computer Science Student, Data Science Minor',
                     email: 'machutha@calpoly.edu',
                     description:
                        'Mansi is a 4th year student at Cal Poly studying Computer Science, minoring in Data Science and Statistics. She is interested in distributed systems and deep learning. In her free time, she likes to dance and make mashups of her favorite songs.',
                  }}
                  isGraph={0}
               />
            </Grid>
            <Grid item xs={12} s={12} md={12}>
               <ContentCard
                  cardType="info"
                  data={{
                     image: kenny,
                     title: 'Kenny Lau',
                     position: 'Computer Science Graduate Student',
                     email: 'klau24@calpoly.edu',
                     description:
                        'Kenny is a 5th year computer science graduate student at Cal Poly and a developer of the startup-tracker website. He is interested in natural language processing, knowledge graphs, and deep learning. On his free time, he likes to workout, cook, read, and play with his cats Georgia and Zoro.',
                  }}
                  isGraph={0}
               />
            </Grid>
         </Grid>
      </>
   )
}

export default Contact

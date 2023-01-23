# startup-tracker Backend Endpoints

## Existing Routes

#### Applies user selected filters and gets the top 25% of companies

GET `/api/screening/:filters`

** This endpoint needs refactoring. Pretty messy right now. **

Example call: `/api/screening/Followers%20Count,Company%20Tweets`

```
{
  "0": "AllSeated",
  "1": "BeeFlow",
  "2": "Genomatica",
  "3": "Advantia Health",
  "4": "Kyte (Information Services)",
  "5": "Metadata (Media and Information Services)"
}
```

#### Gets the company's feature during a specified time frame

`GET /api/:company/:time/:feature`

Example call: `/api/Ducalis/weekly/activity`

```
{
  "2022-06-27": {
    "company_tweets": 0,
    "users": 2,
    "tweet_metrics": {
      "company": {
        "like_count": 0,
        "quote_count": 0,
        "retweet_count": 0,
        "reply_count": 0
      },
      "other_users": {
        "retweet_count": 4,
        "quote_count": 0,
        "like_count": 9,
        "reply_count": 1
      }
    },
    "user_tweets": 2
  },
  ...
}
```

##### Get aggregate of companies from `1. Supported Companies` document in `company_data` collection

`GET /api/companies`

```
{
  "0": "OpenExchange",
  "1": "Metadata (Media and Information Services)",
  "2": "ZeroStorefront",
  "3": "Elevate Brands",
  "4": "Kasa Living",
  "5": "Strike Graph",
  "6": "Seel (CommercialProfessional Insurance)",
  "7": "AllSeated",
  "8": "Experic",
  "9": "Good Mylk Co.",
  "10": "OnSite Waste Technologies",
  "11": "Kyte (Information Services)",
  "12": "Genomatica",
  "13": "Xpansiv",
  "14": "Sweet Flower",
  "15": "Emergence Healthcare Group",
  "16": "BeeFlow",
  "17": "Advantia Health",
  "18": "Utobo",
  "19": "Panhwar Jet",
  "20": "Wheels"
}
```

#### Get twitter data for specified company

`GET /api/:company/companyTwitterData`

Example call: `/api/Ducalis/companyTwitterData`

```
{
  "2022-07-18": {
    "listed_count": 0,
    "followers_count": 39,
    "following_count": 266,
    "tweet_count": 102
  },
  "2022-08-15": {
    "following_count": 269,
    "followers_count": 39,
    "tweet_count": 102,
    "listed_count": 0
  },
  "2022-08-22": {
    "listed_count": 0,
    "tweet_count": 102,
    "following_count": 269,
    "followers_count": 39
  },
  ...
}
```

import request from 'request'

const reviewOption = (
  appKey,
  accessToken,
  page,
  pageSize
) => {
  return (
    {
      method: 'GET',
      url: `https://api.yotpo.com/v1/apps/${appKey}/reviews`,
      qs: {
        utoken: accessToken,
        page: page,
        count: pageSize,
      },
      json: true
    }
  )
}

export const getAccessToken = ({ appKey, appSecret, page, pageSize }) => {
  const options = {
    method: 'POST',
    url: `https://api.yotpo.com/oauth/token`,
    json: {
      client_id: appKey,
      client_secret: appSecret,
      grant_type: 'client_credentials',
    },
  }

  return new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (error) reject(error)

      resolve(body.access_token)
    })
  })
}

export const metaData = ({ appKey, accessToken, reviewId }) => {
  const options = {
    method: 'GET',
    url: `https://api.yotpo.com/v1/apps/${appKey}/reviews/${reviewId}/metadata`,
    qs: {
      utoken: accessToken
    },
    json: true
  }

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) reject(error)
      resolve(body.response)
    })
  })

}

const getAllReviewsWithMeta = async ({ appKey, accessToken, page, pageSize }) => {
  const reviews = await allReviews({ appKey, accessToken, page, pageSize })
  const mergedReviews = await Promise.all(reviews.map(async review => {
    const reviewId = review.id
    const reviewMeta = await metaData({appKey, accessToken, reviewId})
    return (
      {
        ...review,
        ...{ meta : reviewMeta.payload}
      }
    )
  }))
  return mergedReviews
}

export const allReviewsWithMeta = ({ appKey, accessToken, page, pageSize }) => {
  return new Promise((resolve, reject) => {
    const reviewsWithMeta = getAllReviewsWithMeta({ appKey, accessToken, page, pageSize })
    resolve(reviewsWithMeta)
  })
}


export const allReviews = ({ appKey, accessToken, page, pageSize }) => (
  new Promise((resolve, reject) => {
    request(reviewOption(appKey, accessToken, page, pageSize), (error, response, body) => {
      if (error) reject(error)
      resolve(body.reviews)
    })
  })
)

export const allBottomlines = ({ appKey, page, pageSize }) => {
  const options = {
    method: 'GET',
    url: `https://api.yotpo.com/v1/apps/${appKey}/bottom_lines`,
    qs: {
      page: page,
      count: pageSize,
    },
    json: true,
  }

  return new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (error) reject(error)

      resolve(body.response.bottomlines)
    })
  })
}

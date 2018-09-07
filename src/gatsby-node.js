import createNodeHelpers from 'gatsby-node-helpers'
import fetchData from './fetch'

const nodeHelpers = createNodeHelpers({ typePrefix: 'Yotpo' })
const { createNodeFactory, generateNodeId } = nodeHelpers

export const sourceNodes = async ({ boundActionCreators: { createNode } }, pluginOptions) => {
  if(!pluginOptions.appKey) {
    console.log('\nMake sure options has appKey');
    process.exit(1);
  }

  if(!pluginOptions.appSecret) {
    console.log('\nMake sure options has appSecret');
    process.exit(1);
  }

  const { reviews } = await fetchData({
    appKey: pluginOptions.appKey,
    appSecret: pluginOptions.appSecret
  })

  await Promise.all(
    reviews.map(async review => {
      const type = review.product != null ? 'ProductReview' : 'SiteReview';
      const Node = createNodeFactory(type, async node => {
        node.dataString = JSON.stringify(node.data)

        return node
      })

      const node = await Node(review)
      createNode(node)
    }),
  )

  return
};

var request = require('request');
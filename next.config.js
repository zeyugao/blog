// const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const withTM = require('next-transpile-modules')([
  'static-tweets',
  'mdast-util-to-string',
  'hast-util-sanitize',
  'p-map',
  'aggregate-error',
  'indent-string',
  'clean-stack'
]);

exports = withBundleAnalyzer({
  future: {
    webpack5: true
  }
})

exports = withTM(exports)

module.exports = exports

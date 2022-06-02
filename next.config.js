/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { 
        source: "/ticket.png", 
        destination: "/api/ticket",
        has: [
          { type: 'query', key: 'userId' }
        ]
      }
    ]
  }
}

module.exports = nextConfig

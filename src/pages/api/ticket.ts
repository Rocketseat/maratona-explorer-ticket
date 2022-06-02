import { NextApiRequest, NextApiResponse } from 'next'
import { getScreenshot } from '../../lib/chromium'

const isDev = !process.env.AWS_REGION
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  try {
    const query = req.query

    const userId = String(query.userId)

    if (!userId) {
      throw new Error('User is required');
    }

    const url = `${process.env.NEXT_PUBLIC_APP_URL}/ticket/${userId}/image`;

    if (isHtmlDebug) {
      return res.redirect(url)
    }

    const file = await getScreenshot(url, isDev)

    res.statusCode = 200

    res.setHeader('Content-Type', `image/png`)
    res.setHeader(
      'Cache-Control',
      'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
    )

    res.end(file)
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
    console.error(e)
  }
}
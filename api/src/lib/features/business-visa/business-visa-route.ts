import { Font } from 'canvacord'
import { Request, Response } from 'express'
import { join } from 'node:path'
import { GenerateBusinessVisaImage } from './generate-business-visa-image'

export function businessVisaRoute({ cwd }: { cwd: string }) {
  const fontRoot = join(cwd, 'assets/fonts')
  const imageRoot = join(cwd, 'assets/images')

  Font.loadDefault()
  Font.fromFileSync(join(fontRoot, 'PlusJakartaSans/PlusJakartaSans-Bold.ttf'), 'PlusJakartaSans Bold')
  Font.fromFileSync(join(fontRoot, 'PlusJakartaSans/PlusJakartaSans-Regular.ttf'), 'PlusJakartaSans Regular')

  return async (req: Request, res: Response) => {
    // TODO: Load background from filesystem
    // const background = await loadImage(join(imageRoot, 'business-visa-background.png'))
    const background = 'https://i.imgur.com/dTPX7au.png'
    const query = req.query as {
      status: string
      earnings: string
      name: string
    }
    if (!query.status || !query.earnings || !query.name) {
      res.status(400).send('Missing required query parameters')
      return
    }

    const imageBuilder = new GenerateBusinessVisaImage({
      width: 1024,
      height: 1024,
      earnings: query.earnings,
      status: query.status,
      name: query.name,
      background,
    })

    const image = await imageBuilder.build({ format: 'png' })

    // set headers
    res.setHeader('Content-Type', 'pubkey-profile/png')
    res.setHeader('Cache-Control', 'no-store no-cache must-revalidate private max-age=0 s-maxage=0 proxy-revalidate')

    // send pubkey-profile
    res.send(image)
  }
}

import { Font } from 'canvacord'
import { Request, Response } from 'express'
import { join } from 'node:path'
import { GeneratePubKeyProfileImage } from './generate-pub-key-profile-image'

export function pubkeyProfileRoute({ cwd }: { cwd: string }) {
  const fontRoot = join(cwd, 'assets/fonts')

  Font.loadDefault()
  Font.fromFileSync(join(fontRoot, 'BalooBhai2/BalooBhai2-ExtraBold.ttf'), 'BalooBhai2 ExtraBold')
  Font.fromFileSync(join(fontRoot, 'BalooBhai2/BalooBhai2-Bold.ttf'), 'BalooBhai2 Bold')
  Font.fromFileSync(join(fontRoot, 'BalooBhai2/BalooBhai2-Medium.ttf'), 'BalooBhai2 Medium')
  Font.fromFileSync(join(fontRoot, 'BalooBhai2/BalooBhai2-Regular.ttf'), 'BalooBhai2 Regular')
  Font.fromFileSync(join(fontRoot, 'BalooBhai2/BalooBhai2-SemiBold.ttf'), 'BalooBhai2 SemiBold')

  return async (req: Request, res: Response) => {
    const query = req.query as {
      avatarUrl?: string
      footer?: string
      header?: string
      logoUrl?: string
      message?: string
      username?: string
    }

    const imageBuilder = new GeneratePubKeyProfileImage({
      width: 1024,
      height: 1024,
      message: query.message,
      avatarUrl: query.avatarUrl,
      footer: query.footer,
      header: query.header,
      logoUrl: query.logoUrl,
      username: query.username,
    })

    const image = await imageBuilder.build({ format: 'png' })

    // set headers
    res.setHeader('Content-Type', 'pubkey-profile/png')
    res.setHeader('Cache-Control', 'no-store no-cache must-revalidate private max-age=0 s-maxage=0 proxy-revalidate')

    // send pubkey-profile
    res.send(image)
  }
}

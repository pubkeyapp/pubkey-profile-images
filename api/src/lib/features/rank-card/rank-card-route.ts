import { BuiltInGraphemeProvider, Font, RankCardBuilder } from 'canvacord'
import { Request, Response } from 'express'
import { join } from 'node:path'

export function rankCardRoute({ cwd }: { cwd: string }) {
  const fontRoot = join(cwd, 'assets/fonts')

  Font.loadDefault()
  Font.fromFileSync(join(fontRoot, 'BalooBhai2/BalooBhai2-ExtraBold.ttf'), 'BalooBhai2-ExtraBold')
  Font.fromFileSync(join(fontRoot, 'BalooBhai2/BalooBhai2-Bold.ttf'), 'BalooBhai2-Bold')
  Font.fromFileSync(join(fontRoot, 'BalooBhai2/BalooBhai2-Medium.ttf'), 'BalooBhai2-Medium')
  Font.fromFileSync(join(fontRoot, 'BalooBhai2/BalooBhai2-Regular.ttf'), 'BalooBhai2-Regular')
  Font.fromFileSync(join(fontRoot, 'BalooBhai2/BalooBhai2-SemiBold.ttf'), 'BalooBhai2-SemiBold')

  return async (req: Request, res: Response) => {
    const query = req.query as {
      avatarUrl?: string
      footer?: string
      header?: string
      logoUrl?: string
      message?: string
      name?: string
      username?: string
    }

    const card = new RankCardBuilder()
      .setDisplayName(query.name ?? 'Wumpus 😍')
      .setUsername(query.username ?? '@wumpus')
      .setAvatar(`${query.avatarUrl ?? 'https://cdn.discordapp.com/embed/avatars/0.png?size=256'}`)
      // .setFonts({
      //   progress: { xp: { value: '2' } },
      //   username: { name: 'BalooBhai2-ExtraBold', handle: 'BalooBhai2-Bold' },
      // })
      .setCurrentXP(300)
      .setRequiredXP(600)
      .setProgressCalculator(() => {
        return Math.floor(Math.random() * 100)
      })
      .setLevel(2)
      .setRank(5)
      .setOverlay(90)
      .setBackground('#23272a')
      // .setBackground(`${__dirname}/minecraft.png`)
      // .setStatus()
      .setGraphemeProvider(BuiltInGraphemeProvider.FluentEmojiFlat)

    const image = await card.build({ format: 'png' })

    // set headers
    res.setHeader('Content-Type', 'pubkey-profile/png')
    res.setHeader('Cache-Control', 'no-store no-cache must-revalidate private max-age=0 s-maxage=0 proxy-revalidate')

    // send pubkey-profile
    res.send(image)
  }
}

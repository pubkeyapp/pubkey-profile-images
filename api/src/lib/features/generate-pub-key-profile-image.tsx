/** @jsx JSX.createElement */
/** @jsxFrag JSX.Fragment */
import { Builder, JSX } from 'canvacord'

interface Props {
  message: string
  username: string
  footer: string
  header: string
  avatarUrl: string
  logoUrl: string
}

export interface GenerateDynamicImageOptions {
  width: number
  height: number
  message?: string
  footer?: string
  header?: string
  username?: string
  avatarUrl?: string
  logoUrl?: string
}
export class GeneratePubKeyProfileImage extends Builder<Props> {
  constructor(props: GenerateDynamicImageOptions) {
    // set width and height
    super(props.width, props.height)
    const issuedAt = new Date().toISOString().split('T')[0]
    // 30 days from now
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    // initialize props
    this.bootstrap({
      message: props.message ?? `256 Points`,
      avatarUrl: props.avatarUrl ?? 'https://avatars.githubusercontent.com/u/36491?v=4',
      logoUrl:
        props.logoUrl ?? 'https://raw.githubusercontent.com/pubkeyapp/pubkey-brand/main/logo/logo-white-txt400h.png',
      username: props.username ?? 'beeman',
      footer: props.footer ?? `Issued at: ${issuedAt} Expires at: ${expiresAt}`,
      header: props.header ?? `PubKey Profile`,
    })
  }

  async render(): Promise<JSX.Element> {
    return (
      <TemplateRender
        avatarUrl={this.options.get('avatarUrl')}
        logoUrl={this.options.get('logoUrl')}
        footer={this.options.get('footer')}
        header={this.options.get('header')}
        message={this.options.get('message')}
        username={this.options.get('username')}
      />
    )
  }
}

function TemplateRender({
  avatarUrl,
  logoUrl,
  footer,
  header,
  message,
  username,
}: {
  avatarUrl: string
  logoUrl: string
  footer: string
  header: string
  message: string
  username: string
}) {
  return (
    <div
      className="h-full w-full flex flex-col justify-between bg-gray-900 rounded-[4]  text-white text-2xl"
      style={{ fontFamily: 'BalooBhai2 Regular' }}
    >
      <TemplateHeader logoUrl={logoUrl} header={header} />
      <TemplateMain avatarUrl={avatarUrl} message={message} username={username} />

      <TemplateFooter footer={footer} />
    </div>
  )
}

function TemplateMain({ avatarUrl, message, username }: { avatarUrl: string; message: string; username: string }) {
  const usernameSize = username.length > 12 ? 'text-[64px]' : 'text-[92px]'
  return (
    <div className="flex flex-col flex-grow px-16">
      <div className="flex flex-col justify-between flex-grow bg-gray-800 rounded-[4]">
        <div className="flex flex-col items-center justify-center pt-24 ">
          <img src={avatarUrl} alt="" className="flex h-[50] w-[50] rounded-xl" />
          <div className={`mt-8 flex ${usernameSize}`} style={{ fontFamily: 'BalooBhai2 ExtraBold' }}>
            {username}
          </div>
        </div>
        <div
          style={{ fontFamily: 'BalooBhai2 SemiBold' }}
          className="flex flex-grow  text-[92px] w-full items-center justify-center text-gray-400 mb-4"
        >
          {message}
        </div>
      </div>
    </div>
  )
}

function TemplateHeader({ logoUrl, header }: { logoUrl: string; header: string }) {
  return (
    <div className="px-16 text-4xl flex h-[32]" style={{ fontFamily: 'BalooBhai2 ExtraBold' }}>
      <div className="flex w-full items-center justify-between">
        <div>
          <img src={logoUrl} alt="" className="flex h-[16]" />
        </div>
        <div>{header}</div>
      </div>
    </div>
  )
}

function TemplateFooter({ footer }: { footer?: string }) {
  return (
    <div className="px-16 flex  text-2xl h-[32]" style={{ fontFamily: 'BalooBhai2 Medium' }}>
      <div className="flex w-full items-center justify-center">
        <div className="flex text-gray-400">{footer}</div>
      </div>
    </div>
  )
}

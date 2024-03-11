/** @jsx JSX.createElement */
/** @jsxFrag JSX.Fragment */
import { Builder, JSX } from 'canvacord'

interface Props {
  status: string
  earnings: string
  name: string
  background: string
}

export interface GenerateDynamicImageOptions {
  width: number
  height: number
  status: string
  earnings: string
  name: string
  background: string
}
export class GenerateBusinessVisaImage extends Builder<Props> {
  constructor(props: GenerateDynamicImageOptions) {
    // set width and height
    super(props.width, props.height)

    // initialize props
    this.bootstrap({
      earnings: props.earnings,
      status: props.status,
      name: props.name,
      background: props.background,
    })
  }

  async render(): Promise<JSX.Element> {
    return (
      <TemplateRender
        status={this.options.get('status')}
        earnings={this.options.get('earnings')}
        name={this.options.get('name')}
        background={this.options.get('background')}
      />
    )
  }
}

function TemplateRender({
  background,
  status,
  earnings,
  name,
}: {
  background: string
  status: string
  earnings: string
  name: string
}) {
  return (
    <div>
      <div
        style={{
          height: '1024px',
          width: '1024px',
          display: 'flex',
          fontFamily: `PlusJakartaSans-Regular`,
          position: 'relative',
          backgroundImage: `url(${background})`,
          backgroundSize: '100% 100%',
        }}
      >
        <p className="absolute text-xl top-[562px] left-[448px] max-w-[380px]">{name}</p>
        <p className="absolute text-lg top-[678px] left-[448px]">{status}</p>
        <p className="absolute text-lg top-[786px] left-[448px]">{earnings}</p>
      </div>
    </div>
  )
}

export interface PubKeyProfilePayload {
  avatarUrl?: string
  logoUrl?: string
  username?: string
  header?: string
  footer?: string
  message?: string
}

export const profiles: PubKeyProfilePayload[] = [
  {
    username: 'beeman',
    avatarUrl: 'https://avatars.githubusercontent.com/u/36491?v=4',
    message: '',
    logoUrl: '',
    footer: '',
    header: '',
  },
  {
    username: 'derlys',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1705589278686707712/FCAVjkWZ_400x400.jpg',
    message: '1000 Points',
    logoUrl: '',
    footer: '',
    header: '',
  },
  {
    username: 'sundeep',
    avatarUrl: 'https://pbs.twimg.com/media/GIARAcAbAAEEUaV?format=png&name=small',
    message: '512 Points',
    logoUrl: '',
    footer: '',
    header: '',
  },
  {
    username: 'deanmachine',
    header: "Dean's List",
    avatarUrl: 'https://cdn.discordapp.com/avatars/454357166485143554/0e4ef1e17ac1278f06e2d2fd29393550.png?size=512',
    logoUrl: 'https://avatars.githubusercontent.com/u/137821488?v=4',
    message: 'Citizen',
    footer: 'Granted for being a top contributor to the community.',
  },
]

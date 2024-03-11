import { AspectRatio, Button, Flex, Grid, Group, Image, Paper, rem, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiDebugModal, UiStack } from '@pubkey-ui/core'
import { useEffect, useState } from 'react'
import { PubKeyProfilePayload } from './pubkey-profile-data-access'

export function PubkeyProfileUiLayout({
  profiles,
  url,
  setParams,
}: {
  profiles: PubKeyProfilePayload[]
  url: string
  setParams: (params: string) => void
}) {
  const [profile, setProfile] = useState<PubKeyProfilePayload | undefined>(undefined)
  return (
    <Flex direction="column" align="stretch" justify="center" h="calc(100vh - 100px)" maw={1500} mx="auto">
      <Paper withBorder radius="md" shadow="lg">
        <Grid h="100%" gutter={0}>
          <Grid.Col span={8} p="md">
            <PubKeyProfileUiImagePreview url={url} />
          </Grid.Col>
          <Grid.Col span={4} py="md" pr="md">
            <UiStack>
              <PubKeyProfileUiForm profile={profile} setParams={setParams} />
              <Group justify="center">
                {profiles.map((profile, index) => (
                  <Button variant="light" key={index} onClick={() => setProfile(profile)}>
                    {profile.username}
                  </Button>
                ))}
                <UiDebugModal data={{ url }} />
              </Group>
            </UiStack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Flex>
  )
}

export function PubKeyProfileUiForm({
  profile,
  setParams,
}: {
  profile?: PubKeyProfilePayload
  setParams: (params: string) => void
}) {
  function submit(profile?: PubKeyProfilePayload) {
    const values = (profile ?? form.getTransformedValues()) as Record<string, string>
    const keys = Object.keys(values).filter((key) => values[key])
    if (!keys.length) {
      return
    }
    const valueMap = keys.map((key) => `${key}=${values[key]}`)
    setParams(valueMap.join('&'))
  }
  const form = useForm<PubKeyProfilePayload>({
    initialValues: {
      avatarUrl: '',
      footer: '',
      header: '',
      logoUrl: '',
      message: '',
      username: '',
    },
  })
  useEffect(() => {
    if (profile) {
      form.setValues(profile)
      submit(profile)
    }
  }, [profile])
  return (
    <form onSubmit={form.onSubmit(submit)}>
      <UiStack>
        <TextInput
          minLength={3}
          maxLength={20}
          size="lg"
          label="Username"
          placeholder="Text displayed below the avatar"
          {...form.getInputProps('username')}
        />
        <TextInput
          size="lg"
          label="Message"
          placeholder="Text displayed below the username"
          {...form.getInputProps('message')}
        />
        <TextInput
          size="lg"
          label="Header"
          placeholder="Text displayed at the top right of the image"
          {...form.getInputProps('header')}
        />
        <TextInput
          size="lg"
          label="Footer"
          placeholder="Text displayed at the bottom of the image"
          {...form.getInputProps('footer')}
        />
        <TextInput
          size="lg"
          label="Avatar URL"
          placeholder="URL to the image to display as the avatar"
          {...form.getInputProps('avatarUrl')}
        />
        <TextInput
          size="lg"
          label="Logo URL"
          placeholder="URL to the image to display as the logo"
          {...form.getInputProps('logoUrl')}
        />
        <Button size="xl" type="submit">
          Generate
        </Button>
      </UiStack>
    </form>
  )
}

export function PubKeyProfileUiImagePreview({ url }: { url: string }) {
  return (
    <AspectRatio ratio={1} style={{ flex: `0 0 ${rem(100)}`, flexGrow: 1 }}>
      <Image src={url} alt="Generated Image" />
    </AspectRatio>
  )
}

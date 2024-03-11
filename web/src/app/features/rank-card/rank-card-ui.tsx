import { AspectRatio, Button, Flex, Grid, Group, Image, Paper, rem, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiDebugModal, UiStack } from '@pubkey-ui/core'
import { useEffect, useState } from 'react'
import { RankCardPayload } from './rank-card-data-access'

export function RankCardUiLayout({
  profiles,
  url,
  setParams,
}: {
  profiles: RankCardPayload[]
  url: string
  setParams: (params: string) => void
}) {
  const [profile, setProfile] = useState<RankCardPayload | undefined>(profiles[0])
  return (
    <Flex direction="column" align="stretch" justify="center" h="calc(100vh - 100px)" maw={1500} mx="auto">
      <Paper withBorder radius="md" shadow="lg">
        <Grid h="100%" gutter={0}>
          <Grid.Col span={8} p="md">
            <RankCardUiImagePreview url={url} />
          </Grid.Col>
          <Grid.Col span={4} py="md" pr="md">
            <UiStack>
              <RankCardUiForm profile={profile} setParams={setParams} />
              <Group justify="center">
                {profiles.map((profile, index) => (
                  <Button variant="light" key={index} onClick={() => setProfile(profile)}>
                    {profile.name}
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

export function RankCardUiForm({
  profile,
  setParams,
}: {
  profile?: RankCardPayload
  setParams: (params: string) => void
}) {
  function submit(profile?: RankCardPayload) {
    const values = (profile ?? form.getTransformedValues()) as Record<string, string>
    const keys = Object.keys(values).filter((key) => values[key])
    if (!keys.length) {
      return
    }
    const valueMap = keys.map((key) => `${key}=${values[key]}`)
    setParams(valueMap.join('&'))
  }
  const form = useForm<RankCardPayload>({
    initialValues: {
      status: '',
      earnings: '',
      name: '',
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
          label="Name"
          placeholder="Text displayed in the name field"
          {...form.getInputProps('name')}
        />
        <TextInput
          size="lg"
          label="Earnings"
          placeholder="Text displayed in the earnings field"
          {...form.getInputProps('earnings')}
        />

        <TextInput
          size="lg"
          label="Status"
          placeholder="Text displayed in the status field"
          {...form.getInputProps('status')}
        />
        <Button size="xl" type="submit">
          Generate
        </Button>
      </UiStack>
    </form>
  )
}

export function RankCardUiImagePreview({ url }: { url: string }) {
  return (
    <AspectRatio ratio={10 / 3} style={{ flex: `0 0 ${rem(100)}`, flexGrow: 1 }}>
      <Image src={url} alt="Generated Image" />
    </AspectRatio>
  )
}

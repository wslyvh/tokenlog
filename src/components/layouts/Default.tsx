import { ThemeProvider } from '@primer/components'
import Avatar from '@primer/components/lib/Avatar'
import Header from '@primer/components/lib/Header'
import StyledOcticon from '@primer/components/lib/StyledOcticon'
import { HomeIcon } from '@primer/octicons-react'
import React, { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export function Default(props: LayoutProps) {
  return (
    <ThemeProvider>
      <div>
        <Header>
          <Header.Item full>
            <Header.Link href="/" fontSize={2}>
              <StyledOcticon icon={HomeIcon} size={16} mr={2} />
              <span>Tokenlog</span>
            </Header.Link>
          </Header.Item>
          <Header.Item mr={0}>
            <Avatar
              src="https://github.com/octocat.png"
              size={20}
              square
              alt="@octocat"
            />
          </Header.Item>
        </Header>

        <div>
          <div>{props.children}</div>
        </div>

        <footer className="mt-5 text-center">
          <a
            href="https://twitter.com/wslyvh"
            className="text-small color-text-tertiary"
          >
            @wslyvh
          </a>
          <span className="ml-2 mr-2">|</span>
          <a
            href="https://github.com/wslyvh/tokenlog"
            className="text-small color-text-tertiary"
          >
            Github
          </a>
        </footer>
      </div>
    </ThemeProvider>
  )
}

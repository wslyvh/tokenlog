import { ThemeProvider } from '@primer/components'
import Header from '@primer/components/lib/Header'
import StyledOcticon from '@primer/components/lib/StyledOcticon'
import { HomeIcon } from '@primer/octicons-react'
import React, { ReactNode } from 'react'
import { Connect } from '../Connect'
import { Link } from '../elements/Link'
import css from './default.module.scss'

type Props = {
  children: ReactNode
}

export function Default(props: Props) {
  return (
    <ThemeProvider>
      <div>
        <header>
          <Header>
            <Header.Item full>
              <Link to="/">
                <StyledOcticon icon={HomeIcon} size={16} mr={2} />
                <span>Tokenlog</span>
              </Link>
            </Header.Item>
            <Header.Item mr={0}>
              <Connect />
            </Header.Item>
          </Header>
        </header>

        <main className={css['container']}>
          <div className={css['content']}>{props.children}</div>
        </main>

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

import { Avatar, ButtonInvisible, Dropdown, Flex } from '@primer/components'
import React from 'react'
import makeBlockie from 'ethereum-blockies-base64';
import { useWeb3 } from 'src/hooks/useWeb3'
import { ShortenAddress } from 'src/utils/format';

export function Connect() {
  const web3Context = useWeb3()

  if (web3Context.loading) {
    return null
  }

  if (web3Context.address) {
    return (
      <div>
        <Dropdown>
          <summary>
            <Flex alignItems='center' className='mt-2'>
              <Avatar className='mr-2'
                src={makeBlockie(web3Context.address)}
                size={20}
                alt={web3Context.address}
              />
              <span>{ShortenAddress(web3Context.address)}</span>
              <Dropdown.Caret />
            </Flex>
          </summary>
          <Dropdown.Menu direction='sw' className='mt-3'>
            <Dropdown.Item onClick={web3Context.disconnect}>Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
  return (
    <div>
      <ButtonInvisible css='' className='text-normal color-text-white border color-border-tertiary rounded px-2 py-1' onClick={web3Context.connect}>Connect</ButtonInvisible>
    </div>
  )
}

import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  repo: any
}

interface Params extends ParsedUrlQuery {
  org: string
  repo: string
}

export default function Repo(data: Props) {
  return (
    <div id="repo">
        Org / repo
    </div>
  )
}

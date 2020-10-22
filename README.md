[![Netlify Status](https://api.netlify.com/api/v1/badges/d3885dcb-8c9e-4e1a-88ad-29658cd376f0/deploy-status)](https://app.netlify.com/sites/tokenlog/deploys)
[![Build Status](https://travis-ci.org/wslyvh/tokenlog.svg?branch=master)](https://travis-ci.org/wslyvh/tokenlog)
[![codecov](https://codecov.io/gh/wslyvh/tokenlog/branch/master/graph/badge.svg?token=LTQZY64K6X)](undefined)


<img src="https://tokenlog.xyz/icon.png" alt="ETH Gas.watch" width="50"/> 

# Token-weighted Backlogs

Tokenlog is a governance tool to create token-weighted backlogs

It allows projects to continuously gather feedback from their token holders in order to help plan and prioritize their work.​ It allows token holders to actively signal which items matter to them rather than just vote on single proposals.

> A better way for projects to collaborate with their biggest supporters.

## Summary 
Tokenlog works on any Github repository and leaves your current workflow in place. Voting is either by a 1-token, 1-vote, or as by default through quadratic voting. Quadratic voting is a collective decision-making procedure where individuals allocate votes to express the degree of their preferences, rather than just the direction of their preferences. More details at [ETH Gas Station](https://ethgasstation.info/blog/quadratic-funding-in-a-nutshell/)

## Links
- Website https://tokenlog.xyz/
- Backlog https://tokenlog.xyz/wslyvh/tokenlog
- All Issues https://github.com/wslyvh/tokenlog/issues

## Documentation
Tokenlog works on any Github repository and follows Github's relative paths, e.g. `tokenlog.xyz/<org>/<repo>`. To allow voting, see the following Config section. 

## Config
Tokenlog tries to pull a configuration directly from your repository. This proofs ownership of the repo and doesn't require any curation or management. Just upload a `tokenlog.json` config to the root of your repository.

Example
```
{
    "org": "wslyvh",
    "repo": "tokenlog",
    "tokenAddress": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "labels": ["enhancement"]
}
```

- `tokenAddress` is the token that people are allowed to vote with
- `labels` is an optional list of Github labels that allows you to filter onwhich issues token holders can vote on 


## Contributing
Contributions are always welcome, no matter how large or small. If you've found a bug, have a suggestion, feature request or any other feedback, post them at https://github.com/wslyvh/tokenlog/issues/new

If you want to contribute to the codebase, open up an issue or pull-request so we can discuss on the best way to do so. 

If you want to help with our backlog, check out https://tokenlog.xyz/wslyvh/tokenlog

## Development 
`yarn start` or `npm run start`

Runs the app in the development mode. By default, it runs at [http://localhost:3000](http://localhost:3000).

`yarn test` or `npm run test`

Launches the test runner in the interactive watch mode.

`yarn build` or `npm run build`

Builds the app for production to the build folder.

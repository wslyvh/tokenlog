import { Header } from 'components/Header';
import { Loader } from 'components/Loader';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Web3Provider } from 'ethers/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { Footer } from 'components/Footer';
import { BetaBanner } from 'components/BetaBanner';

const Home = lazy(() => import('pages/Home'));
const Organization = lazy(() => import('pages/Organization'));
const Repository = lazy(() => import('pages/Repository'));
const Stats = lazy(() => import('pages/Stats'));
const Settings = lazy(() => import('pages/Settings'));

function getWeb3Provider(provider: any): Web3Provider {
  const web3Provider = new Web3Provider(provider);

  return web3Provider;
}

export function Default() {
  return (
    <div>
      <BetaBanner />
      <BrowserRouter>
        <Web3ReactProvider getLibrary={getWeb3Provider}>
          <Header />

          <Suspense fallback={<Loader />}>
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/:org">
                  <Organization />
                </Route>
                <Route exact path="/:org/:repo">
                  <Repository />
                </Route>
                <Route exact path="/:org/:repo/stats">
                  <Stats />
                </Route>
                <Route exact path="/:org/:repo/settings">
                  <Settings />
                </Route>
                <Redirect to="/" />
              </Switch>
            </div>
          </Suspense>

          <Footer />
        </Web3ReactProvider>
      </BrowserRouter>
    </div>
  );
}

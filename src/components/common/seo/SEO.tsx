import { useRepositoryContext } from 'context/RepoContext';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

export const SEO = () => {
  const context = useRepositoryContext();
  const [title, setTitle] = useState('Tokenlog · Token-weighted backlogs');
  const [description, setDescription] = useState(
    'Democratize your open-source software project. A better way for projects to collaborate with their biggest supporters.'
  );
  const [imageUrl, setImageUrl] = useState('https://tokenlog.xyz/icon.png');
  const [url, setUrl] = useState('https://tokenlog.xyz/');

  useEffect(() => {
    async function asyncEffect() {
      if (context.settings) {
        if (context.org && context.repo) setTitle(`${context.org}/${context.repo} · Tokenlog`);
        else if (context.org) {
          setTitle(`${context.org} · Tokenlog`);
        }

        if (context.org)
          setDescription(
            `Let ${context.org} know how to improve their product. Token-holders can vote and help prioritize their roadmap.`
          );

        if (context.settings.imageUrl) setImageUrl(context.settings.imageUrl);

        if (window.location.href) setUrl(window.location.href);
      }
    }

    asyncEffect();
  }, [context.org, context.repo, context.settings]);

  return (
    <Helmet title={title} htmlAttributes={{ lang: 'en' }}>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="image" content={imageUrl} />
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href="imageUrl" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />

      <meta name="twitter:card" content={'summary_large_image'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

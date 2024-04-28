// packages
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Head: React.FC<MetaProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default Head;

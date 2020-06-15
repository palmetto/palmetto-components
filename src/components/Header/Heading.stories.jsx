import React from 'react';
import Heading from './Heading.jsx';

export default {
  title: 'Heading',
  component: Heading,
};

export const all = () => (
  <div style={{ padding: '1rem' }}>
    <Heading as="h1" size="2xl">Heading 1</Heading>
  </div>
);
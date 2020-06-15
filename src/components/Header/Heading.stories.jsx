import React from 'react';
import Heading from './Heading.jsx';

export default {
  title: 'Heading',
  component: Heading,
};

export const all = () => (
  <div style={{ padding: '1rem' }}>
    <Heading as="h1" size="3xl">Heading 1</Heading>
    <Heading as="h2" size="2xl">Heading 2</Heading>
    <Heading as="h3" size="xl">Heading 3</Heading>
    <Heading as="h4" size="lg">Heading 4</Heading>
    <Heading as="h5" size="md">Heading 5</Heading>
  </div>
);
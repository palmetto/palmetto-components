import React from 'react';
import Heading from './Heading';

export default {
  title: 'Heading',
  parameters: {
    componentSubtitle: 'For page and section headings',
  },
  component: Heading,
};

export const AllHeadings = () => (
  <>
    <Heading as='h1'>H1 Heading Default Size</Heading>
    <Heading as='h2'>H2 Heading Default Size</Heading>
    <Heading as='h3'>H3 Heading Default Size</Heading>
    <Heading as='h4'>H4 Heading Default Size</Heading>
    <Heading as='h5'>H5 Heading Default Size</Heading>
    <Heading as='h6'>H6 Heading Default Size</Heading>
  </>
);

export const Sizes = () => (
  <>
    <Heading size='5xl'>Size 5xl</Heading>
    <Heading size='4xl'>Size 4xl</Heading>
    <Heading size='3xl'>Size 3xl</Heading>
    <Heading size='2xl'>Size 2xl</Heading>
    <Heading size='xl'>Size xl</Heading>
    <Heading size='lg'>Size lg</Heading>
    <Heading size='md'>Size md</Heading>
    <Heading size='sm'>Size sm</Heading>
    <Heading size='xs'>Size xs</Heading>
  </>
);

export const OverrideDefaultSize = () => (
  <>
    <Heading as='h1' size='xs'>
      H1 Heading with xs Size
    </Heading>
    <Heading as='h2' size='sm'>
      H2 Heading with sm Size
    </Heading>
    <Heading as='h3' size='md'>
      H3 Heading with md Size
    </Heading>
    <Heading as='h4' size='lg'>
      H4 Heading with lg Size
    </Heading>
    <Heading as='h5' size='xl'>
      H5 Heading with xl Size
    </Heading>
    <Heading as='h6' size='2xl'>
      H6 Heading with 2xl Size
    </Heading>
  </>
);

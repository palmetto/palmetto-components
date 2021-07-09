import React from 'react';
import { render, screen } from '@testing-library/react';
import DoDont from './DoDont';
import { Box } from '../components';

const LINK_TEXT = 'Click me!';

// const TEST_PROPS = {
//   doExample:
//     <Box as="ul"padding="0 0 0 lg">
//       <li>Ambassador</li>
//       <li>Ambassador Program</li>
//       <li>Palmetto Ambassador Program</li>
//       <li>Mapdwell</li>
//       <li>Palmetto App</li>
//     </Box>;
//   dontExample:
//     <Box as="ul"padding="0 0 0 lg">
//       <li>palmetto</li>
//       <li>palmetto ambassador</li>
//       <li>mapdwell</li>
//     </Box>
// };

describe('DoDont', () => {
  test("It renders the do's and don'ts on the page", () => {
    const { getByText } = render(
      <DoDont
        doTitle="Active Voice"
        doExample="Marti logged into the account."
        dontTitle="Passive Voice"
        dontExample="The account was logged into by Marti."
      >
        use an active voice
      </DoDont>,
    );

    expect(getByText('Active Voice')).toBeInTheDocument();
    expect(getByText('Marti logged into the account.')).toBeInTheDocument();
    expect(getByText('Passive Voice')).toBeInTheDocument();
    expect(getByText('Marti logged into the account.')).toBeInTheDocument();
    expect(getByText('use an active voice')).toBeInTheDocument();
  });

  test("It renders the do's on the page without don'ts", () => {
    const { getByText } = render(
      <DoDont doTitle="Active Voice" doExample="Marti logged into the account.">
        use an active voice
      </DoDont>,
    );

    expect(getByText('Active Voice')).toBeInTheDocument();
    expect(getByText('Marti logged into the account.')).toBeInTheDocument();
    expect(getByText('use an active voice')).toBeInTheDocument();
  });
});

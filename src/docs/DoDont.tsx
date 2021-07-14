/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { ReactNode } from 'react';
import { Box, Icon } from '../components';

export interface DoDontProps {
  children?: ReactNode;
  className?: string;
  doTitle?: ReactNode;
  doExample?: ReactNode;
  dontTitle?: ReactNode;
  dontExample?: ReactNode;
}

const DoDont: React.FC<DoDontProps> = ({
  children,
  className,
  doTitle,
  doExample,
  dontTitle,
  dontExample,
}) => (
  <Box
    direction={{ base: 'column', tablet: 'row' }}
    childGap={{ base: 'md', tablet: '2xl' }}
    className={className}
    margin="0 0 4xl 0"
  >
    {children && (
      <Box display="block" width={{ base: '100', tablet: '40' }}>
        {children}
      </Box>
    )}

    <Box display="block" width={{ base: '100', tablet: '60' }} childGap="lg">
      <Box background="primary-50" padding="md" childGap="xs" direction="row" radius="md">
        <Box style={{ flexShrink: 0 }}>
          <Icon name="c-check" color="primary-500" size="xl" />
        </Box>
        <Box display="block" childGap="sm">
          {doTitle && (
            <Box fontWeight="bold" fontSize="sm">
              {doTitle}
            </Box>
          )}
          <Box display="block" fontSize="lg">
            {doExample}
          </Box>
        </Box>
      </Box>

      {(dontTitle || dontExample) && (
        <Box background="danger-50" padding="md" childGap="xs" direction="row" radius="md">
          <Box style={{ flexShrink: 0 }}>
            <Icon name="c-remove" color="danger-500" size="xl" />
          </Box>
          <Box display="block" childGap="sm">
            {dontTitle && (
              <Box fontWeight="bold" fontSize="sm">
                {dontTitle}
              </Box>
            )}
            <Box display="block" fontSize="lg">
              {dontExample}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  </Box>
);

export default DoDont;

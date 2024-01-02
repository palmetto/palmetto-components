import React, { FC, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Placement as PlacementType } from '@popperjs/core';
import { Popover } from './Popover';
import { Button } from '../Button/Button';
import { Box } from '../Box/Box';
import { Heading } from '../Heading/Heading';
import { Icon, IconProps } from '../Icon/Icon';
import { useOpenClose } from '../../hooks/useOpenClose/useOpenClose';

export default {
  title: 'Components/Popover/Visual Regression Tests',
  component: Popover,
  parameters: {
    chromatic: { delay: 2000, pauseAnimationAtEnd: true },
  },
} as Meta;

export const Demo: Story = () => {
  const { isOpen: isPopoverOpen, handleToggle: togglePopover } = useOpenClose({
    defaultIsOpen: true,
  });
  const NavItem: FC<{ className?: string; iconName?: IconProps['name']; }> = ({
    children,
    className,
    iconName,
  }) => (
    <Box
      as="li"
      color="grey-500"
      style={{
        flexShrink: 0,
      }}
      className={className}
    >
      <Box direction="row" gap="md" alignItems="center">
        {iconName && (
          <Box color="grey-300" fontSize="lg">
            <Icon className="nav-item-icon" name={iconName} />
          </Box>
        )}
        <Box style={{ fontWeight: 500 }}>{children}</Box>
      </Box>
    </Box>
  );
  NavItem.defaultProps = {
    className: undefined,
    iconName: undefined,
  };
  const popoverContent = (
    <>
      <Box
        as="nav"
        fontSize="sm"
        className="main-nav"
        background="white"
        padding={{
          base: '3xl 0 0 0',
          desktop: '0',
        }}
        style={{
          flexShrink: 0,
        }}
      >
        <Box as="ul" gap="xs" padding="md md sm md">
          <Box direction="row" gap="sm" alignItems="center">
            <Box
              fontSize="xs"
              color="white"
              radius="sm"
              background="primary-light"
              padding="2xs"
            >
              JC
            </Box>
            <Box display="block" className="truncate">
              Johnny Cash
            </Box>
          </Box>
        </Box>
        <Box flex="auto" overflow="auto" padding="sm md lg md" gap="lg">
          <Box
            as="ul"
            gap="sm"
            style={{
              flexShrink: 0,
            }}
          >
            <NavItem iconName="contact">Contacts</NavItem>
            <NavItem iconName="chart-bar">Reports</NavItem>
            <NavItem iconName="list">Design Queue</NavItem>
            <NavItem iconName="book">Certifications</NavItem>
            <NavItem iconName="settings">Settings</NavItem>
          </Box>
          <Box
            gap="sm"
            padding="lg 0 0 0"
            borderWidth="xs 0 0 0"
            borderColor="grey-lighter"
            style={{ flexShrink: 0 }}
          >
            <Heading size="sm" as="h4" variant="grey">
              Favorites
            </Heading>
            <Box gap="xs">
              <Box fontSize="xs" color="grey">
                Favorite contacts or reports by clicking the star
              </Box>
            </Box>
          </Box>
          <Box
            gap="sm"
            padding="lg 0 0 0"
            borderWidth="xs 0 0 0"
            borderColor="grey-lighter"
            style={{ flex: '1 0 auto' }}
          >
            <Box as="ul" gap="sm">
              <NavItem iconName="c-question">Feedback</NavItem>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
  return (
    <div>
      <Popover
        content={popoverContent}
        isOpen={isPopoverOpen}
        placement="bottom-start"
        contentContainerProps={{
          padding: 'md',
          direction: 'column',
        }}
        withPortal
        portalTarget={document.body}
      >
        <Button onClick={togglePopover} variant="light" size="sm">
          Popover Menu &nbsp;
          <Icon name="menu" />
        </Button>
      </Popover>
    </div>
  );
};

export const Default: Story = () => {
  const { isOpen: isPopoverOpen, handleToggle: togglePopover } = useOpenClose({
    defaultIsOpen: true,
  });
  const popoverContent = <>Hello!</>;
  return (
    <div>
      <Popover
        content={popoverContent}
        isOpen={isPopoverOpen}
        placement="right"
        contentContainerProps={{
          padding: 'sm',
        }}
      >
        <Button onClick={togglePopover} variant="light">
          Toggle Popover
        </Button>
      </Popover>
    </div>
  );
};

export const Placement: Story = () => {
  const [isPopoverOpen, setPopoverOpen] = useState<Record<string, boolean>>({
    auto: true,
    'auto-start': true,
    'auto-end': true,
    top: true,
    bottom: true,
    right: true,
    left: true,
    'top-start': true,
    'top-end': true,
    'bottom-start': true,
    'bottom-end': true,
    'right-start': true,
    'right-end': true,
    'left-start': true,
    'left-end': true,
  });
  const handleOpenPopover = (key: string) => {
    setPopoverOpen({ ...isPopoverOpen, [key]: !isPopoverOpen[key] });
  };
  const positions: PlacementType[] = [
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'bottom',
    'right',
    'left',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
  ];
  return (
    <Box direction="row" gap="xs" width="100" wrap>
      {positions.map(position => (
        <Box
          height="100px"
          width="300px"
          alignItems="center"
          justifyContent="center"
          key={position}
        >
          <Popover
            content={<>{position}</>}
            isOpen={isPopoverOpen[position]}
            placement={position}
            contentContainerProps={{
              padding: 'sm',
              background: 'secondary',
              color: 'white',
            }}
          >
            <Button onClick={() => handleOpenPopover(position)} variant="light">
              {position}
            </Button>
          </Popover>
        </Box>
      ))}
    </Box>
  );
};

export const HideArrow: Story = () => {
  const {
    isOpen: isPopoverOpen,
    handleClose: closePopover,
    handleToggle: togglePopover,
  } = useOpenClose({
    defaultIsOpen: true,
  });
  const popoverContent = (
    <>
      <Box direction="column" gap="sm">
        <Heading>With no arrow</Heading>
        <p>I am floating in space</p>
      </Box>
    </>
  );
  return (
    <Box display="inline-block">
      <Popover
        content={popoverContent}
        isOpen={isPopoverOpen}
        placement="right-start"
        contentContainerProps={{
          padding: 'md',
          background: 'grey-lightest',
        }}
        withPortal
        portalTarget={document.body}
        onClickOutside={closePopover}
        hasArrow={false}
      >
        <Button onClick={togglePopover} variant="light">
          Toggle Popover
        </Button>
      </Popover>
    </Box>
  );
};

export const Offset: Story = () => {
  const { isOpen: isPopoverOpen, handleToggle: togglePopover } = useOpenClose({
    defaultIsOpen: true,
  });
  const popoverContent = (
    <>
      <Box direction="column" gap="sm">
        <Heading>Custom Offset</Heading>
        <p>Near, far, wherever your are...</p>
      </Box>
    </>
  );
  return (
    <>
      <Box display="inline-block">
        <Popover
          content={popoverContent}
          isOpen={isPopoverOpen}
          placement="right-start"
          contentContainerProps={{
            padding: 'md',
            background: 'grey-lightest',
          }}
          withPortal
          portalTarget={document.body}
          hasArrow={false}
          offsetFromTarget={20}
        >
          <Button onClick={togglePopover} variant="light">
            Toggle Popover
          </Button>
        </Popover>
      </Box>
    </>
  );
};

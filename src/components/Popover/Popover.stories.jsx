import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faBars,
  faCog,
  faChartBar,
  faListAlt,
  faBook,
  faMapMarked,
  faBox,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import Popover from './Popover';
import Button from '../Button/Button';
import Box from '../Box/Box';
import Heading from '../Heading/Heading';

export default {
  title: 'Components/Popover/ForChromatic',
  component: Popover,
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const Demo = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(true);
  const handleOpenPopover = () => { setPopoverOpen(!isPopoverOpen); };
  const NavItem = ({ children, className, iconName }) => (
    <Box
      as="li"
      color="grey-500"
      style={{
        flexShrink: 0,
      }}
      className={className}
    >
      <Box direction="row" childGap="md" alignItems="center">
        {iconName && (
          <Box color="grey-300">
            <FontAwesomeIcon className="nav-item-icon" size="lg" icon={iconName} />
          </Box>
        )}
        <Box style={{ fontWeight: 500 }}>{children}</Box>
      </Box>
    </Box>
  );
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
        <Box as="ul" childGap="xs" padding="md md sm md">
          <Box direction="row" childGap="sm" alignItems="center">
            <Box fontSize="xs" color="white" radius="sm" background="primary-light" padding="2xs">
              JC
            </Box>
            <Box display="block" className="truncate">
              Johnny Cash
            </Box>
          </Box>
        </Box>
        <Box flex="auto" overflow="auto" padding="sm md lg md" childGap="lg">
          <Box
            as="ul"
            childGap="sm"
            style={{
              flexShrink: 0,
            }}
          >
            <NavItem iconName={faAddressCard}>Contacts</NavItem>
            <NavItem iconName={faChartBar}>Reports</NavItem>
            <NavItem iconName={faListAlt}>Design Queue</NavItem>
            <NavItem iconName={faBook}>Certifications</NavItem>
            <NavItem iconName={faCog}>Settings</NavItem>
          </Box>
          <Box
            childGap="sm"
            padding="lg 0 0 0"
            borderWidth="xs 0 0 0"
            borderColor="grey-lighter"
            style={{ flexShrink: 0 }}
          >
            <Heading size="sm" as="h4" variant="grey">
              Favorites
            </Heading>
            <Box childGap="xs">
              <Box fontSize="xs" color="grey">
                Favorite contacts or reports by clicking the star
              </Box>
            </Box>
          </Box>
          <Box
            childGap="sm"
            padding="lg 0 0 0"
            borderWidth="xs 0 0 0"
            borderColor="grey-lighter"
            style={{ flex: '1 0 auto' }}
          >
            <Heading size="sm" as="h4" variant="grey">
              Palmetto Adminstration
            </Heading>
            <Box as="ul" childGap="sm">
              <NavItem iconName={faMapMarked}>Markets</NavItem>
              <NavItem iconName={faBox}>Products</NavItem>
            </Box>
          </Box>
          <Box
            childGap="sm"
            padding="lg 0 0 0"
            borderWidth="xs 0 0 0"
            borderColor="grey-lighter"
            style={{ flex: '1 0 auto' }}
          >
            <Box as="ul" childGap="sm">
              <NavItem iconName={faQuestionCircle}>Feedback</NavItem>
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
      >
        <Button onClick={handleOpenPopover} variant="light" size="sm">
          <FontAwesomeIcon icon={faBars} />
          &nbsp;
          Popover Menu
        </Button>
      </Popover>
    </div>
  );
};

export const Default = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(true);
  const handleOpenPopover = () => { setPopoverOpen(!isPopoverOpen); };
  const popoverContent = (<>Hello!</>);
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
        <Button onClick={handleOpenPopover} variant="light">Toggle Popover</Button>
      </Popover>
    </div>
  );
};

export const Placement = () => {
  const [isPopoverOpen, setPopoverOpen] = useState({
    'auto': true,
    'auto-start': true,
    'auto-end': true,
    'top': true,
    'bottom': true,
    'right': true,
    'left': true,
    'top-start': true,
    'top-end': true,
    'bottom-start': true,
    'bottom-end': true,
    'right-start': true,
    'right-end': true,
    'left-start': true,
    'left-end': true,
  });
  const handleOpenPopover = (key) => {
    setPopoverOpen({ ...isPopoverOpen, [key]: !isPopoverOpen[key] });
  };
  const positions = [
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
    <Box direction="row" childGap="md" wrap>
      {positions.map(position => (
        <Box
          height="100px"
          width="300px"
          padding="5xl"
          display="inline-block"
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
            <Button
              onClick={() => handleOpenPopover(position)}
              variant="light"
            >
              {position}
            </Button>
          </Popover>
        </Box>
      ))}
    </Box>
  );
};

export const HideArrow = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const handleTogglePopover = () => { setPopoverOpen(!isPopoverOpen); };
  const handleInputChange = (event) => { setInputValue(event.target.value); };
  const popoverContent = (
    <>
      <Box direction="column" childGap="sm">
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
          background: 'grey-lightest'
        }}
        withPortal
        onClickOutside={() => setPopoverOpen(false)}
        hasArrow={false}
      >
        <Button
          onClick={handleTogglePopover}
          variant="light"
        >
          Toggle Popover
        </Button>
      </Popover>
    </Box>
  );
}

export const Offset = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(true);
  const [offset, setOffset] = useState(12);
  const handleTogglePopoverNear = () => { setPopoverOpen(!isPopoverOpen); };
  const handleInputChange = (event) => { setInputValue(event.target.value); };
  const popoverContent = (
    <>
      <Box direction="column" childGap="sm">
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
          hasArrow={false}
          offsetFromTarget={offset}
        >
          <Button
            onClick={handleTogglePopoverNear}
            variant="light"
          >
            Toggle Popover
          </Button>
        </Popover>
      </Box>
      <Box margin="2xl 0 0 0" maxWidth="300px">
        <label htmlFor="offset" style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Offset</label>
        <input
          type="range"
          id="offset"
          name="offset"
          min="0"
          max="24"
          step="1"
          value={offset}
          onChange={event => { setOffset(event.target.value); }}
          style={{ marginBottom: '0.25rem' }}
        />
        <span style={{ display: 'inline' }}>Value: {offset}</span>
      </Box>
    </>
  );
};

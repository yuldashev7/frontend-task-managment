import { useColorModeValue } from '@/components/ui/color-mode';
import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

interface NavItemProps {
  icon: React.ElementType;
  children: React.ReactNode;
  active: boolean;
  href: string;
}

const NavItem = ({
  icon: IconComponent,
  children,
  active,
  href,
  ...rest
}: NavItemProps) => {
  const activeBg = useColorModeValue('var(--white-color)', '#001726');
  const activeLinkColor = useColorModeValue(
    'var(--nav-textActive-color)',
    '#ffffff'
  );

  const activeIconBg = useColorModeValue('#4FD1C5', '#fff');
  const activeIcon = useColorModeValue('white', '#4FD1C5');
  const inactiveColor = useColorModeValue(
    'var(--nav-textInactive-color)',
    'gray.400'
  );
  const inactiveIconBg = useColorModeValue('white', 'whiteAlpha.200');

  return (
    <Link
      href={href}
      color={active ? activeLinkColor : inactiveColor}
      as={NextLink}
      textDecoration="none"
      _focus={{ boxShadow: 'none', outline: 'none' }}
      _active={{ boxShadow: 'none', outline: 'none' }}
    >
      <Flex
        align="center"
        p="3"
        mx="4"
        width="full"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        transition="all 0.2s ease-in-out"
        bg={active ? activeBg : 'transparent'}
        _hover={{
          textDecoration: 'none',
        }}
        {...rest}
      >
        {IconComponent && (
          <Box
            mr="4"
            bg={active ? activeIconBg : inactiveIconBg}
            borderRadius="10px"
            padding="6px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="all 0.2s ease-in-out"
          >
            <Icon
              as={IconComponent}
              color={active ? activeIcon : '#4FD1C5'}
              transition="all 0.2s ease-in-out"
            />
          </Box>
        )}
        <Text fontSize="md" fontWeight="semibold" width="full">
          {children}
        </Text>
      </Flex>
    </Link>
  );
};
export default NavItem;

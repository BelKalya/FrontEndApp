import {
    Box,
    BoxProps,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    IconButton,
    Link,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import React, { ReactText } from 'react';

interface LinkItemProps {
    name: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'User Details' },
    { name: 'Change Email' },
    { name: 'Change Password' },
    { name: 'My Projects' },
];

function SideMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', xl: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <MobileNav display={{ base: 'flex', xl: 'none' }} onOpen={onOpen} />
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

function SidebarContent({ onClose, ...rest }: SidebarProps) {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <CloseButton display={{ base: 'flex', xl: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
}

interface NavItemProps extends FlexProps {
    children: ReactText;
}
function NavItem({ children, ...rest }: NavItemProps) {
    return (
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="xl"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: '#38B2AC',
                    color: 'white',
                }}
                {...rest}
            >
                {children}
            </Flex>
        </Link>
    );
}

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
function MobileNav({ onOpen, ...rest }: MobileProps) {
    return (
        <Flex
            ml={{ base: 0, xl: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}
        >
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
            />
        </Flex>
    );
}

export default SideMenu;

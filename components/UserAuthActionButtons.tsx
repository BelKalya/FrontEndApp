import React from 'react';
import { Box, Button, Flex, Skeleton } from '@chakra-ui/react';
import { useApolloClient } from '@apollo/client';
import { isServer } from '../utils/isServer';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { NextChakraLink } from './NextChakraLink';

function UserAuthActionButtons() {
    const { data, loading } = useMeQuery({
        skip: isServer(),
    });
    const [logout] = useLogoutMutation();
    const apolloClient = useApolloClient();

    if (loading || isServer()) {
        return <Skeleton />;
    }
    if (!data?.me) {
        return (
            <Box>
                <NextChakraLink mr={4} href="/login" fontWeight="bold">
                    Login
                </NextChakraLink>
                <NextChakraLink href="/register" fontWeight="bold">
                    Register
                </NextChakraLink>
            </Box>
        );
    }
    return (
        <Flex align="center">
            <Box mr={2}>{data.me.email}</Box>
            <Button
                onClick={async () => {
                    await logout();
                    await apolloClient.resetStore();
                }}
            >
                Logout
            </Button>
        </Flex>
    );
}

export default UserAuthActionButtons;

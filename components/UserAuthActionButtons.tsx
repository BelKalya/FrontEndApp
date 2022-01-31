import React from 'react';
import {isServer} from "../utils/isServer";
import {useLogoutMutation, useMeQuery} from "../generated/graphql";
import {NextChakraLink} from "./NextChakraLink";
import {Box, Button, Flex} from "@chakra-ui/react";
import {useApolloClient} from "@apollo/client";

const UserAuthActionButtons = () => {
    const { data, loading } = useMeQuery({
        skip: isServer(),
    });
    const [logout] = useLogoutMutation();
    const apolloClient = useApolloClient();

    if (loading || isServer()) {
        return (<></>)
    } else if (!data?.me){
        return (
            <Box>
                <NextChakraLink mr={4} href="/login" fontWeight="bold">
                    Login
                </NextChakraLink>
                <NextChakraLink href="/register" fontWeight="bold">
                    Register
                </NextChakraLink>
            </Box>
        )
    } else {
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
        )
    }
};

export default UserAuthActionButtons;

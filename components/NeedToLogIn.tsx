import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import Layout from './Layout';
import { NextChakraLink } from './NextChakraLink';

type Props = {
    title: string,
};

function NeedToLogIn({ title }: Props) {
    return (
        <Layout title={title}>
            <Heading mb={8}>You are not logged in!</Heading>
            <Box>
                <Text fontSize="lg" lineHeight="tall">
                    You will be redirected to the login form shortly
                </Text>
                <Text fontSize="lg" lineHeight="tall">
                    If redirect didn&apos;t happen in 5 seconds please click this
                    {' '}
                    <NextChakraLink fontWeight="bold" href="/login">Link</NextChakraLink>
                </Text>
            </Box>
        </Layout>
    );
}

export default NeedToLogIn;

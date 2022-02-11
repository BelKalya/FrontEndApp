import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import Layout from '../Layout';
import SideMenu from './SideMenu';

type Props = {
    children?: ReactNode
    title?: string
}

const defaultProps = {
    children: null,
    title: 'This is the default title',
};

function MyAccountLayout({
    children,
    title,
}: Props) {
    return (
        <Layout title={title}>
            <Box><SideMenu /></Box>
            <Box maxW={600} m="0 auto">
                {children}
            </Box>
        </Layout>
    );
}

Layout.defaultProps = defaultProps;

export default MyAccountLayout;

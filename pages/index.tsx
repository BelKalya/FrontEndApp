import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout'
import {withApollo} from "../utils/withApollo";
import { ChakraProvider } from '@chakra-ui/react';

const Index = () => {

    return (
        <ChakraProvider>
            <Layout title="Home | Next.js + TypeScript Example">
                <h1>Hello Next.js 👋</h1>
                <p>
                    <Link href="/about">
                        <a>About</a>
                    </Link>
                </p>
            </Layout>
        </ChakraProvider>
    )
}

export default withApollo({ ssr: true })(Index);

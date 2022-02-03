import React from 'react';
import Layout from '../components/Layout';
import { withApollo } from '../utils/withApollo';

function Index() {
    return (
        <Layout>
            <h1>This is home</h1>
        </Layout>
    );
}

export default withApollo({ ssr: true })(Index);

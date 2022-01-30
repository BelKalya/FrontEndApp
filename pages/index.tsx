import Link from 'next/link'
import Layout from '../components/Layout'
import {useUsersQuery} from "../generated/graphql";
import {withApollo} from "../utils/withApollo";

const Index = () => {

    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Hello Next.js 👋</h1>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
        </Layout>
    )
}

export default withApollo({ ssr: true })(Index);

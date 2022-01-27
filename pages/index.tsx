import Link from 'next/link'
import Layout from '../components/Layout'
import {useUsersQuery} from "../generated/graphql";
import {withApollo} from "../utils/withApollo";

const Index = () => {
    const { data, error, loading, fetchMore, variables } = useUsersQuery();

    if (!loading && !data) {
        return (
            <div>
                <div>you got query failed for some reason</div>
                <div>{error?.message}</div>
            </div>
        );
    }

    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Hello Next.js 👋</h1>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
            {data && (
                data.users.map((u) => {
                    return <div key={u.id}>{u.id} {u.firstName} {u.lastName}</div>
                })
            )}
        </Layout>
    )
}

export default withApollo({ ssr: true })(Index);

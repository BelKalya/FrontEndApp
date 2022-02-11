import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import MyAccountLayout from '../components/my-account/MyAccountLayout';
import SideMenu from '../components/my-account/SideMenu';
import UserDetailsPage from '../components/my-account/UserDetails';
import NeedToLogIn from '../components/NeedToLogIn';
import { useMeQuery, UserDetails } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

function MyAccount() {
    const { data: user } = useMeQuery();
    const router = useRouter();

    useEffect(() => {
        if (!user?.me) {
            setTimeout(() => { router.replace('/login'); }, 3000);
        }
    });

    if (!user?.me) {
        return (
            <NeedToLogIn title="Login" />
        );
    }
    const { company, description, contactName, facebook, twitter, instagram } = user.me;
    const userDetails: UserDetails = { company, description, contactName, facebook, twitter, instagram };
    return (
        <MyAccountLayout>
            <UserDetailsPage {...userDetails} />
        </MyAccountLayout>
    );
}

export default withApollo({ ssr: true })(MyAccount);

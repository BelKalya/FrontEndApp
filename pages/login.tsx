import { Box, Button, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import AlreadyLoggedIn from '../components/AlreadyLoggedIn';
import FormInput from '../components/FormInput';
import Layout from '../components/Layout';
import { MeDocument, MeQuery, useLoginMutation, useMeQuery } from '../generated/graphql';
import { EMAIL_VALIDATION_REGEXP } from '../utils/constants';
import { INVALID_EMAIL, REQUIRED } from '../utils/validation-errors';
import { withApollo } from '../utils/withApollo';

function Login() {
    const { data: user } = useMeQuery();
    const router = useRouter();
    const [login] = useLoginMutation();

    useEffect(() => {
        if (user?.me) {
            setTimeout(() => { router.replace('/'); }, 3000);
        }
    });

    if (user?.me) {
        return (
            <AlreadyLoggedIn title="Login" />
        );
    }

    return (
        <Layout title="Login">
            <Box maxW={600} m="0 auto">
                <Heading size="xl" mb={8}>Login</Heading>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={(values) => {
                        const errors: { email?: string, password?: string } = {};
                        if (!values.email) {
                            errors.email = REQUIRED;
                        } else if (!EMAIL_VALIDATION_REGEXP.test(values.email)) {
                            errors.email = INVALID_EMAIL;
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await login({
                            variables: values,
                            update: (cache, { data }) => {
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        __typename: 'Query',
                                        me: data?.login.user,
                                    },
                                });
                            },
                        });
                        if (response.data?.login.errors) {
                            setErrors(Object.fromEntries(response.data.login.errors.map((e) => [e.field, e.message])));
                        } else if (response.data?.login.user) {
                            if (typeof router.query.forward === 'string') {
                                router.push(router.query.forward);
                            } else {
                                router.push('/');
                            }
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        touched,
                        isSubmitting,
                    }) => (
                        <Form>
                            <FormInput
                                name="email"
                                label="Email"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.email}
                                error={errors.email}
                                touched={touched.email}
                            />
                            <FormInput
                                name="password"
                                label="Password"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.password}
                                error={errors.password}
                                touched={touched.password}
                            />
                            <Button mt={4} type="submit" disabled={isSubmitting} colorScheme="teal" size="md">
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Layout>
    );
}

export default withApollo({ ssr: true })(Login);

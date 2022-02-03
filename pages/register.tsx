import { Box, Button, Heading } from '@chakra-ui/react';
import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { EMAIL_VALIDATION_REGEXP, PASSWORD_VALIDATION_REGEXP } from '../utils/constants';
import { INVALID_EMAIL, INVALID_PASSWORD, REQUIRED } from '../utils/validation-errors';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import FormInput from '../components/FormInput';
import { withApollo } from '../utils/withApollo';

function Register() {
    const router = useRouter();
    const [registerMutation] = useRegisterMutation();
    return (
        <Layout title="Registration">
            <Box maxW={600} m="0 auto">
                <Heading size="xl" mb={8}>Register</Heading>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={(values) => {
                        const errors: { email?: string, password?: string } = {};
                        if (!values.email) {
                            errors.email = REQUIRED;
                        } else if (!EMAIL_VALIDATION_REGEXP.test(values.email)) {
                            errors.email = INVALID_EMAIL;
                        }
                        if (!values.password) {
                            errors.password = REQUIRED;
                        } else if (!PASSWORD_VALIDATION_REGEXP.test(values.password)) {
                            errors.password = INVALID_PASSWORD;
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await registerMutation({
                            variables: values,
                            update: (cache, { data }) => {
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        __typename: 'Query',
                                        me: data?.register.user,
                                    },
                                });
                            },
                        });
                        if (response.data?.register.errors) {
                            setErrors(Object.fromEntries(response.data.register.errors.map((e) => [e.field, e.message])));
                        } else if (response.data?.register.user) {
                            // TODO redirect to MyAccount?
                            router.push('/');
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        touched,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
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
                        </form>
                    )}
                </Formik>
            </Box>
        </Layout>
    );
}

export default withApollo({ ssr: false })(Register);

import { Button, ChakraProvider, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';
import { Formik } from 'formik';
import Layout from '../components/Layout';
import { EMAIL_VALIDATION_REGEXP, PASSWORD_VALIDATION_REGEXP } from '../utils/constants';
import { INVALID_EMAIL, INVALID_PASSWORD, REQUIRED } from '../utils/validation-errors';
import { useRegisterMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const AboutPage = () => {
    const [registerMutation] = useRegisterMutation();
    return (
        <ChakraProvider>
            <Layout title="Registration">
                <h1>Register</h1>
                <p>Here you can register and create your first project!</p>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={(values) => {
                        const errors = { email: '', password: '' };
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
                    onSubmit={(values, { setSubmitting }) => {
                        const response = registerMutation({
                            variables: values,
                        });
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                {errors.email && touched.email && errors.email}
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                {errors.password && touched.password && errors.password}
                            </FormControl>
                            <Button type="submit" disabled={isSubmitting} colorScheme="teal" size="md">
                                Submit
                            </Button>
                        </form>
                    )}
                </Formik>
            </Layout>
        </ChakraProvider>
    );
};

export default withApollo({ ssr: false })(AboutPage);

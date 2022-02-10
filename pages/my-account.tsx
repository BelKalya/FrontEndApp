import { Alert, AlertIcon, Box, Button, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import FormInput from '../components/FormInput';
import Layout from '../components/Layout';
import NeedToLogIn from '../components/NeedToLogIn';
import { useMeQuery, useUpdateMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

function MyAccount() {
    const { data: user } = useMeQuery();
    const router = useRouter();
    const [update] = useUpdateMutation();

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

    return (
        <Layout title="My Account">
            <Box maxW={600} m="0 auto">
                <Heading size="xl" mb={8}>My Account</Heading>
                <Formik
                    initialValues={{
                        company: user.me.company,
                        description: user.me.description,
                        contactName: user.me.contactName,
                        facebook: user.me.facebook,
                        instagram: user.me.instagram,
                        twitter: user.me.twitter,
                    }}
                    onSubmit={async (values, { setStatus }) => {
                        const response = await update({
                            variables: {
                                options: values,
                            },
                        });
                        if (response.data?.update.user) {
                            setStatus(true);
                            setTimeout(() => {
                                setStatus(false);
                            }, 2000);
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        touched,
                        status,
                    }) => (
                        <Form>
                            {status && (
                                <Alert status="success">
                                    <AlertIcon />
                                    Data uploaded to the server. Fire on!
                                </Alert>
                            )}
                            <FormInput
                                name="company"
                                label="Company"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.company}
                                error={errors.company}
                                touched={touched.company}
                            />
                            <FormInput
                                name="contactName"
                                label="Name"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.contactName}
                                error={errors.contactName}
                                touched={touched.contactName}
                            />
                            <FormInput
                                name="description"
                                label="Description"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.description}
                                error={errors.description}
                                touched={touched.description}
                            />
                            <FormInput
                                name="twitter"
                                label="Twitter"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.twitter}
                                error={errors.twitter}
                                touched={touched.twitter}
                            />
                            <FormInput
                                name="facebook"
                                label="Facebook"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.facebook}
                                error={errors.facebook}
                                touched={touched.facebook}
                            />
                            <FormInput
                                name="instagram"
                                label="Instagram"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.instagram}
                                error={errors.instagram}
                                touched={touched.instagram}
                            />
                            <Button mt={4} type="submit" disabled={status} colorScheme="teal" size="md">
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Layout>
    );
}

export default withApollo({ ssr: true })(MyAccount);

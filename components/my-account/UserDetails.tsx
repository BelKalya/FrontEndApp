import { Alert, AlertIcon, Button, Heading, } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { UserDetails, useUpdateMutation } from '../../generated/graphql';
import FormInput from '../FormInput';

function UserDetailsPage({ company, description, contactName, facebook, twitter, instagram }:UserDetails) {
    const [update] = useUpdateMutation();

    return (
        <>
            <Heading size="xl" mb={8}>My Account</Heading>
            <Formik
                initialValues={{
                    company,
                    description,
                    contactName,
                    facebook,
                    instagram,
                    twitter,
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
        </>
    );
}

export default UserDetailsPage;

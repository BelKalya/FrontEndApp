import React from "react";
import {Form, Formik} from "formik";
import {MeDocument, MeQuery, useLoginMutation} from "../generated/graphql";
import {withApollo} from "../utils/withApollo";
import {Box, Button, Heading} from "@chakra-ui/react";
import FormInput from "../components/FormInput";
import {Layout} from "../components/Layout";
import {useRouter} from "next/router";
import {INVALID_EMAIL, INVALID_PASSWORD, REQUIRED} from "../utils/validation-errors";
import {EMAIL_VALIDATION_REGEXP, PASSWORD_VALIDATION_REGEXP} from "../utils/constants";

const Login = () => {
    const router = useRouter();
    const [login] = useLoginMutation();
    return (
        <Layout title="Login">
            <Box maxW={600} m={"0 auto"}>
                <Heading size={"xl"} mb={8}>Login</Heading>
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
                        const response = await login({
                            variables: values,
                            update: (cache, { data }) => {
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        __typename: "Query",
                                        me: data?.login.user,
                                    },
                                });
                            },
                        });
                        if (response.data?.login.errors) {
                            setErrors(Object.fromEntries(response.data.login.errors.map((e) => {
                                return [e.field,e.message];
                            })));
                        } else if (response.data?.login.user) {
                            if (typeof router.query.forward === "string") {
                                router.push(router.query.forward);
                            } else {
                                router.push("/");
                            }
                        }
                    }}
                >
                    {({ values,
                          errors,
                          handleChange,
                          handleBlur,
                          touched,
                          isSubmitting }) => (
                        <Form>
                            <FormInput name="email" label="Email" handleChange={handleChange} handleBlur={handleBlur}
                                       value={values.email} error={errors.email} touched={touched.email} />
                            <FormInput name="password" label="Password" handleChange={handleChange} handleBlur={handleBlur}
                                       value={values.password} error={errors.password} touched={touched.password} />
                            <Button mt={4} type="submit" disabled={isSubmitting} colorScheme="teal" size="md">
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Layout>
    );
};

export default withApollo({ ssr: false })(Login);
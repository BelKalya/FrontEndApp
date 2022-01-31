import React from "react";
import {Form, Formik} from "formik";
import {MeDocument, MeQuery, useLoginMutation} from "../generated/graphql";
import {withApollo} from "../utils/withApollo";
import {Box, Button, Heading} from "@chakra-ui/react";
import FormInput from "../components/FormInput";
import {Layout} from "../components/Layout";
import {useRouter} from "next/router";

const Login = () => {
    const router = useRouter();
    const [login] = useLoginMutation();
    return (
        <Layout>
            <Box maxW={600} m={"0 auto"}>
                <Heading size={"xl"} mb={8}>Login</Heading>
                <Formik
                    initialValues={{ email: "", password: "" }}
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
                                cache.evict({ fieldName: "posts:{}" });
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
                          isSubmitting }) => (
                        <Form>
                            <FormInput name="email" label="Email" handleChange={handleChange} handleBlur={handleBlur}
                                       value={values.email} error={errors.email} />
                            <FormInput name="password" label="Password" handleChange={handleChange} handleBlur={handleBlur}
                                       value={values.password} error={errors.password} />
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
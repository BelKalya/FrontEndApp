import {ReactNode} from "react"
import Head from "next/head"
import {Box, Container, Flex, Heading} from "@chakra-ui/react"
import {Logo} from "./Logo"
import {NextChakraLink} from "./NextChakraLink"
import UserAuthActionButtons from "./UserAuthActionButtons";

type Props = {
    children?: ReactNode
    title?: string
}

export const Layout = ({
                           children,
                           title = "This is the default title",
                       }: Props) => (
    <>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <header>
            <Box shadow={"base"}>
                <Container maxWidth={"container.xl"}>
                    <Flex py={4} justifyContent="space-between" alignItems="center" mb={8}>
                        <NextChakraLink
                            href="/"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Logo h="1.5rem" pointerEvents="none" mr={4}/>
                            <Heading size="lg">Chakra ts</Heading>
                        </NextChakraLink>
                        <UserAuthActionButtons/>
                    </Flex>
                </Container>
            </Box>
        </header>
        <main>
            <Container maxWidth={"container.xl"}>
                {children}
            </Container>
        </main>
    </>
)

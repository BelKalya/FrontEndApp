import { ChakraProvider } from '@chakra-ui/provider';
import { ColorModeScript } from '@chakra-ui/color-mode';
import theme from '../theme';

function MyApp({ Component, pageProps }: any) {
    return (
        <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;

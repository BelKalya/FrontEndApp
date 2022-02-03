import Error from 'next/error';

export default function ServerError() {
    return <Error statusCode={500} />;
}

import Error from 'next/error';

function PageNotFound() {
    return <Error statusCode={404} />;
}

export default PageNotFound;

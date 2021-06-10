import React from 'react';
import { useRouter } from 'next/router';

const singlePage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <p>Page id: {id}</p>
        </div>
    )
}

export default singlePage;
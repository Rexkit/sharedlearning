import * as React from "react";
import { useRouter } from 'next/router';

const SinglePagePreview = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <section className="container px-5 py-6 mx-auto space-y-4">
            <div>
                <p>Preview Page id: {id}</p>
            </div>
        </section>
    )
}

export default SinglePagePreview;
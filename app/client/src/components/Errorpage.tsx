import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IErrorpageProps {
    title?: string;
    text?: string;
    status?: string;
}

const Errorpage: FC<IErrorpageProps> = ({ title, text, status }) => {
    return (
        <section>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                        {status ?? 404}
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-black">
                        {title ?? "Something's missing."}
                    </p>
                    <p className="mb-4 text-lg font-light text-black">
                        {text ??
                            "Sorry, we can't find that page. You'll find lots to explore on the home page."}
                    </p>
                    <Link
                        to={'/'}
                        className="inline-flex link bg-primary-600 font-medium text-sm px-5 py-2.5 text-center my-4"
                    >
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Errorpage;

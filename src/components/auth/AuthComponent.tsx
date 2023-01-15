import { Router } from "next/router";

export interface AuthComponentProvidorProps {
    props?: any;
    children: JSX.Element;
    router?: Router;
}

export default function AuthComponentProvidor({ props, children, router }: AuthComponentProvidorProps): JSX.Element {
    return (
        <>{children}</>
    )
}
'use client';

import { useMe } from "@/hooks/auth/useMe";

export default function Dashboard() {

    const {data: me} = useMe();
    console.log("me", me);
    
    return (
        <article className="">

        </article>
    )
}
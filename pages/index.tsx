import React from 'react';
import { useAuth } from "../utils/hooks/useAuth";
import { useRouter } from "next/router";

export default function Home() {
    const Router = useRouter();
    Router.replace("/pages");
    return null;
}

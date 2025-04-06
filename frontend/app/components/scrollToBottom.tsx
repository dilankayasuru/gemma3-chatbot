"use client"
import { useEffect, useRef } from "react";

export const ScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => elementRef.current?.scrollIntoView());
    return <div ref={elementRef} />;
};
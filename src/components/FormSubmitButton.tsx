"use client";

import React, { ComponentProps } from "react";
import { useFormState, useFormStatus } from "react-dom";

// ? since we need to "extend" this component we are using TYPE here or otherwise we would have used "interface" like react official documentation recommended
type formSubmitButton = {
    children: React.ReactNode,
    className?: string,
}
    // * we are extending default react props here which is only possible with "type"
    & ComponentProps<"button">

function FormSubmitButton({
    children,
    className,
    ...props
}: formSubmitButton) {

    const {
        pending
    } = useFormStatus();

    return (<button
        {...props}
        className={`btn btn-primary ${className}`}
        type="submit"
        disabled={pending}
    >
        {pending ? <span className="loading loading-spinner loading-md" /> : <></>}
        {children}
    </button>);
}

export default FormSubmitButton;

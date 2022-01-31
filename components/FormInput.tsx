import React from 'react';
import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";

type FormInputProps = {
    name: string,
    label: string,
    handleChange: {(e: React.ChangeEvent<any>): void, <T=string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : ((e: (string | React.ChangeEvent<any>)) => void)},
    handleBlur: {(e: React.FocusEvent<any, Element>): void, <T=any>(fieldOrEvent: T): T extends string ? ((e: any) => void) : void},
    value: string,
    error: string | undefined,
}

const FormInput = ({ error, handleChange, handleBlur, value, name, label }: FormInputProps) => {
    return (
        <FormControl mb={2} isInvalid={!!error}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input
                type={name}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
            />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};

export default FormInput;

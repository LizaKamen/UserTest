import {Controller, useForm} from "react-hook-form";
import {Field, FieldError, FieldLabel} from "@/components/ui/field";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {DialogClose, DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import UserFormProps from "@/app/interfaces/userFormProps";
import {Input} from "@/components/ui/input";

export default function UserForm({user, onSubmit, onCancel, emails} : UserFormProps) {
    const formSchema = z.object({
        email: z.email().refine(e => !emails.includes(e), {
            message: "Email address is already in use",
        }),
        name: z.string().min(1, "Name is required"),
        phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone number"),
        company: z.object({name: z.string().min(1, "Company name is required")}),
        address: z.object({city: z.string().min(1, "City is required")}),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: user?.email || '',
            name: user?.name || '',
            phone: user?.phone || '',
            company: { name: user?.company.name || ''},
            address: { city: user?.address.city || ''}
        }
    });

    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Controller control={form.control} name="email" render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            placeholder="example@mail.com"
                            autoComplete="off"
                        />
                        {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                    </Field>
                )}/>

                <Controller control={form.control} name="name" render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Name</FieldLabel>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            placeholder="Вася Пупкин"
                            autoComplete="off"
                        />
                        {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                    </Field>
                )}/>

                <Controller control={form.control} name="phone" render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Phone</FieldLabel>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            placeholder="8 800 555 35 35"
                            autoComplete="off"
                        />
                        {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                    </Field>
                )}/>

                <Controller control={form.control} name="company.name" render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Company</FieldLabel>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            placeholder="Microsoft"
                            autoComplete="off"
                        />
                        {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                    </Field>
                )}/>

                <Controller control={form.control} name="address.city" render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Address</FieldLabel>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            placeholder="Tokyo"
                            autoComplete="off"
                        />
                        {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                    </Field>
                )}/>

                <DialogFooter className="gap-2">
                    <Field orientation="horizontal">
                        <DialogClose onClick={onCancel}>Cancel</DialogClose>
                        <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
                        <Button type="submit">Save</Button>
                    </Field>
                </DialogFooter>

            </form>
        </>
    )
}
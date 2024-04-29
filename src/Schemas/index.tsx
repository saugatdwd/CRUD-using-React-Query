import * as Yup from "yup";

export const LoginSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Enter your First Name:"),
    lastName: Yup.string().min(2).max(25).required("Enter your Last Name:"),
    email: Yup.string().email().required("Enter your Email:")

    
})
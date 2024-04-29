import { Formik, Field, Form, useFormik } from "formik";
import { Link, createFileRoute } from "@tanstack/react-router";
import {LoginSchema} from '../Schemas'

// interface Values {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
}

export const Route = createFileRoute('/LoginForm')({
  component: LoginForm,
})


function LoginForm () {

  const {errors,handleSubmit, values,handleChange} = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
      
    }
  
  })

  console.log(errors);
  
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        validationSchema= {LoginSchema}

      >
    
        <Form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="John" 
          value={values.firstName} 
          onChange={handleChange}
          />
          
          <p>{errors.firstName}</p>

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe"
          value={values.lastName} 
          onChange={handleChange} />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
            value={values.email} 
          onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <Link to="/">TodoList</Link>
    </div>
  );
}



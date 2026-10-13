import {render, screen} from "@testing-library/react"

import Register from "../../routes/Register"
import { AuthProvider } from "../../context/AuthProvider"
import userEvent from "@testing-library/user-event"

describe("Register Page tests", ()=>{
    test("initial test", ()=>{
        render(
        <AuthProvider>
            <Register/>
        </AuthProvider>
        )
        // screen.debug()
        expect(screen.getByRole("heading", {name : "Register"})).toBeInTheDocument()
    })

    test("The input fields are controlled", async()=>{
        render(
        <AuthProvider>
            <Register/>
        </AuthProvider>
        )
        let name = screen.getByPlaceholderText("Name")
        let email = screen.getByPlaceholderText("Email")
        let password = screen.getByPlaceholderText("Password")
        let Cpassword = screen.getByPlaceholderText("Confirm Password")

        await userEvent.type(name, "User One")
        await userEvent.type(email, "user@ex.com")
        await userEvent.type(password, "asdfghjkl")
        await userEvent.type(Cpassword, "asdfghjkl")

        expect(name).toHaveValue("User One")
        expect(email).toHaveValue("user@ex.com")
        expect(password).toHaveValue("asdfghjkl")
        expect(Cpassword).toHaveValue("asdfghjkl")
    })

    test("if passwords and confirm passwords are not equal register button disables and displays a message", async()=>{
        render(
        <AuthProvider>
            <Register/>
        </AuthProvider>
        )
        
        let password = screen.getByPlaceholderText("Password")
        let Cpassword = screen.getByPlaceholderText("Confirm Password")
        let registerButton = screen.getByRole("button", {name : "Register"})

        await userEvent.type(password, "asdfghjkl")
        await userEvent.type(Cpassword, "asdfgh")
        //cause a blur from confirm password 
        await userEvent.tab()

        expect(registerButton).toBeDisabled()
        expect(await screen.findByText("passwords don't match")).toBeInTheDocument() 
    })

    test("any missing input field makes Register button disabled", async()=>{
        render(
        <AuthProvider>
            <Register/>
        </AuthProvider>
        )

        let name = screen.getByPlaceholderText("Name")
        let email = screen.getByPlaceholderText("Email")
        let password = screen.getByPlaceholderText("Password")
        let Cpassword = screen.getByPlaceholderText("Confirm Password")
        let registerButton = screen.getByRole("button", {name : "Register"})
        
        await userEvent.type(name, "User One")
        await userEvent.type(email, "user@ex.com")
        await userEvent.type(password, "asdfghjkl")
        await userEvent.type(Cpassword, "asdfghjkl")

        await userEvent.clear(name)

        expect(registerButton).toBeDisabled()

        await userEvent.type(name, "User One")
        await userEvent.clear(email)
        expect(registerButton).toBeDisabled()

        await userEvent.type(email, "user@ex.com")
        await userEvent.clear(password)
        expect(registerButton).toBeDisabled()

        await userEvent.type(password, "asdfghjkl")
        await userEvent.clear(Cpassword)
        expect(registerButton).toBeDisabled()
    })

    test("All input fields filled make the registed button enabled", async()=>{
        render(
            <AuthProvider>
                <Register/>
            </AuthProvider>
        )

        let name = screen.getByPlaceholderText("Name")
        let email = screen.getByPlaceholderText("Email")
        let password = screen.getByPlaceholderText("Password")
        let Cpassword = screen.getByPlaceholderText("Confirm Password")
        let registerButton = screen.getByRole("button", {name : "Register"})
        
        await userEvent.type(name, "User One")
        await userEvent.type(email, "user@ex.com")
        await userEvent.type(password, "asdfghjkl")
        await userEvent.type(Cpassword, "asdfghjkl")
        
        expect(registerButton).toBeEnabled()
    })
})
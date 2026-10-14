import {render, screen} from "@testing-library/react"

import Register from "../../routes/Register"
import { AuthProvider } from "../../context/AuthProvider"
import userEvent from "@testing-library/user-event"
import { BrowserRouter, createMemoryRouter, RouterProvider } from "react-router"
import { afterEach, beforeEach } from "vitest"

describe("Register Page tests", ()=>{
    beforeEach(()=>{
        localStorage.clear()
    })
    
    afterEach(()=>{
        vi.unstubAllGlobals()
    })
    
    test("initial test", ()=>{
        render(
        <BrowserRouter>
            <AuthProvider>
                <Register/>
            </AuthProvider>
        </BrowserRouter>
        )
        // screen.debug()
        expect(screen.getByRole("heading", {name : "Register"})).toBeInTheDocument()
    })

    test("The input fields are controlled", async()=>{
        render(
        <BrowserRouter>
            <AuthProvider>
                <Register/>
            </AuthProvider>
        </BrowserRouter>
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
        <BrowserRouter>
            <AuthProvider>
                <Register/>
            </AuthProvider>
        </BrowserRouter>
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
            <BrowserRouter>
                <AuthProvider>
                    <Register/>
                </AuthProvider>
            </BrowserRouter>
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
            <BrowserRouter>
                <AuthProvider>
                    <Register/>
                </AuthProvider>
            </BrowserRouter>
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

    test("Clicking the login link takes user to login page", async()=>{
        const DummyLogin = ()=>(<div><h1>Login</h1></div>)

        const routes = [
            {
                path : "/register",
                element : (
                    <AuthProvider>
                        <Register/>
                    </AuthProvider>
                )
            },
            {
                path : "/login",
                element : <DummyLogin/>
            }
        ]       
        
        const router = createMemoryRouter(routes, {initialEntries : ["/register"]})
        
        render(<RouterProvider router = {router}/>)

        let loginLink = screen.getByRole("link", {name : "Login"})
        await userEvent.click(loginLink)
        expect(await screen.findByRole("heading", {name : "Login"})).toBeInTheDocument()
    })
    test("for any input field failing any validation displays an error message", async()=>{
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok : false,
            headers : {
                get : vi.fn()
            },
            json : vi.fn().mockResolvedValue({
                error : "password must be atleast 6 characters"
            })
        }))

        render(
            <BrowserRouter>
                <AuthProvider>
                    <Register/>
                </AuthProvider>
            </BrowserRouter>
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
        await userEvent.click(registerButton)

        expect(await screen.findByText("password must be atleast 6 characters")).toBeInTheDocument()
        expect(localStorage.getItem("cricketApp-token")).toBeNull()
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/register", expect.objectContaining({
            method : "POST",
            body : JSON.stringify({
               name : "User One",
               email :  "user@ex.com",
               password : "asdfghjkl",
               repeat_password : "asdfghjkl"
            })
        }))

    })
})
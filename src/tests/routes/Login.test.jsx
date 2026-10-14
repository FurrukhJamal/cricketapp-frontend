import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Login from "../../routes/Login"
import { AuthProvider } from "../../context/AuthProvider"
import { BrowserRouter, createMemoryRouter, RouterProvider } from "react-router"


describe("Login Page tests", ()=>{
    
    
    test("initial test", ()=>{
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Login/>
                </AuthProvider>
            </BrowserRouter>
            
        )
        expect(screen.getByRole("heading", {name : "Login"})).toBeInTheDocument()
    })

    test("the input fields are controlled", async()=>{
        // const onChange = vi.fn()
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Login/>
                </AuthProvider>
            </BrowserRouter>
        )
        const email = screen.getByPlaceholderText("Email")
        await userEvent.type(email, "user@ex.com")
        // expect(onChange).toHaveBeenCalledTimes(11)
        expect(email).toHaveValue("user@ex.com")
    })

    test("the password fields are controlled", async()=>{
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Login/>
                </AuthProvider>
            </BrowserRouter>
            
        )
        const password = screen.getByPlaceholderText("Password")
        await userEvent.type(password, "123456")
        expect(password).toHaveValue("123456")
    })

    test("the login button is disablled if both or anyone field is empty", async()=>{
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Login/>
                </AuthProvider>
            </BrowserRouter>
            
        )
        expect(screen.getByRole("button", {name : "Login"})).toBeDisabled()
        let password = screen.getByPlaceholderText("Password")
        let email = screen.getByPlaceholderText("Email")
        
        await userEvent.type(email, "fj@ex.com")
        expect(screen.getByRole("button", {name : "Login"})).toBeDisabled()

        await userEvent.clear(email)
        await userEvent.type(password, "123456")
        expect(screen.getByRole("button", {name : "Login"})).toBeDisabled()
    })

    test("Login button to be enabled when both email and password are filled", async()=>{
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Login/>
                </AuthProvider>
            </BrowserRouter>
            
        )
        let password = screen.getByPlaceholderText("Password")
        let email = screen.getByPlaceholderText("Email")
        await userEvent.type(email, "fj@ex.com")
        await userEvent.type(password, "123456")
        expect(await screen.getByRole("button", {name : "Login"})).toBeEnabled()
    })

    test("Clicking the register link takes user to register page", async()=>{
        const DummyRegister = ()=>(<div><h1>Register</h1></div>)

        const routes = [
            {
                path : "/",
                element : (
                    <AuthProvider>
                        <Login/>
                    </AuthProvider>
                )
            },
            {
                path : "/register",
                element : <DummyRegister/>
            }
        ]       
        
        const router = createMemoryRouter(routes, {initialEntries : ["/"]})
        
        render(<RouterProvider router = {router}/>)

        let registerLink = screen.getByRole("link", {name : "Register"})
        await userEvent.click(registerLink)
        expect(await screen.findByRole("heading", {name : "Register"})).toBeInTheDocument()
    })

})
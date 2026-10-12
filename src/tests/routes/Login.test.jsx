import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Login from "../../routes/Login"


describe("Login Page tests", ()=>{
    test("initial test", ()=>{
        render(<Login/>)
        expect(screen.getByRole("heading", {name : "Login"})).toBeInTheDocument()
    })

    test("the input fields are controlled", async()=>{
        // const onChange = vi.fn()
        render(<Login/>)
        const email = screen.getByPlaceholderText("Email")
        await userEvent.type(email, "user@ex.com")
        // expect(onChange).toHaveBeenCalledTimes(11)
        expect(email).toHaveValue("user@ex.com")
    })

    test("the password fields are controlled", async()=>{
        render(<Login/>)
        const password = screen.getByPlaceholderText("Password")
        await userEvent.type(password, "123456")
        expect(password).toHaveValue("123456")
    })

    test("the login button is disablled if both or anyone field is empty", async()=>{
        render(<Login/>)
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
        render(<Login/>)
        let password = screen.getByPlaceholderText("Password")
        let email = screen.getByPlaceholderText("Email")
        await userEvent.type(email, "fj@ex.com")
        await userEvent.type(password, "123456")
        expect(await screen.getByRole("button", {name : "Login"})).toBeEnabled()
    })

})
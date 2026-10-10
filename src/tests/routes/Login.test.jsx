import {render, screen} from "@testing-library/react"

import Login from "../../routes/Login"


describe("Login Page tests", ()=>{
    test("initial test", ()=>{
        render(<Login/>)
        // screen.debug()
        expect(screen.getByText(/login/i)).toBeInTheDocument()
    })
})
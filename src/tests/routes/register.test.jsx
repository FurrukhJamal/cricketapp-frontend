import {render, screen} from "@testing-library/react"

import Register from "../../routes/Register"


describe("Register Page tests", ()=>{
    test("initial test", ()=>{
        render(<Register/>)
        // screen.debug()
        expect(screen.getByText(/register/i)).toBeInTheDocument()
    })
})
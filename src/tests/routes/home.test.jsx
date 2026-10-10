import {render, screen} from "@testing-library/react"

import Home from "../../routes/home"
import { expect } from "vitest"

describe("Home Page tests", ()=>{
    test("initial test", ()=>{
        render(<Home/>)
        // screen.debug()
        expect(screen.getByText(/home/i)).toBeInTheDocument()
    })
})
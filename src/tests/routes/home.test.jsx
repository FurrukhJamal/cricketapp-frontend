import {render, screen} from "@testing-library/react"

import Home from "../../routes/home"
import { expect } from "vitest"
import userEvent from "@testing-library/user-event"

describe("Home Page tests", ()=>{
    test("initial test", ()=>{
        render(<Home/>)
        expect(screen.getByText(/control panel/i)).toBeInTheDocument()
    })

    test("on clicking a team logo or the div containing it a new list of players should appear and disappear on click anywhere else", async()=>{
        render(<Home/>)
        expect(screen.queryByText(/team players/i)).toBeNull()
        
        let teamLogoContainer = screen.getByTestId("teamLogoContainer-1")
        let outerContainer = screen.getByTestId("main-container")
        await userEvent.click(teamLogoContainer)

        expect(await screen.findByText(/players info/i)).toBeInTheDocument()

        await userEvent.click(outerContainer)

        expect(screen.queryByText(/players info/i)).toBeNull()
    })
})
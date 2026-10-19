import {render, screen} from "@testing-library/react"

import Home from "../../routes/home"
import { expect } from "vitest"
import userEvent from "@testing-library/user-event"
import imadWaseem from "../../assets/players/imad-wasim.webp"
import shadabKhan from "../../assets/players/shadab-Khan.webp"
import AlexHales from "../../assets/players/Alex-Hales.png"

describe("Home Page tests", ()=>{
    afterEach(()=>{
        vi.unstubAllGlobals()
    })
    
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

    test("it should load the apropriate players name and pic when a teams logo is clicked", async()=>{
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok : true,
            json : vi.fn().mockResolvedValue({
                name : "Karachi Kings",
                players : [
                    {
                        name : "Imad Waseem",
                        pic : imadWaseem
                    },
                    {
                        name : "Shadab Khan",
                        pic : shadabKhan
                    },
                    {
                        name : "Alex Hales",
                        pic : AlexHales
                    }
                ]
            })
        }))

        render(<Home/>)

        let teamLogoContainer = screen.getByTestId("teamLogoContainer-1")
        let outerContainer = screen.getByTestId("main-container")
        await userEvent.click(teamLogoContainer)

        expect(await screen.findByText(/players info/i)).toBeInTheDocument()
        expect(await screen.findByText("Imad Waseem")).toBeInTheDocument()
        expect(await screen.findByText("Shadab Khan")).toBeInTheDocument()
        expect(await screen.findByText("Alex Hales")).toBeInTheDocument()

        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/lahoreqalandars/players", expect.objectContaining({
            method : "GET",
        }))
        

    })
})
import {render, screen, waitFor} from "@testing-library/react"

import Home from "../../routes/home"
import { beforeEach, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import imadWaseem from "../../assets/players/imad-wasim.webp"
import shadabKhan from "../../assets/players/shadab-Khan.webp"
import AlexHales from "../../assets/players/Alex-Hales.png"
import { schedule } from "../../constants/testData/schedule"
import { players } from "../../constants/testData/players"

describe("Home Page tests", ()=>{
    afterEach(()=>{
        vi.unstubAllGlobals()
    })

    beforeEach(()=>{
        vi.stubGlobal("fetch", vi.fn((url)=>{
            if (url === "http://localhost:3000/api/schedule") {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(schedule)
            });
        }

        if (url.endsWith("/players")) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ players })
            });
        }
        }))
    })
    
    test("initial test", async()=>{
        render(<Home/>)
        expect(screen.getByText(/control panel/i)).toBeInTheDocument()
        // Wait for the schedule to finish loading.
        expect(await screen.findByText("Rawalpindiz")).toBeInTheDocument()
    })

    test("on clicking a team logo or the div containing it a new list of players should appear and disappear on click anywhere else", async()=>{
        render(<Home/>)
        expect(screen.queryByText(/team players/i)).toBeNull()
        
        let teamLogoContainer = screen.getByTestId("teamLogoContainer-1")
        let outerContainer = screen.getByTestId("main-container")
        await userEvent.click(teamLogoContainer)
        //screen.debug()
        await waitFor(async()=>{
            expect(await screen.findByText(/players info/i)).toBeInTheDocument()

            await userEvent.click(outerContainer)
            expect(screen.queryByText(/players info/i)).toBeNull()
            
        })
      
    })

    test("it should load the apropriate players name and pic when a teams logo is clicked", async()=>{
        render(<Home/>)

        let teamLogoContainer = screen.getByTestId("teamLogoContainer-1")
        let outerContainer = screen.getByTestId("main-container")
        await userEvent.click(teamLogoContainer)

        expect(await screen.findByText(/players info/i)).toBeInTheDocument()
        expect(await screen.findAllByText("Imad Waseem")).toHaveLength(5)
        expect(await screen.findAllByText("Shadab Khan")).toHaveLength(5)
        expect(await screen.findAllByText("Alex Hales")).toHaveLength(5)

        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/lahoreqalandars/players", expect.objectContaining({
            method : "GET",
        }))
        

    })

    test("it should make a fetch call and display the coming up three games", async()=>{
        render(<Home/>)
        
        expect(screen.getByText(/upcoming games/i)).toBeInTheDocument()
        

        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/schedule", expect.objectContaining({
            method : "GET"
        }))

        //all test matches are against karachi kings so it display 3 matches and +1 for teams names at top
        // expect(await screen.findAllByText(/karachi kings/i)).toHaveLength(1)
        // expect((await screen.findAllByText(/rawalpindiz/i)).length).toBeGreaterThanOrEqual(2)
        // screen.debug()
        await waitFor(async()=>{
            expect(await screen.findAllByText(/karachi kings/i)).toHaveLength(4)
            expect(await screen.findAllByText(/rawalpindiz/i)).toHaveLength(2)
            expect(await screen.findAllByText(/Hyderabad Kingsmen/i)).toHaveLength(2)
            expect(await screen.findAllByText(/Quetta Gladiators/i)).toHaveLength(2)
        })
    })
})
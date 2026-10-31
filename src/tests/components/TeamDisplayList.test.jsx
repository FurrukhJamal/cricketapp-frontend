import {screen, render, waitFor} from "@testing-library/react"
import { AuthProvider } from "../../context/AuthProvider"
import TeamDisplayList from "../../components/TeamDisplayList"
import { playersInfo } from "../../constants/testData/teamPlayerInfo"

describe("Tests for TeamDisplay component", ()=>{
    afterEach(()=>{
        vi.unstubAllGlobals()
    })
    test("it should display a message if the team is not setup by admin", async()=>{
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok : true,
            json : vi.fn().mockResolvedValue({
                success : false
            })
        }))
        render(
            <AuthProvider initialUser={{
                name : "Test User",
                email : "user@ex.com",
                role : "user"
            }}>
                <TeamDisplayList teamName = "Karachi King"/>
            </AuthProvider>
        )

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(await screen.findByText(/karachi king's players are not setup yet/i)).toBeInTheDocument()
    })

    test("the players list for teams is been displayed properly", async()=>{
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok : true,
            json : vi.fn().mockResolvedValue({
                success : true,
                players : playersInfo
            })
        }))

        render(
            <AuthProvider initialUser={{
                name : "Test User",
                email : "user@ex.com",
                role : "user"
            }}>
                <TeamDisplayList teamName = "Karachi King"/>
            </AuthProvider>
        )

        expect(fetch).toHaveBeenCalledTimes(1)
        await waitFor(()=>{
            expect(screen.getByTestId("displayPlayerName-0")).toHaveTextContent("Imad Waseem")
            expect(screen.getByTestId("displayPlayerName-14")).toHaveTextContent("Alex Hales")
        })
        
        
    })
})
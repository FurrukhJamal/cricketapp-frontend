import {screen, render} from "@testing-library/react"
import { AuthProvider } from "../../context/AuthProvider"
import TeamDisplayList from "../../components/TeamDisplayList"

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
})
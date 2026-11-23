import { afterEach, beforeEach } from "vitest";
import {matchDaySchedule, schedule } from "../../constants/testData/schedule";
import {screen, render} from "@testing-library/react"
import { matchdaySchedule } from "../../constants/testData/schedule";
import { AuthProvider } from "../../context/AuthProvider";
import MatchDaySchedule from "../../components/MatchDaySchedule";

describe("Tests for match day schedule", ()=>{
    afterEach(()=>{
        vi.unstubAllGlobals()
    })

    beforeEach(()=>{
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok : true,
            json : vi.fn().mockResolvedValue({
                success : true,
                schedule : matchdaySchedule
            })
        }))
    })

    test("it should display a no match today message if there is no match today", async()=>{
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok : true,
            json: vi.fn().mockResolvedValue({
                success : true,
                schedule : schedule
            })
        }))
        
        render(
            <AuthProvider initialUser = {{
                name : "Test User",
                email : "us@ex.com",
                role : "admin"
            }}
            >
                <MatchDaySchedule/>
            </AuthProvider>
        )
        
        
        expect(await screen.findByText(/there is no match today/i)).toBeInTheDocument()

    })
})
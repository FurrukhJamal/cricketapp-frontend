import {screen, render} from "@testing-library/react"
import { AuthProvider } from "../../context/AuthProvider"
import Teams from "../../routes/Teams"
import { afterEach, beforeEach } from "vitest"

describe("Tests for Teams route component", ()=>{
    afterEach(()=>{
        vi.unstubAllGlobals()
    })
    
    beforeEach(()=>{
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                success: false,
                
            })
            })
        )
    })

    test("initial test for loginin with admin and seeing all teams creation panel", ()=>{
        render(
            <AuthProvider initialUser={{
                name : "Test User",
                email : "user@ex.com",
                role : "admin"
            }}>
                <Teams/>
            </AuthProvider>
        )

        expect(screen.getByText("Karachi King's Creation Panel")).toBeInTheDocument()
        expect(screen.getByText("Karachi King's Creation Panel")).toBeInTheDocument()
        expect(screen.getByText("Lahore Qalandars's Creation Panel")).toBeInTheDocument()
        expect(screen.getByText("Islamabad United's Creation Panel")).toBeInTheDocument()
        expect(screen.getByText("Peshawar Zalmi's Creation Panel")).toBeInTheDocument()
        expect(screen.getByText("Multan Sultans's Creation Panel")).toBeInTheDocument()
        expect(screen.getByText("Quetta Gladiators's Creation Panel")).toBeInTheDocument()
        expect(screen.getByText("Hyderabad Kingsmen's Creation Panel")).toBeInTheDocument()
        expect(screen.getByText("Rawalpindiz's Creation Panel")).toBeInTheDocument()

    })
})
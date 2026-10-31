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

    test("user doesnt see the teams creation panel", ()=>{
        render(
            <AuthProvider initialUser={{
                name : "Test User",
                email : "user@ex.com",
                role : "user"
            }}>
                <Teams/>
            </AuthProvider>
        )

        expect(screen.queryByText("Karachi King's Creation Panel")).not.toBeInTheDocument()
        expect(screen.queryByText("Karachi King's Creation Panel")).not.toBeInTheDocument()
        expect(screen.queryByText("Lahore Qalandars's Creation Panel")).not.toBeInTheDocument()
        expect(screen.queryByText("Islamabad United's Creation Panel")).not.toBeInTheDocument()
        expect(screen.queryByText("Peshawar Zalmi's Creation Panel")).not.toBeInTheDocument()
        expect(screen.queryByText("Multan Sultans's Creation Panel")).not.toBeInTheDocument()
        expect(screen.queryByText("Quetta Gladiators's Creation Panel")).not.toBeInTheDocument()
        expect(screen.queryByText("Hyderabad Kingsmen's Creation Panel")).not.toBeInTheDocument()
        expect(screen.queryByText("Rawalpindiz's Creation Panel")).not.toBeInTheDocument()

        expect(screen.getByText(/psl teams/i)).toBeInTheDocument()
    })
})
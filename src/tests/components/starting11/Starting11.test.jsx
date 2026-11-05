import {screen, render} from "@testing-library/react"
import {AuthProvider} from "../../../context/AuthProvider";
import Starting11 from "../../../components/starting11/Starting11.jsx";

describe("Basic Starting11 component tests", ()=>{
    test("initial test", ()=>{
        render(
            <AuthProvider initialUser = {{
                name : "Test User",
                email : "us@ex.com",
                role : "admin"
            }}>
                <Starting11 teamName="Karachi King"/>
            </AuthProvider>
        )

        expect(screen.getByText(/karachi king starting 11/i)).toBeInTheDocument()
        expect(screen.getByRole("button", {name : "Save Team"})).toBeInTheDocument()

    })
})
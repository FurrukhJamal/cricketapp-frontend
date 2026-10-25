import { render, screen } from "@testing-library/react";
import Teams from "../../routes/Teams";
import { AuthProvider, AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import userEvent from "@testing-library/user-event";



describe("Tests for Teams route page", ()=>{
    afterEach(()=>{
        localStorage.clear()
    })
    
    test("only admin sees a team creation panel", async()=>{
        render(
            <AuthProvider initialUser={{
                name : "User One",
                email : "user@ex.com",
                role : "admin"
            }
            }>
                <Teams/>
            </AuthProvider>
        )

        expect(screen.getByText(/teams creation panel/i)).toBeInTheDocument()
    })

    test("a normal user doesnt sees a team creation panel", async()=>{
        render(
            <AuthProvider initialUser={{
                name : "User One",
                email : "user@ex.com",
                role : "user"
            }
            }>
                <Teams/>
            </AuthProvider>
        )

        expect(screen.queryByText(/teams creation panel/i)).toBeNull()
    })

    test("the player name input filed is controlled", async()=>{
        render(
            <AuthProvider initialUser={{
                name : "User One",
                email : "user@ex.com",
                role : "admin"
            }
            }>
                <Teams/>
            </AuthProvider>
        )
        let name = screen.getByPlaceholderText("Name")
        await userEvent.type(name, "User Name")
        expect(name).toHaveValue("User Name")
    })

    test("The players type select menu is controlled", async()=>{
        render(
            <AuthProvider initialUser={{
                name : "User One",
                email : "user@ex.com",
                role : "admin"
            }
            }>
                <Teams/>
            </AuthProvider>
        )

        let playerTypeSelect = screen.getByRole("combobox")
        await userEvent.selectOptions(playerTypeSelect, "Allrounder")
        expect(playerTypeSelect).toHaveValue("allrounder")
    })
    
    test("it allows the user to upload players image", async()=>{
        render(
            <AuthProvider initialUser={{
                name : "User One",
                email : "user@ex.com",
                role : "admin"
            }
            }>
                <Teams/>
            </AuthProvider>
        )
        let fileInput = screen.getByLabelText("Upload Player's Image:")
        
        // let fileInput = screen.getByLabelText("player-image-upload")
        const file = new File(
            ["fake image content"],
            "test-image.png",
            {type : "image/png"}
        )
        await userEvent.upload(fileInput, file)
        expect(fileInput.files[0]).toBe(file)
        expect(fileInput.files).toHaveLength(1)

        expect(fileInput.files[0].name).toBe("test-image.png")
        expect(fileInput.files[0].type).toBe("image/png")
    })
})
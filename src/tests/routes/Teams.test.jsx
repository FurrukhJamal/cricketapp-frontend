import { render, screen } from "@testing-library/react";
import Teams from "../../routes/Teams";
import { AuthProvider, AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";



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

    test("it rejects a PDF file", async()=>{
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
        let file = new File(["PDF content"], "document.pdf", {type : "application/pdf"})
        await userEvent.upload(fileInput, file, {applyAccept : false})

        // screen.debug()
        expect(await screen.findByText("File type should be a JPEG or PNG")).toBeInTheDocument()
    })

    test("Add Player button remains disablled if fields are empty", async()=>{
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

        let addPlayerButton = screen.getByRole("button", {name : "Add Player"})
        expect(addPlayerButton).toBeDisabled()
    })

    test("Add Player button is enabled if all inputs are filled and on submitting its getting added and inputs are clearing", async()=>{
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

        let addPlayerButton = screen.getByRole("button", {name : "Add Player"})
        let name = screen.getByPlaceholderText("Name")
        let playerTypeSelect = screen.getByRole("combobox")
        
        await userEvent.selectOptions(playerTypeSelect, "Allrounder")
        await userEvent.type(name, "Test Player")

        const file = new File(
            ["fake image content"],
            "test-image.png",
            {type : "image/png"}
        )

        let fileInput = screen.getByLabelText("Upload Player's Image:")
        await userEvent.upload(fileInput, file)

        await userEvent.tab()

        expect(screen.getByRole("button", {name : "Add Player"})).toBeEnabled()


        //checking to see if added Player is displayed as a list of one of 15 players
        await userEvent.click(addPlayerButton)
        let divContainingPlayerInfo = await screen.findByTestId("playerInfoContainer-0")
        expect(divContainingPlayerInfo).toBeInTheDocument()

        //check to see if input fields are clear
        expect(fileInput.value).toBe("")
        expect(fileInput.files).toHaveLength(0)
        expect(name).toHaveValue("")
        expect(playerTypeSelect).toHaveValue("")
    })

    test("pressing the cross button deletes that particular player from the list", async()=>{
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

        let addPlayerButton = screen.getByRole("button", {name : "Add Player"})
        let name = screen.getByPlaceholderText("Name")
        let playerTypeSelect = screen.getByRole("combobox")
        let fileInput = screen.getByLabelText("Upload Player's Image:")
        
        const file = new File(
            ["fake image content"],
            "test-image.png",
            {type : "image/png"}
        )
        
        await userEvent.selectOptions(playerTypeSelect, "Allrounder")
        await userEvent.type(name, "Test Player1")
        await userEvent.upload(fileInput, file)
        await userEvent.click(addPlayerButton)

        //adding the player that will be deleted
        await userEvent.selectOptions(playerTypeSelect, "Allrounder")
        await userEvent.type(name, "Deleted Player")
        await userEvent.upload(fileInput, file)
        await userEvent.click(addPlayerButton)

        //adding another player
        await userEvent.selectOptions(playerTypeSelect, "Allrounder")
        await userEvent.type(name, "Third Player")
        await userEvent.upload(fileInput, file)
        await userEvent.click(addPlayerButton)

        expect(await screen.findByText("Deleted Player")).toBeInTheDocument()
        let deleteButton = await screen.findByTestId("playerDeleteButton-1")
        await userEvent.click(deleteButton)

        expect(screen.queryByText("Deleted Player")).not.toBeInTheDocument()


    })
})
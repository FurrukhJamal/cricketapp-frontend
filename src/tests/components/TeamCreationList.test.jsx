import { render, screen, waitFor } from "@testing-library/react";
import Teams from "../../components/TeamCreationList";
import { AuthProvider, AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect } from "vitest";



describe("Tests for Teams route page", ()=>{
    afterEach(()=>{
        localStorage.clear()
        vi.unstubAllGlobals()
        vi.restoreAllMocks()
    })

    beforeEach(() => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                success: true,
                players: []
            })
            })
        )
    })

    // beforeEach(()=>{
    //     let savedPlayers = []
        
    //     vi.stubGlobal("fetch", vi.fn((url, options = {})=>{
    //         const method = options.method || "GET"
    //         if(url == "http://localhost:3000/api/teams/teamName" && method == "POST"){
    //             return Promise.resolve({
    //                 ok : true,
    //                 json : vi.fn().mockResolvedValue({
    //                     success : true
    //                 })
    //             })
    //         }
    //         if(url == "http://localhost:3000/api/teams/teamName" && method == "GET"){
    //             return Promise.resolve({
    //                 ok : true,
    //                 json
    //             })
    //         }
    //     })
    // })
    
    test("only admin sees a team creation panel", async()=>{
        render(
            <AuthProvider initialUser={{
                name : "User One",
                email : "user@ex.com",
                role : "admin"
            }
            }>
                <Teams teamName = "Karachi King"/>
            </AuthProvider>
        )

        expect(screen.getByText(/Karachi King's creation panel/i)).toBeInTheDocument()
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
    //passing a 3rd argument for timeout
    test("After adding 15 players a save button appears to send the data to the server, and the form to add players disappears", async()=>{
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
        
        let file;
        for(let i =0; i < 15; i++){
            file = new File(
            ["fake image content"],
            `test-image-${i}.png`,
            {type : "image/png"}
            )
            
            await userEvent.selectOptions(playerTypeSelect, "Allrounder")
            await userEvent.type(name, `Test Player-${i}`)
            await userEvent.upload(fileInput, file)
            await userEvent.click(addPlayerButton)
        }

        expect(await screen.findByRole("button", {name : "Save Team"})).toBeInTheDocument()

        expect(name).not.toBeInTheDocument()
    }, 12000)

    test("it should be able to upload 15 players data along with their images to the server", async()=>{
        // const fetchMock = vi.fn().mockResolvedValue({
        //     ok : true,
        //     json : vi.fn().mockResolvedValue({
        //         success : true
        //     })
        // })

        const fetchMock = vi.fn((url, options = {})=>{
            const method = options.method || "GET"
            if(url == "http://localhost:3000/api/teams/karachiking" && method == "POST"){
                return Promise.resolve({
                    ok : true,
                    json : vi.fn().mockResolvedValue({
                        success : true
                    })
                })
            }
            if(url == "http://localhost:3000/api/teams/karachiking" && method == "GET"){
                return Promise.resolve({
                    ok : true,
                    json : vi.fn().mockResolvedValue({
                        success : true,
                        players : []
                    })
                })
            }
            
        })
        
        vi.stubGlobal("fetch", fetchMock)

        vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:test-image")

        render(
            <AuthProvider initialUser={{
                name : "User One",
                email : "user@ex.com",
                role : "admin"
            }
            }>
                <Teams teamName = "Karachi King"/>
            </AuthProvider>
        )
                
        let addPlayerButton = screen.getByRole("button", {name : "Add Player"})
        let name = screen.getByPlaceholderText("Name")
        let playerTypeSelect = screen.getByRole("combobox")
        let fileInput = screen.getByLabelText("Upload Player's Image:")
        
        let file;
        for(let i =0; i < 15; i++){
            file = new File(
            ["fake image content"],
            `test-image-${i}.png`,
            {type : "image/png"}
            )
            
            await userEvent.selectOptions(playerTypeSelect, "Allrounder")
            await userEvent.type(name, `Test Player-${i}`)
            await userEvent.upload(fileInput, file)
            await userEvent.click(addPlayerButton)
        }

        let saveButton = await screen.findByRole("button", {name : "Save Team"})

        await userEvent.click(saveButton)

        expect(fetchMock).toHaveBeenCalledTimes(2)

        // const[url , options ] = fetchMock.mock.calls[0]

        const [url, options] = fetchMock.mock.calls.find(
        ([url, options = {}]) =>
            url === "http://localhost:3000/api/teams/karachiking" &&
            options.method === "POST"
        )

        expect(url).toBe("http://localhost:3000/api/teams/karachiking")
        expect(options.method).toBe("POST")
        expect(options.body).toBeInstanceOf(FormData)

        const formData = options.body 
        const players = JSON.parse(formData.get("players"))

        expect(players).toHaveLength(15)

        expect(players[0]).toEqual({
            name : "Test Player-0",
            playerType : "allrounder"
        })

        expect(players[14]).toEqual({
            name : "Test Player-14",
            playerType : "allrounder"
        })

        const playerImages = formData.getAll("images")
        expect(playerImages).toHaveLength(15)
        expect(playerImages[0]).toBeInstanceOf(File)
        expect(playerImages[0].name).toBe("test-image-0.png")
        expect(playerImages[14].name).toBe("test-image-14.png")

    },15000)

    test("If team is stored in the db get that fetched team players and display them", async()=>{
        let savedPlayers = []
        for (let i = 0; i < 15; i++){
            let obj = {
                name : `Player ${i}`,
                playerType : "batsman",
                playerImagePreview: `http://localhost:3000/uploads/player${i+ 1}.png`
            }
            savedPlayers.push(obj)
        }

        vi.stubGlobal("fetch", vi.fn((url , options = {})=>{
            const method = options.method || "GET"
            if(url == "http://localhost:3000/api/teams/karachiking" && method == "GET"){
                return Promise.resolve({
                    ok : true,
                    json : vi.fn().mockResolvedValue({
                        success : true,
                        players : savedPlayers
                    })
                })
            }          
        }))

        render(
            <AuthProvider initialUser={{
                name : "User One",
                email : "user@ex.com",
                role : "admin"
            }
            }>
                <Teams teamName="Karachi King"/>
            </AuthProvider>
        )

        await waitFor(()=>{
            expect(screen.getByText("Player 0")).toBeInTheDocument()
            expect(screen.getByText("Player 14")).toBeInTheDocument()
        })

    })
})
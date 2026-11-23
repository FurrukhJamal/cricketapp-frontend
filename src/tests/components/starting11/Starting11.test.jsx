import {screen, render, waitFor} from "@testing-library/react"
import {AuthProvider} from "../../../context/AuthProvider";
import Starting11 from "../../../components/starting11/Starting11.jsx";
import { starting11Data } from "../../../constants/testData/teamPlayerInfo.jsx";
import userEvent from "@testing-library/user-event";

describe("Basic Starting11 component tests", ()=>{
    afterEach(()=>{
        vi.unstubAllGlobals()
    })

    beforeEach(()=>{
        vi.stubGlobal("fetch", vi.fn((url, options)=>{
            if(url == "http://localhost:3000/api/teams/karachiking/starting11"){
                if(options.method == "GET"){
                    return Promise.resolve({
                        ok : true, 
                        json: vi.fn().mockResolvedValue({
                            success : true,
                            starting11 : starting11Data

                        })
                    })
                }
                if(options.method == "POST"){
                    return Promise.resolve({
                        ok : true,
                        json: vi.fn().mockResolvedValue({
                            success : true
                        })
                    })
                }
            }
            
        }))

    })

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
    test("the save button should send in a post fetch request to save the team", async()=>{
        // vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
        //     ok : true,
        //     json: vi.fn().mockResolvedValue({
        //         success : true
        //     })
        // }))

        render(
            <AuthProvider initialUser = {{
                name : "Test User",
                email : "us@ex.com",
                role : "admin"
            }}>
                <Starting11 teamName="Karachi King"/>
            </AuthProvider>
        )
        let saveButton = screen.getByRole("button", {name : "Save Team"})
        await userEvent.click(saveButton)
        await waitFor(()=>{
            expect(fetch).toHaveBeenCalledTimes(2)
            expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/teams/karachiking/starting11", expect.objectContaining({
                method : "POST",
                body : JSON.stringify({
                    starting11 : starting11Data
                })
            }))
        })

        expect(screen.getByText("Team Saved!")).toBeInTheDocument()
        await waitFor(()=>{
            expect(screen.queryByText("Team Saved!")).not.toBeInTheDocument()
        }, {timeout : 3000})
        
    })

    test("any sort of error or a server error during saving a team displays an error message", async()=>{
        fetch.mockImplementation((url, options)=>{
            if(options.method == "GET"){
                return Promise.resolve({
                        ok : true, 
                        json: vi.fn().mockResolvedValue({
                            success : true,
                            starting11 : starting11Data

                            })
                        })
            }
            if(options.method == "POST"){
                return Promise.reject(new Error("network error"))
            }
        })

        render(
            <AuthProvider initialUser = {{
                name : "Test User",
                email : "us@ex.com",
                role : "admin"
            }}>
                <Starting11 teamName="Karachi King"/>
            </AuthProvider>
        )
        let saveButton = screen.getByRole("button", {name : "Save Team"})
        await userEvent.click(saveButton)

        expect(await screen.findByText("Something went wrong plz try again")).toBeInTheDocument()

    })

    test("when the component is rendered it should get the initial starting 11 from the server", async()=>{
        render(
            <AuthProvider initialUser = {{
                name : "Test User",
                email : "us@ex.com",
                role : "admin"
            }}>
                <Starting11 teamName="Karachi King"/>
            </AuthProvider>
        )
        let playerNames = await screen.findAllByTestId(/^playerName-/)
        expect(playerNames).toHaveLength(15)
        expect(playerNames.map(player=>player.textContent)).toEqual(starting11Data.map(player=>player.name))
    })

    // test("the moving of players is working", async()=>{
    //     const user = userEvent.setup();
    //     render(
    //         <AuthProvider initialUser = {{
    //             name : "Test User",
    //             email : "us@ex.com",
    //             role : "admin"
    //         }}>
    //             <Starting11 teamName="Karachi King"/>
    //         </AuthProvider>
    //     )

    //     // Wait for players to load
    //     await screen.findAllByTestId(/^playerName-/);

    //     // Get Imad Wasim's draggable div
    //     const imad = screen.getByTestId("sortable-kk1");

    //     // Focus the draggable element
    //     imad.focus();

    //     // Pick up, move down, drop
    //     await user.keyboard("{Space}{ArrowDown}{Space}");

    //     // Check the new order
    //     const playerNames = screen.getAllByTestId(/^playerName-/);

    //     expect(playerNames[0]).toHaveTextContent("Babar Azam");
    //     expect(playerNames[1]).toHaveTextContent("Imad Wasim");
    // })
})
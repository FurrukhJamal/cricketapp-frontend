import { describe, it, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { AuthProvider } from '../context/AuthProvider';
import {userEvent} from "@testing-library/user-event"

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  test('false to be false', () => {
    expect(false).toBe(false);
  });
});

describe("Loading App tests for home page/ login page decision", ()=>{
  beforeEach(()=>{
    localStorage.clear()
  })

  afterEach(()=>{
    vi.unstubAllGlobals()
  })
  test("it should display the login page if there is no auth token stored", async()=>{
    
    render(
    <AuthProvider>
      <App/>
    </AuthProvider>
    )
    expect(screen.getByRole("heading", {name : "Login"})).toBeInTheDocument()
    // expect(await screen.findByText(/login/i)).toBeInTheDocument()

  })

  test("it should display the home page if there is auth token stored", async()=>{
    localStorage.setItem("cricketApp-token", "abcdefgh")
    render(
      <AuthProvider>
        <App/>
      </AuthProvider>
    )
    
    expect(await screen.findByText(/home/i)).toBeInTheDocument()

  })

  test("A successful login would show the homepage", async()=>{
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok : true,
            headers : {
                get: vi.fn().mockReturnValue("jwt-token")
            },
            json : vi.fn().mockResolvedValue({
                name : "user",
                email : "user@ex.com",
                role : "admin"
            })
        }))
        
        render(
            <AuthProvider>
                <App/>
            </AuthProvider>
        )

        let password = screen.getByPlaceholderText("Password")
        let email = screen.getByPlaceholderText("Email")
        let submitButton = screen.getByRole("button", {name : "Login"})

        await userEvent.type(email, "user@ex.com")
        await userEvent.type(password, "123456")
        await userEvent.click(submitButton)

        expect(await screen.findByText(/home/i)).toBeInTheDocument()
        expect(localStorage.getItem("cricketApp-token")).toBe("jwt-token")
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/login", expect.objectContaining({
          method : "POST",
          body : JSON.stringify({
            email : "user@ex.com",
            password : "123456"
          })
        }))

    })

  test("failed login attempt displays an error", async()=>{
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok : false,
      headers : {
        get : vi.fn()
      },
      json : vi.fn().mockResolvedValue({
        error : "invalid email or password"
      })
    }))

    render(
      <AuthProvider>
          <App/>
      </AuthProvider>
    )
    // screen.debug()
    let password = screen.getByPlaceholderText("Password")
    let email = screen.getByPlaceholderText("Email")
    let submitButton = screen.getByRole("button", {name : "Login"})

    await userEvent.type(email, "user@ex.com")
    await userEvent.type(password, "12346")
    await userEvent.click(submitButton)

    expect(await screen.findByText("invalid email or password")).toBeInTheDocument()
    expect(localStorage.getItem("cricketApp-token")).toBeNull()

  })

  test("A successful register displays the homepage", async()=>{
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok : true,
      headers : {
        get : vi.fn().mockReturnValue("jwt-token")
      },
      json : vi.fn().mockResolvedValue({
        name : "User One",
        email : "user@ex.com",
        role : "admin"
      })
    }))

    render(
      <AuthProvider>
          <App/>
      </AuthProvider>
    )
    let link = screen.getByRole("link", {name : "Register"})

    await userEvent.click(link)

    // screen.debug()

    let name = await screen.findByPlaceholderText("Name")
    let email = await screen.findByPlaceholderText("Email")
    let password = await screen.findByPlaceholderText("Password")
    let Cpassword = await screen.findByPlaceholderText("Confirm Password")
    let registerButton = await screen.findByRole("button", {name : "Register"})
    
    await userEvent.type(name, "User One")
    await userEvent.type(email, "user@ex.com")
    await userEvent.type(password, "asdfghjkl")
    await userEvent.type(Cpassword, "asdfghjkl")

    await userEvent.tab()

    await userEvent.click(registerButton)
    // screen.getByRole("")
    expect(await screen.findByText(/home/i)).toBeInTheDocument()
    expect(localStorage.getItem("cricketApp-token")).toBe("jwt-token")
  })
})
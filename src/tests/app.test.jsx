import { describe, it, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { AuthProvider } from '../context/AuthProvider';

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
})
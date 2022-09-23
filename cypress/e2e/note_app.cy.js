describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    const user = {
      username: "root",
      name: "root",
      password: "root",
    }
    cy.request("POST", "http://localhost:3001/api/users", user)
    cy.visit("http://localhost:3000")
  })

  it("front page can be opened", function () {
    cy.contains("Notes")
    cy.contains("Show Important Only")
  })

  it("login form can be opened", function () {
    cy.contains("Login").click()
  })

  it("user can login", function () {
    cy.contains("Login").click()
    cy.get("#username").type("root")
    cy.get("#password").type("root")
    cy.get("#login-button").click()

    cy.contains("root logged in")
  })

  it("login fails with wrong password", function () {
    cy.contains("Login").click()
    cy.get("#username").type("root")
    cy.get("#password").type("asd")
    cy.get("#login-button").click()

    cy.get(".error")
      .should("contain", "Wrong Credentials")
      .and("have.css", "color", "rgb(255, 255, 255)")
      .and("have.css", "border-style", "solid")

    cy.get("html").should("not.contain", "root logged in")
  })

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "root" })
    })

    it("a new note can be created", function () {
      cy.contains("Add Note").click()
      cy.get("#noteInput").type("a note created by cypress")
      cy.contains("save").click()
      cy.contains("a note created by cypress")
    })

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({ content: "another note on cypress", important: false })
      })
      it("it can be made important", function () {
        cy.contains("another note on cypress")
        cy.contains("make important").click()

        cy.contains("another note on cypress")
        cy.contains("make not important")
      })
    })

    describe.only("and several notes exist", function () {
      beforeEach(function () {
        cy.createNote({ content: "first note", important: false })
        cy.createNote({ content: "second note", important: false })
        cy.createNote({ content: "third note", important: false })
      })

      it("one of those can be made important", function () {
        cy.contains("second note")
          .parent()
          .find(".toggleImportance")
          .as("theButton")
        cy.get("@theButton").click()
        cy.get("@theButton").contains("make not important")
      })
    })
  })
})

# Testing av kode

## Mål med økta

- Forklare hva TDD er og hvordan det kan gjøre livet som utvikler bedre
- Erfaring med å skrive tester til egen kode

![Learning to deploy](./tdd.png)


## Jest
Det er massevis av biblioteker som kan hjelpe oss med dette, vi skal ta i bruk [Jest](https://jestjs.io).

Du har sikkert en funksjon du har lyst til å teste, men vi skal først lage en fra scratch.

1. Vi lager en egen fil med 


Test Driven Development (TDD) is a software development methodology that emphasizes writing tests before writing the actual code. Here's a brief overview of the TDD process:

    Write a Failing Test: Before writing any code, you start by writing a test that covers the expected behavior of a specific functionality. Initially, this test will fail because there's no implementation yet.

    Write Minimal Code: Write the minimum amount of code required to make the test pass. This doesn't mean the best or final implementation, just something to get the test to pass.

    Refactor: Once the test is passing, review the code to ensure it adheres to good coding practices and make any necessary improvements. This step is crucial to keep the codebase clean and maintainable.

    Repeat: The cycle repeats for every new feature or functionality.

Advantages of TDD:

    Better Code Quality: Since you start with tests, it ensures that your codebase has good test coverage. This makes it easier to refactor and add features in the future without introducing regressions.

    Immediate Feedback: You get immediate feedback on whether your code works as expected. If a test fails, it's a clear indication that there's a problem that needs addressing.

    Simplifies Complex Problems: By focusing on one test (and by extension, one functionality) at a time, TDD can help break down complex problems into more manageable pieces.

    Documentation: Tests act as documentation. They provide a clear specification of how functions or methods are supposed to work.

Challenges of TDD:

    Initial Overhead: Writing tests before code can feel slow and cumbersome initially, especially if you're new to the methodology.

    Learning Curve: There's a learning curve associated with writing effective tests. Not all tests are equal, and it takes experience to write tests that are both effective and efficient.

    Requires Discipline: TDD requires discipline to ensure that tests are written first and that the code is continually refactored.

In essence, TDD is a methodology that can lead to more robust and maintainable code. However, like any tool or process, it's essential to understand its strengths and weaknesses and apply it judiciously.
# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

### Code changes

The previous code was one function doing a lot of things. I am not a javascript developer so I found that it was not easy to follow. So I divided the code into two functions.
Each function is getting an input, processing the input and producing an output. This makes the code readable and testable. The logic in each function is small, easy to follow.

1. deterministicPartitionKey(): This function does only two things now. It takes an event as input. It first finds the candidate for the input. It then uses the candidate to generate hash and returns it. It is unit testable as it can be called using any input and return value can be checked in the unit test.

2. getCandidate(): This function does only one thing. It takes an event as input and calculate the candidate and returns it. Since the function has an input and an output it is unit testable and we can add unit tests to give an inpout and check for the return value.

### Unit tests

The two functions deterministicPartitionKey() and getCandidate() are unit testable.
The test file have tests for both the functions. Each test give an input(input can be empty) to the function, gets the result and test the result agains the expected value. Each test is testing for different scenario of input.
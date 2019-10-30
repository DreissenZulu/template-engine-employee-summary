# Template Engine - Employee Summary
A Node CLI that takes employee information and generates an HTML summary page

## Approach
Breaking down the requirements, I separated out the objective into the following parts:
1. Define a constructor for the base employee, then extend it into the three employee types
2. Create html templates for each employee type
3. Using the command line, prompt the team leader to enter their information
4. Once the team leader is added, begin adding team members
5. Using the list of team members, generate the html page containing all members of the team

## Challenges
Building the class constructors provided a challenge in writing the syntax properly and forming a deeper understanding of the Node.JS coding environment. When I tried to pass the constructors into the tests, module exports did not work because I enclosed the constructor in { }, when it was unnecessary due to there being only one item. For my prompts, I wanted to separate the manager's prompts from the employee's prompts, using a separate group of questions for the two types.
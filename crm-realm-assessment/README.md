CRM Realm Technical Assessment
This repository contains my submission for the Junior Software Engineer Intern technical assessment. The work is split into three parts a Java console application, JavaScript functions with tests, and SQL queries.
Project structure
 java/Lead.java — the Lead record used to hold a lead's name, email, and score.
 java/LeadTracker.java — the console menu, input handling, lead list, and priority calculation.
 javascript/solutions.js — the three JavaScript functions.
 javascript/tests.js — tests for the JavaScript functions.
 sql/queries.sql — the SQL queries for HOT leads and lead counts by priority.
AI assistance
I used Claude for assistance while developing this submission. I reviewed the code and ran the Java application and JavaScript tests in VS Code. I can discuss the implementation and the choices made in the solution.
How to run
Java application
Requires Java 17 or later.
cd java
javac *.java
java LeadTracker
When the program starts, choose an option from the menu:
1. Add a lead
2. View all leads
3. Exit
JavaScript tests
Requires Node.js.
cd javascript
node tests.js
The tests print a PASS or FAIL result for each test case.
Part A — Lead Tracker (Java)
Lead is a Java record containing name, email, and score. The application keeps leads in an ArrayList and provides a small menu to add a lead, view saved leads, or exit.

When a lead is added, the program trims the entered text and checks that the name and email are not empty. The score is parsed as an integer and must be between 0 and 100. If the score is not a whole number or is outside that range, the lead is not added and an error message is shown.

Priority is calculated from the score when the leads are displayed:
- HOT — score of 80 or higher
- WARM — score from 50 to 79
- COLD — score below 50
The priority is calculated rather than stored separately, so it does not become inconsistent with the score. If the list is empty, the program displays a message instead of an empty table. It also handles an invalid menu choice.
Part B — JavaScript functions
firstNonRepeatingChar(str)
This function returns the first character that appears only once, or null if there is no such character. It first counts characters, then checks the original string in order to find the first unique one.

Character counting is case-insensitive, so a and A count as the same character. The function ignores whitespace, but counts punctuation as a character. When it returns a character, it returns the original character from the input, preserving its case. A non-string input returns null.
findTwoSum(numbers, target)
This function returns the indices of two array elements whose sum equals target. It uses a Map to store numbers already visited and their indices. For each number, it checks whether the needed complement (target - number) has already been seen. If so, it returns the pair of indices; otherwise, it stores the current number and continues.

Checking before storing the current number prevents the same array element from being used twice. The function returns null when no pair is found. The implementation uses one pass through the array rather than checking every possible pair with nested loops.
countLeadsByStatus(leads)
This function counts how many leads belong to each status and returns an object whose keys are status names and whose values are counts. Statuses are not hard-coded, so other status values are counted as they appear. The function reads the input array without modifying it. For an input that is not an array, it returns an empty object.
Part C — SQL queries
The queries are in sql/queries.sql.
1. List HOT leads: selects id, name, email, and score from leads where score >= 80.
2. Count leads by priority: uses a CASE expression to classify each lead as HOT, WARM, or COLD, then counts leads in each group. A small derived table lists all three priorities and is left-joined to the lead counts, so a priority with no matching leads can still appear with a count of zero.
The priority rules match the Java application: HOT is 80 or above, WARM is 50–79, and COLD is below 50. The query assumes score is not NULL. The SQL uses common MySQL/PostgreSQL-compatible syntax.
Tests and checks
The JavaScript test file covers the example cases and additional edge cases, including:
. repeated characters, case differences, whitespace, punctuation, empty strings, and non-string input;
. matching and non-matching Two Sum pairs, duplicate values, negative values, zero, and empty arrays;
. counting common and unfamiliar statuses, empty input, and checking that the input leads are not changed.
I checked the Java console application manually with valid score boundaries, invalid scores, empty name/email fields, an empty lead list, and an invalid menu choice.
Decisions and possible improvements
For firstNonRepeatingChar, I chose to ignore whitespace but count punctuation as normal characters. If the requirements define whitespace or punctuation differently, that behaviour can be adjusted.

One improvement would be to validate email addresses more thoroughly. I would also add automated JUnit tests for the Java application instead of relying only on manual console checks.

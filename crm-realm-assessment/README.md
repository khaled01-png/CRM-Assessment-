# CRM Realm Technical Assessment - Junior Software Engineer Intern

Hi, this is my submission for the assessment. Everything is in three folders:

- `java/` has the Lead Tracker (Part A)
- `javascript/` has the three functions and my tests (Part B)
- `sql/` has the queries (Part C)

## AI tools I used

I used Claude to help me write the code, mainly to save time. After that I ran everything myself in VS Code (the Java app and the JavaScript tests) and checked that it all works. I also read through the code so I can explain it if you ask me about it.

## How to run it

**Java** (I used Java 17 or newer, because of the record and the new switch syntax)

```
cd java
javac *.java
java LeadTracker
```

**JavaScript tests** (just Node.js, nothing to install)

```
cd javascript
node tests.js
```

## Part A: Lead Tracker

I made `Lead` a record with name, email and score. Priority is not stored in it. There is a separate method, `calculatePriority(score)`, which works it out whenever leads are shown. That way the priority can never get out of sync with the score.

Leads are stored in an `ArrayList`. The menu has three options: add a lead, view all leads, exit. If the name or email is empty, or the score is not a whole number between 0 and 100, the app prints a message saying what is wrong and does not add the lead. If there are no leads, viewing them shows a short message instead of an empty table.

## Part B: JavaScript

**firstNonRepeatingChar**: I go through the string once and count every character in lowercase, so "a" and "A" count as the same. Then I go through it a second time and return the first character whose count is 1. Since I return the character from the original string, its case stays the same. Spaces are skipped, and punctuation is treated like any other character.

**findTwoSum**: I loop through the array and keep a Map of the numbers I have already seen with their index. For each number I check if `target - number` is already in the Map. If it is, I return the two indices. If not, I add the current number and carry on. I chose this over two nested loops because it only needs one pass. The current number is added after the check, so the same element is never used twice.

**countLeadsByStatus**: I loop through the leads and add 1 to a counter object using the status as the key. Nothing is hard coded, so a new status just creates a new key. The original array is only read, not changed. To show statuses with a count of zero, I would pass in a list of all possible statuses and set each one to 0 before counting.

## Part C: SQL

I was thinking of MySQL and PostgreSQL. I kept the SQL standard so it should run on both.

1. For HOT leads I just filter with `score >= 80`.
2. For the count per priority I use a CASE expression to turn each score into HOT, WARM or COLD, then group and count. I join it to a small list of the three priorities, so a group with no leads still shows up with 0.

One assumption: score is never NULL. If it was, the CASE would put it in COLD.

## Test cases

**Java** (I tried these by hand in the console):

| Input | What should happen |
|---|---|
| Score 0 | accepted, COLD |
| Score 49 | accepted, COLD |
| Score 50 | accepted, WARM |
| Score 79 | accepted, WARM |
| Score 80 | accepted, HOT |
| Score 100 | accepted, HOT |
| Score -1 or 101 | rejected |
| Score "abc" | rejected |
| Empty name or empty email | rejected |
| View with no leads | shows a "no leads yet" message |
| Wrong menu option | shows an "invalid option" message |

**JavaScript:** there are 19 tests in `tests.js`. They cover the examples from the assessment and some extra cases: mixed upper and lower case, spaces, punctuation, empty string, input that is not a string, duplicate numbers, negative numbers, zero, empty array, checking the original array is not changed, and a status with a name like `constructor`.

## One decision I made

For `firstNonRepeatingChar` I decided to ignore spaces but count punctuation as normal characters. I did not think it made sense to return a space as the first unique character, but something like `!` is actual content in the text.

## One thing I would improve

With more time I would add proper email validation (at least an `@` and a domain), and write JUnit tests for the Java part instead of testing it by hand in the console.

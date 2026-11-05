# Week 5: DOM Manipulation — Interactive To-Do List

## Author

- **Name:** Chukwuma Nicodemus Ndukwu
- **GitHub:** [@chukwuma-n](https://github.com/chukwuma-n)
- **Date:** October 20, 2026

## Project Description

This is my IYF Season 12, Week 5 DOM Manipulation project. I built an interactive To-Do List application using HTML, CSS, and JavaScript. The project demonstrates how JavaScript interacts with the Document Object Model (DOM) to update page content, handle user events, and manage tasks dynamically.

It also includes DOM practice exercises and five daily coding challenges.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Git
- GitHub
- Visual Studio Code

## Features

### Interactive To-Do List

- Add tasks using the Add Task button or Enter key.
- Reject empty and whitespace-only tasks.
- Mark tasks as completed.
- Delete individual tasks.
- Filter tasks by All, Active, and Completed.
- Display the number of remaining tasks.
- Clear all completed tasks.
- Edit tasks by double-clicking their text.
- Press Enter to save an edit or Escape to cancel.

### DOM Practice

- Select and traverse DOM elements.
- Modify text, attributes, and CSS classes.
- Create, insert, clone, and remove elements.
- Handle click, keyboard, and form events.
- Practise event bubbling and event delegation.
- Validate form input.

### Daily Challenges

1. Change heading colours randomly.
2. Create and insert a new element.
3. Remove all images from a page.
4. Copy text between elements.
5. Toggle between light mode and dark mode.

## How to Run

1. Clone the repository:

    ```bash
    git clone https://github.com/chukwuma-n/iyf-s12-week-05-chukwuma-n.git
    ```

2. Open the project folder in Visual Studio Code.
3. Open `index.html` in your browser, or use the Live Server extension.
4. Open `dom-practice.html` to explore the DOM exercises.
5. Open the HTML files inside `daily-challenges/` to test each challenge.

## Lessons Learned

- How to select and manipulate HTML elements using JavaScript.
- How to handle click, keyboard, and form events.
- How event bubbling and event delegation work.
- How to create, insert, and remove DOM elements.
- How to use arrays as the source of truth for an interactive application.
- How to render task lists dynamically and implement filtering.
- How to use Git and GitHub to track and publish project changes.

## Challenges Faced

One challenge was organising the JavaScript event handlers so that adding, completing, deleting, filtering, and editing tasks worked correctly together. I resolved this by organising the code into separate functions and using the `todos` array as the source of truth.

Another challenge was styling the selected filter button. I resolved it by using a CSS class to highlight the active filter and updating that class through JavaScript.

I tested the main features and corrected the issues encountered during development.

## Live Demo

[View my Week 5 To-Do List website](https://chukwuma-n.github.io/iyf-s12-week-05-chukwuma-n/)

## Repository

[View the source code on GitHub](https://github.com/chukwuma-n/iyf-s12-week-05-chukwuma-n)

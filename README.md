# Uniweb Express UI

Components for [Uniweb CMS](https://uniwebcms.com) templates.

## Designing for self-builing websites

Uniweb website templates can be created without technincal knowledge. A template is a set of options that guide the process of builing a website automatically. We refer to that process as self-builing websites.

Uniweb CMS is a **web engine** with advanced built-in intelligence to manage rich data and use it to build a website. The logic that is necessary for creating the user interface of a website is expected to exists in **web components** that are powered by the Uniweb web engine.

One of the main web engine's goal is to provide the information that web components need to achieve their visual results without needing any input from the owner of a website. For example, a navigation bar component (**navbar**) may need information about the page structure of the website and the active webpage.

Because the engine has access to both the template and the website data it can provide information about the strucure of the site and how its current data fits into it. We can illustrate this concept by continuing the above example of a **navbar**. When rendering a navbar, we not only need to know the page structure of the site but also  which pages currently have meaningful information so that the navbar can show menu links that only point to them. For example, a template for a personal website may define a page that shows a list of projects to which the website owner belongs. Some users of the template may indeed have projects to show but other may not. Whether the navbar shows a Projects menu or not depends on whether the website has projects to show or not.

The conditional inclusion of navbar menus presents an interesting problem because the main logic for rendering pages is located in independent components that are unrelated to the navbar. This is a use-case that shows why the the web engine is crucial for coordinating components so that the result is more than the sum of the parts.

Continuing our navbar example, we can assume that the template defines a Projects page with a component that requires the data of "linked projects". Because the web engine is aware of this dependency, it can make it use of it and expose whether the Projects page has projects to show or not. In turn, the navbar can use the information provided by the engine to decide whether a Projects menu option is necessary or not.

In summary, the engine allowed us to connect the abstract definition of a website structure and dependencies with the concrete data instanciation of a specific website in a way that helps us have a complete view of the site when rendering its navbar.

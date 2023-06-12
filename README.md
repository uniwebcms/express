# Uniweb Express UI

[Uniweb CMS](https://uniwebcms.com) is a **web engine** with advanced built-in intelligence to manage rich data and and build websites from templates. The logic that is necessary for creating the user interface of a website exists at the level of **web components** that are powered by the Uniweb engine.

A Uniweb **website template** can be created without technical knowledge thanks to the fact that it is simply a set of options that guide the process of building a website automatically. We refer to that process as **self-building websites**. A website template specifies the web components that are needed to define a self-building website.

**Uniweb Express UI** is a library of low-level and general-purposed web components that can be used to create collections of higher-level and/or specialized components.

## Designing for self-building websites

One of the main goals of the Uniweb engine is to provide the information that web components need to achieve their visual results without needing any input from the owner of a website. For example, a navigation bar component (**navbar**) may need information about the page structure of the website and the active webpage.

Because the engine has access to both the template and the website data it can provide information about the structure of the site and how its current data fits into it. We can illustrate this concept by continuing the above example of a **navbar**. When rendering a navbar, we not only need to know the page structure of the site but also which pages currently have meaningful information so that the navbar can show menu links that only point to them. For example, a template for a personal website may define a page that shows a list of projects to which the website owner belongs. Some users of the template may indeed have projects to show but other may not. Whether the navbar shows a Projects menu or not depends on whether the website has projects to show or not.

The conditional inclusion of navbar menus presents an interesting problem because the main logic for rendering pages is located in independent components that are unrelated to the navbar. This is a use-case that shows why the the web engine is crucial for coordinating components so that the result is more than the sum of the parts.

Continuing our navbar example, we can assume that the template defines a Projects page with a component that requires the data of "linked projects". Because the web engine is aware of this dependency, it can make it use of it and expose whether the Projects page has projects to show or not. In turn, the navbar can use the information provided by the engine to decide whether a Projects menu option is necessary or not.

In summary, the engine allowed us to connect the abstract definition of a website structure and dependencies with the concrete data instantiation of a specific website in a way that helps us have a complete view of the site when rendering its navbar.

## The Uniweb Module SDK

The integration of custom components into a Uniweb system is done via Webpack Federated Modules. The [Uniweb Module SDK](https://github.com/uniwebcms/uniweb-module-sdk) is a software development kit that provides a thin wrapper around the underlying Uniweb JavaScript engine. The SDK provides a tailored and consistent API layer for the underlying web engine.

The main building blocks provided by the engine fall into two categories: Custom React Hooks and General purpose components.

### Custom React Hooks

- useLoadProfileBody
- useLinkedProfileFilterState
- useGetProfile

### General purpose components

- Asset
- Image
- Link

By using the SDK, a component creator is freed from having to implement low-level functionality or deal with complex backend requests. Creating a link to a page or fetching an assets become simple tasks when using the SDK. Similarly, when using the Custom React Hooks, a component creator can enjoy a simplified managment of rendering states for common use cases.

## The Express UI Library

The Uniweb Express UI is an opinionated library of low-level and general-purposed web components. It includes the Uniweb Module SDK as a dependency and implements React-based components with it.

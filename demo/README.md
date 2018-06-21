The Polymer PWA Starter Kit

Today we will build a PWA! We will take one part polymer, one part lit-html, and one part redux. We will then mix thoroughly and place on top of a sw-precache configured service worker. Covering the result with a combination of chrome puppeteer and WCT suites, we will bake it for approximately 45 minutes using the polymer-cli.

This code-heavy talk will look at lit-html, LitElement, and the PWA Starter Kit. We will explore how the starter kit is set up, and build a simple PWA using it.

- Polymer 3
    - Why? 
    
- Lit-html
    - Why?
    - Demo
        - Template literals
        - Tagged template literals
        - lit-html tagged template literals
        
- LitElement
    - Why?
    - Demo
        -
         
- Starter Kit
    - Why?
    - Pieces
        - LitElement
        - Redux
        - Helpers
        - Testing
        - PRPL Server        
        - Samples
            - https://polymer.github.io/pwa-starter-kit/sample-apps/
    
- TodoMVC
    - Bare bones project
        - App shell
            - CSS Sharing?
            
        - Add todo
            - Element
            - Event response
            - Add action
            - Create store, reducer and class
            - Respond to action, and initialise state
            
        - List todo
            - Element
            - Bind to state
            - Map list of todos to li
            - Conditional state and class$/ClassName/class
            
        - View todo
            - Element
            - Properties getter
            
        - Complete todo
            - Click event
            - Add Action
            - Add Reducer
            - Implement state changed
            - Conditional CSS
            
            
        - Delete todo 
            - Button with click event
            - Action
            - Reducer
            
        - Edit todo
            - Dbl Click event
            - Hide if editing
            - Action
            - Reducer
            - Element
            - Add element to view-todo
            - Add blur and keyup events
            - Add complete and cancel action, and reducers
              
        - Build
            - Show size, serviceworker and offline.
        
        
       
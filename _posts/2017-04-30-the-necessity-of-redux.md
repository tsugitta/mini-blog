---
title: the necessity of redux
date: 2017-04-30
description: no description
---

When making an application with React (ReactNative), it is common to use the Flux / Redux pattern, but it is often said that you can make an application without any problem without using it.
However, since the architecture without Flux / Redux is not discussed so much, I don't know what to do without Flux / Redux.

I think that Flux / Redux has already spoken about what to solve, but I think that for typical applications the most benefit is to separate the logic from the view. To put it more, I think that an architecture which do that is enough.

## MVVM on React (Native)

In React, props and state have information to change the display items, and describe how to be rendered with them in `render ()`. With this data binding, you can minimize the direct manipulation of the UI as done with jQuery as much as possible and concentrate consciousness on changing pure information, props and state. This was one of the advantages of MVVM for MVC.
So, if you design it like the following, it will be possible to obtain the same degree of maintainability as the application made with MVVM, I think.

- Model
  - Logics separated from UI
- View
  - ReactComponent that receives props and draws it (Component in Redux). We also have user-operated callbacks in props
- ViewModel
  - ReactComponent that has View(s) and is not involved in UI as much as possible
  - Receive feedback from View, throw processing to Model, receive feedback from Model, update state

Even this alone makes it possible to separate the view and the logic. and it's also good that it's easy to change the state etc on the ViewModel. It can be said that Flux / Redux exists as the easiness is dangerous, but then pay attention to dangerous places. I think there are many environments where using Flux / Redux is overkill.

What I would like to say is that there should be other major architecture besides Flux / Redux. Especially in the case of ReactNative, unlike the web, there aren't usually many Container-like components at the same time. In that case, one of the advantages of Flux / Redux "action is easy to implement which affects multiple Containers" can be said as no big deal, I think that MVVM is enough. Besides, Angular's major way of use is almost MVVM oriented and it succeeds.

## But Redux (Flux) is pleasant

However, Redux who splits responsibilities beautifully is pleasant and functional type is a longing for people (me).
I like the asynchronous library `redux-observable`. This is also functional-like and attractive. Although there is a view that RxJS has a difficulty and we should refrain from using it, I think that linguistic difficulty should be aggressively accepted. It is different from implementation difficulty, because it becomes small matter if you get used to it, and personally, it makes me feel comfortable to leaning difficult new things.

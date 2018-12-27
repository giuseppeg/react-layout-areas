# React Layout Areas

🍫 Powerful component-based layouts built with CSS Grid areas.

```
npm i --save react-layout-areas
```

The library exports a `Layout` component that gets an `areas` prop to define [grid template areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas).

The `Layout` component generates matching components for each area defined in the `areas` template and calls its `children` with them.

```jsx
import React from "react";
import Layout from "react-layout-areas";

function App() {
  return (
    <Layout
      areas={`
        header
        main
        footer
      `}
      style={{
        // Define the size of each area via regular css values
        // this can also be done with a className.
        gridTemplate: "1em 1fr 1em / 1fr",
        height: "100vh"
      }}
    >
      {({ Header, Main, Footer }) => (
        <>
          <Header as="h1" style={{ margin: 0 }}>
            howdy
          </Header>
          <Main as="main">main</Main>
          <Footer as={FooterComponent} color="hotpink">
            footer
          </Footer>
        </>
      )}
    </Layout>
  );
}
```

produces

<img width="942" alt="screen shot 2018-12-27 at 6 08 32 pm" src="https://user-images.githubusercontent.com/711311/50488829-ad96d100-0a04-11e9-8c89-9c0f73d27ffe.png">

### Prior work and the reasoning behind this library

This library was inspired by [`atomic-layout`](https://github.com/kettanaito/atomic-layout) and the amazing work of [Artem Zakharchenko](https://twitter.com/kettanaito). I highly recommend you to watch [the talk he gave at React Vienna in 2018](https://www.youtube.com/watch?v=x_93DjN_bUA).

I always believed that in order to reach the composition holy grail a layout shouldn't be built in UI components but rather created with ad-hoc layout components. You can read in length about this topic on [my blog](http://giuseppegurgone.com/margins-and-composability-in-css) and in [the SUIT CSS docs](https://github.com/suitcss/suit/blob/master/doc/components.md#adapting-to-ancestral-context).

The reason why I implemented this library is because I wanted it to be simpler than atomic-layout and with 0 dependencies.

## Responsive Grids

Because I wanted to keep the library (API) minimal I decided to not include any built-in machinary to make responsive grids (areas).

Responsive layouts can be implemented by changing the template `areas` prop and either the [`window.matchMedia` API](https://developer.mozilla.org/docs/Web/API/Window/matchMedia) or [`ResizeObserver`](https://developers.google.com/web/updates/2016/10/resizeobserver).

## API

```js
type LayoutProps = {
  // A valid grid-template-areas value.
  // See https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
  areas: string,

  // By default the Layout component renders a div
  // but it can take an element name (string)
  // or another component to render.
  as?: string | React.ComponentType<*>,

  // Optional, inline o block level grids.
  display?: 'inline' | 'block'
}
```

```js
// Passed to the children function. eg Header
type LayoutAreaProps = {
  // By default the Layout component renders a div
  // but it can take an element name (string)
  // or another component to render.
  as?: string | React.ComponentType<*>
}
```

Note that all the components use inline styles, therefore when setting the `as` prop to a `React.ComponentType`, the component needs to spread the `style` prop to its root element.

## LICENSE

MIT

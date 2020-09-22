# react-scrollable-component

> Component for custom scrollbar

[![NPM](https://img.shields.io/npm/v/react-scrollable-component.svg)](https://www.npmjs.com/package/react-scrollable-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-scrollable-component
```

## Usage

```tsx
import React, { Component } from 'react'

import ReactScrollableComponent from 'react-scrollable-component'

class Example extends Component {
  render() {
    return (
        <ReactScrollableComponent scrollThumbStyle={{width: "4px", backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "2px"}} maxHeight={90}>
             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad at dignissimos eveniet exercitationem facilis
                iste laboriosam libero molestiae nostrum obcaecati officiis porro possimus quos saepe sunt tempora, totam
                veniam?
             </p>
        </ReactScrollableComponent>
    )
  }
}
```

### Props
```tsx
scrollThumbStyle?: React.CSSProperties  // Style of the scrollthumb. You can not change the  height, top, right and position properties.
maxHeight?: number                      // The maximum height of the scrollable container
className?: string                      // Name of the scrollable container class
hiddenIfNotUsed?: boolean               // Property to hide the scrollbar when there is no mouse wheel action (default false)
```

### Note
This component will use the default scrollbar on mobile devices and tablets

## License

MIT © [make1986](https://github.com/make1986)

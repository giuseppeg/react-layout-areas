import React from 'react'

const Layout = React.forwardRef(function Layout(
  { children, style, areas, display, as, ...props },
  ref
) {
  const { components, gridTemplateAreas } = parseAreas(areas)
  const Tag = as || 'div'

  return (
    <Tag
      {...props}
      style={{
        ...style,
        gridTemplateAreas,
        display: display === 'inline' ? 'grid-inline' : 'grid',
      }}
      ref={ref}
    >
      {children(components)}
    </Tag>
  )
})
Layout.displayName = 'Layout'
export default Layout

const cache = {}
function parseAreas(areas) {
  if (cache.hasOwnProperty(areas)) {
    return cache[areas]
  }

  const result = areas
    .trim()
    .split('\n')
    .filter(Boolean)
    .map(row => row.split(/\s+/).filter(Boolean))
    .reduce(
      (result, cols) => {
        cols.forEach(col => {
          const displayName = (
            col.charAt(0).toUpperCase() + col.substr(1)
          ).replace(/-(.)/g, l => l[1].toUpperCase())

          const Component = React.forwardRef(function(
            { as, style, ...props },
            ref
          ) {
            const Tag = as || 'div'
            return (
              <Tag {...props} style={{ ...style, gridArea: col }} ref={ref} />
            )
          })

          Component.displayName = `LayoutArea(${displayName})`
          result.components[displayName] = Component
        })
        result.gridTemplateAreas += `'${cols.join(' ')}' `
        return result
      },
      { components: {}, gridTemplateAreas: '' }
    )

  cache[areas] = result
  return result
}

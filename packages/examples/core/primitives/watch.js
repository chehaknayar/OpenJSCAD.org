/**
 * Watch Model
 * @category Creating Shapes
 * @skillLevel 1
 * @description Demonstrating the basics of a variety of 3D primitives
 * @tags cube, cuboid, sphere, ellipsoid, cylinder, torus, shape, 3d
 * @authors Rene K. Mueller, Moissette Mark, Simon Clark
 * @licence MIT License
 */

/**
 * Watch Customization
 * @category Parameters
 * @skillLevel 1
 * @description Customize the color, width, length of straps, and radius of the dial
 * @tags parameters, color, watch, customization
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { cuboid, cylinder } = jscad.primitives
const { translate, rotateZ } = jscad.transforms
const { colorize, hexToRgb } = jscad.colors

const options = {
  strapColor: [0, 0, 255], // Default strap color is blue
  dialColor: [0, 100, 100], // Default dial color is white
  strapWidth: 30, // Default strap width
  dialRadius: 15 // Default dial radius
}

const getParameterDefinitions = () => [
  { name: 'strapColor', type: 'color', initial: '#0000FF', caption: 'Strap Color' },
  { name: 'dialColor', type: 'color', initial: '#006464', caption: 'Dial Color' },
  { name: 'strapWidth', type: 'number', initial: 30, caption: 'Strap Width', min: 1 },
  { name: 'dialRadius', type: 'number', initial: 15, caption: 'Dial Radius', min: 1 }
]

const initializeOptions = (params) => {
  options.strapColor = hexToRgb(params.strapColor)
  options.dialColor = hexToRgb(params.dialColor)
  options.strapWidth = params.strapWidth
  options.dialRadius = params.dialRadius
}

const main = (params) => {
  initializeOptions(params)

  const dial = cylinder({ radius: options.dialRadius, height: 4 })
  const minuteHand = cuboid({ size: [0.5, 10, 5] })
  const hourHand = cuboid({ size: [10, 0.5, 5] })
  const strap1 = cuboid({ size: [100, options.strapWidth, 2] })
  const strap2 = cuboid({ size: [100, options.strapWidth, 2] })

  // Assemble the watch components
  const watch = [
    translate([0, 2, 0], colorize(options.dialColor, dial)),
    translate([2, 3, 0], rotateZ(Math.PI / 6, colorize(options.strapColor, hourHand))),
    translate([0, -2, 1], rotateZ(Math.PI / 30, colorize(options.strapColor, minuteHand))),
    translate([20 / 2, 2, 0], colorize(options.strapColor, strap1)),
    translate([-20 / 2, 2, 0], colorize(options.strapColor, strap2))
  ]

  return watch
}

module.exports = { main, getParameterDefinitions }




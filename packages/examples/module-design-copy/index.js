/**
 * Modular Project Design Example
 * @category Projects
 * @skillLevel 1
 * @description Demonstrating the structure of a multi-file project
 * @tags measurements, bounds, boundingbox
 * @authors Moissette Mark, Simon Clark
 * @licence MIT License
 */
const jscad = require('@jscad/modeling')
const { colorize, hexToRgb } = jscad.colors
const { translate } = require('@jscad/modeling').transforms

const ringShape = require('./subFolder/ringsaved.js')
const LED = require('./LED.stl')
//can import list of electronics available for this item. 
//Eg for ring you cant have big LCD screen, but LED, Buzzer, etc is possible.

const getParameterDefinitions = () => {
  const globalParams = [
    { name: 'showRing', type: 'checkbox', checked: true, caption: 'Show ring:' },
    { name: 'showLED', type: 'checkbox', checked: false, caption: 'Show LED:' },
  ]

  const LEDParams = [
    { name: 'LED-group', type: 'group', initial: 'closed', caption: 'LED' },
    { name: 'LEDXPosition', type: 'float', initial: 0, caption: 'LED X Position' },
    { name: 'LEDYPosition', type: 'float', initial: 0, caption: 'LED Y Position' },
    { name: 'LEDZPosition', type: 'float', initial: 0, caption: 'LED Z Position' },
  ]
  // // Load the parameters defined in the mountPlate sub-file, and add them to the project parameters.
  const ringParams = ringShape.getParameterDefinitions()
  
  globalParams.push(...ringParams)
  
  globalParams.push(...LEDParams)

  return globalParams
}

const main = (params) => {
  console.log("params: ", params)
  let results = []
  results = params.showRing ? results.concat(
    ringShape
    .main({
      ringOuterRadius: params.ringOuterRadius,
      ringInnerRadius: params.ringInnerRadius,
      ringHeight: params.ringHeight,
      jewelHeight: params.jewelHeight,
      jewelRadius: params.jewelRadius,
      strapColor: params.strapColor, 
      dialColor:  params.dialColor,
    })
  ) : results
  results = params.showLED ? results.concat(translate([params.LEDXPosition,params.LEDYPosition,params.LEDZPosition],LED)) : results
  return results
}

module.exports = { main, getParameterDefinitions }
